package com.example.demo.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.model.CartDetail;
import com.example.demo.model.Order;
import com.example.demo.model.OrderDetail;
import com.example.demo.model.OrderStatus;
import com.example.demo.model.Product;
import com.example.demo.repository.CartDetailRepository;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.OrderDetailRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;

import ecpay.payment.integration.AllInOne;
import ecpay.payment.integration.domain.AioCheckOutALL;
@Service
public class OrderService {
    
	@Autowired
	private CartRepository cartRepository;
	@Autowired
	private CartDetailRepository cartDetailRepository;
	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private OrderDetailRepository orderDetailRepository;

    public String ecpayCheckout(String orderId){
		
		//從資料庫獲得order
		 Order validateOrder= orderRepository.findByOrderId(orderId);
		 if (validateOrder == null) {
			throw new IllegalArgumentException("Order not found with ID: " + orderId);
		}
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
		String time = validateOrder.getCreatedAt().format(dtf);
		
        AllInOne all = new AllInOne("");
		AioCheckOutALL obj = new AioCheckOutALL();
		obj.setMerchantTradeNo(validateOrder.getOrderId());
		obj.setMerchantTradeDate(time);
		long totalAmount= Math.round(validateOrder.getTotalAmount());
		obj.setTotalAmount(Long.toString(totalAmount));
		obj.setTradeDesc("文大3C");
		obj.setItemName("文大電器行");
		obj.setReturnURL("http://localhost:8080");
		obj.setOrderResultURL("http://localhost:8080/api/checkout/ecpayReturn");
		obj.setNeedExtraPaidInfo("N");
		
		String form = all.aioCheckOut(obj, null);
		System.out.println(form);
		return form;
	}

	public  ResponseEntity<String> createOrder(Order formData) {
		System.out.println(formData.getUser().getUserId());
		//創建訂單編號
		String uuId = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 20);
		//獲得買家id
		// Integer userId = formData.getUser().getUserId();
		//創建訂單
		formData.setStatus(OrderStatus.fromValue("pending")); // 使用 enum 的常量
		formData.setOrderId(uuId);
		// 獲得該賣家的購物車
		List<CartDetail> cartDetails = cartDetailRepository.findAllByCart(cartRepository.findByUserId(formData.getUser().getUserId()));
		Double totalAmount = 0.00;
		Double totalDiscount = 0.00;
		//計算總金額
		for (CartDetail cd : cartDetails) {
			Product product =  productRepository.findByProductId(cd.getProduct().getProduct_id());
			totalAmount += product.getPrice()*cd.getQuantity();
			totalDiscount += (product.getDiscount()*0.01)
			*product.getPrice()
			*cd.getQuantity();
		}
		//設定總金額
		formData.setTotalAmount((Math.round(totalAmount-totalDiscount)));
		
		//設定時間
		formData.setCreatedAt(LocalDateTime.now());
		formData.setUpdatedAt(LocalDateTime.now());

		orderRepository.save(formData);

		//注入orderDetail 
		for (CartDetail cd : cartDetails) {
			OrderDetail orderDetail = new OrderDetail();
			orderDetail.setProduct((cd.getProduct()));
			orderDetail.setPrice(productRepository.findByProductId(cd.getProduct().getProduct_id()).getPrice());
			orderDetail.setQuantity(cd.getQuantity());
			orderDetail.setOrder(orderRepository.findByOrderId(uuId));
			orderDetailRepository.save(orderDetail);
			}
		
			//回傳orderId
			return ResponseEntity.status(HttpStatus.valueOf(200)).body(uuId);};

	public Page<Order> searchOrders(int userId,PageRequest pageable){
		
		return orderRepository.findAllByUser(userRepository.findByUserId(userId),pageable);
	}

	public List<OrderDetail> getOrderDetails(String orderId) {
		Order order = orderRepository.findByOrderId(orderId);
		return orderDetailRepository.findAllByOrder(order);
		}

	public Page<Order> getAllOrders(PageRequest pageable) {
		return orderRepository.findAll(pageable);
	}

}
