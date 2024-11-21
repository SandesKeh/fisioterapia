import './index.scss';
import Cabecalho from '../../components/cabecalho';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddProfissional() {
    const [token, setToken] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        let usu = localStorage.getItem('adm-logado')
        setToken(usu)

        if (usu == 'undefined' || usu == 'null' || !usu) {
            navigate('/telaLogin')
        }
    }, []);

    const [mostrarMensagem, setMostrarMensagem] = useState('');
    const [mostrarProfissional, setMostrarProfissional] = useState(false);
    const [alterarProfissional, setAlterarProfissional] = useState(false);
    const [idEdit, setIdEdit] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [acesso, setAcesso] = useState('');
    const [array, setArray] = useState([]);
    const [idDelet, setIdDelet] = useState(null);
    const [nomeed, setNomeed] = useState('');
    const [emailed, setEmailed] = useState('');
    const [acessoed, setAcessoed] = useState('');
    
    const abrirMensagem = (id) => {
            
        setMostrarMensagem(true);
        setIdDelet(id)
    };

    const fecharMensagem = (e) => {
        
        setMostrarMensagem(false)
        
    };

    const abrirProfissional = () => {
        setMostrarProfissional(true);
    };


    const fecharProfissional = () => {
        setMostrarProfissional(false);
    };


    const abrirProfissionalEditar = async (id) => {
        try {
            setAlterarProfissional(true);
            setIdEdit(id);  

            const resposta = await axios.get(`http://localhost:5004/consultar/usuario/profissional/${id}?acesso-ao-token=${token}`);
            const profissional = resposta.data;

          
            setNomeed(profissional.nome);
            setEmailed(profissional.email);
            setAcessoed(profissional.acesso);

        } catch (err) {
            
            console.log(err);
        }
    };

  
    const fecharProfissionalEditar = () => {
        setAlterarProfissional(false);
        setIdEdit(null)
       
        
    };

    async function ConsultarProfissionais() {
        try {
            const resposta = await axios.get(`http://localhost:5004/usuario/profissional?acesso-ao-token=${token}`);
            setArray(resposta.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        ConsultarProfissionais();
    });

 
    async function Adicionar() {
        try {
            await axios.post(`http://localhost:5004/inseir/usuario/profissional/${nome}/${email}/${acesso}?acesso-ao-token=${token}`);
            toast.success('Profissional cadastrado com sucesso');
            setMostrarProfissional(false);
            ConsultarProfissionais();
        } catch (error) {
            toast.error('Erro, Profissional não cadastrado');
        }
    }


    async function Alterar() {
        try {
            await axios.put(`http://localhost:5004/update/profissional/${nomeed}/${emailed}/${acessoed}/${idEdit}?acesso-ao-token=${token}`);
            toast.success('Profissional alterado com sucesso');
            setAlterarProfissional(false);
            
        } catch (error) {
            toast.error("Erro, profissional não alterado ");
        }
    }

    async function Deletar() {
        try {
            const resposta = await axios.delete(`http://localhost:5004/deletar/usuario/profissional/${idDelet}?acesso-ao-token=${token}`);
            setMostrarMensagem(false);
            toast.success('Profissional deletado com sucesso');
        } catch (error) {
            toast.error('Erro, profissional não deletado');
        }
    }

    return (
        <div className="addprofissional">
              <div className="cabecalho">
                    <Cabecalho />
                </div>
                <div className="protecao">
                 
                    <div className="t">
                        <div className="text">
                            <Link to='/inserirProfissional'>
                                <h1>Usuarios</h1>
                                <h2>Usuarios</h2>
                            </Link>
                        </div>

                        <div className="text">
                            <Link to='/inserirDocumento'>
                                <h1>Modelos</h1>
                                <h2>Documentação</h2>
                            </Link>
                        </div>

                        <div className="text">
                            <Link to='/inserirPacotes'>
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
                                <h1>Inventário </h1>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="direita">
                    <div className="h1">
                        <h1> Profissionais </h1>
                    </div>

                    <p>Usuários profissionais são os usuários que atendem em sua clínica e que poderão ou não utilizar o sistema</p>

                    <button onClick={abrirProfissional}>+ Adicionar profissional</button>

                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Acesso ao sistema</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {array.map(item => (
                                <tr key={item.id_adicionar_profissional}>
                                    <td>{item.id_adicionar_profissional}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.email}</td>
                                    <td>{item.acesso}</td>
                                    <td>
                                        <img onClick={() => abrirProfissionalEditar(item.id_adicionar_profissional, item.nome, item.email, item.acesso)} src="/assets/image/bx-edit.svg" alt="Editar" />
                                        <img onClick={() => abrirMensagem(item.id_adicionar_profissional)} src="/assets/image/bx-trash.svg" alt="Bloquear" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    
        

                    {mostrarProfissional && (
                        <div className="popup-background">
                            <div className="popup">
                                <div className="mensagem">
                                    <h2>Adicionar Profissional</h2>
                                    <img onClick={fecharProfissional} src="/assets/image/bx-x.svg" alt="Fechar" />
                                </div>
                                <div className="mensage">
                                    <h2>Nome:</h2>
                                    <input
                                        type="text"
                                        placeholder="Ex: Seu nome"
                                        value={nome}
                                        onChange={e => setNome(e.target.value)}
                                    />

                                    <h2>E-mail:</h2>
                                    <input
                                        type="text"
                                        placeholder="Ex: seuemailaqui07@gmail.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />

                                    <h2>Acesso ao sistema:</h2>
                                    <input
                                        type="text"
                                        value={acesso}
                                        onChange={e => setAcesso(e.target.value)}
                                        placeholder="Sim ou Não"
                                    />
                                </div>
                                <div className="botao">
                                    <div className="button">
                                        <button className="botao" onClick={fecharProfissional}>Cancelar</button>
                                        <button onClick={Adicionar}>Salvar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {alterarProfissional && (
                        <div className="popup-background">
                            <div className="popup">
                                <div className="mensagem">
                                    <h2>Alterar Profissional</h2>
                                    <img onClick={fecharProfissionalEditar} src="/assets/image/bx-x.svg" alt="Fechar" />
                                </div>
                                <div className="mensage">
                                  
                                    <h2>Nome:</h2>
                                    <input
                                        type="text"
                                        placeholder="Ex: Seu nome"
                                        value={nomeed}
                                        onChange={e => setNomeed(e.target.value)}
                                    />

                                    <h2>E-mail:</h2>
                                    <input
                                        type="text"
                                        placeholder="Ex: seuemailaqui07@gmail.com"
                                        value={emailed}
                                        onChange={e => setEmailed(e.target.value)}
                                    />

                                    <h2>Acesso ao sistema:</h2>
                                    <input
                                        type="text"
                                        value={acessoed}
                                        onChange={e => setAcessoed(e.target.value)}
                                        placeholder="true ou false"
                                    />
                                </div>
                                <div className="botao">
                                    <div className="button">
                                        <button className="botao" onClick={fecharProfissionalEditar}>Cancelar</button>
                                        <button onClick={Alterar}>Salvar</button>
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
                                    <h2 >Atenção! <br /> Caso remova o profissional não terá mais acesso as informaões dele.</h2>
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