import React, { useEffect, useState } from "react";
import axios, { HttpStatusCode } from "axios";
import { Modal, Button } from "react-bootstrap"; // 使用 Bootstrap 的 Modal 元件
import { useNavigate } from "react-router-dom";

const BuyerCenter = () => {
  const [searchOrder, setSearchOrder] = useState("");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // 儲存選中的訂單詳細資料
  const [showModal, setShowModal] = useState(false); // 控制 Modal 的顯示狀態
  const navigate = useNavigate();
  const [TotalPage,setTotalPage]=useState();
  const [CurrentPage,setCurrentPage]=useState();
  
  const handlePageChange=async(i) =>{
    try {
      const id = localStorage.getItem("userId");
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await axios.get("http://localhost:8080/api/checkout/getOrders", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          userId: id,
          page: i,
          size: 10,
        },
      });
      console.log(response.data);
      setOrders(response.data.content); // 設置訂單列表
      setCurrentPage(response.data.pageable.pageNumber);  
    } catch (error) {
      // 檢查錯誤響應中的狀態碼
      if (error.response && error.response.status === 403) {
        alert("無此權限訪問此頁面");
        navigate("/Grids")
      } else {
        console.error("發生錯誤：", error); // 捕捉其他錯誤
      }}
  }
  const getOrders = async () => {
    try {
      const id = localStorage.getItem("userId");
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await axios.get("http://localhost:8080/api/checkout/getOrders", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          userId: id,
          page: 0,
          size: 10,
        },
      });
      console.log(response.data);
      setOrders(response.data.content); // 設置訂單列表
      setCurrentPage(response.data.pageable.pageNumber);
      setTotalPage(response.data.totalPages)
    } catch (error) {
      // 檢查錯誤響應中的狀態碼
      if (error.response && error.response.status === 403) {
        alert("無此權限訪問此頁面");
        navigate("/Grids")
      } else {
        console.error("發生錯誤：", error); // 捕捉其他錯誤
      }}}

  const handleOrderClick = async (order) => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await axios.get("http://localhost:8080/api/checkout/getOrderDetails", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          orderId: order.orderId
        }
      });
      setSelectedOrder(response.data); // 更新選中的訂單詳細資訊
      setShowModal(true);
    } catch (error) {
      console.error("Failed to fetch order details", error);
     
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

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
              <a href="/BuyerCenter" className="text-decoration-none text-dark font-weight-bold">
                購物清單
              </a>
            </li>
            <li className="mb-3 text-center">
              <a href="/Cart" className="text-decoration-none text-dark font-weight-bold">
                購物車
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="col-md-9">
          <div className="content-section">
            <h2 className="mb-4">已購買的商品</h2>

            {/* Search Form for Orders */}
            {/* <form className="mb-4">
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
                <button
                  type="button"
                  className="btn btn-primary ml-3"
                  onClick={() => console.log("Searching order:", searchOrder)}
                >
                  搜尋
                </button>
              </div>
            </form> */}

            {/* Display Orders */}
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>編號</th>
                  <th>訂單時間</th>
                  <th>總價</th>
                  <th>狀態</th>
                </tr>
              </thead>
              <tbody>
                {orders && orders.map((order) => (
                  <tr
                    key={order.orderId}
                    onClick={() => handleOrderClick(order)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{order.orderId}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>NT{order.totalAmount}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

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
            {/* <li><a href="javascript:void(0)"><i className="lni lni-chevron-right"></i></a></li> */}
          </ul>
        </div>
      </div>
          </div>
        </div>
      </div>

      {/* Modal for Order Details */}
      {selectedOrder && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>訂單詳情</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <p><strong>訂單編號:</strong> {selectedOrder[0].order.orderId}</p>
              <p><strong>訂單時間:</strong> {new Date(selectedOrder[0].order.createdAt).toLocaleString()}</p>
              <p><strong>總價:</strong> NT{selectedOrder[0].order.totalAmount}</p>
              <p><strong>狀態:</strong> {selectedOrder[0].order.status}</p>
            </div>
            <hr />
            <h5 className="mb-3">地址資訊</h5>
            <p><strong>地址:</strong> {selectedOrder[0].order.country} {selectedOrder[0].order.city} {selectedOrder[0].order.region} {selectedOrder[0].order.address}</p>
            <p><strong>郵遞區號:</strong> {selectedOrder[0].order.postalCode}</p>
            <p><strong>電話:</strong> {selectedOrder[0].order.phone}</p>
            <p><strong>客戶名稱:</strong> {selectedOrder[0].order.customerName}</p>
            <hr />
            <h5 className="mb-3">商品列表</h5>
            <ul className="list-unstyled">
              {selectedOrder && selectedOrder.map((item, index) => (
                <li key={index} className="d-flex align-items-center mb-2">
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '5px' }}
                  />
                  <div>
                    <p><strong>商品名稱:</strong> {item.product.name}</p>
                    <p><strong>價格:</strong> NT{item.product.price}</p>
                    <p><strong>數量:</strong> {item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              關閉
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default BuyerCenter;
