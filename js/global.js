//查找相关元素的前一个兄弟元素的函数
function prev(elem) {
    do {
      elem = elem.previousSibling;
    } while ( elem && elem.nodeType != 1);
    return elem;
}

//查找相关元素的下一个兄弟元素的函数
function next(elem) {
    do { 
      elem = elem.nextSibling;
    } while ( elem && elem.nodeType != 1 );
    return elem;
}

//查找元素第一个子元素的函数
function first(elem) {
    elem = elem.firstChild;
    return elem && elem.nodeType != 1 ?
          next(elem) : elem;
}

//查找元素最后一个子元素的函数
function last(elem) {
    elem = elem.lastChilde;
    return elem && elem.nodeType != 1 ?
          prev(elem) : elem;
}

//查找元素父元素的函数（num指定上溯的层级数）
function parent(elem, num) {
    num = num || 1;
    for ( var i = 0; i < num; i++ ) {
        if ( elem != null ) elem = elem.parentNode;
    }
    return elem;
}

//用id获取元素的函数
function id(name) {
    return document.getElementById(name);
}
//用tag获取元素的函数
function tag(name, elem) {
    return ( elem || document ).getElementsByTagName(name);
}

//查找全部拥有指定类值的元素的函数
function hasClass(name, tagName) {
    var r = [];
    //用于匹配类值的正则表达式（考虑到多类值的情况）
    var re = new RegExp("(^|\\s)" + name + "(\\s|$)"); // ?
    var e = document.getElementsByTagName(tagName || "*");
    for ( var i = 0; i < e.length; i++ ) {
        if ( re.test( e[i] ) ) r.push(e[i]);
    }
    return r;
}


//获取元素文本内容的通用函数
function text(e) {
    var t = "";
  
    //如果传入的是元素，则继续遍历其子元素，
    //否则嘉定它是一个数组
    e = e.childNodes || e;
    //Look through all child nodes
    for ( var i = 0; i < e.length; i++ ) {
        // If it's not an element, append its text value
        // Otherwise, recurse through all the element's chidren
        t += e[i].nodeType != 1 ?
            e[i].nodeValue : text(e[i].childNodes);
    }
    // Return the matched text
    return t;
}


// Check if an element has the attribute
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



// 以下三个函数用于往DOM中添加元素（注入HTML）
// Turn the argument array mixed of DOM nodes and HTML strings  into a pure DOM nodes array
function checkElem(a) {
    var r = [];
    // Force the argument into an array, if it isn't already
    if ( a.constructor != Array ) a = [a];
    
    for ( var i = 0; i < a.length; i++ ) {
        // If there is a String
        if ( a[i].constructor == String ) {
            // Create a temporary element to house the HTMl
            var div = document.createElement("div");
            // Inject the HTML, to convert it into  a DOM structure
            div.innerHTML = a[i];
            // Extract the DOM structure back out of the temp DIV
            for ( var j = 0; j < div.childNodes.length; j++ ) {
                r[r.length] = div.childNodes[j];
            }
        } else if ( a[i].length ) { //If it's an array
            // Assume that it's an array of DOM nodes
            for ( var j = 0; j < a[i].length; j++ ) {
                r[r.length] = a[i][j];
            }
        } else { //Otherwise, assume it's a DOM node
            r[r.length] = a[i];
        }
    }
    
    return r;
}

// Insert and append HTML into DOM
function before(parent, before, elem) {
    // Check to see if no parent nodes was provided
    if ( elem == null ) {
        elem = before;
        before = parent;
        parent = parent.parentNode;
    }
    
    // Get the new array  of elements
    var elems = checkElem(elem);
    
    for ( var i = 0; i < elems.length; i++ ) {
        parent.insertBefore(elems[i], before);
    }
}

function append(parent, elem) {
    var elems = checkElem(elem);
    
    for ( var i = 0; i < elems.length; i++ ) {
        parent.appendChild(elems[i]);
    }
}
// 注入HTML结束


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


