import './index.scss';

import React, { useRef, useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Olho from '../../assets/image/visao-estrategica.png';
import Visao from '../../assets/image/meta.png'
export default function Sobre() {

    const navegacao = useNavigate();

    const handleScrollToSection = (sectionId) => {
        navegacao("/", { state: { sectionId } });

    };

    const [menuOpen, setMenuOpen] = useState(false);
    const [mostrarPopup, setMostrarPopup] = useState(false);

        const abrirPopup = () => {
            setMostrarPopup(true);
        };

        const clicaFora = (e) => {
            if (e.target.classList.contains('popup-background')) {
                setMostrarPopup(false)
            }
        };
    

        const especialidadesRef = useRef(null);
        const curiosidadeRef = useRef(null);
        const sobreRef = useRef(null);
        const homeRef = useRef(null);
        const foterRef = useRef(null);
        const location = useLocation();
    
        useEffect(() => {
            if (location.state?.sectionId) {
                const sectionMap = {
                    secao1: especialidadesRef,
                    secao2: curiosidadeRef,
                    secao3: sobreRef,
                    secao4: homeRef,
                };
                const ref = sectionMap[location.state.sectionId];
                ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, [location]);

    const [mostrarPopup2, setMostrarPopup2] = useState(false);

        const abrirPopup2 = () => {
            setMostrarPopup2(true);
        };

        const clicaFora2 = (e) => {
            if (e.target.classList.contains('popup-background')) {
                setMostrarPopup2(false);
            }
        };

    const [mostrarPopup3, setMostrarPopup3] = useState(false);
        const abrirPopup3 = () => {
            setMostrarPopup3(true)
        }
        const clicaFora3 = (e) => {
            if(e.target.classList.contains('popup-background')) {
                setMostrarPopup3(false)
            }
        }   


    const [mostrarPopup4, setMostrarPopup4] = useState(false);
        
        const abrirPopup4 = () => {
            setMostrarPopup4(true)
        }

        const clicaFora4 = (e) => {
            if(e.target.classList.contains('popup-background')) {
                setMostrarPopup4(false)
            }
        }

    const [mostrarPopup5, setMostrarPopup5] = useState(false);

        const abrirPopup5 = () => {
            setMostrarPopup5(true)
        }

        const clicarFora5 = (e) => {
            if(e.target.classList.contains('popup-background')) {
                setMostrarPopup5(false)
            }
    }
    const [mostrarPopup6, setMostrarPopup6] = useState(false);

        const abrirPopup6 = () => {
            setMostrarPopup6(true)
        }

        const clicarFora6 = (e) => {
            if(e.target.classList.contains('popup-background')) {
                setMostrarPopup6(false)
            }
        }
    const [mostrarPopup7, setMostrarPopup7] = useState(false);

        const abrirPopup7 = () => {
            setMostrarPopup7(true)
        }

        const clicarFora7 = (e) => {
            if(e.target.classList.contains('popup-background')) {
                setMostrarPopup7(false)
            }
        }



    return (
 <div className="sobreMais">
                 <div className="cabecalho" ref={homeRef}>
    <img src="assets/image/logo.png" alt="nao foi" />
    
 
    <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
    </button>
    


    
    <div className={`links ${menuOpen ? 'open' : ''}`}>
        <button onClick={() => homeRef.current.scrollIntoView({ behavior: 'smooth' })}>Home</button>
        <button onClick={() => sobreRef.current.scrollIntoView({ behavior: 'smooth' })}>Sobre Nós</button>
        <button onClick={() => especialidadesRef.current.scrollIntoView({ behavior: 'smooth' })}>Especialidades</button>
        <button onClick={() => curiosidadeRef.current.scrollIntoView({ behavior: 'smooth' })}>Curiosidades</button>
        <div className='dois'>
            <Link className='contato' to="" style={{ textDecoration: 'none' }}>
                <button onClick={() => foterRef.current.scrollIntoView({ behavior: 'smooth' })}>Contatos</button>
            </Link>
            <Link  to="/telaLogin">
                <button id='login'>Login</button>
            </Link>
            
        </div>
    </div>
</div>
<div className="sobre">
                <div className="primeiro">
                    <h1>Sobre mim</h1>
                    <p>Me chamo Daniela Barbosa Rodrigues, tenho 36 anos, casada, mãe de 2 menina. Formada em Fisioterapia pela Universidade nove de Julho, POS Graduada em Fisioterapia Intensiva Pediátrica e Neonatal pela FABIC. Formação em Pilates pela VOLL Pilates, Curso de Neurociência da dor aplicada a prática clinica pelo TUDO SOBRE DOR. Trabalhei nas instituições de saúde da REDE DOR das unidades do Jabaquara e Morumbi. Atuando tanto em pediatria e adulto. Realizo atendimento domiciliar na região  da Zona Sul de São Paulo.</p>
                </div>

                <div className='grup'>
                    <div className="missao">
                        <h1> <img src={Olho} alt="visao"/> Visão  </h1>
                        <p> Ser referência em atendimento fisioterapêutico domiciliar na Zona Sul de São Paulo, promovendo a saúde e o bem-estar de crianças e adultos com excelência e humanização. </p>
                    </div>

                    <div className="missao">
                        <h1> <img src={Visao} alt="visao"/> Missão  </h1>
                        <p> Oferecer serviços de fisioterapia de alta qualidade, com foco em cuidados pediátricos e adultos, utilizando abordagens integrativas e personalizadas, sempre priorizando a saúde e o conforto dos nossos pacientes. </p>
                    </div>
                </div>

                                
                <h1 className='titulo'> Valores </h1>
             <div className="valores">
    <div className="carrossel">
        <div className='mae'>
            <h3 className='topicos'>Excelência:</h3>
            <p>Compromisso com a qualidade no atendimento e resultados clínicos.</p>
        </div>
        <div className='mae'>
            <h3 className='topicos'>Humanização:</h3>
            <p>Atendimento acolhedor e empático, respeitando as necessidades de cada paciente.</p>
        </div>
        <div className='mae'>
            <h3 className='topicos'>Inovação:</h3>
            <p>Atualização constante em técnicas e conhecimentos, integrando as melhores práticas na fisioterapia.</p>
        </div>
        <div className='mae'>
            <h3 className='topicos'>Responsabilidade:</h3>
            <p>Compromisso com a saúde e segurança dos pacientes e suas famílias.</p>
        </div>
        <div className='mae'>
            <h3 className='topicos'>Empatia:</h3>
            <p>Compreensão e sensibilidade nas interações com pacientes e colaboradores.</p>
        </div>
   
           
        <div className='mae'>
            <h3 className='topicos'>Excelência:</h3>
            <p>Compromisso com a qualidade no atendimento e resultados clínicos.</p>
        </div>
        <div className='mae'>
            <h3 className='topicos'>Humanização:</h3>
            <p>Atendimento acolhedor e empático, respeitando as necessidades de cada paciente.</p>
        </div>
        <div className='mae'>
            <h3 className='topicos'>Inovação:</h3>
            <p>Atualização constante em técnicas e conhecimentos, integrando as melhores práticas na fisioterapia.</p>
        </div>
        <div className='mae'>
            <h3 className='topicos'>Responsabilidade:</h3>
            <p>Compromisso com a saúde e segurança dos pacientes e suas famílias.</p>
        </div>
        <div className='mae'>
            <h3 className='topicos'>Empatia:</h3>
            <p>Compreensão e sensibilidade nas interações com pacientes e colaboradores.</p>
        </div>
    </div>
 </div>
  </div>
        <div className="rodape">
                <div className="um">
                    <img id='logo' src="/assets/image/logo1.png" alt="logoRodape" />
                    <div className="redes">
                        <img id='a' src="/assets/image/linkedin.svg" alt="" />
                        <img id='b' src="/assets/image/instagram.svg" alt="" />
                        <img id='c' src="/assets/image/twitter-x.svg" alt="" />
                    </div>
                </div>

                <div className="dois">
                    <h1>HSSW Code.</h1>
                    <h1>O que persiste é o aprendizado.</h1>
                </div>

                <div className="tres">
                    <h1>Explore</h1>
                    <div className="links">
                        <button className='final' onClick={() => homeRef.current.scrollIntoView({ behavior: 'smooth' })}>Home</button>
                        <button className='final' onClick={() => sobreRef.current.scrollIntoView({ behavior: 'smooth' })}>Sobre Nós</button>
                        <button className='final' onClick={() => especialidadesRef.current.scrollIntoView({ behavior: 'smooth' })}>Especialidades</button>
                        <button className='final' onClick={() => curiosidadeRef.current.scrollIntoView({ behavior: 'smooth' })}>Curiosidades</button>
                        <Link to="/">Contatos</Link>
                    </div>
                </div>

                <div className="quatro">
                    <h1>Politica de privacidade</h1>
                    <h1>FAQ</h1>
                </div>
            </div>
        </div>    


)
};