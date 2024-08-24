import axios from 'axios';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {
    // 使用 useState 來管理表單的各個輸入值的狀態
    const [email, setEmail] = useState(''); // 管理信箱輸入框的狀態
    const [password, setPassword] = useState(''); // 管理密碼輸入框的狀態
    const [rememberMe, setRememberMe] = useState(false); // 管理 "記住我" 選項的狀態
  const navigate =useNavigate();
    // 表單提交時的處理函數
    const handleSubmit = async (event) => {
      event.preventDefault(); // 阻止表單提交後瀏覽器刷新頁面
      const User = {email:email,
                    password:password};
      // 在這裡可以進行登錄邏輯處理，例如發送 API 請求
      try{
          const response = await  axios.post("http://localhost:8080/register/email_login",User);
         console.log(response.data);
         if(response.data=="Login successful"){
        alert("登入成功，關閉窗口後自動跳轉至首頁")
          navigate("/");
         }
      }catch(error){
        console.error("登入錯誤");
      };
    };
  

  return (
    <div>
      {/* <!-- Start Account Login Area --> */}
      <div className="account-login section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">
              <form className="card login-form" onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="title">
                    <h3>馬上登入</h3>
                    <p>你可以連結帳號登入</p>
                  </div>
                  <div className="social-login">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-12">
                        <a className="btn facebook-btn" href="javascript:void(0)">
                          <i className="lni lni-facebook-filled"></i> Facebook login
                        </a>
                      </div>
                      <div className="col-lg-4 col-md-4 col-12">
                        <a className="btn twitter-btn" href="javascript:void(0)">
                          <i className="lni lni-twitter-original"></i> Twitter login
                        </a>
                      </div>
                      <div className="col-lg-4 col-md-4 col-12">
                        <a className="btn google-btn" href="http://localhost:8080/login/google">
                          <i className="lni lni-google"></i> Google login
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="alt-option">
                    <span>或是</span>
                  </div>
                  <div className="form-group input-group">
                    <label htmlFor="reg-email">信箱</label>
                    <input
                      className="form-control"
                      type="email"
                      id="reg-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group input-group">
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
                  <div className="d-flex flex-wrap justify-content-between bottom-content">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input width-auto"
                        id="exampleCheck1"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="exampleCheck1">記住我</label>
                    </div>
                    <a className="lost-pass" href="account-password-recovery.html">忘記密碼?</a>
                  </div>
                  <div className="button">
                    <button className="btn" type="submit">登入</button>
                  </div>
                  <p className="outer-link">還沒有帳號? <a href="register.html">馬上註冊</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Account Login Area --> */}
    </div>
  );
}

export default Login;
