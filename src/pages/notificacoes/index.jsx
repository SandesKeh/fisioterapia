import './index.scss';
import Cabecalho from '../../components/cabecalho';
import { Link } from 'react-router-dom';

export default function Notificacoes(){
    return(
        <div className="notificacoes">
            <div className="protecao">
                <div className="menu">
                    <Cabecalho/>
                </div>

                <div className="t">
                        <div className="text">
                            <h1>Usuarios</h1>
                            <h2>Usuarios</h2>
                        </div>

                        <div className="text">
                            <h1>Modelos</h1>
                            <h2>Documentação</h2>
                        </div>

                        <div className="text">
                            <h1>Finanças</h1>
                            <h2>Pacotes </h2>
                        </div>

                        <div className="text">
                            <h1>Notificações</h1>
                            <h2>Para Cliente</h2>
                        </div>

                        <div className="text">
                            <h1>Inventario </h1>
                    
                        </div>
                    </div>
                
            </div>

            <div className="notificacao">
                    <h1> Notificações </h1>
                

                <div className="tabela">
                <table>
                        <div className="coluna">
                            <tr>
                                <th>Lembrete de Sessão 
                                    <p>Habilita/desabilita envio de e-mail para
                                    lembretes de sessão, além de configurar se o
                                    cliente poderá cancelar a sessão pelo e-mail. </p>

                                </th>

                         
                                
                        
                            </tr>

                            <tr>
                                <td> Habilitar E-mail da Sessão </td>
                               
                        
                                
                            </tr>
                        </div>

                        <div className="coluna">
                            <tr>
                                <th>Mensagem de Aniversário
                                    <p>Habilita/desabilita envios de e-mails de Feliz
                                    Aniversário para seus clientes. </p>

                                </th>

                         
                                
                        
                            </tr>

                            <tr>
                                <td> Habilitar E-mail de Aniversário</td>
                               
                        
                                
                            </tr>
                        </div>

                        <div className="coluna">
                            <tr>
                                <th>Lembrete de Sessão
                                    <p>Habilita/desabilita envio de WhatsApp para
                                    lembretes de sessão, além de configurar se o
                                    cliente poderá cancelar a sessão pelo 
                                    WhatsApp.  </p>

                                </th>

                         
                                
                        
                            </tr>

                            <tr>
                                <td> Habilitar WhatsApp da Sessão </td>
                               
                        
                                
                            </tr>
                        </div>

                        <div className="coluna">
                            <tr>
                                <th>Mensagem de Aniversário
                                    <p>Habilita/desabilita envios de WhatsApp de 
                                    Feliz Aniversário para seus clientes.  </p>

                                </th>

                         
                                
                        
                            </tr>

                            <tr>
                                <td> Habilitar WhatsApp de Aniversário</td>
                               
                        
                                
                            </tr>
                        </div>

                        <div className="coluna">
                            <tr>
                                <th>Lembrete de Sessão
                                    <p>Habilita/desabilita envio de SMS para
                                    lembretes de sessão oara seus clientes.  </p>

                                </th>

                         
                                
                        
                            </tr>

                            <tr>
                                <td> Habilitar SMS da Sessão</td>
                               
                        
                                
                            </tr>
                        </div>

                        <div className="coluna">
                            <tr>
                                <th>Mensagem de Aniversário
                                    <p>Habilita/desabilita envios de SMS de 
                                    Feliz Aniversário para seus clientes.  </p>

                                </th>

                         
                                
                        
                            </tr>

                            <tr>
                                <td> Habilitar SMS de Aniversário </td>
                               
                        
                                
                            </tr>
                        </div>
                </table>

                
                </div>
                    <div className="botao">
                        <button> <box-icon name='check' color='#ffffff' ></box-icon> Salvar </button>
                    </div>    
                </div>
        </div>
    )
}