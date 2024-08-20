import React from 'react';
import whiteLogo from '/Users/linchengxin33/myCode/Client/src/images/logo/white-logo.svg';
import creditCardsFooter from '/Users/linchengxin33/myCode/Client/src/images/footer/credit-cards-footer.png';
import '../css/bootstrap.min.css';
import '../css/LineIcons.3.0.css';
import '../css/tiny-slider.css';
import '../css/glightbox.min.css';
import '../css/main.css';
export const Footer = () => {
  return (
    <footer className="footer">
      {/* Start Footer Top */}
      <div className="footer-top">
        <div className="container">
          <div className="inner-content">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-12">
                <div className="footer-logo">
                  <a href="index.html">
                    <img src={whiteLogo} alt="#" />
                  </a>
                </div>
              </div>
              <div className="col-lg-9 col-md-8 col-12">
                <div className="footer-newsletter">
                  <h4 className="title">
                    訂閱最新消息
                    <span>獲得我們商品特價的最新消息</span>
                  </h4>
                  <div className="newsletter-form-head">
                    <form action="#" method="get" target="_blank" className="newsletter-form">
                      <input name="EMAIL" placeholder="Email address here..." type="email" />
                      <div className="button">
                        <button className="btn">訂閱<span className="dir-part"></span></button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Footer Top */}

      {/* Start Footer Middle */}
      <div className="footer-middle">
        <div className="container">
          <div className="bottom-inner">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer f-contact">
                  <h3>聯繫我們</h3>
                  <p className="phone">Phone:+886 91234567</p>
                  <ul>
                    <li><span>星期一至星期五: </span> 9.00 am - 8.00 pm</li>
                    <li><span>星期六、日: </span> 10.00 am - 6.00 pm</li>
                  </ul>
                  <p className="mail">
                    <a href="mailto:support@shopgrids.com">support@shopgrids.com</a>
                  </p>
                </div>
                {/* End Single Widget */}
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer our-app">
                  <h3>下載我們的App</h3>
                  <ul className="app-btn">
                    <li>
                      <a href="javascript:void(0)">
                        <i className="lni lni-apple"></i>
                        <span className="small-title">下載連結</span>
                        <span className="big-title">App Store</span>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">
                        <i className="lni lni-play-store"></i>
                        <span className="small-title">下載連結</span>
                        <span className="big-title">Google Play</span>
                      </a>
                    </li>
                  </ul>
                </div>
                {/* End Single Widget */}
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer f-link">
                  <h3>資訊</h3>
                  <ul>
                    <li><a href="about-us.html">關於我們</a></li>
                    <li><a href="contact.html">聯繫我們</a></li>
                    <li><a href="javascript:void(0)">服務據點</a></li>
                    <li><a href="faq.html">常見問題</a></li>
                  </ul>
                </div>
                {/* End Single Widget */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Footer Middle */}

      {/* Start Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="inner-content">
            <div className="row align-items-center">
              <div className="col-lg-4 col-12">
                <div className="payment-gateway">
                  <span>可支援的支付:</span>
                  <img src={creditCardsFooter} alt="#" />
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <ul className="socila">
                  <li><span>關注我們:</span></li>
                  <li><a href="javascript:void(0)"><i className="lni lni-facebook-filled"></i></a></li>
                  <li><a href="javascript:void(0)"><i className="lni lni-twitter-original"></i></a></li>
                  <li><a href="javascript:void(0)"><i className="lni lni-instagram"></i></a></li>
                  <li><a href="javascript:void(0)"><i className="lni lni-google"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Footer Bottom */}
    </footer>
  );
};
