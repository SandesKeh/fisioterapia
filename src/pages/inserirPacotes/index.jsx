import './index.scss';
import Cabecalho from '../../components/cabecalho';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';



export default function InserirPacotes(){
    const [mostrarprofissional, setMostrarProfissional] = useState(false);
    const [alterarProfissional, setAlterarProfissional] = useState(false);
    const [idEdit, setIdEdit] = useState(null); 

    const [nome, setNome]= useState('');
    const [valor, setValor] = useState('');
    const [nomeed, setNomeed]= useState('');
    const [valored, setValored] = useState('');
    const [array, setArray] = useState([]);

    const abrirProfissional = () => {
        setMostrarProfissional(true);
    };

    const fecharPrpfissional = (e) => {
        
        setMostrarProfissional(false)
        
    };
    const abrirPacotesEditar = async (id) => {
        try {
            setAlterarProfissional(true);
            setIdEdit(id);  

            const resposta = await axios.get(`http://localhost:5004/consultar/pacote/${id}?acesso-ao-token=${token}`);
            const profissional = resposta.data;

          
            setNomeed(profissional.nome);
            setValored(profissional.valor);
          

        } catch (err) {
            
            console.log(err);
        }
    };
    const fecharProfissionalEditar = () => {
        setAlterarProfissional(false);
        setIdEdit(null)
       
        
    };


    async function pacotes() {
        try {
            const resposta = await axios.get(`http://localhost:5004/consultar/pacotes?acesso-ao-token=${token}`);
            const value = resposta.data;
            setArray(value);
            console.log(array);
        } 
        catch (err) {
            console.log(err.message)
            alert(err.message)
        }
    }

    useEffect(() => {
        pacotes()
    })



    async function Cadastrar() {
     try {
        await axios.post(`http://localhost:5004/insert/pacotes/${nome}/${valor}?acesso-ao-token=${token}`);
        alert('foi');
        setMostrarProfissional(false);
        pacotes();
     } 
     catch (err) {
        console.log(err.message)
        alert(err.message)
     }
    }
    
    
    async function Alterar() {
        try {
            await axios.put(`http://localhost:5004/update/pacotes/${nomeed}/${valored}/${idEdit}?acesso-ao-token=${token}`);
            toast.success('Pacote alterado com sucesso');
            setAlterarProfissional(false);
            
        } catch (err) {
            toast.error("erro ");
        }
    }
    return(
        <div className="inserirpacotes">
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
            
            <div className="direita">
                <h1> Pacotes </h1>

                <p> Cadastre pacotes para os recebimentos de Cliente. Exemplo: 4 sessões por R$400,00 </p>

                <button onClick={abrirProfissional} >+ Inserir pacote</button>

                <table>
                    <tr >
                        <th> Id </th>
                        <th> Sessões </th>
                        <th> Valor </th>
                        <th> Ações </th>

                    </tr>       
                    {array.map(item => (
                                    <tr key={item.id_pacotes} >   
                                        <td> {item.id_pacotes}</td>
                                        <td> {item.nome}</td>
                                        <td> {item.valor}</td>
                                        <td> <img onClick={ () => abrirPacotesEditar(item.id_pacotes, item.nome, item.valor)} src="/assets/image/bx-edit.svg" alt="" /> 
                                        <img src="/assets/image/bx-trash.svg" alt="" /></td>

                                    </tr>
                           ))}

      

                </table>


                {mostrarprofissional && (
                        <div className="popup-background">
                            <div className="popup">
                                <div className="mensagem">
                                    <h2>Adicionar pacotes  </h2>
                                    <img onClick={fecharPrpfissional} src="/assets/image/bx-x.svg" alt="" />
                                </div>
                                <div className="mensage">
                                    <h2> Quantas sessões : </h2>
                                        <input type="text" placeholder=' ex: 4 ' value={nome} onChange={e => setNome(e.target.value)} />

                                    <h2> Valor :</h2>
                                        <input type="text" placeholder='Ex: R$ 400,00  ' value={valor} onChange={e => setValor(e.target.value)} />
                                    

                                  
                                </div>
                                <div className="botao">
                                   
                                    <div className="button">
                                        <button className='botao' onClick={fecharPrpfissional} > Cancelar </button>
                                        <button onClick={Cadastrar} > Salvar </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

{alterarProfissional && (
                        <div className="popup-background">
                            <div className="popup">
                                <div className="mensagem">
                                    <h2>Adicionar pacotes  </h2>
                                    <img onClick={fecharProfissionalEditar} src="/assets/image/bx-x.svg" alt="" />
                                </div>
                                <div className="mensage">
                                    <h2> Quantas sessões : </h2>
                                        <input type="text" placeholder=' ex: 4 ' value={nomeed} onChange={e => setNomeed(e.target.value)} />

                                    <h2> Valor :</h2>
                                        <input type="text" placeholder='Ex: R$ 400,00  ' value={valored} onChange={e => setValored(e.target.value)} />
                                    

                                  
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
    )
}