var registerView = {
    TAG: 'registerView',


    CLASS: {
        REGISTER_ACTIVE: 'register-active'
    },

    pageId: null,
    pageWapper: null,
    btnRgBack: null,
    tabsControl: null,
    emailID: null,
    phoneID: null,
    passwordID: null,
    passwordID2: null,
    buttonRegister: null,
    registerErrors: null,
    loginControl: null,
    buttonSupport: null,
    btnNext: null,
    btnSelect: null,
    btnCity: null,
    btnCityItem: null,
    btnListDistrict: null,

    /*
     * Method set Dom
     * @return: Dom
     */
    initialize: function () {
        registerView.btnRgBack = $('#ioi-back-register');
        registerView.pageId = $('#iot-register');
        registerView.pageWapper = $('.iot-page-register');
        registerView.tabsControl = $('#form-register-tabs');
        registerView.registerErrors = $('#iot-register-data-errors, .iot-register-errors');

        registerView.emailID = $('#iot-email');
        registerView.phoneID = $('#iot-phonenumber');
        registerView.passwordID = $('#iot-rg-password');
        registerView.passwordID2 = $('#iot-rg-password2');
        registerView.buttonRegister = $('#iot-register-control');
        registerView.loginControl = $('#iot-register-logincontrol');
        registerView.buttonSupport = $('#iot-register-help');
        registerView.btnNext = $('#iot-register-next');
        registerView.btnSelect = $('.iot-btn-select');
        registerView.btnCity = $('#iot-city');
        registerView.btnCityItem = $('.iot-list-city-item');
        registerView.btnListDistrict = $('#iot-list-district');


    },

    /*
     * Method set Dom default
     * @return: null
     */
    destroy: function () {
        registerView.btnRgBack = null;
        registerView.pageId = null;
        registerView.pageWapper = null;
        registerView.tabsControl = null;
        registerView.buttonRegister = null;
        registerView.emailID = null;
        registerView.passwordID = null;
        registerView.passwordID2 = null;
        registerView.phoneID = null;
        registerView.registerErrors = null;
        registerView.loginControl = null;
        registerView.buttonSupport = null;
        registerView.btnNext = null;
        registerView.btnSelect = null;
        registerView.btnCity = null;
        registerView.btnCityItem = null;
        registerView.btnListDistrict = null;
    },


    /*
     * Method show text errors
     * @return string
     */
    showTextErrors: function (text) {
        if(text){
            registerView.registerErrors.html(text).addClass('eff');
        }else{
            registerView.registerErrors.html(text).removeClass('eff');
        }
    },
    showStyleErrors: function (elm) {
        if(elm){
            elm.parent().addClass('error');
        }else{
            $('.iot-register-form-input').removeClass('error');
        }
    },

    /*
     * Method set height content
     * @return init
     */
    setHeightWapper: function () {
        registerView.pageWapper.height(constants.LOGIN_HEIGHT - 55);
        var width = $(window).innerWidth();
        registerView.tabsControl.css('width', width*2 + 'px' );
    },

    /*
    * Method render list district
    *
    */
    renderListDistrict: function (data) {
        var html = '';
        for( var i = 0; i< data.length; i++ ) {
            html +='<li class="district-item">'+data[i]+'</li>';
        }
        registerView.btnListDistrict.html(html);
        $('#iot-district').text('Quận huyện');
    }

};
