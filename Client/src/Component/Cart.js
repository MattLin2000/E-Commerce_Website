import React, { useState } from 'react';

const Cart = () => {
  // 假設這裡有一些狀態來管理購物車項目
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Canon EOS M50 Mirrorless Camera',
      type: 'Mirrorless',
      color: 'Black',
      quantity: 1,
      price: 910.00,
      discount: 29.00,
      imageUrl: 'assets/images/cart/01.jpg'
    },
    {
      id: 2,
      name: 'Apple iPhone X 256 GB Space Gray',
      type: 'Memory',
      color: 'Space Gray',
      quantity: 1,
      price: 1100.00,
      discount: 0.00,
      imageUrl: 'assets/images/cart/02.jpg'
    },
    {
      id: 3,
      name: 'HP LaserJet Pro Laser Printer',
      type: 'Laser',
      color: 'White',
      quantity: 1,
      price: 550.00,
      discount: 0.00,
      imageUrl: 'assets/images/cart/03.jpg'
    }
  ]);

  // 計算總金額
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);
  const totalDiscount = cartItems.reduce((acc, item) => acc + item.discount, 0);
  const finalAmount = totalAmount - totalDiscount;

  return (
    <div className="shopping-cart section">
      <div className="container">
        <div className="cart-list-head">
          {/* Cart List Title */}
          <div className="cart-list-title">
            <div className="row">
              <div className="col-lg-1 col-md-1 col-12"></div>
              <div className="col-lg-4 col-md-3 col-12">
                <p>商品名稱</p>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>數量</p>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>總金額</p>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>折扣</p>
              </div>
              <div className="col-lg-1 col-md-2 col-12">
                <p>移除商品</p>
              </div>
            </div>
          </div>
          {/* End Cart List Title */}

          {/* Cart Single List list */}
          {cartItems.map(item => (
            <div className="cart-single-list" key={item.id}>
              <div className="row align-items-center">
                <div className="col-lg-1 col-md-1 col-12">
                  <a href="product-details.html">
                    <img src={item.imageUrl} alt={item.name} />
                  </a>
                </div>
                <div className="col-lg-4 col-md-3 col-12">
                  <h5 className="product-name">
                    <a href="product-details.html">{item.name}</a>
                  </h5>
                  <p className="product-des">
                    <span><em>Type:</em> {item.type}</span>
                    <span><em>Color:</em> {item.color}</span>
                  </p>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <div className="count-input">
                    <select className="form-control" value={item.quantity} onChange={(e) => {/* 更新數量的處理邏輯 */}}>
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <p>${item.discount.toFixed(2)}</p>
                </div>
                <div className="col-lg-1 col-md-2 col-12">
                  <a className="remove-item" href="javascript:void(0)" onClick={() => {/* 移除商品的處理邏輯 */}}>
                    <i className="lni lni-close"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
          {/* End Single List list */}
        </div>

        <div className="row">
          <div className="col-12">
            {/* Total Amount */}
            <div className="total-amount">
              <div className="row">
                <div className="col-lg-8 col-md-6 col-12">
                  <div className="left">
                    <div className="coupon">
                      <form action="#" target="_blank">
                        <input name="Coupon" placeholder="Enter Your Coupon" />
                        <div className="button">
                          <button className="btn">輸入優惠券</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="right">
                    <ul>
                      <li>購物車總金額<span>${totalAmount.toFixed(2)}</span></li>
                      <li>運費<span>Free</span></li>
                      <li>折扣金額<span>${totalDiscount.toFixed(2)}</span></li>
                      <li className="last">應付金額<span>${finalAmount.toFixed(2)}</span></li>
                    </ul>
                    <div className="button">
                      <a href="checkout.html" className="btn">結帳</a>
                      <a href="product-grids.html" className="btn btn-alt">繼續購物</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*/ End Total Amount */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
