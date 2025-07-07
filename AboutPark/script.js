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
// Галлерея
// ======================= //
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

filterCategories.forEach(category => {
    // Desktop button
    const desktopBtn = document.createElement('button');
    desktopBtn.classList.add('filter-btn');
    if (category.value === 'all') {
        desktopBtn.classList.add('active');
    }
    desktopBtn.setAttribute('data-filter', category.value);
    desktopBtn.textContent = category.label;
    filtersDesktop.appendChild(desktopBtn);

    // Swiper slide
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');

    const swiperText = document.createElement('p');
    swiperText.classList.add('filter-text');
    if (category.value === 'all') {
        swiperText.classList.add('active');
    }
    swiperText.setAttribute('data-filter', category.value);
    swiperText.textContent = category.label;

    slide.appendChild(swiperText);
    filtersSwiperWrapper.appendChild(slide);
});

applyFilter('all');
filtersDesktop.addEventListener('click', function (e) {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    const filterValue = btn.getAttribute('data-filter');
    console.log('Desktop button filter:', filterValue);

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

            console.log('Slider filter:', filterValue);

            applyFilter(filterValue);

            document.querySelectorAll('.filter-btn').forEach(b => {
                if (b.getAttribute('data-filter') === filterValue) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
        }
    }
});

function applyFilter(filterValue) {
    console.log('APPLY FILTER:', filterValue);
    document.querySelectorAll('.gallery-grid-item').forEach(item => {
        const itemFilter = item.getAttribute('data-filter');
        if (filterValue === 'all' || filterValue === itemFilter) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {

    const photosData = [
        { src: '../images/uniquecorner.jpg', title: 'ДИЗАЙНЕРСКАЯ СТУДИЯ «AZUKAR MORENO»', category: 'shops' },
        { src: '../images/uniquecorner.jpg', title: 'МАСТЕРСКАЯ КЕРАМИКИ', category: 'workshops' },
        { src: '../images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'wheel' },
        { src: '../images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'ethno' },
        { src: '../images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'workshops' },
        { src: '../images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'amphitheater' },
        { src: '../images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'wheel' },
        { src: '../images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'ethno' },
        { src: '../images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'wheel' },
        { src: '../images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'ethno' },
        { src: '../images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'amphitheater' },
        { src: '../images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'wheel' },
        { src: '../images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'amphitheater' },
        { src: '../images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'wheel' },
        { src: '../images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'ethno' },
        { src: '../images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'workshops' },
    ];

    const photoGallery = document.querySelector('.photoGallery');
    const showMoreBtn = document.querySelector('.show-more-btn');

    let currentFilter = 'all';
    let currentIndex = 0;
    const batchSize = 8;


    let isAllPhotosShown = false;
    // Генерация одной фотки
    function createPhotoItem(photo, index) {
        const item = document.createElement('div');
        item.classList.add('gallery-grid-item');

        const patternIndex = (index % 12) + 1;

        if ([1, 4, 9, 12].includes(patternIndex)) {
            item.classList.add('wide-2');
        }
        if (patternIndex === 5) {
            item.classList.add('wide-3');
        }

        item.setAttribute('data-filter', photo.category);
        item.innerHTML = `
        <img src="${photo.src}" alt="${photo.title}" class="gallery-img">
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
        });

        currentIndex += batchSize;

        if (currentIndex >= filteredPhotos.length) {
            showMoreBtn.textContent = 'Скрыть';
            isAllPhotosShown = true;
        } else {
            showMoreBtn.textContent = 'Показать ещё';
        }
    }
    function resetGallery() {
        const allPhotos = photoGallery.querySelectorAll('.gallery-grid-item');

        allPhotos.forEach((photo, i) => {
            setTimeout(() => {
                photo.classList.remove('show');
                setTimeout(() => {
                    if (i === allPhotos.length - 1) {
                        photoGallery.innerHTML = '';
                        currentIndex = 0;
                        isAllPhotosShown = false;
                        renderPhotos();
                        showMoreBtn.textContent = 'Показать ещё';
                    }
                }, 300);
            }, i * 50);
        });
    }
    function applyFilter(filterValue) {
        console.log('APPLY FILTER:', filterValue);

        currentFilter = filterValue;
        currentIndex = 0;
        photoGallery.innerHTML = '';

        renderPhotos();
    }

    showMoreBtn.addEventListener('click', function () {
        if (isAllPhotosShown) {
            resetGallery();
        } else {
            renderPhotos();
        }
    });
    applyFilter('all');
});
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.getElementById("closeModal");

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
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
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        420: {
            slidesPerView: 2,
            spaceBetween: 15,
        },
        720: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
        1024: {
            slidesPerView: 'auto',
            spaceBetween: 15,
        },
    }

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
// ======================= //
// Яндекс карта 
// ======================= //
ymaps3.ready(async () => {
    const response = await fetch('/styles/customization.json');
    const styleJson = await response.json();

    const { YMap, YMapDefaultSchemeLayer } = ymaps3;

    const map = new YMap(document.getElementById('map'), {
        location: {
            center: [69.279737, 41.311151], // координаты центра, например Ташкент
            zoom: 12
        }
    });

    const schemeLayer = new YMapDefaultSchemeLayer({
        style: styleJson
    });

    map.addChild(schemeLayer);
});