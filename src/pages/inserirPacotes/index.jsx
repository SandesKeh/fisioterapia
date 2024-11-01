import './index.scss';
import Cabecalho from '../../components/cabecalho';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



export default function InserirPacotes(){
    const [mostrarprofissional, setMostrarProfissional] = useState(false);

    const abrirProfissional = () => {
        setMostrarProfissional(true);
    };

    const fecharPrpfissional = (e) => {
        
        setMostrarProfissional(false)
        
    };

    const [pacote, setPacote]= useState('');
    const [valor, setValor] = useState('');

    async function Cadastrar() {
        try {
            const link = 'http://localhost:5000/insert/pacotes'
            const obj={
                nome: pacote,
                valor: valor
            }

            await axios.post(link, obj)
            alert('pacote adicionado')
        } catch (erro) {
            alert('deu errado')
        }
   
        
    }

    return(
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
                <h1> Pacotes </h1>

                <p> Cadastre pacotes para os recebimentos de Cliente. Exemplo: 4 sessões por R$400,00 </p>

                <button onClick={abrirProfissional} >+ Inserir pacote</button>


                {mostrarprofissional && (
                        <div className="popup-background">
                            <div className="popup">
                                <div className="mensagem">
                                    <h2>Adicionar pacotes  </h2>
                                    <img onClick={fecharPrpfissional} src="/assets/image/bx-x.svg" alt="" />
                                </div>
                                <div className="mensage">
                                    <h2> Quantas sessões : </h2>
                                        <input type="text" placeholder=' ex: 4 ' value={pacote} onChange={e => setPacote(e.target.value)} />

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
            </div>
            
        </div>
    )
}