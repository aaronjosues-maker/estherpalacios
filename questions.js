// New "flashcard" lessons for learning basics
export const alphabet_1 = {
    type: 'flashcard',
    title: 'Aprendamos el Alfabeto (A-M)',
    cards: [
        { main: 'A a', pronunciation: '[ei]', example: 'Apple' },
        { main: 'B b', pronunciation: '[bi]', example: 'Boy' },
        { main: 'C c', pronunciation: '[si]', example: 'Cat' },
        { main: 'D d', pronunciation: '[di]', example: 'Dog' },
        { main: 'E e', pronunciation: '[i]', example: 'Elephant' },
        { main: 'F f', pronunciation: '[ef]', example: 'Fish' },
        { main: 'G g', pronunciation: '[yi]', example: 'Girl' },
        { main: 'H h', pronunciation: '[eich]', example: 'House' },
        { main: 'I i', pronunciation: '[ai]', example: 'Ice cream' },
        { main: 'J j', pronunciation: '[yei]', example: 'Juice' },
        { main: 'K k', pronunciation: '[kei]', example: 'Kite' },
        { main: 'L l', pronunciation: '[el]', example: 'Lion' },
        { main: 'M m', pronunciation: '[em]', example: 'Monkey' },
    ]
};

export const alphabet_2 = {
    type: 'flashcard',
    title: 'Aprendamos el Alfabeto (N-Z)',
    cards: [
        { main: 'N n', pronunciation: '[en]', example: 'Nose' },
        { main: 'O o', pronunciation: '[ou]', example: 'Orange' },
        { main: 'P p', pronunciation: '[pi]', example: 'Pig' },
        { main: 'Q q', pronunciation: '[kiu]', example: 'Queen' },
        { main: 'R r', pronunciation: '[ar]', example: 'Rabbit' },
        { main: 'S s', pronunciation: '[es]', example: 'Sun' },
        { main: 'T t', pronunciation: '[ti]', example: 'Table' },
        { main: 'U u', pronunciation: '[iu]', example: 'Umbrella' },
        { main: 'V v', pronunciation: '[vi]', example: 'Violin' },
        { main: 'W w', pronunciation: '[dabel iu]', example: 'Watch' },
        { main: 'X x', pronunciation: '[eks]', example: 'Xylophone' },
        { main: 'Y y', pronunciation: '[uai]', example: 'Yoyo' },
        { main: 'Z z', pronunciation: '[zi]', example: 'Zebra' },
    ]
};

function numberToWords(n){
  const small = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
  const tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
  if (n < 20) return small[n];
  if (n < 100) return tens[Math.floor(n/10)] + (n%10 ? '-' + small[n%10] : '');
  if (n === 100) return 'one hundred';
  return String(n);
}

export const numbers_0_to_100 = {
  type: 'flashcard',
  title: 'Números (0-100)',
  cards: Array.from({length: 101}, (_, i) => ({ main: `${i} - ${numberToWords(i)}`, pronunciation: `[${numberToWords(i)}]` }))
};

export const numbers_1_to_20 = {
    type: 'flashcard',
    title: 'Aprendamos los Números (1-20)',
    cards: [
        { main: '1 - One', pronunciation: '[uan]' }, { main: '2 - Two', pronunciation: '[tu]' },
        { main: '3 - Three', pronunciation: '[zri]' }, { main: '4 - Four', pronunciation: '[for]' },
        { main: '5 - Five', pronunciation: '[faiv]' }, { main: '6 - Six', pronunciation: '[six]' },
        { main: '7 - Seven', pronunciation: '[seven]' }, { main: '8 - Eight', pronunciation: '[eit]' },
        { main: '9 - Nine', pronunciation: '[nain]' }, { main: '10 - Ten', pronunciation: '[ten]' },
        { main: '11 - Eleven', pronunciation: '[eleven]' }, { main: '12 - Twelve', pronunciation: '[tuelf]' },
        { main: '13 - Thirteen', pronunciation: '[zortin]' }, { main: '14 - Fourteen', pronunciation: '[fortin]' },
        { main: '15 - Fifteen', pronunciation: '[fiftin]' }, { main: '16 - Sixteen', pronunciation: '[sixtin]' },
        { main: '17 - Seventeen', pronunciation: '[seventin]' }, { main: '18 - Eighteen', pronunciation: '[eitin]' },
        { main: '19 - Nineteen', pronunciation: '[naintin]' }, { main: '20 - Twenty', pronunciation: '[tuenti]' },
    ]
};

