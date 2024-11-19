import { createContext, useContext } from "react"

const AccordionItemContext = createContext();

// Creating this context allows the childen components, because since we have only children property we can not assign props to this
export function useAccordionItemContext() {
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

export default AccordionItem
