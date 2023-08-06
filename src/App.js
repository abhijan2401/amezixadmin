import { Routes, Route } from 'react-router-dom';
import './App.css';
import AdminBoard from './Components/AdminBoard/AdminBoard';
import Transaction from './Pages/Transaction/Transaction';
import Filter from './Components/Filter/Filter';
import Banner from './Pages/Banner/Banner';
import Loader from './Components/Loader/Loader';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/amezixadmin' element={<AdminBoard />} />
        <Route path='/Transaction' element={<Transaction />} />
        <Route path='/Filter' element={<Filter />} />
        <Route path='/Banner' element={<Banner />} />
      </Routes>
    </div>
  );
}

export default App;
