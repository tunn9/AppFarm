var loginController = {
    TAG: 'loginController',


    PAGE_ID: 'iot-login',


    initialize: function () {

    },

    /**
     * (Required) Destructor
     */
    destroy: function () {
        loginView.loginActionID.unbind(eventHelper.TAP);
    },

    receivePageEvents: function (eventId) {
        debug.log(this.TAG + ' #receiveEvents() eventId=' + eventId);
        switch (eventId) {
            case eventHelper.BACK_BUTTON:
                break;
            case eventHelper.PAGE_BEFORE_SHOW:
                loginController.doPageBeforeShow();
                break;
            case eventHelper.PAGE_SHOW:
                loginController.doPageShow();
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
        loginView.setHeightContent();
    },
    doPageShow: function () {
        loginController.bindEventHandlers();
        $('#iot-setting-page').on("tap",function (event) {
            event.preventDefault();
            pageHelper.changePage(fileHelper.getUrl('screen/settings/settings.html'), {transition: eventHelper.PAGE_TRANSITION.SLIDE});
        });

    },

    /*
     * Method bind event
     * @return void
     */
    bindEventHandlers: function () {
        loginView.loginActionID.on(eventHelper.TAP, loginController.handlerActionLogin);

        loginView.buttonRegister.on(eventHelper.TAP, loginController.handlerActionRegister);
        loginView.btnSupport.on(eventHelper.TAP, loginController.handlerChangePageSupport);

    },

    /*
     * Method check login value
     * @return booleans
     */
    handlerCheckDataLogin: function (username, password) {

        var online = network.check();
        if (username === '' || password === '') {
            loginView.showTextErrors(messages.login.textErrors);
            return true;
        } else if (!online) {
            loginView.showTextErrors(messages.network);
            return true;
        }
        return false;

    },

    /*
     * Method login data server
     * @return json
     */
    loginConnecServer: function (datalogin) {
        httpService.login('', datalogin).done(function (response) {
            debug.log(response);
            if (response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE) {
                datalogin.data   = response.data;
                datalogin.logged = constants.BOOLEAN.TRUE;
                storageManager.putLocalStorage(constants.LOGIN.DATA_LOGIN,datalogin);
                loginView.pageId.removeClass(loginView.CLASS.ACTIVE);
                pageHelper.changePage(fileHelper.getUrl(pageUrl.HOME_PAGE), {transition: eventHelper.PAGE_TRANSITION.SLIDE});
            } else {
                loginView.pageId.removeClass(loginView.CLASS.ACTIVE);
                loginView.showTextErrors(messages.login.fail);

            }
        }).fail(function (jqXHR) {
            loginView.pageId.removeClass(loginView.CLASS.ACTIVE);
            loginView.showTextErrors(messages.login.fail);
        });
    },

    /*
     * Method handler when tap button login
     *
     */
    handlerActionLogin: function (ev) {
        ev.preventDefault();

        loginView.userNameID.blur();
        loginView.passWordID.blur();
        var data = {};
        var username = loginView.userNameID.val();
        var password = loginView.passWordID.val();
        var control = loginController.handlerCheckDataLogin(username, password);
        if (control) return;

        loginView.showTextErrors('');
        loginView.pageId.addClass(loginView.CLASS.ACTIVE);
        data['username'] = username;
        data['password'] = password;
        loginController.loginConnecServer(data);

    },
    /*
     * Method handler when tap button register
     *
     */
    handlerActionRegister: function (ev) {
        ev.preventDefault();
        pageHelper.changePage(fileHelper.getUrl(pageUrl.REGISTER_PAGE), {transition: eventHelper.PAGE_TRANSITION.SLIDE});
    },
    /*
     * Method handler when tap button support
     *
     */
    handlerChangePageSupport: function (ev) {
        ev.preventDefault();
        storageManager.put(constants.USER.SUPPORT_PAGE, 'login');
        pageHelper.changePage(fileHelper.getUrl(pageUrl.SUPPORT), {transition: eventHelper.PAGE_TRANSITION.SLIDE});
    }
};