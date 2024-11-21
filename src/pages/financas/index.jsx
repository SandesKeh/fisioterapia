import './index.scss';
import Cabecalho from '../../components/cabecalho';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';


export default function Financas(){

    const [mostrarReceita, setMostrarReceita] = useState(false);
    const [alterarProfissional, setAlterarProfissional] = useState(false);
    const [idEdit, setIdEdit] = useState(null);

    const [propriedade, setPropriedade] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [pagamento, setPagamento] = useState('');

    const [propriedadeed, setPropriedadeed] = useState('');
    const [categoriaed, setCategoriaed] = useState('');
    const [descricaoed, setDescricaoed] = useState('');
    const [valored, setValored] = useState('');
    const [dataed, setDataed] = useState('');
    const [pagamentoed, setPagamentoed] = useState('');


    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        let usu = localStorage.getItem('adm-logado')
        setToken(usu)

        if (usu == 'undefined' || usu == 'null' || !usu) {
            navigate('/telaLogin')
        }
    }, []);

    const abrirReceita = () => {
        setMostrarReceita(true);
    };
    const fecharReceita = (e) => {
        setMostrarReceita(false)
    };


    const abrirProfissionalEditar = async (id, tipo) => {
        try {
            setAlterarProfissional(true);
            setIdEdit(id);

            if (tipo === 'despesa') {
                const resposta = await axios.get(`http://localhost:5004/consultar/despesas/${id}?acesso-ao-token=${token}`);
                const despesa = resposta.data;
                setPropriedadeed(despesa.propriedade);
                setCategoriaed(despesa.categoria_financeira);
                setDescricaoed(despesa.descricao);
                setValored(despesa.valor);
                setDataed(despesa.data_pagamento);
                setPagamentoed(despesa.pagamentoed);
            } 
            
            else if (tipo === 'receita') {
                const resposta = await axios.get(`http://localhost:5004/consultar/receitas/${id}?acesso-ao-token=${token}`);
                const receita = resposta.data;
                setPropriedade(receita.propriedade);
                setCategoria(receita.categoria_financeira);
                setDescricao(receita.descricao);
                setValor(receita.valor);
                setData(receita.data_pagamento);
                setPagamento(receita.pagamento);
            }

        } catch (err) {
            console.log(err);
        }
    };
    const fecharProfissionalEditar = () => {
        setAlterarProfissional(false);
        setIdEdit(null)
    };



    async function addDespesa() {
        try {
            const link = `http://localhost:5004/inserir/despesas/?acesso-ao-token=${token}`;
            const despesa = {
                propriedade: propriedade,
                categoriaFinanceira: categoria,
                descricao: descricao,
                valor: valor,
                dataPagamento: data
            }
            await axios.post(link, despesa);
            toast.success('Despesas cadastrada com sucesso');
            setMostrarReceita(false)
            financas()
        } catch (error) {
            toast.error('não foi cadastrado')
        }
    }

    const [array, setArray]= useState([]);
    async function financas() {
        try {
            const resposta = await axios.get(`http://localhost:5004/despesas/?acesso-ao-token=${token}`);
            const valor = resposta.data;
            setArray(valor)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(( ) => {
        financas()
    })

    async function Alterar(tipo) {
        try {
            setAlterarProfissional(false)

            if (tipo === 'despesa') {
                await axios.put(`http://localhost:5004/update/despesa/${propriedadeed}/${categoriaed}/${descricaoed}/${valored}/${dataed}/${idEdit}?acesso-ao-token=${token}`);
                toast.success('Despesas alterado com sucesso');
            } 
            
            else if (tipo === 'receita') {
                await axios.put(`http://localhost:5004/update/receitas/${propriedadeed}/${categoriaed}/${descricaoed}/${valored}/${dataed}/${idEdit}?acesso-ao-token=${token}`);
                toast.success('Despesas alterado com sucesso');
            }
            
        } catch (err) {
            toast.error("Erro ao atualizar os dados ");
        }
    }



    const formatarMoeda = (valor, valored) => {
        if (!valor || !valored) return '';
        const numero = parseFloat(valor, valored);
        if (isNaN(numero)) return '';
        return numero.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };
    
    const tratarDigitoMoeda = (valor, valored) => {
        const somenteNumeros = [valor, valored].replace(/[^\d]/g, '');
        const numeroComCentavos = (parseInt(somenteNumeros, 10) / 100).toFixed(2); 
        return numeroComCentavos; 
    };


    return(
        <div className="financas">
            <div className="cabecalho">
                <Cabecalho/>
            </div>
            <div className="all">
                <div className="cima1">    
                    <div className="cima">
                        <div className="periodo">
                            <h1> Período: </h1>
                            <select name="" id=""> <option value="text"> Ago/2024</option> </select>
                            <div className="botao">                                
                                <button id='primeiro' onClick={abrirReceita} >+ Adicionar Receita </button>
                                <button id='segundo' onClick={abrirReceita} >+ Adicionar despesa </button>
                            </div>
                        </div>

                        <div className="card">
                            <div className="saldos"> 
                                <div className="saldo">
                                    <img src="/assets/image/Dollar sign.png" alt="" />
                                </div>

                                <div className="saldoatual">
                                    <h1>Saldo atual</h1>
                                    <h2>R$ 0,00 </h2>
                                </div>

                                <div className="naopago">
                                    <h1> Não pago: R$ 0,00</h1>
                                </div>
                            </div>

                            <div className="saldos2"> 
                                <div className="saldo">
                                    <img src="/assets/image/Icon.png" alt="" />
                                </div>

                                <div className="saldoatual">
                                    <h1>Despesas Prevista</h1>
                                    <h2>R$ 0,00</h2>
                                </div>

                                <div className="naopago">
                                    <h1> Não pago: R$ 0,00</h1>
                                </div>
                            </div>
                        </div>


                        <div className="filtros">
                            <div className="esquerda">
                                <button>Mais Filtros</button>
                            </div>
                        </div>

                        <div className="tabela">
                            <table>
                                <tr>
                                    <th> ID</th>
                                    <th> Propiedade</th>
                                    <th>Categoria Financeira</th>
                                    <th> Descrição</th>
                                    <th> Valor  </th>
                                    <th> Data pagamento </th>
                                    <th> Ações </th>
                                </tr>

                                {array.map(item => (
                                    <tr key={item.id_adicionar_despesa}>
                                        <td> {item.id_adicionar_despesa} </td>
                                        <td> {item.propriedade} </td>
                                        <td> {item.categoria_financeira} </td>
                                        <td> {item.descricao} </td>
                                        <td> {item.valor} </td>
                                        <td> {item.data_pagamento} </td>
                                        <td> 
                                            <img onClick={ () => abrirProfissionalEditar(item.id_adicionar_despesa, item.propriedade, item.categoria_financeira, item.descricao, item.valor, item.data_pagamento)} src="/assets/image/bx-edit.svg" alt="" /> 
                                            <img src="/assets/image/bx-trash.svg" alt="" />
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>

                        {mostrarReceita && (
                            <div className="popup-background">
                                <div className="popup">
                                    <div className="mensagem">
                                        <h1>Adicionar Despesa  </h1>
                                        <img onClick={fecharReceita} src="/assets/image/bx-x.svg" alt="" />
                                    </div>
                                    <div className="mensage">
                                        <h1> Propriedade: </h1>
                                        <select value={propriedadeed} onChange={e => setPropriedadeed(e.target.value)} > 
                                            <option value=""> Selecione </option>
                                            <option value="convênio "> Convênio </option>
                                            <option value="público "> Público  </option>
                                        </select>
                                        <h1> Categoria financeira:</h1>
                                        <select value={categoriaed} onChange={e => setCategoriaed(e.target.value)} >
                                            <option value="">Selecione</option>
                                            <option value="13_salari">13° salário</option>
                                            <option value="adiantamento">Adiantamento</option>
                                            <option value="agua">Água</option>
                                            <option value="ajuste_caixa">Ajuste de caixa</option>
                                            <option value="alimentacao">Alimentação</option>
                                            <option value="aluguel">Aluguel</option>
                                            <option value="bonificacao">Bonificação</option>
                                            <option value="confins">Confins</option>
                                            <option value="conselho">Conselho</option>
                                            <option value="contabilidade">Contabilidade</option>
                                            <option value="csll">CSLL</option>
                                            <option value="darf">DARF</option>
                                            <option value="despesas_nao_categorizadas">Despesas não categorizadas</option>
                                            <option value="distribuicao_lucros">Distribuição de lucros</option>
                                            <option value="energia_eletrica">Energia elétrica</option>
                                            <option value="exames_pre_deminionais">Exames pré e demissionais</option>
                                            <option value="ferias">Férias</option>
                                            <option value="fgts">FGTS</option>
                                            <option value="horas_extras">Horas Extras</option>
                                            <option value="inss">INSS</option>
                                            <option value="iof">IOF</option>
                                            <option value="ipi">IPI</option>
                                            <option value="iptu">IPTU</option>
                                            <option value="ipva">IPVA</option>
                                            <option value="irpj">IRPJ</option>
                                            <option value="irrf">IRRF</option>
                                            <option value="iss">ISS</option>
                                            <option value="juros">Juros</option>
                                            <option value="material_escritorio">Material de escritório</option>
                                            <option value="outros">Outros</option>
                                            <option value="pis">PIS</option>
                                            <option value="pro_labore">Pró-labore</option>
                                            <option value="remuneracao">Remuneração</option>
                                            <option value="rescisao_trabalhista">Rescisões trabalhistas</option>
                                            <option value="salario">Salário</option>
                                            <option value="simples_nacional">Simples Nacional</option>
                                            <option value="taxas_bancarias">Taxas bancárias</option>
                                            <option value="telefone_celular">Telefone celular</option>
                                            <option value="telefonia_internet">Telefonia e Internet</option>
                                            <option value="transportadora">Transportadora</option>
                                            <option value="vale_alimentacao">Vale Alimentação</option>
                                            <option value="vale_transporte">Vale Transporte</option>
                                            <option value="viagens">Viagens</option>
                                        </select>

                                        <h1>Descrição: </h1>
                                        <input type="text" placeholder='Digite aqui' value={descricaoed} onChange={e => setDescricaoed(e.target.value)} />
                                        <div className="row">
                                            <div className="valor">
                                                <h1>Valor: </h1>
                                                <input
                                                    type="text"
                                                    placeholder="R$ 0,00"
                                                    value={formatarMoeda(valored)}
                                                    onChange={(e) => {
                                                        const valorBruto = tratarDigitoMoeda(e.target.value);
                                                        setValor(valorBruto); 
                                                    }}
                                                />;
                                            </div>
                                            <div className="data">
                                                <h1>Data de pagamento:</h1>
                                                <input type="date" value={dataed} onChange={e => setDataed(e.target.value)} />
                                            </div>
                                        </div>
                                        <h1>Forma de pagamento:</h1>
                                        <select value={pagamentoed} onChange={e => setPagamentoed(e.target.value)} > 
                                            <option value=""> Selecione </option>
                                            <option value="Crédito"> Crédito </option>
                                            <option value="Débito"> Débito </option>
                                            <option value="Dinheiro"> Dinheiro </option>
                                        </select>
                                    </div>
                                    <div className="botao">
                                    
                                        <div className="button">
                                            <button className='botao' onClick={fecharReceita} > Cancelar </button>
                                            <button onClick={addDespesa} > Salvar </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {alterarProfissional && (
                            <div className="popup-background">
                                <div className="popup">
                                    <div className="mensagem">
                                        <h1>Adicionar Despesa  </h1>
                                        <img onClick={fecharProfissionalEditar} src="/assets/image/bx-x.svg" alt="" />
                                    </div>
                                    <div className="mensage">
                                        <h1> Propriedade: </h1>
                                        <select value={propriedadeed} onChange={e => setPropriedadeed(e.target.value)} > 
                                            <option value=""> Selecione </option>
                                            <option value="convênio "> Convênio </option>
                                            <option value="público "> Público  </option>
                                        </select>
                                        <h1> Categoria financeira:</h1>
                                        <select value={categoriaed} onChange={e => setCategoriaed(e.target.value)} >
                                            <option value="">Selecione</option>
                                            <option value="13_salari">13° salário</option>
                                            <option value="adiantamento">Adiantamento</option>
                                            <option value="agua">Água</option>
                                            <option value="ajuste_caixa">Ajuste de caixa</option>
                                            <option value="alimentacao">Alimentação</option>
                                            <option value="aluguel">Aluguel</option>
                                            <option value="bonificacao">Bonificação</option>
                                            <option value="confins">Confins</option>
                                            <option value="conselho">Conselho</option>
                                            <option value="contabilidade">Contabilidade</option>
                                            <option value="csll">CSLL</option>
                                            <option value="darf">DARF</option>
                                            <option value="despesas_nao_categorizadas">Despesas não categorizadas</option>
                                            <option value="distribuicao_lucros">Distribuição de lucros</option>
                                            <option value="energia_eletrica">Energia elétrica</option>
                                            <option value="exames_pre_deminionais">Exames pré e demissionais</option>
                                            <option value="ferias">Férias</option>
                                            <option value="fgts">FGTS</option>
                                            <option value="horas_extras">Horas Extras</option>
                                            <option value="inss">INSS</option>
                                            <option value="iof">IOF</option>
                                            <option value="ipi">IPI</option>
                                            <option value="iptu">IPTU</option>
                                            <option value="ipva">IPVA</option>
                                            <option value="irpj">IRPJ</option>
                                            <option value="irrf">IRRF</option>
                                            <option value="iss">ISS</option>
                                            <option value="juros">Juros</option>
                                            <option value="material_escritorio">Material de escritório</option>
                                            <option value="outros">Outros</option>
                                            <option value="pis">PIS</option>
                                            <option value="pro_labore">Pró-labore</option>
                                            <option value="remuneracao">Remuneração</option>
                                            <option value="rescisao_trabalhista">Rescisões trabalhistas</option>
                                            <option value="salario">Salário</option>
                                            <option value="simples_nacional">Simples Nacional</option>
                                            <option value="taxas_bancarias">Taxas bancárias</option>
                                            <option value="telefone_celular">Telefone celular</option>
                                            <option value="telefonia_internet">Telefonia e Internet</option>
                                            <option value="transportadora">Transportadora</option>
                                            <option value="vale_alimentacao">Vale Alimentação</option>
                                            <option value="vale_transporte">Vale Transporte</option>
                                            <option value="viagens">Viagens</option>
                                        </select>
                                        <h1>Descrição: </h1>
                                        <input type="text" placeholder='Digite aqui' value={descricaoed} onChange={e => setDescricaoed(e.target.value)} />
                                        <div className="row">
                                            <div className="valor">
                                                <h1>Valor: </h1>
                                                <input
                                                    type="text"
                                                    placeholder="R$ 0,00"
                                                    value={formatarMoeda(valored)}
                                                    onChange={(e) => {
                                                        const valorBruto = tratarDigitoMoeda(e.target.value);
                                                        setValor(valorBruto); 
                                                    }}
                                                />;
                                            </div>
                                            <div className="data">
                                                <h1>Data de pagamento:</h1>
                                                <input type="date" value={dataed} onChange={e => setDataed(e.target.value)} />
                                            </div>
                                        </div>
                                        <h1>Forma de pagamento:</h1>
                                        <select value={pagamentoed} onChange={e => setPagamentoed(e.target.value)} > 
                                            <option value=""> Selecione </option>
                                            <option value="Crédito"> Crédito </option>
                                            <option value="Débito"> Débito </option>
                                            <option value="Dinheiro"> Dinheiro </option>
                                        </select>
                                    </div>
                                    <div className="botao">
                                    
                                        <div className="button">
                                            <button className='botao' onClick={fecharProfissionalEditar} > Cancelar </button>
                                            <button onClick={Alterar} > Salvar </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}