import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { HttpStatusCode } from 'axios';

// 台灣城市和對應的區域
const citiesWithRegions = {
  "台北市": ["中正區", "大同區", "中山區", "松山區", "大安區", "萬華區", "信義區", "士林區", "北投區", "內湖區", "南港區", "文山區"],
  "新北市": ["板橋區", "三峽區", "三芝區", "三溫區", "中和區", "永和區", "新莊區", "淡水區", "汐止區", "樹林區", "鶯歌區", "土城區", "新店區", "瑞芳區", "貢寮區"],
  "桃園市": ["桃園區", "中壢區", "平鎮區", "八德區", "楊梅區", "蘆竹區", "大溪區", "大園區", "龜山區", "龍潭區"],
  "台中市": ["中區", "東區", "南區", "西區", "北區", "西屯區", "南屯區", "北屯區", "大里區", "大甲區", "清水區", "梧棲區", "后里區", "霧峰區", "大肚區", "沙鹿區", "東勢區", "和平區"],
  "台南市": ["中西區", "東區", "南區", "北區", "安平區", "安南區", "永康區", "歸仁區", "關廟區", "龍崎區", "南化區", "官田區", "麻豆區", "佳里區", "學甲區", "七股區", "將軍區", "大內區", "大灣區"],
  "高雄市": ["新興區", "前金區", "苓雅區", "鹽埕區", "鼓山區", "旗津區", "前鎮區", "三民區", "五福區", "左營區", "鳳山區", "大寮區", "大樹區", "大社區", "仁武區", "橋頭區", "梓官區", "美濃區", "六龜區", "杉林區", "內門區", "岡山區"],
  // 可以根據需要繼續添加其他城市及其區域
};

