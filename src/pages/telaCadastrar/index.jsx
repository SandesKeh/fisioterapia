import './index.scss';
import Cabecalho from '../../components/cabecalho';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Value } from 'sass';

export default function TelaCadastrar(){

    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const abrirMensagem = () => {
        setMostrarMensagem(true);
    };

    const fecharMensagem = (e) => {
        
        setMostrarMensagem(false)
        
    };

    async function Deletar() {
        try {
            const resposta = await axios.delete(`http://localhost:5000/deletar/infoPessoas/`)
        } catch (error) {
            
        }
    }
    const [array, setArray] = useState([]);

    async function consultar() {
        try {
            const resposta= await axios.get('http://localhost:5000/consultar/infoPessoas');
            const valor = resposta.data;
            setArray(valor)
           
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        consultar();
    })

    return(
        <div className="telacadastrar">
            <div className="protecao">
                <div className="menu">
                    <Cabecalho/>
                </div>


                <div className="direita">
                    <div className="cima">
                        <div className="inputes">
                            <h1>Pesquisa cliente: </h1>
                            <input type="text" placeholder='Digite o nome do cliente ' />
                        </div>
                        <div className="botao">
                            
                            <Link to='/home' >  
                                <button> + Adicionar Cliente </button>
                            </Link> 
                            <button> <img src="/assets/image/bx-filter-alt.svg" alt="" /> Mais Filtros </button>
                        </div>
                    </div>

                    <div className="baixo">
                        <table>
                            <tr>
                                <th> ID </th>
                                <th> Nome Cliente </th>
                                <th> Data De Nascimento</th>
                                <th> E-mail </th>
                                <th>Telefone </th>
                                <th> Ações </th>
                            </tr>

                    {array.map(item => (
                                <tr>
                                <td> {item.id_informacoes_pessoais} </td>
                                <td> {item.nome} </td>
                                <td> {item.data_nascimento} </td>
                                <td> {item.email} </td>
                                <td> {item.celular} </td>
                                <td> <img src="/assets/image/bx-edit.svg" alt="" /> 
                                    <img onClick={abrirMensagem} src="/assets/image/bx-trash.svg" alt="" />
                                </td>
                                
                            </tr>
                    ) )}
                   
                        </table>

                    </div>

                    {mostrarMensagem && (
                        <div className="popup-background">
                            <div className="popup">
                                <div className="mensagem">
                                    <h1>Cancelar cliente </h1>
                                    <img onClick={fecharMensagem} src="/assets/image/bx-x.svg" alt="" />
                                </div>
                                <div className="mensage">
                                    <p>Atenção! <br /> Para reativar o cliente, você deve acessar a listagem dos clientes e aplicar o filtro de Clientes Desativados e clicar em Reativar na coluna de ações.</p>
                                </div>
                                <div className="botao">
                                    <h1> Tem certeza que deseja desativar esse cliente? </h1>
                                    <div className="button">
                                        <button className='botao' onClick={fecharMensagem} > Cancelar </button>
                                        <button onClick={Deletar} > Deletar </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}