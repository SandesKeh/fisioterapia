import './index.scss';
import { Link } from 'react-router-dom';
import imagem from '../../assets/image/banner.svg'
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Landingpage() {

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
        <div className="landpage">
            <div className="cabecalho" ref={homeRef}>
                <img src="assets/image/logo.webp" alt="nao foi" />
                <div className="links">
                    <button onClick={() => homeRef.current.scrollIntoView({ behavior: 'smooth' })}>Home</button>

                    <button onClick={() => sobreRef.current.scrollIntoView({ behavior: 'smooth' })}>Sobre Nós</button>

                    <button onClick={() => especialidadesRef.current.scrollIntoView({ behavior: 'smooth' })}>Especialidades</button>
                    
                    <button onClick={() => curiosidadeRef.current.scrollIntoView({ behavior: 'smooth' })}>Curiosidades</button>
                    
                    <button>
                    <Link className='contato' to="/">Contatos</Link>
                    </button>
                    
                        <Link id='oloco' to='/loginCliente'> Login </Link>
                       
                </div> 
            </div>

            <div className="banner" style={{ backgroundImage: `URL(${imagem})` }}>
                <div className='protecao'>   
                    <div className="car">
                        <h1> O melhor para a sua <span>saúde</span></h1>
                        <button className='agendamento'> Faça seu agendamento  <i><img src="/assets/image/right-arrow.png" alt="Agendar" /> </i> </button>
                    </div> 
                </div>
            </div>

            <div className="sobre" ref={sobreRef}>
                <div className="tex"> 
                    <h1>Sobre nós</h1>
                    <p>Nosso objetivo é ir além de uma simples seção de fisioterapia e pilates, buscamos impulsionar a sáude dos nossos clientes. Entendemos que cada organização é única em sua estrutura e necessidade, por isso estamos comprometidos em oferecer soluções personalizadas e integradas à sua realidade, independente do seu porte.</p>
                    <p>Estamos prontos para ajudá-lo a alcançar seus objetivos. Nossa experiência e dedicação em transformar-lo uma nova pessoa são a base para o seu sucesso. 
                    Junte-se a nós e    descubra.</p>
                    <button> <Link className='link' to="/sobre">Saiba mais</Link> </button>
                </div>
                <img src="/assets/image/doutora.jpg" alt="Sobre nós" />
            </div>


            <div className="especialidades" ref={especialidadesRef}>
                <h1>Especialidades</h1>
                <div className="quatro">
                    <div className="info">
                        <img onClick={abrirPopup} src="/assets/image/acupuntura2.png" alt="" />
                    
                    </div>

                    <div className="info">
                        <img onClick={abrirPopup2} src="/assets/image/esportiva2.png" alt="" />
                    
                    </div>

                    <div className="info">
                        <img onClick={abrirPopup3} src="/assets/image/gerontologia2.png" alt="" />
                    
                    </div>
            
                    <div className="info">
                        <img onClick={abrirPopup4} src="/assets/image/neurociencia2.png" alt="" />
                    
                    </div>
                   
                </div>

                <div className="tres">
                    <div className="info">
                        <img onClick={abrirPopup5} src="/assets/image/respiratorio2.png" alt="" />
                    
                    </div>

                    <div className="info">
                        <img onClick={abrirPopup6} src="/assets/image/saude2.png" alt="" />
                    
                    </div>

                    <div className="info">
                        <img onClick={abrirPopup7} src="/assets/image/quiropraxia2.png" alt="" />
                    
                    </div>
                </div>

            </div>

            {mostrarPopup && (
                <div className="popup-background" onClick={clicaFora}>
                    <div className="popup">
                        <div className="infos">
                            <h1>Acupuntura</h1>
                            <div className="text">
                                <p>Envolve o uso de agulhas finas para estimular pontos específicos no corpo, visando aliviar a dor e promover o equilíbrio energético.</p>
                                <button >Agende</button>
                            </div>
                        </div>
                        <img src="/assets/image/acupuntura.png" alt="Acupuntura" />
                    </div>
                </div>
            )}

            {mostrarPopup2 && (
                <div className="popup-background" onClick={clicaFora2}>
                    <div className="popup">
                        <div className="infos">
                            <h1>Esportiva</h1>
                            <div className="text">
                                <p>É voltada para atletas, ajudando na prevenção e tratamento de lesões relacionadas à prática esportiva, além de otimizar o desempenho.</p>
                                <button >Agende</button>
                            </div>
                        </div>
                        <img src="/assets/image/esportiva.png" alt="Acupuntura" />
                    </div>
                </div>
            )}

            {mostrarPopup3 && (
                <div className="popup-background" onClick={clicaFora3}>
                    <div className="popup">
                        <div className="infos">
                            <h1>Gerontologia</h1>
                            <div className="text">
                                <p>Especializada em atender idosos, abordando questões como mobilidade, prevenção de quedas e manutenção da funcionalidade.</p>
                                <button >Agende</button>
                            </div>
                        </div>
                        <img src="/assets/image/genotologia.png" alt="Acupuntura" />
                    </div>
                </div>
            )}

            
            {mostrarPopup4 && (
                <div className="popup-background" onClick={clicaFora4}>
                    <div className="popup">
                        <div className="infos">
                            <h1>Neurociência da Dor</h1>
                            <div className="text">
                                <p>Trata pacientes com distúrbios neurológicos, como AVC, lesões medulares e doenças neuromusculares, visando melhorar a função e a independência.
                                </p>
                                <button >Agende</button>
                            </div>
                        </div>
                        <img src="/assets/image/neorociencia.png" alt="Acupuntura" />
                    </div>
                </div>
            )}

            {mostrarPopup5 && (
                <div className="popup-background" onClick={clicarFora5}>
                    <div className="popup">
                        <div className="infos">
                            <h1>Respiratoria</h1>
                            <div className="text">
                                <p>Foca na avaliação e tratamento de pacientes com condições respiratórias, como asma, bronquite e doença pulmonar obstrutiva crônica.
                                </p>
                                <button >Agende</button>
                            </div>
                        </div>
                        <img src="/assets/image/respiratoria.png" alt="Acupuntura" />
                    </div>
                </div>
            )}

            {mostrarPopup6 && (
                <div className="popup-background" onClick={clicarFora6}>
                    <div className="popup">
                        <div className="infos">
                            <h1>Saúde da Mulher</h1>
                            <div className="text">
                                <p>Concentra-se em condições específicas das mulheres, como gestação, pós-parto, incontinência urinária e disfunções do assoalho pélvico.
                                </p>
                                <button >Agende</button>
                            </div>
                        </div>
                        <img src="/assets/image/saúdedamulher.png" alt="Acupuntura" />
                    </div>
                </div>
            )}

            
            {mostrarPopup7 && (
                <div className="popup-background" onClick={clicarFora7}>
                    <div className="popup">
                        <div className="infos">
                            <h1>Quiropraxia</h1>
                            <div className="text">
                                <p>Envolvendo técnicas de manipulação e ajustes articulares, visa corrigir disfunções do sistema neuro-músculo-esquelético.
                                </p>
                                <button >Agende</button>
                            </div>
                        </div>
                        <img src="/assets/image/quiropraxia.png" alt="Acupuntura" />
                    </div>
                </div>
            )}


            <div className='conteudoInformativos' ref={curiosidadeRef}>
                    <h1> Curiosidades </h1>
                <div className="card1">
                    <img src="/assets/image/10motivos.png" alt="" />
                </div>
                <div className="card2">
                    <img src="/assets/image/Dor (1) 1.png" alt="" />
                    <img src="/assets/image/Existem 3 tipos de dores (2) 1.png" alt="" />
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
    );
}
