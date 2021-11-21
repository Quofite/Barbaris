// этот файл содержит все кастмные HTML-теги
// разделяй каждый тег друг от друга комментом с кучей тире и названием
// название должно начинаться с swd-

// ------------------------------------------------------------------ swd-time -------------------------------------------
class SwdTime extends HTMLElement{
    constructor(){
        super();
        setInterval(()=>{ this.innerText = this.showTime(); }, 1000);
    }

    showTime(){
        var date = new Date();
        var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
        var months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];


        return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + "-ого года, " + days[date.getDay()] + " || " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
}

customElements.define("swd-time", SwdTime);