

var sidebarPanel = {
    
    slidebarID: null,
    wapperOverlay: null,
    wapperLock: null,
    openClass: null,
    logout: null,
    profiler: null,
    history: null,
    setupAuto: null,
    deviceManager: null,
    support: null,

    init: function () {
        sidebarPanel.slidebarID     = $('#ioi-sidebar-wapper');
        sidebarPanel.wapperOverlay  = $('#ioi-sidebar-wapper-overlay');
        sidebarPanel.wapperLock     = $('#ioi-sidebar-wapper-lock');
        sidebarPanel.logout         = $('#iot-logout-action');
        sidebarPanel.profiler       = $('#iot-profiler');
        sidebarPanel.setupAuto      = $('#iot-setup-action');
        sidebarPanel.deviceManager  = $('#iot-device-manager');
        sidebarPanel.support        = $('#iot-support');
        sidebarPanel.history        = $('#iot-iot-history-action');
        sidebarPanel.openClass      = 'ioi-panel-open';
    },

    /*
     * Method Destroy
     *
     */
    destroy: function () {
        sidebarPanel.slidebarID.unbind('swipeleft');
        sidebarPanel.wapperOverlay.unbind('swipeleft tap');
        sidebarPanel.logout.unbind('tap');
        sidebarPanel.setupAuto.unbind('tap');
        sidebarPanel.deviceManager.unbind('tap');
        sidebarPanel.profiler.unbind('tap');
        sidebarPanel.support.unbind('tap');
        sidebarPanel.history.unbind('tap');

        sidebarPanel.resetDom();
    },

    /*
    * Set Dom when before hide
    *
    */
    resetDom: function () {

        sidebarPanel.slidebarID     = null;
        sidebarPanel.wapperOverlay  = null;
        sidebarPanel.wapperLock  = null;
        sidebarPanel.logout  =       null;
        sidebarPanel.profiler  =       null;
        sidebarPanel.openClass      = null;
        sidebarPanel.setupAuto     = null;
        sidebarPanel.deviceManager = null;
        sidebarPanel.support = null;
        sidebarPanel.history = null;
    },

    doPageShow: function () {
        sidebarPanel.bindEventSidebar();
    },

    open: function () {
        sidebarPanel.slidebarID.addClass(sidebarPanel.openClass);
    },
    close: function () {
        sidebarPanel.slidebarID.removeClass(sidebarPanel.openClass);
    },
    bindEventSidebar: function () {
        sidebarPanel.slidebarID.on('swipeleft',function (event) {
            event.preventDefault();
            sidebarPanel.close();
        });
        sidebarPanel.wapperOverlay.on('swipeleft',function (event) {
            event.preventDefault();
            sidebarPanel.close();
        });
        sidebarPanel.wapperOverlay.on('tap',function (event) {
            event.preventDefault();
            sidebarPanel.close();
        });

        sidebarPanel.logout.on('tap',sidebarPanel.handlerLogout);
        sidebarPanel.setupAuto.on('tap',sidebarPanel.handlerSetupAuto);
        sidebarPanel.deviceManager.on('tap',sidebarPanel.handlerDeviceManager);
        sidebarPanel.profiler.on('tap',sidebarPanel.handlerProfiler);
        sidebarPanel.support.on('tap',sidebarPanel.handlerSupport);
        sidebarPanel.history.on('tap',sidebarPanel.handlerHistory);
    },

    /*
    * Method Handle logout when click button sidebar
    * @param: event
    * @return: Void
    */
    handlerLogout: function (event) {
        if(event !== undefined){
            event.preventDefault();
        }
        var elm = $(this);
        elm.addClass('loading-sidebar');
        sidebarPanel.wapperLock.addClass('sidebar-open-lock');
        httpService.logout('','').done(function (response) {
            debug.log(response);
            if(response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE){
                storageManager.deleteLocalStorage(constants.LOGIN.DATA_LOGIN);
                sidebarPanel.close();
                elm.removeClass('loading-sidebar');
                sidebarPanel.wapperLock.removeClass('sidebar-open-lock');
                if(mqttApp.conntectServer){
                    mqttApp.disConnect();
                }
                var pagelogin = setTimeout(function () {
                    pageHelper.changePage(fileHelper.getUrl(pageUrl.LOGIN_PAGE),  {transition: eventHelper.PAGE_TRANSITION.SLIDE,  reverse: true});
                    clearTimeout(pagelogin);
                },300);
            }else{
                sidebarPanel.close();
                elm.removeClass('loading-sidebar');
                sidebarPanel.wapperLock.removeClass('sidebar-open-lock');
            }
        }).fail(function (jqXHR) {
            debug.log("fail" + jqXHR);
            sidebarPanel.close();
            elm.removeClass('loading-sidebar');
            sidebarPanel.wapperLock.removeClass('sidebar-open-lock');
        });

    },
    handlerSetupAuto: function (event) {
        event.preventDefault();
        sidebarPanel.close();
        var pagelogin = setTimeout(function () {
            pageHelper.changePage(fileHelper.getUrl(pageUrl.LIST_SETTINGS),  {transition: eventHelper.PAGE_TRANSITION.SLIDE});
            clearTimeout(pagelogin);
        },300);
    },
    handlerDeviceManager: function (event) {
        event.preventDefault();
        sidebarPanel.close();
        var deviceManager = setTimeout(function () {
            pageHelper.changePage(fileHelper.getUrl(pageUrl.DEVICE_MANAGER),  {transition: eventHelper.PAGE_TRANSITION.SLIDE});
            clearTimeout(deviceManager);
        },300);
    },
    handlerProfiler: function (event) {
        event.preventDefault();
        sidebarPanel.close();
        var deviceManager = setTimeout(function () {
            pageHelper.changePage(fileHelper.getUrl(pageUrl.PROFILER),  {transition: eventHelper.PAGE_TRANSITION.SLIDE});
            clearTimeout(deviceManager);
        },300);
    },
    handlerSupport: function (event) {
        event.preventDefault();
        storageManager.put(constants.USER.SUPPORT_PAGE, 'default');
        sidebarPanel.close();
        var deviceManager = setTimeout(function () {
            pageHelper.changePage(fileHelper.getUrl(pageUrl.SUPPORT),  {transition: eventHelper.PAGE_TRANSITION.SLIDE});
            clearTimeout(deviceManager);
        },300);
    },
    handlerHistory: function (event) {
        event.preventDefault();
        sidebarPanel.close();
        var deviceManager = setTimeout(function () {
            pageHelper.changePage(fileHelper.getUrl(pageUrl.HISTORY),  {transition: eventHelper.PAGE_TRANSITION.SLIDE});
            clearTimeout(deviceManager);
        },300);
    }

};