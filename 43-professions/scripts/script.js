// Первая буква заглавная
function FirstUpperCase(str) {
    // Если есть хотябы один символ
    if (str.length !== 0) {
        return str[0].toUpperCase() + str.slice(1);
    }

    // Иначе пустая строка
    return ""
}


function renderQuestion() {
    // Рендер позицию в вопросах
    $(".js-question-counter").text(questionCounter + "/" + questions.length)

    if (questionCounter === 0) { // Если текущий вопрос 0 - это форма
        // Прячем вопросы и показываем начальную форму
        $("#form-aside").removeClass("hidden")
        $("#form-section").removeClass("hidden")
        $("#instruction-aside").addClass("hidden")
        $("#instruction-section").addClass("hidden")
        $("#instruction-section-phone").addClass("hidden")

        $("#question-section").addClass("hidden")

        // Класс для корректного отображения
        $("article").removeClass("article-content")
        $("article").removeClass("article-content-question")
        return
    } else if (questionCounter === questions.length) { // Если текущий вопрос последний
        // Прячем обычный ответ и показывает открытый
        $("#form-aside").addClass("hidden")
        $("#form-section").addClass("hidden")
        $("#question-section").removeClass("hidden")
        $(".question__section-content").addClass("hidden")
        $(".question-open__section-content").removeClass("hidden")

        // Кнопка Далее заменятеся на Завершить
        $("#button-next").addClass("hidden")
        $("#button-end").removeClass("hidden")
        return
    }


    // Если обычный вопрос 
    // Прячем начальную форму и открытый ответ
    $("#form-aside").addClass("hidden")
    $("#form-section").addClass("hidden")
    $("#instruction-aside").addClass("hidden")
    $("#instruction-section").addClass("hidden")
    $("#instruction-section-phone").addClass("hidden")

    // Класс для корректного отображения
    $("article").addClass("article-content")
    $("article").addClass("article-content-question")


    $("#question-section").removeClass("hidden")
    $(".question__section-content").removeClass("hidden")
    $(".question-open__section-content").addClass("hidden")

    // Кнопка Завершить заменятеся на Далее
    $("#button-next").removeClass("hidden")
    $("#button-end").addClass("hidden")

    $("#question-title-1").text(FirstUpperCase(questions[questionCounter].title1))
    $("#question-description-1").text(FirstUpperCase(questions[questionCounter].description1))
    $("#question-title-2").text(FirstUpperCase(questions[questionCounter].title2))
    $("#question-description-2").text(FirstUpperCase(questions[questionCounter].description2))

    // Отключаем кнопку далее
    $("#button-next").attr("disabled", "disabled")

    // Удаляем флажок
    $("#question-mark-1").removeClass("checked")
    $("#question-mark-2").removeClass("checked")

    // Если вес у первой кнопки, то ставим флажок первому вопросу и включаем кнопку далее
    if (questions[questionCounter].weight1) {
        $("#question-mark-1").addClass("checked")
        $("#button-next").removeAttr("disabled")
    }

    // Если вес у второй кнопки, то ставим флажок второму вопросу и включаем кнопку далее
    if (questions[questionCounter].weight2) {
        $("#question-mark-2").addClass("checked")
        $("#button-next").removeAttr("disabled")
    }
}




let questionCounter = 0 // Текущий вопрос

// Если информация была взята из хэша, то перебираем пока не найдем последний отвеченый вопрос
if (isQuestionsHash) {
    for (element of questions) {
        if (element.weight1 || element.weight2) {
            questionCounter = element.id + 1 // Записываем в текущий вопрос следущий вопрос после последнего ответа
        }
    }
    renderQuestion()
}


// Если пользователь валидно заполнил форму и данные сохранились в хэш, то заполняем поля
let hashUserFormData = JSON.parse(localStorage.getItem("userFormData"))
if (hashUserFormData) {
    $("#form-name").val(hashUserFormData.formName)
    $("#form-phone").val(hashUserFormData.formPhone)
    $("#form-email").val(hashUserFormData.formEmail)
    // Активируем галочку
    $("#policy").toggleClass("checked")
}


// Кнопка назад
$("#button-prev").on("click tap", () => {
    // Если вопрос больше нуля (1 - первый вопрос), то переход на нулевое поле - форма
    if (questionCounter > 0) {
        questionCounter--
        renderQuestion()
    }
})

// Кнопка вперед
$("#button-next").on("click tap", () => {
    // Если вопрос не последний
    if (questionCounter < questions.length) {
        questionCounter++
        renderQuestion()
    }
})


// Кнопка первого варивнта ответа
$("#question-1").on("click tap", () => {
    // Ставим вес ответа в первый и ставим флаг
    questions[questionCounter].weight1 = 1
    questions[questionCounter].weight2 = 0
    $("#question-mark-1").addClass("checked")
    $("#question-mark-2").removeClass("checked")

    $("#button-next").removeAttr("disabled")
    // $("#button-next").trigger("click") // Автопереключение вопроса при выборе ответа

    // Записываем ответы в хеш
    localStorage.setItem("questionsHash_43Professions", JSON.stringify(questions))
})

