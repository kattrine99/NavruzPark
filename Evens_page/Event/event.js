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
// События свайпер 
// ======================= //
const eventCount = 4;
const eventWrapper = document.getElementById('swiper-eventsWrapper');
eventWrapper.innerHTML = ''
for (let i = 1; i <= eventCount; i++) {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
       <div class="card">
                            <div class="cardImg">
                                <img src="/images/event.jpg" />
                            </div>
                            <div class="cardText">
                            <h3>Фестиваль национальной кухни</h3>
                            <p>В эти выходные парк «Навруз» приглашает гостей на атмосферный фестиваль: народные мастера, локальн...</p>
                            </div>
                            <div class="cardData">
                            <p><img src="/images/icons/Calender.svg"/> 19 мая, начало в 10:00</p></div>
                            <div class="cardButton">
                            <button>Подробнее</button></div>
                        </div>`
    eventWrapper.appendChild(slide);
}
const eventsSwiper = new Swiper('.eventsSwiper', {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next-events',
        prevEl: '.swiper-button-prev-events',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 15,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
    }
});

// ======================= //
// Фото галерея свайпер 
// ======================= //
const Photoswiper = new Swiper(".photo-gallery-swiper", {
    slidesPerView: 4,
    spaceBetween: 20,
    speed: 3000,
    loop: true,
    autoplay: false,
    navigation: {
        nextEl: ".swiper-button-next-img",
        prevEl: ".swiper-button-prev-img",
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        600: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 4,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
        },
    },
});