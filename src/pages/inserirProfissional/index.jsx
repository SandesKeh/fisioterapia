import './index.scss';
import Cabecalho from '../../components/cabecalho';
import { Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function AddProfissional(){

    const [mostrarprofissional, setMostrarProfissional] = useState(false);

    const abrirProfissional = () => {
        setMostrarProfissional(true);
    };

    const fecharPrpfissional = (e) => {
        
        setMostrarProfissional(false)
        
    };

    
    const [nome, setNome] = useState('');
    const [email, setEmail]= useState('');
    const [acesso, setAcesso]= useState('');
    const [array, setArray]= useState([]);



    async function profissionais() {
        try {
            const resposta = await axios.get('http://4.172.207.208:5004/usuario/profissional');
            const value = resposta.data;
            setArray(value);
            console.log(array);
        } 
        catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        profissionais();
    })
  

    async function Adicionar() {
        try {
            const link= 'http://4.172.207.208:5004/usuario/profissional'
            const documento = {
                nome: nome,
                email: email,
                temAcesso: acesso
            }
             await axios.post(link, documento)
            alert('Profissional cadastrado com sucesso');

            
        } catch (error) {
            alert('erro, Profissional não cadastrado')
        }
    }

    return(
        <div className="addprofissional">
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
                        <h1> Profissionais </h1>
                        <h2> Coladoradores</h2>


                        


                    </div>
                

                    <p> Usuários profissionais são os usuários que atendem em sua clínica e que poderão ou não utilizar o sistema </p>

                    <button onClick={abrirProfissional} >+ Adicionar profissional</button>

                    <table>
                            <tr>
                                
                                <th> Nome </th>
                                <th> E-mail </th>
                                <th>Acesso ao sistema </th>
                                <th> Ações </th>
                            </tr>


                            {array.map(item => (
                                    <tr>
                                        
                                        <td> {item.nome}</td>
                                        <td> {item.email}</td>
                                        <td> {item.temAcesso} </td>
                                        <td> <img src="/assets/image/bx-edit.svg" alt="" /> 
                                        <img src="/assets/image/bx-lock-open-alt.svg" alt="" />
                                        </td>
                                    
                                    </tr>
                           ))}

                   
                        </table>

                        {mostrarprofissional && (
                        <div className="popup-background">
                            <div className="popup">
                                <div className="mensagem">
                                    <h2>Adicionar Profissional  </h2>
                                    <img onClick={fecharPrpfissional} src="/assets/image/bx-x.svg" alt="" />
                                </div>
                                <div className="mensage">
                                    <h2> Nome: </h2>
                                        <input type="text" placeholder='Ex: Seu nome ' value={nome} onChange={e => setNome(e.target.value)} />

                                    <h2> E-mail:</h2>
                                        <input type="text" placeholder='Ex: seuemailaqui07@gmail.com' value={email} onChange={e => setEmail(e.target.value)} />
                                    <h2>Acesso ao sistema: </h2>
                                        <input type="text" value={acesso} onChange={e => setAcesso(e.target.value)}  placeholder='true ou false' />

                                  
                                </div>
                                <div className="botao">
                                   
                                    <div className="button">
                                        <button className='botao' onClick={fecharPrpfissional} > Cancelar </button>
                                        <button onClick={Adicionar} > Salvar </button>
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