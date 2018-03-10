var loginView = {
    TAG: 'loginView',


    CLASS: {
        NOT_DATA: 'not-data',
        POPUP_OPEN: 'iot-popup-open',
        ACTIVE: 'login-active'
    },

    pageId: null,
    pageContent: null,
    pageFooter: null,
    userNameID: null,
    passWordID: null,
    loginActionID: null,
    loginErrors: null,
    buttonRegister: null,
    btnSupport: null,

    /*
     * Method set Dom
     * @return: Dom
     */
    initialize: function () {
        loginView.pageId = $('#iot-login');
        loginView.pageContent = $('.iot-page-login');
        loginView.pageFooter = $('.iot-login-footer');
        loginView.userNameID = $('#iot-username');
        loginView.passWordID = $('#iot-password');
        loginView.loginErrors = $('#iot-login-data-errors');
        loginView.loginActionID = $('#iot-login-control');
        loginView.buttonRegister = $('#iot-register-button');
        loginView.btnSupport = $('#iot-login-help');
    },

    /*
     * Method set Dom default
     * @return: null
     */
    destroy: function () {

        loginView.pageId = null;
        loginView.loginActionID = null;
        loginView.userNameID = null;
        loginView.passWordID = null;
        loginView.pageContent = null;
        loginView.pageFooter = null;
        loginView.buttonRegister = null;
        loginView.btnSupport = null;

    },

    /*
    * Method show text errors
    * @return string
    */
    showTextErrors: function (text) {
        if(text){

            loginView.loginErrors.html(text).addClass('eff');
        }else{
            loginView.loginErrors.html(text).removeClass('eff');
        }
    },
    
    /*
    * Method set height content 
    * @return init
    */
    setHeightContent: function () {
        var heightWindow = $(window).innerHeight();
        var heightCont   = heightWindow - 45;
        constants.LOGIN_HEIGHT = heightCont;
        loginView.pageContent.height(heightCont);
    }
};
