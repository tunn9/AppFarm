var supportController = {
    TAG: 'supportController',


    PAGE_ID: 'iot-support',


    initialize: function () {

    },

    /**
     * (Required) Destructor
     */
    destroy: function () {

    },

    receivePageEvents: function (eventId) {
        debug.log(this.TAG + ' #receiveEvents() eventId=' + eventId);
        switch (eventId) {
            case eventHelper.BACK_BUTTON:
                break;
            case eventHelper.PAGE_BEFORE_SHOW:
                supportController.doPageBeforeShow();
                break;
            case eventHelper.PAGE_SHOW:
                supportController.doPageShow();
                break;
            case eventHelper.PAGE_BEFORE_HIDE:

                break;
            case eventHelper.PAGE_HIDE:
                break;
            case eventHelper.DEVICE_READY:
                break;
            default:
                break;
        }
    },
    doPageBeforeShow: function () {

    },
    doPageShow: function () {

        this.bindEventHandlers();
    },

    /*
     * Method bind event
     * @return void
     */
    bindEventHandlers: function () {
        supportView.btnBack.on(eventHelper.TAP, supportController.handlerEventBack);

    },
    handlerEventBack: function (event) {
        event.preventDefault();
        var supportPage = storageManager.get(constants.USER.SUPPORT_PAGE);
        var pageBack = pageUrl.HOME_PAGE;
        if(supportPage === 'login'){
            pageBack = pageUrl.LOGIN_PAGE;
        }else if( supportPage === 'register' ) {
            pageBack = pageUrl.REGISTER_PAGE;
        }else if( supportPage === 'forgot' ) {
            pageBack = pageUrl.FORGET_PASS;
        }
        pageHelper.changePage(fileHelper.getUrl(pageBack), {
            transition: eventHelper.PAGE_TRANSITION.SLIDE,
            reverse: true
        });
    }
};