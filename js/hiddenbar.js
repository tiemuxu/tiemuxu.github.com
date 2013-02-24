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


// 短时间内增加高度和宽度逐步显示隐藏元素的函数
function slideIn(elem) {
    var h = fullHeight(elem);   // 这里的顺序很重要，一定要先获得高度宽度再设置为0
    var w = fullWidth(elem);
    
    //elem.style.height = "0px";
    //elem.style.width = "0px";
    
    setOpacity(elem, 0);
    
    show(elem);
    
    // 执行一个20帧的动画
    for ( var i = 0; i <= 100; i += 5 ) {
        // 正确使用'i'的自执行闭包函数
        (function() {
            var pos = i;
            var opacity = i;
            setTimeout(function() {
                //elem.style.height = ((pos / 100) * h) + "px";
                //elem.style.width = ((pos / 100) * w) + "px";
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

// 短时间内减少高度和宽度逐步隐藏元素
function slideOut(elem, realFullHeight, realFullWidth) {
    // 先隐藏hiddenbar里的所有子元素
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
    
    //var h = parseInt(elem.style.height);   // 获取元素在触发mouseout事件时的尺寸（如果slideIn没有完全执行就slideOut，那么此时的尺寸不等于元素的完整尺寸）
    //var w = parseInt(elem.style.width);
    var curOpacity = getStyle(elem, "opacity") * 100;
    
    for ( var i = 100; i >= 0; i -= 5 ) {
        /*if ( slideOut.hide ) clearTimeout(slideOut.hide);*/
        // 正确使用'i'的自执行闭包函数
        (function() {
            var pos = i;
            var opacity = i;
            slideOut.hide = setTimeout(function() {
                //elem.style.height = ((pos / 100) * h) + "px";
                //elem.style.width = ((pos / 100) * w) + "px";
                if ( opacity <= curOpacity ) {
                    setOpacity(elem, opacity);
                }
            }, (100 - pos + 1) * 2);
        })();
    }
    
    setTimeout(function() {
        hide(elem);
        //elem.style.height = realFullHeight + "px";    // 重要，隐藏后要记得恢复元素的本来尺寸，否则下次触发事件会出错
        elem.style.width = realFullWidth + "px";
    }, 202);
    
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
    var hiddenElem = id("hide-sidebar");
    var realFullHeight = fullHeight(hiddenElem); // 记录下元素的真实完整尺寸，给slideOut函数使用
    var realFullWidth = fullWidth(hiddenElem);
    
    $("div#hiddenBar").mouseenter(moveLeft);
    /*$("div#hide-sidebar").mouseenter(moveLeft);
    $("div#hide-sidebar").mouseleave(function() { // 传入元素的真实完整尺寸，确保元素未完全展开而鼠标离开触发slideOut函数后元素的完整尺寸仍然正确
        moveRight(realFullHeight, realFullWidth);
        
    });*/
    $("div#hiddenBar").mouseleave(function() {
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

// DOM可用时执行
domReady(moveSwitch);
domReady(changeSocialIcon);



