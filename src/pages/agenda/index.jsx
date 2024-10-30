import './index.scss';
import Cabecalho from '../../components/cabecalho';
import MyCalendar from '../../components/calendar';

export default function Agenda() {
    return (

        <div className='agenda-page'>
            <Cabecalho className="cabecalho" />

            <div className='left'>
                <div className='btns'>
                    <div className='row'>
                        <input type="text" placeholder='Pesquisar cliente' />
                        <div className='nataly'>
                            <button>Pessoal</button>
                            <button>Geral</button>
                        </div>
                    </div>
                </div>

                <div className='calendario'>
                    <div className='block'>
                        <MyCalendar />
                    </div>
                </div>
            </div>
            <div className='right'>
                <div className='header'>
                    <div className='row'>
                        <button>Agende de consultas</button>
                        <button className='more'>+</button>
                    </div>
                </div>
                <div className='container'>
                    <div className="card">
                        <div className="header-card">
                            <div className='grey'>
                                <img src="./assets/image/Calendar.png" alt=" " width={20} height={20} />
                                <p>evento do dia:</p>
                                <p>23/09/24</p>
                                <p>(segunda-feira)</p>
                            </div>
                            <div className='white'>
                                <p>local</p>
                                <select name="Status" >
                                    
                                    <option value="Status">Status
                                    </option>
                                    <option value="Status">Pendente
                                    </option>
                                    <option value="Status">Concluido
                                    </option>
                                    <option value="Status">Proximo
                                    </option>
                                </select>
                                <p>evento</p>
                                <p>horario</p>
                                <button>atualizar</button>
                            </div>
                        </div>
                        <div className='items'>
                             <div className='item'>
                       
                                <p>escritorio</p>
                                <div className='status'>
                                    <p>pendente</p>
                                </div>
                                <p>Aculp. Maria.</p>
                                <p>09:00</p>
                                <div className='mores'><p>...</p></div>
                            </div>
                            <div className='item'>
                                <p>escritorio</p>
                                <div className='status'>
                                    <p>pendente</p>
                                </div>
                                <p>Aculp. Maria</p>
                                <p>09:00</p>
                                <div className='mores'><p>...</p></div>
                            </div>
                            <div className='item'>
                                <p>escritorio</p>
                                <div className='status'>
                                    <p>pendente</p>
                                </div>
                                <p>Aculp. Maria</p>
                                <p>09:00</p>
                                <div className='mores'><p>...
                                    </p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}