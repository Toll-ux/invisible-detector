//Тут прямо все мясо

// Variation selectors block https://unicode.org/charts/nameslist/n_FE00.html
// VS1..=VS16
const VARIATION_SELECTOR_START = 0xfe00;
const VARIATION_SELECTOR_END = 0xfe0f;

// Variation selectors supplement https://unicode.org/charts/nameslist/n_E0100.html
// VS17..=VS256
const VARIATION_SELECTOR_SUPPLEMENT_START = 0xe0100;
const VARIATION_SELECTOR_SUPPLEMENT_END = 0xe01ef;

function toVariationSelector(byte) {
  if (byte >= 0 && byte < 16) {
    return String.fromCodePoint(VARIATION_SELECTOR_START + byte)
  } else if (byte >= 16 && byte < 256) {
    return String.fromCodePoint(VARIATION_SELECTOR_SUPPLEMENT_START + byte - 16)
  } else {
    return null
  }
}

function fromVariationSelector(codePoint) {
  if (codePoint >= VARIATION_SELECTOR_START && codePoint <= VARIATION_SELECTOR_END) {
    return codePoint - VARIATION_SELECTOR_START
  } else if (codePoint >= VARIATION_SELECTOR_SUPPLEMENT_START && codePoint <= VARIATION_SELECTOR_SUPPLEMENT_END) {
    return codePoint - VARIATION_SELECTOR_SUPPLEMENT_START + 16
  } else {
    return null
  }
}

function encode(symbol, text) {
  // convert the string to utf-8 bytes
  const bytes = new TextEncoder().encode(text)
  let encoded = symbol

  for (const byte of bytes) {
    encoded += toVariationSelector(byte)
  }

  return encoded
}

function decode(text) {
  let decoded = []
  const chars = Array.from(text)

  for (const char of chars) {
    const codePoint = char.codePointAt(0);
    const byte = fromVariationSelector(codePoint);

    if (byte === null && decoded.length > 0) {
      break
    } else if (byte === null) {
      continue
    }

    decoded.push(byte)
  }

  let decodedArray = new Uint8Array(decoded)
  return new TextDecoder().decode(decodedArray)
}

const ALPHABET = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
];

// Table of invisible symbols
/*Очень важно помнить, что 'VS1..=VS256' - не 1 объект!!!!, поэтому char: null
* Наверно это не правильное решение, но я не знаю, как по-другому*/
const INVISIBLE_CHARS = [
  { code: 'VS1..=VS256', name: 'Variation selectors block',     char:  null,    severity: 'highest' }, // обратить пристальное!!!!!!!
  { code: 'U+200B', name: 'Нулевой пробел (ZWSP)',              char: '\u200B', severity: 'high' },
  { code: 'U+200C', name: 'Объединитель нулевой ширины (ZWNJ)', char: '\u200C', severity: 'high' },
  { code: 'U+200D', name: 'Соединитель нулевой ширины (ZWJ)',   char: '\u200D', severity: 'high' },
  { code: 'U+FEFF', name: 'Метка порядка байт / BOM',           char: '\uFEFF', severity: 'high' },
  { code: 'U+2060', name: 'Соединитель слов',                   char: '\u2060', severity: 'high' },
  { code: 'U+00AD', name: 'Мягкий перенос (SHY)',               char: '\u00AD', severity: 'medium' },
  { code: 'U+00A0', name: 'Неразрывный пробел (NBSP)',          char: '\u00A0', severity: 'medium' },
  { code: 'U+2028', name: 'Разделитель строк',                  char: '\u2028', severity: 'medium' },
  { code: 'U+2029', name: 'Разделитель абзацев',                char: '\u2029', severity: 'medium' },
  { code: 'U+180E', name: 'Разделитель монгольских гласных',    char: '\u180E', severity: 'medium' },
  { code: 'U+2061', name: 'Применение функции',                 char: '\u2061', severity: 'medium' },
  { code: 'U+2062', name: 'Невидимый знак умножения',           char: '\u2062', severity: 'medium' },
  { code: 'U+2063', name: 'Невидимый разделитель',              char: '\u2063', severity: 'medium' },
  { code: 'U+2064', name: 'Невидимый знак плюс',                char: '\u2064', severity: 'medium' },
  { code: 'U+034F', name: 'Комбинируемый заполнитель CGJ',      char: '\u034F', severity: 'medium' },
  { code: 'U+3164', name: 'Заполнитель Хангыль',                char: '\u3164', severity: 'medium' },
  { code: 'U+FFA0', name: 'Полуширокий заполнитель Хангыль',    char: '\uFFA0', severity: 'medium' },
  { code: 'U+2014', name: 'Длинное тире (Em dash)',             char: '\u2014', severity: 'low' },
  { code: 'U+2013', name: 'Среднее тире (En dash)',             char: '\u2013', severity: 'low' },
];

