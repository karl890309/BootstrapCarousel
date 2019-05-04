function main(){
    var curr = null;
    $("#startButton").click(function(){
        if (curr == null){
            curr = 0;
            $("#question").text(questions[0].question);
            $("#options").empty();
            for (var i = 0 ; i < questions[0].answers.length; i++){
                $("#options").append("<input name = 'options' type = 'radio' value = "
                + i + "> <lable>" + questions[0].answers[i][0] + "</lable><br><br>");
            }
            $("#startButton").val("Next");
        }
        else{
            $.each($(":radio"),function(i,val){
                if(val.checked){
                    if (isNaN(questions[curr].answers[i][1])){
                        var finR = questions[curr].answers[i][1];
                        $("#question").text(finalAnswers[finR][0]);
                        $("#options").empty();
                        $("#options").append(finalAnswers[finR][1]+"<br><br>");
                        curr = null;
                        $("#startButton").val("重新開始");
                    }
                    else{
                        curr = questions[curr].answers[i][1]-1;
                        $("#question").text(questions[curr].question);
                        $("#options").empty();
                        for (var x = 0 ; x < questions[curr].answers.length ; x++){
                            $("#options").append("<input name = 'options' type = 'radio'" +
                            " value = " + x + "> <lable>" + questions[curr].answers[x][0] +
                            "</lable><br><br>" );
                        }
                    }
                    return false;
                }
            })
        }
    });
}

$(document).ready(main());