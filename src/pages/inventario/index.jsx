import './index.scss';
import Cabecalho from '../../components/cabecalho';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Inventario(){

    const [mostrarinventario, setMostrarinventario] = useState(false);

    const abririnventario = () => {
        setMostrarinventario(true);
    };

    const fecharinventario = (e) => {
        
        setMostrarinventario(false)
        
    };

    const [nomeproduto, setNomeproduto]= useState('');
    const [categoria, setCategoria]= useState('');
    const [estoque, setEstoque]= useState('');
    const [ondecomprou, setOndecomprou] = useState('');
    const [unitário, setUnitario] = useState('');
    const [total, setTotal]= useState('');
    const [data, setData]= useState('')
    const [array, setArray] = useState([])


    async function inventario() {
        try {
            const resposta = await axios.get('http://localhost:5000/inventario/');
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
            const link = `http://localhost:5000/inserir/inventario?produto=${nomeproduto}&categoria=${categoria}&estoque=${estoque}&local=${ondecomprou}&precoUnitario=${unitário}&valorTotal=${total}&data=${data}`;
            
            await axios.post(link);
            
            alert('Produto inserido no inventário com sucesso');
        } catch (error) {
            alert('Erro ao cadastrar o inventário');
        }
    }
    

    
    return(
        <div className="inventario">
             <div className="protecao">
                <Cabecalho/>
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
                                        <td> {item.nome_produto}</td>
                                        <td> {item.categoria}</td>
                                        <td> {item.qts_estoque} </td>
                                        <td> {item.onde_comprou}</td>
                                        <td> {item.preco_unitario}</td>
                                        <td> {item.valor_total}</td>
                                        <td> {item.data_compra}</td>
                                    </tr>
                           ))}

                    <tr>
                        <td> Bastão de fisioterapia </td>
                        <td> Fisioterapia</td>
                        <td> 3 </td>
                        <td> Fisio Fernandes </td>
                        <td> R$ 86,40</td>
                        <td> R$ 259,20 </td>
                        <td> 01/07/2024</td>

                    </tr>

                </table>
                <div className="botao">
                    <button onClick={abririnventario} > + Adicionar Produto </button>
                    <button> Editar </button>
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
                                        <input type="text" placeholder='R$ 80,32' value={unitário} onChange={e => setUnitario(e.target.value)} />
                                    <h2>Valor total</h2>
                                        <input type="text" placeholder='R$ 803' value={total} onChange={e => setTotal(e.target.value)} />
                                    <h2>Data da Compra</h2> 
                                        <input type="text" placeholder='07/07/2024' value={data} onChange={e => setData(e.target.value)} />
                                </div>
                                <div className="botao">
                                   
                                    <div className="button">
                                        <button className='bota' onClick={fecharinventario} > Cancelar </button>
                                        <button onClick={CadastrarProduto} > Salvar </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

            </div>
          
        </div>
    )
}