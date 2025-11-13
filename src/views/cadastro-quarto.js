import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import '../custom.css';
import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroQuartos() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/quartos`;

  const [id, setId] = useState('');
  const [numero, setNumero] = useState('');
  const [tipo, setTipo] = useState('');
  const [limitePessoas, setLimitePessoas] = useState('');
  const [valor, setValor] = useState('');

  const [dados, setDados] = useState(null);

  async function salvar() {
    const data = {
      id,
      numero,
      tipo,
      limitePessoas,
      valor,
    };

    if (!numero || !tipo || !limitePessoas || !valor) {
      mensagemErro('Preencha todos os campos obrigatórios!');
      return;
    }

    try {
      if (!idParam) {
        await axios.post(baseURL, data);
        mensagemSucesso(`Quarto ${numero} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data);
        mensagemSucesso(`Quarto ${numero} alterado com sucesso!`);
      }
      navigate('/listagem-quartos');
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao salvar quarto.');
    }
  }

  async function buscar() {
    if (!idParam) return;
    try {
      const response = await axios.get(`${baseURL}/${idParam}`);
      setDados(response.data);
    } catch (error) {
      mensagemErro('Erro ao buscar dados do quarto.');
    }
  }

  useEffect(() => {
    if (idParam) buscar();
  }, [idParam]);

  useEffect(() => {
    if (dados) {
      setId(dados.id);
      setNumero(dados.numero);
      setTipo(dados.tipo);
      setLimitePessoas(dados.limitePessoas);
      setValor(dados.valor);
    }
  }, [dados]);

  if (!dados && idParam) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Quarto'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              <FormGroup label='Número do Quarto: *' htmlFor='inputNumero'>
                <input
                  type='text'
                  id='inputNumero'
                  value={numero}
                  className='form-control'
                  onChange={(e) => setNumero(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Tipo: *' htmlFor='inputTipo'>
                <select
                  id='inputTipo'
                  value={tipo}
                  className='form-select'
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value=''>Selecione</option>
                  <option value='Casal'>Casal</option>
                  <option value='Solteiro'>Solteiro</option>
                  <option value='Duplo'>Duplo</option>
                  <option value='Família'>Família</option>
                  <option value='Luxo'>Luxo</option>
                </select>
              </FormGroup>

              <FormGroup label='Limite de Pessoas: *' htmlFor='inputLimite'>
                <input
                  type='number'
                  id='inputLimite'
                  value={limitePessoas}
                  className='form-control'
                  onChange={(e) => setLimitePessoas(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Valor da Diária (R$): *' htmlFor='inputValor'>
                <input
                  type='number'
                  step='0.01'
                  id='inputValor'
                  value={valor}
                  className='form-control'
                  onChange={(e) => setValor(e.target.value)}
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  {idParam ? 'Salvar Alterações' : 'Cadastrar'}
                </button>

                <button
                  onClick={() => {
                    const confirmar = window.confirm('Deseja cancelar e voltar?');
                    if (confirmar) navigate(-1);
                  }}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroQuartos;
