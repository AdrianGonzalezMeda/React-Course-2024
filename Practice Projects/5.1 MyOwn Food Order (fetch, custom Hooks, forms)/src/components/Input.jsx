const Input = ({ label, id, ...props }) => {
    return (
        <div className="control">
            <label htmlFor={id}>{label}</label>
            <input id={id} {...props} />
        </div>
    )
}

export default Input
