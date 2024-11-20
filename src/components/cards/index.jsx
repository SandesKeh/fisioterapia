import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputMask from 'react-input-mask';

import './index.scss';

export default function Card() {
    const [token, setToken] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        let usu = localStorage.getItem('adm-logado')
        setToken(usu)

        if (usu == 'undefined' || usu == 'null' || !usu) {
            navigate('/telaLogin')
        }
    }, []);


    const [exibir, setExibir] = useState(false);
    const [visualizar, setVisualizar] = useState(false);

    const mostrar = () => {
        setExibir(!exibir);
    };
    const alternarVisualizacaoEndereco = () => {
        setVisualizar(!visualizar);
    };


    const navagate= useNavigate();
    
    const [nome, setNome] = useState('');
    const [grupo, setGrupo] = useState('');
    const [data, setData]= useState('');
    const [idade, setIdade]= useState('');
    const [genero, setGenero]= useState('');
    const [email, setEmail]= useState('');
    const [telefone, setTenefone]= useState('');
    const [cpf, setCpf]= useState('');
    const [rg, setRg]= useState('');
    const [celular, setcelular]= useState('');
    const [pais, setPais] = useState('Brasil');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [complemento, setComplemento] = useState('');;

    const calcularIdade = (data) => {
        if (!data) return '';
        const hoje = new Date();
        const nascimento = new Date(data);
        let idadeCalculada = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();

        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idadeCalculada--;
        }

        return idadeCalculada >= 0 ? idadeCalculada : '';
    };

    const handleDataChange = (e) => {
        const novaData = e.target.value;
        setData(novaData);
        setIdade(calcularIdade(novaData)); 
    };

    const cpfSemMascara = cpf.replace(/\D/g, '');
    async function Adicionarcliente() {
        try {
            const linkpessoal = `http://localhost:5004/inserir/infoPessoal?acesso-ao-token=${token}`;
            const pessoal = {
                nome: nome,
                grupo: grupo,
                nascimento: data,
                idade: idade,
                genero: genero,
                email: email, 
                celular: celular,
                cpf: cpfSemMascara,
                rg: rg,
                telefone: telefone,
                pais: pais,
                cep: cep,
                cidade: cidade,
                estado: estado,
                endereco: endereco,
                numero: numero,
                bairro: bairro,
                complemento: complemento
            }
            await axios.post(linkpessoal, pessoal)
            alert('Cliente cadastrado ')
            
            navagate('/telaCadastrar')
        } catch (error) {
            console.error('Erro ao salvar cliente:', error.response ? error.response.data : error.message);
            alert('Erro');
        }

    }

    const buscarEndereco = async (cepInserido) => {
        try {
            if (cepInserido.length === 8) {
                const resposta = await axios.get(`https://viacep.com.br/ws/${cepInserido}/json/`);
                if (resposta.data.erro) {
                    alert("CEP inválido!");
                    return;
                }

                setEndereco(resposta.data.logradouro || '');
                setBairro(resposta.data.bairro || '');
                setCidade(resposta.data.localidade || '');
                setEstado(resposta.data.uf || '');
            }
        } catch (error) {
            console.error("Erro ao buscar o endereço:", error.message);
            alert("Não foi possível buscar o endereço. Verifique o CEP e tente novamente.");
        }
    };


    const handleCepChange = (e) => {
        const novoCep = e.target.value.replace(/\D/g, '');
        setCep(novoCep);

        if (novoCep.length === 8) {
            buscarEndereco(novoCep);
        }
    };


    return (
        <div className="cards">
        <div className="cabecalho">
            <h1> 1. Informações Pessoais</h1>
            
            <button onClick={mostrar} className="i">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-chevron-compact-up" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894z"/>
                </svg>
            </button>  
            
        </div>  

        <div className={`contener ${exibir ? "show" : "hide"}`}>  
                <div className="cont1">
                    <div className="inpute">
                        <h1>Nome: </h1>
                        <input type="text" placeholder="Digite seu nome" value={nome} onChange={e => setNome(e.target.value)} />
                    </div>
                </div>    
                
                <div className="cont2">
                    <div className="inpute">
                        <h1> Grupo: </h1>

                        <select value={grupo} onChange={e => setGrupo(e.target.value)} > 
                            <option value=""> selecione </option>
                            <option value="Crianças"> Crianças</option>
                            <option value="Adolecentes">Adolecentes</option>
                            <option value="Adultos">Adultos</option>
                            <option value="Idosos">Idosos</option>
                        </select>
                    </div>

                    <div className="inpute">
                        <h1> Data de Nascimento:</h1>

                        <input type="date" value={data} onChange={handleDataChange} />
                    </div>

                    <div className="inpute">
                        <h1> Idade: </h1>

                        <input type="text" value={idade} readOnly />

                    </div>
                </div>

                <div className="cont3">
                    <div className="inpute">
                        <h1> Gênero: </h1>

                        <select value={genero} onChange={e => setGenero(e.target.value)} >
                            <option value=""> Selecione </option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outros">Outros</option>
                        </select>

                    </div>

                    <div className="inpute">
                        <h1> E-mail: </h1>

                        <input type="text" placeholder=" Digite seu email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                </div>

                <div className="cont4">

                <div className="inpute">
                        <h1>Celular Responsável:</h1>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={celular}
                            onChange={e => setcelular(e.target.value)}
                            placeholder="+55 (__) _____-____"
                        />
                    </div>

                    <div className="inpute">
                        <h1>CPF:</h1>
                        <InputMask
                            mask="999.999.999-99"
                            value={cpf}
                            onChange={e => setCpf(e.target.value)}
                            placeholder="___.___.___.__"
                        />                    </div>
                    <div className="inpute">
                        <h1> RG: </h1>
                        <InputMask
                            mask="99.999.999-9"
                            value={rg}
                            onChange={e => setRg(e.target.value)}
                            placeholder="___.___.___-__"
                        />                    
                    </div>

                    <div className="inpute">
                        <h1> Telefone : </h1>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={telefone}
                            onChange={e => setTenefone(e.target.value)}
                            placeholder="(__) _____-____"
                        />                    
                    </div>
                </div>
            
        </div>



        
        <div className="cabecalho">
            <h1> 3. Endereço </h1>
            
            <button onClick={alternarVisualizacaoEndereco} className="i">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-chevron-compact-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894z"/>
                </svg>
            </button>  
            
        </div>  

        <div className={`contener ${ visualizar ? "show" : "hide"}`}>

            <div className="cont4">

                <div className="inpute">
                    <h1> País: </h1>
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

                <div className="inpute">
                    <h1>CEP:</h1>
                    <InputMask
                        mask="99999-999"
                        value={cep}
                        onChange={handleCepChange}
                        placeholder="_____-___"
                    />            
                </div>

                <div className="inpute">
                    <h1> Cidade: </h1>
                    <input
                        type="text"
                        value={cidade}
                        readOnly
                    />                
                </div>

                <div className="inpute1">
                    <h1> Estado: </h1>
                    <input
                        type="text"
                        value={estado}
                        readOnly
                    />                
                </div>

            </div>

            <div className="cont3">
                    <div className="inpute1">
                        <h1> Endereço : </h1>
                        <input
                            type="text"
                            value={endereco}
                            readOnly
                        />
                    </div>

                    <div className="inpute2">
                        <h1> Numero: </h1>
                        <input
                            type="text"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                        />                
                    </div>


            </div>

            <div className="cont3">
                <div className="inpute">
                    <h1> Complemento: </h1>
                    <input
                        type="text"
                        value={complemento}
                        onChange={(e) => setComplemento(e.target.value)}
                    />                    
                </div>

                <div className="inpute">
                    <h1> Bairro: </h1>
                    <input
                        type="text"
                        value={bairro}
                        readOnly
                    />
                </div>
            </div>
            
        </div>    

        <div className="botao">
            <button onClick={Adicionarcliente}> Salvar </button>
        </div>    


    </div>


        
    );

    
}


