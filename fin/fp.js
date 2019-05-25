
//{var
var tempcanvas = document.createElement('canvas');
tempcanvas.width = 1000;
tempcanvas.height = 1000;
var ctx = tempcanvas.getContext("2d");
var keymap = [68,70,74,75];
var rankmap = [["Perfect","rgba(0,0,255,"],[" Good ","rgba(0,255,0,"],[" Miss ","rgba(255,0,255,"]]
var presskeymap = [0,0,0,0];
var keyposition = 850;
var accposition/* = [(650-keyposition)*speed,(750-keyposition)*speed,(850-keyposition)*speed,(950-keyposition)*speed,(1050-keyposition)*speed]*/;
//[0,miss,1,good,2,perfect,3,good,4,miss]
var hover = [0,0];
var debug = 0;
//}
//{RE have to set
var keyarray = [[2000,1,3000,0,0,0]];
//[time,1keynum,2stoptime,3miss,4inpress,5inareaRelease]
var mouseposition = [NaN,NaN];
var oncav;
var savetime;
var time;
var setint;
var speed;
var savespeed;
var stop;
var rank;
var combo;
var life;
var score;
var isPointOneSec;
var accuracy;
var brokenkey;
//}

$(document).ready(function(event){
	resetvalue();
	reCanvasSize();
	$(window).resize(function (){reCanvasSize()});
});

$(document).click(function(event){
	setinterv();
})

$(document).mousemove(function(event){
	mousepositionjudge()
})

$(document).keydown(function(event){
	keyevent(event.which,1);
});

$(document).keyup(function(event){
	keyevent(event.which,0);
})

function keyevent(keynum,downOrUp){
	for (var i in keymap){
		if (keynum == keymap[i] && presskeymap[i] != downOrUp){
			presskeymap[i] = downOrUp;
		}
	}
	if (keynum == 13 && !setint && downOrUp){
		setinterv("enter");
	}
	if (keynum == 27 && savetime && downOrUp){
		stopinterv();
	}
	if (!setint){
		reCanvasSize();
	}
}

function resetvalue(){
	keyarray = [];
	oncav = [[],[],[],[]];
	savetime = 0;
	time = 0;
	setint = 0;
	speed = savespeed = 0.5;
	stop = 0;
	rank = [0,0,0];
	combo = 0;
	life = 400;
	score = 0;
	isPointOneSec = [0,0];
	accuracy = [0,0];
	brokenkey = [0,0,0,0];
}

function showacc(){
	ctx.font = "40px Arial";
	ctx.fillStyle = "#dddddd";
	var percent;
	if (accuracy[1]){
		percent = parseInt((accuracy[0]/accuracy[1])*100) + "." + String(parseInt((accuracy[0]/accuracy[1])*10000)).slice(-2) + "%";
	}
	else {
		percent = "100.00%";
	}
	ctx.fillText(percent,980-percent.length*22,100);
	
}

function setacc(a){
	rank[0] = a;
	rank[1] = 1;
	rank[2] = time;
	score += (2-a)*150 + parseInt(combo*speed);
	combo++;
	accuracy = [accuracy[0]+ a*(1+a)/-2 + 3,accuracy[1]+3];
	//y = a*(1+a)/-2 + 3 , f(0)=3 , f(1)=2 , f(2)=0
	if (a == 2){
		combo = 0;
		life -= 50;
	}
	else if (a == 1){
		life += 10;
	}
	else {
		life += 10 + combo;
	}
	if (life > 400){
		life = 400;
	}
}

function showlife(){
	ctx.fillStyle = "#444444";
	ctx.fillRect(30,50,30,400);
	if (life > 0){
		ctx.fillStyle = "#bbbbbb";
		ctx.fillRect(30,450-life,30,life);
		if (isPointOneSec[0]){
			life -= 2;
		}
	}
	else {
		stopinterv();
	}
}

function showcombo(){
	ctx.font = "50px Arial";
	if (combo){
		ctx.fillStyle = "#dddddd";
		ctx.fillText(combo,500-String(combo).length*15,100);
	}
}

function showscore(){
	ctx.font = "40px Arial";
	ctx.fillStyle = "#dddddd";
	var s = "00000000".slice(String(score).length) + score;
	ctx.fillText(s,980-s.length*22,50);
}

function showrank(){
	ctx.font = "50px Arial";
	ctx.fillStyle = rankmap[rank[0]][1] + rank[1] + ")";
	ctx.fillText(rankmap[rank[0]][0],420,200);
	if (rank[1] > 0){
	rank[1] =  1 - (time-rank[2])/1000 ;
	}
}

