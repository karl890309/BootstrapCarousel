function main(){
	var ind = Math.floor(Math.random()*$(".randomSelect li").length);
	$("#h").html($(".randomSelect li").eq(ind).html());
}

function add(){
	var inp = $("#inp").val();
	if (inp != ""){
		var inli = 1;
		for (var i = 0 ; i < $(".randomSelect li").length ; i++){
			if (inp == $(".randomSelect li").eq(i).html()){
				inli = 0;
			}
		}
		if (inli == 1){
			$(".randomSelect").append("<li>" + inp + "</li>");
		}
	}
}

function pop(){
	$(".randomSelect li").eq(-1).remove();
}