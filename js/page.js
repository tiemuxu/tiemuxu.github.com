function initPageHeight() {
    var page = id("page");
	var sidebar = id("sidebar-container");
	var pageHeight = getHeight(page);
	var sidebarHeight = getHeight(sidebar);
	
	if ( pageHeight < sidebarHeight ) {
	    page.style.height = sidebarHeight + "px";
	}
}

domReady(initPageHeight);