// Agenda.js

import React, { useState } from "react";
import "./index.scss";
import Cabecalho from "../../components/cabecalho";
import MyCalendar from "../../components/calendar";

export default function Agenda() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [viewMode, setViewMode] = useState("Geral"); // Controla a visualização "Pessoal" ou "Geral"
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        time: "",
        repeat: "não",
        mode: "online",
        service: "",
    });

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleStatusChange = (id) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === id ? { ...event, status: event.status === "pendente" ? "concluído" : "pendente" } : event
            )
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleAddEvent = () => {
        const newEvent = {
            id: events.length + 1,
            type: viewMode, // Define o tipo como "Pessoal" ou "Geral"
            location: formData.mode === "online" ? "online" : "presencial",
            status: "pendente",
            event: formData.name,
            date: formData.date,
            time: formData.time,
        };
        setEvents([...events, newEvent]);
        setShowPopup(false);
    };

    const filteredEvents = events.filter(event => event.type === viewMode);

    return (
        <div className="pagina-agenda">
            <Cabecalho />

            <div className="content">
                <div className="header">
                    <button 
                        onClick={() => setViewMode("Pessoal")} 
                        className={viewMode === "Pessoal" ? "active" : ""}
                    >
                        Pessoal
                    </button>
                    <button 
                        onClick={() => setViewMode("Geral")} 
                        className={viewMode === "Geral" ? "active" : ""}
                    >
                        Geral
                    </button>
                </div>
                <MyCalendar />

                <div className="agenda-header">
                    <h3>Agenda de consultas - {viewMode}</h3>
                    <button className="add-event-button" onClick={() => setShowPopup(true)}>Agendar Evento +</button>
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
                                <th>Atualizar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEvents.map((event) => (
                                <tr key={event.id}>
                                    <td>{event.location}</td>
                                    <td>
                                        <span className={event.status === "pendente" ? "status-pending" : "status-complete"}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td>{event.event}</td>
                                    <td>{event.date}</td>
                                    <td>{event.time}</td>
                                    <td>
                                        <button onClick={() => handleStatusChange(event.id)}>...</button>
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
                                    <input type="radio" name="repeat" value="sim" onChange={handleInputChange} /> Sim
                                    <input type="radio" name="repeat" value="não" onChange={handleInputChange} /> Não
                                </label>
                                <label>Modo:
                                    <select name="mode" value={formData.mode} onChange={handleInputChange}>
                                        <option value="online">Online</option>
                                        <option value="presencial">Presencial</option>
                                    </select>
                                </label>
                                <label>Serviço:
                                    <select name="service" value={formData.service} onChange={handleInputChange}>
                                        <option value="">Selecionar</option>
                                        <option value="serviço1">Serviço 1</option>
                                        <option value="serviço2">Serviço 2</option>
                                    </select>
                                </label>
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
    );
}
