import { coordinatesofMarkers } from '../Tourists/coordinates2.js';
import { infoData } from './infoData2.js';
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
                            <button onclick="window.location.href='../Evens_page/Event/event.html'">Подробнее</button></div>
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
    { category: 'pottery', title: 'Вышивка', img: '/images/craft.jpg' },
    { category: 'souvenirs', title: 'Резьба по дереву', img: '/images/craft1.jpg' },
    { category: 'ceramics', title: 'Керамика', img: '/images/craft2.jpg' },
    { category: 'designers', title: 'Ткачество', img: '/images/craft3.jpg' },
    { category: 'souvenirs', title: 'Ювелирные изделия', img: '/images/craft4.jpg' },
    { category: 'designers', title: 'Вышивка', img: '/images/craft.jpg' },
    { category: 'souvenirs', title: 'Резьба по дереву', img: '/images/craft1.jpg' },
    { category: 'ceramics', title: 'Керамика', img: '/images/craft2.jpg' },
    { category: 'pottery', title: 'Ткачество', img: '/images/craft3.jpg' },
    { category: 'souvenirs', title: 'Ювелирные изделия', img: '/images/craft4.jpg' }
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
    speed: 10000,
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
