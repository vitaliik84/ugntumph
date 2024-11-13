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
