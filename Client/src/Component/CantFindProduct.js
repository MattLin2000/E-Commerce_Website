import React from 'react';
import { useNavigate } from 'react-router-dom';

const CantFindProduct = () => {
  const navigate = useNavigate();

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

    <div className="error-area">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="error-content">
              <h3>抱歉，找不到您輸入的商品</h3>
              <p>您可以點擊下方回到首頁，或者使用在上方修改您的關鍵字進行搜尋</p>
              <div className="button">
                <button onClick={() => navigate('/')} className="btn">
                  返回首頁
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CantFindProduct;
