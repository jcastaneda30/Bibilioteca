
import './App.css'
import Home from './components/Home/Home';
import  Login  from './components/Login/Login'
import { Registro } from './components/Registro/Registro.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function parseJwt (token) {
  console.log(token)
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

let tokenExistAndValid =  (parseJwt(localStorage.getItem('token')).exp*1000 > Date.now())
console.log(parseJwt(localStorage.getItem('token')))
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={tokenExistAndValid ? <Home /> : <Login />} />
        <Route path='/register' element={<Registro />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
