var $ = document.querySelector.bind(document),
    $$ = document.querySelectorAll.bind(document),
    getPointerEvent = function(event) {
        return event.targetTouches ? event.targetTouches[0] : event;
    },
    
    setListener = function (elm,events,callback) {
        var eventsArray = events.split(' '),
            i = eventsArray.length;
        while(i--){
            elm.addEventListener( eventsArray[i], callback, false );
        }
    };

var $touchArea = $('#touchArea'),
    touchStarted = false, // detect if a touch event is sarted
    currX = 0,
    currY = 0,
    cachedX = 0,
    cachedY = 0;

//setting the events listeners
setListener($touchArea,'touchstart mousedown',function (e){
    e.preventDefault(); 
    var pointer = getPointerEvent(e);
    // caching the current x
    cachedX = currX = pointer.pageX;
    // caching the current y
    cachedY = currY = pointer.pageY;
    // a touch event is detected      
    touchStarted = true;
    $touchArea.innerHTML = 'Touchstarted';
  
    // detecting if after 200ms the finger is still in the same position
    setTimeout(function (){
        if ((cachedX === currX) && !touchStarted && (cachedY === currY)) {
            // Here you get the Tap event
            $touchArea.innerHTML = 'Tap';
        }
    },200);
});
setListener($touchArea,'touchend mouseup touchcancel',function (e){
    e.preventDefault();
    // here we can consider finished the touch event
    touchStarted = false;
    $touchArea.innerHTML = 'Touchended';
});
