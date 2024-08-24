import { useState } from 'react';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Layout from './Component/Layout';
import  Home  from './Component/Home';
import Grids from './Component/Grids';
import Login from './Component/Login';
import Register from './Component/Register';
import Checkout from './Component/Checkout';
import Cart from './Component/Cart';

import OrderManage from './Component/OrderManage'
import YourProducts from './Component/YourProduct';
import AddProduct from './Component/AddProduct';
import CantFindProduct from './Component/CantFindProduct';


function App() {

  const [ProductList,setProductList]=useState([]);
  const [CurrentPage,setCurrentPage]=useState(null);
  const [TotalPage,setTotalPage]=useState(null);
  const [searchText, setSearchText] = useState("");
  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<Layout searchText={searchText} setSearchText={setSearchText}
   setProductList={setProductList} setCurrentPage={setCurrentPage} setTotalPage={setTotalPage}/>} >
      <Route index element={<Home />}/>
      <Route path="Grids" element={<Grids searchText={searchText} setProductList={setProductList} ProductList={ProductList} setCurrentPage={setCurrentPage} CurrentPage={CurrentPage} TotalPage={TotalPage}/>}/>
      <Route path='Login' element={<Login />}/>
      <Route path='Register' element={<Register />}/>
      <Route path='Checkout' element={<Checkout />}/>
      <Route path='Cart' element={<Cart />}/>
      <Route path="OrderManage" element={<OrderManage/>}/>
      <Route path='YourProducts' element={<YourProducts/>}/>
      <Route path='AddProduct' element={<AddProduct/>}/>
      <Route path='CantFindProduct' element={<CantFindProduct/>}/>
  </Route>


  


</Routes>
</BrowserRouter>
  );
}

export default App;
