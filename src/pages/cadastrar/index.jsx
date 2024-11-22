import './index.scss';
import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Cadastro() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarsenha, setConfirmarsenha] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navagate= useNavigate();

    async function Cadastrar() {
        if (senha !== confirmarsenha) {
            alert("As senhas não coincidem.");
            return;
        }

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValidEmail) {
            alert("Por favor, insira um email válido.");
            return;
        }

        setLoading(true);

        try {
            const usuario = { email, senha };
            const link = `http://4.172.207.208:5004/cliente/`;
            const response = await axios.post(link, usuario);

            alert("Cadastro realizado com sucesso");
            navagate('/loginCliente');
            setEmail('');
            setSenha('');
            setConfirmarsenha('');
        } catch (error) {
            console.error("Erro ao cadastrar:", error.response ? error.response.data : error.message);
            alert("Cadastro não realizado com sucesso. Tente novamente.");
        } finally {
            setLoading(false);
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
                                    <input type="text" placeholder='Ex: exemplo@exemplo.com' value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="input">
                                    <h1>SENHA:</h1>
                                    <input type="password" placeholder='Digite sua senha' value={senha} onChange={e => setSenha(e.target.value)} />
                                </div>
                                <div className="input">
                                    <h1>CONFIRMAR SENHA:</h1>
                                    <input type="password" placeholder='Digite sua senha novamente' value={confirmarsenha} onChange={e => setConfirmarsenha(e.target.value)} />
                                </div>

                            </div>

                            

                            <button onClick={Cadastrar} disabled={loading}>
                            {loading ? "Cadastrando..." : "Cadastre-se"}
                            </button>
                            <div className="cadastroNovo">
                                <Link to="/loginCliente">Já tem conta? <a href="">Faça seu login</a></Link>
                            </div>
                            
                        </div>

                </div>
            </div>

            <div className="risco"></div>
        </div>
    )
}
