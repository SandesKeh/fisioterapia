import './index.scss';
import Cabecalho from '../../components/cabecalho';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Value } from 'sass';
import { toast } from 'react-toastify';

export default function TelaCadastrar(){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [pais, setPais] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState ('');
    const [estado, setEstado] = useState ('');
    const [ endereco, setEndereco] = useState ('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [idAlterar, setIdAlterar] = useState(null);

    const [mostrarMensagem, setMostrarMensagem] = useState('');
    const [idDeletar, setIdDeletar] = useState(null);
    const abrirMensagem = (id) => {
            
        setMostrarMensagem(true);
        setIdDeletar(id)
    };

    const fecharMensagem = (e) => {
        
        setMostrarMensagem(false)
        
    };

    const [alterarCliente, setAlterarCliente] = useState('');
    const abrirAlterar = async (id) => {
        try {
            setAlterarCliente(true);
            setIdAlterar(id);
            
            const resposta = await axios.get(`http://localhost:5004/consultar/porID/${idAlterar}?acesso-ao-token=${token}`);
            const cliente = resposta.data;

            setNome(cliente.nome);
            setEmail(cliente.email);
            setCelular(cliente.celular);
            setCpf(cliente.cpf);
            setRg(cliente.rg);
            setPais(cliente.pais);
            setCep(cliente.cep);
            setCidade(cliente.cidade);
            setEstado(cliente.estado);
            setEndereco(cliente.endereco);
            setNumero(cliente.numero);
            setBairro(cliente.bairro);
            setComplemento(cliente.complemento);
            

        } catch (error) {
            
        }
    };
    const fecharAlterar = () => {
        setAlterarCliente(false)
    }

    

    async function Deletar() {
        try {
            const resposta = await axios.delete(`http://localhost:5004/deletar/infoPessoas/${idDeletar}?acesso-ao-token=${token}`)
            setMostrarMensagem(false)
            toast.success('Deletado com sucesso')
        } catch (error) {
            toast.error('Erro, cliente não deletado')
        }
    }


    const [array, setArray] = useState([]);

    async function consultar() {
        try {
            const resposta= await axios.get(`http://localhost:5004/consultar/infoPessoas?acesso-ao-token=${token}`);
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
               <div className="menu">
                    <Cabecalho/>
                </div>
            <div className="protecao">
             

                
                <div className="direita">
                    <div className="cima">
                        <div className="inputes">
                            <h1>Pesquisa cliente: </h1>
                            <input type="text" placeholder='Digite o nome do cliente ' />
                        </div>
                        <div className="botao">
                            
                            <div className="fim">
                            <Link to='/home' >  
                                <button> + Adicionar Cliente </button>
                            </Link> 
                           
                            </div>
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
                                <tr key={item.id_informacoes_pessoais} >
                                <td> {item.id_informacoes_pessoais} </td>
                                <td> {item.nome} </td>
                                <td> {item.data_nascimento} </td>
                                <td> {item.email} </td>
                                <td> {item.celular} </td>
                                <td> <img onClick={ () => abrirAlterar(item.id_informacoes_pessoais, item.nome, item.email, item.celular, item.cpf, item.rg, item.pais, item.cep, item.cidade, item.estado, item.endereco, item.numero, item.bairro)} src="/assets/image/bx-edit.svg" alt="" /> 
                                    <img onClick= { () => abrirMensagem(item.id_informacoes_pessoais)} src="/assets/image/bx-trash.svg" alt="" />
                                </td>
                                
                            </tr>
                    ) )}
                   
                        </table>

                    </div>

                    {mostrarMensagem && (
                        <div className="popup-backgroundd">
                            <div className="popupp">
                                <div className="mensagemm">
                                    <h1>Cancelar cliente </h1>
                                    <img onClick={fecharMensagem} src="/assets/image/bx-x.svg" alt="" />
                                </div>
                                <div className="mensagee">
                                    <p>Atenção! <br /> Caso remova o cliente não terá mais acesso as informaões dele.</p>
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

                    {alterarCliente && (
                        <div className="popup-background">
                            <div className="popup">
                                <div className="mensagem">
                                    <h2>Editar informações  </h2>
                                    <img onClick={fecharAlterar} src="/assets/image/bx-x.svg" alt="" />
                                </div>
                                <div className="men">
                                <div className="mensage">
                                    <h2> Nome : </h2>
                                        <input type="text" placeholder=' ex: Kevillyn '  value={nome} onChange={e => setNome(e.target.value) } />

                                    <h2> Email :</h2>
                                        <input type="text" placeholder='Ex: kevillynsandes07@gmail.com '  value={email} onChange={e => setEmail(e.target.value)} />
                                    
                                    <h2> Celular </h2>
                                        <input type="text" placeholder='+55' value={celular} onChange={e => setCelular(e.target.value)} />
                                    <h2> CPF: </h2>
                                        <input type="text" placeholder='___.___.___.__' value={cpf} onChange={e => setCpf(e.target.value)} />
                                    <h2> RG: </h2>
                                        <input type="text" value={rg} onChange={e => setRg(e.target.value)} />
                                    <h2> País: </h2>
                                        <select value={pais} onChange={e => setPais(e.target.value)} >
                                            <option value="">Selecione</option>
                                                <option value="Afeganistão">Afeganistão</option>
                                                <option value="África do Sul">África do Sul</option>
                                                <option value="Albânia">Albânia</option>
                                                <option value="Alemanha">Alemanha</option>
                                                <option value="Andorra">Andorra</option>
                                                <option value="Angola">Angola</option>
                                                <option value="Antígua e Barbuda">Antígua e Barbuda</option>
                                                <option value="Arábia Saudita">Arábia Saudita</option>
                                                <option value="Argélia">Argélia</option>
                                                <option value="Argentina">Argentina</option>
                                                <option value="Armenia">Armenia</option>
                                                <option value="Austrália">Austrália</option>
                                                <option value="Áustria">Áustria</option>
                                                <option value="Azerbaijão">Azerbaijão</option>
                                                <option value="Bahamas">Bahamas</option>
                                                <option value="Bahrein">Bahrein</option>
                                                <option value="Bangladesh">Bangladesh</option>
                                                <option value="Barbados">Barbados</option>
                                                <option value="Barein">Barein</option>
                                                <option value="Bélgica">Bélgica</option>
                                                <option value="Belize">Belize</option>
                                                <option value="Benin">Benin</option>
                                                <option value="Bielorrússia">Bielorrússia</option>
                                                <option value="Bolívia">Bolívia</option>
                                                <option value="Bósnia e Herzegovina">Bósnia e Herzegovina</option>
                                                <option value="Botswana">Botswana</option>
                                                <option value="Brasil">Brasil</option>
                                                <option value="Brunei">Brunei</option>
                                                <option value="Bulgária">Bulgária</option>
                                                <option value="Burkina Faso">Burkina Faso</option>
                                                <option value="Burundi">Burundi</option>
                                                <option value="Cabo Verde">Cabo Verde</option>
                                                <option value="Camarões">Camarões</option>
                                                <option value="Camboja">Camboja</option>
                                                <option value="Canadá">Canadá</option>
                                                <option value="Catar">Catar</option>
                                                <option value="Cazaquistão">Cazaquistão</option>
                                                <option value="Chade">Chade</option>
                                                <option value="Chile">Chile</option>
                                                <option value="China">China</option>
                                                <option value="Chipre">Chipre</option>
                                                <option value="Colômbia">Colômbia</option>
                                                <option value="Comores">Comores</option>
                                                <option value="Congo-Brazzaville">Congo-Brazzaville</option>
                                                <option value="Congo-Kinshasa">Congo-Kinshasa</option>
                                                <option value="Coreia do Norte">Coreia do Norte</option>
                                                <option value="Coreia do Sul">Coreia do Sul</option>
                                                <option value="Costa do Marfim">Costa do Marfim</option>
                                                <option value="Costa Rica">Costa Rica</option>
                                                <option value="Croácia">Croácia</option>
                                                <option value="Cuba">Cuba</option>
                                                <option value="Dinamarca">Dinamarca</option>
                                                <option value="Djibuti">Djibuti</option>
                                                <option value="Dominica">Dominica</option>
                                                <option value="Egito">Egito</option>
                                                <option value="El Salvador">El Salvador</option>
                                                <option value="Emirados Árabes Unidos">Emirados Árabes Unidos</option>
                                                <option value="Equador">Equador</option>
                                                <option value="Espanha">Espanha</option>
                                                <option value="Estados Unidos">Estados Unidos</option>
                                                <option value="Estônia">Estônia</option>
                                                <option value="Eswatini">Eswatini</option>
                                                <option value="Etiópia">Etiópia</option>
                                                <option value="Fiji">Fiji</option>
                                                <option value="Filipinas">Filipinas</option>
                                                <option value="Finlândia">Finlândia</option>
                                                <option value="França">França</option>
                                                <option value="Gana">Gana</option>
                                                <option value="Grécia">Grécia</option>
                                                <option value="Groenlândia">Groenlândia</option>
                                                <option value="Guatemala">Guatemala</option>
                                                <option value="Guiana">Guiana</option>
                                                <option value="Guiné">Guiné</option>
                                                <option value="Guiné-Bissau">Guiné-Bissau</option>
                                                <option value="Honduras">Honduras</option>
                                                <option value="Hungria">Hungria</option>
                                                <option value="Iémen">Iémen</option>
                                                <option value="Ilhas Cook">Ilhas Cook</option>
                                                <option value="Ilhas Marshall">Ilhas Marshall</option>
                                                <option value="Ilhas Maurício">Ilhas Maurício</option>
                                                <option value="Ilhas Salomão">Ilhas Salomão</option>
                                                <option value="Índia">Índia</option>
                                                <option value="Indonésia">Indonésia</option>
                                                <option value="Irã">Irã</option>
                                                <option value="Iraque">Iraque</option>
                                                <option value="Irlanda">Irlanda</option>
                                                <option value="Islândia">Islândia</option>
                                                <option value="Itália">Itália</option>
                                                <option value="Jamaica">Jamaica</option>
                                                <option value="Japão">Japão</option>
                                                <option value="Jordânia">Jordânia</option>
                                                <option value="Kazakhstão">Kazakhstão</option>
                                                <option value="Quênia">Quênia</option>
                                                <option value="Kiribati">Kiribati</option>
                                                <option value="Kosovo">Kosovo</option>
                                                <option value="Kuwait">Kuwait</option>
                                                <option value="Laos">Laos</option>
                                                <option value="Lesoto">Lesoto</option>
                                                <option value="Letônia">Letônia</option>
                                                <option value="Líbano">Líbano</option>
                                                <option value="Libéria">Libéria</option>
                                                <option value="Líbia">Líbia</option>
                                                <option value="Lituânia">Lituânia</option>
                                                <option value="Luxemburgo">Luxemburgo</option>
                                                <option value="Malásia">Malásia</option>
                                                <option value="Malawi">Malawi</option>
                                                <option value="Maldivas">Maldivas</option>
                                                <option value="Mali">Mali</option>
                                                <option value="Malta">Malta</option>
                                                <option value="Marrocos">Marrocos</option>
                                                <option value="Mauritânia">Mauritânia</option>
                                                <option value="México">México</option>
                                                <option value="Micronésia">Micronésia</option>
                                                <option value="Moçambique">Moçambique</option>
                                                <option value="Moldávia">Moldávia</option>
                                                <option value="Mongólia">Mongólia</option>
                                                <option value="Montenegro">Montenegro</option>
                                                <option value="Namíbia">Namíbia</option>
                                                <option value="Nauru">Nauru</option>
                                                <option value="Nepal">Nepal</option>
                                                <option value="Nicarágua">Nicarágua</option>
                                                <option value="Níger">Níger</option>
                                                <option value="Nigéria">Nigéria</option>
                                                <option value="Noruega">Noruega</option>
                                                <option value="Nova Zelândia">Nova Zelândia</option>
                                                <option value="Omã">Omã</option>
                                                <option value="Países Baixos">Países Baixos</option>
                                                <option value="Papua Nova Guiné">Papua Nova Guiné</option>
                                                <option value="Paquistão">Paquistão</option>
                                                <option value="Paraguai">Paraguai</option>
                                                <option value="Peru">Peru</option>
                                                <option value="Polônia">Polônia</option>
                                                <option value="Portugal">Portugal</option>
                                                <option value="Quênia">Quênia</option>
                                                <option value="Reino Unido">Reino Unido</option>
                                                <option value="República Centro-Africana">República Centro-Africana</option>
                                                <option value="República Checa">República Checa</option>
                                                <option value="República do Congo">República do Congo</option>
                                                <option value="República Dominicana">República Dominicana</option>
                                                <option value="Romênia">Romênia</option>
                                                <option value="Ruanda">Ruanda</option>
                                                <option value="Rússia">Rússia</option>
                                                <option value="El Salvador">El Salvador</option>
                                                <option value="Senegal">Senegal</option>
                                                <option value="Serbia">Sérvia</option>
                                                <option value="Seychelles">Seychelles</option>
                                                <option value="Singapura">Singapura</option>
                                                <option value="Síria">Síria</option>
                                                <option value="Somália">Somália</option>
                                                <option value="Sri Lanka">Sri Lanka</option>
                                                <option value="Suécia">Suécia</option>
                                                <option value="Suíça">Suíça</option>
                                                <option value="Suriname">Suriname</option>
                                                <option value="Tadjiquistão">Tadjiquistão</option>
                                                <option value="Tailândia">Tailândia</option>
                                                <option value="Tanzânia">Tanzânia</option>
                                                <option value="Timor-Leste">Timor-Leste</option>
                                                <option value="Togo">Togo</option>
                                                <option value="Trinidad e Tobago">Trinidad e Tobago</option>
                                                <option value="Tunísia">Tunísia</option>
                                                <option value="Turquia">Turquia</option>
                                                <option value="Turcomenistão">Turcomenistão</option>
                                                <option value="Tuvalu">Tuvalu</option>
                                                <option value="Ucrânia">Ucrânia</option>
                                                <option value="Uganda">Uganda</option>
                                                <option value="Uruguai">Uruguai</option>
                                                <option value="Uzbequistão">Uzbequistão</option>
                                                <option value="Vanuatu">Vanuatu</option>
                                                <option value="Vaticano">Vaticano</option>
                                                <option value="Venezuela">Venezuela</option>
                                                <option value="Vietnã">Vietnã</option>
                                                <option value="Zâmbia">Zâmbia</option>
                                                <option value="Zimbábue">Zimbábue</option>
                                            </select>
                                            </div>

                                            <div className="mensage">
                                        <h2> CEP: </h2>
                                            <input type="text" placeholder='___.___' value={cep} onChange={e => setCep(e.target.value)} />
                                        <h2>Cidade: </h2>
                                            <input type="text" value={cidade} onChange={e => setCidade(e.target.value) } />
                                        <h2> Estado-UF:</h2>
                                            <input type="text" placeholder='ex: SP' value={estado} onChange={e => setEstado(e.target.value)} />
                                        <h2> Endereço: </h2>
                                            <input type="text" value={endereco} onChange={e => setEndereco(e.target.value)} />
                                        <h2> Numero: </h2>
                                            <input type="text" value={numero} onChange={e => setNumero(e.target.value)} />
                                        <h2> Bairro: </h2>
                                            <input type="text" value={bairro} onChange={e => setBairro(e.target.value)} />
                                        
                                        </div>
                                      
                                        </div>
                                        <h3> Complemento</h3>
                                            <input className='one' type="text" value={complemento} onChange={e => setComplemento(e.target.value)} />
                                <div className="botao">
                                   
                                    <div className="button">
                                        <button className='botao' onClick={ fecharAlterar}> Cancelar </button>
                                        <button > Salvar </button>
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