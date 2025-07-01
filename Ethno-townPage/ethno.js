import { placesData } from "./data.js";
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
// Новости свайпер 
// ======================= //
document.addEventListener('DOMContentLoaded', () => {
    const newsCount = 4;
    const ethno_newsWrapper = document.getElementById('swiper-ethnoWrapper');
    ethno_newsWrapper.innerHTML = '';

    for (let i = 1; i <= newsCount; i++) {
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
          <p><img src="/images/icons/Calender.svg"/> 19 мая, начало в 10:00</p>
        </div>
        <div class="cardButton">
  <button onclick="window.location.href='../News/Notice/notice.html'">Подробнее</button>
</div>
      </div>
    `;
        ethno_newsWrapper.appendChild(slide);
    }

    const ethnoSwiper = new Swiper('.ethno-newsSwiper', {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next-news',
            prevEl: '.swiper-button-prev-news',
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
        },
    });
});

// ======================= //
//карточки и фильтр 
// ======================= //
let currentFilteredData = placesData;
const cardsContainer = document.getElementById('cardsContainer');
const loadMoreBtn = document.getElementById('loadMoreBtn');
let currentVisible = 0;
let isAlphabetical = true;
let sortAscending = true;


const getInitialCount = () => window.innerWidth < 1024 ? 6 : 9;

const createCard = ({ title = '', description = '', img = '' }) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
    <div class="card-image-container">
      <img src="${img}" alt="card image" />
    </div>
    <h3>${title}</h3>
    <p>${description}</p>
    <button onclick="window.location.href='./ethno-town-cardFull/cardInfo.html'">Подробнее</button>
  `;
    return card;
};

const renderCards = (count, filteredData) => {
    const fragment = document.createDocumentFragment();

    const sortedData = [...filteredData];
    sortedData.sort((a, b) => {
        return sortAscending
            ? a.title.localeCompare(b.title, ['ru', 'en', 'uz'], { sensitivity: 'base' })
            : b.title.localeCompare(a.title, ['ru', 'en', 'uz'], { sensitivity: 'base' });
    });

    const cardsToShow = sortedData.slice(currentVisible, currentVisible + count);

    cardsToShow.map(createCard).forEach((card, i) => {
        fragment.appendChild(card);
        setTimeout(() => {
            card.classList.add('show');
        }, i * 300);
    });

    cardsContainer.appendChild(fragment);
    currentVisible += cardsToShow.length;

    if (filteredData.length <= getInitialCount()) {
        loadMoreBtn.style.display = 'none';
    } else if (currentVisible >= filteredData.length) {
        loadMoreBtn.textContent = 'Скрыть';
        loadMoreBtn.style.display = 'block';
    } else {
        loadMoreBtn.textContent = 'Показать ещё';
        loadMoreBtn.style.display = 'block';
    }
};


const resetCards = () => {
    const allCards = cardsContainer.querySelectorAll('.card');
    currentFilteredData = activeCategory
        ? placesData.filter(item => item.category === activeCategory)
        : placesData;

    allCards.forEach((card, i) => {
        setTimeout(() => {
            card.classList.remove('show');
            setTimeout(() => {
                if (i === allCards.length - 1) {
                    cardsContainer.innerHTML = '';
                    currentVisible = 0;
                    renderCards(getInitialCount(), currentFilteredData);
                }
            }, 400);
        }, i * 50);
    });
};

loadMoreBtn.addEventListener('click', () => {
    if (currentVisible >= currentFilteredData.length) {
        resetCards();
    } else {
        renderCards(getInitialCount(), currentFilteredData);
    }
});
window.addEventListener('DOMContentLoaded', () => {
    const sortButton = document.querySelectorAll('.sort button');

    sortButton.forEach(button => {
        button.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M2.39844 14.4002H7.70364C8.81964 14.4002 9.37764 14.4002 9.52764 14.7362C9.67524 15.0722 9.29604 15.4754 8.53644 16.2818L4.17084 20.9186C3.41124 21.725 3.03084 22.1282 3.17964 22.4642C3.32844 22.8002 3.88764 22.8002 5.00364 22.8002H9.59844M2.39844 8.4002L4.92564 2.7662C5.39364 1.7222 5.62644 1.2002 5.99844 1.2002C6.37044 1.2002 6.60324 1.7222 7.07124 2.7662L9.59844 8.4002M18.5984 21.6002V2.4002M18.5984 21.6002C17.7584 21.6002 16.1888 19.2074 15.5984 18.6002M18.5984 21.6002C19.4384 21.6002 21.0092 19.2074 21.5984 18.6002"
                    stroke="#FFFDF9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg> По алфавиту`;
    })
    sortButton.forEach(button => {
        button.addEventListener('click', (e) => {
            sortAscending = !sortAscending;
            e.currentTarget.innerHTML = sortAscending
                ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M2.39844 14.4002H7.70364C8.81964 14.4002 9.37764 14.4002 9.52764 14.7362C9.67524 15.0722 9.29604 15.4754 8.53644 16.2818L4.17084 20.9186C3.41124 21.725 3.03084 22.1282 3.17964 22.4642C3.32844 22.8002 3.88764 22.8002 5.00364 22.8002H9.59844M2.39844 8.4002L4.92564 2.7662C5.39364 1.7222 5.62644 1.2002 5.99844 1.2002C6.37044 1.2002 6.60324 1.7222 7.07124 2.7662L9.59844 8.4002M18.5984 21.6002V2.4002M18.5984 21.6002C17.7584 21.6002 16.1888 19.2074 15.5984 18.6002M18.5984 21.6002C19.4384 21.6002 21.0092 19.2074 21.5984 18.6002"
                    stroke="#FFFDF9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg> По алфавиту `
                : `<svg width="24" height="24" viewBox="0 0 22 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.39844 1.2002H6.70364C7.81964 1.2002 8.37764 1.2002 8.52764 1.5362C8.67524 1.8722 8.29604 2.2754 7.53644 3.0818L3.17084 7.7186C2.41124 8.525 2.03084 8.9282 2.17964 9.2642C2.32844 9.6002 2.88764 9.6002 4.00364 9.6002H8.59844M1.39844 22.8002L3.92564 17.1662C4.39364 16.1222 4.62644 15.6002 4.99844 15.6002C5.37044 15.6002 5.60324 16.1222 6.07124 17.1662L8.59844 22.8002M17.5984 21.6002V2.4002M17.5984 21.6002C16.7584 21.6002 15.1888 19.2074 14.5984 18.6002M17.5984 21.6002C18.4384 21.6002 20.0092 19.2074 20.5984 18.6002"
                    stroke="#FFFDF9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg> По алфавиту `;
            resetCards();
        });
    })

});
window.addEventListener('load', () => {
    activeCategory = selectedCategory || '';
    currentFilteredData = activeCategory
        ? placesData.filter(item => item.category === activeCategory)
        : placesData;

    currentVisible = 0;
    renderCards(getInitialCount(), currentFilteredData);
});

window.addEventListener('resize', () => {
    if (currentVisible <= getInitialCount()) {
        resetCards();
    }
});


//фильтр
const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get('category');
let activeCategory = '';
const desktopSelect = document.getElementById('categorySelect');
const mobileSelect = document.getElementById('categoryMobileSelect');

function updateCategory(categoryValue) {
    activeCategory = categoryValue;

    if (desktopSelect) desktopSelect.value = categoryValue;
    if (mobileSelect) mobileSelect.value = categoryValue;

    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('category', categoryValue);
    window.history.pushState({}, '', newUrl);

    resetCards();
}

if (selectedCategory) {
    updateCategory(selectedCategory);
}

if (desktopSelect) {
    desktopSelect.addEventListener('change', () => {
        updateCategory(desktopSelect.value);
    });
}

if (mobileSelect) {
    mobileSelect.addEventListener('change', () => {
        updateCategory(mobileSelect.value);
        popupContent.classList.remove('open');
        isOpen = false;
        filterBtn.innerHTML = filterIcon;
    });
}


// ======================= //
// поиск 
// ======================= //
const searchInputDesktop = document.querySelector('#searchFormDesktop input');
const searchInputMobile = document.querySelector('#searchFormMobile input');
const searchInputPopup = document.querySelector('#searchFormPopup input');

function applySearch(query) {
    query = query.trim().toLowerCase();

    currentFilteredData = placesData.filter(item => {
        const inCategory = activeCategory === '' || item.category === activeCategory;
        const inSearch = item.title.toLowerCase().includes(query);
        return inCategory && inSearch;
    });

    currentVisible = 0;
    cardsContainer.innerHTML = '';
    renderCards(getInitialCount(), currentFilteredData);
}
const allSearchInputs = document.querySelectorAll('.search input, .search-mobile input');

allSearchInputs.forEach(input => {
    input.addEventListener('input', () => {
        const query = input.value.trim();
        if (query === '') {
            currentFilteredData = activeCategory
                ? placesData.filter(item => item.category === activeCategory)
                : placesData;

            currentVisible = 0;
            cardsContainer.innerHTML = '';
            renderCards(getInitialCount(), currentFilteredData);
        }
    });
});
document.querySelectorAll('form.search, form.search-mobile').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        applySearch(input.value);
    });
});
// ======================= //
// Мобильная версия фильтров
// ======================= //
const filterBtn = document.querySelector('.ethnoSearch-mobile .filter-button');
const popupContent = document.querySelector('.popup-content');

