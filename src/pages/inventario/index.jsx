import './index.scss';
import Cabecalho from '../../components/cabecalho';

export default function Inventario(){
    return(
        <div className="inventario">
             <div className="protecao">
                <Cabecalho/>
                <div className="t">
                <div className="text">
                    <h1>Usuarios</h1>
                    <h2>Usuarios</h2>
                </div>

                <div className="text">
                    <h1>Modelos</h1>
                    <h2>Documentação</h2>
                </div>

                <div className="text">
                    <h1>Finanças</h1>
                    <h2>Pacotes </h2>
                </div>

                <div className="text">
                    <h1>Notificações</h1>
                    <h2>Para Cliente</h2>
                </div>

                <div className="text">
                    <h1>Inventario </h1>
                    
                </div>
                </div>
            </div>
            <div className="lado">
                <table>
                    <tr>
                        <th> Nome do Produto </th>
                        <th> Categoria </th>
                        <th>Qts. em estoque</th>
                        <th> Onde comprou</th>
                        <th> Preço unitário </th>
                        <th> Preço unitário</th>
                        <th> Data da compra </th>
                    </tr>       
                    <tr>
                        <td> Bola suíça </td>
                        <td> Pilates</td>
                        <td> 10 </td>
                        <td> Amazon </td>
                        <td> R$ 80,32</td>
                        <td> R$ 803,20 </td>
                        <td> 07/07/2024 </td>

                    </tr>

                    <tr>
                        <td> Bastão de fisioterapia </td>
                        <td> Fisioterapia</td>
                        <td> 3 </td>
                        <td> Fisio Fernandes </td>
                        <td> R$ 86,40</td>
                        <td> R$ 259,20 </td>
                        <td> 01/07/2024</td>

                    </tr>

                </table>
                <div className="botao">
                    <button> + Adicionar Produto </button>
                    <button> Editar </button>
                </div>
            </div>
          
        </div>
    )
}