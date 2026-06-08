# Лабораторна робота 1

## Тема
Реалізація базової двосторонньої комунікації в реальному часі для вебзастосунку Collaborative Grid засобами Python, Flask та Flask-SocketIO.

## Що зроблено
- Створено Flask-застосунок з маршрутом `GET /`.
- Додано Flask-SocketIO для WebSocket-комунікації.
- Реалізовано поле 100x60, яке зберігається в пам'яті сервера.
- Додано події `state_init`, `toggle_cell`, `cell_updated`, `server_error`.
- Реалізовано серверну перевірку координат.
- Додано клієнтський інтерфейс для кліків по клітинках.

## Команди запуску
```powershell
cd C:\Users\kazuto\Desktop\labs_for_git\lab1
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Відкрити: `http://127.0.0.1:5000`

## Команди для звіту та скрінів
```powershell
cd C:\Users\kazuto\Desktop\labs_for_git\lab1
.\.venv\Scripts\activate
python app.py
```

Скріни для звіту: головна сторінка з полем 100x60; дві вкладки після кліку по клітинці; результат перевірки синхронізації.

## Git
```powershell
git init
git add .
git commit -m "Лабораторна робота 1: real-time Collaborative Grid"
```
