# InvisibleDetector 🔍

## Файлы

```
invisible-detector/
├── index.html
├── detector.html
├── how-it-works.html
├── faq.html
├── about.html
├── css/
│   └── style.css       
└── js/
    ├── detector.js      ← логика Unicode 
    ├── main.js          ← утилиты 
    └── nav.js           ← навигация
```

## Запуск

Просто откройте `index.html` в браузере.


## API detector.js

```js
// Анализ
const result = Detector.analyzeText(text);
// result.found, result.totalInvisible, result.isClean

// Удаление
const clean = Detector.removeInvisible(text);

// Подсветка HTML
const html = Detector.highlightInvisible(text);

// Добавить шум
const noisy = Detector.addNoise(text, 0.05);
```
