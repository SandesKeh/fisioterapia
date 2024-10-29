import './index.scss';
import { Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import storage from 'local-storage';
import axios from 'axios';




export default function Login() {
    const navegate= useNavigate()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    async function Entrar(){
       try {
        const link = 'http://localhost:5000/logincliente/';
        const user= {
            email: email,
            senha: senha
        };

        const resposta= await axios.post(link, user);
        storage('clientelogado', resposta.data);
        
        navegate('/telaCliente') 
       } 
       
       catch (error) {
        alert("errou a senha porra")
       }
    }

   


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
                                    <input type="text"  placeholder=' Digite sua senha'   value={senha} onChange={e => setSenha(e.target.value)}/>
                                </div>

                            </div>

                            

                            <button  onClick={Entrar} >Entrar</button>
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
