import React, { useEffect,useState } from 'react';
import axios from 'axios';
const Cart = () => {
      // 購物車內容
      const [cartItems, setCartItems] = useState([]);
      //cartProductDetails，獲得購物車內產品的數量資訊等
      const [details,setDetails]=useState();
      //總原價格
      const [totalAmount,setTotalAmount]=useState(0);
      //折扣
      const [totalDiscount,setTotalDiscount]=useState(0);
      //最終價格
      const [finalAmount,setFinalAmount]=useState(0);
      //計算邏輯
      useEffect(() => {
        // 當 cartItems 或 details 改變時重新計算
        if (cartItems.length > 0 && details.length > 0) {
          //狀態雖然默認為0，但若直接修改State的默認內容，會觸發Attempted to assign to readonly property
          //所以需要再宣告一次，避免這個直接去修改state的默認值。！！！
          let totalAmount=0;
          let totalDiscount=0;
          cartItems.forEach((item, index) => {
            const quantity = details[index].quantity;
            const originalPrice = item.price * quantity;
            const discount = originalPrice * (item.discount * 0.01);
            
            totalAmount += originalPrice;
            totalDiscount += discount;
          });
      
          setTotalAmount(totalAmount);
          setTotalDiscount(totalDiscount);
          setFinalAmount(totalAmount - totalDiscount);
        }else{
          setTotalAmount(0);
          setTotalDiscount(0);
          setFinalAmount(0);
        }
      }, [cartItems, details]);
      
      
        //進入頁面後自動執行獲得購物車內容
      useEffect(()=>{
      getCart()
      },[]);

   //購物車搜索,返回Page物件和product_details
   const getCart = async ()=>{
    try{
      const jwtToken = localStorage.getItem("jwtToken");
    const response =  await axios.get("http://localhost:8080/api/cart/getAll",{
      headers:{
        Authorization: `Bearer ${jwtToken}`,
    },
            params:
            {
                id:1}//根據id修改，目前假設為1
        });
    const data0 = Array.from(response.data[0]);
    const data1=Array.from(response.data[1])
    setCartItems(data0);
    setDetails(data1);   
    console.log(response.data);
    }catch(error){
        console.error();
    }
};

//更新購物車商品數量
const handleUpdateQuantity = async (e, index) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
      const response = await axios.patch("http://localhost:8080/api/cart/updateQuantity", null,{
        headers:{
            Authorization: `Bearer ${jwtToken}`,
        }
        ,params:
        {
          quantity: e.target.value,
          product_id: cartItems[index].product_id,
          cartDetailId: details[index].cartDetailId,
          userId: 1, // 這裡傳遞了 userId
      }});
      console.log('Response:', response.data);
      getCart();
  } catch (error) {
      console.error('Error updating quantity:', error);
  }
};

const handleRemoveItem = async(index,productId)=>{
try{
  const jwtToken = localStorage.getItem("jwtToken");
  const response = await axios.delete("http://localhost:8080/api/cart/deleteProduct",{headers:{
      Authorization: `Bearer ${jwtToken}`
  },params:{
    userId:1,//預設為1
   cartDetailId: details[index].cartDetailId,
   productId:productId
  }});
 console.log(response.data);
 getCart();
}catch(e){
  console.error();
}
};


  return (
    <div className="shopping-cart section">
      <div className="container">
        <div className="cart-list-head">
          {/* Cart List Title */}
          <div className="cart-list-title">
            <div className="row">
              <div className="col-lg-1 col-md-1 col-12"></div>
              <div className="col-lg-4 col-md-3 col-12">
                <p>商品名稱</p>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>數量</p>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>原價格</p>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>折扣</p>
              </div>
              <div className="col-lg-1 col-md-2 col-12">
                <p>移除商品</p>
              </div>
            </div>
          </div>
          {/* End Cart List Title */}

          {/* Cart Single List list */}
          {cartItems&&cartItems.map((item,index) => (
            <div className="cart-single-list" key={item.product_id}>
              <div className="row align-items-center">
                <div className="col-lg-1 col-md-1 col-12">
                  <a href="product-details.html">
                    <img src={item.image_url} alt={item.name} />
                  </a>
                </div>
                <div className="col-lg-4 col-md-3 col-12">
                  <h5 className="product-name">
                    <a href="product-details.html">{item.name}</a>
                  </h5>
                  <p className="product-des">
                    <span><em>Type:</em> {item.categoryId}</span>
                    {/* <span><em>Color:</em> {item.color}</span> */}
                  </p>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <div className="count-input">
                    <select className="form-control" value={details[index].quantity}  onChange={(e) => {handleUpdateQuantity(e,index)}}>
                      {Array.from({length:item.stock},(_,num)=>num+1).map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <p>${(item.price*details[index].quantity).toFixed(2)}</p>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <p>${((item.price*details[index].quantity)*(item.discount*0.01)).toFixed(2)}</p>
                </div>
                <div className="col-lg-1 col-md-2 col-12">
                  <a className="remove-item" href="javascript:void(0)" onClick={()=>handleRemoveItem(index,item.product_id)}>
                    <i className="lni lni-close"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
          {/* End Single List list */}
        </div>

        <div className="row">
          <div className="col-12">
            {/* Total Amount */}
            <div className="total-amount">
              <div className="row">
                <div className="col-lg-8 col-md-6 col-12">
                  <div className="left">
                    <div className="coupon">
                      <form action="#" target="_blank">
                        <input name="Coupon" placeholder="Enter Your Coupon" />
                        <div className="button">
                          <button className="btn">輸入優惠券</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="right">
                    <ul>
                      <li>購物車總金額<span>${totalAmount.toFixed(2)}</span></li>
                      <li>運費<span>Free</span></li>
                      <li>折扣金額<span>${totalDiscount.toFixed(2)}</span></li>
                      <li className="last">應付金額<span>${finalAmount.toFixed(2)}</span></li>
                    </ul>
                    <div className="button">
                      <a href="checkout.html" className="btn">結帳</a>
                      <a href="product-grids.html" className="btn btn-alt">繼續購物</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*/ End Total Amount */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
