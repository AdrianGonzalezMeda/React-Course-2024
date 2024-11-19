import React from 'react'

const TabButton = ({ children, isSelected, ...props }) => {
    return (
        /* props.children es una propieda por defecto que tienen todos los componentes 
        aun que no les pases ningun valor. En concreto, esta propiedad incluiria
        todo lo que haya entre las etiquetas de declaracion de este componente 
        (<TabButton>{...}</TabButton>)
        */
        <li>
            <button className={isSelected ? 'active' : undefined} {...props}>{children}</button>
        </li>
    )
}

export default TabButton
