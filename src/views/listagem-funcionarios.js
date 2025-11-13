import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../components/card';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { mensagemSucesso, mensagemErro } from '../components/toastr';
import axios from 'axios';
import { BASE_URL } from '../config/axios';

import '../custom.css';

const baseURL = `${BASE_URL}/funcionario`;

function ListagemFuncionarios() {
  const navigate = useNavigate();
  const [dados, setDados] = useState([]);

  // Função para redirecionar ao cadastro
  const cadastrar = () => {
    navigate(`/cadastro-funcionarios`);
  };

  // Função para editar um funcionário
  const editar = (id) => {
    navigate(`/cadastro-funcionarios/${id}`);
  };

  // Função para excluir um funcionário
  async function excluir(id) {
    if (!window.confirm('Deseja realmente excluir este funcionário?')) return;

    try {
      await axios.delete(`${baseURL}/${id}`);
      mensagemSucesso(`Funcionário excluído com sucesso!`);
      setDados(dados.filter((d) => d.id !== id));
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao excluir o funcionário');
    }
  }

  // Buscar lista de funcionários
  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setDados(response.data);
      })
      .catch(() => {
        mensagemErro('Erro ao carregar a lista de funcionários');
      });
  }, []);

  if (!dados || dados.length === 0) {
    return (
      <div className='container'>
        <Card title='Listagem de Funcionários'>
          <p>Nenhum funcionário encontrado.</p>
          <button className='btn btn-warning' onClick={cadastrar}>
            Novo Funcionário
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className='container'>
      <Card title='Listagem de Funcionários'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning mb-3'
                onClick={cadastrar}
              >
                Novo Funcionário
              </button>

              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Data Nascimento</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Cargo</th>
                    <th>CEP</th>
                    <th>Logradouro</th>
                    <th>Número</th>
                    <th>Complemento</th>
                    <th>Bairro</th>
                    <th>Cidade</th>
                    <th>UF</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.id}</td>
                      <td>{dado.nome}</td>
                      <td>{dado.cpf}</td>
                      <td>{dado.dataNascimento}</td>
                      <td>{dado.telefone}</td>
                      <td>{dado.email}</td>
                      <td>{dado.cargo}</td>
                      <td>{dado.cep}</td>
                      <td>{dado.logradouro}</td>
                      <td>{dado.numero}</td>
                      <td>{dado.complemento}</td>
                      <td>{dado.bairro}</td>
                      <td>{dado.cidade}</td>
                      <td>{dado.tipoHospede}</td>
                      <td>
                        <Stack spacing={1} direction='row'>
                          <IconButton
                            aria-label='editar'
                            color='primary'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='excluir'
                            color='error'
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

export default ListagemFuncionarios;
