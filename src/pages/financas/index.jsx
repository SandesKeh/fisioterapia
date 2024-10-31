import './index.scss';
import Cabecalho from '../../components/cabecalho';
import { useState } from 'react';



export default function Financas(){
 
    const [mostrarReceita, setMostrarReceita] = useState(false);

    const abrirReceita = () => {
        setMostrarReceita(true);
    };

    const fecharReceita = (e) => {
        
        setMostrarReceita(false)
        
    };

    const [mostrarReceita1, setMostrarReceita1] = useState(false);

    const abrirReceita1 = () => {
        setMostrarReceita1(true);
    };

    const fecharReceita1 = (e) => {
        
        setMostrarReceita1(false)
        
    };
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
                        <button id='primeiro' onClick={abrirReceita} > + Adicionar receita </button>

                        <button id='segundo' onClick={abrirReceita1} >+ Adicionar despesa </button>

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

                {mostrarReceita && (
                        <div className="popup-background">
                            <div className="popup">
                                <div className="mensagem">
                                    <h1>Adicionar Receita  </h1>
                                    <img onClick={fecharReceita} src="/assets/image/bx-x.svg" alt="" />
                                </div>
                                <div className="mensage">
                                    <h1> Propriedade: </h1>
                                    <select> 
                                        <option value=""> Selecione </option>
                                        <option value="convênio "> Convênio </option>
                                        <option value="público "> Público  </option>
                                    </select>

                                    <h1> Categoria financeira:</h1>
                                    <select >
                                        <option value=""> Selecione </option>
                                        <option value=""> Cobrança avulsa </option>     
                                        <option value=""> Depósito  </option>     
                                        <option value=""> Mensalidade  </option>   
                                    </select>
                                    <h1>Descrição: </h1>
                                    <input type="text" placeholder='Digite aqui' />

                                    <div className="row">
                                        <div className="valor">
                                            <h1>Valor: </h1>
                                            <input type="text" placeholder='R$ 0.00' />
                                        </div>
                                        <div className="data">
                                            <h1>Data de pagamento:</h1>
                                            <input type="date" placeholder='__/__/____' />
                                        </div>
                                    </div>

                                    <h1>Forma de pagamento:</h1>
                                    <select> 
                                        <option value=""> Selecione </option>
                                        <option value="Crédito"> Crédito </option>
                                        <option value="Débito"> Débito </option>
                                        <option value="Dinheiro"> Dinheiro </option>
                                    </select>

                                    <div className="observacao">
                                        <h1>Observações:</h1>

                                        <input type="text" placeholder='Digite aqui' />
                                    </div>
                                </div>
                                <div className="botao">
                                   
                                    <div className="button">
                                        <button className='botao' onClick={fecharReceita} > Cancelar </button>
                                        <button> Salvar </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {mostrarReceita1 && (
                        <div className="popup-background">
                            <div className="popup">
                                <div className="mensagem">
                                    <h1>Adicionar Despesa  </h1>
                                    <img onClick={fecharReceita1} src="/assets/image/bx-x.svg" alt="" />
                                </div>
                                <div className="mensage">
                                    <h1> Propriedade: </h1>
                                    <select> 
                                        <option value=""> Selecione </option>
                                        <option value="convênio "> Convênio </option>
                                        <option value="público "> Público  </option>
                                    </select>

                                    <h1> Categoria financeira:</h1>
                                    <select>
                                        <option value="">Selecione</option>
                                        <option value="13_salari">13° salário</option>
                                        <option value="adiantamento">Adiantamento</option>
                                        <option value="agua">Água</option>
                                        <option value="ajuste_caixa">Ajuste de caixa</option>
                                        <option value="alimentacao">Alimentação</option>
                                        <option value="aluguel">Aluguel</option>
                                        <option value="bonificacao">Bonificação</option>
                                        <option value="confins">Confins</option>
                                        <option value="conselho">Conselho</option>
                                        <option value="contabilidade">Contabilidade</option>
                                        <option value="csll">CSLL</option>
                                        <option value="darf">DARF</option>
                                        <option value="despesas_nao_categorizadas">Despesas não categorizadas</option>
                                        <option value="distribuicao_lucros">Distribuição de lucros</option>
                                        <option value="energia_eletrica">Energia elétrica</option>
                                        <option value="exames_pre_deminionais">Exames pré e demissionais</option>
                                        <option value="ferias">Férias</option>
                                        <option value="fgts">FGTS</option>
                                        <option value="horas_extras">Horas Extras</option>
                                        <option value="inss">INSS</option>
                                        <option value="iof">IOF</option>
                                        <option value="ipi">IPI</option>
                                        <option value="iptu">IPTU</option>
                                        <option value="ipva">IPVA</option>
                                        <option value="irpj">IRPJ</option>
                                        <option value="irrf">IRRF</option>
                                        <option value="iss">ISS</option>
                                        <option value="juros">Juros</option>
                                        <option value="material_escritorio">Material de escritório</option>
                                        <option value="outros">Outros</option>
                                        <option value="pis">PIS</option>
                                        <option value="pro_labore">Pró-labore</option>
                                        <option value="remuneracao">Remuneração</option>
                                        <option value="rescisao_trabalhista">Rescisões trabalhistas</option>
                                        <option value="salario">Salário</option>
                                        <option value="simples_nacional">Simples Nacional</option>
                                        <option value="taxas_bancarias">Taxas bancárias</option>
                                        <option value="telefone_celular">Telefone celular</option>
                                        <option value="telefonia_internet">Telefonia e Internet</option>
                                        <option value="transportadora">Transportadora</option>
                                        <option value="vale_alimentacao">Vale Alimentação</option>
                                        <option value="vale_transporte">Vale Transporte</option>
                                        <option value="viagens">Viagens</option>
                                    </select>

                                    <h1>Descrição: </h1>
                                    <input type="text" placeholder='Digite aqui' />

                                    <div className="row">
                                        <div className="valor">
                                            <h1>Valor: </h1>
                                            <input type="text" placeholder='R$ 0.00' />
                                        </div>
                                        <div className="data">
                                            <h1>Data de pagamento:</h1>
                                            <input type="date" placeholder='__/__/____' />
                                        </div>
                                    </div>

                                    <h1>Forma de pagamento:</h1>
                                    <select> 
                                        <option value=""> Selecione </option>
                                        <option value="Crédito"> Crédito </option>
                                        <option value="Débito"> Débito </option>
                                        <option value="Dinheiro"> Dinheiro </option>
                                    </select>

                                    <div className="observacao">
                                        <h1>Observações:</h1>

                                        <input type="text" placeholder='Digite aqui' />
                                    </div>
                                </div>
                                <div className="botao">
                                   
                                    <div className="button">
                                        <button className='botao' onClick={fecharReceita1} > Cancelar </button>
                                        <button> Salvar </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </div>
          </div>

           
            
        </div>
    )
}