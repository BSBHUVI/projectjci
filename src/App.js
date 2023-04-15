import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ProductForm from './components/ProductForm';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={<Navbar/>}  >
        <Route path='/' index element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
           <Route path='/home' element={<Home/>}/>
           <Route path="/productupload" element={<ProductForm/>}/>
        </Route>
      </Routes>
    </Router>
  
    </div>
  );
}

export default App;
