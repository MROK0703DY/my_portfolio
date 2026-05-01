// Основной JavaScript файл для портфолио - объединенная версия
// Объединяет функциональность script.js и links.js

// Главная функция инициализации приложения
async function initApp() {
  try {
    // 1. Инициализация мобильного меню
    initMobileMenu();

    // 2. Инициализация плавной прокрутки
    initSmoothScroll();

    // 3. Инициализация отправки формы
    initContactForm();

    // 4. Инициализация анимаций при скролле
    initScrollAnimations();

    // 5. Инициализация динамического года в футере
    initCurrentYear();

    // 6. Инициализация кнопки "Наверх"
    initScrollToTopButton();

    // 7. Инициализация копирования email
    initEmailCopy();

    // 8. Инициализация подсветки активного пункта меню
    initActiveMenuHighlight();

    console.log("Приложение инициализировано успешно");
  } catch (error) {
    console.error("Критическая ошибка при инициализации:", error);
  }
}

// Функция загрузки конфига и настройки ссылок
// Мобильное меню
function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.style.display =
        navLinks.style.display === "flex" ? "none" : "flex";

      // Для мобильных устройств - вертикальное меню
      if (window.innerWidth <= 768) {
        if (navLinks.style.display === "flex") {
          navLinks.style.flexDirection = "column";
          navLinks.style.position = "absolute";
          navLinks.style.top = "100%";
          navLinks.style.left = "0";
          navLinks.style.right = "0";
          navLinks.style.backgroundColor = "white";
          navLinks.style.padding = "1rem";
          navLinks.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
          navLinks.style.gap = "1rem";
        }
      }
    });

    // Закрытие меню при клике на ссылку
    const navItems = document.querySelectorAll(".nav-links a");
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          navLinks.style.display = "none";
        }
      });
    });

    // Адаптация меню при изменении размера окна
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "row";
        navLinks.style.position = "static";
        navLinks.style.backgroundColor = "transparent";
        navLinks.style.padding = "0";
        navLinks.style.boxShadow = "none";
      } else {
        navLinks.style.display = "none";
      }
    });
  }
}

// Плавная прокрутка
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      // Если targetId не начинается с '#', это не якорная ссылка, разрешаем стандартное поведение
      if (!targetId.startsWith("#")) {
        return;
      }

      e.preventDefault();

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Форма обратной связи
function initContactForm() {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Получаем данные формы
      const formData = new FormData(this);
      const name =
        formData.get("name") || this.querySelector('input[type="text"]').value;
      const email =
        formData.get("email") ||
        this.querySelector('input[type="email"]').value;
      const message =
        formData.get("message") || this.querySelector("textarea").value;

      // Валидация
      if (!name || !email || !message) {
        showNotification("Пожалуйста, заполните все поля", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Пожалуйста, введите корректный email", "error");
        return;
      }

      // Имитация отправки
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      submitButton.textContent = "Отправка...";
      submitButton.disabled = true;

      // Имитация задержки отправки
      setTimeout(() => {
        // В реальном приложении здесь был бы fetch запрос
        console.log("Отправка формы:", { name, email, message });

        showNotification(
          "Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.",
          "success",
        );

        // Очистка формы
        this.reset();

        // Восстановление кнопки
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 1500);
    });
  }
}

// Валидация email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Уведомления
function showNotification(message, type = "info") {
  // Создаем элемент уведомления
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Стили для уведомления
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;

  // Цвета в зависимости от типа
  if (type === "success") {
    notification.style.backgroundColor = "#10b981";
  } else if (type === "error") {
    notification.style.backgroundColor = "#ef4444";
  } else {
    notification.style.backgroundColor = "#3b82f6";
  }

  // Добавляем в DOM
  document.body.appendChild(notification);

  // Удаляем через 5 секунд
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);

  // Добавляем CSS анимации
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }
}

// Анимации при скролле
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Наблюдаем за элементами для анимации
  const animateElements = document.querySelectorAll(
    ".skill-category, .project-card, .contact-item",
  );
  animateElements.forEach((element) => {
    observer.observe(element);
  });

  // Добавляем CSS для анимации
  if (!document.querySelector("#scroll-animation-styles")) {
    const style = document.createElement("style");
    style.id = "scroll-animation-styles";
    style.textContent = `
            .skill-category,
            .project-card,
            .contact-item {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }

            .skill-category.animate-in,
            .project-card.animate-in,
            .contact-item.animate-in {
                opacity: 1;
                transform: translateY(0);
            }

            .skill-category:nth-child(1) { transition-delay: 0.1s; }
            .skill-category:nth-child(2) { transition-delay: 0.2s; }
            .skill-category:nth-child(3) { transition-delay: 0.3s; }

            .project-card:nth-child(1) { transition-delay: 0.1s; }
            .project-card:nth-child(2) { transition-delay: 0.2s; }
            .project-card:nth-child(3) { transition-delay: 0.3s; }
        `;
    document.head.appendChild(style);
  }
}

// Текущий год в футере
function initCurrentYear() {
  const yearElement = document.querySelector(".footer-text");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace(
      "2024",
      currentYear,
    );
  }
}

// Подсветка активного пункта меню при скролле
function initActiveMenuHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const headerHeight = document.querySelector(".navbar").offsetHeight;

      if (scrollY >= sectionTop - headerHeight - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Добавляем стиль для активного пункта меню
  if (!document.querySelector("#active-menu-styles")) {
    const style = document.createElement("style");
    style.id = "active-menu-styles";
    style.textContent = `
        .nav-links a.active {
            color: var(--primary-color) !important;
            font-weight: 600;
        }

        .nav-links a.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);
  }
}

// Функция для копирования email
function initEmailCopy() {
  const emailElement = document.querySelector(".contact-item p");
  if (emailElement && emailElement.textContent.includes("@")) {
    emailElement.style.cursor = "pointer";
    emailElement.title = "Нажмите, чтобы скопировать";

    emailElement.addEventListener("click", function () {
      const email = this.textContent.trim();
      navigator.clipboard
        .writeText(email)
        .then(() => {
          showNotification("Email скопирован в буфер обмена!", "success");
        })
        .catch((err) => {
          console.error("Ошибка копирования:", err);
          showNotification("Не удалось скопировать email", "error");
        });
    });
  }
}

// Инициализация кнопки "Наверх"
function initScrollToTopButton() {
  const scrollToTopButton = document.getElementById("scrollToTop");

  if (!scrollToTopButton) return;

  // Показать/скрыть кнопку при прокрутке
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollToTopButton.classList.add("visible");
    } else {
      scrollToTopButton.classList.remove("visible");
    }
  });

  // Плавная прокрутка при клике
  scrollToTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Инициализация: скрыть кнопку при загрузке
  scrollToTopButton.classList.remove("visible");
}

// Запуск только после полной загрузки DOM (защита для старых браузеров)
document.addEventListener("DOMContentLoaded", initApp);
