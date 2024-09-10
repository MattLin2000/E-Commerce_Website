import React, { useState, useEffect } from 'react';
import '../css/bootstrap.min.css';
import '../css/LineIcons.3.0.css';
import '../css/tiny-slider.css';
import '../css/glightbox.min.css';
import '../css/main.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Grids({ ProductList, setProductList, setCurrentPage, CurrentPage, searchText, TotalPage, getCart }) {
  const [products, setProducts] = useState(ProductList);
  const [sortOption, setSortOption] = useState('rating');
  const [searchPage, setSearchPage] = useState('0');
  const navigate = useNavigate();

  // 分頁搜索切換頁面
  const searchNextPage = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products/search", {
        params: {
          keyword: searchText,
          page: searchPage,
          size: 9
        }
      });
      setCurrentPage(response.data.pageable.pageNumber);
      setProductList(response.data.content);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    searchNextPage(CurrentPage);
  }, [CurrentPage]);

  useEffect(() => {
    if (sortOption === 'price-asc') {
      sortProductsByPriceAsc();
    } else if (sortOption === 'price-desc') {
      sortProductsByPriceDesc();
    } else if (sortOption === 'rating') {
      sortProductsByRating();
    }
  }, [sortOption]);

  useEffect(() => {
    if (ProductList && ProductList.length > 0) {
      setProducts(ProductList);
    } else {
      navigate("/CantFindProduct");
    }
  }, [ProductList]);

  const handlePageChange = (i) => {
    setCurrentPage(i);
    setSearchPage(i);
  };

  const sortProductsByPriceAsc = () => {
    const sortedProducts = [...products].sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return priceA - priceB;
    });
    setProducts(sortedProducts);
  };

  const sortProductsByPriceDesc = () => {
    const sortedProducts = [...products].sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return priceB - priceA;
    });
    setProducts(sortedProducts);
  };

  const sortProductsByRating = () => {
    const sortedProducts = [...products].sort((a, b) => {
      return b.rating - a.rating;
    });
    setProducts(sortedProducts);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleAddToCart = async (product_id) => {
    try {
      const id = localStorage.getItem("userId");
      const jwtToken = localStorage.getItem("jwtToken");
      const addToCart = {
        cart: { cartId: id },
        product: {product_id:product_id},
        quantity: 1
      };

      const response = await axios.post("http://localhost:8080/api/cart/add", addToCart, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      });
      alert("商品添加至購物車成功！");
      getCart();
    } catch (e) {
      console.error();
    }
  };

  return (
    <div>
      <div className="breadcrumbs">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="breadcrumbs-content">
                <h1 className="page-title">商品一覽</h1>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <ul className="breadcrumb-nav">
                <li>
                  <a href="/">
                    <i className="lni lni-home"></i> 首頁
                  </a>
                </li>
                <li>
                  <a href="/ProductGrids">商城</a>
                </li>
                <li>商品一覽</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="product-grids section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12">
              <div className="product-grids-head">
                <div className="product-grid-topbar">
                  <div className="row align-items-center">
                    <div className="col-lg-7 col-md-8 col-12">
                      <div className="product-sorting">
                        <label htmlFor="sorting">排序:</label>
                        <select
                          className="form-control"
                          id="sorting"
                          value={sortOption}
                          onChange={handleSortChange}
                        >
                          <option value="price-asc">低 - 高 價格</option>
                          <option value="price-desc">高 - 低 價格</option>
                          <option value="rating">綜合評價</option>
                        </select>
                        <h3 className="total-show-product">顯示數量: <span>1 - 12 個項目</span></h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-grid"
                    role="tabpanel"
                    aria-labelledby="nav-grid-tab"
                  >
                    <div className="row">
                      {products.map((product) => (
                        <div className="col-lg-4 col-md-6 col-12" key={product.product_id}>
                          <div className="single-product">
                            <div className="product-image">
                              <img
                                src={product.image_url}
                                alt="Product Image"
                                className="product-image-size"
                              />
                              {product.discount && (
                                <span className="sale-tag">-{product.discount}%</span>
                              )}
                              <div className="button">
                                <a className="btn" onClick={() => handleAddToCart(product.product_id)}>
                                  <i className="lni lni-cart"></i> 加到購物車
                                </a>
                              </div>
                            </div>
                            <div className="product-info">
                              <span className="category">{product.category_id}</span>
                              <h4 className="title">
                                <a href="product-details.html">{product.name}</a>
                              </h4>
                              <ul className="review">
                                {Array.from({ length: 5 }, (_, index) => (
                                  <li key={index}>
                                    <i
                                      className={`lni lni-star${index < Math.floor(product.rating) ? '-filled' : ''}`}
                                    ></i>
                                  </li>
                                ))}
                                <li>
                                  <span>{product.rating} Review(s)</span>
                                </li>
                              </ul>
                              <div className="price">
                                ${product.price || product.discount && (
                                  <span className="discount-price">
                                    {(parseFloat(product.price)) * (1 - product.discount / 100)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 分頁 */}
                <div className="col-12">
                  <div className="pagination-container">
                    <div className="pagination left">
                      <ul className="pagination-list">
                        {Array.from({ length: TotalPage }, (_, i) => (
                          <li key={i} className={CurrentPage === i ? 'active' : ''}>
                            <a href="javascript:void(0)" onClick={() => handlePageChange(i)}>
                              {i + 1}
                            </a>
                          </li>
                        ))}
                        <li>
                          <a href="javascript:void(0)">
                            <i className="lni lni-chevron-right"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 確保頁碼始終在頁面底部 */}
      <style>
        {`
          .pagination-container {
            display: flex;
            justify-content: center;
            margin-top: 20px;
          }
          .pagination-list {
            display: flex;
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .pagination-list li {
            margin: 0 5px;
          }
          .pagination-list a {
            display: block;
            padding: 10px 15px;
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            color: #007bff;
            text-decoration: none;
            border-radius: 4px;
          }
          .pagination-list li.active a {
            background: #007bff;
            color: #fff;
          }
          .product-image {
            position: relative;
            width: 100%;
            height: 250px;
            overflow: hidden;
          }
          .product-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}
      </style>
    </div>
  );
};

export default Grids;
