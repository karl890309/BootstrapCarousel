var mapArray , ctx , currentImgMainX , currentImgMainY;
var imgMountain , imgMain , imgEnemy;

function main(){
    mapArray = [0,1,1,0,0,0,3,1,2];
    ctx = $("#myCanvas")[0].getContext("2d");
    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMainX = 0;
    currentImgMainY = 0;
    imgMain.onload = function(){
        ctx.drawImage(imgMain,0,0,80,130,currentImgMainX,currentImgMainY,200,200);
    }
    imgMountain = new Image();
    imgMountain.src = "images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "images/Enemy.png";
    imgMountain.onload = function(){
        imgEnemy.onload = function(){
            for (var i in mapArray){
                if (mapArray[i] == 1){
                    ctx.drawImage(imgMountain,32,65,32,32,i%3*200,Math.floor(i/3)*200,200,200);
                }
                else if (mapArray[i] == 3){
                    ctx.drawImage(imgEnemy,7,40,104,135,i%3*200,Math.floor(i/3)*200,200,200);
                }
            }
        }
    }
}


$(document).keydown(function (event){
    var targetImgMainX , targetImgMainY , targetBlock , cutImagePositionX;
    event.preventDefault();
    targetImgMainX = currentImgMainX;
    targetImgMainY = currentImgMainY;
    switch(event.which){
        case 37:
            targetImgMainX -= 200;
            cutImagePositionX = 175;
            break;
        case 38:
            targetImgMainY -= 200;
            cutImagePositionX = 355;
            break;
        case 39:
            targetImgMainX += 200;
            cutImagePositionX = 540;
            break;
        case 40:
            targetImgMainY += 200;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }
    if ( 0 <= targetImgMainX && targetImgMainX <= 400 
        && 0 <= targetImgMainY && targetImgMainY <= 400){
        targetBlock = targetImgMainX/200 + targetImgMainY/200*3;
    }
    else {
        targetBlock = -1;
    }
    ctx.clearRect(currentImgMainX,currentImgMainY,200,200);
    if (targetBlock == -1 || mapArray[targetBlock]==1 || mapArray[targetBlock]==3){
        //
    }
    else {
        $("#talkBox").text("");
        currentImgMainX = targetImgMainX;
        currentImgMainY = targetImgMainY;
    }
    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMainX,currentImgMainY,200,200);
    switch(mapArray[targetBlock]){
        case undefined:
            $("#talkBox").text("邊界");
            break;
        case 1:
            $("#talkBox").text("有山");
            break;
        case 2:
            $("#talkBox").text("終點");
            break;
        case 3:
            $("#talkBox").text("嗨~~");
            break;
    }
})

$(document).ready(main());

















