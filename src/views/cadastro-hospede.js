import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';
import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroHospede() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/hospede`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [tipoHospede, setTipoHospede] = useState('');
  const [tiposHospedes, setTiposHospedes] = useState([]);

  const [dados, setDados] = useState(null);

  async function salvar() {
    let data = {
      id,
      nome,
      cpf,
      dataNascimento,
      telefone,
      email,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      tipoHospede
    };

    data = JSON.stringify(data);

    if (idParam == null) {
      // Cadastro novo
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function () {
          mensagemSucesso(`Hóspede ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-hospede`);
        })
        .catch(function (error) {
          mensagemErro(error.response?.data || 'Erro ao cadastrar hóspede');
        });
    } else {
      // Alteração
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function () {
          mensagemSucesso(`Hóspede ${nome} alterado com sucesso!`);
          navigate(`/listagem-hospede`);
        })
        .catch(function (error) {
          mensagemErro(error.response?.data || 'Erro ao alterar hóspede');
        });
    }
  }

  async function buscar() {
    if (!idParam) return;

    await axios
      .get(`${baseURL}/${idParam}`)
      .then((response) => {
        setDados(response.data);
      })
      .catch((error) => {
        mensagemErro(error.response?.data || 'Erro ao buscar dados do hóspede');
      });
  }

  useEffect(() => {
    const tipos = [
      { id: '1', nome: 'AC' }, { id: '2', nome: 'AL' }, { id: '3', nome: 'AP' },
      { id: '4', nome: 'AM' }, { id: '5', nome: 'BA' }, { id: '6', nome: 'CE' },
      { id: '7', nome: 'DF' }, { id: '8', nome: 'ES' }, { id: '9', nome: 'GO' },
      { id: '10', nome: 'MA' }, { id: '11', nome: 'MT' }, { id: '12', nome: 'MS' },
      { id: '13', nome: 'MG' }, { id: '14', nome: 'PR' }, { id: '15', nome: 'PB' },
      { id: '16', nome: 'PE' }, { id: '17', nome: 'PI' }, { id: '18', nome: 'RJ' },
      { id: '19', nome: 'RN' }, { id: '20', nome: 'RS' }, { id: '21', nome: 'RO' },
      { id: '22', nome: 'RR' }, { id: '23', nome: 'SC' }, { id: '24', nome: 'SP' },
      { id: '25', nome: 'SE' }, { id: '26', nome: 'TO' },
    ];
    setTiposHospedes(tipos);
  }, []);

  useEffect(() => {
    if (idParam) {
      buscar();
    }
  }, [idParam]);

  useEffect(() => {
    if (dados) {
      setId(dados.id);
      setNome(dados.nome);
      setCpf(dados.cpf);
      setDataNascimento(dados.dataNascimento);
      setTelefone(dados.telefone);
      setEmail(dados.email);
      setCep(dados.cep);
      setLogradouro(dados.logradouro);
      setNumero(dados.numero);
      setComplemento(dados.complemento);
      setBairro(dados.bairro);
      setCidade(dados.cidade);
      setTipoHospede(dados.tipoHospede || '');
    }
  }, [dados]);

  if (!dados && idParam) return null; // Evita renderização antes dos dados carregarem

  return (
    <div className='container'>
      <Card title='Cadastro de Hóspede'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='CPF: *' htmlFor='inputCpf'>
                <input
                  type='text'
                  maxLength='11'
                  id='inputCpf'
                  value={cpf}
                  className='form-control'
                  name='cpf'
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Data de nascimento: *' htmlFor='inputDataNascimento'>
                <input
                  type='date'
                  id='inputDataNascimento'
                  value={dataNascimento}
                  className='form-control'
                  name='dataNascimento'
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Telefone: *' htmlFor='inputTelefone'>
                <input
                  type='text'
                  maxLength='15'
                  id='inputTelefone'
                  value={telefone}
                  className='form-control'
                  name='telefone'
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Email: *' htmlFor='inputEmail'>
                <input
                  type='email'
                  id='inputEmail'
                  value={email}
                  className='form-control'
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='CEP: *' htmlFor='inputCep'>
                <input
                  type='text'
                  maxLength='9'
                  id='inputCep'
                  value={cep}
                  className='form-control'
                  name='cep'
                  onChange={(e) => setCep(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Logradouro: *' htmlFor='inputLogradouro'>
                <input
                  type='text'
                  id='inputLogradouro'
                  value={logradouro}
                  className='form-control'
                  name='logradouro'
                  onChange={(e) => setLogradouro(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Número: *' htmlFor='inputNumero'>
                <input
                  type='text'
                  id='inputNumero'
                  value={numero}
                  className='form-control'
                  name='numero'
                  onChange={(e) => setNumero(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Complemento:' htmlFor='inputComplemento'>
                <input
                  type='text'
                  id='inputComplemento'
                  value={complemento}
                  className='form-control'
                  name='complemento'
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Bairro: *' htmlFor='inputBairro'>
                <input
                  type='text'
                  id='inputBairro'
                  value={bairro}
                  className='form-control'
                  name='bairro'
                  onChange={(e) => setBairro(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Cidade: *' htmlFor='inputCidade'>
                <input
                  type='text'
                  id='inputCidade'
                  value={cidade}
                  className='form-control'
                  name='cidade'
                  onChange={(e) => setCidade(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='UF: *' htmlFor='selectTipoHospede'>
                <select
                  id='selectTipoHospede'
                  value={tipoHospede}
                  className='form-select'
                  onChange={(e) => setTipoHospede(e.target.value)}
                >
                  <option value=''>Selecione um estado</option>
                  {tiposHospedes.map((tipo) => (
                    <option key={tipo.id} value={tipo.nome}>
                      {tipo.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Cadastrar
                </button>

                <button
                  onClick={() => {
                    const confirmar = window.confirm(
                      'Deseja realmente cancelar e sair?'
                    );
                    if (confirmar) {
                      navigate(-1);
                    }
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

export default CadastroHospede;
