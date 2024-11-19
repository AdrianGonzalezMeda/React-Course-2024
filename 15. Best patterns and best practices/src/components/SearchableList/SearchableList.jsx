import { useRef, useState } from "react"

const SearchableList = ({ items, itemKeyFn, children }) => {
    const lastChange = useRef();
    const [searchTerm, setSearchTerm] = useState('');

    const searchResults = items.filter(item =>
        JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
    );

    /* DEBOUNCING */
    const handleChange = (event) => {
        if (lastChange.current) {
            clearInterval(lastChange.current)
        }

        lastChange.current = setTimeout(() => {
            lastChange.current = null;
            setSearchTerm(event.target.value);
        }, 500);
    }

    return (
        <div className="searchable-list">
            <input type="search" placeholder="Search" onChange={handleChange} />

            <ul>
                {/* With itemKeyFn we can set the key outside SearcheableList, because using map index its a bad practice since its not directly linked
                to the data */}
                {searchResults.map((item) => (
                    <li key={itemKeyFn(item)}>
                        {children(item)}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SearchableList
