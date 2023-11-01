import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { CreateAccount } from './pages/CreateAccount';
import { UpdateAccount } from './pages/UpdateAccount';

function App() {
  return(
    <div className="app">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/create-account' element={<CreateAccount/>}/>
          <Route path='/update-account' element={<UpdateAccount/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App
