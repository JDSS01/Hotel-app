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

const baseURL = `${BASE_URL}/reservas`;

function ListagemReservas() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-reservas`);
  };

  const editar = (id) => {
    navigate(`/cadastro-reservas/${id}`);
  };

  const [dados, setDados] = React.useState(null);

  async function excluir(id) {
    let url = `${baseURL}/${id}`;
    await axios
      .delete(url)
      .then(function (response) {
        mensagemSucesso(`Reserva excluída com sucesso!`);
        setDados(
          dados.filter((dado) => dado.id !== id)
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir a reserva.`);
      });
  }

  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setDados(response.data);
      })
      .catch(() => {
        mensagemErro('Erro ao carregar reservas.');
      });
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Reservas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning mb-3'
                onClick={() => cadastrar()}
              >
                Nova Reserva
              </button>

              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Hóspede</th>
                    <th scope='col'>CPF</th>
                    <th scope='col'>Tipo de Quarto</th>
                    <th scope='col'>Check-in</th>
                    <th scope='col'>Check-out</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.id}</td>
                      <td>{dado.nomeHospede}</td>
                      <td>{dado.cpf}</td>
                      <td>{dado.tipoQuarto}</td>
                      <td>{new Date(dado.dataCheckIn).toLocaleDateString()}</td>
                      <td>{new Date(dado.dataCheckOut).toLocaleDateString()}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                            onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemReservas;