// Кнопка второго варивнта ответа
$("#question-2").on("click tap", () => {
    // Ставим вес ответа во втрой и ставим флаг
    questions[questionCounter].weight1 = 0
    questions[questionCounter].weight2 = 1
    $("#question-mark-1").removeClass("checked")
    $("#question-mark-2").addClass("checked")

    $("#button-next").removeAttr("disabled")
    // $("#button-next").trigger("click") // Автопереключение вопроса при выборе ответа

    // Записываем ответы в хеш
    localStorage.setItem("questionsHash_43Professions", JSON.stringify(questions))
})

$("#form-name").change(() => { // Удаление лишних пробелов
    $("#form-name").val($("#form-name").val().replace(/ +/g, ' ').trim())
})

$("#form-phone").change(() => { // Удаление пробелов
    $("#form-phone").val($("#form-phone").val().replace(/ /g,''))
})

$("#form-email").change(() => { // Удаление пробелов
    $("#form-email").val($("#form-email").val().replace(/ /g,''))
})


// Галочка 
$("#policy").on("click tap", () => {
    $("#policy").toggleClass("checked")
})

// Клик тексту после галочки
$("#label-policy").on("click tap", () => {
    $("#policy").addClass("checked")
})

// Клик по политике
$("#label-policy span").on("click tap", () => {
    window.open("../diagnostic-policy", "_blank")
})


// Ивент submit у формы входа
const form = document.querySelector('form')
form.addEventListener('submit', (event) => {
    // Отключение базового перехода
    event.preventDefault()

    // Отключаем кнопку на 2 секунды
    $("#submit-form").attr("disabled", "disabled")
    setTimeout(() => {
        $("#submit-form").removeAttr("disabled")
    }, 2000)


    // Получаем поля из фомы
    const formData = new FormData(form)
    const formName = formData.get("form-name")
    const formPhone = formData.get("form-phone")
    const formEmail = formData.get("form-email")
    
    // В поле ФИО должно быть ровно 3 слова
    if (formName.split(" ").length !== 3) {
        inputError("#form-name")

        // Ставим текст ошибки
        $("#form-error").text("Неверный формат ФИО")
        $("#form-error").addClass("show")
        setTimeout(() => {
            $("#form-error").removeClass("show")
        }, 2000)
        return
    }

    // Проверка поля Телефона на регулярном выражении
    let rePhone = /^[\d\+][\d\(\)\ -]{9,14}\d$/
    if (!rePhone.test(formPhone)) {
        inputError("#form-phone")
        // Ставим текст ошибки
        $("#form-error").text("Неверный номер телефона")
        $("#form-error").addClass("show")
        setTimeout(() => {
            $("#form-error").removeClass("show")
        }, 2000)
        return
    }

    // Проверка поля Почты на регулярном выражении
    let reEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
    if (!reEmail.test(formEmail)) {
        inputError("#form-email")
        // Ставим текст ошибки
        $("#form-error").text("Неверный email")
        $("#form-error").addClass("show")
        setTimeout(() => {
            $("#form-error").removeClass("show")
        }, 2000)
        return
    }

    if (!$("#policy").hasClass("checked")) {
        // Ставим текст ошибки
        $("#form-error").text("Отметьте поле")
        $("#form-error").addClass("show")
        setTimeout(() => {
            $("#form-error").removeClass("show")
        }, 2000)
        return
    }


    $("#form-aside").addClass("hidden")
    $("#form-section").addClass("hidden")
    $("#section-title").removeClass("hidden")
    $("#section-instruction").removeClass("hidden")
    $("#top-right-figure").removeClass("hidden")
    $("#bottom-left-figure").removeClass("hidden")

    // Класс для корректного отображения
    $("article").addClass("article-content")


    // Сохраняем информацию в хэш
    let userFormData = {
        formName: formName,
        formPhone: formPhone,
        formEmail: formEmail,
    }

    localStorage.setItem("userFormData", JSON.stringify(userFormData))

    // Когда заполнили все поля и нажали "Далее", то рендерит Правила
})



// Кпнока Начать тестирование в Правила
$("#submit-instruction").on("click tap", () => {
    $("#section-title").addClass("hidden")
    $("#section-instruction").addClass("hidden")
    $("#top-right-figure").addClass("hidden")
    $("#bottom-left-figure").addClass("hidden")

    $("#question-section").removeClass("hidden")

    questionCounter = 1
    renderQuestion()
})



// Автозаполнение открытого вопроса
let questionsHashOpenAsnwer = localStorage.getItem("questionsHash_43ProfessionsOpenAnswer")
if (questionsHashOpenAsnwer) {
    $("#question-open-input").val(questionsHashOpenAsnwer)
}

// Включаем кнопку "Завершить" если написан открытый ответ
$("#question-open-input").on("input", () => {
    // Сохраняем ответ
    localStorage.setItem("questionsHash_43ProfessionsOpenAnswer", $("#question-open-input").val())

    if ($("#question-open-input").val() === "") {
        $("#button-end").attr("disabled", "disabled")
        return
    }

    $("#button-end").removeAttr("disabled")
})

