import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Landing from './components/Landing';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element= {
        <Login />} />

        <Route path="/signup" element= {
                <Signup />} />
        
        <Route path="/landing" element= {
                <Landing />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
