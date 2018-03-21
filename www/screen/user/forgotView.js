var forgotView = {
    TAG: 'forgotView',


    CLASS: {
        NOT_DATA: 'not-data',
        POPUP_OPEN: 'iot-popup-open',
        ACTIVE: 'forgot-active'
    },

    pageId: null,
    pageContent: null,
    pageFooter: null,
    userNameID: null,
    passWordID: null,
    forgotActionID: null,
    forgotErrors: null,
    buttonRegister: null,
    btnSupport: null,

    /*
     * Method set Dom
     * @return: Dom
     */
    initialize: function () {
        forgotView.pageId = $('#iot-forgot');
        forgotView.pageContent = $('.iot-page-forgot');
        forgotView.pageFooter = $('.iot-forgot-footer');
        forgotView.userNameID = $('#iot-forgot-username');
        forgotView.forgotErrors = $('#iot-forgot-data-errors');
        forgotView.forgotActionID = $('#iot-forgot-control');
        forgotView.buttonRegister = $('#iot-register-button');
        forgotView.btnSupport = $('#iot-forgot-help');
    },

    /*
     * Method set Dom default
     * @return: null
     */
    destroy: function () {

        forgotView.pageId = null;
        forgotView.forgotActionID = null;
        forgotView.userNameID = null;
        forgotView.passWordID = null;
        forgotView.pageContent = null;
        forgotView.pageFooter = null;
        forgotView.buttonRegister = null;
        forgotView.btnSupport = null;

    },

    /*
     * Method show text errors
     * @return string
     */
    showTextErrors: function (text) {
        if(text){

            forgotView.forgotErrors.html(text).addClass('eff');
        }else{
            forgotView.forgotErrors.html(text).removeClass('eff');
        }
    },

    /*
     * Method set height content 
     * @return init
     */
    setHeightContent: function () {
        var heightWindow = $(window).innerHeight();
        var heightCont   = heightWindow - 45;
        constants.forgot_HEIGHT = heightCont;
        forgotView.pageContent.height(heightCont);
    }
};
