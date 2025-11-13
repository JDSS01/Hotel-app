import React from 'react';
import Card from '../components/card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import '../custom.css';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/quartos`;

function ListagemQuartos() {
  const navigate = useNavigate();
  const [dados, setDados] = React.useState([]);

  const cadastrar = () => {
    navigate('/cadastro-quartos');
  };

  const editar = (id) => {
    navigate(`/cadastro-quartos/${id}`);
  };

  async function excluir(id) {
    const confirmar = window.confirm('Deseja realmente excluir este quarto?');
    if (!confirmar) return;

    try {
      await axios.delete(`${baseURL}/${id}`);
      mensagemSucesso('Quarto excluído com sucesso!');
      setDados(dados.filter((q) => q.id !== id));
    } catch (error) {
      mensagemErro('Erro ao excluir o quarto.');
    }
  }

  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setDados(response.data);
      })
      .catch(() => {
        mensagemErro('Erro ao carregar a lista de quartos.');
      });
  }, []);

  return (
    <div className='container'>
      <Card title='Listagem de Quartos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={cadastrar}
              >
                Novo Quarto
              </button>

              <table className='table table-hover mt-3'>
                <thead>
                  <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Número</th>
                    <th scope='col'>Tipo</th>
                    <th scope='col'>Limite de Pessoas</th>
                    <th scope='col'>Valor (R$)</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.length > 0 ? (
                    dados.map((q) => (
                      <tr key={q.id}>
                        <td>{q.id}</td>
                        <td>{q.numero}</td>
                        <td>{q.tipo}</td>
                        <td>{q.limitePessoas}</td>
                        <td>R$ {parseFloat(q.valor).toFixed(2)}</td>
                        <td>
                          <Stack spacing={1} direction='row'>
                            <IconButton
                              aria-label='edit'
                              onClick={() => editar(q.id)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-label='delete'
                              onClick={() => excluir(q.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan='6' className='text-center'>
                        Nenhum quarto cadastrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemQuartos;
