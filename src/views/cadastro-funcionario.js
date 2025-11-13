import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import '../custom.css';
import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroFuncionario() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/funcionario`;

  // Estados
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');
  const [tiposCargos, setTiposCargos] = useState([]); // ✅ adicionado
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [ufs, setUfs] = useState([]);
  const [dados, setDados] = useState(null);

  // Função para salvar (POST ou PUT)
  async function salvar() {
    const data = {
      id,
      nome,
      cpf,
      dataNascimento,
      telefone,
      email,
      cargo,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
    };

    try {
      if (!idParam) {
        await axios.post(baseURL, data);
        mensagemSucesso(`Funcionário ${nome} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data);
        mensagemSucesso(`Funcionário ${nome} alterado com sucesso!`);
      }
      navigate('/listagem-funcionarios');
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao salvar funcionário');
    }
  }

  // Buscar dados se for edição
  async function buscar() {
    if (!idParam) return;
    try {
      const response = await axios.get(`${baseURL}/${idParam}`);
      setDados(response.data);
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao buscar dados do funcionário');
    }
  }

  // Carregar opções de cargo
  useEffect(() => {
    const tipos = [
      { id: '1', nome: 'Gerente' },
      { id: '2', nome: 'Recepcionista' },
      { id: '3', nome: 'Faxineiro' },
    ];
    setTiposCargos(tipos);
  }, []);

  // Carregar estados (UFs)
  useEffect(() => {
    const estados = [
      'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
      'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ',
      'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];
    setUfs(estados);
  }, []);

  useEffect(() => {
    if (idParam) buscar();
  }, [idParam]);

  useEffect(() => {
    if (dados) {
      setId(dados.id);
      setNome(dados.nome);
      setCpf(dados.cpf);
      setDataNascimento(dados.dataNascimento);
      setTelefone(dados.telefone);
      setEmail(dados.email);
      setCargo(dados.cargo);
      setCep(dados.cep);
      setLogradouro(dados.logradouro);
      setNumero(dados.numero);
      setComplemento(dados.complemento);
      setBairro(dados.bairro);
      setCidade(dados.cidade);
      setUf(dados.uf || '');
    }
  }, [dados]);

  if (!dados && idParam) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Funcionário'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
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
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Data de Nascimento: *' htmlFor='inputDataNascimento'>
                <input
                  type='date'
                  id='inputDataNascimento'
                  value={dataNascimento}
                  className='form-control'
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
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Email: *' htmlFor='inputEmail'>
                <input
                  type='email'
                  id='inputEmail'
                  value={email}
                  className='form-control'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              {/* Campo de Cargo corrigido para <select> */}
              <FormGroup label='Cargo: *' htmlFor='selectCargo'>
                <select
                  id='selectCargo'
                  value={cargo}
                  className='form-select'
                  onChange={(e) => setCargo(e.target.value)}
                >
                  <option value=''>Selecione um cargo</option>
                  {tiposCargos.map((tipo) => (
                    <option key={tipo.id} value={tipo.nome}>
                      {tipo.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='CEP: *' htmlFor='inputCep'>
                <input
                  type='text'
                  maxLength='9'
                  id='inputCep'
                  value={cep}
                  className='form-control'
                  onChange={(e) => setCep(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Logradouro: *' htmlFor='inputLogradouro'>
                <input
                  type='text'
                  id='inputLogradouro'
                  value={logradouro}
                  className='form-control'
                  onChange={(e) => setLogradouro(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Número: *' htmlFor='inputNumero'>
                <input
                  type='text'
                  id='inputNumero'
                  value={numero}
                  className='form-control'
                  onChange={(e) => setNumero(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Complemento:' htmlFor='inputComplemento'>
                <input
                  type='text'
                  id='inputComplemento'
                  value={complemento}
                  className='form-control'
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Bairro: *' htmlFor='inputBairro'>
                <input
                  type='text'
                  id='inputBairro'
                  value={bairro}
                  className='form-control'
                  onChange={(e) => setBairro(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Cidade: *' htmlFor='inputCidade'>
                <input
                  type='text'
                  id='inputCidade'
                  value={cidade}
                  className='form-control'
                  onChange={(e) => setCidade(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='UF: *' htmlFor='selectUf'>
                <select
                  id='selectUf'
                  value={uf}
                  className='form-select'
                  onChange={(e) => setUf(e.target.value)}
                >
                  <option value=''>Selecione</option>
                  {ufs.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={salvar} type='button' className='btn btn-success'>
                  {idParam ? 'Salvar' : 'Cadastrar'}
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

export default CadastroFuncionario;
