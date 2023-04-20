import Logo from '../images/Vector.svg';

function Header() {
  return (
    <header className="header">
      <img src={Logo} alt="Логотип" className="header__logo" />
    </header>
  )
}

export default Header