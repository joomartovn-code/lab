// ===== Главная: фраза дня =====
let phrases = [
    'Не останавливайся!',
    'Каждый день - шаг к цели',
    'Сегодня лучше, чем вчера',
    'Тренируйся сейчас, благодари потом'
];
let phraseIndex = 0;

let phraseBtn = document.getElementById('phraseBtn');
let phraseText = document.getElementById('phraseText');

if (phraseBtn) {
    phraseBtn.addEventListener('click', function () {
        phraseIndex++;
        if (phraseIndex >= phrases.length) {
            phraseIndex = 0;
        }
        phraseText.textContent = phrases[phraseIndex];
    });
}


// ===== Тренировки: список упражнений =====
let exercises = [
    { id: 1, title: 'Приседания 3x12', completed: false },
    { id: 2, title: 'Жим лежа 3x10', completed: true }
];

let exerciseInput = document.querySelector('#exerciseInput');
let addExerciseBtn = document.querySelector('#addExerciseBtn');
let exerciseList = document.querySelector('#exerciseList');
let totalCount = document.querySelector('#totalCount');
let doneCount = document.querySelector('#doneCount');

function showExercises() {
    exerciseList.innerHTML = '';
    exercises.map(item => {
        exerciseList.innerHTML += `
            <div class="task">
                <span class="task-text ${item.completed ? 'completed' : ''}">${item.title}</span>
                <div>
                    <button onclick="doneExercise(${item.id})">✅</button>
                    <button onclick="deleteExercise(${item.id})">❌</button>
                </div>
            </div>`;
    });
    totalCount.textContent = exercises.length;
    let done = exercises.filter(item => item.completed);
    doneCount.textContent = done.length;
}

function addExercise() {
    let text = exerciseInput.value.trim();
    if (text === '') {
        alert('Введите упражнение!');
        return;
    }
    let newExercise = {
        id: Date.now(),
        title: text,
        completed: false
    };
    exercises.push(newExercise);
    exerciseInput.value = '';
    showExercises();
}

function doneExercise(id) {
    let item = exercises.find(item => item.id === id);
    if (item) {
        item.completed = !item.completed;
    }
    showExercises();
}

function deleteExercise(id) {
    exercises = exercises.filter(item => item.id !== id);
    showExercises();
}

if (addExerciseBtn) {
    addExerciseBtn.addEventListener('click', addExercise);
    showExercises();
}


// ===== Питание: калькулятор ИМТ =====
function calcBMI() {
    let weight = Number(document.getElementById('weight').value);
    let height = Number(document.getElementById('height').value);

    if (weight <= 0 || height <= 0) {
        alert('Введите вес и рост!');
        return;
    }

    let h = height / 100;
    let bmi = weight / (h * h);
    let text;

    if (bmi < 18.5) {
        text = 'Недостаток веса';
    } else if (bmi < 25) {
        text = 'Норма';
    } else if (bmi < 30) {
        text = 'Избыточный вес';
    } else {
        text = 'Ожирение';
    }

    document.getElementById('bmiResult').innerHTML = `
        <p>Ваш ИМТ: ${bmi.toFixed(1)}</p>
        <p>${text}</p>
    `;
}


// ===== Тренеры: массив объектов + фильтр =====
let trainers = [
    { name: 'Азамат Токтогулов', type: 'Силовые', info: 'Набор массы, работа со штангой', img: 'images/trainer-1.svg' },
    { name: 'Айгерим Сыдыкова', type: 'Йога', info: 'Йога и стретчинг', img: 'images/trainer-2.svg' },
    { name: 'Тимур Каримов', type: 'Кроссфит', info: 'Функциональный тренинг', img: 'images/trainer-3.svg' },
    { name: 'Элина Асанова', type: 'Силовые', info: 'Похудение и питание', img: 'images/trainer-4.svg' },
    { name: 'Нурлан Эсенов', type: 'Йога', info: 'Растяжка и дыхание', img: 'images/trainer-5.svg' }
];

function showTrainers(type) {
    let list = document.getElementById('trainerList');
    list.innerHTML = '';

    let result = trainers;
    if (type !== 'Все') {
        result = trainers.filter(t => t.type === type);
    }

    result.forEach(t => {
        let div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `<img class="avatar" src="${t.img}" alt="${t.name}"><h3>${t.name}</h3><p>Направление: ${t.type}</p><p>${t.info}</p>`;
        list.appendChild(div);
    });
}

if (document.getElementById('trainerList')) {
    showTrainers('Все');
}


// ===== Цены: расчет стоимости =====
function calcPrice() {
    let months = Number(document.getElementById('months').value);
    let pricePerMonth = 2000;

    if (months <= 0) {
        alert('Введите количество месяцев!');
        return;
    }

    let total = pricePerMonth * months;
    let discount = 0;

    if (months >= 12) {
        discount = 20;
    } else if (months >= 3) {
        discount = 10;
    }

    let finalPrice = total - total * discount / 100;

    document.getElementById('priceResult').innerHTML = `
        <p>Без скидки: ${total} сом</p>
        <p>Скидка: ${discount}%</p>
        <p><b>К оплате: ${finalPrice} сом</b></p>
    `;
}


// ===== Галерея: события мыши =====
let pads = document.querySelectorAll('.pad');
let galleryLog = document.getElementById('galleryLog');

pads.forEach(pad => {
    pad.addEventListener('click', () => {
        pad.style.borderColor = '#f0cf6b';
        galleryLog.textContent = 'Событие: click (' + pad.textContent + ')';
    });

    pad.addEventListener('dblclick', () => {
        pad.style.transform = 'scale(1.05)';
        galleryLog.textContent = 'Событие: dblclick (' + pad.textContent + ')';
    });

    pad.addEventListener('mouseenter', () => {
        pad.style.borderColor = '#d4af37';
        galleryLog.textContent = 'Событие: mouseenter (' + pad.textContent + ')';
    });

    pad.addEventListener('mouseleave', () => {
        pad.style.borderColor = '#333';
        pad.style.transform = 'scale(1)';
        galleryLog.textContent = 'Событие: mouseleave (' + pad.textContent + ')';
    });
});


// ===== Контакты: проверка формы =====
let contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let name = document.getElementById('name').value.trim();
        let phone = document.getElementById('phone').value.trim();

        if (name === '' || phone === '') {
            alert('Заполните имя и телефон!');
        } else {
            document.getElementById('formResult').innerHTML = `
                <h3>Заявка отправлена</h3>
                <p>Спасибо, ${name}! Мы позвоним на номер ${phone}.</p>
            `;
            contactForm.reset();
        }
    });
}


// ===== Блог: данные с сервера (fetch) =====
async function loadPosts() {
    let box = document.getElementById('postList');
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');

        if (!response.ok) {
            throw new Error(`Ошибка сервера ${response.status}`);
        }

        let posts = await response.json();
        box.innerHTML = '';

        posts.forEach(post => {
            box.innerHTML += `<div class="card"><h3>${post.title}</h3><p>${post.body}</p></div>`;
        });
    } catch (error) {
        box.innerHTML = '<p>Не удалось загрузить посты!</p>';
        console.error(error);
    }
}

if (document.getElementById('postList')) {
    loadPosts();
}



// ===== Меню для телефонов =====
let burger = document.getElementById('burger');
let menu = document.getElementById('menu');

burger.addEventListener('click', () => {
    menu.classList.toggle('open');
});
