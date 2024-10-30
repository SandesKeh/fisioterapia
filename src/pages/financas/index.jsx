import './index.scss';
import Cabecalho from '../../components/cabecalho';



export default function Financas(){
 

    return(
        <div className="financas">
            
          <div className="all">
          <Cabecalho/>

        <div className="cima1">    

            <div className="cima">
                <div className="periodo">
                    <h1> Período: </h1>
                    <select name="" id=""> <option value="text"> Ago/2024</option> </select>
                    <div className="botao">
                        <button id='primeiro'> + Adicionar receita </button>

                        <button id='segundo'>+ Adicionar despesa </button>

                        <button id='terceiro'> <img src="/assets/image/bxs-brightness.svg" alt="" /> Opções  </button>
                    </div>
                </div>
                <div className="card">
                    <div className="saldos"> 
                        <div className="saldo">
                            <img src="/assets/image/Dollar sign.png" alt="" />
                        </div>

                        <div className="saldoatual">
                            <h1>Saldo atual</h1>
                            <h2>R$ 0,00 </h2>
                        </div>

                        <div className="naopago">
                            <h1> Não pago: R$ 0,00</h1>
                        </div>
                    </div>

                    <div className="saldos1"> 
                        <div className="saldo">
                            <img src="/assets/image/Icon.png" alt="" />
                        </div>

                        <div className="saldoatual">
                            <h1>Receita Prevista</h1>
                            <h2>R$ 0,00</h2>
                        </div>

                        <div className="naopago">
                            <h1> Não pago: R$ 0,00</h1>
                        </div>
                    </div>

                    <div className="saldos2"> 
                        <div className="saldo">
                            <img src="/assets/image/Icon.png" alt="" />
                        </div>

                        <div className="saldoatual">
                            <h1>Despesas Prevista</h1>
                            <h2>R$ 0,00</h2>
                        </div>

                        <div className="naopago">
                            <h1> Não pago: R$ 0,00</h1>
                        </div>
                    </div>
                </div>


                <div className="filtros">
                    <div className="esquerda">
                        <button>situação todas</button>
                        <button>Clientes Todas</button>
                    </div>
                    <div className="esquerda">
                        <button>Mais Filtros</button>
                    </div>
                </div>

                <div className="tabela">
                <table>
                            <tr>
                                <th> Situação</th>
                                <th> Propiedade</th>
                                <th>Categoria Financeira</th>
                                <th> Descrição</th>
                                <th> Cliente </th>
                                <th> Data de Vencimento </th>
                                <th> Valor a receber </th>
                                <th> Valor a receber </th>
                                <th> Valor Pago </th>
                                <th> Data pagamento </th>
                                <th> Ações </th>
                            </tr>

                            <tr>
                               
                            </tr>
                   
                        </table>
                </div>
            </div>
        </div>
          </div>

           
            
        </div>
    )
}