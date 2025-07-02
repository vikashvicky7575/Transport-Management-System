
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx';
import AdminLayout from './Admin_Panel/Components/Admin_Layout/Admin_Layout';
import Login from './Pages/Login/Login.jsx';
import DispatcherLayout from './Admin_Panel/Components/Admin_Dispatcher/DispatcherLayout.jsx';
import DriverLayout from './Admin_Panel/Components/DriverNavbar/DriverLayout/DriverLayout.jsx';
//fontawesome Icon 
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          {/* Admin Panel */}
          <Route path='/admin/*' element={<AdminLayout />} />
          {/* Dispatcher Panel */}
          <Route path='/dispatcher/*' element={<DispatcherLayout />} />
          {/* Driver Panel */}
          <Route path='/driver/*' element={<DriverLayout />} />

         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
