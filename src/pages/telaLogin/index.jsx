import './index.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function TelaLogin() {
    const navegate = useNavigate();

    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');

    async function Entrar() {
        try {
            const usuario = {
                "email": email,
                "senha": senha
            };
    
            const link = `http://4.172.207.208:5004/login/`;
            const resposta = await axios.post(link, usuario);
    
            localStorage.setItem('adm-logado', resposta.data.token);
            navegate('/telaCadastrar');
        } catch (erro) {
            if (erro.response && erro.response.status === 401) {
                alert('Credenciais inválidas.');
            } else {
                alert('Erro ao conectar com o servidor.');
            }
            console.error(erro);
        }
    }
    

    return(
        <div className="telaLogin">
            <div className="all">
                
                <div className="direita">
                    <div className="centro">
                        <img src="/assets/image/logo.png" alt="logo" />
                    </div>
                </div>
                <div className="esquerda">
                    <div className="card">
                        <h1>Login</h1>
                        <div className="perguntas">
                            <h1>E-mail:</h1>
                            <div className="inputes">
                                <input  type="text" placeholder='exemplo@exemplo.com'  value={email} onChange={e=>setEmail(e.target.value)}/>
                                <img id='email' src="/assets/image/envelope.svg" alt="envelope" />
                    
                            </div>
                        
                        </div>
                        <div className="perguntas">
                            <h1>Senha:</h1>
                            <div className="inputes">
                                <input type="password" placeholder=' Sua senha' value={senha} onChange={e=>setSenha(e.target.value)}/>
                                <img id='cadeado' src="/assets/image/lock-fill.svg" alt="envelope" />
                            </div>
                                    
                        </div>
                        
                        <button onClick={Entrar} >Entrar</button>

                    </div>
                </div>
            </div>



        </div>
    )
}