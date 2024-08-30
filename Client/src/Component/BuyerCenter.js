import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const BuyerCenter = () => {
  const [searchOrder, setSearchOrder] = useState("");
  const [searchCart, setSearchCart] = useState("");

  const handleSearchOrderChange = (e) => setSearchOrder(e.target.value);
  const handleSearchCartChange = (e) => setSearchCart(e.target.value);
  
  // 假設有處理搜尋和其他操作的函數
  const searchOrderFunc = () => {
    console.log("Searching order:", searchOrder);
  };
  const searchCartFunc = () => {
    console.log("Searching cart:", searchCart);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-light sidebar d-flex flex-column align-items-center p-3">
          <h4 className="text-center mb-4">買家中心</h4>
          <ul className="list-unstyled w-100">
            <li className="mb-3 text-center">
              <a href="/Profile" className="text-decoration-none text-dark font-weight-bold">
                個人資訊
              </a>
            </li>
            <li className="mb-3 text-center">
              <a href="/MyOrders" className="text-decoration-none text-dark font-weight-bold">
                我的訂單
              </a>
            </li>
            <li className="mb-3 text-center">
              <a href="/ShoppingCart" className="text-decoration-none text-dark font-weight-bold">
                購物車
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="col-md-9">
          <div className="content-section">
            <h2 className="mb-4">我的訂單</h2>

            {/* Search Form for Orders */}
            <form className="mb-4">
              <div className="form-group d-flex align-items-center">
                <label htmlFor="orderSearch" className="mr-2">訂單編號：</label>
                <textarea
                  className="form-control mr-3"
                  id="orderSearch"
                  placeholder="搜尋訂單..."
                  style={{ width: '200px', height: '35px', resize: 'none' }}
                  value={searchOrder}
                  onChange={handleSearchOrderChange}
                ></textarea>
                <button type="button" className="btn btn-primary ml-3" onClick={searchOrderFunc}>
                  搜尋
                </button>
              </div>
            </form>

            {/* Display Orders */}
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>訂單編號</th>
                  <th>商品名稱</th>
                  <th>數量</th>
                  <th>總價</th>
                  <th>狀態</th>
                </tr>
              </thead>
              <tbody>
                {/* 範例訂單資料 */}
                <tr>
                  <td>1001</td>
                  <td>智慧型手機</td>
                  <td>1</td>
                  <td>NT$ 25,000</td>
                  <td>已出貨</td>
                </tr>
                <tr>
                  <td>1002</td>
                  <td>筆記型電腦</td>
                  <td>1</td>
                  <td>NT$ 50,000</td>
                  <td>運送中</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerCenter;
