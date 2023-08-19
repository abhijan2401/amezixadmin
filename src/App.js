import { Routes, Route } from 'react-router-dom';
import './App.css';
import AdminBoard from './Components/AdminBoard/AdminBoard';
import Transaction from './Pages/Transaction/Transaction';
import Filter from './Components/Filter/Filter';
import Banner from './Pages/Banner/Banner';
import Loader from './Components/Loader/Loader';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import ForgetPass from './Components/ForgetPassword/ForgetPass';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/amezixadmin' element={<AdminBoard />} />
        <Route path='/Transaction' element={<Transaction />} />
        <Route path='/Filter' element={<Filter />} />
        <Route path='/Banner' element={<Banner />} />
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/SignIn' element={<SignIn/>}/>
        <Route path='/ForgetPass' element={<ForgetPass/>}/>
      </Routes>
    </div>
  );
}

export default App;
