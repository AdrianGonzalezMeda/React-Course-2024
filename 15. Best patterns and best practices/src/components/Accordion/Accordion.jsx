import { createContext, useContext, useState } from "react"
import AccordionItem from "./AccordionItem";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";

// Dont create a default value for the context to make the error below work
const AccordionContext = createContext();

// Custom hook to use the context and keep secure if it used outside <Accordion>.
export function useAccordionContext() {
    const ctx = useContext(AccordionContext);
    
    if (!ctx) {
        throw new Error('Accordion-related components must be wrapped by <Accordion>.');
    }

    return ctx;
}

const Accordion = ({ children, className }) => {
    const [openItemId, setOpenItemId] = useState();
    
    function toggleItem(id) {
        setOpenItemId((prevId) => (prevId === id ? null : id));
    }

    const contextValue = {
        openItemId,
        toggleItem
    };

    return (
        <AccordionContext.Provider value={contextValue}>
            <ul className={className}>
                {children}
            </ul>
        </AccordionContext.Provider>
    )
}

// When using compound components its a good practice to make obvious that the components works together, so you can create
// a property like this, pointing to the child component. This way you only need to import the parent component in the others
// components and use the 'Item' property created. The property name is up to you
Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;

export default Accordion
