const blocksWrapper = document.querySelector('.info__class');
const addProjectBtn = document.querySelector('.info__button');
const addProjectModal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.modal__close');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const linkInput = document.getElementById('link');
const submitProjectBtn = document.querySelector('.modal button');

addProjectBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
submitProjectBtn.addEventListener('click', addProject);

function openModal() {
  addProjectModal.classList.add('open');
}

function closeModal() {
  addProjectModal.classList.remove('open');
  clearInputs();
}

function clearInputs() {
  nameInput.value = '';
  descriptionInput.value = '';
  linkInput.value = '';
}

function addProject() {
  const title = nameInput.value.trim();
  const desc = descriptionInput.value.trim();
  const link = linkInput.value.trim();

  if (title && desc && link) {
    const newElement = document.createElement('div');
    newElement.classList.add('info__block');
    newElement.innerHTML = `
      <div class="info__img">
        <img src="${link}" alt="${title}" class="info__naked">                   
      </div>
      <div class="info__name">
        <h2 class="info__word">${title}</h2>
        <p class="info__description">${desc}</p>
      </div>
    `;

    blocksWrapper.appendChild(newElement);
    closeModal();
  } else {
    alert('Пожалуйста, заполните все поля.');
  }
}
document.addEventListener("DOMContentLoaded", function() {
  const quotesList = document.querySelector(".quotes__list");
  const authorsDropdown = document.querySelector("#authors-dropdown");
  const randomQuotesButton = document.querySelector("#random-quotes-button");
  let authorsSet = new Set();
  let cachedQuotes = []; // Массив для сохранения загруженных цитат

  // Функция для загрузки 10 цитат одним запросом
  async function fetchBulkQuotes() {
      try {
          const response = await fetch("https://programming-quotesapi.vercel.app/api/bulk");
          if (!response.ok) {
              throw new Error("Ошибка при загрузке цитат");
          }
          const quotes = await response.json();
          return quotes;
      } catch (error) {
          console.error("Ошибка при загрузке цитат:", error);
          return [];
      }
  }

  // Функция для загрузки и отображения 10 случайных цитат
  async function loadRandomQuotes() {
      quotesList.innerHTML = ""; // Очищаем список цитат
      authorsSet.clear();
      authorsDropdown.innerHTML = ""; // Очищаем список авторов
      cachedQuotes = []; // Сбрасываем кэшированные цитаты

      const quotes = await fetchBulkQuotes();
      cachedQuotes = quotes; // Сохраняем цитаты в кэш

      quotes.forEach(quote => {
          const listItem = document.createElement("li");
          listItem.classList.add("quotes__list-item");
          listItem.textContent = `"${quote.quote}" — ${quote.author}`;
          quotesList.appendChild(listItem);

          // Сохраняем автора
          authorsSet.add(quote.author);
      });

      // Обновляем выпадающий список авторов
      authorsSet.forEach(author => {
          const option = document.createElement("option");
          option.value = author;
          option.textContent = author;
          authorsDropdown.appendChild(option);
      });
  }

  // Функция для загрузки и отображения цитат определённого автора
  function loadQuotesByAuthor(author) {
      quotesList.innerHTML = ""; // Очищаем список цитат
      let authorQuotes = cachedQuotes.filter(quote => quote.author === author);

      if (authorQuotes.length === 0) {
          console.warn("Нет цитат для выбранного автора в кэше.");
          return;
      }

      authorQuotes.forEach(quote => {
          const listItem = document.createElement("li");
          listItem.classList.add("quotes__list-item");
          listItem.textContent = `"${quote.quote}" — ${quote.author}`;
          quotesList.appendChild(listItem);
      });
  }

  // Обработчик выбора автора из выпадающего списка
  authorsDropdown.addEventListener("change", function() {
      const selectedAuthor = authorsDropdown.value;
      if (selectedAuthor) {
          loadQuotesByAuthor(selectedAuthor);
      }
  });

  // Обработчик кнопки случайные цитаты
  randomQuotesButton.addEventListener("click", loadRandomQuotes);

  // Загрузка случайных цитат при загрузке страницы
  loadRandomQuotes();
});
