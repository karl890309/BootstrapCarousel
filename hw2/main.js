function main(){
    $("#table").empty();
    $("#table").append("<tr><td>場次</td><td>時間</th><td>主題</th></tr>");
    var len = topic.length;
    var dayunit = 60*60*24*1000;
    for (var i = 0 ; i　< len ; i++){
        var text = "" ;
        if (topic[i] == "停課"){

            text += "<tr class = 'a'>";
        }
        else {
            text += "<tr>";
        }
        text += "<td>"+(i+1)+"</td>";
        text += ("<td>"+
        (new Date(startDate.getTime()+i*7*dayunit)).toLocaleDateString().slice(5)
                            +"</td>");
        text += ("<td>"+topic[i]+"</td></tr>");
        $("#table").append(text);
    }
}

function settime(){
    setMonthAndDay($("#inp").val().slice(5,7),$("#inp").val().slice(8,10));
    main();
}

$(document).ready(main());