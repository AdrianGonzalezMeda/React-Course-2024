import logo from '../../assets/logo.png';
/* Scoping css: cambiando la nomenclatura del fichero podemos encapsular las reglas css escritas en el y tener
acceso a un objeto con los nombres de las clases para usarlas en nuestro jsx, de forma que al hacer el compilado
estas clases se convertiran en un nombre de clase unico que garantizara el scope para que solo afecten a este 
componente 
*/
//import classes from './Header.module.css';

// Otra forma de hacer scoping seria crear un componente padre y definir todas las reglas css incluyendo las de
// sus elementos hijo. Para referirnos al propio elemento usaremos & (como en SasS)
import { styled } from 'styled-components';

const StyledHeader = styled.header`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 2rem;
margin-bottom: 2rem;

& img {
    object-fit: contain;
    margin-bottom: 2rem;
    width: 11rem;
    height: 11rem;
}

& h1 {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.4em;
    text-align: center;
    text-transform: uppercase;
    color: #9a3412;
    font-family: 'Pacifico', cursive;
    margin: 0;
}

& p {
    text-align: center;
    color: #a39191;
    margin: 0;
}

@media (min-width: 768px) {
    margin-bottom: 4rem;

    & h1 {
        font-size: 2.25rem;
    }
}`;


export default function Header() {
    const conditionalProperty = true;

    return (
        <StyledHeader>
            <img src={logo} alt="A canvas" />
            <h1>ReactArt</h1>
            <p>A community of artists and art-lovers.</p>
        </StyledHeader>
    );
    /*return (
        <header>
            <img src={logo} alt="A canvas" />
            <h1>ReactArt</h1>
            // Esto seria para añadir las clases importadas desde el modulo css header
            <p className={classes.paragraph}>A community of artists and art-lovers.</p>
            // Esto seria otra forma de condicionar estilos en linea. Para los estilos en linea,
            // siempre debemos usar un objeto { color: 'red', backGroundColor: 'black' } y las propiedades
            // kebab-case las cambiamos a camel-case 
            <p style={
                {
                    color: conditionalProperty ? 'red' : 'white'
                }
            }>Style me!</p>
        </header>
    );*/
}
