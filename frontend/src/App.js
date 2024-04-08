
import './App.css';
import AddStudent from './components/AddStudent';
import Header from './components/Header';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <div>
             <Header/>
             <Routes> <Route path="/add" exact Component={AddStudent}/></Routes>
              
        
        </div>
    </Router>
   
  );
}

export default App;
