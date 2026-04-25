# InvisibleDetector 

# Ведьмочки с ключом на 9
Тут надо написать про нас

## Файлы

```
invisible-detector/
├── index.html
├── detector.html
├── how-it-works-about.html
├── faq.html
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