const NOISE_POOL = INVISIBLE_CHARS.filter(s => s.severity === 'high').map(s => s.char);

function analyzeText(text) {
  const stats = new Map();
  let totalInv = 0;
  let totalHid = 0;

  for (const ch of text) {
    const symMatch = INVISIBLE_CHARS.find(s => s.char === ch); // убрали || 0
    if (symMatch) {
      totalInv++;
      const existing = stats.get(symMatch.char);
      stats.set(symMatch.char, {
        ...symMatch,
        count: (existing?.count || 0) + 1
      });
    }

    const codePoint = ch.codePointAt(0);
    const byte = fromVariationSelector(codePoint);
    if (byte !== null) {
      totalHid++;
      const vsKey = 'VS1..=VS256';
      const existingVS = stats.get(vsKey);
      const vsMeta = INVISIBLE_CHARS.find(s => s.code === vsKey);
      stats.set(vsKey, {...vsMeta, count: (existingVS?.count || 0) + 1});
    }
  }

  const found = Array.from(stats.values()).sort((a, b) => b.count - a.count);
  const textLength = [...text].length;
  const isHidden = totalHid !== 0 ? 1 : 0;

  return {
    totalChars: textLength, totalInv, totalHid,
    typesFound: found.length + isHidden,
    cleanChars: textLength - totalInv - totalHid,
    found: found,
    isClean: found.length === 0,
  };
}


function removeInvisible(text) {
  let result = '';
  for (const ch of text) {
    const isInvisible = INVISIBLE_CHARS.some(sym => sym.char === ch);
    const codePoint = ch.codePointAt(0);
    const byte = fromVariationSelector(codePoint);

    if (!isInvisible && byte == null) {
      result += ch;
    }
  }
  return result;
}


function highlightInvisible(text) {
  let html = '';
  for (const ch of text) {
    const sym = INVISIBLE_CHARS.find(s => s.char === ch);
    if (sym) {
      const cls = sym.severity === 'high' ? 'hi-red' : sym.severity === 'medium' ? 'hi-warn' : 'hi-gray';
      html += `<mark class="${cls}" title="${sym.name} (${sym.code})">[${sym.code}]</mark>`;
    } else {
      html += ch === '<' ? '&lt;' : ch === '>' ? '&gt;' : ch === '&' ? '&amp;' : ch;
    }
  }
  return html;
}

//здесь еть скрытая ошибка внедрят символы, куда не надо и они перестают быть невидимыми
function addSymbolNoise(text, intensity = 0.1) {
  return text.split('').map(ch => {
    const codePoint = ch.codePointAt(0);
    const byte = fromVariationSelector(codePoint);
    if (Math.random() < intensity && byte == null) {
      const noise = NOISE_POOL[Math.floor(Math.random() * NOISE_POOL.length)];
      return ch + (noise || '');
    }
    return ch;
  }).join('');
}

//здесь еть скрытая ошибка внедрят символы, куда не надо и они перестают быть невидимыми
function addMessageNoise(text, intensity = 0.1, length = 5) {
  return text.split('').map(ch => {
    if (Math.random() < intensity && !(ch in INVISIBLE_CHARS)) {
      const iterations = Math.floor(Math.random() * length) + 1
      let text = '';
      for (let i = 0; i < iterations; i++) {
        const randomIndex = Math.floor(Math.random() * ALPHABET.length);
        text += ALPHABET[randomIndex];
      }
      return encode(ch, (text || ''));
    }
    return ch;
  }).join('');
}


function generateNoisySample() {
  const base = 'Этот пример текста содержит внедрённые невидимые символы Unicode для тестирования детектора.';
  const text = addSymbolNoise(base, 0.18);
  return addMessageNoise(text, 0.18);
}


async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// export to other files
window.Detector = {
  analyzeText,
  removeInvisible,
  highlightInvisible,
  generateNoisySample,
  addSymbolNoise,//нейминг говна, конечно
  addMessageNoise,//нейминг говна, конечно
  copyToClipboard,
  encode,
  decode,
};

