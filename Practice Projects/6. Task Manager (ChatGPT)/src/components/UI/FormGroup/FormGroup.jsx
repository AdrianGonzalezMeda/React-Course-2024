import { createContext } from 'react';
import classes from './FormGroup.module.css';
import { useContext } from 'react';

const FormGroup = ({ idFor, label, children }) => {
    return (
        <p className={classes['form-group']}>
            <label htmlFor={idFor}>{label}</label>
            {children}
        </p>
    )
}

const FormInput = ({ idFor, label, ...props }) => {
    return <FormGroup idFor={idFor} label={label}>
        <input id={idFor} {...props} />
    </FormGroup>
}

const FormSelectContext = createContext();
function useFormSelectContext() {
    const ctx = useContext(FormSelectContext);

    if (!ctx) {
        return new Error('Select-related components must be wrapped by <FromGroup.Select>');
    }
}
const FormSelect = ({ idFor, label, children, ...props }) => {
    const ctxValue = {};

    return <FormSelectContext.Provider value={ctxValue}>
        <FormGroup idFor={idFor} label={label}>
            <select id={idFor} {...props}>
                {children}
            </select>
        </FormGroup>
    </FormSelectContext.Provider>
}

const FormOption = ({children, ...props}) => {
    useFormSelectContext();

    return <option {...props}>{children}</option>
}

const FormTextArea = ({ idFor, label, ...props }) => {
    return <FormGroup idFor={idFor} label={label}>
        <textarea id={idFor} {...props}></textarea>
    </FormGroup>
}

FormGroup.Input = FormInput;
FormGroup.Select = FormSelect;
FormGroup.Option = FormOption;
FormGroup.TextArea = FormTextArea;

export default FormGroup
