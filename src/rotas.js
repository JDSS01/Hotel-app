import React from 'react';

import CadastroHospede from './views/cadastro-hospede';
import CadastroFuncionario from './views/cadastro-funcionario';
import CadastroQuatos from './views/cadastro-quarto';
import CadastroReserva from './views/cadastro-reserva';

import ListagemHospedes from './views/listagem-hospedes';
import ListagemFuncionarios from './views/listagem-funcionarios';
import ListagemQuartos from './views/listagem-quartos';
import ListagemReservas from './views/listagem-reservas';

import Login from './views/login';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route
          path='/cadastro-hospedes/:idParam?'
          element={<CadastroHospede />}
        />

        <Route
          path='/cadastro-funcionarios/:idParam?'
          element={<CadastroFuncionario />}
        />

        <Route
          path='/cadastro-quartos/:idParam?'
          element={<CadastroQuatos />}
        />
        <Route path='/cadastro-reserva/:idParam?' element={<CadastroReserva />} />


        <Route
          path='/listagem-hospedes'
          element={<ListagemHospedes />}
        />

        <Route
          path='/listagem-funcionarios'
          element={<ListagemFuncionarios />}
        />
        
         <Route
          path='/listagem-quartos'
          element={<ListagemQuartos />}
        />
         <Route path='/listagem-reservas' element={<ListagemReservas />} />

      </Routes>

     
      
    </BrowserRouter>
  );
}

export default Rotas;
