// ======================= //
// Главный основной слайдер
// ======================= //

const mainSlidesCount = 4;
const mainImages = [
    "/images/Navruz_main.png",
    "/images/uniquecorner.jpg",
    "/images/circleTower.jpg",
    "/images/forvisitors.jpg"
]
const mainWrapper = document.getElementById('swiper-wrapper');
mainWrapper.innerHTML = '';

for (let i = 1; i <= mainSlidesCount; i++) {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.id = `slide-${i}`;
    slide.innerHTML = `
        <div class="slide-container">
           <img src=${mainImages[i - 1]}>
           <div class="slide-gradient"></div>
        </div>`;
    mainWrapper.appendChild(slide);
}

const mainSwiper = new Swiper('.Main_Heading_Swiper', {
    loop: true,
    speed: 1500,
    effect: "fade",
    fadeEffect: { crossFade: true },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

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
// Уникальность парка свайпер 
// ======================= //
const uniqueParkSwiper = new Swiper('.uniqueParkSwiper', {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: false,
    navigation: {
        nextEl: '.swiper-button-next-unique',
        prevEl: '.swiper-button-prev-unique',
    },
    breakpoints: {
        1300: {
            slidesPerView: 4,
            spaceBetween: 20,
            loop: true,
        },
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
// Уникальные уголки парка свайпер 
// ======================= //
const swiperText = new Swiper('.cornerswiper-text', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    allowTouchMove: false,
});

const swiperImage = new Swiper('.cornerswiper-image', {
    slidesPerView: 1,
    loop: false,
    allowTouchMove: false,
    navigation: {
        nextEl: '.swiper-button-next-corner',
        prevEl: '.swiper-button-prev-corner',
    },
    on: {
        slideChange: function () {
            swiperText.slideToLoop(this.realIndex);
        }
    }
});
// ======================= //
// Ремесла свайпер 
// ======================= //
const crafts = [
    { category: 'designers', title: 'Дизайнеры', img: '/images/craft.jpg' },
    { category: 'pottery', title: 'Гончарка', img: '/images/craft1.jpg' },
    { category: 'museums', title: 'Музеи', img: '/images/craft2.jpg' },
    { category: 'restaurants', title: 'Рестораны', img: '/images/craft3.jpg' },
    { category: 'craftsmen', title: 'Кунорманды (ремесленники)', img: '/images/craft4.jpg' },
    { category: 'shops', title: 'Магазины', img: '/images/crafts.jpg' },
    { category: 'souvenirs', title: 'Сувениры', img: '/images/national_shop.png' },
    { category: 'ceramics', title: 'Керамика', img: '/images/forbusiness.jpg' }
];

const craftWrapper1 = document.getElementById('crafts-wrapper1');
const craftWrapper2 = document.getElementById('crafts-wrapper2');

crafts.forEach(craft => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide craft-slide';
    slide.setAttribute('data-category', craft.category);
    slide.innerHTML = `
            <img src="${craft.img}" alt="${craft.title}" />
                     <div class="craft-photo-gradient"></div>
            <div class="craft-title">${craft.title}</div>
        `;
    craftWrapper1.appendChild(slide);
});
crafts.forEach(craft => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide craft-slide';
    slide.setAttribute('data-category', craft.category);
    slide.innerHTML = `
            <img src="${craft.img}" alt="${craft.title}" />
                     <div class="craft-photo-gradient"></div>
            <div class="craft-title">${craft.title}</div>
        `;
    craftWrapper2.appendChild(slide);
});

const craftsSwiper1 = new Swiper('.crafts-slider1', {
    slidesPerView: 4,
    spaceBetween: 16,
    speed: 10000,
    loop: true,
    autoplay: {
        delay: 100,
        reverseDirection: true,
    },
    breakpoints: {
        320: { slidesPerView: 2 },
        600: { slidesPerView: 3 },
        900: { slidesPerView: 4 }
    }
});
const craftsSwiper2 = new Swiper('.crafts-slider2', {
    slidesPerView: 4,
    spaceBetween: 16,
    speed: 12000,
    loop: true,
    autoplay: {
        delay: 100,
    },
    breakpoints: {
        320: { slidesPerView: 2 },
        600: { slidesPerView: 3 },
        900: { slidesPerView: 4 }
    }
});

document.querySelectorAll('.craft-slide').forEach(slide => {
    slide.addEventListener('click', () => {
        const category = slide.getAttribute('data-category');
        window.location.href = `/Ethno-townPage/ethno.html?category=${category}`;
    });

    slide.addEventListener('mouseenter', () => {
        craftsSwiper1.autoplay.stop();
        craftsSwiper2.autoplay.stop();
    });

    slide.addEventListener('mouseleave', () => {
        craftsSwiper1.autoplay.start();
        craftsSwiper2.autoplay.start();
    });
});
// ======================= //
// Галерея
// ======================= //
document.addEventListener('DOMContentLoaded', function () {
    const filterCategories = [
        { label: 'Все фотографии', value: 'all' },
        { label: 'Колесо обозрения', value: 'wheel' },
        { label: 'Этногородок', value: 'ethno' },
        { label: 'Амфитеатр', value: 'amphitheater' },
        { label: 'Мастерские', value: 'workshops' },
        { label: 'Магазины', value: 'shops' }
    ];

    const filtersDesktop = document.querySelector('.filters-buttons');
    const filtersSwiperWrapper = document.querySelector('.filters-buttons-swiper .swiper-wrapper');
    const photoGallery = document.querySelector('.photoGallery');
    const showMoreBtn = document.querySelector('.show-more-btn');
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.getElementById("closeModal");

    const photosData = [
        { src: '/images/uniquecorner.jpg', title: 'ДИЗАЙНЕРСКАЯ СТУДИЯ «AZUKAR MORENO»', category: 'shops' },
        { src: '/images/uniquecorner.jpg', title: 'МАСТЕРСКАЯ КЕРАМИКИ', category: 'workshops' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'wheel' },
        { src: '/images/uniquecorner.jpg', title: 'Этногородок', category: 'ethno' },
        { src: '/images/uniquecorner.jpg', title: 'Амфитеатр', category: 'amphitheater' },
        { src: '/images/uniquecorner.jpg', title: 'Магазин сувениров', category: 'shops' },
        { src: '/images/uniquecorner.jpg', title: 'Мастерская', category: 'workshops' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения ночью', category: 'wheel' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения ночью', category: 'wheel' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения ночью', category: 'wheel' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения ночью', category: 'wheel' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения ночью', category: 'wheel' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения ночью', category: 'wheel' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения ночью', category: 'wheel' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения ночью', category: 'wheel' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения ночью', category: 'wheel' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения ночью', category: 'wheel' },
    ];

    let currentFilter = 'all';
    let currentIndex = 0;
    const batchSize = 8;
    let isAllPhotosShown = false;

    filterCategories.forEach(category => {
        const desktopBtn = document.createElement('button');
        desktopBtn.classList.add('filter-btn');
        if (category.value === 'all') desktopBtn.classList.add('active');
        desktopBtn.setAttribute('data-filter', category.value);
        desktopBtn.textContent = category.label;
        filtersDesktop.appendChild(desktopBtn);

        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        const swiperText = document.createElement('p');
        swiperText.classList.add('filter-text');
        if (category.value === 'all') swiperText.classList.add('active');
        swiperText.setAttribute('data-filter', category.value);
        swiperText.textContent = category.label;
        slide.appendChild(swiperText);
        filtersSwiperWrapper.appendChild(slide);
    });

    filtersDesktop.addEventListener('click', function (e) {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        const filterValue = btn.getAttribute('data-filter');
        applyFilter(filterValue);
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });

    const swiper = new Swiper('.filters-buttons-swiper', {
        slidesPerView: 1,
        centeredSlides: true,
        loop: false,
        navigation: {
            nextEl: '.swiper-button-filter-next',
            prevEl: '.swiper-button-filter-prev'
        },
        on: {
            slideChange: function () {
                const activeSlide = this.slides[this.activeIndex];
                const button = activeSlide.querySelector('.filter-text');
                const filterValue = button?.getAttribute('data-filter');
                if (filterValue) {
                    applyFilter(filterValue);
                    document.querySelectorAll('.filter-btn').forEach(b => {
                        b.classList.toggle('active', b.getAttribute('data-filter') === filterValue);
                    });
                }
            }
        }
    });

    function createPhotoItem(photo, index) {
        const item = document.createElement('div');
        item.classList.add('gallery-grid-item');
        const patternIndex = (index % 12) + 1;
        if ([1, 4, 9, 12].includes(patternIndex)) item.classList.add('wide-2');
        if (patternIndex === 5) item.classList.add('wide-3');
        item.setAttribute('data-filter', photo.category);
        item.innerHTML = `
            <img src="${photo.src}" alt="${photo.title}">
            <div class="photo-gradient"></div>
            <div class="photo-title">${photo.title}</div>
        `;
        const img = item.querySelector('img');
        img.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImg.src = img.src;
        });
        return item;
    }

    function renderPhotos() {
        const filteredPhotos = photosData.filter(photo => {
            return currentFilter === 'all' || photo.category === currentFilter;
        });

        const nextPhotos = filteredPhotos.slice(currentIndex, currentIndex + batchSize);

        nextPhotos.forEach((photo, i) => {
            const item = createPhotoItem(photo, currentIndex + i);
            photoGallery.appendChild(item);
            setTimeout(() => {
                item.classList.add('show');
            }, i * 100);
        });

        currentIndex += batchSize;

        if (currentIndex >= filteredPhotos.length) {
            showMoreBtn.textContent = filteredPhotos.length > batchSize ? 'Скрыть' : '';
            isAllPhotosShown = true;
        } else {
            showMoreBtn.textContent = 'Показать ещё';
            isAllPhotosShown = false;
        }
        showMoreBtn.style.display = filteredPhotos.length <= batchSize ? 'none' : 'block';
    }


    function resetGallery() {
        const allPhotos = photoGallery.querySelectorAll('.gallery-grid-item');
        allPhotos.forEach((photo, i) => {
            setTimeout(() => {
                photo.classList.remove('show');
                if (i === allPhotos.length - 1) {
                    setTimeout(() => {
                        photoGallery.innerHTML = '';
                        currentIndex = 0;
                        isAllPhotosShown = false;
                        renderPhotos();
                    }, 300);
                }
            }, i * 50);
        });
    }

    function applyFilter(filterValue) {
        currentFilter = filterValue;
        currentIndex = 0;
        photoGallery.innerHTML = '';
        isAllPhotosShown = false;
        renderPhotos();
    }

    showMoreBtn.addEventListener('click', function () {
        if (isAllPhotosShown) {
            resetGallery();
        } else {
            renderPhotos();
        }
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    applyFilter('all');
});

// ======================= //
// Новости свайпер 
// ======================= //
const newsCount = 4;
const newsWrapper = document.getElementById('swiper-newsWrapper');
newsWrapper.innerHTML = ''
for (let i = 1; i <= newsCount; i++) {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
       <div class="card">
                            <div class="cardImg">
                                <img src="/images/craft2.jpg" />
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
    newsWrapper.appendChild(slide);
}
const newsSwiper = new Swiper('.newsSwiper', {
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