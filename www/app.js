/**
 * Application initialize: configure, booters
 */
var app = {
    // CONSTANTS
    //

    TAG : 'app',

    DEFAULT_PAGE_URL : 'screen/user/login.html',

    // PROPERTIES
    //

    /**
     * Loading page holder
     *
     * @type {string}
     */
    pageUrl : '',

    // METHODS
    //
    // initialize()
    // bindEvents()
    // receiveEvents(eventId, event, data)
    // bootPage()
    // bootPageController(controller)
    // bootPageViewer(viewer)

    /**
     * Application Constructor
     */
    initialize : function() {
        app.bindEvents();
    },

    /**
     * Bind Event Listeners
     */
    bindEvents: function() {
        // App Event Life Cycle
        // 1 - At first time page is loaded only
        document.addEventListener(eventHelper.DEVICE_READY, function() {
            app.receiveEvents(eventHelper.DEVICE_READY);
        }, false);
        // 2 - At first time page is loaded only
        window.onload = function() {
            app.receiveEvents(eventHelper.WINDOW_LOAD);
        };
        // 2.0: When orientation event is occurred
        window.addEventListener(eventHelper.ORIENTATION_CHANGE, function() {
            app.receiveEvents(eventHelper.ORIENTATION_CHANGE);
        });
        // 2-1: On Resume of application
        document.addEventListener(eventHelper.RESUME, function() {
            app.receiveEvents(eventHelper.RESUME);
        }, false);
        // 2-2: On Pause of application
        document.addEventListener(eventHelper.PAUSE, function() {
            app.receiveEvents(eventHelper.PAUSE);
        }, false);

        // 3-x: JQuery page events
        // 3-1
        $(document).on(eventHelper.PAGE_CONTAINER_BEFORE_LOAD, function(event, data) {
            app.receiveEvents(eventHelper.PAGE_CONTAINER_BEFORE_LOAD, event, data);
        });
        // 3-2
        $(document).on(eventHelper.PAGE_CONTAINER_LOAD, function(event, data) {
            app.pageUrl = data.url;
            app.receiveEvents(eventHelper.PAGE_CONTAINER_LOAD, event, data);
        });
        // 3-3
        $(document).on(eventHelper.PAGE_CONTAINER_LOAD_FAILED, function(event, data) {
            app.receiveEvents(eventHelper.PAGE_CONTAINER_LOAD_FAILED, event, data);
        });
        // 4-x: Network Connection status
        // 4-1
        document.addEventListener(eventHelper.ONLINE, function() {
            app.receiveEvents(eventHelper.ONLINE);
        }, false);
        // 4-2
        document.addEventListener(eventHelper.OFFLINE, function() {
            app.receiveEvents(eventHelper.OFFLINE);
        }, false);

        document.addEventListener(eventHelper.BACK_BUTTON, function() {
            app.receiveEvents(eventHelper.BACK_BUTTON);
        }, false);

    },

    /**
     * Received Event and forward to processors<br>
     * Defined Events of eventHelper:<br>
     * eventHelper.BACK_BUTTON <br>
     * eventHelper.OFFLINE <br>
     * eventHelper.ONLINE <br>
     * eventHelper.PAGE_CONTAINER_BEFORE_LOAD <br>
     * eventHelper.PAGE_CONTAINER_LOAD <br>
     * eventHelper.PAGE_CONTAINER_LOAD_FAILED <br>
     * eventHelper.DEVICE_READY <br>
     * eventHelper.WINDOW_LOAD <br>
     * eventHelper.RESUME <br>
     */
    receiveEvents : function(eventId, event, data) {
        debug.log(this.TAG + '#receivedEvent() eventId=' + eventId);
        var controllerName;
        controllerName = pageHelper.getControllerNameFromUrl(app.pageUrl);

        var controller;
        controller = window[controllerName];

        switch (eventId) {
            case eventHelper.BACK_BUTTON:
            case eventHelper.OFFLINE:
            case eventHelper.ONLINE:
                if (controller) {
                    controller.receivePageEvents(eventId);
                }
                break;
            case eventHelper.PAGE_CONTAINER_LOAD:
                debug.log(app.TAG + 'pagecontainerload pageUrl=' + app.pageUrl);
                app.bootPage();
                break;
            case eventHelper.DEVICE_READY:
                // Handle DEVICE_READY for controller
                if (controller) {
                    controller.receivePageEvents(eventHelper.DEVICE_READY, event, data);
                }
                break;
            case eventHelper.WINDOW_LOAD:
                app.defaultPage();
                break;
            case eventHelper.RESUME:
                // When application is on resume event
                if (controller) {
                    controller.receivePageEvents(eventHelper.RESUME, event, data);
                }
                break;
            case eventHelper.PAUSE:
                // When application is on on pause event
                if (controller) {
                    controller.receivePageEvents(eventHelper.PAUSE, event, data);
                }
                break;
            case eventHelper.ORIENTATION_CHANGE:
                // When device change the orientation
                if (controller) {
                    controller.receivePageEvents(eventHelper.ORIENTATION_CHANGE);
                }
                break;
            default:
                // Default action
                break;
        }
    },

    defaultPage: function () {
      if(storageManager.getLocalStorage(constants.LOGIN.DATA_LOGIN)){
          pageHelper.changePage(fileHelper.getUrl(pageUrl.HOME_PAGE),  {transition: eventHelper.PAGE_TRANSITION.NONE});
      }else{
          pageHelper.changePage(fileHelper.getUrl(app.DEFAULT_PAGE_URL),  {transition: eventHelper.PAGE_TRANSITION.NONE});
      }
    },

    bootPage : function() {

        debug.log(this.TAG + '#bootPage()');
        var pageUrl = app.pageUrl;
        if (!pageUrl) {
            pageUrl = document.location.href;
        }
        if (pageUrl.indexOf('www/index.html') > 0) {
            return;
        }

        // Auto load Controller and View manager
        var scriptFiles = pageHelper.getControlScriptFiles(pageUrl);
        fileHelper.importScripts(scriptFiles);

        // Boot controller
        var controllerName = pageHelper.getControllerNameFromUrl(pageUrl);
        var controller = window[controllerName];
        app.bootPageController(controller);

        // Boot viewer
        var viewName = pageHelper.getViewNameFromUrl(pageUrl);
        var viewer = window[viewName];

        // Page Events
        var pageId = pageHelper.getPageIdFromUrl(pageUrl);
        // Use defined PAGE_ID if it already
        if (controller.PAGE_ID) {
            pageId = controller.PAGE_ID;
        }
        pageId = '#' + pageId.replace('#', '');

        // Callback: eventHelper.PAGE_BEFORE_SHOW
        var doPageBeforeShow = function(event, data) {
            sidebarPanel.init();
            // Init view
            app.bootPageViewer(viewer);
            // Handle before show event
            controller.receivePageEvents(eventHelper.PAGE_BEFORE_SHOW, event, data);

        };

        // Callback: eventHelper.PAGE_SHOW
        var doPageShow = function(event, data) {
            sidebarPanel.doPageShow();
            // Handle before show event
            controller.receivePageEvents(eventHelper.PAGE_SHOW, event, data);
        };

        // Callback: eventHelper.PAGE_BEFORE_HIDE
        var doPageBeforeHide = function(event, data) {
            sidebarPanel.destroy();
            controller.receivePageEvents(eventHelper.PAGE_BEFORE_HIDE, event, data);
        };

        // Callback: eventHelper.PAGE_HIDE
        var doPageHide = function(event, data) {
            controller.receivePageEvents(eventHelper.PAGE_HIDE, event, data);
            controller.destroy();
            controller = null;
            if (viewer && viewer.destroy) {
                viewer.destroy();
                viewer = null;
            }
        };

        $(document).one(eventHelper.PAGE_BEFORE_SHOW, pageId, doPageBeforeShow);
        $(document).one(eventHelper.PAGE_SHOW, pageId, doPageShow);
        $(document).one(eventHelper.PAGE_BEFORE_HIDE, pageId, doPageBeforeHide);
        $(document).one(eventHelper.PAGE_HIDE, pageId, doPageHide);
    },

    bootPageController : function(controller) {
        debug.log(this.TAG + '#bootPageController()');
        var errMsg = '';
        // Validate need methods
        if (!controller) {
            errMsg = this.TAG + '#Controller is undefined';
        } else if (!controller.PAGE_ID) {
            errMsg = this.TAG + '#PAGE_ID is undefined';
        } else if (!controller.initialize) {
            errMsg = this.TAG + '#initialize() is undefined';
        } else if (!controller.destroy) {
            errMsg = this.TAG + '#destroy() is undefined';
        } else if (!controller.receivePageEvents) {
            errMsg = this.TAG + '#receiveEvents() is undefined';
        }
        if (errMsg !== '') {
            return false;
        }
        // Initialize of Controller
        controller.initialize();
        return true;
    },

    bootPageViewer : function(viewer) {
        debug.log(this.TAG + '#bootPageViewer()');
        // Validate need methods
        if (!viewer) {
            debug.error(this.TAG + '#viewer is undefined');
            return false;
        }
        // Initialize of Controller
        if (viewer.initialize) {
            viewer.initialize();
        }

        return true;
    }
};

// Boot Application
app.initialize();