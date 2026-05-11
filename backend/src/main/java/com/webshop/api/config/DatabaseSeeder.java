package com.webshop.api.config;

import com.webshop.api.model.Product;
import com.webshop.api.model.Role;
import com.webshop.api.model.User;
import com.webshop.api.repository.ProductRepository;
import com.webshop.api.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DatabaseSeeder {

        @Bean
        CommandLineRunner initDatabase(ProductRepository productRepository, UserRepository userRepository,
                        org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
                return args -> {
                        if (productRepository.count() == 0) {
                                // Ik heb geprobeerd een mix te maken van verschillende PC-onderdelen en
                                // randapparatuur zodat de webshop er gevuld uitziet (minimaal 15 stuks).
                                productRepository.saveAll(List.of(
                                                Product.builder().name("Mechanical Keyboard XYZ")
                                                                .category("Peripherals")
                                                                .price(new BigDecimal("129.99"))
                                                                .description("RGB mechanical gaming keyboard.")
                                                                .imageUrl(
                                                                                "https://images-cdn.ubuy.qa/6937e71dfedbbb983000f8cc-magegee-portable-60-mechanical-gaming.jpg")
                                                                .build(),

                                                Product.builder().name("Gaming Mouse Pro").category("Peripherals")
                                                                .price(new BigDecimal("79.99"))
                                                                .description("High DPI precision gaming mouse.")
                                                                .imageUrl(
                                                                                "https://www.digidot.nl/data/articles/images/lightbox/big/logitech-g-pro-gaming-mouse-black_4253_3.jpg?h=4a5a83e5")
                                                                .build(),

                                                Product.builder().name("27-inch 144Hz Monitor").category("Monitors")
                                                                .price(new BigDecimal("299.99"))
                                                                .description("Crisp 144Hz gaming monitor.")
                                                                .imageUrl(
                                                                                "https://www.megekko.nl/productimg/946835/nw/1_LG-UltraGear-27GR93U-B-27-Ultra-HD-144Hz-IPS-monitor.jpg")
                                                                .build(),

                                                Product.builder().name("Gaming Headset 7.1").category("Audio")
                                                                .price(new BigDecimal("89.99"))
                                                                .description("Surround sound comfortable headset.")
                                                                .imageUrl(
                                                                                "https://m.media-amazon.com/images/I/81M0lAl1z6L._AC_UF894,1000_QL80_.jpg")
                                                                .build(),

                                                Product.builder().name("NVIDIA RTX 4070").category("Components")
                                                                .price(new BigDecimal("599.99"))
                                                                .description("High performance graphics card.")
                                                                .imageUrl("https://m.media-amazon.com/images/I/512T3hTT5ZL.jpg")
                                                                .build(),

                                                Product.builder().name("AMD Ryzen 7 7800X3D").category("Components")
                                                                .price(new BigDecimal("399.99"))
                                                                .description("Top tier gaming CPU.")
                                                                .imageUrl(
                                                                                "https://cf-images.dustin.eu/cdn-cgi/image/fit=contain,format=auto,quality=75,width=828,fit=contain/image/d2000010011187685/amd-ryzen-7-7800x3d-42ghz-am5-processor.jpeg")
                                                                .build(),

                                                Product.builder().name("32GB DDR5 RAM").category("Components")
                                                                .price(new BigDecimal("149.99"))
                                                                .description("Fast memory for gaming.")
                                                                .imageUrl("https://m.media-amazon.com/images/I/61D2DDpDITL.jpg")
                                                                .build(),

                                                Product.builder().name("2TB NVMe SSD").category("Storage")
                                                                .price(new BigDecimal("129.99"))
                                                                .description("Fast loading times for games.")
                                                                .imageUrl("https://image.coolblue.nl/max/700xauto/products/1819944")
                                                                .build(),

                                                Product.builder().name("Mid-Tower ATX Case").category("Components")
                                                                .price(new BigDecimal("99.99"))
                                                                .description("Great airflow chassis with tempered glass.")
                                                                .imageUrl(
                                                                                "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop")
                                                                .build(),

                                                Product.builder().name("850W Gold Power Supply").category("Components")
                                                                .price(new BigDecimal("119.99"))
                                                                .description("Reliable PSU for high-end builds.")
                                                                .imageUrl("https://m.media-amazon.com/images/I/71vHJrdANDL.jpg")
                                                                .build(),

                                                Product.builder().name("Ergonomic Gaming Chair").category("Furniture")
                                                                .price(new BigDecimal("249.99"))
                                                                .description("Comfortable chair with lumbar support for long sessions.")
                                                                .imageUrl("https://m.media-amazon.com/images/I/71k8tiIhTIL._AC_.jpg")
                                                                .build(),

                                                Product.builder().name("Streaming Microphone Pro").category("Audio")
                                                                .price(new BigDecimal("129.99"))
                                                                .description("Studio quality USB microphone for streaming and podcasting.")
                                                                .imageUrl("https://www.soundcreation.ro/admin/uploads/images/cms_products/module_35532/89630.jpg")
                                                                .build(),

                                                Product.builder().name("4K Ultra HD Webcam").category("Peripherals")
                                                                .price(new BigDecimal("199.99"))
                                                                .description("Crystal clear video for streaming and calls.")
                                                                .imageUrl("https://cdn.shopify.com/s/files/1/0064/7168/0115/products/Logitech_Brio_Ultra_HD_Pro_Webcam_2_1400x.jpg?v=1561389788")
                                                                .build(),

                                                Product.builder().name("RGB Mousepad XL").category("Peripherals")
                                                                .price(new BigDecimal("39.99"))
                                                                .description("Extended gaming mousepad with customizable RGB lighting.")
                                                                .imageUrl("https://m.media-amazon.com/images/I/61G3LSYHZ6L._AC_.jpg")
                                                                .build(),

                                                Product.builder().name("Wireless Pro Controller")
                                                                .category("Peripherals")
                                                                .price(new BigDecimal("69.99"))
                                                                .description("Low latency wireless gamepad with programmable buttons.")
                                                                .imageUrl("https://tse2.mm.bing.net/th/id/OIP.Q_bdiFi8lOmF3FTGWGIknAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3")
                                                                .build()));
                        }

                        if (userRepository.findByEmail("admin@admin.com").isEmpty()) {
                                userRepository.save(User.builder()
                                                .firstName("Admin")
                                                .lastName("User")
                                                .email("admin@admin.com")
                                                .password(passwordEncoder.encode("admin"))
                                                .role(Role.ADMIN)
                                                .build());
                        }
                };
        }
}