import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/bootstrap.min.css';
import '../css/LineIcons.3.0.css';
import '../css/tiny-slider.css';
import '../css/glightbox.min.css';
import '../css/main.css';
import logo from '../images/logo/logo.svg';
import axios from 'axios';


    
    function Nav({ setProductList ,setCurrentPage,setTotalPage,searchText,setSearchText}) {
     
      const navigate = useNavigate();
    //搜尋欄搜索
      const search = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/products/search"
            , 
            {
            params: { 
                keyword:searchText ,
                page:0,
                size:9
            }
          }
        );
        console.log(response.data);
        setCurrentPage(response.data.pageable.pageNumber)
        setTotalPage(response.data.totalPages)
        setProductList(response.data.content);
        navigate('Grids');
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
    

  
      const handleSearchClick = () => {
        search();
      };
    
      const handleSearchChange = (e) => {
        const value = e.target.value;
        console.log(value);
        setSearchText(value);
        
      };

      
    return(
      <div>
            {/* Start Header Area */}
            <header className="header navbar-area">
                {/* Start Topbar */}
                <div className="topbar">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-4 col-md-4 col-12">
                                <div className="top-left">
                                    <ul className="menu-top-link">
                                        <li>
                                            <div className="select-position">
                                                <select id="select4">
                                                    <option value="0" selected>$ USD</option>
                                                    <option value="1">€ EURO</option>
                                                    <option value="2">¥ JPY</option>
                                                    <option value="3">$ NTD</option>
                                                    <option value="4">¥ CNY</option>
                                                    <option value="5">₩ KRW</option>
                                                </select>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="select-position">
                                                <select id="select5">
                                                    <option value="0" selected>English</option>
                                                    <option value="1">French</option>
                                                    <option value="2">Japanese</option>
                                                    <option value="3">Traditional Chinese</option>
                                                    <option value="4">Simplified Chinese</option>
                                                    <option value="5">Korean</option>
                                                </select>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-12">
                                <div className="top-middle">
                                    <ul className="useful-links">
                                        <li><a href="/">首頁</a></li>
                                        <li><a href="about-us.html">關於我們</a></li>
                                        <li><a href="contact.html">聯絡我們</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-12">
                                <div className="top-end">
                                    <div className="user">
                                        <i className="lni lni-user"></i>
                                        Hello
                                    </div>
                                    <ul className="user-login">
                                        <li>
                                            <a href="/Login">登入</a>
                                        </li>
                                        <li>
                                            <a href="/Register">註冊</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Topbar */}
                {/* Start Header Middle */}
                <div className="header-middle">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-md-3 col-7">
                                {/* Start Header Logo */}
                                <a className="navbar-brand" href='index'>
                                    <img src={logo} alt="Logo1" />
                                </a>
                                {/* End Header Logo */}
                            </div>
                            <div className="col-lg-5 col-md-7 d-xs-none">
                                {/* Start Main Menu Search */}
                                <div className="main-menu-search">
                                    {/* navbar search start */}
                                    <div className="navbar-search search-style-5">
                                        <div className="search-select">
                                            <div className="select-position">
                                                <select id="select1">
                                                    <option selected>全部分類</option>
                                                    {/* <option value="1">價格[由低至高]</option>
                                                    <option value="2">價格[由高至低]</option>
                                                    <option value="3">最熱銷</option>
                                                    <option value="4">最多人收藏</option>
                                                    <option value="5">評價最高</option> */}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="search-input">
                                            <input type="text" placeholder="Search" value={searchText} onChange={handleSearchChange}/>
                                        </div>
                                        <div className="search-btn" >
                                            <button id="mySerachBtn" onClick={handleSearchClick}><a href="/Grids"></a><i className="lni lni-search-alt"></i></button>
                                        </div>
                                    </div>
                                    {/* navbar search Ends */}
                                </div>
                                {/* End Main Menu Search */}
                            </div>
                            <div className="col-lg-4 col-md-2 col-5">
                                <div className="middle-right-area">
                                    <div className="nav-hotline">
                                        <i className="lni lni-phone"></i>
                                        <h3>客服專線:
                                            <span>02-26778899</span>
                                        </h3>
                                    </div>
                                    <div className="navbar-cart">
                                        <div className="wishlist">
                                            <a href="javascript:void(0)">
                                                <i className="lni lni-heart"></i>
                                                {/* 這邊要設計收藏、購物車清單的js跟後端資料庫串接 */}
                                                <span className="total-items">0</span>
                                            </a>
                                        </div>
                                        <div className="cart-items">
                                            <a href="javascript:void(0)" className="main-btn">
                                                <i className="lni lni-cart"></i>
                                                <span className="total-items">2</span>
                                            </a>
                                            {/* Shopping Item */}
                                            <div className="shopping-item">
                                                <div className="dropdown-cart-header">
                                                    <span>2 Items</span>
                                                    <a href="/Cart">View Cart</a>
                                                </div>
                                                <ul className="shopping-list">
                                                    <li>
                                                        <a href="javascript:void(0)" className="remove" title="Remove this item"><i
                                                            className="lni lni-close"></i></a>
                                                        <div className="cart-img-head">
                                                            <a className="cart-img" href="product-details.html"><img
                                                                src="assets/images/header/cart-items/item1.jpg" alt="#" /></a>
                                                        </div>
                                                        <div className="content">
                                                            <h4><a href="product-details.html">
                                                                Apple Watch Series 6</a></h4>
                                                            <p className="quantity">1x - <span className="amount">$99.00</span></p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0)" className="remove" title="Remove this item"><i
                                                            className="lni lni-close"></i></a>
                                                        <div className="cart-img-head">
                                                            <a className="cart-img" href="product-details.html"><img
                                                                src="assets/images/header/cart-items/item2.jpg" alt="#" /></a>
                                                        </div>
                                                        <div className="content">
                                                            <h4><a href="product-details.html">Wi-Fi Smart Camera</a></h4>
                                                            <p className="quantity">1x - <span className="amount">$35.00</span></p>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <div className="bottom">
                                                    <div className="total">
                                                        <span>Total</span>
                                                        <span className="total-amount">$134.00</span>
                                                    </div>
                                                    <div className="button">
                                                        <a href="/Checkout" className="btn animate">Checkout</a>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End Shopping Item */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Header Middle */}
                {/* Start Header Bottom */}
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8 col-md-6 col-12">
                            <div className="nav-inner">
                                {/* Start Mega Category Menu */}
                                <div className="mega-category-menu">
                                    <span className="cat-button"><i className="lni lni-menu"></i>全站分類</span>
                                    <ul className="sub-category">
                                        <li><a href="product-grids.html">3C電子產品 <i className="lni lni-chevron-right"></i></a>
                                            <ul className="inner-sub-category">
                                                <li><a href="product-grids.html">數位相機</a></li>
                                                <li><a href="product-grids.html">攝影機</a></li>
                                                <li><a href="product-grids.html">無人機</a></li>
                                                <li><a href="product-grids.html">智慧型手錶</a></li>
                                                <li><a href="product-grids.html">耳機</a></li>
                                                <li><a href="product-grids.html">MP3 播放器</a></li>
                                                <li><a href="product-grids.html">麥克風</a></li>
                                                <li><a href="product-grids.html">充電器</a></li>
                                                <li><a href="product-grids.html">電池</a></li>
                                                <li><a href="product-grids.html">周邊商品</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="product-grids.html">電視</a></li>
                                        <li><a href="product-grids.html">冰箱</a></li>
                                        <li><a href="product-grids.html">冷氣</a></li>
                                        <li><a href="product-grids.html">洗衣機</a></li>
                                        <li><a href="product-grids.html">電子飯鍋</a></li>
                                        <li><a href="product-grids.html">空氣清淨機</a></li>
                                        <li><a href="product-grids.html">熱銷排行榜</a></li>
                                    </ul>
                                </div>
                                {/* End Mega Category Menu */}
                                {/* Start Navbar */}
                                <nav className="navbar navbar-expand-lg">
                                    <button className="navbar-toggler mobile-menu-btn" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="toggler-icon"></span>
                                        <span className="toggler-icon"></span>
                                        <span className="toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                                        <ul id="nav" className="navbar-nav ms-auto">
                                            <li className="nav-item">
                                                <a href="/" aria-label="Toggle navigation">首頁</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="dd-menu active collapsed" href="javascript:void(0)"
                                                    data-bs-toggle="collapse" data-bs-target="#submenu-1-2"
                                                    aria-controls="navbarSupportedContent" aria-expanded="false"
                                                    aria-label="Toggle navigation">顧客中心</a>
                                                <ul className="sub-menu collapse" id="submenu-1-2">
                                                    <li className="nav-item active"><a href="about-us.html">關於我們</a></li>
                                                    <li className="nav-item"><a href="faq.html">常見問題</a></li>
                                                    {/* 這邊可以考慮改成會員資料設定 */}
                                                    <li className="nav-item"><a href="login.html">登入</a></li>
                                                    <li className="nav-item"><a href="register.html">註冊</a></li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a className="dd-menu collapsed" href="javascript:void(0)" data-bs-toggle="collapse"
                                                    data-bs-target="#submenu-1-3" aria-controls="navbarSupportedContent"
                                                    aria-expanded="false" aria-label="Toggle navigation">商城</a>
                                                <ul className="sub-menu collapse" id="submenu-1-3">
                                                    <li className="nav-item"><a href="product-grids.html">商品一覽</a></li>
                                                    <li className="nav-item"><a href="cart.html">購物車</a></li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a className="dd-menu collapsed" href="javascript:void(0)" data-bs-toggle="collapse"
                                                    data-bs-target="#submenu-1-4" aria-controls="navbarSupportedContent"
                                                    aria-expanded="false" aria-label="Toggle navigation">顧客好評</a>
                                                <ul className="sub-menu collapse" id="submenu-1-4">
                                                    <li className="nav-item"><a href="blog-grid-sidebar.html">使用者心得</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a href="contact.html" aria-label="Toggle navigation">聯絡我們</a>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* navbar collapse */}
                                </nav>
                                {/* End Navbar */}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            {/* Start Nav Social */}
                            <div className="nav-social">
                                <h5 className="title">關注我們:</h5>
                                <ul>
                                    <li>
                                        <a href="javascript:void(0)"><i className="lni lni-facebook-filled"></i></a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)"><i className="lni lni-twitter-original"></i></a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)"><i className="lni lni-instagram"></i></a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)"><i className="lni lni-skype"></i></a>
                                    </li>
                                </ul>
                            </div>
                            {/* End Nav Social */}
                        </div>
                    </div>
                </div>
                {/* End Header Bottom */}
            </header>
            {/* End Header Area */}
        </div>
    )
}

export default Nav;