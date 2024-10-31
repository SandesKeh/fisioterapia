import './index.scss';
import Cabecalho from '../../components/cabecalho';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AddDocumento(){

    const [mostrarprofissional, setMostrarProfissional] = useState(false);

    const abrirProfissional = () => {
        setMostrarProfissional(true);
    };

    const fecharPrpfissional = (e) => {
        
        setMostrarProfissional(false)
        
    };

    return(
        <div className="adddocumento">
                <div className="inserirpacotes">
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
            
                <div className="direita">
                    <div className="h1">
                        <h1> Documentos </h1>
                        


                        


                    </div>
                

                    <p> Nesse módulo você envia ou cria seu próprio documento personalizado. Na opção de Adicionar Documentos, você pode: ° Adicionar um documento fazendo upload de arquivos úteis como: modelo de anamnese, modelo de contratos, modelo de testes psicológicos, recibos, etc.</p>

                    <button onClick={abrirProfissional} >+ Inserir documento </button>

                    <table>
                            <tr>
                                
                                <th> Tipo </th>
                                <th> Título </th>
                                <th> Conteúdo  </th>
                                <th> Data de Cadastro  </th>
                                <th> Ações </th>
                            </tr>

                            <tr>
                                
                                <td> Atestado</td>
                                <td> Atestado- Modelo 1</td>
                                <td> Documento personalizado </td>
                                <td> 17/09/2024 </td>
                                <td> <img src="/assets/image/bx-edit.svg" alt="" /> 
                                    <img src="/assets/image/bx-trash.svg" alt="" />
                                </td>
                                
                            </tr>
                   
                        </table>

                        {mostrarprofissional && (
                        <div className="popup-background">
                            <div className="popup">
                                <div className="mensagem">
                                    <h2>Adicionar documento  </h2>
                                    <img onClick={fecharPrpfissional} src="/assets/image/bx-x.svg" alt="" />
                                </div>
                                <div className="mensage">
                                    <h2> Tipo: </h2>
                                        <input type="text" placeholder='Ex: Atestado ' />

                                    <h2> Titulo:</h2>
                                        <input type="text" placeholder='Ex: Atestado modelo 1 ' />
                                    <h2>Data do cadastro : </h2>
                                        <input type="text" placeholder='01/07/2024' />

                                  
                                </div>
                                <div className="botao">
                                   
                                    <div className="button">
                                        <button className='botao' onClick={fecharPrpfissional} > Cancelar </button>
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