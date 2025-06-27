// ======================= //
// Бургер 
// ======================= //
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
});

closeMenu.addEventListener("click", () => {
    burger.classList.remove("active");
    mobileMenu.classList.remove("active");
});
// ======================= //
// Возможности свайпер 
// ======================= //
const facilitiesSwiper = new Swiper('.facilitiesSwiper', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: false,
    navigation: {
        nextEl: '.swiper-button-next-facilities',
        prevEl: '.swiper-button-prev-facilities',
    },
    breakpoints: {
        1024: {
            slidesPerView: 3,
            spaceBetween: 20,
            loop: true,
        },
        560: {
            slidesPerView: 2,
            spaceBetween: 15,
            loop: true,
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true,
        },
    }
});
// ======================= //
// Партнеры свайпер 
// ======================= //
const partnersCount = 10;
const partnersWrapper = document.getElementById('swiper-partnersWrapper');
partnersWrapper.innerHTML = '';

for (let i = 1; i <= partnersCount; i++) {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
        <div class="partner-card">
            <img src="/images/cocacola.png" alt="Partner ${i}">
        </div>`;
    partnersWrapper.appendChild(slide);
}

const partnersSwiper = new Swiper('.partnersSwiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    speed: 3000,
    loop: true,
    freeMode: true,
    autoplay: {
        delay: 0,
        disableOnInteraction: false
    },
});

const faqItems = document.querySelectorAll('.faq-item');
// ======================= //
// Кнопка + x вопросов 
// ======================= //
faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});
// ======================= //
// Активность карты 
// ======================= //
const map = document.getElementById("mapContainer");
const overlay = document.getElementById("mapOverlay");

overlay.addEventListener("click", (e) => {
    overlay.style.display = "none";
    map.classList.add("active");
});

document.addEventListener("click", (e) => {
    if (!map.contains(e.target)) {
        overlay.style.display = "block";
        map.classList.remove("active");
    }
});
