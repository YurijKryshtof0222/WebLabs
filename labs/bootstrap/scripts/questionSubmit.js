// Отримання форми за допомогою getElementById
var askQuestionForm = document.getElementById("ask-question-form");

// Додавання обробника події для форми
askQuestionForm.addEventListener("submit", function (event) {
// Зупиняємо стандартну поведінку форми (відправку)
event.preventDefault();

// Отримання значень полів
var nameUser = document.getElementById("name_user").value;
var email = document.getElementById("email").value;
var phone = document.getElementById("phone").value;

// Отримання значення обраного radio
var replyRadio;
if (document.getElementById("emailRadio").checked) {
    replyRadio = "E-mail";
} else if (document.getElementById("smsRadio").checked) {
    replyRadio = "SMS";
}

var massiveText = document.getElementById("massive_text").value;

var alertMessage =
    "Your question was submitted succesfully" +
    "\nInfo" +
    "\nName: " + nameUser +
    "\nEmail: " + email +
    "\nPhone: " + phone +
    "\nReply method: " + replyRadio +
    "\nQuestion: " + massiveText;

alert(alertMessage);
});