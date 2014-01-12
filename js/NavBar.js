Tiemuxu.NavBar = function() {
   // move element to a specified position
    function newmove(elemID, final_x, final_y, speed) {
        var elem = Tiemuxu.id(elemID);
        var xpos = parseFloat(Tiemuxu.getStyle(elem, "left"));
        var ypos = parseFloat(Tiemuxu.getStyle(elem, "top"));
        
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
    };

    function moveDownFast() {
       newmove("navigation", 0, 60, 1); 
    };

    var timer
    function moveUpSlowly() {
        var curScrollY = Tiemuxu.scrollY();
        if ( curScrollY != 0) {
            clearTimeout(timer)
            newmove("navigation", 0, 34, 2);
        }
    };
    function moveDownSlowly() {
        var curScrollY = Tiemuxu.scrollY();
        if (curScrollY != 0) {
            timer = setTimeout(function () {
                newmove("navigation", 0, 60, 2);
            }, 300)
        }
    };

    function scrollMoveNavbar() {
        var curScrollY = Tiemuxu.scrollY();
         if ( curScrollY > 0 ) {
            moveUpFast();
            
        } else {
            moveDownFast(); 
        }    
    };

    // 标识当前页面
    this.highlightPage = function() {
        var nav = Tiemuxu.id("navigation");
        var links = Tiemuxu.tag("a", nav);
        for ( var i = 0; i < links.length; i++ ) {
            var linkurl = Tiemuxu.attr(links[i], "href");
            var currenturl = window.location.href;
            if ( currenturl.indexOf(linkurl) != -1 ) {
                Tiemuxu.attr(links[i], "className", "here");
            }  
        }
    };

    function backTop() {
        var curScrollY = Tiemuxu.scrollY();
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
    };

    this.init = function() {
        var elem = Tiemuxu.id("header");
        Tiemuxu.addEvent(elem, "click", backTop);

        this.highlightPage();
        $("#header-wrapper").mouseenter(moveDownSlowly);
        $("#header-wrapper").mouseleave(moveUpSlowly);
        $(document).scroll(scrollMoveNavbar);
    };

}

