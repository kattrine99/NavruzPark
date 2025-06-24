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
// Уголки парка карта свайпер 
// ======================= //
const swiperText = new Swiper('.cornerswiper-text', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    allowTouchMove: false,
    navigation: {
        nextEl: '.swiper-button-next-corner',
        prevEl: '.swiper-button-prev-corner',
    },
    on: {
        slideChange: function () {
            const activeId = swiper.slides[swiper.activeIndex].dataset.id;
            zoomToMarker(activeId);
        }
    }
});
const markers = document.querySelectorAll('.map-marker');
const parkMap = document.getElementById('parkMap');
let currentZoomId = null;

markers.forEach(marker => {
    marker.addEventListener('click', () => {
        const id = marker.dataset.id;

        if (currentZoomId === id) {
            // zoom out
            parkMap.style.transform = 'scale(1)';
            markers.forEach(m => m.classList.remove('active'));
            currentZoomId = null;
        } else {
            // zoom in + sync slide
            swiper.slideTo(id - 1);
            zoomToMarker(id);
            currentZoomId = id;
        }
    });
});

function zoomToMarker(id) {
    const marker = document.querySelector(`.map-marker[data-id="${id}"]`);
    const mapRect = parkMap.getBoundingClientRect();
    const markerRect = marker.getBoundingClientRect();

    const offsetX = (markerRect.left + markerRect.width / 2) - (mapRect.left + mapRect.width / 2);
    const offsetY = (markerRect.top + markerRect.height / 2) - (mapRect.top + mapRect.height / 2);

    const translateX = -offsetX;
    const translateY = -offsetY;

    parkMap.style.transform = `scale(1.5) translate(${translateX}px, ${translateY}px)`;

    markers.forEach(m => m.classList.remove('active'));
    marker.classList.add('active');
}
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
        { src: '/images/uniquecorner.jpg', title: 'ДИЗАЙНЕРСКАЯ СТУДИЯ «AZUKAR MORENO»', category: 'shops' },
        { src: '/images/uniquecorner.jpg', title: 'МАСТЕРСКАЯ КЕРАМИКИ', category: 'workshops' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'wheel' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'ethno' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'workshops' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'amphitheater' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'wheel' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'ethno' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'wheel' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'ethno' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'amphitheater' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'wheel' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'amphitheater' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'wheel' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'ethno' },
        { src: '/images/uniquecorner.jpg', title: 'Колесо обозрения', category: 'workshops' },
    ];

    const photoGallery = document.querySelector('.photoGallery');
    const showMoreBtn = document.querySelector('.show-more-btn');

    let currentFilter = 'all';
    let currentIndex = 0;
    const batchSize = 8;

    // Генерация одной фотки
    function createPhotoItem(photo, index) {
        const item = document.createElement('div');
        item.classList.add('gallery-grid-item');

        const patternIndex = (index % 12) + 1;

        if (patternIndex === 1 || patternIndex === 4 || patternIndex === 9 || patternIndex === 12) {
            item.classList.add('wide-2');
        }
        if (patternIndex === 5) {
            item.classList.add('wide-3');
        }

        item.setAttribute('data-filter', photo.category);
        item.innerHTML = `
        <img src="${photo.src}" alt="${photo.title}">
         <div class="photo-gradient"></div>
        <div class="photo-title">${photo.title}</div>
    `;
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
            showMoreBtn.style.display = 'none';
        } else {
            showMoreBtn.style.display = 'block';
        }
    }

    function applyFilter(filterValue) {
        console.log('APPLY FILTER:', filterValue);

        currentFilter = filterValue;
        currentIndex = 0;
        photoGallery.innerHTML = '';

        renderPhotos();
    }

    showMoreBtn.addEventListener('click', function () {
        renderPhotos();
    });
    applyFilter('all');
});
// ======================= //
// События свайпер 
// ======================= //
const eventCount = 4;
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
// Ремесла свайпер 
// ======================= //
const crafts = [
    { category: 'embroidery', title: 'Вышивка', img: '/images/craft.jpg' },
    { category: 'woodwork', title: 'Резьба по дереву', img: '/images/craft1.jpg' },
    { category: 'ceramics', title: 'Керамика', img: '/images/craft2.jpg' },
    { category: 'textile', title: 'Ткачество', img: '/images/craft3.jpg' },
    { category: 'jewelry', title: 'Ювелирные изделия', img: '/images/craft4.jpg' },
    { category: 'embroidery', title: 'Вышивка', img: '/images/craft.jpg' },
    { category: 'woodwork', title: 'Резьба по дереву', img: '/images/craft1.jpg' },
    { category: 'ceramics', title: 'Керамика', img: '/images/craft2.jpg' },
    { category: 'textile', title: 'Ткачество', img: '/images/craft3.jpg' },
    { category: 'jewelry', title: 'Ювелирные изделия', img: '/images/craft4.jpg' }
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
    loop: true,
    breakpoints: {
        320: { slidesPerView: 2 },
        600: { slidesPerView: 3 },
        900: { slidesPerView: 4 }
    }
});
const craftsSwiper2 = new Swiper('.crafts-slider2', {
    slidesPerView: 4,
    spaceBetween: 16,
    loop: true,
    breakpoints: {
        320: { slidesPerView: 2 },
        600: { slidesPerView: 3 },
        900: { slidesPerView: 4 }
    }
});

document.querySelectorAll('.craft-slide').forEach(slide => {
    slide.addEventListener('click', () => {
        const category = slide.getAttribute('data-category');
        window.location.href = `/catalog.html?category=${category}`;
    });
});