package com.webshop.api.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderDto {
    private BigDecimal totalAmount;
    private List<OrderItemDto> items;
}
