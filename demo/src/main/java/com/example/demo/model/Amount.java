package com.example.demo.model;

import org.springframework.stereotype.Component;

@Component
public class Amount {
    private Double total;
    private Double totalDiscount;
    private Double finalAmount;
    public Double getTotal() {
        return total;
    }
    public void setTotal(Double total) {
        this.total = total;
    }
    public Double getTotalDiscount() {
        return totalDiscount;
    }
    public void setTotalDiscount(Double totalDiscount) {
        this.totalDiscount = totalDiscount;
    }
    public Double getFinalAmount() {
        return finalAmount;
    }
    public void setFinalAmount(Double finalAmount) {
        this.finalAmount = finalAmount;
    }
}
