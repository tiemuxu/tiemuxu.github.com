Tiemuxu.Page = function() {
	function initPageHeight() {
	    var page = Tiemuxu.id("page");
		var sidebar = Tiemuxu.id("sidebar-container");
		var pageHeight = Tiemuxu.getHeight(page);
		var sidebarHeight = Tiemuxu.getHeight(sidebar);
		
		if ( pageHeight < sidebarHeight ) {
		    page.style.height = sidebarHeight + "px";
		}
	}

	function initRelated() {
	    var related = Tiemuxu.id("relatedPost");
		if ( related != null ) {
		    var content = $(".content")[0];
		    var timeBox = $(".post-time")[0];
		    var conHeight = parseFloat(getStyle(content, "height"));
		    var relHeight = parseFloat(fullHeight(related));
		    var timeHeight = parseFloat(getStyle(timeBox, "height"));
		    var toMargin = conHeight - relHeight - timeHeight;
		    related.style.marginTop = toMargin + "px";
		}
	}
	/******************************************************************************************************/

	function highlight(elem, to, speed) {
	    var originOpacity = Tiemuxu.getStyle(elem, "opacity") * 100;
		var opacityDiff = to - originOpacity;
		
		for ( var i = 0; i <= 100; i += 5 ) {
		    (function() {
			    var step = i;
				setTimeout(function() {
				    var opacity = originOpacity + (step / 100) * opacityDiff;
				    Tiemuxu.setOpacity(elem, opacity);
				}, step * speed);
			})();
		}
	}

	function lowlight(elem, origin, speed) {
	    var curOpacity = Tiemuxu.getStyle(elem, "opacity") * 100;
		var opacityDiff = curOpacity - origin;
		
		setTimeout(function() {
		    for ( var i = 0; i <= 100; i += 5 ) {
		        (function() {
			        var step = i;
				    setTimeout(function() {
				        var opacity = curOpacity - (step / 100) * opacityDiff;
					    tiemuxu.setOpacity(elem, opacity);
				    }, step * speed);
			    })();
		    }
		}, 100);
	}



	function overHighlight() {
	    var list = ["category", "tag", "comment"];
		for ( var i = 0; i < list.length; i++ ) {
			$("." + list[i]).mouseenter(function(e) {
			    highlight(this, 100, 5);
				stopDefault(e);
			});
			$("." + list[i]).mouseleave(function(e) {
				lowlight(this, 80, 5);
				stopDefault(e);
			});
		}
	}

	function highlightRelated() {
	    $("#relatedPost").mouseenter(function(e) {
		    highlight(this, 100, 5);
			stopDefault(e);
		});
		$("#relatedPost").mouseleave(function(e) {
		    lowlight(this, 50, 5);
			stopDefault(e);
		})
	}

	this.init = function() {
		initRelated();
		highlightRelated();
	};
}


/***************************************************************************************************/
