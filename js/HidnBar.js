// Show or hide the sidebar containing some of my information
Tiemuxu.HiddenBar = function() {
    // move element to a specified position
    function moveElem(elemID, final_x, final_y, interval) {
        var elem = Tiemuxu.id(elemID);
        if (elem.movement) {  
            clearTimeout(elem.movement);       // 消除重影
        }
        var xpos = parseFloat(Tiemuxu.getStyle(elem, "right"));
        var ypos = parseFloat(Tiemuxu.getStyle(elem, "top"));
        
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
        var elem = Tiemuxu.id("hide-sidebar");
        setTimeout(function() {
            Tiemuxu.fadeIn(elem, 100, 5);
        },200);
    };

    function moveRight() {
        var elem = Tiemuxu.id("hide-sidebar");
        Tiemuxu.fadeOut(elem, 2);
        setTimeout(function() {
            moveElem("hiddenBar", -420, 110, 1);
        },202);  
    }

    // 改变img元素的src属性
    function changeSrc() {
        var srcString = Tiemuxu.attr(this, "src");
        var dotPosition = srcString.lastIndexOf(".");
        
        var newSrc = srcString.substring(0, (dotPosition - 2));
        newSrc = newSrc + srcString.substring(dotPosition);
        
        Tiemuxu.attr(this, "src", newSrc);
    };

    function recoverySrc() {
        var srcString = Tiemuxu.attr(this, "src");
        var dotPosition = srcString.lastIndexOf(".");
        
        var recSrc = srcString.substring(0, dotPosition) + "bw" + srcString.substring(dotPosition);
        
        Tiemuxu.attr(this, "src", recSrc);
    }

    this.init = function() {
        // Event listeners
        $("div#hiddenBar").mouseenter(function(e) {
            moveLeft();
            // stopDefault(e);
        });
        $("div#hiddenBar").mouseleave(function(e) {
            moveRight();
            // stopDefault(e);
        });
    }

}








 
// function moveSwitch() {
    
// }



// function changeSocialIcon() {
//     var socialIcon = id("hide-social");
//     var iconList = tag("img", socialIcon);
    
//     for ( var i = 0; i < iconList.length; i++ ) {
//         addEvent(iconList[i], "mouseover", changeSrc);
//         addEvent(iconList[i], "mouseout", recoverySrc);
//     }
// }

// // DOM可用时执行
// $(document).ready(moveSwitch);
// //domReady(changeSocialIcon);



