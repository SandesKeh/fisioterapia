import './index.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import storage from 'local-storage';




export default function Login() {
    
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
   

   


    return (
        <div className="tela-login">
           <div className="tela">
                <div className="esquerda">
                    <img src="/assets/image/logo1.png" alt="banner da empresa" />

                        <div className="textos">
                            <h1>Bem-vindo a FisioSaúde</h1>
                            <p>Faça o seu Login para poder ver sua agenda. </p>
                        </div>

                </div>

                <div className="direita">

                        <div className="cartao">
                            <div className="text">
                                <h1>Login</h1>
                            </div>
                            <div className="perguntas">
                                <div className="input">
                                    <h1> EMAIL: </h1>
                                    <input type="text" placeholder='Ex: Daniela@gmail.com'   value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="input">
                                    <h1>SENHA:</h1>
                                    <input type="text"  placeholder=' Digite sua senha'   value={cpf} onChange={e => setCpf(e.target.value)}/>
                                </div>

                            </div>

                            

                            <button>Entrar</button>
                                <div className="senha">
                                    <a href=""> Esqueceu a senha? </a>
                                </div>
                                <div className="cadastroNovo"> 
                                    <Link to="/cadastrar">Ainda não tem conta? <a href="">Faça seu cadastro</a> </Link>
                               </div>
                            
                        </div>

                </div>
           </div>

            <div className="risco"></div>
        </div>
    )
}
