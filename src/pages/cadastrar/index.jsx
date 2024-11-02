import './index.scss';

import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import storage from 'local-storage';
import axios from 'axios';

export default function Cadastro() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarsenha, setConfirmarsenha] = useState('')
    
    const navagate= useNavigate();
    async function Cadastrar(){
     try {
        const usuario = {
            email: email,
            senha: senha
        }
        let link= 'http://4.172.207.208:5004/cliente/'

        const sla = await axios.post(link, usuario);
        alert("foi")
        navagate('/loginCliente')   
     } 
     catch (error) {
        alert("nn foi")
     }
    }
   


    return (
        <div className="cadastro">
           <div className="tela">
                <div className="esquerda">
                    <img src="/assets/image/logo1.png" alt="banner da empresa" />

                        <div className="textos">
                            <h1>Bem-vindo a FisioSaúde</h1>
                            <p>Faça o seu Cadastro para poder acessar. </p>
                        </div>

                </div>

                <div className="direita">

                        <div className="cartao">
                            <div className="text">
                                <h1>Cadastre-se</h1>
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
                                <div className="input">
                                    <h1>CONFIRMAR SENHA:</h1>
                                    <input type="text"  placeholder=' Digite sua senha novamente'   value={confirmarsenha} onChange={e => setConfirmarsenha(e.target.value)}/>
                                </div>

                            </div>

                            

                            <button onClick={Cadastrar} > Cadastre-se</button>
                                <div className="cadastroNovo"> 
                                    <Link to="/loginCliente">Já tem conta? <a href="">Faça seu login</a> </Link>
                               </div>
                            
                        </div>

                </div>
           </div>

            <div className="risco"></div>
        </div>
    )
}
