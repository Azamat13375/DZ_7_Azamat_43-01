async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        renderCards(data);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

function renderCards(posts) {
    const cardContainer = document.getElementById('card-container');

    posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML =
            `<img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png" alt="Card image">
                <h2>${post.title}</h2>
                <p>${post.body}</p>`


                cardContainer.appendChild(card)
                })
                }

                // Запуск функции для получения данных при загрузке страницы
                fetchData()
