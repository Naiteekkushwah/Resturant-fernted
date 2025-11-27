import React,{useState} from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './Sections/Home.jsx'
import Manu from './Sections/Manu.jsx'
import Aboutes from './Sections/Aboutes.jsx'
import Photo from './Sections/Photo.jsx'
import Testmonials from './Sections/Testmonials.jsx'
import Contect from './Sections/Contect.jsx'
import Footer from './Sections/Footer.jsx'
import Owner from './Sections/Owner.jsx'
import Order from './Sections/Order.jsx'
import Tablebuking from './Sections/Tablebuking.jsx'
import Cart from './Sections/Cart.jsx'
import Login from "./Sections/Login.jsx";
import Singup from "./Sections/Singup.jsx";
import Laoding from "./Components/Laoding.jsx";
import Getteble from './Components/Getteble.jsx'
import Getorder from './Components/Getorder.jsx'
const App = () => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading ? (
        <Laoding onComplete={() => setLoading(false)} />
      ) : (
        <div id='Home' className=' overflow-clip'>
        <Routes>
        <Route path="/"  element={<Home />} />
        <Route path='/owner' element={<Owner />} />
        <Route path='/order' element={<Order />} />
        <Route path='/Tablebooking' element={<Tablebuking/>} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/gett" element={<Getteble />} />
        <Route path="/getO" element={<Getorder />} />
        </Routes>
      <div id='Menu'><Manu /></div>
      <div><Photo /></div>
      <div id='About'><Aboutes /></div>
      <div id='Test' ><Testmonials /></div>
      <div id='Contact'><Contect /></div>
      <div id='Footer'><Footer /></div>
        </div>
      )}
    </>
  );
};
export default App;
