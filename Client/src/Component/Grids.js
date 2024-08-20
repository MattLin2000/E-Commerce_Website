import React, { useState,useEffect } from 'react';
import '../css/bootstrap.min.css';
import '../css/LineIcons.3.0.css';
import '../css/tiny-slider.css';
import '../css/glightbox.min.css';
import '../css/main.css';
import axios from 'axios';
const InitialProducts = [
  {
    product_id: 1,
    category_id: 'Watches',
    name: 'Xiaomi Mi Band 5',
    image_url: '/images/products/product-1.jpg', 
    price: '199.00',
    rating: 4.0,
    discount: null, 
  },
  {
    product_id: 2,
    category_id: 'Speaker',
    name: 'Bluetooth Speaker',
    image_url: '/images/products/product-2.jpg', 
    price: '275.00',
    rating: 5.0,
    discount: 25,
  },
  {
    product_id: 3,
    category_id: 'Camera',
    name: 'WiFi Security Camera',
    image_url: '/images/products/product-3.jpg', 
    price: '399.00',
    rating: 5.0,
    discount: null,
  },
  {
    product_id: 4,
    category_id: 'Phones',
    name: 'iphone 6x plus',
    image_url: '/images/products/product-4.jpg', 
    price: '400.00',
    rating: 5.0,
    discount: null,
  },
  {
    product_id: 5,
    category_id: 'Headphones',
    name: 'Wireless Headphones',
    image_url: '/images/products/product-5.jpg', 
    price: '350.00',
    rating: 5.0,
    discount: null,
  },
  {
    product_id: 6,
    category_id: 'Speaker',
    name: 'Mini Bluetooth Speaker',
    image_url: '/images/products/product-6.jpg', 
    price: '70.00',
    rating: 4.0,
    discount: null,
  },
  {
    product_id: 7,
    category_id: 'Headphones',
    name: 'Wireless Headphones',
    image_url: '/images/products/product-7.jpg', 
    price: '100.00',
    rating: 4.0,
    discount: 50,
  },
  {
    product_id: 8,
    category_id: 'Laptop',
    name: 'Apple MacBook Air',
    image_url: '/images/products/product-8.jpg', 
    price: '899.00',
    rating: 5.0,
    discount: null,
  },
];





