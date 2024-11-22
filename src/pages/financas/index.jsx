import './index.scss';
import Cabecalho from '../../components/cabecalho';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function Financas(){
    const [receitas, setReceitas] = useState([]);
    const [despesas, setDespesas] = useState([]);

    const [mostrarPopupReceita, setMostrarPopupReceita] = useState(false);
    const [mostrarPopupDespesa, setMostrarPopupDespesa] = useState(false);
    
    const [alterarProfissionalReceita, setAlterarProfissionalReceita] = useState(false);
    const [alterarProfissionalDespesa, setAlterarProfissionalDespesa] = useState(false);
    const [idEdit, setIdEdit] = useState(null);
    const [idDelet, setIdDelet] = useState(null);

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
    

    const [array, setArray] = useState([]);
    const [saldoAtual, setSaldoAtual] = useState(0);
    const [despesasPrevistas, setDespesasPrevistas] = useState(0);

    async function financas() {
        try {
            const despesas = await buscarDespesas();
            const receitas = await buscarReceitas();
    
            const combinados = [
                ...despesas.map((item) => ({ ...item, tipo: 'Despesa' })),
                ...receitas.map((item) => ({ ...item, tipo: 'Receita' }))
            ];
    
            setArray(combinados);
    
            let saldoAtual = 0;
            let despesasPrevistas = 0;
    
            combinados.forEach(item => {
                if (item.tipo === 'Receita') saldoAtual += parseFloat(item.valor);
                if (item.tipo === 'Despesa') despesasPrevistas += parseFloat(item.valor);
            });
    
            setSaldoAtual(saldoAtual);
            setDespesasPrevistas(despesasPrevistas);
        } catch (err) {
            console.log('Erro ao carregar as finanças:', err.message);
        }
    }


    async function adicionarReceita() {
        try {
            const receita = {
                propriedade: propriedade,
                categoriaFinanceira: categoria,
                descricao: descricao,
                valor: valor,
                dataPagamento: data,
            };
    
            const link = `http://4.172.207.208:5004/inserir/receitas/?acesso-ao-token=${token}`;
            await axios.post(link, receita);
    
            toast.success('Receita cadastrada com sucesso');
            setMostrarPopupReceita(false);
            financas();
        } catch (error) {
            toast.error('Não foi possível cadastrar a receita');
        }
    }
    async function buscarReceitas() {
        try {
            const respostaReceitas = await axios.get(`http://4.172.207.208:5004/receitas/?acesso-ao-token=${token}`);
            return respostaReceitas.data;
        } catch (err) {
            console.log('Erro ao buscar receitas:', err.message);
            return [];
        }
    }


    async function adicionarDespesa() {
        try {
            const despesa = {
                propriedade: propriedadeed,
                categoriaFinanceira: categoriaed,
                descricao: descricaoed,
                valor: valored,
                dataPagamento: dataed,
            };
    
            const link = `http://4.172.207.208:5004/inserir/despesas/?acesso-ao-token=${token}`;
            await axios.post(link, despesa);
    
            toast.success('Despesa cadastrada com sucesso');
            setMostrarPopupDespesa(false);
            financas();
        } catch (error) {
            toast.error('Não foi possível cadastrar a despesa');
        }
    }
    async function buscarDespesas() {
        try {
            const respostaDespesas = await axios.get(`http://4.172.207.208:5004/despesas/?acesso-ao-token=${token}`);
            return respostaDespesas.data;
        } catch (err) {
            console.log('Erro ao buscar despesas:', err.message);
            return [];
        }
    }

    const handleAddReceita = () => {
        adicionarReceita();
    };
    
    const handleAddDespesa = () => {
        adicionarDespesa();
    };
    

    async function atualizarReceita() {
        try {
            setAlterarProfissionalReceita(true);
            setIdEdit(idEdit);
            const resposta = await axios.get(`http://4.172.207.208:5004/consultar/receitas/${idEdit}?acesso-ao-token=${token}`);
            const receita = resposta.data;
    
            setPropriedade(receita.propriedade);
            setCategoria(receita.categoria_financeira);
            setDescricao(receita.descricao);
            setValor(receita.valor);
            setData(receita.data_pagamento);
            setPagamento(receita.pagamento);
        } catch (err) {
            console.error('Erro ao abrir edição de receita:', err.message);
        }
    }
    async function atualizarDespesa() {
        try {
            setAlterarProfissionalDespesa(true);
            setIdEdit(idEdit);
            const resposta = await axios.get(`http://4.172.207.208:5004/consultar/despesas/${idEdit}?acesso-ao-token=${token}`);
            const receita = resposta.data;
    
            setPropriedadeed(receita.propriedadeed);
            setCategoriaed(receita.categoriaed);
            setDescricaoed(receita.descricaoed);
            setValored(receita.valored);
            setDataed(receita.dataed);
            setPagamentoed(receita.pagamentoed);
        } catch (err) {
            console.error('Erro ao abrir edição de despesa:', err.message);
        }
    }

    const abrirAlterar = (id, tipo) => {
        if (tipo === 'Receita') {
            atualizarReceita(idEdit);
        } else {
            atualizarDespesa(idEdit);
        }
    };

    const fecharEditarReceita = () => {
        setAlterarProfissionalReceita(false);
        setIdEdit(null);
        setPropriedade('');
        setCategoria('');
        setDescricao('');
        setValor('');
        setData('');
        setPagamento('');
    };
    
    const fecharEditarDespesa = () => {
        setAlterarProfissionalDespesa(false);
        setIdEdit(null);
        setPropriedadeed('');
        setCategoriaed('');
        setDescricaoed('');
        setValored('');
        setDataed('');
        setPagamentoed('');
    };


    async function deletarReceita() {
        try {
            const link = `http://4.172.207.208:5004/deletar/receitas/${idDelet}?acesso-ao-token=${token}`;
            await axios.delete(link);
            toast.success('Receita deletada com sucesso');
            financas();
        } catch (error) {
            toast.error('Erro ao deletar a receita');
        }
    }
    async function deletarDespesa() {
        try {
            const link = `http://4.172.207.208:5004/deletar/despesas/${idDelet}?acesso-ao-token=${token}`;
            await axios.delete(link);
            toast.success('Despesa deletada com sucesso');
            financas();
        } catch (error) {
            toast.error('Erro ao deletar a despesa');
        }
    }

    const deletarTudo = async (id, tipo) => {
        setIdDelet(id)
        try {
            if (tipo === 'Receita') {
                await deletarReceita(idDelet);
            } else {
                await deletarDespesa(idDelet);
            }
        } catch (error) {
            console.error('Erro ao excluir:', error);
        }
    };
    

    const handleSaveAlteracao = () => {
        if (alterarProfissionalReceita) {
            atualizarReceita(idEdit);
        } else if (alterarProfissionalDespesa) {
            atualizarDespesa(idEdit);
        }
    };




    const formatarMoeda = (valor) => {
        if (typeof valor !== 'string') valor = valor.toString();
        valor = valor.replace(/\D/g, '');

        if (!valor) return 'R$ 0,00';
        valor = valor.replace(/^0+/, '');

        let valorComVirgula = valor.replace(/(\d)(\d{2})$/, '$1,$2');
        valorComVirgula = valorComVirgula.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `R$ ${valorComVirgula}`;
    };
    const handleChangeReceita = (e) => {
        const novoValor = e.target.value.replace(/\D/g, '');
        setValor(novoValor);
    };
    const handleChangeDespesa = (e) => {
        const novoValor = e.target.value.replace(/\D/g, '');
        setValor(novoValor); 
    };
    

    const formatarData = (data) => {
        const dataFormatada = new Date(data);
        return dataFormatada.toLocaleDateString('pt-BR');
    };


    useEffect(() => {
        financas();
    }, []);
    useEffect(() => {
        async function carregarDados() {
            try {
                const respostaReceitas = await axios.get(`http://4.172.207.208:5004/consultar/receitas?acesso-ao-token=${token}`);
                const respostaDespesas = await axios.get(`http://4.172.207.208:5004/consultar/despesas?acesso-ao-token=${token}`);
    
                setReceitas(respostaReceitas.data);
                setDespesas(respostaDespesas.data);
            } catch (err) {
                console.log("Erro ao carregar dados:", err);
            }
        }
    
        carregarDados();
    }, []);

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
                                <button id='primeiro' onClick={() => setMostrarPopupReceita(true)}>+ Adicionar Receita</button>
                                <button id='segundo' onClick={() => setMostrarPopupDespesa(true)}>+ Adicionar Despesa</button>
                            </div>
                        </div>

                        <div className="card">
                            <div className="saldos"> 
                                <div className="saldo">
                                    <img src="/assets/image/Dollar sign.png" alt="" />
                                </div>

                                <div className="saldoatual">
                                    <h1>Saldo atual</h1>
                                    <h2> {saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </h2>
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
                                    <h2>{despesasPrevistas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
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
                                <thead>
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Propriedade</th>
                                        <th>Categoria Financeira</th>
                                        <th>Descrição</th>
                                        <th>Valor</th>
                                        <th>Data Pagamento</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {array.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.tipo}</td>
                                        <td>{item.propriedade}</td>
                                        <td>{item.categoria_financeira}</td>
                                        <td>{item.descricao}</td>
                                        <td>{parseFloat(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td>{formatarData(item.data_pagamento)}</td>
                                        <td>
                                            <img
                                                onClick={() => abrirAlterar(item.id, item.tipo)}
                                                src="/assets/image/bx-edit.svg"
                                                alt="Editar"
                                            />
                                            <img
                                                onClick={() => deletarTudo(item.id, item.tipo)}
                                                src="/assets/image/bx-trash.svg"
                                                alt="Excluir"
                                            />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {mostrarPopupReceita && (
                            <div className="popup-background">
                                <div className="popup">
                                    <div className="mensagem">
                                        <h1>Adicionar Receita</h1>
                                        <img onClick={() => setMostrarPopupReceita(false)} src="/assets/image/bx-x.svg" alt="Fechar" />
                                    </div>
                                    <div className="mensage">
                                        <h1>Propriedade:</h1>
                                        <select value={propriedade} onChange={(e) => setPropriedade(e.target.value)}>
                                            <option value="">Selecione</option>
                                            <option value="convênio">Convênio</option>
                                            <option value="público">Público</option>
                                        </select>

                                        <h1>Categoria Financeira:</h1>
                                        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                            <option value="">Selecione</option>
                                            <option value="venda_produtos">Venda de Produtos</option>
                                            <option value="servicos_prestados">Serviços Prestados</option>
                                            <option value="investimentos">Investimentos</option>
                                            {/*outras categorias de receitas*/}
                                        </select>

                                        <h1>Descrição:</h1>
                                        <input
                                            type="text"
                                            placeholder="Digite aqui"
                                            value={descricao}
                                            onChange={(e) => setDescricao(e.target.value)}
                                        />

                                        <div className="row">
                                            <div className="valor">
                                                <h1>Valor:</h1>
                                                <input
                                                    type="text"
                                                    placeholder="R$ 0,00"
                                                    value={formatarMoeda(valor)}
                                                    onChange={handleChangeReceita}
                                                />
                                            </div>
                                            <div className="data">
                                                <h1>Data de pagamento:</h1>
                                                <input
                                                    type="date"
                                                    value={data}
                                                    onChange={(e) => setData(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <h1>Forma de pagamento:</h1>
                                        <select value={pagamento} onChange={(e) => setPagamento(e.target.value)}>
                                            <option value="">Selecione</option>
                                            <option value="Crédito">Crédito</option>
                                            <option value="Débito">Débito</option>
                                            <option value="Dinheiro">Dinheiro</option>
                                        </select>
                                    </div>

                                    <div className="botao">
                                        <div className="button">
                                            <button className="botao" onClick={() => setMostrarPopupReceita(false)}> Cancelar </button>
                                            <button onClick={handleAddReceita}>Salvar</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {mostrarPopupDespesa && (
                            <div className="popup-background">
                                <div className="popup">
                                    <div className="mensagem">
                                        <h1>Adicionar Despesa</h1>
                                        <img onClick={() => setMostrarPopupDespesa(false)} src="/assets/image/bx-x.svg" alt="Fechar" />
                                    </div>
                                    <div className="mensage">
                                        <h1>Propriedade:</h1>
                                        <select value={propriedadeed} onChange={(e) => setPropriedadeed(e.target.value)}>
                                            <option value="">Selecione</option>
                                            <option value="convênio">Convênio</option>
                                            <option value="público">Público</option>
                                        </select>

                                        <h1>Categoria Financeira:</h1>
                                        <select value={categoriaed} onChange={(e) => setCategoriaed(e.target.value)}>
                                            <option value="">Selecione</option>
                                            <option value="13_salario">13° salário</option>
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

                                        <h1>Descrição:</h1>
                                        <input
                                            type="text"
                                            placeholder="Digite aqui"
                                            value={descricaoed}
                                            onChange={(e) => setDescricaoed(e.target.value)}
                                        />

                                        <div className="row">
                                            <div className="valor">
                                                <h1>Valor:</h1>
                                                <input
                                                    type="text"
                                                    placeholder="R$ 0,00"
                                                    value={formatarMoeda(valor)}
                                                    onChange={handleChangeDespesa}
                                                />
                                            </div>
                                            <div className="data">
                                                <h1>Data de pagamento:</h1>
                                                <input
                                                    type="date"
                                                    value={dataed}
                                                    onChange={(e) => setDataed(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <h1>Forma de pagamento:</h1>
                                        <select value={pagamentoed} onChange={(e) => setPagamentoed(e.target.value)}>
                                            <option value="">Selecione</option>
                                            <option value="Crédito">Crédito</option>
                                            <option value="Débito">Débito</option>
                                            <option value="Dinheiro">Dinheiro</option>
                                        </select>
                                    </div>

                                    <div className="botao">
                                        <div className="button">
                                            <button className="botao" onClick={() => setMostrarPopupDespesa(false)}> Cancelar </button>
                                            <button onClick={handleAddDespesa}>Salvar</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}


                        {alterarProfissionalReceita && (
                            <div className="popup-background">
                                <div className="popup">
                                    <div className="mensagem">
                                        <h1>Editar Receita</h1>
                                        <img onClick={fecharEditarReceita} src="/assets/image/bx-x.svg" alt="Fechar" />
                                    </div>
                                    <div className="mensage">
                                        <h1>Propriedade:</h1>
                                        <select value={propriedade} onChange={(e) => setPropriedadeed(e.target.value)}>
                                            <option value="">Selecione</option>
                                            <option value="convênio">Convênio</option>
                                            <option value="público">Público</option>
                                        </select>

                                        <h1>Categoria Financeira:</h1>
                                        <select value={categoria} onChange={(e) => setCategoriaed(e.target.value)}>
                                            <option value="">Selecione</option>
                                            <option value="venda_produtos">Venda de Produtos</option>
                                            <option value="servicos_prestados">Serviços Prestados</option>
                                            <option value="investimentos">Investimentos</option>
                                            {/* outras categorias de receita */}
                                        </select>

                                        <h1>Descrição:</h1>
                                        <input
                                            type="text"
                                            placeholder="Digite aqui"
                                            value={descricao}
                                            onChange={(e) => setDescricaoed(e.target.value)}
                                        />

                                        <div className="row">
                                            <div className="valor">
                                                <h1>Valor:</h1>
                                                <input
                                                    type="text"
                                                    placeholder="R$ 0,00"
                                                    value={formatarMoeda(valor)}
                                                    onChange={handleChangeReceita}
                                                />
                                            </div>
                                            <div className="data">
                                                <h1>Data de pagamento:</h1>
                                                <input
                                                    type="date"
                                                    value={data}
                                                    onChange={(e) => setDataed(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <h1>Forma de pagamento:</h1>
                                        <select value={pagamento} onChange={(e) => setPagamentoed(e.target.value)}>
                                            <option value="">Selecione</option>
                                            <option value="Crédito">Crédito</option>
                                            <option value="Débito">Débito</option>
                                            <option value="Dinheiro">Dinheiro</option>
                                        </select>
                                    </div>

                                    <div className="botao">
                                        <div className="button">
                                            <button className='botao' onClick={fecharEditarReceita} > Cancelar </button>
                                            <button onClick={handleSaveAlteracao}>Salvar</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {alterarProfissionalDespesa && (
                            <div className="popup-background">
                                <div className="popup">
                                    <div className="mensagem">
                                        <h1>Editar Despesa</h1>
                                        <img onClick={fecharEditarDespesa} src="/assets/image/bx-x.svg" alt="Fechar" />
                                    </div>
                                    <div className="mensage">
                                        <h1>Propriedade:</h1>
                                        <select value={propriedadeed} onChange={(e) => setPropriedadeed(e.target.value)}>
                                            <option value="">Selecione</option>
                                            <option value="convênio">Convênio</option>
                                            <option value="público">Público</option>
                                        </select>

                                        <h1>Categoria Financeira:</h1>
                                        <select value={categoriaed} onChange={(e) => setCategoriaed(e.target.value)}>
                                            <option value="">Selecione</option>
                                            <option value="13_salario">13° salário</option>
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

                                        <h1>Descrição:</h1>
                                        <input
                                            type="text"
                                            placeholder="Digite aqui"
                                            value={descricaoed}
                                            onChange={(e) => setDescricaoed(e.target.value)}
                                        />

                                        <div className="row">
                                            <div className="valor">
                                                <h1>Valor:</h1>
                                                <input
                                                    type="text"
                                                    placeholder="R$ 0,00"
                                                    value={formatarMoeda(valor)}
                                                    onChange={handleChangeDespesa}
                                                />
                                            </div>
                                            <div className="data">
                                                <h1>Data de pagamento:</h1>
                                                <input
                                                    type="date"
                                                    value={dataed}
                                                    onChange={(e) => setDataed(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <h1>Forma de pagamento:</h1>
                                        <select value={pagamentoed} onChange={(e) => setPagamentoed(e.target.value)}>
                                            <option value="">Selecione</option>
                                            <option value="Crédito">Crédito</option>
                                            <option value="Débito">Débito</option>
                                            <option value="Dinheiro">Dinheiro</option>
                                        </select>
                                    </div>

                                    <div className="botao">
                                        <div className="button">
                                            <button className='botao' onClick={fecharEditarDespesa} > Cancelar </button>
                                            <button onClick={handleSaveAlteracao}>Salvar</button>
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