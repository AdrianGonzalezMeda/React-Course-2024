import { createContext, useContext, useState } from "react"

// Compound Components: if you want to be sure that any developer use the child components outside the main Accordion wrapper
// you can merge all the components in one file and only export the main one


/* ACCORDION */
const AccordionContext = createContext();

function useAccordionContext() {
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

/* ACCORDION ITEM */
const AccordionItemContext = createContext();

function useAccordionItemContext() {
    const ctx = useContext(AccordionItemContext);

    if (!ctx) {
        throw new Error('Accordion-item-related components must be wrapped by <Accordion.Item>.');
    }

    return ctx;
}

const AccordionItem = ({ id, className, children }) => {
    return (
        <AccordionItemContext.Provider value={id}>
            <li className={className}>
                {children}
            </li>
        </AccordionItemContext.Provider>
    )
}

/* ACCORDION ITEM TITLE */
const AccordionTitle = ({ className, children }) => {
    const { toggleItem } = useAccordionContext();
    const id = useAccordionItemContext();

    return (<h3 className={className} onClick={() => toggleItem(id)}>{children}</h3>)
}

/* ACCORDION ITEM CONTENT */
const AccordionContent = ({ className, children }) => {
    const { openItemId } = useAccordionContext();
    const id = useAccordionItemContext();

    const isOpen = openItemId === id;

    return (
        <div className={isOpen ? `${className ?? ''} open` : `${className ?? ''} close`}>
            {children}
        </div>
    )
}

Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;

export default Accordion