export const colors = {
    type: 'flashcard',
    title: 'Colores (Inglés - Español)',
    cards: [
        { main: 'Red - Rojo', pronunciation: '[red]' },
        { main: 'Blue - Azul', pronunciation: '[blu]' },
        { main: 'Green - Verde', pronunciation: '[grin]' },
        { main: 'Yellow - Amarillo', pronunciation: '[yel-oh]' },
        { main: 'Black - Negro', pronunciation: '[blak]' },
        { main: 'White - Blanco', pronunciation: '[wait]' },
        { main: 'Orange - Naranja', pronunciation: '[or-inch]' },
        { main: 'Purple - Morado', pronunciation: '[per-pul]' },
        { main: 'Pink - Rosado', pronunciation: '[pink]' },
        { main: 'Brown - Marrón', pronunciation: '[braun]' }
    ]
};

export const lesson1 = [
    {
        type: 'multiple-choice-image',
        prompt: "¿Cuál es 'the apple'?",
        options: [
            { image: 'boy.png', text: 'the boy', translation: 'el niño', isCorrect: false },
            { image: 'apple.png', text: 'the apple', translation: 'la manzana', isCorrect: true },
            { image: 'house.png', text: 'the house', translation: 'la casa', isCorrect: false },
            { image: 'girl.png', text: 'the girl', translation: 'la niña', isCorrect: false },
        ]
    },
    {
        type: 'multiple-choice-image',
        prompt: "¿Cuál es 'the house'?",
        options: [
            { image: 'boy.png', text: 'the boy', translation: 'el niño', isCorrect: false },
            { image: 'apple.png', text: 'the apple', translation: 'la manzana', isCorrect: false },
            { image: 'house.png', text: 'the house', translation: 'la casa', isCorrect: true },
            { image: 'girl.png', text: 'the girl', translation: 'la niña', isCorrect: false },
        ]
    },
    {
        type: 'multiple-choice-image',
        prompt: "¿Cuál es 'the boy'?",
        options: [
            { image: 'house.png', text: 'the house', translation: 'la casa', isCorrect: false },
            { image: 'girl.png', text: 'the girl', translation: 'la niña', isCorrect: false },
            { image: 'apple.png', text: 'the apple', translation: 'la manzana', isCorrect: false },
            { image: 'boy.png', text: 'the boy', translation: 'el niño', isCorrect: true },
        ]
    },
    {
        type: 'multiple-choice-image',
        prompt: "¿Cuál es 'the girl'?",
        options: [
            { image: 'girl.png', text: 'the girl', translation: 'la niña', isCorrect: true },
            { image: 'house.png', text: 'the house', translation: 'la casa', isCorrect: false },
            { image: 'apple.png', text: 'the apple', translation: 'la manzana', isCorrect: false },
            { image: 'boy.png', text: 'the boy', translation: 'el niño', isCorrect: false },
        ]
    },
    {
        type: 'multiple-choice-text',
        prompt: "Traduce 'la casa'",
        options: [
            { text: 'The boy', translation: 'el niño', isCorrect: false },
            { text: 'The apple', translation: 'la manzana', isCorrect: false },
            { text: 'The house', translation: 'la casa', isCorrect: true },
        ]
    },
    {
        type: 'multiple-choice-text',
        prompt: "Traduce 'la manzana'",
        options: [
            { text: 'The girl', translation: 'la niña', isCorrect: false },
            { text: 'The apple', translation: 'la manzana', isCorrect: true },
            { text: 'The house', translation: 'la casa', isCorrect: false },
        ]
    },
    {
        type: 'multiple-choice-text',
        prompt: "Traduce 'el niño'",
        options: [
            { text: 'The boy', translation: 'el niño', isCorrect: true },
            { text: 'The apple', translation: 'la manzana', isCorrect: false },
            { text: 'The girl', translation: 'la niña', isCorrect: false },
        ]
    },
    {
        type: 'fill-in',
        prompt: "Completa: 'I have ___ apples.' (Yo tengo 2 manzanas)",
        answer: "two",
        hint: "Número en inglés"
    }
];

