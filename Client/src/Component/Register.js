import React, { useState } from 'react';
import axios from 'axios';
function Register() {
  // 使用 useState 來管理各個輸入框的狀態
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 表單提交處理函數
  const handleSubmit = async (event) => {
    event.preventDefault(); // 阻止表單提交後頁面刷新

    if (password !== confirmPassword) {
      alert('密碼與確認密碼不匹配');
      return;
    }

    // 準備要發送到後端的資料
    const User = {
      username:firstName+lastName,
      email:email,
      tel:phone,
      password:password
    };

    try {
      // 使用 Axios 發送 POST 請求到後端 API
      const response = await axios.post("http://localhost:8080/register/add", User);
      alert(response.data); // 顯示伺服器返回的訊息
    } catch (error) {
      console.error('註冊過程中發生錯誤:', error);
      alert('註冊失敗，請稍後再試。');
    }
  };


  return (
    <div>
      {/* <!-- 開始帳號註冊區域 --> */}
      <div className="account-login section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">
              <div className="register-form">
                <div className="title">
                  <h3>沒有帳號嗎？馬上註冊</h3>
                  <p>註冊只需花幾分鐘，就可以讓您購買所有您需要的商品！</p>
                </div>
                {/* 表單元素 */}
                <form className="row" onSubmit={handleSubmit}>
                  {/* 姓氏輸入框 */}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="reg-fn">姓氏</label>
                      <input
                        className="form-control"
                        type="text"
                        id="reg-fn"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  {/* 名字輸入框 */}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="reg-ln">名字</label>
                      <input
                        className="form-control"
                        type="text"
                        id="reg-ln"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  {/* E-mail 輸入框 */}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="reg-email">E-mail</label>
                      <input
                        className="form-control"
                        type="email"
                        id="reg-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  {/* 手機號碼輸入框 */}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="reg-phone">手機號碼</label>
                      <input
                        className="form-control"
                        type="text"
                        id="reg-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  {/* 密碼輸入框 */}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="reg-pass">密碼</label>
                      <input
                        className="form-control"
                        type="password"
                        id="reg-pass"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  {/* 確認密碼輸入框 */}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="reg-pass-confirm">確認密碼</label>
                      <input
                        className="form-control"
                        type="password"
                        id="reg-pass-confirm"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  {/* 註冊按鈕 */}
                  <div className="button">
                    <button className="btn" type="submit">註冊</button>
                  </div>
                  {/* 轉至登入頁面連結 */}
                  <p className="outer-link">已經有帳號了嗎? <a href="login.html">馬上登入</a></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- 結束帳號註冊區域 --> */}
    </div>
  );
}

export default Register;
