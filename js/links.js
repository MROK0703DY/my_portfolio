console.log("links.js loaded");
// Функция для загрузки конфига
async function loadConfig() {
  try {
    // Читаем файл
    const response = await fetch("config.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const config = await response.json();

    // Находим элемент в HTML и меняем ему атрибут href
    const oneElement = document.getElementById("my-gh");
    if (oneElement) oneElement.href = config.github;

    const twoElement = document.getElementById("my-gl");
    if (twoElement) twoElement.href = config.gitlub;

    const threeElement = document.getElementById("my-sc");
    if (threeElement) threeElement.href = config.sourcecraft;

    const fourElement = document.getElementById("my-gv");
    if (fourElement) fourElement.href = config.gitverse;

    const fiveElement = document.getElementById("my-vk");
    if (fiveElement) fiveElement.href = config.vk;

    console.log("Конфигурация загружена успешно!");
  } catch (error) {
    console.error("Ошибка загрузки конфига:", error);
    // Устанавливаем значения по умолчанию (пути к изображениям) в случае ошибки
    const defaultConfig = {
      github: "img/2026/github.png",
      gitlub: "img/2026/gitlub.png",
      sourcecraft: "img/2026/sourcecraft.png",
      gitverse: "img/2026/gitverse.png",
      vk: "img/2026/vk.png",
    };
    const oneElement = document.getElementById("my-gh");
    if (oneElement) oneElement.href = defaultConfig.github;
    const twoElement = document.getElementById("my-gl");
    if (twoElement) twoElement.href = defaultConfig.gitlub;
    const threeElement = document.getElementById("my-sc");
    if (threeElement) threeElement.href = defaultConfig.sourcecraft;
    const fourElement = document.getElementById("my-gv");
    if (fourElement) fourElement.href = defaultConfig.gitverse;
    const fiveElement = document.getElementById("my-vk");
    if (fiveElement) fiveElement.href = defaultConfig.vk;
    console.log("Использованы значения по умолчанию.");
  }
}

// Запускаем функцию после полной загрузки DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadConfig);
} else {
  // DOM уже загружен
  loadConfig();
}
