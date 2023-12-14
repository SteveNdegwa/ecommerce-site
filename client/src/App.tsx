import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { CreateAccount } from './pages/CreateAccount';
import { UpdateAccount } from './pages/UpdateAccount';
import { Provider } from 'react-redux';
import { store } from './store';
import { AddProduct } from './pages/AddProduct';
import { ManageProducts } from './pages/ManageProducts';
import { UpdateProduct } from './pages/updateProduct';

function App() {
  return(
    <div className="app">
      <Provider store={store}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/create-account' element={<CreateAccount/>}/>
          <Route path='/update-account' element={<UpdateAccount/>}/>
          <Route path='/add-product' element = {< AddProduct/>}/>
          <Route path='/manage-products' element = {< ManageProducts/>}/>
          <Route path='/update-product/:productId' element = {< UpdateProduct/>}/>
        </Routes>
        <Footer/>
      </Router>
      </Provider>
    </div>
  );
}

export default App
