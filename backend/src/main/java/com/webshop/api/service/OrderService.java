package com.webshop.api.service;

import com.webshop.api.dto.OrderDto;
import com.webshop.api.model.Order;
import com.webshop.api.model.OrderItem;
import com.webshop.api.model.User;
import com.webshop.api.repository.OrderRepository;
import com.webshop.api.repository.ProductRepository;
import com.webshop.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Transactional
    public Order createOrder(String userEmail, OrderDto orderDto) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setTotalAmount(orderDto.getTotalAmount());

        List<OrderItem> items = orderDto.getItems().stream().map(dto -> {
            var product = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            return OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(dto.getQuantity())
                    .priceAtTimeOfOrder(dto.getPriceAtTimeOfOrder())
                    .build();
        }).collect(Collectors.toList());

        order.setItems(items);
        Order savedOrder = orderRepository.save(order);

        // Send email confirmation
        try {
            emailService.sendOrderConfirmation(user.getEmail(), savedOrder.getId(),
                    savedOrder.getTotalAmount().toString());
        } catch (Exception e) {
            // Log the error but don't fail the order
            System.err.println("Failed to send order confirmation email: " + e.getMessage());
        }

        return savedOrder;
    }

    public List<Order> getUserOrders(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUserId(user.getId());
    }
}
