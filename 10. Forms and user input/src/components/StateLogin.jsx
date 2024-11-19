import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation.js";
import { useInput } from "../hooks/useInput.js";

// Ejemplo con estados. La validacion se hace uniendo la validacion onKeyStroke y onLostFocus (blur)
export default function StateLogin() {
    const {
        value: emailValue,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur,
        hasError: emailHasError
    } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

    const {
        value: passwordValue,
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur,
        hasError: passwordHasError
    } = useInput('', (value) => hasMinLength(value, 6));

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validation
        if (emailHasError || passwordHasError) {
            return
        }

        // Sending Data
        console.log("data", formData)
        // Reset form
        setFormData({
            email: '',
            password: ''
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="control-row">
                <Input
                    label='Email'
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    value={emailValue}
                    error={emailHasError && 'Please enter a valid email!'}
                />

                <Input
                    label='Password'
                    id="password"
                    type="password"
                    name="password"
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    value={passwordValue}
                    error={passwordHasError && 'Please enter a valid password!'}
                />
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}
