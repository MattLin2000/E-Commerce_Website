import React, { useEffect, useState } from 'react';
import '../css/bootstrap.min.css';
import '../css/LineIcons.3.0.css';
import '../css/tiny-slider.css';
import '../css/glightbox.min.css';
import '../css/main.css';
import axios from 'axios'; // 引入 Axios 庫來處理 HTTP 請求
import { Modal, Button, Form } from 'react-bootstrap'; // 引入 Bootstrap 的 Modal 和 Form 元件


const YourProducts = () => {

//目前搜索的產品
  const [products, setProducts] = useState([]);
  
  //edit modal
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  //delete modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //搜索內容
  const [searchName,setSearchName]=useState("");
  const [searchProductId,setSearchProductId]=useState(null);
  //分頁搜索
const [TotalPage,setTotalPage]=useState(1);
const [CurrentPage,setCurrentPage]=useState(0);
  //每次按下新的頁碼，傳送一次新的搜索
const handlePageChange = async(i)=>{
  try {
    const myData = {
        message: "searchRequest",
        data: {
            name: searchName, 
            productId: searchProductId,
            page: i,
            size: 10 
        }
    };

    const response = await axios.post("http://localhost:8080/api/products/SearchByNameAndId", myData);
    setCurrentPage(i)
    console.log(response.data);
    setProducts(response.data.content);
} catch (error) {
    console.error("Error fetching products:", error);
}
}



  const searchProduct = async () => {
    try {
        const myData = {
            message: "searchRequest",
            data: {
                name: searchName, 
                productId: searchProductId,
                page: 0, 
                size: 10 
            }
        };

        const response = await axios.post("http://localhost:8080/api/products/SearchByNameAndId", myData);
        setTotalPage(response.data.totalPages)
        setCurrentPage(response.data.pageable.pageNumber)
        console.log(response.data);
        setProducts(response.data.content);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

  
  useEffect(() => {
    searchProduct();
  }, []);

const handleSearchNameChange = (e) =>{
  setSearchName(e.target.value) ;
}
const handleSearchProductIdChange = (e) =>{
  setSearchProductId(e.target.value);
}


//點擊刪除按鈕
const handleDeleteClick = (product)=>{
    handleShow();
    setCurrentProduct(product);
}

//確認刪除
const handleDelete=async ()=>{
  try {
    await axios.delete("http://localhost:8080/api/products/deleteProduct", {
      params: { productId:currentProduct.product_id}});
  } catch (error) {
    console.error("Error saving product:", error);
  }
  setShow(false);
  searchProduct(); // 刷新商品列表
}


//編輯按鈕
  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };
//編輯按鈕視窗的儲存變更按鈕
  const handleSaveChanges = async () => {
    try {
      await axios.patch("http://localhost:8080/api/products/updateProduct", currentProduct);
      console.log(currentProduct)
      setShowModal(false);
      searchProduct(); // 刷新商品列表
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  //在修改產品內容時，接收變更的onchange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((product) => ({
      ...product,
      [name]: value,
    }));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-light sidebar d-flex flex-column align-items-center p-3">
          <h4 className="text-center mb-4">賣家中心</h4>
          <ul className="list-unstyled w-100">
            <li className="mb-3 text-center">
              <a href="/OrderManage" className="text-decoration-none text-dark font-weight-bold">
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
          {/* Show Products Section */}
          <div id="order-management" className="content-section">
            <h2 className="mb-4">已上架商品</h2>

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
                  value={searchName}
                  onChange={handleSearchNameChange}
                ></textarea> 

                <label htmlFor="SerachProductId" className="mr-2">訂單編號：</label>
                <textarea 
                  className="form-control" 
                  name="SerachProductId" 
                  id="SerachProductId"
                  placeholder="輸入訂單編號..."
                  style={{ width: '200px', height: '35px', resize: 'none' }}
                  value={searchProductId}
                  onChange={handleSearchProductIdChange}
                ></textarea>
                
                <button type="button"  className="btn btn-primary ml-3" onClick={searchProduct}>搜尋</button>
              </div>
            </form>

            {/* Products Display */}
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>訂單編號</th>
                  <th>商品名稱</th>
                  <th>數量</th>
                  <th>價格</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.product_id}>
                    <td>{product.product_id}</td>
                    <td>{product.name}</td>
                    <td>{product.stock}</td>
                    <td>{product.price}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-start align-items-center">
                        <Button variant="link" className="me-2" onClick={() => handleEditClick(product)}>編輯</Button>
                        <Button variant="link" className="me-2" onClick={() => handleDeleteClick(product)}>刪除</Button>
                      
                      </div>
                    </td>
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
            <li><a href="javascript:void(0)"><i className="lni lni-chevron-right"></i></a></li>
          </ul>
        </div>
      </div>
            
            </div>
        </div>
      </div>

                {/* Delete Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>確定要刪除此資料嗎？</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button variant="primary" onClick={handleDelete}>
           確認刪除
          </Button>
        </Modal.Footer>
      </Modal>
   
      {/* Edit Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>編輯商品資訊</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProduct && (
            <Form>
              <Form.Group controlId="formProductName">
                <Form.Label>商品名稱</Form.Label>
                <Form.Control 
                  type="text" 
                  name="name" 
                  value={currentProduct.name} 
                  onChange={handleChange} 
                />
              </Form.Group>
              <Form.Group controlId="formProductStock">
                <Form.Label>數量</Form.Label>
                <Form.Control 
                  type="number" 
                  name="stock" 
                  value={currentProduct.stock} 
                  onChange={handleChange} 
                />
              </Form.Group>
              <Form.Group controlId="formProductPrice">
                <Form.Label>價格</Form.Label>
                <Form.Control 
                  type="number" 
                  name="price" 
                  value={currentProduct.price} 
                  onChange={handleChange} 
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            關閉
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            儲存更改
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  );
};

export default YourProducts;
