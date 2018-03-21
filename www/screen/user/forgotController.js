var forgotController = {
    TAG: 'forgotController',


    PAGE_ID: 'iot-forgot',


    initialize: function () {

    },

    /**
     * (Required) Destructor
     */
    destroy: function () {
        forgotView.forgotActionID.unbind(eventHelper.TAP);
    },

    receivePageEvents: function (eventId) {
        debug.log(this.TAG + ' #receiveEvents() eventId=' + eventId);
        switch (eventId) {
            case eventHelper.BACK_BUTTON:
                break;
            case eventHelper.PAGE_BEFORE_SHOW:
                forgotController.doPageBeforeShow();
                break;
            case eventHelper.PAGE_SHOW:
                forgotController.doPageShow();
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
        forgotView.setHeightContent();
    },
    doPageShow: function () {
        forgotController.bindEventHandlers();
    },

    /*
     * Method bind event
     * @return void
     */
    bindEventHandlers: function () {
        forgotView.forgotActionID.on(eventHelper.TAP, forgotController.handlerActionforgot);
        forgotView.btnSupport.on(eventHelper.TAP, forgotController.handlerChangePageSupport);


        $('#iot-forgot-logincontrol').on(eventHelper.TAP, forgotController.handlerBackLoginPage);

    },

    /*
     * Method check forgot value
     * @return booleans
     */
    handlerCheckDataforgot: function (username) {

        var online = network.check();
        if (username === '') {
            forgotView.showTextErrors(messages.forgot.textErrors);
            return true;
        } else if (!online) {
            forgotView.showTextErrors(messages.network);
            return true;
        }
        return false;

    },

    /*
     * Method forgot data server
     * @return json
     */
    forgotConnecServer: function (dataforgot) {

        httpService.resetPassword('', dataforgot).done(function (response) {
            debug.log(response);
            if (response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE) {
                forgotView.pageId.removeClass(forgotView.CLASS.ACTIVE);
                forgotView.showTextErrors(messages.forgot.done);
            } else {
                forgotView.pageId.removeClass(forgotView.CLASS.ACTIVE);
                forgotView.showTextErrors(messages.forgot.fail);

            }
        }).fail(function (jqXHR) {
            forgotView.pageId.removeClass(forgotView.CLASS.ACTIVE);
            forgotView.showTextErrors(messages.forgot.fail);
        });
    },

    /*
     * Method handler when tap button forgot
     *
     */
    handlerActionforgot: function (ev) {
        ev.preventDefault();

        forgotView.userNameID.blur();
        var data = {};
        var username = forgotView.userNameID.val();
        var control = forgotController.handlerCheckDataforgot(username);
        if (control) return;

        forgotView.showTextErrors('');
        forgotView.pageId.addClass(forgotView.CLASS.ACTIVE);
        data['email'] = username;
        forgotController.forgotConnecServer(data);

    },
    /*
     * Method handler when tap button support
     *
     */
    handlerChangePageSupport: function (ev) {
    ev.preventDefault();
    storageManager.put(constants.USER.SUPPORT_PAGE, 'forgot');
    pageHelper.changePage(fileHelper.getUrl(pageUrl.SUPPORT), {transition: eventHelper.PAGE_TRANSITION.SLIDE});
    },
    /*
     * Method handler when tap button LOGIN
     *
     */
    handlerBackLoginPage: function (ev) {
        ev.preventDefault();
        pageHelper.changePage(fileHelper.getUrl(pageUrl.LOGIN_PAGE), {
            transition: eventHelper.PAGE_TRANSITION.SLIDE,
            reverse: true
        });
    }
};