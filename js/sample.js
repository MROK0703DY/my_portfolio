// Функционал для скрытия рекламы на 1 минуту при клике на кнопки
document.addEventListener("DOMContentLoaded", function () {
  // Элементы рекламы
  const adSidebar = document.querySelector(".ad-sidebar");
  const adItems = document.querySelectorAll(".ad-item");
  const adFreeContainer = document.querySelector(".ad-free-container");

  // Кнопки
  const dayPassBtn = document.querySelector(".ad-btn.day-pass");
  const monthPassBtn = document.querySelector(".ad-btn.month-pass");

  // Ключи для localStorage
  const AD_HIDDEN_KEY = "ad_hidden_until";
  const AD_HIDDEN_DURATION = 60 * 1000; // 1 минута в миллисекундах

  // Проверяем, скрыта ли реклама по таймеру
  function checkAdHiddenStatus() {
    const hiddenUntil = localStorage.getItem(AD_HIDDEN_KEY);

    if (hiddenUntil) {
      const currentTime = new Date().getTime();
      const hiddenUntilTime = parseInt(hiddenUntil, 10);

      if (currentTime < hiddenUntilTime) {
        // Реклама всё ещё скрыта
        hideAds();
        // Устанавливаем таймер для показа рекламы
        const timeLeft = hiddenUntilTime - currentTime;
        setTimeout(showAds, timeLeft);
        return true;
      } else {
        // Время истекло, удаляем запись
        localStorage.removeItem(AD_HIDDEN_KEY);
      }
    }
    return false;
  }

  // Скрыть рекламу
  function hideAds() {
    if (adSidebar) {
      adSidebar.style.display = "none";
    }

    // Также можно скрыть отдельные рекламные блоки, если нужно
    adItems.forEach((item) => {
      item.style.display = "none";
    });

    if (adFreeContainer) {
      adFreeContainer.style.display = "none";
    }
  }

  // Показать рекламу
  function showAds() {
    if (adSidebar) {
      adSidebar.style.display = "block";
    }

    adItems.forEach((item) => {
      item.style.display = "block";
    });

    if (adFreeContainer) {
      adFreeContainer.style.display = "block";
    }

    // Удаляем запись из localStorage
    localStorage.removeItem(AD_HIDDEN_KEY);
  }

  // Функция для скрытия рекламы на 1 минуту
  function hideAdsForOneMinute() {
    const currentTime = new Date().getTime();
    const hiddenUntil = currentTime + AD_HIDDEN_DURATION;

    // Сохраняем время, до которого реклама скрыта
    localStorage.setItem(AD_HIDDEN_KEY, hiddenUntil.toString());

    // Скрываем рекламу
    hideAds();

    // Устанавливаем таймер для показа рекламы через 1 минуту
    setTimeout(showAds, AD_HIDDEN_DURATION);

    // Показываем уведомление пользователю
    showNotification("Реклама скрыта на 1 минуту");
  }

  // Показать уведомление
  function showNotification(message) {
    // Создаём элемент уведомления
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
        `;

    // Добавляем стили для анимации
    const style = document.createElement("style");
    style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(-20px); }
            }
        `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }

  // Добавляем обработчики кликов на обе кнопки
  if (dayPassBtn) {
    dayPassBtn.addEventListener("click", hideAdsForOneMinute);
  }

  if (monthPassBtn) {
    monthPassBtn.addEventListener("click", hideAdsForOneMinute);
  }

  // Проверяем статус при загрузке страницы
  checkAdHiddenStatus();
});
