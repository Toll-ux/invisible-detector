# InvisibleDetector

---
## О проекте
Простое веб-приложение, которое позволяет убрать или добавить невидимые символы в текст

---
## Файлы
```
invisible-detector/
├── index.html                  ← главная
├── invisible-detector.html     ← основной интерфейс
├── how-it-works-about.html     ← описание проекта
├── faq.html                    ← ответы на вопросы
├── css/
│   └── style.css               ← стили
└── js/
    ├── detector.js             ← логика Unicode 
    ├── main.js                 ← утилиты 
    └── nav.js                  ← навигация
```

---
## API detector.js
Логика проекта в этих функциях
```js
const result = Detector.analyzeText(myText);
const clean = Detector.removeInvisible(myText);
const html = Detector.highlightInvisible(myText);
const encoded_text = Detector.encode(mySymbol, myText);
const decoded_text = Detector.decode(myText);
```
---
## Пхожие проекты
* https://www.soscisurvey.de/tools/view-chars.php - сайтик, который находит unicode
* https://utf8-chartable.de/unicode-utf8-table.pl - Таблица кодировки UTF-8 и символы Unicode
* https://www.branah.com/unicode-converter - конвертер unicode
* https://originality.ai/blog/invisible-text-detector-remover - инструмент для поиска и удаления всех скрытых
символов Юникода в вашем тексте
* https://emoji-encoder.vercel.app/?mode=encode - спрятать/расшифровать скрытые символы

---
## Ведьмочки с ключом на 9
**Группа:** МЕН-150206
*   Алексеев Георгий
*   Власов Елисей
*   Долгушин Константин
*   Мальцев Дмитрий
*   Мухачёв Александр
---