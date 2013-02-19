function prev(elem) {
    do {
      elem = elem.previousSibling;
    } while ( elem && elem.nodeType != 1);
    return elem;
}

function next(elem) {
    do { 
      elem = elem.nextSibling;
    } while ( elem && elem.nodeType != 1 );
    return elem;
}

function first(elem) {
    elem = elem.firstChild;
    return elem && elem.nodeType != 1 ?
          next(elem) : elem;
}

function last(elem) {
    elem = elem.lastChilde;
    return elem && elem.nodeType != 1 ?
          prev(elem) : elem;
}

function parent(elem, num) {
    num = num || 1;
    for ( var i = 0; i < num; i++ ) {
        if ( elem != null ) elem = elem.parentNode;
    }
    return elem;
}

/***********************************************************************************************/

function id(name) {
    return document.getElementById(name);
}

function tag(name, elem) {
    return ( elem || document ).getElementsByTagName(name);
}

function hasClass(name, tagName) {
    var r = [];
	var re = new RegExp("(^|\\s)" + name + "(\\s|$)"); // ?
    var e = document.getElementsByTagName(tagName || "*");
    for ( var i = 0; i < e.length; i++ ) {
        if ( re.test( e[i] ) ) r.push(e[i]);
    }
    return r;
}

/*********************************************************************************************/

function hasAttribute(elem, name) {
    return elem.getAttribute(name) != null;
}

// Get and/or set the element's attribute
function attr(elem, name, value) {
    // Make sure that a valid name was provided
    if ( !name || name.constructor != String ) return '';
    // Make sure that the name is not a reserved word
    name = { 'for': 'htmlFor', 'class': 'className' }[name] || name;
  
    // If the value is provided 
    if ( value != null ) {
        // Try the quick way first 
        elem[name] = value;
      
        // The try the setAttribute method
        if ( elem.setAttribute ) {
            elem.setAttribute(name, value);
        }
    }
  
    // Return the value of the attribute
    return elem[name] || elem.getAttribute(name) || '';
}

/**********************************************************************************************/

// Stop bubble
function stopBubble(e) {
    if ( e && e.stopPropagation ) {
        e.stopPropagation();
    } else {
        window.event.cancelBubble = true;
    }
}
// Stop the default browser behavior
function stopDefault(e) {
    if ( e && e.preventDefault ) { // W3C
        e.preventDefault();
    } else { // IE
        window.event.returnValue = false;
    }
    
    return false;
}

/********************************************************************************************/

function getStyle(elem, name) {
    // If the property exists in style[], then it's been set recently (and is current)
    if ( elem.style[name] ) {
        return elem.style[name];
    } else if ( elem.currentStyle ) { // Otherwise, try to use IE's method
        return elem.currentStyle[name];
    } else if ( document.defaultView && document.defaultView.getComputedStyle ) { // Or the W3C's method
        // It uses the traditional 'text-align' style of rule writing, instead of 'textAlign' 
        name = name.replace(/([A-Z])/g, "-$1");
        name = name.toLowerCase();
        
        // Get the style object and get the value of the property (if it exists)
        var s = document.defaultView.getComputedStyle(elem, "");
        return s && s.getPropertyValue(name);
        
    }  else {
        return null;
    }    
}

// Set an opacity level for an element
// (where level is a number 0-100)
function setOpacity(elem, level) {
    if ( elem.filters ) { // If filters exist, then this is IE, so set the Alpha filter
        elem.filters.alpha.opacity = level;
    } else { // Otherwise use the W3C opacity property
        elem.style.opacity = level / 100;
    }
}

// A function for hiding (using display) an element
function hide(elem) {
    // Find out what it's current display state is
    var curDisplay = getStyle(elem, "display");
    
    if ( curDisplay != "none") {
        elem.$oldDisplay = curDisplay;
    }
    
    elem.style.display = "none";
}

// A function for showing (using display) an element
function show(elem) {
  if ( elem.$oldDisplay ) {
      elem.style.display = elem.$oldDisplay;
  } else {
      elem.style.display = "block";
  }
}

// Fade in/out functions
function fadeIn(elem, to, speed) {
    setOpacity(elem, 0);
	show(elem);
	
	for ( var i = 0; i <= 100; i += 5 ) { 
	    // A closure
	    (function() {
		    var opacity = i;
			setTimeout(function() {
			    setOpacity(elem, (opacity / 100) * to);
			}, (i + 1) * speed);
		})();
	}
}
function fadeOut(elem, to, speed) {
    var curOpacity = getStyle(elem, "opacity") * 100;
	
	for ( var i = 0; i < 100; i += 5 ) {
        (function() {
            var opacity = i;
            setTimeout(function() {
                var newOpacity = curOpacity - opacity;
                setOpacity(elem, newOpacity);
                if ( newOpacity == 5 ) { 
                    hide(elem);
                }
            }, (i + 1) * speed);
        })();
    }
}

