(function() {

  function triggerEvent(el, eventName, data) {
    var event;
    if (document.createEvent) {
      event = document.createEvent('HTMLEvents');
      event.initEvent(eventName, true, true);
    } else if (document.createEventObject){// IE < 9
      event = document.createEventObject();
      event.eventType = eventName;
    }
    event.data = data;
    event.eventName = eventName;
    if (el.dispatchEvent) {
      el.dispatchEvent(event);
    } else if(el.fireEvent && htmlEvents['on'+eventName]) {// IE < 9
      el.fireEvent('on'+event.eventType, event);// can trigger only real event (e.g. 'click')
    } else if(el[eventName]) {
      el[eventName]();
    } else if(el['on'+eventName]) {
      el['on'+eventName]();
    }
  }

  function addEventListener(el, type, handler){
    if (el.addEventListener) {
      el.addEventListener(type, handler, false);
    } else if (el.attachEvent && htmlEvents['on'+type]) {// IE < 9
      el.attachEvent('on'+type, handler);
    } else {
      el['on'+type]=handler;
    }
  }

  function removeEventListener(el, type, handler){
    if (el.removeventListener) {
      el.removeEventListener(type, handler, false);
    } else if (el.detachEvent && htmlEvents['on'+type]) {// IE < 9
      el.detachEvent('on'+type, handler);
    } else {
      el['on'+type]=null;
    }
  }

  function isHistorySupported() {
    return typeof window != 'undefined' && window.history && 'pushState' in window.history;
  }

  if (isHistorySupported()) {
    var history = window.history;

    var pushState = history.pushState;
    history.pushState = function(state) {
      var ps = pushState.apply(history, arguments);
      triggerEvent(window, 'pushstate', {state: state});
      triggerEvent(window, 'changestate', {state: state});
      return ps;
    }

    var replaceState = history.replaceState;
    history.replaceState = function(state) {
      var rs = replaceState.apply(history, arguments);
      triggerEvent(window, 'replacestate', {state: state});
      triggerEvent(window, 'changestate', {state: state});
      return rs;
    }

    addEventListener(window, 'popstate', function(state) {
      triggerEvent(window, 'changestate', {state: state});
    });
  }

  if (typeof module != 'undefined') {
    module.exports = {
      isHistorySupported: isHistorySupported,
      addEventListener: addEventListener,
      removeEventListener: removeEventListener,
      triggerEvent: triggerEvent
    };
  }

})();
