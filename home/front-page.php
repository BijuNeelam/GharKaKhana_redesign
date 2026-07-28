<?php
/**
 * Front Page Template
 * This template is used for the front page when a static page is set as the front page
 */

get_header(); ?>

<main id="main" class="site-main front-page">
    <!-- Hero Section -->
    <section class="hero-section" id="home">
        <div class="container">
            <div class="hero-content">
                <div class="hero-left">
                    <!-- Special Offer Card -->
                    <div class="special-offer">
                        <div class="offer-label">✨ SPECIAL LAUNCH OFFER</div>
                        <div class="offer-title">Your First Meal for just</div>
                        <div class="offer-price">₹<?php echo esc_html(get_theme_mod('offer_price', '69')); ?>!</div>
                        <div class="offer-subtitle">One-time offer for the first week only</div>
                    </div>

                    <!-- Main Headline -->
                    <h1 class="main-headline">
                        Guaranteed Taste, Quality, Authentic & 
                        <span class="highlight-text">Hygienic Homely Meals</span>
                    </h1>

                    <!-- Free Delivery Info -->
                    <div class="delivery-info">
                        <div class="delivery-icon">🚚</div>
                        <div class="delivery-text">
                            <h3>FREE Home Delivery</h3>
                            <p>Free delivery available within <?php echo esc_html(get_theme_mod('delivery_areas', 'CBD Belapur Sectors 11-15, 19-23, and 29-31')); ?></p>
                        </div>
                    </div>

                    <!-- CTA Buttons -->
                    <div class="cta-buttons">
                        <a href="tel:<?php echo esc_attr(str_replace(' ', '', get_theme_mod('phone_number', '8108325444'))); ?>" class="btn-primary">Order Now - ₹<?php echo esc_html(get_theme_mod('offer_price', '69')); ?></a>
                        <a href="#menu" class="btn-secondary">View Full Menu</a>
                    </div>

                    <!-- Trust Indicators -->
                    <div class="trust-indicators">
                        <div class="trust-item">
                            <span class="trust-icon">⭐</span>
                            <span>4.8/5 Rating</span>
                        </div>
                        <div class="trust-item">
                            <span class="trust-icon">🛡️</span>
                            <span>100% Hygienic</span>
                        </div>
                        <div class="trust-item">
                            <span class="trust-icon">📞</span>
                            <span><?php echo esc_html(get_theme_mod('phone_number', '8108 325 444')); ?></span>
                        </div>
                    </div>
                </div>

                <div class="hero-right">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/food.png" alt="Delicious Homemade Thali" class="food-image">
                    <div class="fresh-badge">Fresh Daily!</div>
                    <div class="delivery-card">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/delivery.png" alt="Delivery Person" class="delivery-avatar">
                        <div class="delivery-info-card">
                            <h4>Friendly Delivery</h4>
                            <p>To your doorstep</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Choose Section -->
    <section class="why-choose-section" id="about">
        <div class="container">
            <h2 class="section-title">Why Choose Neelam's Ghar-Ka-Khana?</h2>
            
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">🏠</div>
                    <h3>Homemade Quality</h3>
                    <p>Every meal is prepared with love in our home kitchen, just like your mother would make it.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">🌿</div>
                    <h3>Fresh Ingredients</h3>
                    <p>We source the freshest ingredients daily to ensure the highest quality and taste in every meal.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">🛡️</div>
                    <h3>100% Hygienic</h3>
                    <p>Maintaining the highest standards of cleanliness and hygiene in our kitchen and delivery process.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">🚚</div>
                    <h3>Fast Delivery</h3>
                    <p>Quick and reliable delivery service to bring hot, fresh meals right to your doorstep.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">💰</div>
                    <h3>Affordable Prices</h3>
                    <p>Delicious homemade meals at prices that won't break your budget. Quality food for everyone.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">❤️</div>
                    <h3>Made with Love</h3>
                    <p>Each meal is prepared with care and attention, bringing the warmth of home to your table.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Menu Section -->
    <section class="menu-section" id="menu" style="padding: 80px 0; background: #f8f9fa;">
        <div class="container">
            <h2 class="section-title">Our Menu</h2>
            <div class="menu-content">
                <p style="text-align: center; font-size: 1.2rem; color: #666; margin-bottom: 2rem;">
                    Discover our variety of authentic homemade meals, prepared fresh daily with traditional recipes.
                </p>
                
                <div class="menu-highlights" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin: 3rem 0;">
                    <div class="menu-item" style="background: white; padding: 2rem; border-radius: 15px; text-align: center; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <h3 style="color: #e67e22; margin-bottom: 1rem;">🍛 Complete Thali</h3>
                        <p>Rice, Dal, Sabzi, Roti, Pickle & Sweet</p>
                        <div style="font-size: 1.5rem; font-weight: bold; color: #2c3e50; margin-top: 1rem;">₹<?php echo esc_html(get_theme_mod('offer_price', '69')); ?></div>
                    </div>
                    
                    <div class="menu-item" style="background: white; padding: 2rem; border-radius: 15px; text-align: center; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <h3 style="color: #e67e22; margin-bottom: 1rem;">🥘 Special Curry</h3>
                        <p>Chef's special curry with rice or roti</p>
                        <div style="font-size: 1.5rem; font-weight: bold; color: #2c3e50; margin-top: 1rem;">₹89</div>
                    </div>
                    
                    <div class="menu-item" style="background: white; padding: 2rem; border-radius: 15px; text-align: center; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <h3 style="color: #e67e22; margin-bottom: 1rem;">🍜 Comfort Meal</h3>
                        <p>Khichdi, Kadhi, Pickle & Papad</p>
                        <div style="font-size: 1.5rem; font-weight: bold; color: #2c3e50; margin-top: 1rem;">₹59</div>
                    </div>
                </div>
                
                <div style="text-align: center;">
                    <a href="tel:<?php echo esc_attr(str_replace(' ', '', get_theme_mod('phone_number', '8108325444'))); ?>" class="btn-primary">Call to Order Full Menu</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section" id="contact" style="padding: 80px 0; background: white;">
        <div class="container">
            <h2 class="section-title">Contact Us</h2>
            <div class="contact-content" style="text-align: center; max-width: 800px; margin: 0 auto;">
                <p style="font-size: 1.2rem; margin-bottom: 3rem; color: #666;">
                    Ready to taste authentic homemade food? Get in touch with us to place your order!
                </p>
                
                <div class="contact-info" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin: 3rem 0;">
                    <div class="contact-item" style="background: #f8f9fa; padding: 2rem; border-radius: 15px;">
                        <h3 style="color: #e67e22; margin-bottom: 1rem;">📞 Phone</h3>
                        <p style="font-size: 1.1rem;"><a href="tel:<?php echo esc_attr(str_replace(' ', '', get_theme_mod('phone_number', '8108325444'))); ?>" style="color: #333; text-decoration: none; font-weight: 600;"><?php echo esc_html(get_theme_mod('phone_number', '8108 325 444')); ?></a></p>
                    </div>
                    
                    <div class="contact-item" style="background: #f8f9fa; padding: 2rem; border-radius: 15px;">
                        <h3 style="color: #e67e22; margin-bottom: 1rem;">✉ Email</h3>
                        <p style="font-size: 1.1rem;"><a href="mailto:gkkgharkakhana@gmail.com" style="color: #333; text-decoration: none; font-weight: 600;">gkkgharkakhana@gmail.com</a></p>
                    </div>
                    
                    <div class="contact-item" style="background: #f8f9fa; padding: 2rem; border-radius: 15px;">
                        <h3 style="color: #e67e22; margin-bottom: 1rem;">📍 Delivery Area</h3>
                        <p><?php echo esc_html(get_theme_mod('delivery_areas', 'CBD Belapur Sectors 11-15, 19-23, and 29-31')); ?></p>
                    </div>
                    
                    <div class="contact-item" style="background: #f8f9fa; padding: 2rem; border-radius: 15px;">
                        <h3 style="color: #e67e22; margin-bottom: 1rem;">⏰ Timing</h3>
                        <p><?php echo esc_html(get_theme_mod('business_hours', 'Daily: 11:00 AM - 9:00 PM')); ?></p>
                    </div>
                </div>
                
                <div style="margin-top: 3rem;">
                    <a href="tel:<?php echo esc_attr(str_replace(' ', '', get_theme_mod('phone_number', '8108325444'))); ?>" class="btn-primary" style="font-size: 1.2rem; padding: 1.2rem 2.5rem;">📞 Call Now to Order</a>
                </div>
                
                <div style="margin-top: 2rem; padding: 2rem; background: #e8f5e8; border-radius: 15px; border-left: 5px solid #28a745;">
                    <h4 style="color: #28a745; margin-bottom: 1rem;">🎉 Special Launch Offer!</h4>
                    <p style="color: #155724; font-size: 1.1rem;">Get your first meal for just ₹<?php echo esc_html(get_theme_mod('offer_price', '69')); ?>! Limited time offer for new customers.</p>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