function drawline(){
	accposition = [(-250)*speed*1.2,(-150)*speed*1.2,(-50)*speed*1.2,(50)*speed*1.2,(150)*speed*1.2];
	ctx.fillStyle = "#555555";
	ctx.fillRect(0,accposition[0]+keyposition,1000,2);
	ctx.fillRect(0,accposition[1]+keyposition,1000,2);
	ctx.fillRect(0,accposition[2]+keyposition,1000,2);
	ctx.fillRect(0,accposition[3]+keyposition,1000,2);
	ctx.fillRect(0,accposition[4]+keyposition,1000,2);
}

function initCanvas(){
	ctx.clearRect(0,0,1001,1001);
	drawkey();
	drawline();
}

function showinfo(){
	showrank();
	showscore();
	showlife();
	showcombo();
	showacc();
}

function drawButton(){
	if (setint){
		return;
	}
	if (life > 0){
		ctx.fillStyle = "#bbbbbb";
		if (hover[0]){
			ctx.fillStyle = "#555599";
		}
		ctx.fillRect(400,400,200,100);
	}
	if (stop){
		if (life > 0){
			ctx.font = "50px Arial"
			ctx.fillStyle = "black";
			ctx.fillText("continue",405,465);
			
		}
		ctx.fillStyle = "#bbbbbb";
		if (hover[1]){
			ctx.fillStyle = "#555599";
		}
		ctx.fillRect(400,550,200,100);
		ctx.font = "65px Arial"
		ctx.fillStyle = "black";
		ctx.fillText("restart",405,620)
	}
	else if (!stop) {
		ctx.font = "90px Arial";
		ctx.fillStyle = "black";
		ctx.fillText("start",410,480);
	}
	copycanvas();
}

function reCanvasSize(){
		var wid = $(window).width();
		var hei = $(window).height();
		var small = wid;
		if (hei < wid){
			small = hei;
		}
		small -= 100;
		//main canvas
		$("#canv").attr("width","1000");
		$("#canv").attr("height","1000");
		$("#canv").width(small);
		$("#canv").height(small);
		$("#body").css({"left":-1*small/2});
		initCanvas();
		
		drawdropkey();
		showinfo()
		drawButton();
};

function drawkey(){
	ctx.fillStyle = "black";
	ctx.fillRect(100,keyposition,800,30);
	for (var i in keymap){
		if (!presskeymap[i]){
			ctx.clearRect((i*2+1)*100+5,keyposition+5,190,20);
		}
	}
}

function stopinterv(){
	if (!stop){
		stop = 1;
		clearInterval(setint);
		setint = 0;
		savetime = savetime - (new Date).getTime();
		drawdropkey();
		drawButton();
	}
	else if (life > 0){
		setinterv("esc");
	}
}

function mousepositionjudge(){
	var rect = $("#canv")[0].getBoundingClientRect();
	mouseposition[0] = (window.event.pageX - rect.left)*($("#canv").attr("width")/$("#canv").width());
	mouseposition[1] = (window.event.pageY - rect.top)*($("#canv").attr("height")/$("#canv").height());
	if (mouseposition[0] < 600 && mouseposition[0] > 400 && mouseposition[1] < 500 && mouseposition[1] > 400){
		hover = [1,0];
	}
	else if (mouseposition[0] < 600 && mouseposition[0] > 400 && mouseposition[1] < 650 && mouseposition[1] > 550 ){
		hover = [0,1];
	}
	else {
		hover = [0,0];
	}
	drawButton();
}

function setinterv(onkey){
	if (!setint){
		if ((hover[0] == 1 || onkey) && life > 0) {
			stop = 0;
			for (var i in oncav){
				if (!oncav[i].length){
					break;
				}
				for (var j in oncav[i]){
					if (oncav[i][j].length){
						oncav[i][j][5] = 0;
					}
				}
			}
			savetime += (new Date).getTime();
			setint = setInterval("start()",1);
		}
		else if ((hover[1] || onkey == "enter") && stop){
			resetvalue();
			savetime += (new Date).getTime();
			setint = setInterval("start()",1);
		}
	}
}

function copycanvas(){
	var ctxshow = $("#canv")[0].getContext("2d");
	ctxshow.clearRect(0,0,1001,1001);
	ctxshow.drawImage(tempcanvas,0,0);
}

function drawdropkey(){
	for (var i in oncav){
		for (var j in oncav[i]){
			ctx.fillStyle = "black";
			if (oncav[i][j][2] && oncav[i][j][2]-oncav[i][j][0] > 0){
				if (oncav[i][j][3]){
				ctx.fillStyle = "#555555";
				}
				ctx.fillRect((i*2+1)*100+30,(time-oncav[i][j][2])*speed+keyposition,140,30+(oncav[i][j][2]-oncav[i][j][0])*speed);
				ctx.fillStyle = "black";
				ctx.fillRect((i*2+1)*100+10,(time-oncav[i][j][2])*speed+keyposition,180,30);
				ctx.fillRect((i*2+1)*100+10,(time-oncav[i][j][0])*speed+keyposition,180,30);
			}
			else if (!oncav[i][j][2]) {
				ctx.fillRect((i*2+1)*100+10,(time-oncav[i][j][0])*speed+keyposition,180,30);
			}
			if ( !oncav[i][j][2] && (time-oncav[i][j][0])*speed > accposition[4] ){
				oncav[i].splice(j,1);
				setacc(2);
			}
			else if (oncav[i][j][2] && (time-oncav[i][j][2])*speed > accposition[4]){
				if (oncav[i][j][2]-oncav[i][j][0] <= 0){
					setacc(2);
				}
				oncav[i].splice(j,1);
			}
		}
	}
}

