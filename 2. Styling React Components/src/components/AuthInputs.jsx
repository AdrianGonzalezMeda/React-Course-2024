import { useState } from 'react';
// Styled components: Node module para crear etiquetas html con los estilos y poder usarlas como una especie de componente
import { styled } from 'styled-components';
import Input from './Input.jsx';
import Button from './Button.jsx';


// Todas las propiedades añadidas (ej. className) se ven reflejadas en la build final del style-component
const ControlDiv = styled.div`
display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;`;

export default function AuthInputs() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    
    const handleInputChange = (identifier, value) => {
        if (identifier === 'email') {
            setEnteredEmail(value);
        } else {
            setEnteredPassword(value);
        }
    }

    const emailNotValid = submitted && !enteredEmail.includes('@');
    const passwordNotValid = submitted && enteredPassword.trim().length < 6;

    // Las propiedades de un style component se definen con el prefijo $ para evitar que colisionen con propiedades
    // reservadas de los elementos (built-in properties: invalid, readonly, checked...) 
    return (
        <div id="auth-inputs">
            <ControlDiv>
                <Input
                    label="email"
                    type="email"
                    invalid={emailNotValid}
                    onChange={(event) => handleInputChange('email', event.target.value)}
                />
                <Input
                    label="Password"
                    type="password"
                    invalid={passwordNotValid}
                    onChange={(event) =>
                        handleInputChange('password', event.target.value)
                    }
                />
            </ControlDiv>
            <div className="actions">
                <button type="button" className="text-button">
                    Create a new account
                </button>
                <Button onClick={()=> setSubmitted(true)}>Sign In</Button>
            </div>
        </div>
    );
    // Ejemplo de condicionar className:
    //className={emailNotValid ? 'invalid' : undefined} 
    // Ejemplo de condicionar className cuando hay una clase que no cambia:
    //className={`inputClass ${emailNotValid ? 'invalid' : undefined}`} 
}
