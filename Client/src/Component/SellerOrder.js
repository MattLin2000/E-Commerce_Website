import React, { useEffect, useState } from 'react';
import '../css/bootstrap.min.css';
import '../css/main.css'; // 引入自定義樣式
import axios from 'axios'; // 引入 Axios 庫來處理 HTTP 請求




const SellerOrder = () => {
  const [orders, setOrders] = useState([]);
  

  const searchProduct = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products/search", {
        params: { 
          keyword: "", // 假設搜索關鍵字為 'a'
          page: 0, // 分頁的頁碼
          size: 10// 每頁顯示的商品數量
        }
      });
      console.log(response.data.content);
      setOrders(response.data.content);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    searchProduct();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-light sidebar d-flex flex-column align-items-center p-3">
          <h4 className="text-center mb-4">賣家中心</h4>
          <ul className="list-unstyled w-100">
            <li className="mb-3 text-center">
              <a href="/SellerOrder" className="text-decoration-none text-dark font-weight-bold">
                訂單管理
              </a>
            </li>
            <li className="mb-3 text-center">
              <a href="/YourProducts" className="text-decoration-none text-dark font-weight-bold">
                已上架商品
              </a>
            </li>
            <li className="mb-3 text-center">
              <a href="/AddProduct" className="text-decoration-none text-dark font-weight-bold">
              新增商品
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="col-md-9">
          {/* Order Management Section */}
          <div id="order-management" className="content-section">
            <h2 className="mb-4">訂單管理</h2>

            {/* Search Form */}
            <form className="mb-4">
    <div className="form-group d-flex align-items-center">
    <label htmlFor="productSearch" className="mr-2">商品名稱：</label>
    <textarea 
      className="form-control mr-3" 
      name="productSearch" 
      id="productSearch" 
      placeholder="搜尋商品..."
      style={{ width: '200px', height: '35px', resize: 'none' }}
    ></textarea> 

    <label htmlFor="SerachProductId" className="mr-2">訂單編號：</label>
    <textarea 
      className="form-control" 
      name="SerachProductId" 
      id="SerachProductId"
      placeholder="輸入訂單編號..."
      style={{ width: '200px', height: '35px', resize: 'none' }}
    ></textarea>
    
    <button type="submit" className="btn btn-primary ml-3">搜尋</button>
  </div>
</form>

            
            {/* Orders Display */}
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>訂單編號</th>
                  <th>商品名稱</th>
                  <th>數量</th>
                  <th>價格</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.product_id}>
                    <td>{order.product_id}</td>
                    <td>{order.name}</td>
                    <td>{order.stock}</td>
                    <td>{order.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOrder;
