import React from 'react';
import sliderBg1 from '../images/hero/slider-bg1.jpg';
import sliderBnr from '../images/hero/slider-bnr.jpg';
import brand01 from '../images/brands/01.png';
import brand02 from '../images/brands/02.png';
import brand03 from '../images/brands/03.png';
import brand04 from '../images/brands/04.png';
import brand05 from '../images/brands/05.png';
import brand06 from '../images/brands/06.png';
import '../css/bootstrap.min.css';
import '../css/LineIcons.3.0.css';
import '../css/tiny-slider.css';
import '../css/glightbox.min.css';
import '../css/main.css';

 const Home = () => {
  return (
    <div>
      {/* <!-- Start Hero Area --> */}
      <section className="hero-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12 custom-padding-right">
              <div className="slider-head">
                {/* <!-- Start Hero Slider --> */}
                <div className="hero-slider">
                  {/* <!-- Start Single Slider --> */}
                  <div
                    className="single-slider"
                    style={{
                      backgroundImage: `url(${sliderBg1})`,
                    }}
                  >
                    <div className="content">
                      <h2>
                        <span>運動手錶</span>
                        M75型號 手錶
                      </h2>
                      <p>我是一個運動手錶，快來買我A _ A</p>
                      <h3>
                        <span>特價</span> $320.99
                      </h3>
                      <div className="button">
                        <a href="product-grids.html" className="btn">
                          馬上購買
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Single Slider --> */}
               
                </div>
                {/* <!-- End Hero Slider --> */}
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="row">
                <div className="col-lg-12 col-md-6 col-12 md-custom-padding">
                  {/* <!-- Start Small Banner --> */}
                  <div
                    className="hero-small-banner"
                    style={{
                      backgroundImage: `url(${sliderBnr})`,
                    }}
                  >
                    <div className="content">
                      <h2>
                        <span>最新上市</span>
                        iPhone 18 Pro Max
                      </h2>
                      <h3>$259.99</h3>
                    </div>
                  </div>
                  {/* <!-- End Small Banner --> */}
                </div>
                <div className="col-lg-12 col-md-6 col-12">
                  {/* <!-- Start Small Banner --> */}
                  <div className="hero-small-banner style2">
                    <div className="content">
                      <h2>特賣商品推薦!</h2>
                      <p>6折起好物現正供應中！</p>
                      <div className="button">
                        <a className="btn" href="product-grids.html">
                          馬上購買
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Start Small Banner --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Hero Area --> */}

      {/* <!-- Start Brands Area --> */}
      <div className="brands">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-12 col-12">
              <h2 className="title">最受歡迎品牌</h2>
            </div>
          </div>
          <div className="brands-logo-wrapper">
            <div className="brands-logo-carousel d-flex align-items-center justify-content-between">
              <div className="brand-logo">
                <img src={brand01} alt="#" />
              </div>
              <div className="brand-logo">
                <img src={brand02} alt="#" />
              </div>
              <div className="brand-logo">
                <img src={brand03} alt="#" />
              </div>
              <div className="brand-logo">
                <img src={brand04} alt="#" />
              </div>
              <div className="brand-logo">
                <img src={brand05} alt="#" />
              </div>
              <div className="brand-logo">
                <img src={brand06} alt="#" />
              </div>
              <div className="brand-logo">
                <img src={brand03} alt="#" />
              </div>
              <div className="brand-logo">
                <img src={brand04} alt="#" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Brands Area --> */}

      {/* <!-- Start Shipping Info --> */}
      <section className="shipping-info">
        <div className="container">
          <ul>
            {/* Free Shipping */}
            <li>
              <div className="media-icon">
                <i className="lni lni-delivery"></i>
              </div>
              <div className="media-body">
                <h5>免運</h5>
                <span>消費滿199元免費運送</span>
              </div>
            </li>
            {/* Money Return */}
            <li>
              <div className="media-icon">
                <i className="lni lni-support"></i>
              </div>
              <div className="media-body">
                <h5>全天候專人在線服務</h5>
                <span>請撥打專線：02-26778899</span>
              </div>
            </li>
            {/* Support 24/7 */}
            <li>
              <div className="media-icon">
                <i className="lni lni-credit-cards"></i>
              </div>
              <div className="media-body">
                <h5>線上付款</h5>
                <span>安全線上付費</span>
              </div>
            </li>
            {/* Safe Payment */}
            <li>
              <div className="media-icon">
                <i className="lni lni-reload"></i>
              </div>
              <div className="media-body">
                <h5>退貨機制</h5>
                <span>7天內可免費退換貨</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
      {/* <!-- End Shipping Info --> */}
    </div>
  );
};
export default Home;