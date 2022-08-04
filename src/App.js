import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employees from "./pages/employees/Employees";
import Navbar from './components/Navbar/Navbar';
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
