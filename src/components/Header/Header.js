import React from 'react';
import './Header.scss';

//images
import logoMain from '../../images/logo_main.png';

function Header() {
  return (
    <header className="header">
      <div className="header__logo-container">
        <a className="header__logo-link" href="#">
          <img className="header__logo-image" src={logoMain} alt="An airplane on the background of a globe" />
        </a>
      </div>
    </header>
  );
}

export default Header;
