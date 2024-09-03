import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/bootstrap.min.css";
import "../css/LineIcons.3.0.css";
import "../css/tiny-slider.css";
import "../css/glightbox.min.css";
import "../css/main.css";
import logo from "../images/logo/logo.svg";
import axios from "axios";

function Nav({
  setLogin,
  login,
  setProductList,
  setCurrentPage,
  setTotalPage,
  searchText,
  setSearchText,
  pageable,
  getCart,
  details,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwtToken") != null) {
      setLogin(localStorage.getItem("username").toString());
    }
    getCart();
  }, []);

  const search = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products/search", {
        params: {
          keyword: searchText,
          page: 0,
          size: 9,
        },
      });
      setCurrentPage(response.data.pageable.pageNumber);
      setTotalPage(response.data.totalPages);
      setProductList(response.data.content);
      navigate("Grids");
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleRemoveItem = async (index, productId) => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      await axios.delete("http://localhost:8080/api/cart/deleteProduct", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          userId: 1,
          cartDetailId: details[index].cartDetailId,
          productId: productId,
        },
      });
      getCart();
    } catch (e) {
      console.error("Error removing item from cart:", e);
    }
  };

  const handleSearchClick = () => {
    search();
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleLogout = ()=>{
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    alert("您已登出！");
    navigate("/");
  }

  return (
    <div>
      {/* Start Header Area */}
      <header className="header navbar-area">
        {/* Start Topbar */}
        <div className="topbar">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-4 col-md-4 col-12">
                <div className="top-left">
                  <ul className="menu-top-link"></ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-12">
                <div className="top-middle">
                  <ul className="useful-links">
                    <li>
                      <a href="/">首頁</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-12">
                <div className="top-end">
                  <div className="user">
                    <i className="lni lni-user"></i> Hello
                  </div>
                  {localStorage.getItem("jwtToken") == null ? (
                    <ul className="user-login">
                      <li>
                        <a href="/Login">登入</a>
                      </li>
                      <li>
                        <a href="/Register">註冊</a>
                      </li>
                    </ul>
                  ) : (
                    <ul className="user-login">
                      <li>
                        <a >{login}</a>
                      </li>
                      <li>
                        <a href="/" onClick={handleLogout}>登出</a>
                      </li>
                    </ul>
                  )}
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
                <a className="navbar-brand" href="index">
                  <img src={logo} alt="Logo" />
                </a>
                {/* End Header Logo */}
              </div>
              <div className="col-lg-5 col-md-7 d-xs-none">
                {/* Start Main Menu Search */}
                <div className="main-menu-search">
                  <div className="navbar-search search-style-5">
                    <div className="search-select">
                      <div className="select-position">
                        <select id="select1">
                          <option selected>全部分類</option>
                        </select>
                      </div>
                    </div>
                    <div className="search-input">
                      <input
                        type="text"
                        placeholder="Search"
                        value={searchText}
                        onChange={handleSearchChange}
                      />
                    </div>
                    <div className="search-btn">
                      <button id="mySearchBtn" onClick={handleSearchClick}>
                        <i className="lni lni-search-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Main Menu Search */}
              </div>
              <div className="col-lg-4 col-md-2 col-5">
                <div className="middle-right-area">
                  <div className="nav-hotline">
                    <i className="lni lni-phone"></i>
                    <h3>
                      客服專線: <span>02-12345678</span>
                    </h3>
                  </div>
                  <div className="navbar-cart">
                    <div className="wishlist">
                      <a href="#">
                        <i className="lni lni-heart"></i>
                        <span className="total-items">0</span>
                      </a>
                    </div>
                    <div className="cart-items">
                      <a href="#" className="main-btn">
                        <i className="lni lni-cart"></i>
                        <span className="total-items">
                          {(pageable && pageable.totalElements)||0}
                        </span>
                      </a>
                      {/* Shopping Item */}
                      <div className="shopping-item">
                        <div className="dropdown-cart-header">
                          <span>
                            總共有 {pageable && pageable.totalElements} 件商品～
                            {pageable && pageable.totalElements > 5 ? (
                              <>
                                <br />
                                還有 {pageable.totalElements - 5} 件商品未顯示～
                              </>
                            ) : null}
                          </span>
                          <a href="/Cart">View Cart</a>
                        </div>
                        <ul className="shopping-list">
                          {pageable &&
                            pageable.content.map((product, index) => (
                              <li key={product.product_id}>
                                <a
                                  href="#"
                                  className="remove"
                                  title="Remove this item"
                                  onClick={() =>
                                    handleRemoveItem(index, product.product_id)
                                  }
                                >
                                  <i className="lni lni-close"></i>
                                </a>
                                <div className="cart-img-head">
                                  <a className="cart-img" href="product-details.html">
                                    <img src={product.image_url} alt="#" />
                                  </a>
                                </div>
                                <div className="content">
                                  <h4>
                                    <a href="product-details.html">{product.name}</a>
                                  </h4>
                                  <span className="amount">${product.price}</span>
                                </div>
                              </li>
                            ))}
                        </ul>
                        <div className="bottom">
                          <div className="button">
                            <a href="/Checkout" className="btn animate">
                              Checkout
                            </a>
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
            <div className="col-lg-12 col-md-12 col-12">
              <div className="nav-inner">
                {/* Start Mega Category Menu */}
                <div className="mega-category-menu">
                  <span className="cat-button">
                    <i className="lni lni-menu"></i> 全部分類
                  </span>
                  <ul className="sub-category">
                    <li>
                      <a href="/Grids" value="1">電子產品</a>
                    </li>
                  </ul>
                </div>
                {/* End Mega Category Menu */}
                {/* Start Navbar */}
                <nav className="navbar navbar-expand-lg">
                  <button
                    className="navbar-toggler mobile-menu-btn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <i className="lni lni-menu"></i>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
  <ul className="navbar-nav ms-auto">
    <li className="nav-item">
      <a className="nav-link active" href="/">
        Home
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/BuyerCenter">
        顧客中心
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/YourProducts">
        賣家中心
      </a>
    </li>
  </ul>
</div>

                  </div>
                </nav>
                {/* End Navbar */}
              </div>
            </div>
          </div>
        </div>
        {/* End Header Bottom */}
      </header>
      {/* End Header Area */}
    </div>
  );
}

export default Nav;
