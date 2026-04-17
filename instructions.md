# Способы управления ссылками в JavaScript

## 1. Использование объекта в JS (самый простой)

Вы создаете центральный список ссылок и присваиваете их элементам через JavaScript.

### Шаг 1: Подготовьте HTML

Добавьте ссылкам уникальные идентификаторы (id) или специальные классы.

```html
<a id="link-github" href="#">Мой GitHub</a>
<a id="link-telegram" href="#">Telegram</a>
```

### Шаг 2: Создайте JS-логику

Создайте файл links.js (или добавьте в имеющийся) и пропишите соответствия:

```javascript
const myLinks = {
    github: "https://github.com",
    telegram: "https://t.me",
    portfolio: "https://my-site.com"
};

// Функция для обновления всех ссылок на странице
function updateLinks() {
    document.getElementById('link-github').href = myLinks.github;
    document.getElementById('link-telegram').href = myLinks.telegram;
}

// Запускаем при загрузке страницы
window.onload = updateLinks;
```

---

### 2. Использование атрибута data-* (автоматизация)

Чтобы не прописывать document.getElementById для каждой ссылки, можно использовать data- атрибуты. Это более «профессиональный» подход.

### Шаг 1: HTML с атрибутами

```html
<a data-link="github" href="#">GitHub</a>
<a data-link="linkedin" href="#">LinkedIn</a>
```

### Шаг 2: Универсальный скрипт

```javascript
const linksMap = {
    github: "https://github.com",
    linkedin: "https://linkedin.com"
};

// Находим все элементы с атрибутом data-link и меняем им href
document.querySelectorAll('[data-link]').forEach(el => {
    const key = el.getAttribute('data-link');
    if (linksMap[key]) {
        el.href = linksMap[key];
    }
});
```

---

### 3. Вынос в отдельный JSON

Если вы хотите хранить ссылки в отдельном «файле конфигурации» (по аналогии с .env или .json в Python), можно сделать так:

### Шаг 1: Файл config.json

```json
{
  "github": "https://github.com",
  "contactEmail": "mailto:example@me.com"
}
```

### Шаг 2: Загрузка через fetch

```javascript
async function loadConfig() {
    const response = await fetch('./config.json');
    const links = await response.json();
    
    document.querySelector('.github-link').href = links.github;
}

loadConfig();
```

---

### 4. Вынос в отдельный JS-файл

Использование модульной системы для разделения данных и логики.

### Шаг 1: Файл links.js

```javascript
const links = {
    github: "https://github.com",
    contactEmail: "mailto:example@me.com"
};

export default links;
```

### Шаг 2: Загрузка через import

```javascript
import links from './links.js';

document.querySelector('.github-link').href = links.github;
```

---

## 💡 Какой способ выбрать?

* **Способ 1**: Хорош для пары ссылок.
* **Способ 2**: Идеален для портфолио, где одна и та же ссылка (например, на Telegram) может встречаться и в шапке, и в подвале.
* **Способ 3**: Лучше всего, если ссылок очень много или вы планируете менять их, не заходя в основной JS-код.

> **Совет**: Теперь, чтобы сменить ссылку во всем портфолио, вам достаточно будет изменить одну строчку в одном файле. Если у вас многостраничный сайт, просто подключите этот файл ко всем страницам сразу.