let isOpen = false;

const filterIcon = `
<svg width="30" height="30" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.6875 1.75L5.6875 7" stroke="#FFFDF9" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5.6875 15.75L5.6875 19.25" stroke="#FFFDF9" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.75 12.25C8.75 10.5586 7.37887 9.1875 5.6875 9.1875C3.99613 9.1875 2.625 10.5586 2.625 12.25C2.625 13.9414 3.99613 15.3125 5.6875 15.3125C7.37887 15.3125 8.75 13.9414 8.75 12.25Z" stroke="#FFFDF9" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15.3125 1.75L15.3125 5.25" stroke="#FFFDF9" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15.3125 14L15.3125 19.25" stroke="#FFFDF9" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M18.375 8.75C18.375 7.05863 17.0039 5.6875 15.3125 5.6875C13.6211 5.6875 12.25 7.05863 12.25 8.75C12.25 10.4414 13.6211 11.8125 15.3125 11.8125C17.0039 11.8125 18.375 10.4414 18.375 8.75Z" stroke="#FFFDF9" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
filterBtn.innerHTML = filterIcon;

const closeIcon = `
<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.61133 16.3887L16.3887 7.61133M7.61133 7.61133L16.3887 16.3887" stroke="#FFFDF9" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

filterBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    popupContent.classList.toggle('open');
    filterBtn.innerHTML = isOpen ? closeIcon : filterIcon;
});
const categoryButtonSelect = document.getElementById('categoryMobileSelect');
categoryButtonSelect.addEventListener('change', () => {
    popupContent.classList.remove('open');
    isOpen = false;
    filterBtn.innerHTML = filterIcon;
});