function Grids({ ProductList, setProductList, setCurrentPage, CurrentPage, searchText, TotalPage }) {
  const [products, setProducts] = useState(InitialProducts);
  const [sortOption, setSortOption] = useState('rating');
  const [searchPage,setSearchPage]=useState('0');

  // 分頁搜索切換頁面
  const searchNextPage = async (page) => {
    try {
      const response = await axios.get("http://localhost:8080/api/products/search", {
        params: { 
          keyword: searchText,
          page: searchPage,
          size: 9
        }
      });
      console.log(response.data);
      setCurrentPage(response.data.pageable.pageNumber);
      setProductList(response.data.content);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    searchNextPage(CurrentPage); // 每次 CurrentPage 改變時加載對應的頁面
  }, [CurrentPage]);




  useEffect(() => {
        // 如果需要其他排序方式的處理，可以在這裡添加
    if (sortOption === 'price-asc') {
      sortProductsByPriceAsc();
    } else if(
      sortOption =='price-desc'
    ){
      sortProductsByPriceDesc();
    }else if(sortOption=='rating'){
      sortProductsByRating();
    }
  
  }, [sortOption]);

useEffect(()=>{

if(ProductList&&ProductList.length>0){
  setProducts(ProductList);
}else{
  setProducts(InitialProducts);

}
},[ProductList])



const handlePageChange = (i)=>{
  setCurrentPage(i);
  setSearchPage(i)
}


  const sortProductsByPriceAsc = () => {
    const sortedProducts = [...products].sort((a, b) => {
      // 移除 $ 符號並轉換為數字
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return priceA - priceB;
    });
    setProducts(sortedProducts);
  };
    
  const sortProductsByPriceDesc = () => {
    const sortedProducts = [...products].sort((a, b) => {
      // 移除 $ 符號並轉換為數字
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
          <div className="col-lg-3 col-12">
            {/* Start Product Sidebar */}
            <div className="product-sidebar">
              {/* Start Single Widget */}
              <div className="single-widget search">
                <h3>搜尋商品</h3>
                <form action="#">
                  <input type="text" placeholder="Search Here..." />
                  <button type="submit">
                    <i className="lni lni-search-alt"></i>
                  </button>
                </form>
              </div>
              {/* End Single Widget */}

              {/* Start Single Widget */}
              <div className="single-widget">
                <h3>全站分類</h3>
                <ul className="list">
                  <li>
                    <a href="product-grids.html">電腦及週邊</a>
                    <span>(1138)</span>
                  </li>
                  <li>
                    <a href="product-grids.html">智慧型手機及週邊</a>
                    <span>(2356)</span>
                  </li>
                  <li>
                    <a href="product-grids.html">電視及周邊</a>
                    <span>(420)</span>
                  </li>
                  <li>
                    <a href="product-grids.html">照相機及攝影機</a>
                    <span>(874)</span>
                  </li>
                  <li>
                    <a href="product-grids.html">耳機</a>
                    <span>(1239)</span>
                  </li>
                  <li>
                    <a href="product-grids.html">音響</a>
                    <span>(340)</span>
                  </li>
                </ul>
              </div>
              {/* End Single Widget */}

              {/* Start Single Widget */}
              <div className="single-widget range">
                <h3>價格範圍</h3>
                <input
                  type="range"
                  className="form-range"
                  name="range"
                  step="1"
                  min="100"
                  max="10000"
                  defaultValue="10"
                />
                <div className="range-inner">
                  <label>$</label>
                  <input type="text" id="rangePrimary" placeholder="100" />
                </div>
              </div>
              {/* End Single Widget */}

              {/* Start Single Widget */}
              <div className="single-widget condition">
                <h3>價格過濾</h3>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault1"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault1">
                    $50 - $100L (208)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault2"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault2">
                    $100L - $500 (311)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault3"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault3">
                    $500 - $1,000 (485)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault4"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault4">
                    $1,000 - $5,000 (213)
                  </label>
                </div>
              </div>
              {/* End Single Widget */}

              {/* Start Single Widget */}
              <div className="single-widget condition">
                <h3>品牌過濾</h3>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault11"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault11">
                    Apple (254)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault22"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault22">
                    Bosh (39)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault33"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault33">
                    Canon Inc. (128)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault44"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault44">
                    Dell (310)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault55"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault55">
                    Hewlett-Packard (42)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault66"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault66">
                    Hitachi (217)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault77"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault77">
                    LG Electronics (310)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault88"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault88">
                    Panasonic (74)
                  </label>
                </div>
              </div>
              {/* End Single Widget */}
            </div>
            {/* End Product Sidebar */}
            </div>
            <div className="col-lg-9 col-12">
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
              {/* Start Single Product */}
              <div className="single-product">
                <div className="product-image">
                <img src={product.image_url} alt="Product Image" />


                  {product.discount && (
                    <span className="sale-tag">-{product.discount}%</span>
                  )}
                  <div className="button">
                    <a href="product-details.html" className="btn">
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
                          className={`lni lni-star${
                            index < Math.floor(product.rating) ? '-filled' : ''
                          }`}
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
                        {/* 假設有折扣價格 */}
                        {(product.price.slice(1)) * (1 + product.discount / 100)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* End Single Product */}
            </div>
          ))}
        </div>
      </div>
    </div>

{/* 分頁 */}
<div className="col-12">
      <div className="pagination left">
        <ul className="pagination-list">
          {Array.from({ length: TotalPage }, (_, i) => (
            <li key={i} className={CurrentPage === i  ? 'active' : ''}>
              <a href="javascript:void(0)" onClick={() => handlePageChange(i)}>
                {i + 1}
              </a>
            </li>
          ))}
            <li><a href="javascript:void(0)"><i className="lni lni-chevron-right"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
      </div>
    </div>
        </div>
    </div>
    </div>
  );
};

export default Grids;
