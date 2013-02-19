// Show or hide the sidebar containing some of my information


// move element to a specified position
function moveElem(elemID, final_x, final_y, interval) {
    var elem = id(elemID);
	if ( elem.movement ) {
	    clearTimeout(elem.movement);
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

/**************************************************************************************/

function slideIn(elem) {
    var h = fullHeight(elem);
	var w = fullWidth(elem);
	
	elem.style.height = "0px";
    elem.style.width = "0px";
    
    setOpacity(elem, 0);
    show(elem);
	
	for ( var i = 0; i <= 100; i += 5 ) {
	    (function() {
            var pos = i;
            var opacity = i;
            setTimeout(function() {
                elem.style.height = ((pos / 100) * h) + "px";
                elem.style.width = ((pos / 100) * w) + "px";
                setOpacity(elem, (opacity / 100) * 98);
            }, (pos + 1) * 2);
        })();
	}
	
	setTimeout(function() {
        var avatar = id("hide-avatar");
        var social = id("hide-social");
        var about = id("hide-about");
        var contact = id("hide-contact");
        show(avatar);
        show(social);
        show(about);
        show(contact);
    }, 202);
}

function slideOut(elem, realFullHeight, realFullWidth) {
    (function() {
        var avatar = id("hide-avatar");
        var social = id("hide-social");
        var about = id("hide-about");
        var contact = id("hide-contact");
        hide(avatar);
        hide(social);
        hide(about);
        hide(contact);
    })();
	
	var h = parseInt(elem.style.height);
	var w = parseInt(elem.style.width);
	var curOpacity = getStyle(elem, "opacity") * 100;
	
	for ( var i = 100; i >= 0; i -= 5 ) {
	    (function() {
            var pos = i;
            var opacity = i;
            slideOut.hide = setTimeout(function() {
                elem.style.height = ((pos / 100) * h) + "px";
                elem.style.width = ((pos / 100) * w) + "px";
                if ( opacity <= curOpacity ) {
                    setOpacity(elem, opacity);
                }
            }, (100 - pos + 1) * 2);
        })();
	}
	
	setTimeout(function() {
	    hide(elem);
		elem.style.height = realFullHeight + "px";
		elem.style.width = realFullWidth + "px";
	}, 202);
}

/******************************************************************************************/

moveLeft.$$guid = 1;
moveRight.$$guid = 0;

function moveLeft() {
    if ( moveLeft.$$guid == 1 && moveRight.$$guid == 0 ) {
        moveElem("switch", 0, 110, 1);
        var elem = id("hide-sidebar");
        setTimeout(function() {
            slideIn(elem);
        }, 180);
        
        moveLeft.$$guid -= 1;
        moveRight.$$guid += 1;
    } else if ( moveLeft.$$guid == 0 && moveRight.$$guid == 1 ) {
        moveLeft.$$guid += 1;
        moveRight.$$guid -= 1;
    }
}

function moveRight(realFullHeight, realFullWidth) {
    setTimeout(function() {
        if ( moveRight.$$guid == 1 && moveLeft.$$guid == 0 ) {
            
            var elem = id("hide-sidebar");
            slideOut(elem, realFullHeight, realFullWidth);
            setTimeout(function() {
                moveElem("switch", -25, 110, 1);
            }, 150);
            
            moveRight.$$guid -= 1;
            moveLeft.$$guid += 1;
        } else if ( moveRight.$$guid == 0 && moveLeft.$$guid == 1 ) {
            moveLeft.$$guid -= 1;
            moveRight.$$guid += 1;
        }
    }, 100);
}

/********************************************************************************************/

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

/*************************************************************************************************/

// Event listeners
function moveSwitch() {
    var hiddenElem = id("hide-sidebar");
	var realFullHeight = fullHeight(hiddenElem);
	var realFullWidth = fullWidth(hiddenElem);
	
	$("div#switch").mouseenter(moveLeft);
    $("div#hide-sidebar").mouseenter(moveLeft);
	$("div#hide-sidebar").mouseleave(function() {
	    moveRight(realFullHeight, realFullWidth);
    });
	$("div#switch").mouseleave(function() {
        moveRight(realFullHeight, realFullWidth);
        
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

// Dom ready
domReady(moveSwitch);
domReady(changeSocialIcon);


