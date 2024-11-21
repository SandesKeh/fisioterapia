import './index.scss';
import axios from "axios";
import React, {  useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function TelaCliente(){
    const [nome, setNome] = useState('');
    const [filteredEvent, setFilteredEvent] = useState([]);
    const [viewMode, setViewMode] = useState("Geral");
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [token, setToken] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        time: "",
        mode: "online",
        service: "",
        status:"pendente"
    });
    const navigate = useNavigate();

    useEffect(() => {
        const usu = localStorage.getItem('clientelogado');
        if (usu) {
            const usuario = JSON.parse(usu);
            setToken(usuario.token);
            setNome(usuario.nome); 
        } else {
            navigate('/loginCliente'); 
        }
    }, [navigate]);




    const handleScrollToSection = (sectionId) => {
        navigate("/", { state: { sectionId } });
    };

    
    const eventsForSelectedDate = events.filter(event => 
        new Date(event.date).toDateString() === selectedDate.toDateString()
    );

    const especialidadesRef = useRef(null);
        const curiosidadeRef = useRef(null);
        const sobreRef = useRef(null);
        const homeRef = useRef(null);
        const location = useLocation();

        const filteredEvents = events.filter(event => event.type === viewMode);
        const fetchEvents = () => {
            Promise.all([
                axios.get(`http://localhost:5004/consulta/agendaCliente?acesso-ao-token=${token}`),
                axios.get(`http://localhost:5004/consulta/agendaPessoal?acesso-ao-token=${token}`)
            ])
            .then(([clienteResp, pessoalResp]) => {
                console.log("Resposta Cliente:", clienteResp.data);
                console.log("Resposta Pessoal:", pessoalResp.data);
    
                const clienteEvents = clienteResp.data.map(event => ({ ...event, type: "Geral" }));
                const pessoalEvents = pessoalResp.data.map(event => ({ ...event, type: "Pessoal" }));
                const allEvents = [...clienteEvents, ...pessoalEvents];
                
                console.log("Eventos recebidos:", allEvents);
                setEvents(allEvents);
            })
            .catch(error => {
                console.error("Erro ao buscar eventos:", error);
                alert("Erro ao buscar eventos. Verifique o console para mais detalhes.");
                
            });
    
        };
        

    return(
        <div className="telacliente">
            <div className="cabecalho">
                <img src="assets/image/logo.webp" alt="nao foi" />
                <div className="links">
                    <button className='button' onClick={() => handleScrollToSection('secao4')}>Home</button>
                    <button className='button' onClick={() => handleScrollToSection('secao3')}>Sobre Nós</button>
                    <button className='button' onClick={() => handleScrollToSection('secao1')}>Especialidades</button>
                    <button className='button' onClick={() => handleScrollToSection('secao2')}>Curiosidades</button>
                
                    
                </div> 
            </div>
            <div className="informacoes">
                <h1>Seja muito bem-vindo, {nome || 'usuário'}</h1>

                <p>Segue abaixo seu horario no nosso espaço Dr. Daniela Rodrigues <br /> Fisioterapia e pilates!! </p>

                <div className="baixo">
                    <table>
                        <tr>
                            <th> Dia </th>
                            <th>Categoria</th>
                            <th>Modo</th>
                            <th> Horario</th>
                        
                        </tr>                   
                        <tr>
                        {filteredEvents.map(event => (
                                <tr key={event.id}>
                                  <td>{event.date || "Data não disponível"}</td>
                                  <td>{event.service || "Serviço não disponível"}</td>
                                    <td>{event.mode || "Local não disponível"}</td>
                                    <td>{event.time || "Horário não disponível"}</td>

                                </tr>
                            ))}
                    

                        </tr>

                    </table>                    
                </div>
            </div>
        </div>
    )
}