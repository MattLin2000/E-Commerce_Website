import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productDiscount, setProductDiscount] = useState(""); // 折扣欄位
  const [productImage, setProductImage] = useState(null); // 路徑
  const [productCategory, setProductCategory] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file); // 'file' 是上传到后端用來接收的参数名

    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await axios.post(
        "http://localhost:8080/api/products/uploadImage",
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setProductImage(response.data);

      // 延遲 1 到 2 秒顯示提示訊息
      setTimeout(() => {
        setAlert({
          show: true,
          message: "圖片上傳成功！請點擊「新增商品」完成新增！",
          variant: "success",
        });
      }, 1000); // 1000 毫秒（1 秒）
    } catch (error) {
      console.error("圖片上傳失敗", error);
      setAlert({
        show: true,
        message: "上傳圖片錯誤，請聯繫開發者！",
        variant: "danger",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwtToken = localStorage.getItem("jwtToken");
    const product = {
      name: productName,
      description: productDescription,
      price: productPrice,
      stock: productStock,
      discount: productDiscount, // 折扣值
      image_url: productImage,
      categoryId: productCategory,
    };

    try {
      await axios.post(
        "http://localhost:8080/api/products/AddProduct",
        product,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setAlert({
        show: true,
        message: "商品已成功添加！",
        variant: "success",
      });
    } catch (error) {
      setAlert({ show: true, message: "添加商品失敗！", variant: "danger" });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-light sidebar d-flex flex-column align-items-center p-3">
          <h4 className="text-center mb-4">賣家中心</h4>
          <ul className="list-unstyled w-100">
            <li className="mb-3 text-center">
              <a
                href="/SellerOrder"
                className="text-decoration-none text-dark font-weight-bold"
              >
                訂單管理
              </a>
            </li>
            <li className="mb-3 text-center">
              <a
                href="/YourProducts"
                className="text-decoration-none text-dark font-weight-bold"
              >
                已上架商品
              </a>
            </li>
            <li className="mb-3 text-center">
              <a
                href="/AddProduct"
                className="text-decoration-none text-dark font-weight-bold"
              >
                新增商品
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="col-md-8">
          <Container>
            <Row className="justify-content-md-center">
              <Col md={12}>
                <h2 className="text-center my-4">新增商品</h2>
                {alert.show && (
                  <Alert variant={alert.variant}>{alert.message}</Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="productName">
                    <Form.Label>商品名稱</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="輸入商品名稱"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="productCategory">
                    <Form.Label>類型</Form.Label>
                    <Form.Select
                      aria-label="選擇產品類型"
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      required
                    >
                      <option value="">點擊選擇</option>
                      <option value="1">電腦及週邊</option>
                      <option value="2">智慧型手機及週邊</option>
                      <option value="3">電視及周邊</option>
                      <option value="4">照相機及攝影機</option>
                      <option value="5">耳機</option>
                      <option value="6">音響</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group controlId="productDescription">
                    <Form.Label>描述</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="輸入商品描述"
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="productPrice">
                    <Form.Label>價格</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="輸入商品價格"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="productDiscount">
                    <Form.Label>折扣 (%)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="輸入折扣百分比"
                      value={productDiscount}
                      onChange={(e) => setProductDiscount(e.target.value)}
                      min="0"
                      max="100"
                    />
                  </Form.Group>

                  <Form.Group controlId="productStock">
                    <Form.Label>庫存</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="輸入庫存數量"
                      value={productStock}
                      onChange={(e) => setProductStock(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="productImage">
                    <Form.Label>商品圖片</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleImageUpload}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="mt-3">
                    新增商品
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
