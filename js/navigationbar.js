// move element to a specified position
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

function moveUpFast() {
    newmove("navigation", 0, 34, 1);
}
function moveDownFast() {
    newmove("navigation", 0, 60, 1);
}
function moveUpSlowly(e) {
    newmove("navigation", 0, 34, 2);
	return stopDefault(e);
}
function moveDownSlowly(e) {
    newmove("navigation", 0, 60, 2);
    return stopDefault(e);
}

scrollTimes = 0;
function scrollMoveNavbar(e) {
    var curScrollY = scrollY();
    
    if ( curScrollY > 0 ) {
        if ( scrollTimes == 0 ) {
            moveUpFast();
            $("#header-wrapper").mouseenter(moveDownSlowly);
            //$("#header").mouseenter(moveDownSlowly);
            $("#header-wrapper").mouseleave(moveUpSlowly);
            //$("#navigation").mouseleave(moveUpSlowly);
            scrollTimes += 1;
        } 
        
    } else {
        $("#header-wrapper").unbind("mouseenter", moveDownSlowly);
        //$("#navigation").unbind("mouseenter", moveDownSlowly);
        //$("#navigation").unbind("mouseleave", moveUpSlowly);
        $("#header-wrapper").unbind("mouseleave", moveUpSlowly);
        moveDownFast();
        scrollTimes = 0;   
    }  
    
    return stopDefault(e);
}


// 标识当前页面
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


domReady(highlightPage);
domReady(changeNavIcon);
domReady(function() {
    addEvent(document, "scroll", scrollMoveNavbar);
});
domReady(clickBackTop);