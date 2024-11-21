import './index.scss';
import { Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import storage from 'local-storage';
import axios from 'axios';


export default function LoginP() {
   


    return (
        <div className="LoginP">
              <div className="esquerda">
                    <div className="logo">
                    <img src="/assets/image/logo1.png" alt="banner da empresa" />
                    </div>
                </div>
            <div className="tela">
              

                <div className="direita">

                        <div className="cartao">
                            <div className="text">
                                
                                <h1>Quem é você?</h1>
                            </div>
                            <div className="perguntas">
                                <div className="input">

                                <Link to="/loginCliente">
                                    <button> Cliente</button>
                                </Link>
                                </div>
                                <div className="input">
                                    <Link to="/telaLogin" >
                                    <button> Funcionario </button>
                                    </Link>
                                </div>

                            </div>

                            

                        </div>

                </div>
            </div>

            <div className="risco"></div>
        </div>
    )
}

