// PHONE CHECKER

const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    }
}


// TAB SLIDER
const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');

const hideTabContent = () => {
    tabContentBlocks.forEach((block) => {
        block.style.display = 'none';
    });
    tabs.forEach((tab) => {
        tab.classList.remove('tab_content_item_active');
    });
}

const showTabContent = (id = 0) => {
    tabContentBlocks[id].style.display = 'block';
    tabs[id].classList.add('tab_content_item_active');
}

let currentIndex = 0;

const changeTab = () => {
    hideTabContent();
    showTabContent(currentIndex);
    currentIndex = (currentIndex + 1) % tabs.length; // цикл по табам
};

hideTabContent();
showTabContent(currentIndex); // Показать первый таб

setInterval(changeTab, 3000); // Меняем таб каждые 3 секунды

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if (event.target === tab) {
                currentIndex = tabIndex; // Обновляем индекс текущего таба
                hideTabContent();
                showTabContent(tabIndex);
            }
        });
    }
}

// CONVERTER

const usdInput = document.querySelector('#usd');
const somInput = document.querySelector('#som');
const eurInput = document.querySelector('#eur');

// Функция конвертации
const converter = (element, targetElement, currencyRates) => {
    element.addEventListener('input', () => {
        const value = parseFloat(element.value);
        if (isNaN(value) || value === '') {
            targetElement.value = '';
            return;
        }

        if (element.id === 'usd') {
            targetElement.value = (value * currencyRates[targetElement.id]).toFixed(2);
        }
        if (element.id === 'som') {
            targetElement.value = (value / currencyRates.som).toFixed(2);
        }
        if (element.id === 'eur') {
            targetElement.value = (value * currencyRates[targetElement.id]).toFixed(2);
        }
    });
};

// Функция для загрузки и обработки данных из JSON
const loadRates = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '../data/converter.json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();

    request.onload = () => {
        const data = JSON.parse(request.response);

        // Связь каждого поля с другими
        converter(usdInput, somInput, data);
        converter(usdInput, eurInput, data);
        converter(somInput, usdInput, data);
        converter(somInput, eurInput, data);
        converter(eurInput, usdInput, data);
        converter(eurInput, somInput, data);
    };
};

loadRates();




// DRY - don't repeat yourself
// KISS - keep it super simple


// CARD SWITCHER
// Получение элементов DOM
const nextButton = document.querySelector('#btn-next');
const prevButton = document.querySelector('#btn-prev');
const cardBlock = document.querySelector('.card');
let cardIndex = 1;

// Асинхронная функция для обновления карточки
const updateCard = async (index) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${index}`);
        if (!response.ok) { // Проверка на успешный ответ
            throw new Error('Не удалось получить данные');
        }
        const data = await response.json();
        cardBlock.innerHTML =
            `<p>${data.title}</p>
        <p>Completed: ${data.completed}</p>
        <span>ID: ${data.id}</span>`
        ;
    } catch (error) {
        console.error('Ошибка при обновлении карточки:', error);
    }
};

// Первоначальное обновление карточки
updateCard(cardIndex);

// Обработчик для кнопки "Далее"
nextButton.onclick = () => {
    cardIndex++;
    if (cardIndex > 200) cardIndex = 1; // возврат к 1
    updateCard(cardIndex);
};

// Обработчик для кнопки "Назад"
prevButton.onclick = () => {
    cardIndex--;
    if (cardIndex < 1) cardIndex = 200; // возвращение к 200
    updateCard(cardIndex);
};



// Асинхронная функция для fetch запроса
const fetchCool = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) { // Проверка на успешный ответ
            throw new Error('Сеть ответа не в порядке');
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Ошибка при выполнении fetch:', error);
    }
};

// Отдельная асинхронная функция для fetch запроса
const fetchSeperate = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) { // Проверка на успешный ответ
            throw new Error('Сеть ответа не в порядке');
        }
        const data = await response.json();
        console.log('Данные из отдельного запроса:', data);
    } catch (error) {
        console.error('Ошибка при выполнении отдельного fetch:', error);
    }
};

// Вызов функций
fetchCool();
fetchSeperate();


// WEATHER

const searchButton= document.querySelector('#search');
const searchInput = document.querySelector('.cityName');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');

const APP_ID = 'e417df62e04d3b1b111abeab19cea714'
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

searchButton.onclick = async () => {
    try {
        const response = await fetch(`${BASE_URL}?appid=${APP_ID}&q=${searchInput.value}&units=metric&lang=RU`)
        const data = await response.json()
        city.innerHTML = data.name || 'Город не найден'
        temp.innerHTML = `
      <span>${data.main?.temp ? Math.round(data.main?.temp) + '&deg;C' : ''}</span>
      <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="">
            `
    } catch (e) {
        console.log(e);
    }

}


// optional chaining - опцилнальная ципочка
// const address = {
//     id: 123,
//     street:{
//         name: "Ibraimova"
//         number: 103
//     }
// }
// console.log(address.street?.name)
// query params - параметры запроса