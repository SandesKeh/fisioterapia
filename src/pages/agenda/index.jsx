import React, { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import Cabecalho from "../../components/cabecalho";
import MyCalendar from "../../components/calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

export default function Agenda() {

    const [token, setToken] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        let usu = localStorage.getItem('adm-logado')
        setToken(usu)

        if (usu == 'undefined' || usu == 'null' || !usu) {
            navigate('/telaLogin')
        }
    }, []);

    
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [viewMode, setViewMode] = useState("Geral");
    const [showPopup, setShowPopup] = useState(false);
    const [filteredEvent, setFilteredEvent] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        time: "",
        retun: "não",
        mode: "online",
        service: "",
        status:"pendente"
    });
    useEffect(() => {
        fetchEvents();
    }, []);


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const eventsForSelectedDate = events.filter(event => 
        new Date(event.date).toDateString() === selectedDate.toDateString()
    );

    // Função para buscar eventos de Cliente e Pessoal
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
    
    useEffect(() => {
        fetchEvents();

    
            // Supondo que você tenha uma função para buscar os dados
            fetch().then(res => {
                console.log("Resposta Cliente:", res.cliente);
                console.log("Resposta Pessoal:", res.pessoal);
                
                // Verifique se os dados estão completos
                const eventos = [...res.cliente, ...res.pessoal];
                console.log("Eventos recebidos:", eventos);
                
                // Atualize o estado com os eventos
                setEvents(eventos);
            }).catch(err => {
                console.error("Erro ao buscar dados:", err);
            });
    
        
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleAddEvent = () => {
        const repeatValue = formData.retun === "sim" ? 1 : 0;
        const newEvent = {
            ...formData,
            retun: repeatValue,
            location: formData.mode === "online" ? "online" : "presencial",
            status: "pendente",
            type: viewMode,
        };

        const endpoint = viewMode === "Geral" 
            ? `http://localhost:5004/inserir/agendaCliente?acesso-ao-token=${token}`
            : `http://localhost:5004/inserir/agendaPessoal?acesso-ao-token=${token}`;

        axios.post(endpoint, newEvent)
            .then(response => {
                setEvents(prevEvents => [...prevEvents, { ...newEvent, id: response.data.novoId }]);
                setShowPopup(false);
                setFormData({ name: "", date: "", time: "", retun: "não", mode: "online", service: "", status:"" });
            })
            .catch(error => {
                console.error("Erro ao adicionar evento:", error);
                alert("Erro ao adicionar evento. Verifique o console para mais detalhes.");
            });
    };

    const handleStatusChange = (id) => {
        const event = events.find(e => e.id === id);
        const updatedStatus = event.status === "pendente" ? "concluído" : "pendente";

        const endpoint = viewMode === "Geral" 
            ? `http://localhost:5004/atualizar/agendaCliente/${id}?acesso-ao-token=${token}` 
            : `http://localhost:5004/atualizar/agendaPessoal/${id}?acesso-ao-token=${token}`;

        axios.put(endpoint, {status: updatedStatus })
            .then(() => {
                setEvents(events.map(e => (e.id === id ? { ...e, status: updatedStatus } : e)));
            })
            .catch(error => {
                console.error("Erro ao atualizar status:", error);
                alert("Erro ao atualizar status. Verifique o console para mais detalhes.");
            });
    };

    const handleDeleteEvent = (id) => {
        const endpoint = viewMode === "Geral" 
            ? `http://localhost:5004/deleta/agendaCliente/${id}?acesso-ao-token=${token}` 
            : `http://localhost:5004/deleta/agendaPessoal/${id}?acesso-ao-token=${token}`;

        axios.delete(endpoint)
            .then(() => {
                setEvents(events.filter(e => e.id !== id));
            })
            .catch(error => {
                console.error("Erro ao excluir evento:", error);
                alert("Erro ao excluir evento. Verifique o console para mais detalhes.");
            });
    };

    const handleConsultEvents = () => {
        fetchEvents();
    };
   


    // Função para aplicar cor fixa nos eventos e marcar dias no calendário
    const getTileClassName = ({ date, view }) => {
        if (view === "month") {
            const dayEvents = events.filter(event => {
                return new Date(event.date).toDateString() === date.toDateString();
            });

            if (dayEvents.some(event => event.type === "Geral")) {
                return "event-cliente"; // Classe para cor azul
            }
            if (dayEvents.some(event => event.type === "Pessoal")) {
                return "event-pessoal"; // Classe para cor rosa
            }
        }
        return "";
    };

    // Função para exibir eventos do dia selecionado
    const handleDateClick = (date) => {
        setSelectedDate(date);
        const dayEvents = events.filter(event => new Date(event.date).toDateString() === date.toDateString());
        setFilteredEvent(dayEvents);
    };





    const filteredEvents = events.filter(event => event.type === viewMode);

    return (
        <div className="pagina-agenda">

            <div className="filha">
                <div className="esquerda">
                    <Cabecalho className="cabecalho" />
                </div>

            <div className="content">
                <div className="header">
                    <button onClick={() => setViewMode("Pessoal")} className={viewMode === "Pessoal" ? "active" : ""}>
                        Pessoal
                    </button>
                    <button onClick={() => setViewMode("Geral")} className={viewMode === "Geral" ? "active" : ""}>
                        Cliente
                    </button>
                </div>
                <MyCalendar
                       events={events} 
                       selectedDate={selectedDate} 
                       onDateChange={handleDateChange} 
                />
                        <div className="events-for-day">
                    <h3>Eventos para {selectedDate.toLocaleDateString()}</h3>
                    <ul>
                        {eventsForSelectedDate.map(event => (
                            <li key={event.id}>
                                <span className={`event-type ${event.type === "Geral" ? "client" : "personal"}`}>
                                    {event.type}
                                </span>
                                <span>{event.name} - {event.time}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="agenda-header">
                    <h3>Agenda de {viewMode}</h3>
                    <button className="add-event-button" onClick={() => setShowPopup(true)}>Agendar Evento +</button>
                    <button className="consult-events-button" onClick={handleConsultEvents}>Consultar Eventos</button>
                </div>

                <div className="events">
                    <table>
                        <thead>
                            <tr>
                                <th>Local</th>
                                <th>Status</th>
                                <th>Evento</th>
                                <th>Data</th>
                                <th>Horário</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEvents.map(event => (
                                <tr key={event.id}>
                                    <td>{event.mode || "Local não disponível"}</td>
                                    <td>
                                        <span className={event.status === "pendente" ? "status-pending" : "status-complete"}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td>{event.name || "Nome não disponível"}</td>
                                    <td>{event.date || "Data não disponível"}</td>
                                    <td>{event.time || "Horário não disponível"}</td>
                                    <td>
                                        <button onClick={() => handleStatusChange(event.id)}>Atualizar</button>
                                        <button onClick={() => handleDeleteEvent(event.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <h3>Agendar Evento - {viewMode}</h3>
                            <button className="close-btn" onClick={() => setShowPopup(false)}>X</button>
                            <div className="form">
                                <label>Nome:
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                                </label>
                                <label>Data:
                                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
                                </label>
                                <label>Horário:
                                    <input type="time" name="time" value={formData.time} onChange={handleInputChange} />
                                </label>
                                <label>Repetir:
                                    <select name="repeat" value={formData.retun} onChange={handleInputChange}>
                                        <option value="não">Não</option>
                                        <option value="sim">Sim</option>
                                    </select>
                                </label>
                                <label>Modo:
                                    <select name="mode" value={formData.mode} onChange={handleInputChange}>
                                        <option value="online">Online</option>
                                        <option value="presencial">Presencial</option>
                                    </select>
                                </label>
                                {viewMode === "Geral" && (
                                    <label>Serviço:
                                        <select name="service" value={formData.service} onChange={handleInputChange}>
                                            <option value="">Selecionar</option>
                                            <option value="serviço1">Serviço 1</option>
                                            <option value="serviço2">Serviço 2</option>
                                        </select>
                                    </label>
                                )}
                            </div>
                            <div className="popup-actions">
                                <button onClick={() => setShowPopup(false)}>Cancelar</button>
                                <button onClick={handleAddEvent}>Concluir</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            </div>
            
        </div>
    );
}
