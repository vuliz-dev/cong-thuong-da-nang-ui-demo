// Danangtrade Redesign - Interactive Components

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Full Width Hero Slider Logic ---
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.h-dot');
    const heroPrev = document.querySelector('.hero-nav.prev');
    const heroNext = document.querySelector('.hero-nav.next');
    let currentHeroSlide = 0;
    let heroInterval;

    const showHeroSlide = (index) => {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroDots.forEach(dot => dot.classList.remove('active'));
        
        currentHeroSlide = (index + heroSlides.length) % heroSlides.length;
        
        heroSlides[currentHeroSlide].classList.add('active');
        heroDots[currentHeroSlide].classList.add('active');
    };

    const nextHeroSlide = () => showHeroSlide(currentHeroSlide + 1);
    const prevHeroSlide = () => showHeroSlide(currentHeroSlide - 1);

    if (heroNext && heroPrev) {
        heroNext.addEventListener('click', () => {
            nextHeroSlide();
            resetHeroTimer();
        });
        heroPrev.addEventListener('click', () => {
            prevHeroSlide();
            resetHeroTimer();
        });
    }

    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showHeroSlide(index);
            resetHeroTimer();
        });
    });

    const resetHeroTimer = () => {
        clearInterval(heroInterval);
        heroInterval = setInterval(nextHeroSlide, 5000);
    };

    resetHeroTimer(); // Start Auto-play

    // Sticky Header Effect
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // --- Infinite Slider Logic ---
    function makeInfiniteSlider(sliderId, prevBtnId, nextBtnId) {
        const slider = document.getElementById(sliderId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);

        if (!slider || !prevBtn || !nextBtn) return;

        const items = [...slider.children];
        if (items.length === 0) return;

        // Clone items for infinite effect
        // We clone all items to ensure we have enough buffer
        items.forEach(item => {
            const cloneChild = item.cloneNode(true);
            slider.appendChild(cloneChild);
        });
        
        items.reverse().forEach(item => {
            const cloneChild = item.cloneNode(true);
            slider.insertBefore(cloneChild, slider.firstChild);
        });

        // Set initial position to the middle (the original items)
        const itemWidth = items[0].offsetWidth + 15; // 15 is the new gap
        const originalWidth = items.length * itemWidth;
        
        slider.scrollLeft = originalWidth;

        let isJumping = false;

        const handleInfiniteScroll = () => {
            if (isJumping) return;

            // If we've scrolled into the end clones
            if (slider.scrollLeft >= originalWidth * 2) {
                isJumping = true;
                slider.style.scrollBehavior = 'auto';
                slider.scrollLeft -= originalWidth;
                isJumping = false;
            } 
            // If we've scrolled into the beginning clones
            else if (slider.scrollLeft <= 10) {
                isJumping = true;
                slider.style.scrollBehavior = 'auto';
                slider.scrollLeft += originalWidth;
                isJumping = false;
            }
        };

        slider.addEventListener('scroll', handleInfiniteScroll);

        const scrollDistance = 500;

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: scrollDistance, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
        });
        
        // Remove the opacity handling as it's now infinite
        prevBtn.style.opacity = '1';
        prevBtn.style.pointerEvents = 'auto';
        nextBtn.style.opacity = '1';
        nextBtn.style.pointerEvents = 'auto';
    }

    makeInfiniteSlider('category-slider', 'cat-prev', 'cat-next');
    makeInfiniteSlider('product-slider', 'prod-prev', 'prod-next');

    // Button interactions
    const cartBtn = document.querySelectorAll('.btn-add-cart');
    cartBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentCount = document.querySelector('.cart-count');
            let count = parseInt(currentCount.innerText);
            currentCount.innerText = count + 1;
            
            // Visual feedback
            btn.innerText = 'Đã thêm!';
            btn.style.background = '#FF6B00';
            btn.style.color = '#fff';
            
            setTimeout(() => {
                btn.innerText = 'Thêm vào giỏ';
                btn.style.background = 'transparent';
                btn.style.color = '#FF6B00';
            }, 2000);
        });
    });

    console.log('Danangtrade UI Redesign Loaded Successfully.');
});
