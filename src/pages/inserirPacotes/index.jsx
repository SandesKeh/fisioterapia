import './index.scss';
import Cabecalho from '../../components/cabecalho';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';



export default function InserirPacotes(){
    const [token, setToken] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        let usu = localStorage.getItem('adm-logado')
        setToken(usu)

        if (usu == 'undefined' || usu == 'null' || !usu) {
            navigate('/telaLogin')
        }
    }, []);



    const [mostrarprofissional, setMostrarProfissional] = useState(false);
    const [alterarProfissional, setAlterarProfissional] = useState(false);
    const [idEdit, setIdEdit] = useState(null); 
    const [idDelet, setIdDelet] = useState(null);

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

            const resposta = await axios.get(`http://4.172.207.208:5004/consultar/pacote/${id}?acesso-ao-token=${token}`);
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
            const resposta = await axios.get(`http://4.172.207.208:5004/consultar/pacotes?acesso-ao-token=${token}`);
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
        await axios.post(`http://4.172.207.208:5004/inserir/pacotes/${nome}/${valor}?acesso-ao-token=${token}`);
        toast.success('Pacote cadastrado com sucesso');
        setMostrarProfissional(false);
        pacotes();
     } 
     catch (error) {
        toast.error('Erro, Pacote não cadastrado');
     }
    }
    
    
    async function Alterar() {
        try {
            await axios.put(`http://4.172.207.208:5004/update/pacotes/${nomeed}/${valored}/${idEdit}?acesso-ao-token=${token}`);
            toast.success('Pacote alterado com sucesso');
            setAlterarProfissional(false);
            
        } catch (err) {
            toast.error("erro ");
        }
    }


    const [mostrarMensagem, setMostrarMensagem] = useState('');

    const abrirMensagem = (id) => {
            
        setMostrarMensagem(true);
        setIdDelet(id)
    };

    const fecharMensagem = (e) => {
        
        setMostrarMensagem(false)
        
    };



    async function Deletar() {
        try {
            const resposta = await axios.delete(`http://4.172.207.208:5004/deletar/pacote/${idDelet}?acesso-ao-token=${token}`);
            setMostrarMensagem(false);
            toast.success('Pacote deletado com sucesso');
        } catch (error) {
            toast.error('Erro, pacote não deletado');
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
                                        <img onClick= { () => abrirMensagem(item.id_pacotes)} src="/assets/image/bx-trash.svg" alt="" /></td>

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

            {mostrarMensagem && (
                        <div className="popup-backgroundd">
                            <div className="popupp">
                                <div className="mensagemm">
                                    <h1>Cancelar cliente </h1>
                                    <img onClick={fecharMensagem} src="/assets/image/bx-x.svg" alt="" />
                                </div>
                                <div className="mensagee">
                                    <h2 >Atenção! <br /> Caso remova o pacote não terá mais acesso as informaões dele.</h2>
                                </div>
                                <div className="botaoo">
                                    <h1> Tem certeza que deseja desativar esse cliente? </h1>
                                    <div className="buttonn">
                                        <button className='fimm' onClick={fecharMensagem} > Cancelar </button>
                                        <button onClick={Deletar} > Deletar </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

            
        </div>
    )
}