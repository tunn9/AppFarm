/**
 * eventHelper Class
 * Provide common events
 * @author FPT Software
 */

var eventHelper = {
    // CONSTANTS
    //

    TAG: 'eventHelper',

    /** Page Events */
    DEVICE_READY: 'deviceready',
    WINDOW_LOAD: 'windowload',
    RESUME: 'resume',
    PAUSE: 'pause',
    ORIENTATION_CHANGE: 'orientationchange',

    /** JQuery Page Events */
    PAGE_CONTAINER_BEFORE_LOAD: 'pagecontainerbeforeload',
    PAGE_CONTAINER_LOAD: 'pagecontainerload',
    PAGE_CONTAINER_LOAD_FAILED: 'pagecontainerloadfailed',
    PAGE_BEFORE_SHOW: 'pagebeforeshow',
    PAGE_SHOW: 'pageshow',
    PAGE_BEFORE_HIDE: 'pagebeforehide',
    PAGE_HIDE: 'pagehide',

    /** Native Keyboard Events*/
    NATIVE_KEYBOARD_SHOW: 'native.keyboardshow',
    NATIVE_KEYBOARD_HIDE: 'native.keyboardhide',

    /** Common Events */
    CLICK: 'click',
    VCLICK: 'vclick',
    VMOUSEUP: 'vmouseup',
    KEY_UP: 'keyup',
    CHANGE_PAGE_TRANSITION: 'slide',
    TAP_HOLD: 'taphold',
    FOCUS_OUT: 'focusout',
    ANIMATION_CSS_END: 'webkitAnimationEnd animationend',
    SWIPE_LEFT: 'swipeleft',
    SWIPE_RIGHT: 'swiperight',
    TAP: 'tap',
    INPUT: 'input',
    DEVICE_ORIENTATION: 'orientationchange',

    /** Project player events*/
    FILE_LOAD: 'fileload',
    CHANGE: 'change',
    ANIMATION_READY: 'animationReady',
    ANIMATION_PLAY_FINISHED: 'playAnimationFinished',
    BACKGROUND_IMAGE_BINDING_COMPLETE: 'imageBindingCompleted',
    TICK: 'tick',

    /** Wifi Connection Status support to cordova-plugin-network-information*/
    ONLINE: 'online',
    OFFLINE: 'offline',
    BACK_BUTTON: 'backbutton',
    TOUCH_START: 'touchstart',
    TOUCH_END: 'touchend',
    TOUCH_MOVE: 'touchmove',
    TOUCH_CANCEL: 'touchcancel',
    TOUCH_HOLD: 'touchhold',

    /** Clipboard event*/
    PASTE: 'paste',

    /** InAppBrowser event*/
    EXIT: 'exit',
    LOAD_START: 'loadstart',
    LOAD_STOP: 'loadstop',
    LOAD_ERROR: 'loaderror',
    /* Page transition animation*/
    PAGE_TRANSITION: {
        SLIDE: 'slide',
        NONE: 'none',
        FADE: 'fade'
    }

}; //End Class