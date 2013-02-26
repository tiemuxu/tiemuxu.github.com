// Show or hide the sidebar containing some of my information

// move element to a specified position
function moveElem(elemID, final_x, final_y, interval) {
    var elem = id(elemID);
    if (elem.movement) {  
        clearTimeout(elem.movement);       // 消除重影
    }
    var xpos = parseFloat(getStyle(elem, "right"));
    var ypos = parseFloat(getStyle(elem, "top"));
    
    if ( xpos == final_x && ypos == final_y ) {
        return true;
    }
    
    var dist_x = ((final_x - xpos) / 10);
    var dist_y = ((final_y - ypos) / 10);
    xpos = xpos + dist_x;
    ypos = ypos + dist_y;
    
    elem.style.right = xpos + "px";
    elem.style.top = ypos + "px";
    
    var move = "moveElem('"+elemID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement = setTimeout(move, interval);
}



function moveLeft() {
    moveElem("hiddenBar", 0, 110, 1);
	var elem = id("hide-sidebar");
	setTimeout(function() {
	    slideIn(elem);
	},180);
}
function moveRight(realFullHeight, realFullWidth) {
    var elem = id("hide-sidebar");
	slideOut(elem, realFullHeight, realFullWidth);
	setTimeout(function() {
	    moveElem("hiddenBar", -290, 110, 1);
	},180);
}


// 改变img元素的src属性
function changeSrc() {
    var srcString = attr(this, "src");
    var dotPosition = srcString.lastIndexOf(".");
    
    var newSrc = srcString.substring(0, (dotPosition - 2));
    newSrc = newSrc + srcString.substring(dotPosition);
    
    attr(this, "src", newSrc);
}
function recoverySrc() {
    var srcString = attr(this, "src");
    var dotPosition = srcString.lastIndexOf(".");
    
    var recSrc = srcString.substring(0, dotPosition) + "bw" + srcString.substring(dotPosition);
    
    attr(this, "src", recSrc);
}



// Event listeners 
function moveSwitch() {
    $("div#hiddenBar").mouseenter(function(e) {
	    moveLeft();
		stopDefault(e);
	});
    $("div#hiddenBar").mouseleave(function(e) {
        moveRight();
        stopDefault(e);
    });
}



function changeSocialIcon() {
    var socialIcon = id("hide-social");
    var iconList = tag("img", socialIcon);
    
    for ( var i = 0; i < iconList.length; i++ ) {
        addEvent(iconList[i], "mouseover", changeSrc);
        addEvent(iconList[i], "mouseout", recoverySrc);
    }
}

// DOM可用时执行
domReady(moveSwitch);
domReady(changeSocialIcon);