function dropkeyjudge(){
	for (var i in oncav){
		if (oncav[i].length && !oncav[i][0][3]) {
			if (presskeymap[i]){
				if (oncav[i][0][5]){
					var ran = Math.floor(Math.random()*7);
					if (!oncav[i][0][2] && (time-oncav[i][0][0])*speed > accposition[0]){
						if ((time-oncav[i][0][0])*speed > accposition[4]){
							setacc(2);
						}
						else if ((time-oncav[i][0][0])*speed > accposition[3]){
							setacc(1);
							//playsound(i,ran,0);
						}
						else if ((time-oncav[i][0][0])*speed > accposition[2]){
							setacc(0);
							//playsound(i,ran,0);
						}
						else if ((time-oncav[i][0][0])*speed > accposition[1]){
							setacc(1);
							//playsound(i,ran,0);
						}
						else {
							setacc(2);
						}
						oncav[i].splice(0,1);
					}
					else if (oncav[i][0][2]){
						if ((time-oncav[i][0][0])*speed > accposition[0] && !oncav[i][0][4]){
							if ((time-oncav[i][0][0])*speed > accposition[4]){
								setacc(2);
								oncav[i][0][3] = 1;
							}
							else if ((time-oncav[i][0][0])*speed > accposition[3]){
								setacc(1);
								oncav[i][0][4] = 1;
								//playsound(i,ran,1);
							}
							else if ((time-oncav[i][0][0])*speed > accposition[2]){
								setacc(0);
								oncav[i][0][4] = 1;
								//playsound(i,ran,1);
							}
							else if ((time-oncav[i][0][0])*speed > accposition[1]){
								setacc(1);
								oncav[i][0][4] = 1;
								//playsound(i,ran,1);
							} 
							else {
								setacc(2);
								oncav[i][0][3] = 1;
								
							}
							
						}
						else if ((time-oncav[i][0][0])*speed > 0 && (time-oncav[i][0][0])*speed < accposition[4] && oncav[i][0][2] > oncav[i][0][0]){
							oncav[i][0][0] = time;
							oncav[i][0][4] = 1;
							if (isPointOneSec[0]){
								combo += 1;
							}
							
						}
					}
				}
			}
			else if ((time-oncav[i][0][0])*speed > accposition[0] && !oncav[i][0][5]){
				oncav[i][0][5] = 1;
			}
			else if (oncav[i][0][4]){
				if ((time-oncav[i][0][2])*speed < accposition[1]){
					oncav[i][0][3] = 1;
					setacc(2);
				}
				else if ((time-oncav[i][0][2])*speed > accposition[3]){
					oncav[i].splice(0,1);
					setacc(1);
				}
				else if ((time-oncav[i][0][2])*speed > accposition[2]){
					oncav[i].splice(0,1);
					setacc(0);
				}
				else {
					oncav[i].splice(0,1);
					setacc(1);
				}
			}
			if (oncav[i].length && (time-oncav[i][0][0])*speed > accposition[4]){
				oncav[i][0][3] = 1;
				setacc(2);
			}
		}
	}
}

function start(){
	ctx.fillStyle = "black";
	time = (new Date).getTime()-savetime;
	//$("#debug").html(soundarray[0]);
	speed = savespeed + time/100000;
	if ((time - isPointOneSec[1]) > 100){
		isPointOneSec = [1,time];
		craftkey();
	}
	else {
		isPointOneSec[0] = 0;
	}
	if (speed > 3){
		speed = 3;
	}
	if ( keyarray.length && time > keyarray[0][0]-keyposition*(1/speed)){
		oncav[keyarray[0][1]].push(keyarray[0]);
		keyarray.splice(0,1);
	}
	initCanvas();
	drawdropkey();
	dropkeyjudge();
	showinfo();
	copycanvas();
}

function craftkey(){
	for (var i = 0 ; i < 4 ; i++){
		var ran = Math.floor(Math.random()*1000*(1/speed));
		if (brokenkey[i]){
			brokenkey[i]--;
		}
		else if (Math.floor(ran/50) == 0){
			var keydata = [time+keyposition*(1/speed),i,0,0,0,0];
			brokenkey[i] = 1;
			if (ran < 10){
				keydata[2] = (ran+3)*100 + keydata[0];
				brokenkey[i] += ran+3;
			}
			keyarray.push(keydata);
		}
	}
}