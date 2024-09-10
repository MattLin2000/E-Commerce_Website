package com.example.demo.model;




public class Amount {
    private Long total;
    public Long getTotal() {
        return total;
    }
    public void setTotal(Long total) {
        this.total = total;
    }
    public Long getTotalDiscount() {
        return totalDiscount;
    }
    public void setTotalDiscount(Long totalDiscount) {
        this.totalDiscount = totalDiscount;
    }
    public Long getFinalAmount() {
        return finalAmount;
    }
    public void setFinalAmount(Long finalAmount) {
        this.finalAmount = finalAmount;
    }
    private Long totalDiscount;
    private Long finalAmount;
}