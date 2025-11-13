import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroReserva() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/reservas`;

  const [id, setId] = useState('');
  const [nomeHospede, setNomeHospede] = useState('');
  const [cpf, setCpf] = useState('');
  const [tipoQuarto, setTipoQuarto] = useState('');
  const [dataCheckIn, setDataCheckIn] = useState('');
  const [dataCheckOut, setDataCheckOut] = useState('');
  const [quartos, setQuartos] = useState([]);
  const [dados, setDados] = useState(null);

  // 🔹 Função para salvar ou atualizar reserva
  async function salvar() {
    const data = {
      id,
      nomeHospede,
      cpf,
      tipoQuarto,
      dataCheckIn,
      dataCheckOut,
    };

    try {
      if (!idParam) {
        await axios.post(baseURL, data);
        mensagemSucesso(`Reserva cadastrada com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data);
        mensagemSucesso(`Reserva atualizada com sucesso!`);
      }
      navigate('/listagem-reservas');
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao salvar reserva');
    }
  }

  // 🔹 Buscar reserva existente (modo edição)
  async function buscar() {
    if (!idParam) return;
    try {
      const response = await axios.get(`${baseURL}/${idParam}`);
      setDados(response.data);
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao buscar dados da reserva');
    }
  }

  // 🔹 Buscar tipos de quarto
  async function buscarQuartos() {
    try {
      const response = await axios.get(`${BASE_URL}/quartos`);
      setQuartos(response.data);
    } catch (error) {
      mensagemErro('Erro ao carregar lista de quartos');
    }
  }

  // 🔹 Inicialização
  useEffect(() => {
    buscarQuartos();
    if (idParam) buscar();
  }, [idParam]);

  // 🔹 Preencher campos ao editar
  useEffect(() => {
    if (dados) {
      setId(dados.id);
      setNomeHospede(dados.nomeHospede);
      setCpf(dados.cpf);
      setTipoQuarto(dados.tipoQuarto);
      setDataCheckIn(dados.dataCheckIn);
      setDataCheckOut(dados.dataCheckOut);
    }
  }, [dados]);

  if (!dados && idParam) return null;

  return (
    <div className='container'>
      <Card title={idParam ? 'Editar Reserva' : 'Nova Reserva'}>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              <FormGroup label='Nome do Hóspede: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nomeHospede}
                  className='form-control'
                  onChange={(e) => setNomeHospede(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='CPF: *' htmlFor='inputCpf'>
                <input
                  type='text'
                  maxLength='11'
                  id='inputCpf'
                  value={cpf}
                  className='form-control'
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Tipo de Quarto: *' htmlFor='selectQuarto'>
                <div className='d-flex align-items-center gap-2'>
                  <select
                    id='selectQuarto'
                    value={tipoQuarto}
                    className='form-select'
                    onChange={(e) => setTipoQuarto(e.target.value)}
                    style={{ flex: 1 }}
                  >
                    <option value=''>Selecione o quarto</option>
                    {quartos.map((q) => (
                      <option key={q.id} value={q.tipo}>
                        {q.tipo} - Nº {q.numero} (Limite: {q.limitePessoas})
                      </option>
                    ))}
                  </select>

                  {/* 🔹 Botão para adicionar novo quarto */}
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => navigate('/cadastro-quartos')}
                  >
                    + Novo Quarto
                  </button>
                </div>
              </FormGroup>

              <FormGroup label='Data de Check-in: *' htmlFor='inputCheckIn'>
                <input
                  type='date'
                  id='inputCheckIn'
                  value={dataCheckIn}
                  className='form-control'
                  onChange={(e) => setDataCheckIn(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Data de Check-out: *' htmlFor='inputCheckOut'>
                <input
                  type='date'
                  id='inputCheckOut'
                  value={dataCheckOut}
                  className='form-control'
                  onChange={(e) => setDataCheckOut(e.target.value)}
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={salvar} type='button' className='btn btn-success'>
                  {idParam ? 'Salvar Alterações' : 'Cadastrar Reserva'}
                </button>

                <button
                  onClick={() => {
                    const confirmar = window.confirm('Deseja realmente cancelar e sair?');
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

export default CadastroReserva;
