
import Landingpage from "./pages/landingpage";
import TelaLogin from "./pages/telaLogin";
import Home from "./pages/home";
import Login from "./pages/loginCliente";
import Sobre from "./pages/sobre";
import Cadastro from "./pages/cadastrar";
import TelaCadastrar from "./pages/telaCadastrar";
import Agenda from "./pages/agenda";
import InserirPacotes from "./pages/inserirPacotes";
import AddProfissional from "./pages/inserirProfissional";
import AddDocumento from "./pages/adicionarDocumento";
import Notificacoes from "./pages/notificacoes";
import Inventario from "./pages/inventario";
import TelaCliente from "./pages/telaCliente";
import Financas from "./pages/financas";
import { BrowserRouter, Routes, Route } from "react-router-dom";



export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landingpage/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/telaLogin" element={<TelaLogin/>}/>
                <Route path="/loginCliente" element={<Login/>}/>
                <Route path= "/sobre" element= {<Sobre/>}/>
                <Route path= "/cadastrar" element= {<Cadastro/>}/>
                <Route path="/telaCadastrar" element={<TelaCadastrar/>} />
                <Route path="/agenda" element={<Agenda/>}/>
                <Route path="/inserirPacotes" element={<InserirPacotes/>}/>
                <Route path="/inserirProfissional" element={<AddProfissional/>}/>
                <Route path="/inserirDocumento" element={<AddDocumento/>}/>
                <Route path="/notificacoes" element={<Notificacoes/>}/>
                <Route path="/inventario" element={<Inventario/>}/>
                <Route path="/telaCliente" element={<TelaCliente/>}/>
                <Route path="/financas" element={<Financas/>}/>
            </Routes>
        </BrowserRouter>
    )
}