export const lesson2 = [
    {
        type: 'multiple-choice-text',
        prompt: "Traduce 'Yo soy un niño'",
        options: [
            { text: 'I am a girl', translation: 'Yo soy una niña', isCorrect: false },
            { text: 'I am a boy', translation: 'Yo soy un niño', isCorrect: true },
            { text: 'He is a boy', translation: 'Él es un niño', isCorrect: false },
        ]
    },
    {
        type: 'multiple-choice-text',
        prompt: "Traduce 'Ella es una niña'",
        options: [
            { text: 'She is a girl', translation: 'Ella es una niña', isCorrect: true },
            { text: 'I am a girl', translation: 'Yo soy una niña', isCorrect: false },
            { text: 'She is a house', translation: 'Ella es una casa', isCorrect: false },
        ]
    },
     {
        type: 'multiple-choice-text',
        prompt: "Traduce 'Yo como una manzana'",
        options: [
            { text: 'I am an apple', translation: 'Yo soy una manzana', isCorrect: false },
            { text: 'She eats an apple', translation: 'Ella come una manzana', isCorrect: false },
            { text: 'I eat an apple', translation: 'Yo como una manzana', isCorrect: true },
        ]
    },
    {
        type: 'multiple-choice-image',
        prompt: "'I eat an apple'",
        options: [
            { image: 'boy.png', text: 'the boy', translation: 'el niño', isCorrect: false },
            { image: 'apple.png', text: 'the apple', translation: 'la manzana', isCorrect: true },
            { image: 'girl.png', text: 'the girl', translation: 'la niña', isCorrect: false },
        ]
    },
];

export const lesson3 = [
    {
        type: 'multiple-choice-text',
        prompt: "Traduce 'El come'",
        options: [
            { text: 'He eats', translation: 'Él come', isCorrect: true },
            { text: 'She eats', translation: 'Ella come', isCorrect: false },
            { text: 'I eat', translation: 'Yo como', isCorrect: false },
        ]
    },
    {
        type: 'multiple-choice-text',
        prompt: "Traduce 'Nosotros somos niños'",
        options: [
            { text: 'They are boys', translation: 'Ellos son niños', isCorrect: false },
            { text: 'We are girls', translation: 'Nosotras somos niñas', isCorrect: false },
            { text: 'We are boys', translation: 'Nosotros somos niños', isCorrect: true },
        ]
    },
    {
        type: 'multiple-choice-text',
        prompt: "Traduce 'Ellas comen manzanas'",
        options: [
            { text: 'They eat apples', translation: 'Ellas/Ellos comen manzanas', isCorrect: true },
            { text: 'We eat apples', translation: 'Nosotros comemos manzanas', isCorrect: false },
            { text: 'She eats an apple', translation: 'Ella come una manzana', isCorrect: false },
        ]
    }
];

export const lesson4 = [
    {
        type: 'multiple-choice-text',
        prompt: "¿Cómo se dice 'rojo' en inglés?",
        options: [
            { text: 'Blue', translation: 'Azul', isCorrect: false },
            { text: 'Red', translation: 'Rojo', isCorrect: true },
            { text: 'Green', translation: 'Verde', isCorrect: false },
        ]
    },
    {
        type: 'multiple-choice-text',
        prompt: "The house is ____. (azul)",
        options: [
            { text: 'red', translation: 'roja', isCorrect: false },
            { text: 'green', translation: 'verde', isCorrect: false },
            { text: 'blue', translation: 'azul', isCorrect: true },
        ]
    },
];

