import './index.scss';
import { useState } from "react";
import Calendar from "react-calendar/dist/cjs/Calendar.js";

// MyCalendar.js
import React from "react";
import "react-calendar/dist/Calendar.css";

 function MyCalendar({ events, selectedDate, onDateChange }) {

    const getTileClassName = ({ date }) => {
        // Filtra os eventos do dia específico
        const dayEvents = events.filter(event => 
            new Date(event.date).toDateString() === date.toDateString()
        );

        if (dayEvents.length > 0) {
            // Verifica se os eventos são de Cliente ou Pessoal e aplica a cor correspondente
            const isClientEvent = dayEvents.some(event => event.type === "Geral");
            const isPersonalEvent = dayEvents.some(event => event.type === "Pessoal");

            if (isClientEvent && isPersonalEvent) {
                return "both-events"; // Dia com ambos os eventos (Cliente e Pessoal)
            } else if (isClientEvent) {
                return "client-event"; // Dia com evento de Cliente
            } else if (isPersonalEvent) {
                return "personal-event"; // Dia com evento de Pessoal
            }
        }
        return ""; // Sem eventos
    };

    return (
        <Calendar
            value={selectedDate}
            onChange={onDateChange}
            tileClassName={getTileClassName}
        />
    );
}
export default MyCalendar;


