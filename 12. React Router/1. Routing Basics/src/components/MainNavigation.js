import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './MainNavigation.module.css'

// With NavLink react router provides us the isActive parameter at the className or style props, witch accept
// a function
const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink to="/"
                            className={({ isActive }) => isActive ? classes.active : undefined}
                            style={({ isActive }) => { }}
                        >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className={({ isActive }) => isActive ? classes.active : undefined}>Products</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation
