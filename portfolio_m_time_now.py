from datetime import datetime, date

# 1. Получение текущей даты и времени
now = datetime.now()
print(f"\033[1;31m Текущие дата и время: {now} \033[0m")  # Выведет что-то
# вроде: 2025-12-07 10:30:00.123456
print()

# 2. Получение только текущей даты
today = date.today()
# Используем формат %d-%m-%Y для обратного порядка
reversed_date = today.strftime("%d-%m-%Y")
print(f"Текущая дата: {reversed_date}")

print()
print(f"Только сегодняшняя дата: {today}")  # Выведет: 2025-12-07

# 3. Форматирование даты в строку (например, в ДД.ММ.ГГГГ)
# %d - день, %m - месяц, %Y - год (полностью)
formatted_date_ru = today.strftime("%d.%m.%Y")
print(f"Дата в формате ДД.ММ.ГГГГ: {formatted_date_ru}")  # Выведет: 07.12.2025

# 4. Форматирование в международный стандарт ISO 8601 (YYYY-MM-DD)
formatted_date_iso = today.isoformat()  # или today.strftime("%Y-%m-%d")
print(f"Дата в формате ISO 8601: {formatted_date_iso}")  # Выведет: 2025-12-07

# 5. Форматирование с полным названием месяца
formatted_date_full = today.strftime("%d %B %Y   %A")
# %B для полного названия месяца (зависит от локали)
print()
print(f"\033[1;31m Дата с названием месяца: {formatted_date_full} \033[0m")
print(f"\033[1;31m Текущее время: {now.strftime('%H:%M:%S')} \033[0m")# Выведет: 07 December 2025
