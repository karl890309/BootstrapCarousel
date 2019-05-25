var topic = [
    "尚未開學",
    "國定假日",
    "環境準備",
    "停課",
    "重複性"
]

var startDate = new Date();

function setMonthAndDay(month,day){
    startDate.setMonth(month-1,day);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
}

setMonthAndDay(2,21);