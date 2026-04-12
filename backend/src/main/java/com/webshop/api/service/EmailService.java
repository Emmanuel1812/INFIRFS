package com.webshop.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender emailSender;

    public void sendOrderConfirmation(String to, Long orderId, String totalAmount) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("webshop-noreply@example.com");
            message.setTo(to);
            message.setSubject("Order Confirmation - #" + orderId);
            message.setText("Thank you for your order!\n\nOrder ID: " + orderId + "\nTotal Amount: $" + totalAmount
                    + "\n\nYour items will be shipped soon.");
            emailSender.send(message);
        } catch (Exception e) {
            // Rethrow or handle based on strategy. Here we let OrderService catch it.
            throw e;
        }
    }
}