function Checkout({ setEcpayHTML }) {
  const navigate = useNavigate();

  // 表單狀態
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    country: '台灣', // 目前只支持本地
    postalCode: '',
    city: '',
    region: '',
    user: {
      userId: ''
    } 
  });

  const [orderId,setOrderId]=useState();

  // 將 id 傳入 formData
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setFormData((prev) => ({
        ...prev,
        user: { ...prev.user, userId: id },
      }));
    } else {
      alert("請重新登入");
      navigate("/login");
    }
  }, []);

  // 城市和區域選項
  const [cities, setCities] = useState(Object.keys(citiesWithRegions));
  const [regions, setRegions] = useState([]);

  // 計算總金額
  const [data, setData] = useState();

  const getTotalAmount = async () => {
    try {
      const id = localStorage.getItem("userId"); // 取得使用者 ID
      const requestData = { userId: id };
      const jwtToken = localStorage.getItem("jwtToken"); // 取得 JWT Token

      // 發送 POST 請求到後端
      const response = await axios.post(
        "http://localhost:8080/api/cart/getTotalAmount",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // 設置 Authorization 標頭
          },
        }
      );
      
      // 打印返回的金額數據
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error); // 更改為顯示具體的錯誤訊息
      
    }
  };

  useEffect(() => {
    getTotalAmount();
  }, []);

  // 處理表單輸入變更
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'city') {
      setRegions(citiesWithRegions[value] || []);
      setFormData((prev) => ({
        ...prev,
        region: '', // 清除選擇的區域
      }));
    }
    setSaveDisabled(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 防止頁面重載
    try {
      const jwtToken = localStorage.getItem("jwtToken"); // 取得 JWT Token
      const response = await axios.post(
        "http://localhost:8080/api/checkout/ecpayCheckout",
        null,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // 設置 Authorization 標頭
          },
          params: {
            orderId: orderId, // 使用 params 傳送 orderId
          },
        }
      );
  
      // 處理提交結果
      console.log(response.data);
      setEcpayHTML(response.data);
      navigate("/EcpayPage");
    } catch (error) {
      console.error(error); // 顯示具體的錯誤訊息
    }
  };
  
  
  // 創建訂單按鈕 (儲存)
  const handleCreateOrderSubmit = async (e) => {
    e.preventDefault();
    // 檢查所有必填欄位是否已填寫
  if (
    !formData.customerName ||
    !formData.email ||
    !formData.phone ||
    !formData.address ||
    !formData.postalCode ||
    !formData.city ||
    !formData.region
  ) {
    alert("請確保所有欄位都已填寫！");
    return;
  }
    // 創建訂單
    try {
      const jwtToken = localStorage.getItem("jwtToken"); // 取得 JWT Token
      const response = await axios.post(
        "http://localhost:8080/api/checkout/createOrder", // 假設的後端 API 路徑
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // 設置 Authorization 標頭
          },
        }
      );

    
      // 可以進行重定向或顯示成功訊息
      if (response.status === 200) {
        alert("創建訂單成功！點擊右側結帳按鈕前往綠界支付！");
        setSaveDisabled(true); // 禁用按鈕
        setOrderId(response.data)
      } else {
        alert("創建訂單失敗，請再試一次！");
      }
      
    } catch (error) {
      console.error(error); // 顯示具體的錯誤訊息
    }
  }

  const [SaveDisabled, setSaveDisabled] = useState(false);

  return (
    <section className="checkout-wrapper section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="checkout-steps-form-style-1">
              <ul id="accordionExample">
                <h3>運送地址</h3>
                <li>
                  <section
                    className={`checkout-steps-form-content`}
                    id="collapseFour"
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div className="single-form form-default">
                          <label>顧客姓名</label>
                          <div className="form-input form">
                            <input
                              type="text"
                              placeholder="全名"
                              name="customerName"
                              value={formData.customerName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>Email</label>
                          <div className="form-input form">
                            <input
                              type="email"
                              placeholder="Email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>聯絡電話</label>
                          <div className="form-input form">
                            <input
                              type="tel"
                              placeholder="手機號碼"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="single-form form-default">
                          <label>居住地址</label>
                          <div className="form-input form">
                            <input
                              type="text"
                              placeholder="地址"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>國家</label>
                          <div className="form-input form">
                            <input
                              type="text"
                              placeholder="國家"
                              name="country"
                              value={formData.country}
                              readOnly // 設為只讀
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>郵遞區號</label>
                          <div className="form-input form">
                            <input
                              type="text"
                              placeholder="郵遞區號"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>城市</label>
                          <div className="select-items">
                            <select
                              className="form-control"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">選擇城市</option>
                              {cities.map((city) => (
                                <option key={city} value={city}>
                                  {city}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>地區</label>
                          <div className="select-items">
                            <select
                              className="form-control"
                              name="region"
                              value={formData.region}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">選擇地區</option>
                              {regions.map((region) => (
                                <option key={region} value={region}>
                                  {region}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="steps-form-btn button">
                          <button className="btn" onClick={() => navigate("/Cart")}>
                            回上一步
                          </button>
                          <button
                            className="btn btn-alt"
                            onClick={handleCreateOrderSubmit}
                            disabled={SaveDisabled}
                          >
                            儲存
                          </button>
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
              {/* <div className="checkout-sidebar-coupon">
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
              </div> */}
              <div className="checkout-sidebar-price-table mt-30">
                <h5 className="title">購買金額</h5>

                <div className="sub-total-price">
                  <div className="total-price">
                    <p className="value">商品金額:</p>
                    <p className="price">${data && data.total}</p>
                  </div>
                  <div className="total-price shipping">
                    <p className="value">折扣金額:</p>
                    <p className="price">${data && data.totalDiscount}</p>
                  </div>
                  <div className="total-price discount">
                    <p className="value">運費:</p>
                    <p className="price">$0.00</p>
                  </div>
                </div>
                <div className="total-payable">
                  <div className="payable-price">
                    <p className="value">總計:</p>
                    <p className="price">${data && data.finalAmount}</p>
                  </div>
                </div>
                {/* 將繼續按鈕移到總金額下面 */}
                <div className="button mt-4">
                  <button className="btn btn-alt" onClick={handleSubmit}>
                    綠界結帳
                  </button>
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