// Триггерим инпут что бы разблокировать кнопку в случае если есть ответ
$("#question-open-input").trigger("input")


// Кнопка завершить
$("#button-end").on("click tap", () => {
    // Отключаем кнопку на 5 секунды (Что бы повторно не нажали)
    $("#button-end").attr("disabled", "disabled")
    setTimeout(() => {
        $("#button-end").removeAttr("disabled")
    }, 5000)


    // Создаем массив содержащий все ответы
    let answ = {}
    for (let i = 1; i < questions.length; i++) {
        answ[i] = {
            id: i,
            weight1: questions[i].weight1,
            weight2: questions[i].weight2
        }
    }

    // Собираем вес средних результатов
    let realism = ((
        (answ[1].weight1 + answ[2].weight1 + answ[3].weight1 + answ[4].weight1 + answ[5].weight1) +
        (answ[16].weight1 + answ[17].weight1 + answ[18].weight1 + answ[19].weight1 + answ[20].weight1) +
        (answ[31].weight1 + answ[32].weight1 + answ[33].weight1 + answ[34].weight1 + answ[35].weight1)) / 15).toFixed(2)
    
    let intelligence = ((answ[1].weight2 +
        (answ[6].weight1 + answ[7].weight1 + answ[8].weight1 + answ[9].weight1) + answ[16].weight2 +
        (answ[21].weight1 + answ[22].weight1 + answ[23].weight1 + answ[24].weight1) + answ[31].weight2 +
        (answ[36].weight1 + answ[37].weight1 + answ[38].weight1 + answ[39].weight1)) / 15).toFixed(2)

    
    let sociality = ((answ[2].weight2 + answ[6].weight2 +
        (answ[10].weight1 + answ[11].weight1 + answ[12].weight1) + answ[17].weight2 + answ[21].weight2 +
        (answ[25].weight1 + answ[26].weight1 + answ[27].weight1) + answ[32].weight2 + answ[36].weight2 +
        (answ[40].weight1 + answ[41].weight1 + answ[42].weight1)) / 15).toFixed(2)
    
    let conventionality = ((
        answ[13].weight1 + answ[14].weight1 + answ[28].weight1 + answ[29].weight1 + answ[43].weight1 +
        answ[40].weight2 + answ[37].weight2 + answ[33].weight2 + answ[25].weight2 + answ[22].weight2 +
        answ[17].weight2 + answ[10].weight2 + answ[7].weight2 + answ[3].weight2) / 14).toFixed(2)
    
    let enterprise = ((
        answ[15].weight1 + answ[30].weight1 + answ[4].weight2 + answ[8].weight2 + answ[11].weight2 +
        answ[13].weight2 + answ[19].weight2 + answ[23].weight2 + answ[26].weight2 + answ[28].weight2 +
        answ[34].weight2 + answ[38].weight2 + answ[41].weight2 + answ[43].weight2) / 14).toFixed(2)

    let artistry = ((
        answ[5].weight2 + answ[9].weight2 + answ[12].weight2 + answ[14].weight2 + answ[15].weight2 +
        answ[20].weight2 + answ[24].weight2 + answ[27].weight2 + answ[29].weight2 + answ[30].weight2 +
        answ[35].weight2 + answ[39].weight2 + answ[42].weight2) / 13).toFixed(2)
    
    let allWeights = {
        realism: realism,
        intelligence: intelligence,
        sociality: sociality,
        conventionality: conventionality,
        enterprise: enterprise,
        artistry: artistry
    }


    // Получаем информацию о пользователе
    let userFormData = JSON.parse(localStorage.getItem("userFormData"))
    
    // Массив который отправиться
    let sendData = {
    // id: Установиться в google scripts
        "manager_id": parseInt(URLParams["manager-id"]),
        "name": userFormData.formName,
        "phone": userFormData.formPhone,
        "email": userFormData.formEmail,
        "new": true,
        "result": {
            "diagnostic-id": 0, // Для этой диагностики id = 0
            "data": allWeights,
            "openAnswer": $("#question-open-input").val(),
            "date": Date.now() // Дата текущего прохождения
        },
        "in_archive": false,
        "date": Date.now() // Дата последней активности
    }
    
    // Api запрос в таблицу с результатами
    function DBsendResults(data, func) {
        $.ajax({
            url: API_URL + "/client/result",
            method: "POST",
            data: JSON.stringify(data),
            success: func
        })
    }

    DBsendResults(sendData, (data) => {
        // Информация отправляется и перекидывает на конец тестирования

        // Добавляем значение в хэш что бы после перезагрузки перекинуло на концовку
        localStorage.setItem("test-end", "test-end")
        location.reload()
    })
})



$(".question-open__section-content h3 span").on("click tap", () => {
    window.open(`https://punkt-b.pro/43-professions/all-professions`, "_blank")
})