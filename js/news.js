// Переключение между темами

let page = document.querySelector(".page");
let themeButton = document.querySelector(".theme-button");
themeButton.onclick = function () {
  page.classList.toggle("light-theme");
  page.classList.toggle("dark-theme");
};


// Получаем ссылки на элементы
const emailInput = document.getElementById('emailInput');
const copyButton = document.getElementById('copyButton');
const outputParagraph = document.getElementById('resultP');

// Функция для вставки email в параграф
function copyEmail() {
  // Получаем значение из поля ввода
  const emailValue = emailInput.value;

  // Устанавливаем значение в <p>
  alert("Подписка прошла успешно!");
  outputParagraph.innerHTML = emailValue;
}

// Добавляем обработчик события на клик кнопки
copyButton.addEventListener('click', copyEmail);


setTimeout(() => {
  var a = location.search.substr(1);
  alert(a.replace("%40", "@"));
  console.log(a.replace("%40", "@"));
  document.getElementById("resultOutput").innerHTML = a.replace("%40", "@");
}, 3000);

document.getElementById("resultOutput").onclick = function() {
  this.style.display = 'none'; // Скрывает элемент, устанавливая display: none
};


