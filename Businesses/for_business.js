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

class VideoGallery {
    constructor() {
        this.swiper = null;
        this.currentVideo = null;
        this.scrollTimeout = null;

        this.init();
    }

    init() {
        this.initSwiper();
        this.loadThumbnails();
        this.bindEvents();

        console.log('VideoGallery готова');
    }

    // Инициализация Swiper-слайдера
    initSwiper() {
        const swiperEl = document.querySelector('.video-gallery-swiper');
        if (!swiperEl) {
            console.error('Swiper элемент не найден');
            return;
        }

        this.swiper = new Swiper('.video-gallery-swiper', {
            slidesPerView: 3,
            spaceBetween: 30,
            navigation: {
                nextEl: '.swiper-button-next-video',
                prevEl: '.swiper-button-prev-video'
            },
            breakpoints: {
                320: { slidesPerView: 1 },
                680: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
            on: {
                slideChange: () => this.pauseAllVideos()
            }
        });
    }

    // Загружаем превью для всех видео
    loadThumbnails() {
        const cards = document.querySelectorAll('.video-card');
        cards.forEach(card => {
            const id = card.getAttribute('data-youtube-id');
            const thumb = card.querySelector('.video-thumbnail');

            if (id && thumb) {
                const url = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
                const fallback = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

                const img = new Image();
                img.onload = () => { thumb.src = url; };
                img.onerror = () => { thumb.src = fallback; };
                img.src = url;
            }
        });
    }
    bindEvents() {
        const cards = document.querySelectorAll('.video-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                this.playVideo(card);
            });
        });

        window.addEventListener('scroll', () => this.onScroll());
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) this.pauseAllVideos();
        });
    }

    onScroll() {
        if (document.fullscreenElement) return;

        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.checkVisibility();
        }, 100);
    }

    checkVisibility() {
        const gallery = document.querySelector('.video-gallery');
        if (!gallery) return;

        const rect = gallery.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const visible = Math.max(0, Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0));
        const percent = (visible / rect.height) * 100;

        if (rect.bottom < 0 || rect.top > windowHeight || percent < 10) {
            this.pauseAllVideos();
        }
    }

    playVideo(card) {
        if (card.classList.contains('playing')) return;

        this.pauseAllVideos();

        const id = card.getAttribute('data-youtube-id');
        const iframe = card.querySelector('iframe');
        if (!id || !iframe) return;

        iframe.src = this.getEmbedUrl(id);
        card.classList.add('playing');
        this.currentVideo = card;
    }
    getEmbedUrl(id) {
        const params = new URLSearchParams({
            autoplay: '1',
            rel: '0',
            modestbranding: '1',
            playsinline: '1',
            enablejsapi: '1',
            fs: '1',
            iv_load_policy: '3',
            showinfo: '0',
            controls: '1',
            disablekb: '0',
            origin: window.location.origin
        });

        return `https://www.youtube.com/embed/${id}?${params.toString()}`;
    }
    pauseAllVideos() {
        const cards = document.querySelectorAll('.video-card.playing');
        cards.forEach(card => {
            const iframe = card.querySelector('iframe');
            if (iframe) iframe.src = '';
            card.classList.remove('playing');
        });
        this.currentVideo = null;
    }
    destroy() {
        if (this.swiper) {
            this.swiper.destroy();
        }
        console.log('VideoGallery уничтожена');
    }
}

// Запуск галереи
let videoGallery;
document.addEventListener('DOMContentLoaded', () => {
    videoGallery = new VideoGallery();
});

window.addEventListener('beforeunload', () => {
    if (videoGallery) {
        videoGallery.destroy();
    }
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