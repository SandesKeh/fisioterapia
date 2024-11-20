import './index.scss';
import React, {  useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function TelaCliente(){
    const [nome, setNome] = useState('');
    const [token, setToken] = useState(null);

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

    const especialidadesRef = useRef(null);
        const curiosidadeRef = useRef(null);
        const sobreRef = useRef(null);
        const homeRef = useRef(null);
        const location = useLocation();

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
                            <th> Semana </th>
                            <th>Categoria</th>
                            <th> Horario</th>
                        
                        </tr>                   
                        <tr>
                            <td> 31/10/2024 </td>
                            <td> Quinta-Feira</td>
                            <td> Pilates </td>
                            <td> 15:00 </td>
                    

                        </tr>

                    </table>                    
                </div>
            </div>
        </div>
    )
}