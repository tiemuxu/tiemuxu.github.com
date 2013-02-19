function newmove(elemID, final_x, final_y, speed) {
    var elem = id(elemID);
    var xpos = parseFloat(getStyle(elem, "left"));
    var ypos = parseFloat(getStyle(elem, "top"));
    
    if ( xpos == final_x && ypos == final_y ) {
        return true;
    }
    
    var dist_x = final_x - xpos;
    var dist_y = final_y - ypos;
    
    for ( var i = 0; i <= 100; i += 5 ) {
        (function() {
            var pos = i;
            setTimeout(function() {
                elem.style.left = xpos + ((pos / 100) * dist_x) + "px";
                elem.style.top = ypos + ((pos / 100) * dist_y) + "px";
            }, (pos + 1) * speed);
        })();
    }
}

/******************************************************************************/

isMoveUp = 1;
isMoveDown = 0;

function moveUpFast() {
    if ( isMoveUp == 1 && isMoveDown == 0 ) {
        newmove("navigation", 0, 34, 1);
        isMoveUp -= 1;
        isMoveDown += 1;
    }
}

function moveDownFast() {
    if ( isMoveUp == 0 && isMoveDown == 1 ) {
        newmove("navigation", 0, 60, 1);
        isMoveUp += 1;
        isMoveDown -= 1;
    }
}

function moveUpSlowly(e) {
    setTimeout(function() {
        if ( isMoveUp == 1 && isMoveDown == 0 ) {
            newmove("navigation", 0, 34, 2);
            isMoveUp -= 1;
            isMoveDown += 1;
        } else if ( isMoveUp == 0 && isMoveDown == 1 ) {
            isMoveUp += 1;
            isMoveDown -= 1;
        }
        return stopDefault(e);
    }, 200);
} 

function moveDownSlowly(e) { 
    setTimeout(function() {
        if ( isMoveUp == 0 && isMoveDown == 1 ) {
            newmove("navigation", 0, 60, 2);
            isMoveUp += 1;
            isMoveDown -= 1;
        } else if ( isMoveUp == 1 && isMoveDown == 0 ) {
            isMoveUp -= 1;
            isMoveDown += 1;
        }
        return stopDefault(e);
    }, 100);  
}

/********************************************************************************/

scrollTimes = 0;
function scrollMoveNavbar(e) {
    var curScrollY = scrollY();
    
    if ( curScrollY > 0 ) {
        if ( scrollTimes == 0 ) {
            moveUpFast();
            $("#navigation").mouseenter(moveDownSlowly);
            $("#header").mouseenter(moveDownSlowly);
            $("#header").mouseleave(moveUpSlowly);
            $("#navigation").mouseleave(moveUpSlowly);
            scrollTimes += 1;
        } 
        
    } else {
        $("#header").unbind("mouseenter", moveDownSlowly);
        $("#navigation").unbind("mouseenter", moveDownSlowly);
        $("#navigation").unbind("mouseleave", moveUpSlowly);
        $("#header").unbind("mouseleave", moveUpSlowly);
        moveDownFast();
        scrollTimes = 0;   
    }  
    
    return stopDefault(e);
}

/*********************************************************************************/

function highlightPage() {
    var nav = id("navigation");
    var links = tag("a", nav);
    for ( var i = 0; i < links.length; i++ ) {
        var linkurl = attr(links[i], "href");
        var currenturl = window.location.href;
        if ( currenturl.indexOf(linkurl) != -1 ) {
            attr(links[i], "className", "here");
        }  
    }
}

/********************************************************************************/

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

function changeNavIcon() {
    var nav = id("navigation");
    var iconList = tag("img", nav);
    
    for ( var i = 0; i < iconList.length; i++ ) {
        addEvent(iconList[i], "mouseover", changeSrc);
        addEvent(iconList[i], "mouseout", recoverySrc);
    }
}

/*************************************************************************************/

function backTop(e) {
    var curScrollY = scrollY();
    
    for ( var i = 0; i <= 100; i += 5 ) {
        (function() {
            var pos = i;
            var step = (pos / 100) * curScrollY;
            var toScrollY = curScrollY - step;
            setTimeout(function() {
                window.scrollTo(0, toScrollY);
            }, (pos + 1) * 5);
        })();
    }
    
    return stopDefault(e);
}

function clickBackTop() {
    var elem = id("header");
    addEvent(elem, "click", backTop);
}

/*********************************************************************************/

domReady(highlightPage);
domReady(changeNavIcon);
domReady(function() {
    addEvent(document, "scroll", scrollMoveNavbar);
});
domReady(clickBackTop);