import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import CreateGroup from './pages/CreateGroup';
import MyGroup from './pages/MyGroup';
import AddExpense from './pages/AddExpense';
import Settle from './pages/Settle';

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {/* <Route path="/split" element={<Split/>} /> */}
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/creategroup' element={<CreateGroup/>}/>
        <Route path='/mygroup' element={<MyGroup/>}/>
        <Route path='/add' element={<AddExpense/>}/>
        <Route path='/settle' element={<Settle/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
