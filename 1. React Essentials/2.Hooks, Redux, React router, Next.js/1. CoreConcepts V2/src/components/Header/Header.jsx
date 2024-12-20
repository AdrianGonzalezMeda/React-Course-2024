import logoImg from '../../assets/react-core-concepts.png';
import "./Header.css";

const Header = () => {
  return (
    <header>
        <img src={logoImg} alt='Stylized atom' />
        <h1>React Essentials</h1>
        <p>
          Fundamental React concepts you will need for almost any app you are
          going to build!
        </p>
      </header>
  )
}

export default Header
