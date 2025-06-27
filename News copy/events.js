import { cardsData } from "./cardsData.js";
console.log(cardsData);
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
// Карточки с новостями
// ======================= //
const cardsContainer = document.getElementById('cardsContainer');
const loadMoreBtn = document.getElementById('loadMoreBtn');

let currentVisible = 0;

const getInitialCount = () => window.innerWidth < 1024 ? 4 : 6;

const createCard = ({ title = '', text = '', date = '', image = '' }) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
    <img src="${image}" alt="card image" />
    <h3>${title}</h3>
    <p>${text}</p>
    <p class="calendarDate"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.66406 2.16797V5.41797M17.3307 2.16797V5.41797" stroke="#6B2B00" stroke-width="1.625" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.78906 9.84766H22.2057" stroke="#6B2B00" stroke-width="1.625" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.75 9.20964V18.418C22.75 21.668 21.125 23.8346 17.3333 23.8346H8.66667C4.875 23.8346 3.25 21.668 3.25 18.418V9.20964C3.25 5.95964 4.875 3.79297 8.66667 3.79297H17.3333C21.125 3.79297 22.75 5.95964 22.75 9.20964Z" stroke="#6B2B00" stroke-width="1.625" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.0006 14.8424H17.0103" stroke="#6B2B00" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.0006 18.0924H17.0103" stroke="#6B2B00" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.9967 14.8424H13.0064" stroke="#6B2B00" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.9967 18.0924H13.0064" stroke="#6B2B00" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.98884 14.8424H8.99857" stroke="#6B2B00" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.98884 18.0924H8.99857" stroke="#6B2B00" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
</svg> ${date}</p>
    <button onclick="window.location.href='../News/Notice/notice.html'" >
      Узнать подробнее
    </button>
  `;
    return card;
};

const renderCards = (count) => {
    const fragment = document.createDocumentFragment();
    const cardsToShow = cardsData.slice(currentVisible, currentVisible + count);

    cardsToShow.map(createCard).forEach((card, i) => {
        fragment.appendChild(card);
        setTimeout(() => {
            card.classList.add('show');
        }, i * 300);
    });

    cardsContainer.appendChild(fragment);
    currentVisible += cardsToShow.length;

    if (currentVisible >= cardsData.length) {
        loadMoreBtn.textContent = 'Скрыть';
    }
};

const resetCards = () => {
    const allCards = cardsContainer.querySelectorAll('.card');
    allCards.forEach((card, i) => {
        setTimeout(() => {
            card.classList.remove('show');
            setTimeout(() => {
                if (i === allCards.length - 1) {
                    cardsContainer.innerHTML = '';
                    currentVisible = 0;
                    renderCards(getInitialCount());
                    loadMoreBtn.textContent = 'Показать еще';
                }
            }, 400);
        }, i * 50);
    });
};

loadMoreBtn.addEventListener('click', () => {
    if (currentVisible >= cardsData.length) {
        resetCards();
    } else {
        renderCards(getInitialCount());
    }
});

window.addEventListener('load', () => {
    renderCards(getInitialCount());
});

window.addEventListener('resize', () => {
    if (currentVisible <= getInitialCount()) {
        resetCards();
    }
});