export const mixed_letters_numbers = [{type:'multiple-choice-text',prompt:"¿Cuál letra es 'B'?",options:[{text:'A',translation:'a',isCorrect:false},{text:'B',translation:'be',isCorrect:true},{text:'C',translation:'ce',isCorrect:false}]},{type:'fill-in',prompt:"Completa: 'I have ___ apples.' (Yo tengo 3 manzanas)",answer:"three",hint:"Número en inglés"}];

export const numbers_21_40 = [{type:'fill-in',prompt:"Escribe en inglés: 25",answer:"twenty-five",hint:"veinticinco"},{type:'multiple-choice-text',prompt:"¿Cuál es '30' en inglés?",options:[{text:'Thirty',translation:'treinta',isCorrect:true},{text:'Thirteen',translation:'trece',isCorrect:false},{text:'Thirty one',translation:'treinta y uno',isCorrect:false}]}];

export const alphabet_quiz = [{type:'multiple-choice-text',prompt:"¿Cuál es la primera letra del abecedario inglés?",options:[{text:'A',translation:'a',isCorrect:true},{text:'B',translation:'be',isCorrect:false},{text:'Z',translation:'zi',isCorrect:false}]},{type:'multiple-choice-text',prompt:"¿Cómo se pronuncia 'G'?",options:[{text:'gee',translation:'gue',isCorrect:true},{text:'guh',translation:'guh',isCorrect:false},{text:'jay',translation:'jay',isCorrect:false}]}];

export const colors_quiz_extended = [{type:'multiple-choice-text',prompt:"¿Cuál es 'amarillo' en inglés?",options:[{text:'Blue',translation:'azul',isCorrect:false},{text:'Yellow',translation:'amarillo',isCorrect:true},{text:'Green',translation:'verde',isCorrect:false}]},{type:'fill-in',prompt:"Completa: 'The ball is ___.' (La pelota es roja)",answer:"red",hint:"color en inglés"}];

export const sentence_mix_2 = [{type:'multiple-choice-text',prompt:"Traduce: 'Ella come una manzana'",options:[{text:'She eats an apple',translation:'Ella come una manzana',isCorrect:true},{text:'He eats an apple',translation:'Él come una manzana',isCorrect:false},{text:'She read a book',translation:'Ella lee un libro',isCorrect:false}]},{type:'fill-in',prompt:"Completa: 'I ___ to school.' (Yo voy a la escuela)",answer:"go",hint:"verbo: ir"}];

export const challenge_mixed = [
  {type:'multiple-choice-image',prompt:"¿Cuál es 'the apple'?",options:[{image:'boy.png',text:'the boy',translation:'el niño',isCorrect:false},{image:'apple.png',text:'the apple',translation:'la manzana',isCorrect:true},{image:'house.png',text:'the house',translation:'la casa',isCorrect:false}]},
  {type:'multiple-choice-text',prompt:"What is 18 in English?",options:[{text:'Eighteen',translation:'dieciocho',isCorrect:true},{text:'Eightteen',translation:'ocho',isCorrect:false},{text:'Eighty',translation:'ochenta',isCorrect:false}]},
  {type:'fill-in',prompt:"Completa: 'They ___ soccer every Sunday.' (Ellos juegan fútbol)",answer:"play",hint:"verbo: jugar"}
];

export const sentence_completion = [
    { type: 'fill-in', prompt: "Completa: I ___ an apple. (Yo como una manzana)", answer: "eat", hint: "verbo: comer" },
    { type: 'fill-in', prompt: "Completa: She ___ a book. (Ella lee un libro)", answer: "reads", hint: "verbo: leer (3ª persona)" },
    { type: 'fill-in', prompt: "Completa: They ___ soccer. (Ellos juegan fútbol)", answer: "play", hint: "verbo: jugar" },
    { type: 'fill-in', prompt: "Completa: We ___ to music. (Nosotros escuchamos música)", answer: "listen", hint: "verbo: escuchar" }
];

export const lessons = [
    alphabet_1,
    alphabet_2,
    numbers_0_to_100,
    numbers_1_to_20,
    colors,
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    sentence_completion,
    mixed_letters_numbers,
    numbers_21_40,
    alphabet_quiz,
    colors_quiz_extended,
    sentence_mix_2,
    challenge_mixed
];