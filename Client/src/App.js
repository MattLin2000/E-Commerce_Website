import { useState } from 'react';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Layout from './Component/Layout';
import  Home  from './Component/Home';
import Grids from './Component/Grids';
import Login from './Component/Login';
import Register from './Component/Register';
import Checkout from './Component/Checkout';
import Cart from './Component/Cart';
import BuyerCenter from './Component/BuyerCenter';
import SellerOrder from './Component/SellerOrder'
import YourProducts from './Component/YourProduct';
import AddProduct from './Component/AddProduct';
import CantFindProduct from './Component/CantFindProduct';
import axios from 'axios';

function App() {

  const [ProductList,setProductList]=useState([]);
  const [CurrentPage,setCurrentPage]=useState(null);
  const [TotalPage,setTotalPage]=useState(null);
  const [searchText, setSearchText] = useState("");
  //Page物件
  const [pageable,setPageable]=useState();
  //product_details，獲得購物車商品資訊，數量。
  const [details,setDetails]=useState();
  //確認登入狀態
  const [login,setLogin]=useState(false);

  //購物車搜索,返回Page物件和product_details
  const getCart = async ()=>{
    try {
      const jwtToken = localStorage.getItem('jwtToken')
      const response = await axios.get("http://localhost:8080/api/cart/get", {
        headers: {
          // 設定自訂標頭，例如認證令牌
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json', // 設定內容類型
          // 添加其他必要的標頭
        },
        params: {
          id: 1, // 根據id查詢
        },
      });
    
      setPageable(response.data[0]);
      setDetails(response.data[1]);
      console.log(response.data[0]);
    } catch (error) {
      console.error(error); // 顯示錯誤資訊
    }
    
}
  
  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<Layout searchText={searchText} setSearchText={setSearchText}
   setProductList={setProductList} setCurrentPage={setCurrentPage} setTotalPage={setTotalPage}
   pageable={pageable}  getCart={getCart} details={details} login={login} setLogin={setLogin}/> } >
      <Route index element={<Home />}/>
      <Route path="Grids" element={<Grids searchText={searchText} setProductList={setProductList}
       ProductList={ProductList} setCurrentPage={setCurrentPage} 
       CurrentPage={CurrentPage} TotalPage={TotalPage}
       getCart={getCart}/>}/>
      <Route path='Login' element={<Login setLogin={setLogin}  />}/>
      <Route path='Register' element={<Register />}/>
      <Route path='Checkout' element={<Checkout />}/>
      <Route path='Cart' element={<Cart />}/>
      <Route path="SellerOrder" element={<SellerOrder/>}/>
      <Route path='YourProducts' element={<YourProducts/>}/>
      <Route path='AddProduct' element={<AddProduct/>}/>
      <Route path='CantFindProduct' element={<CantFindProduct/>}/>
      <Route path='BuyerCenter' element={<BuyerCenter/>}/>
  </Route>


  


</Routes>
</BrowserRouter>
  );
}

export default App;