// 获取元素真实的、最终的CSS样式属性值的函数
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
    // Start the opacity at 0
    setOpacity(elem, 0);
    
    // Show the element (but you can not see it, since the opacity is 0)
    show(elem);
    
    // 在一秒钟内执行一个20帧的动画
    for ( var i = 0; i <= 100; i += 5 ) {
        // 正确使用i的闭包函数
        (function() {
            var opacity = i;
            setTimeout(function() {
                setOpacity(elem, (opacity / 100) * to);
            }, (opacity + 1) * speed);
        })();   
    }
} 

function fadeOut(elem, speed) {
    var curOpacity = getStyle(elem, "opacity") * 100;
    
    for ( var i = 0; i <= 100; i += 5 ) {
        (function() {
            var step = i;
            setTimeout(function() {
                var opacity = curOpacity - (step / 100) * curOpacity;
                setOpacity(elem, opacity);
                if ( newOpacity == 5 ) { 
                    hide(elem);
                }
            }, (step + 1) * speed);
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

// 查找元素完整的、可能的高度
function fullHeight(elem) {
    // 如果元素显示，使用offsetHeight或者getHeight()
    /*if ( getStyle(elem, "display") != 'none' ) {
        return elem.offsetHeight || getHeight(elem);
    }*/
    
    // 否则，当元素display为none时，重置它的css属性以获取更精确高度
    var old = resetCSS(elem, {
        display: 'block',
        visibility: 'hidden',
        position: 'absolute'
    });
    
    // 使用clientHeight或者getHeight找出元素的完整高度
    var h = elem.clientHeight || getHeight(elem);
    // 回复CSS原有属性
    restoreCSS(elem, old);
    
    return h;
}

// 查找元素完整的、可能的宽度
function fullWidth(elem) {
    // 如果元素显示，使用offsetWidth或者getWidth()
    /*if ( getStyle(elem, "display") != "none" ) {
        return elem.offsetWidth || getWidth(elem);
    }*/
    
    // 否则，当元素display为none时，重置它的css属性以获取更精确高度
    var old = resetCSS(elem, {
        display: 'block',
        visibility: 'hidden',
        position: 'absolute'
    });
    
    // 使用clientWidth或者getWidth找出元素的完整高度
    var w = elem.clientWidth || getWidth(elem);
    // 回复CSS原有属性
    restoreCSS(elem, old);
    
    return w;
}

// 为元素CSS重设一组属性的函数，可恢复原有设置
function resetCSS(elem, prop) {
    var old = {};
    for ( var i in prop ) {
        old[i] = getStyle(elem, i);
        elem.style[i] = prop[i];
    } 
    return old;
}

// 恢复CSS原有属性值
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


// 绑定事件监听函数
// addEvent/removeEvent writtern by Dean Edwards, 2005
// with input from Tino Zijdel
// http://dean.edwards.name/weblog/2005/10/add-event/

function addEvent(element, type, handler) {
    // Assign each event handler a Unique ID （为每一个事件处理函数赋予一个独特的ID）
    if ( !handler.$$guid ) handler.$$guid = addEvent.guid++;
    // Create a hash table of event types for the element（为元素建立一个事件类型的散列表）
    if ( !element.events ) element.events = {};
    
    // Create a hash table of event handlers for each element/event pair（为每对元素/事件建立一个事件处理函数的散列表）
    var handlers = element.events[type];
    if ( !handlers ) {
        handlers = element.events[type] = {};
        // Store the existing event handler(if there is one)
        if ( element["on" + type] ) {
            handlers[0] = element["on" + type];
        }
    }
    
    // Store the event handler in the hash table（在散列表中存储当前的事件处理函数）
    handlers[handler.$$guid] = handler;
    // Assign a global event handler to do all the work（赋予一个全局事件处理函数来处理所有工作）
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
    // Get a reference to the hash table of event handlers（获取事件处理函数散列表的引用）
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
// 事件监听函数库结束


// 监听DOM是否可用的函数，
// 一旦可用立即执行所有需要在DOM可用时执行的函数
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
// 监听DOM可用与否的函数结束