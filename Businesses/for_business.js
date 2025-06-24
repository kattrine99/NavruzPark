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
// Локации для мероприятий свайпер 
// ======================= //
const swiperText = new Swiper('.locationsswiper-text', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    allowTouchMove: false,
});

const swiperImage = new Swiper('.locationsswiper-image', {
    slidesPerView: 1,
    loop: false,
    allowTouchMove: false,
    navigation: {
        nextEl: '.swiper-button-next-locations',
        prevEl: '.swiper-button-prev-locations',
    },
    on: {
        slideChange: function () {
            swiperText.slideToLoop(this.realIndex);
        }
    }
});
// Открыть попап
const rentButtons = document.querySelectorAll('.rentBtn');

rentButtons.forEach(button => {
    button.addEventListener('click', function () {
        document.getElementById('popupOverlay').classList.add('active');
    });
});

// Закрыть попап по кнопке-крестику
document.getElementById('popupCloseBtn').addEventListener('click', function () {
    document.getElementById('popupOverlay').classList.remove('active');
});

// Закрыть попап по клику на затемнение
document.getElementById('popupOverlay').addEventListener('click', function (e) {
    if (e.target === this) {
        this.classList.remove('active');
    }
});
// ======================= //
// Комфортные условия свайпер 
// ======================= //
const conditionsSwiper = new Swiper('.conditionsSwiper', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: false,
    navigation: {
        nextEl: '.swiper-button-next-conditions',
        prevEl: '.swiper-button-prev-conditions',
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
// Произошедшие События свайпер 
// ======================= //
const eventCount = 3;
const eventWrapper = document.getElementById('swiper-eventWrapper');
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
                            <h3>Музыкальный вечер «Жара 2025»</h3>
                            <p>Парк собрал сотни гостей на живой концерт с участием популярных исполнителей. Атмосфера уюта, света ...</p>
                            </div>
                            <div class="cardData">
                            <p><img src="/images/icons/Calender.svg"/> 19 мая, начало в 10:00</p></div>
                            <div class="cardButton">
                            <button>Подробнее</button></div>
                        </div>`
    eventWrapper.appendChild(slide);
}
const eventsSwiper = new Swiper('.eventsSwiper', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next-events',
        prevEl: '.swiper-button-prev-events',
    },
    breakpoints: {
        320: { // от 320px и выше
            slidesPerView: 1,
            spaceBetween: 10,
        },
        768: { // от 768px и выше
            slidesPerView: 2,
            spaceBetween: 15,
        },
        1024: { // от 1024px и выше
            slidesPerView: 3,
            spaceBetween: 20,
        },
    }
});
// ======================= //
// Видео галлерея 
// ======================= //
var videogallerywiper = new Swiper(".video-gallery-swiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    freeMode: true,
    navigation: {
        nextEl: '.swiper-button-next-video',
        prevEl: '.swiper-button-prev-video',
    },
    breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 10 },
        600: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 4, spaceBetween: 30 }
    }
});


document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', function () {
        const videoSrc = this.getAttribute('data-video') + '?autoplay=1';

        const iframe = document.createElement('iframe');
        iframe.src = videoSrc;
        iframe.frameBorder = '0';
        iframe.allow = 'autoplay; encrypted-media';
        iframe.allowFullscreen = true;

        const videoContainer = document.querySelector('.video-popup-content');
        const oldIframe = document.getElementById('video-frame');
        if (oldIframe) oldIframe.remove(); // удалить старый iframe

        iframe.id = 'video-frame';
        videoContainer.appendChild(iframe);

        document.getElementById('video-popup').style.display = 'flex';
    });
});

// Закрыть popup
document.getElementById('video-popup-close').addEventListener('click', function () {
    document.getElementById('video-popup').style.display = 'none';

    // Ждём 100 мс и удаляем iframe (чтобы гарантированно сбросить поток YouTube)
    setTimeout(() => {
        const videoFrame = document.getElementById('video-frame');
        if (videoFrame) videoFrame.remove();
    }, 100);
});
// ======================= //
// Сертификаты свайпер 
// ======================= //
const newsCount = 4;
const certificateWrapper = document.getElementById('swiper-certificateWrapper');
certificateWrapper.innerHTML = ''
for (let i = 1; i <= newsCount; i++) {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
       <div class="card">
                            <div class="cardImg">
                                <img src="/images/certificate.jpg" />
                            </div>
                            <div class="cardText">
                            <h3>Лучший культурный объект года</h3>
                            <p>Получен за вклад и в развитие этнокультурного туризма и популяризацию традиционного наследия Узбекистана</p>
                            </div>
                            <div class="cardData">
                            <p><img src="/images/icons/Calender.svg"/> от 19.05.2024</p></div>
                        </div>`
    certificateWrapper.appendChild(slide);
}
const certificateSwiper = new Swiper('.certificateSwiper', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next-news',
        prevEl: '.swiper-button-prev-news',
    },
    breakpoints: {
        320: { // от 320px и выше
            slidesPerView: 1,
            spaceBetween: 10,
        },
        768: { // от 768px и выше
            slidesPerView: 2,
            spaceBetween: 15,
        },
        1024: { // от 1024px и выше
            slidesPerView: 3,
            spaceBetween: 20,
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
