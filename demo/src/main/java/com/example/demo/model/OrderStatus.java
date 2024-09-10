package com.example.demo.model;

public enum OrderStatus {
    pending,
    paid,
    shipped,
    completed,
    returned;

    private final String value;

    OrderStatus() {
        this.value = name();
    }

    public String getValue() {
        return value;
    }

    public static OrderStatus fromValue(String value) {
        if (value == null || value.isEmpty()) {
            throw new IllegalArgumentException("Status value cannot be null or empty");
        }

        try {
            return OrderStatus.valueOf(value.trim().toLowerCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Unknown status: " + value);
        }
    }
}
