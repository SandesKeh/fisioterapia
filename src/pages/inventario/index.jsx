import './index.scss';
import Cabecalho from '../../components/cabecalho';
import { useState } from 'react';
import { Link } from 'react-router-dom';


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
                    <tr>
                        <td> Bola suíça </td>
                        <td> Pilates</td>
                        <td> 10 </td>
                        <td> Amazon </td>
                        <td> R$ 80,32</td>
                        <td> R$ 803,20 </td>
                        <td> 07/07/2024 </td>

                    </tr>

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
                                        <input type="text" placeholder='  inserir o nome do produto'  />

                                    <h2> Categoria :</h2>
                                        <input type="text" placeholder='Pilates ou fisioterapia  '  />
                                    <h2>Qts. em estoque</h2>
                                        <input type="text" placeholder='Ex: 20' />
                                    <h2>Onde comprou </h2>
                                        <input type="text" placeholder='Amazon' />
                                    <h2>Preço Unitario </h2>    
                                        <input type="text" placeholder='R$ 80,32' />
                                    <h2>Valor total</h2>
                                        <input type="text" placeholder='R$ 803' />    
                                    <h2>Data da Compra</h2> 
                                        <input type="text" placeholder='07/07/2024' />                         
                                </div>
                                <div className="botao">
                                   
                                    <div className="button">
                                        <button className='bota' onClick={fecharinventario} > Cancelar </button>
                                        <button  > Salvar </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

            </div>
          
        </div>
    )
}