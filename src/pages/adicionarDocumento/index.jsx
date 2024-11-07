import './index.scss';
import Cabecalho from '../../components/cabecalho';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function AddDocumento(){

    const [mostrarprofissional, setMostrarProfissional] = useState(false);

    const abrirProfissional = () => {
        setMostrarProfissional(true);
    };

    const fecharPrpfissional = (e) => {
        
        setMostrarProfissional(false)
        
    };

    const navegate = useNavigate();
    const [tipo, setTipo] = useState('');
    const [titulo, setTitulos]= useState('');
    const [conteudo, setConteudo]= useState('');
    const [data, setData]= useState('');
    const [ array, setArray] = useState([])
    async function Documentos() {
        try {
            const resposta = await axios.get('http://localhost:5004/documentacao/');
            const value = resposta.data;
            setArray(value);
            console.log(array);
        } 
        catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        Documentos()
    })

    async function Adicionardocumento() {
        try {
            const link= 'http://localhost:5004/documentacao/'
            const documento = {
                tipo: tipo,
                titulo: titulo,
                conteudo: conteudo,
                dataCadastro: data
            }
             await axios.post(link, documento)
            toast.success('Documento cadastrado com sucesso');
            setConteudo('');
            setTipo('');
            setTitulos('');
            setData('');


            navegate('/inserirDocumento')
        } catch (error) {
            alert('erro, documento não cadastrado')
            
        }
    }
    

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

                           {array.map(item => (
                                    <tr>
                                        
                                        <td> {item.tipo}</td>
                                        <td> {item.titulo}</td>
                                        <td> {item.conteudo} </td>
                                        <td> {item.dataCadastro}</td>
                                        <td> <img src="/assets/image/bx-edit.svg" alt="" /> 
                                            <img src="/assets/image/bx-trash.svg" alt="" />
                                        </td>
                                    
                                    </tr>
                           ))}
                   
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
                                        <input type="text" placeholder='Ex: Atestado ' value={tipo} onChange={e => setTipo(e.target.value)} />

                                    <h2> Titulo:</h2>
                                        <input type="text" placeholder='Ex: Atestado modelo 1 ' value={titulo} onChange={e => setTitulos(e.target.value)} />
                                    <h2>Conteudo: </h2>
                                        <input type="text" placeholder='Ex: Documento personalizado' value={conteudo} onChange={e => setConteudo(e.target.value)} />
                                    <h2>Data do cadastro : </h2>
                                        <input type="text" placeholder='01/07/2024' value={data} onChange={e => setData(e.target.value)} />

                                  
                                </div>
                                <div className="botao">
                                   
                                    <div className="button">
                                        <button className='botao' onClick={fecharPrpfissional} > Cancelar </button>
                                        <button onClick={Adicionardocumento}  > Salvar </button>
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