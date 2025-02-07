import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import { Register } from "./pages/Register";
import {VerifyPage} from "./pages/VerifyPage"
import {Login} from "./pages/Login";
import { NotesPage } from "./pages/NotesPage";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/verify/:token" element={<VerifyPage/>}/>
        <Route path="/Login" element={<Login />} />
        <Route path="/Notes" element={<NotesPage/>}/>
      </Routes>
    </>
  );
}

export default App;
