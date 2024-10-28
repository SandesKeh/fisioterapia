import './index.scss';
import React, { useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';


export default function Sobre() {

    const navegacao = useNavigate();

    const handleScrollToSection = (sectionId) => {
        navegacao("/", { state: { sectionId } });

    };

    const especialidadesRef = useRef(null);
    const curiosidadeRef = useRef(null);
    const sobreRef = useRef(null);
    const homeRef = useRef(null);
    const location = useLocation();


    return (
        <div className="sobreMais">
            <div className="cabecalho">
                <img src="assets/image/logo.webp" alt="nao foi" />
                <div className="links">
                    <button className='button' onClick={() => handleScrollToSection('secao4')}>Home</button>
                    <button className='button' onClick={() => handleScrollToSection('secao3')}>Sobre Nós</button>
                    <button className='button' onClick={() => handleScrollToSection('secao1')}>Especialidades</button>
                    <button className='button' onClick={() => handleScrollToSection('secao2')}>Curiosidades</button>
                    <Link to="/">Contatos</Link>

                    <Link id='oloco' to='/telaLogin'> Login </Link>

                </div>
            </div>


            <div className="sobre">
                <div className="primeiro">
                    <h1>Sobre mim</h1>
                    <p>Me chamo Daniela Barbosa Rodrigues, tenho 36 anos, casada, mãe de 2 menina. Formada em Fisioterapia pela Universidade nove de Julho, POS Graduada em Fisioterapia Intensiva Pediátrica e Neonatal pela FABIC. Formação em Pilates pela VOLL Pilates, Curso de Neurociência da dor aplicada a prática clinica pelo TUDO SOBRE DOR. Trabalhei nas instituições de saúde da REDE DOR das unidades do Jabaquara e Morumbi. Atuando tanto em pediatria e adulto. Realizo atendimento domiciliar na região  da Zona Sul de São Paulo.</p>
                </div>

                <div className='grup'>
                    <div className="missao">
                        <h1>Visão</h1>
                        <p>"Ser referência em atendimento fisioterapêutico domiciliar na Zona Sul de São Paulo, promovendo a saúde e o bem-estar de crianças e adultos com excelência e humanização."</p>
                    </div>

                    <div className="missao">
                        <h1>Missão</h1>
                        <p>"Oferecer serviços de fisioterapia de alta qualidade, com foco em cuidados pediátricos e adultos, utilizando abordagens integrativas e personalizadas, sempre priorizando a saúde e o conforto dos nossos pacientes."</p>
                    </div>


                </div>

                                
                <h1 className='titulo'> Valores </h1>

                <div className="valores">

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
                        <p> Atualização constante em técnicas e conhecimentos, integrando as melhores práticas na fisioterapia.</p>

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
