import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';
import NavbarItem from './navbarItem';

function Navbar() {
  return (
    <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-primary'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          Hotel IF & ELSE ltda
        </a>

        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarResponsive'
          aria-controls='navbarResponsive'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav me-auto'>
            <NavbarItem render='true' href='/listagem-hospedes' label='Hóspedes' />
            <NavbarItem render='true' href='/listagem-funcionarios' label='Funcionários' />
            <NavbarItem render='true' href='/listagem-quartos' label='Reservas' />
            <NavbarItem render='true' href='/listagem-quartos' label='Pedidos' />
            <NavbarItem render='true' href='/listagem-quartos' label='Check in' />
            <NavbarItem render='true' href='/listagem-quartos' label='Check out' />
            <NavbarItem render='true' href='/listagem-quartos' label='Quartos' />
            
            
          </ul>

          <ul className='navbar-nav ms-auto'>
            <NavbarItem render='true' href='/login' label='Entrar' />
            <NavbarItem render='true' href='/' label='Sair' />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

