import { coordinatesofMarkers } from './coordinates.js';
import { infoData } from './infoData.js';
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
        { src: '/images/Azukar.webp', title: 'ДИЗАЙНЕРСКАЯ СТУДИЯ «AZUKAR MORENO»', category: 'shops' },
        { src: '/images/ceramics.jpg', title: 'МАСТЕРСКАЯ КЕРАМИКИ', category: 'workshops' },
        { src: '/images/circle.jpg', title: 'Колесо обозрения', category: 'wheel' },
        { src: '/images/ethno-town-gallery.jpg', title: 'Этногородок', category: 'ethno' },
        { src: '/images/amfitheatre.jpg', title: 'Амфитеатр', category: 'amphitheater' },
        { src: '/images/souvenirs.jpg', title: 'Магазин сувениров', category: 'shops' },
        { src: '/images/masters.jpg', title: 'Мастерская', category: 'workshops' },
        { src: '/images/Azukar.webp', title: 'ДИЗАЙНЕРСКАЯ СТУДИЯ «AZUKAR MORENO»', category: 'shops' },
        { src: '/images/ceramics.jpg', title: 'МАСТЕРСКАЯ КЕРАМИКИ', category: 'workshops' },
        { src: '/images/circle.jpg', title: 'Колесо обозрения', category: 'wheel' },
        { src: '/images/ethno-town-gallery.jpg', title: 'Этногородок', category: 'ethno' },
        { src: '/images/amfitheatre.jpg', title: 'Амфитеатр', category: 'amphitheater' },
        { src: '/images/souvenirs.jpg', title: 'Магазин сувениров', category: 'shops' },
        { src: '/images/masters.jpg', title: 'Мастерская', category: 'workshops' },
        { src: '/images/Azukar.webp', title: 'ДИЗАЙНЕРСКАЯ СТУДИЯ «AZUKAR MORENO»', category: 'shops' },
        { src: '/images/ceramics.jpg', title: 'МАСТЕРСКАЯ КЕРАМИКИ', category: 'workshops' },
        { src: '/images/circle.jpg', title: 'Колесо обозрения', category: 'wheel' },
        { src: '/images/ethno-town-gallery.jpg', title: 'Этногородок', category: 'ethno' },
        { src: '/images/amfitheatre.jpg', title: 'Амфитеатр', category: 'amphitheater' },
        { src: '/images/souvenirs.jpg', title: 'Магазин сувениров', category: 'shops' },
        { src: '/images/masters.jpg', title: 'Мастерская', category: 'workshops' },

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

initMap();

async function initMap() {
    await ymaps3.ready;

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

    const map = new YMap(document.getElementById('map'), {
        location: {
            center: [69.26607, 41.32651],
            zoom: 18
        }
    });

    map.addChild(new YMapDefaultFeaturesLayer());

    map.addChild(new YMapDefaultSchemeLayer({
        customization: [
            {
                "tags": {
                    "any": [
                        "transit"
                    ]
                },
                "elements": [
                    "label.icon",
                    "label.text"
                ],
                "stylers": {
                    "visibility": "off"
                }
            },
            {
                "tags": {
                    "any": [
                        "outdoor",
                        "park",
                        "cemetery",
                        "medical"
                    ]
                },
                "elements": "label",
                "stylers": {
                    "visibility": "off"
                }
            },
            {
                "tags": {
                    "any": "poi",
                    "none": [
                        "outdoor",
                        "park",
                        "cemetery",
                        "medical"
                    ]
                },
                "stylers": {
                    "visibility": "off"
                }
            },
            {
                "tags": {
                    "any": "road"
                },
                "types": "point",
                "stylers": {
                    "visibility": "off"
                }
            },
            {
                "tags": {
                    "any": [
                        "food_and_drink",
                        "shopping",
                        "commercial_services"
                    ]
                },
                "stylers": {
                    "visibility": "off"
                }
            },
            {
                "tags": {
                    "any": [
                        "traffic_light"
                    ]
                },
                "stylers": {
                    "visibility": "off"
                }
            },
            {
                "tags": {
                    "any": [
                        "entrance"
                    ]
                },
                "stylers": {
                    "visibility": "off"
                }
            },
            {
                "tags": {
                    "any": [
                        "road"
                    ],
                    "none": [
                        "road_1",
                        "road_2",
                        "road_3",
                        "road_4",
                        "road_5",
                        "road_6",
                        "road_7"
                    ]
                },
                "elements": "label.icon",
                "stylers": {
                    "visibility": "off"
                }
            }
        ]
    }));

    let currentZoomId = null;
    const defaultZoom = 18;
    const zoomedInZoom = 20;
    let currentIndex = 0;
    const markers = [];


    function renderInfo(index, zoom = true) {
        const item = infoData[index];
        const feature = coordinatesofMarkers.features[index];
        if (!item || !feature) return;

        const infoContent = document.getElementById('infoContent');
        infoContent.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <img src="../images/about_park_leftcornerText.png">
    `;

        const coords = feature.geometry.coordinates;

        if (zoom) {
            map.setLocation({
                center: coords,
                zoom: zoomedInZoom,
                duration: 500
            });
            currentZoomId = item.id;
        }

        markers.forEach(m => m.el.classList.remove('active-marker'));
        markers[index].el.classList.add('active-marker');
    }



    coordinatesofMarkers.features.forEach((feature, index) => {
        const coords = feature.geometry.coordinates;
        const number = feature.properties.iconContent || '';
        const color = feature.properties['marker-color'] || '#56db40';
        const id = feature.properties.iconContent;

        const el = document.createElement('div');
        el.innerHTML = `
    <div class="custom-marker">${number}</div>
`;

        el.className = 'marker-wrapper';

        const marker = new YMapMarker({ coordinates: coords }, el);
        map.addChild(marker);

        markers.push({ id, el });

        el.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentZoomId === id) {
                map.setLocation({
                    center: coords,
                    zoom: defaultZoom,
                    duration: 500
                });
                currentZoomId = null;
                markers.forEach(m => m.el.classList.remove('active-marker'));
            } else {
                currentIndex = index;
                renderInfo(currentIndex);
            }
        });
    });

    document.getElementById('prevBtn')?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + infoData.length) % infoData.length;
        renderInfo(currentIndex);
    });

    document.getElementById('nextBtn')?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % infoData.length;
        renderInfo(currentIndex);
    });
    renderInfo(0, false);

}
const mapWrapper = document.querySelector('.MapWithText');
const mapContainer = document.querySelector('.map-container');
const mapOverlay = document.getElementById('mapOverlay');

mapOverlay.addEventListener('click', (e) => {
    e.stopPropagation();
    mapOverlay.style.display = 'none';
    mapWrapper.classList.add('active');
});

document.addEventListener('click', (e) => {
    const isClickInsideMap = mapContainer.contains(e.target);
    const isClickOnMarker = e.target.closest('.marker-wrapper');

    if (!isClickInsideMap && !isClickOnMarker) {
        mapWrapper.classList.remove('active');
        mapOverlay.style.display = 'block';
    }
});
