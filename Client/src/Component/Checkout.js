import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Checkout() {
 
    const navigate = useNavigate();
  //上一步
    const handleStepChange = () => {
    navigate("/Cart");
  };
  const [data ,setData] = useState();
  //計算總金額
  const getTotalAmount = async () => {
    try {
      const id = localStorage.getItem("userId"); // 取得使用者 ID
      const data={
        userId:id
      }
      const jwtToken = localStorage.getItem("jwtToken"); // 取得 JWT Token
  
      // 發送 POST 請求到後端
      const response = await axios.post(
        "http://localhost:8080/api/cart/getTotalAmount",
        data,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // 設置 Authorization 標頭
          },
        }
      );
  
      // 打印返回的數據
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error); // 更改為顯示具體的錯誤訊息
    }
  };
  

    useEffect(()=>{
    getTotalAmount()
    },[])


  return (
    <section className="checkout-wrapper section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="checkout-steps-form-style-1">
              <ul id="accordionExample">
                {/* 運送地址步驟 */}
                <h3>運送地址</h3>
                <li>
                  <section className={`checkout-steps-form-content`} id="collapseFour">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="single-form form-default">
                          <label>顧客姓名</label>
                          <div className="row">
                            <div className="col-md-6 form-input form">
                              <input type="text" placeholder="姓氏" />
                            </div>
                            <div className="col-md-6 form-input form">
                              <input type="text" placeholder="名字" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>Email</label>
                          <div className="form-input form">
                            <input type="text" placeholder="Email" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>聯絡電話</label>
                          <div className="form-input form">
                            <input type="text" placeholder="手機號碼" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="single-form form-default">
                          <label>居住地址</label>
                          <div className="form-input form">
                            <input type="text" placeholder="地址" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>國家</label>
                          <div className="form-input form">
                            <input type="text" placeholder="國家" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>郵遞區號</label>
                          <div className="form-input form">
                            <input type="text" placeholder="郵遞區號" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>城市</label>
                          <div className="select-items">
                            <select className="form-control">
                              <option value="0">select</option>
                              <option value="1">a市</option>
                              <option value="2">b市</option>
                              <option value="3">c市</option>
                              <option value="4">d市</option>
                              <option value="5">e市</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>地區</label>
                          <div className="select-items">
                            <select className="form-control">
                              <option value="0">select</option>
                              <option value="1">a區</option>
                              <option value="2">b區</option>
                              <option value="3">c區</option>
                              <option value="4">d區</option>
                              <option value="5">e區</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="checkout-payment-option">
                          <h6 className="heading-6 font-weight-400 payment-title">送貨選項</h6>
                          <div className="select-items">
                            <select className="form-control">
                              <option value="0">select</option>
                              <option value="1">7-11取貨</option>
                              <option value="2">全家取貨</option>
                              <option value="3">宅配</option>
                              <option value="4">蝦皮店到店</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="steps-form-btn button">
                          <button className="btn" onClick={handleStepChange}>
                            回上一步
                          </button>
                          <a href="javascript:void(0)" className="btn btn-alt">
                            儲存並繼續
                          </a>
                        </div>
                      </div>
                    </div>
                  </section>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="checkout-sidebar">
              <div className="checkout-sidebar-coupon">
                <p>輸入優惠券折扣碼</p>
                <form action="#">
                  <div className="single-form form-default">
                    <div className="form-input form">
                      <input type="text" placeholder="Coupon Code" />
                    </div>
                    <div className="button">
                      <button className="btn">輸入</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="checkout-sidebar-price-table mt-30">
                <h5 className="title">購買金額</h5>
                
                <div className="sub-total-price">
                  <div className="total-price">
                    <p className="value">商品金額:</p>
                    <p className="price">${data&&data.total}</p>
                  </div>
                  <div className="total-price shipping">
                    <p className="value">折扣金額:</p>
                    <p className="price">${data&&data.totalDiscount}</p>
                  </div>
                  <div className="total-price discount">
                    <p className="value">運費:</p>
                    <p className="price">$0.00</p>
                  </div>
                  
                </div>
                <div className="total-payable">
                  <div className="payable-price">
                    <p className="value">總金額:</p>
                    <p className="price">${data&&data.finalAmount}</p>
                  </div>
                </div>
                <div className="price-table-btn button">
                  <a href="javascript:void(0)" className="btn btn-alt">
                    結帳
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
