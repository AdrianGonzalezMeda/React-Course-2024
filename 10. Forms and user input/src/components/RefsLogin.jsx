import { useRef, useState } from "react";

// Ejemplo con referencias
export default function RefsLogin() {
    const [emailIsInvalid, setEmailIsInvalid] = useState();
    const email = useRef()
    const passwd = useRef()

    const handleSubmit = (event) => {
        event.preventDefault();
        const enteredEmail = email.current.value;
        const enteredPasswd = passwd.current.value;
        console.log("data", {
            email: enteredEmail,
            passwd: enteredPasswd
        });

        // Validation
        const emailIsValid = formData.email.includes('@');
        if (!emailIsValid) {
            setEmailIsInvalid(true);
            return;
        }
        setEmailIsInvalid(false);

        // Sending Data
        // Reset form
        email.current.value = '';
        passwd.current.value = '';
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="control-row">
                <div className="control no-margin">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        ref={email}
                    />
                    <div className="control-error">
                        {emailIsInvalid && <p>Please enter a valid email address</p>}
                    </div>
                </div>

                <div className="control no-margin">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        ref={passwd}
                    />
                </div>
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}
