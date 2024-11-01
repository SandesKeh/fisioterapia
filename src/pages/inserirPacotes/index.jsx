import './index.scss';
import Cabecalho from '../../components/cabecalho';
import { useState, useEffect } from 'react';
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

    const [nome, setNome]= useState('');
    const [valor, setValor] = useState('');
    const [array, setArray] = useState([]);

    async function pacotes() {
        try {
            const resposta = await axios.get('http://localhost:5000/consultar/pacotes');
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
        await axios.post(`http://localhost:5000/insert/pacotes/${nome}/${valor}`);
        alert('foi');
     } 
     catch (err) {
        console.log(err.message)
        alert(err.message)
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
            </div>
            
        </div>
    )
}