import React, { useState } from 'react';

function Checkout() {
  // 狀態管理
  const [activeStep, setActiveStep] = useState(1);

  // 處理步驟切換
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <section className="checkout-wrapper section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="checkout-steps-form-style-1">
              <ul id="accordionExample">
                {/* 顧客資訊步驟 */}
                <li>
                  <h6
                    className={`title ${activeStep === 1 ? 'collapsed' : ''}`}
                    onClick={() => handleStepChange(1)}
                  >
                    顧客資訊
                  </h6>
                  <section
                    className={`checkout-steps-form-content ${activeStep === 1 ? 'show' : 'collapse'}`}
                    id="collapseThree"
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div className="single-form form-default">
                          <label>顧客姓名</label>
                          <div className="row">
                            <div className="col-md-6 form-input form">
                              <input type="text" placeholder="姓氏" />
                            </div>
                            <div className="col-md-6 form-input form">
                              <input type="text" placeholder="名字" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>Email</label>
                          <div className="form-input form">
                            <input type="text" placeholder="Email" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>聯絡電話</label>
                          <div className="form-input form">
                            <input type="text" placeholder="手機號碼" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="single-form form-default">
                          <label>居住地址</label>
                          <div className="form-input form">
                            <input type="text" placeholder="地址" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>國家</label>
                          <div className="form-input form">
                            <input type="text" placeholder="國家" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>郵遞區號</label>
                          <div className="form-input form">
                            <input type="text" placeholder="郵遞區號" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>城市</label>
                          <div className="select-items">
                            <select className="form-control">
                              <option value="0">select</option>
                              <option value="1">a市</option>
                              <option value="2">b市</option>
                              <option value="3">c市</option>
                              <option value="4">d市</option>
                              <option value="5">e市</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>地區</label>
                          <div className="select-items">
                            <select className="form-control">
                              <option value="0">select</option>
                              <option value="1">a區</option>
                              <option value="2">b區</option>
                              <option value="3">c區</option>
                              <option value="4">d區</option>
                              <option value="5">e區</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="single-checkbox checkbox-style-3">
                          <input type="checkbox" id="checkbox-3" />
                          <label htmlFor="checkbox-3">
                            <span></span>
                          </label>
                          <p>我的運送地址及居住地址相同</p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="single-form button">
                          <button
                            className="btn"
                            onClick={() => handleStepChange(2)}
                          >
                            下一步
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                </li>
                {/* 運送地址步驟 */}
                <li>
                  <h6
                    className={`title ${activeStep === 2 ? 'collapsed' : ''}`}
                    onClick={() => handleStepChange(2)}
                  >
                    運送地址
                  </h6>
                  <section
                    className={`checkout-steps-form-content ${activeStep === 2 ? 'show' : 'collapse'}`}
                    id="collapseFour"
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div className="single-form form-default">
                          <label>顧客姓名</label>
                          <div className="row">
                            <div className="col-md-6 form-input form">
                              <input type="text" placeholder="姓氏" />
                            </div>
                            <div className="col-md-6 form-input form">
                              <input type="text" placeholder="名字" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>Email</label>
                          <div className="form-input form">
                            <input type="text" placeholder="Email" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>聯絡電話</label>
                          <div className="form-input form">
                            <input type="text" placeholder="手機號碼" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="single-form form-default">
                          <label>居住地址</label>
                          <div className="form-input form">
                            <input type="text" placeholder="地址" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>國家</label>
                          <div className="form-input form">
                            <input type="text" placeholder="國家" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>郵遞區號</label>
                          <div className="form-input form">
                            <input type="text" placeholder="郵遞區號" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>城市</label>
                          <div className="select-items">
                            <select className="form-control">
                              <option value="0">select</option>
                              <option value="1">a市</option>
                              <option value="2">b市</option>
                              <option value="3">c市</option>
                              <option value="4">d市</option>
                              <option value="5">e市</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-form form-default">
                          <label>地區</label>
                          <div className="select-items">
                            <select className="form-control">
                              <option value="0">select</option>
                              <option value="1">a區</option>
                              <option value="2">b區</option>
                              <option value="3">c區</option>
                              <option value="4">d區</option>
                              <option value="5">e區</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="checkout-payment-option">
                          <h6 className="heading-6 font-weight-400 payment-title">送貨選項</h6>
                          <div className="select-items">
                            <select className="form-control">
                              <option value="0">select</option>
                              <option value="1">7-11取貨</option>
                              <option value="2">全家取貨</option>
                              <option value="3">宅配</option>
                              <option value="4">蝦皮店到店</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="steps-form-btn button">
                          <button
                            className="btn"
                            onClick={() => handleStepChange(1)}
                          >
                            回上一步
                          </button>
                          <a href="javascript:void(0)" className="btn btn-alt">
                            儲存並繼續
                          </a>
                        </div>
                      </div>
                    </div>
                  </section>
                </li>
                {/* 付款資訊步驟 */}
                <li>
                  <h6
                    className={`title ${activeStep === 3 ? 'collapsed' : ''}`}
                    onClick={() => handleStepChange(3)}
                  >
                    付款資訊
                  </h6>
                  <section
                    className={`checkout-steps-form-content ${activeStep === 3 ? 'show' : 'collapse'}`}
                    id="collapsefive"
                  >
                    <div className="row">
                      <div className="col-12">
                        <div className="checkout-payment-form">
                          <div className="single-form form-default">
                            <label>持卡人姓名</label>
                            <div className="form-input form">
                              <input type="text" placeholder="Cardholder Name" />
                            </div>
                          </div>
                          <div className="single-form form-default">
                            <label>卡號</label>
                            <div className="form-input form">
                              <input
                                id="credit-input"
                                type="text"
                                placeholder="0000 0000 0000 0000"
                              />
                              <img src="assets/images/payment/card.png" alt="card" />
                            </div>
                          </div>
                          <div className="payment-card-info">
                            <div className="single-form form-default mm-yy">
                              <label>到期日期</label>
                              <div className="expiration d-flex">
                                <div className="form-input form">
                                  <input type="text" placeholder="MM" />
                                </div>
                                <div className="form-input form">
                                  <input type="text" placeholder="YYYY" />
                                </div>
                              </div>
                            </div>
                            <div className="single-form form-default">
                              <label>
                                安全碼
                                <span>
                                  <i className="mdi mdi-alert-circle"></i>
                                </span>
                              </label>
                              <div className="form-input form">
                                <input type="text" placeholder="***" />
                              </div>
                            </div>
                          </div>
                          <div className="single-form form-default button">
                            <button className="btn">付款</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="checkout-sidebar">
              <div className="checkout-sidebar-coupon">
                <p>輸入優惠券折扣碼</p>
                <form action="#">
                  <div className="single-form form-default">
                    <div className="form-input form">
                      <input type="text" placeholder="Coupon Code" />
                    </div>
                    <div className="button">
                      <button className="btn">輸入</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="checkout-sidebar-price-table mt-30">
                <h5 className="title">購買金額</h5>
                <div className="sub-total-price">
                  <div className="total-price">
                    <p className="value">商品金額:</p>
                    <p className="price">$144.00</p>
                  </div>
                  <div className="total-price shipping">
                    <p className="value">折扣金額:</p>
                    <p className="price">$10.50</p>
                  </div>
                  <div className="total-price discount">
                    <p className="value">運費:</p>
                    <p className="price">$10.00</p>
                  </div>
                </div>
                <div className="total-payable">
                  <div className="payable-price">
                    <p className="value">總金額:</p>
                    <p className="price">$164.50</p>
                  </div>
                </div>
                <div className="price-table-btn button">
                  <a href="javascript:void(0)" className="btn btn-alt">
                    結帳
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
