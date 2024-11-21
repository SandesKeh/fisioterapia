import './index.scss';
import Cabecalho from '../../components/cabecalho';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function Inventario(){

    const [token, setToken] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        let usu = localStorage.getItem('adm-logado')
        setToken(usu)

        if (usu == 'undefined' || usu == 'null' || !usu) {
            navigate('/telaLogin')
        }
    }, []);



    const [mostrarinventario, setMostrarinventario] = useState(false);

    const abririnventario = () => {
        setMostrarinventario(true);
    };

    const fecharinventario = (e) => {
        
        setMostrarinventario(false)
        
    };

    const [mostrareditar, setMostrareditar] = useState(false);

    const abrireditar = () => {
        setMostrareditar(true);
    };

    const fechareditar = (e) => {
        
        setMostrareditar(false)
        
    };

    const [id, setId]= useState('')
    const [nomeproduto, setNomeproduto]= useState('');
    const [categoria, setCategoria]= useState('');
    const [estoque, setEstoque]= useState('');
    const [ondecomprou, setOndecomprou] = useState('');
    const [unitario, setUnitario] = useState('');
    const [total, setTotal]= useState('');
    const [data, setData]= useState('')
    const [nomeprodutoo, setNomeprodutoo]= useState('');
    const [categoriaa, setCategoriaa]= useState('');
    const [estoquee, setEstoquee]= useState('');
    const [ondecomprouu, setOndecomprouu] = useState('');
    const [unitarioo, setUnitarioo] = useState('');
    const [totall, setTotall]= useState('');
    const [dataa, setDataa]= useState('')
    const [array, setArray] = useState([])


    async function inventario() {
        try {
            const resposta = await axios.get(`http://Localhost:5004/inventario/?acesso-ao-token=${token}`);
            const value = resposta.data;
            setArray(value);
            console.log(array);
        } 
        catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        inventario()
    })


    async function CadastrarProduto() {
        try {
            await axios.post(`http://localhost:5004/inseir/usuario/inventario/${nomeproduto}}/${categoria}/${estoque}/${ondecomprou}/${unitario}/${total}/${data}?acesso-ao-token=${token}`);
            toast.success('Produto inserido no inventário com sucesso');
            setMostrarinventario(false)     
        } catch (err) {
            toast.error('Erro ao cadastrar o inventário');
            console.log(err.message)
        }
    }

    async function Adicionar() {
        try {
            await axios.post(`http://localhost:5004/inseir/usuario/inventario/${nomeproduto}}/${categoria}/${estoque}/${ondecomprou}/${unitario}/${total}/${data}?acesso-ao-token=${token}`);
            toast.success('Profissional cadastrado com sucesso');
            setMostrarinventario(false);
            inventario()
        } catch (error) {
            toast.error('Erro, Profissional não cadastrado');
        }
    }
    
    async function atualizarPacotes() {
        try {
            await axios.put(`http://localhost:5004/atualizar/inventario/${nomeproduto}/${categoria}/${estoque}/${ondecomprou}/${unitario}/${total}/${data}/${id}?acesso-ao-token=${token}`);
            toast.success('atualizado com sucesso')
            setMostrareditar(false)
        } 
        catch (err) {
            toast.error( 'erro ao atualizar')
            console.log(err.message)    
        }
    }

    
    return(
        <div className="inventarioo">
            <div className="cabecalho">
            <Cabecalho/>
            </div>
             <div className="protecao">
             
                <div className="t">
                <div className="text">
                            <Link to='/inserirProfissional' >
                                <h1>Usuarios</h1>
                                <h2>Usuarios</h2>
                            </Link>
                        </div>

                        <div className="text">
                            <Link to='/inserirDocumento' >
                                <h1>Modelos</h1>
                                <h2>Documentação</h2>
                            </Link>
                        </div>

                        <div className="text">
                            <Link to='/inserirPacotes' >
                                <h1>Finanças</h1>
                                <h2>Pacotes </h2>
                            </Link>
                        </div>

                        <div className="text">
                            <Link to='/notificacoes'>
                                <h1>Notificações</h1>
                                <h2>Para Cliente</h2>
                            </Link>
                        </div>

                        <div className="text">
                            <Link to='/inventario'>
                                <h1>Inventario </h1>
                            </Link>
                    
                        </div>
                </div>
            </div>
            <div className="lado">
                <table>
                    <tr>
                        <th>ID</th>
                        <th> Nome do Produto </th>
                        <th> Categoria </th>
                        <th>Qts. em estoque</th>
                        <th> Onde comprou</th>
                        <th> Preço unitário </th>
                        <th> Preço unitário</th>
                        <th> Data da compra </th>
                    </tr>       
                    {array.map(item => (
                                    <tr>   
                                        <td>{item.id_inventario}</td>  
                                        <td> {item.nome_produto}</td>
                                        <td> {item.categoria}</td>
                                        <td> {item.qts_estoque} </td>
                                        <td> {item.onde_comprou}</td>
                                        <td> {item.preco_unitario}</td>
                                        <td> {item.valor_total}</td>
                                        <td> {item.data_compra}</td>
                                    </tr>
                           ))}

      

                </table>
                <div className="botao">
                    <button onClick={abririnventario} > + Adicionar Produto </button>
                    <button onClick={abrireditar}> Editar </button>
                </div>

                {mostrarinventario && (
                        <div className="popup-background">
                            <div className="popup">
                                <div className="mensagem">
                                    <h2>Adicionar produto  </h2>
                                    <img onClick={fecharinventario} src="/assets/image/bx-x.svg" alt="" />
                                </div>
                                <div className="mensage">
                                    <h2> Nome produto : </h2>
                                        <input type="text" placeholder='  inserir o nome do produto' value={nomeproduto} onChange={e => setNomeproduto(e.target.value)} />
                                    <h2> Categoria :</h2>
                                        <input type="text" placeholder='Pilates ou fisioterapia  ' value={categoria} onChange={e => setCategoria(e.target.value)} />
                                    <h2>Qts. em estoque</h2>
                                        <input type="text" placeholder='Ex: 20' value={estoque} onChange={e => setEstoque(e.target.value)} />
                                    <h2>Onde comprou </h2>
                                        <input type="text" placeholder='Amazon' value={ondecomprou} onChange={e => setOndecomprou(e.target.value)} />
                                    <h2>Preço Unitario </h2>
                                        <input type="text" placeholder='R$ 80,32' value={unitario} onChange={e => setUnitario(e.target.value)} />
                                    <h2>Valor total</h2>
                                        <input type="text" placeholder='R$ 803' value={total} onChange={e => setTotal(e.target.value)} />
                                    <h2>Data da Compra</h2> 
                                        <input type="date" placeholder='07/07/2024' value={data} onChange={e => setData(e.target.value)} />
                                </div>
                                <div className="botao">
                                   
                                    <div className="button">
                                        <button className='bota' onClick={fecharinventario} > Cancelar </button>
                                        <button onClick={Adicionar} > Salvar </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {mostrareditar && (
                        <div className="popup-background">
                            <div className="popup">
                                <div className="mensagem">
                                    <h2>Adicionar produto  </h2>
                                    <img onClick={fechareditar} src="/assets/image/bx-x.svg" alt="" />
                                </div>
                                <div className="mensage">
                                    <h2> Nome produto : </h2>
                                        <input type="text" placeholder='  inserir o nome do produto' value={nomeprodutoo} onChange={e => setNomeprodutoo(e.target.value)} />
                                    <h2> ID produto : </h2>
                                        <input type="text" placeholder='  inserir o id do produto' value={id} onChange={e => setId(e.target.value)} />
                                    <h2> Categoria :</h2>
                                        <input type="text" placeholder='Pilates ou fisioterapia  ' value={categoriaa} onChange={e => setCategoriaa(e.target.value)} />
                                    <h2>Qts. em estoque</h2>
                                        <input type="text" placeholder='Ex: 20' value={estoquee} onChange={e => setEstoquee(e.target.value)} />
                                    <h2>Onde comprou </h2>
                                        <input type="text" placeholder='Amazon' value={ondecomprouu} onChange={e => setOndecomprouu(e.target.value)} />
                                    <h2>Preço Unitario </h2>
                                        <input type="text" placeholder='R$ 80,32' value={unitarioo} onChange={e => setUnitarioo(e.target.value)} />
                                    <h2>Valor total</h2>
                                        <input type="text" placeholder='R$ 803' value={totall} onChange={e => setTotall(e.target.value)} />
                                    <h2>Data da Compra</h2> 
                                        <input type="date" placeholder='07/07/2024' value={dataa} onChange={e => setDataa(e.target.value)} />
                                </div>
                                <div className="botao">
                                   
                                    <div className="button">
                                        <button className='bota' onClick={fechareditar} > Cancelar </button>
                                        <button onClick={atualizarPacotes} > atualiar </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

            </div>
          
        </div>
    )
}