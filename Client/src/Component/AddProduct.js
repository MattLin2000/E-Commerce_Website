import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productImage, setProductImage] = useState(null);//路徑
  const [productCategory,setProductCategory]=useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file); // 'file' 是上传到后端用來接收的参数名

    try {
        const response = await axios.post('http://localhost:8080/api/products/uploadImage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data);
        setProductImage(response.data);
    } catch (error) {
        console.error("圖片上傳失敗", error);
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
        name: productName,
        description: productDescription,
        price: productPrice,
        stock: productStock,
        image_url:productImage,
        categoryId:productCategory
    };

    try {
      await axios.post('http://localhost:8080/api/products/AddProduct', product);
      setAlert({ show: true, message: '商品已成功添加！', variant: 'success' });
    } catch (error) {
      setAlert({ show: true, message: '添加商品失敗！', variant: 'danger' });
    }
};


  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center my-4">新增商品</h2>
          {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
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
              <Form.Control
                as="textarea"
                rows={1}
                placeholder="1"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                required
              />
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


  );
};

export default AddProduct;
