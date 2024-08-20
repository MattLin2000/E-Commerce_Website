import React, { useState } from 'react';

function Register() {
  // 使用 useState 來管理各個輸入框的狀態
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 表單提交處理函數
  const handleSubmit = (event) => {
    event.preventDefault(); // 阻止表單提交後頁面刷新
    // 在這裡可以進行註冊邏輯處理，例如發送 API 請求
    if (password !== confirmPassword) {
      alert('密碼與確認密碼不匹配');
      return;
    }
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Password:', password);
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
