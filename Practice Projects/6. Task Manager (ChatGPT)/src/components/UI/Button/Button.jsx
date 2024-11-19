import classes from './Button.module.css';

const Button = ({ children, mode, ...props }) => {  
    return (
        <button className={`${classes.button} ${classes[mode]}`} {...props}>
            {children}
        </button>
    )
}

export default Button
