import './index.scss';
import Cabecalho from '../../components/cabecalho';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function TelaCadastrar(){

    const [mostrarMensagem, setMostrarMensagem] = useState(false);

    const abrirMensagem = () => {
        setMostrarMensagem(true);
    };

    const fecharMensagem = (e) => {
        
        setMostrarMensagem(false)
        
    };
    return(
        <div className="telacadastrar">
            <div className="protecao">
                <div className="menu">
                    <Cabecalho/>
                </div>


                <div className="direita">
                    <div className="cima">
                        <div className="inputes">
                            <h1>Pesquisa cliente: </h1>
                            <input type="text" placeholder='Digite o nome do cliente ' />
                        </div>
                        <div className="botao">
                            
                              
                            <button> + Adicionar Cliente </button>
                              
                            <button> <img src="/assets/image/bx-filter-alt.svg" alt="" /> Mais Filtros </button>
                        </div>
                    </div>

                    <div className="baixo">
                        <table>
                            <tr>
                                <th> </th>
                                <th> Nome Cliente </th>
                                <th>Status</th>
                                <th> Data De Nascimento</th>
                                <th> E-mail </th>
                                <th>Telefone </th>
                                <th> Ações </th>
                            </tr>

                            <tr>
                                <td> </td>
                                <td> Kevillyn Sandes</td>
                                <td> Ativo </td>
                                <td> 01/07/2006 </td>
                                <td> Kevillynsandes07@gmail.com</td>
                                <td> (11) 978471285 </td>
                                <td> <img src="/assets/image/bx-edit.svg" alt="" /> 
                                    <img onClick={abrirMensagem} src="/assets/image/bx-message-alt-minus.svg" alt="" />
                                </td>
                                
                            </tr>
                   
                        </table>

                    </div>

                    {mostrarMensagem && (
                        <div className="popup-background">
                            <div className="popup">
                                <div className="mensagem">
                                    <h1>Cancelar cliente </h1>
                                    <img onClick={fecharMensagem} src="/assets/image/bx-x.svg" alt="" />
                                </div>
                                <div className="mensage">
                                    <p>Atenção! <br /> Para reativar o cliente, você deve acessar a listagem dos clientes e aplicar o filtro de Clientes Desativados e clicar em Reativar na coluna de ações.</p>
                                </div>
                                <div className="botao">
                                    <h1> Tem certeza que deseja desativar esse cliente? </h1>
                                    <div className="button">
                                        <button className='botao' onClick={fecharMensagem} > Cancelar </button>
                                        <button> Salvar </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}