// Get element's real height (use Getstyle)
function getHeight(elem) {
    return parseInt(getStyle(elem, "height"));
}
// Get element's real width
function getWidth(elem) {
    return parseInt(getStyle(elem, "width"));
}

// Get a elemnt's full height or width(for the hidden element)
function fullHeight(elem) {
    var old = resetCSS(elem, {
	    display: "block",
		visibility: "hidden",
		position: 'absolute'
	});
	var h = elem.clientHeight || getHeight(elem);
	restoreCSS(elem, old);
	return h;
}
function fullWidth(elem) {
    var old = resetCSS(elem, {
	    display: "block",
		visibility: "hidden",
		position: 'absolute'
	});
	var w = elem.clientWidth || getWidth(elem);
	restoreCSS(elem, old);
	return w;
}
function resetCSS(elem, prop) {
    var old = {};
    for ( var i in prop ) {
        old[i] = getStyle(elem, i);
        elem.style[i] = prop[i];
    } 
    return old;
}
function restoreCSS(elem, old) {
    for ( var i in old ) {
        elem.style[i] = old[i];
    }
}

// A function for determining how far vertically the browser is scrolled
function scrollY() {
    // If using IE6 in Strict Mode
    var de = document.documentElement;
    
    // If the pageYOffset of the browser is available, use that
    return self.pageYOffset ||
        
        // Otherwise, try to get the scroll top off the root node
        ( de && de.scrollTop ) ||
        
        // Finally, try to get the scroll top off of the body element
        document.body.scrollTop;
}

/********************************************************************************************/

// addEvent/removeEvent writtern by Dean Edwards, 2005
// with input from Tino Zijdel
// http://dean.edwards.name/weblog/2005/10/add-event/

function addEvent(element, type, handler) {
    // Assign each event handler a Unique ID
	if ( !handler.$$guid ) handler.$$guid = addEvent.guid++;
	// Create a hash table of event types for the element
	if ( !element.events ) element.events = {};
	
	// Create a hash table of event handlers for each element/event pair
	var handlers = element.events[type];
    if ( !handlers ) {
        handlers = element.events[type] = {};
        // Store the existing event handler(if there is one)
        if ( element["on" + type] ) {
            handlers[0] = element["on" + type];
        }
    }
	
	// Store the event handler in the hash table
	handlers[handler.$$guid] = handler;
	// Assign a global event handler to do all the work
	element["on" + type] = handleEvent;
}

// A counter used to create Unique IDs
addEvent.guid = 1;

function removeEvent(element, type, handler) {
    // Delete the event handler from the hash table
    if ( element.events && element.events[type] ) {
        delete element.events[type][handler.$$guid];
    }
}

function handleEvent(event) {
    var returnValue = true;
    // Grab the event object (IE uses a global event object)
    event = event || fixEvent(window.event);
    // Get a reference to the hash table of event handlers
    var handlers = this.events[event.type];
    // Execute each event handler
    for ( var i in handlers ) {
        this.$$handleEvent = handlers[i];
        if ( this.$$handleEvent(event) === false ) {
            returnValue = false;
        }
    }
    return returnValue;
}

function fixEvent(event) {
    // Add W3C standard event methods
    event.preventDefault = fixEvent.preventDefault;
    event.stopPropagation = fixEvent.stopPropagation;
    return event;
}
fixEvent.preventDefault = function() {
    this.returnValue = false;
};
fixEvent.stopPropagation = function() {
    this.cancelBubble = true;
};
// End
/*********************************************************************************************/


function domReady(f) {
    // If the DOM is already loaded, execute the function right away
    if ( domReady.done ) return f();
    
    // If we've already added a function
    if ( domReady.timer ) {
        // Add it to the list of functions to execute
        domReady.ready.push(f);
    } else {
        // Attach an event for when the page finished loading,
        // just in case it finished first, Uses addEvent.
        addEvent(window, "load", isDOMReady);
        
        // Initialize the array of functions to execute
        domReady.ready = [f];
        
        // Check to see if the DOM is ready as quickly as posible
        domReady.timer = setInterval(isDOMReady, 12);
    }
}

// Check to see if the DOM is ready for navigation
function isDOMReady() {
    // If we already figured out that the page is ready, ignore
    if ( domReady.done ) return false;
    
    // Check to see if a number of functions and elements are 
    // able to be accessed 
    if ( document && document.getElementById && 
        document.getElementsByTagName && document.body ) {
        // If they're ready, we can stop checking
        clearInterval(domReady.timer);
        domReady.timer = null;
             
        // Execute all the functions that were waiting
        for ( var i = 0; i < domReady.ready.length; i++ ) {
            domReady.ready[i]();
        }
        
        // Having executed all the functions, empty the array
        domReady.ready = null;
        domReady.done = true;
    }
     
}

