var registerController = {
    TAG: 'registerController',


    PAGE_ID: 'iot-register',

    dataURLAvatar: '',
    initialize: function () {

    },

    /**
     * (Required) Destructor
     */
    destroy: function () {
        registerView.buttonRegister.unbind(eventHelper.TAP);
        registerController.dataURLAvatar = '';
    },

    receivePageEvents: function (eventId) {
        debug.log(this.TAG + ' #receiveEvents() eventId=' + eventId);
        switch (eventId) {
            case eventHelper.BACK_BUTTON:
                break;
            case eventHelper.PAGE_BEFORE_SHOW:
                registerController.doPageBeforeShow();
                break;
            case eventHelper.PAGE_SHOW:
                registerController.doPageShow();
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
        registerView.setHeightWapper();
    },
    doPageShow: function () {

        registerController.bindEventHandlers();
    },



    /*
     * Method bind event
     * @return void
     */
    bindEventHandlers: function () {
        registerView.buttonRegister.on(eventHelper.TAP, registerController.handleRegisterUser);
        registerView.loginControl.on(eventHelper.TAP, registerController.handlerBackLoginPage);
        registerView.buttonSupport.on(eventHelper.TAP, registerController.handlerChangePageSupport);
        registerView.btnNext.on(eventHelper.TAP, registerController.handlerNextRegsiter);
        registerView.btnRgBack.on(eventHelper.TAP, registerController.handlerOnTapBack);
        registerView.pageId.on(eventHelper.TAP, registerController.handlerOnTapPageId);
        registerController.bindEventHandlerInfo();
        
        $('#choose-image').on(eventHelper.TAP, registerController.handlerChooseImage);
    },
    /*
     * Method bind event select city
     * @return void
     */
    bindEventHandlerInfo: function () {
        registerView.btnSelect.on(eventHelper.TAP, registerController.handlerOnTapBtnSelect);
        registerView.btnCityItem.on(eventHelper.TAP, registerController.handlerOnTapBtnCityItem);
        registerView.btnListDistrict.on(eventHelper.TAP, '.district-item', registerController.handlerOnTapBtnDistrictItem);
    },
    /*
    * Method check empty
    *
    */
    handlerCheckFieldEmpty: function () {
        var city = $('#iot-city').text();
        var district = $('#iot-district').text();
        var ward = $('#iot-address').val();
        var name = $('#iot-fullname').val();
        if( Validation.isBlank(name) ) {
            registerView.showTextErrors(messages.user.nameEmpty);
            registerView.showStyleErrors($('#iot-fullname'));
            return true;
        } else if ( Validation.isBlank(city) ) {
            registerView.showTextErrors(messages.user.nameCity);
            $('#iot-city').addClass('error');
            return true;
        } else if ( Validation.isBlank(district) ) {
            registerView.showTextErrors(messages.user.nameDistrict);
            $('#iot-district').addClass('error');
            return true;
        }else if ( Validation.isBlank(ward) ) {
            registerView.showTextErrors(messages.user.nameWard);
            registerView.showStyleErrors($('#iot-address'));
            return true;
        }

    },

    /*
     * Method check login value
     * @return booleans
     */
    handlerValidateDataRegister: function (email, phone, password, password2) {
        var online = network.check();

        if (!online) {
            registerView.showTextErrors(messages.network);
            return true;
        }else {

            var emailCheck = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
            if (!emailCheck) {
                registerView.showTextErrors(messages.user.emailErros);
                return true;
            }
            var first = phone.substring(0,1);
            if(!Validation.validatePhone(phone) || first != 0){
                registerView.showTextErrors(messages.user.phoneErros);
                return true;
            }

            if( password.length < 7  ){
                registerView.showTextErrors(messages.user.passwordErros2);
                return true;
            }

            if( password !== password2 ){
                registerView.showTextErrors(messages.user.passwordErros);
                return true;
            }
        }

        return false;

    },
    handleRegisterUser: function (event) {
        event.preventDefault();
        debug.log("action Register");
        registerView.showTextErrors('');
        registerView.emailID.blur();
        registerView.phoneID.blur();
        registerView.passwordID.blur();
        registerView.passwordID2.blur();

        var name = $('#iot-fullname').val();
        var phone = registerView.phoneID.val();
        var email = registerView.emailID.val();
        var city = $('#iot-city').text();
        var district = $('#iot-district').text();
        var ward = $('#iot-address').val();
        var password = registerView.passwordID.val();
        var password2 = registerView.passwordID2.val();

        var control = registerController.handlerValidateDataRegister(email, phone, password, password2);
        if (control) return;

        registerView.pageId.addClass(registerView.CLASS.REGISTER_ACTIVE);

        var data = {
            "name": name,
            "email": email,
            "phoneNumber": phone,
            "city": city,
            "district": district,
            "password": password,
            "ward": ward,
            "avatar": registerController.dataURLAvatar
        };
        registerController.registerConnecServer(data);

    },
    /*
     * Method login data server
     * @return json
     */
    registerConnecServer: function (data) {
        httpService.register('', data).done(function (response) {
            console.log(response);
            if (response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE) {
                    // registerController.loginConnecServer(data)
                registerView.pageId.removeClass(registerView.CLASS.REGISTER_ACTIVE);
                registerView.showTextErrors('Đăng ký thành công!');
            } else {
                registerView.pageId.removeClass(registerView.CLASS.REGISTER_ACTIVE);
                registerView.showTextErrors(response.message);

            }
        }).fail(function (jqXHR) {
            registerView.pageId.removeClass(registerView.CLASS.REGISTER_ACTIVE);
            registerView.showTextErrors(messages.user.fail);
        });
    },
    /*
     * Method login data server
     * @return json
     */
    loginConnecServer: function (data) {
        var datalogin = {
          "username": data.email,
           "password": data.password
        };
        httpService.login('', datalogin).done(function (response) {
            if (response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE) {
                datalogin.data = response.data;
                datalogin.logged = constants.BOOLEAN.TRUE;
                storageManager.putLocalStorage(constants.LOGIN.DATA_LOGIN,datalogin);
                registerView.pageId.removeClass(registerView.CLASS.REGISTER_ACTIVE);
                setTimeout(function () {
                    pageHelper.changePage(fileHelper.getUrl(pageUrl.HOME_PAGE), {transition: eventHelper.PAGE_TRANSITION.SLIDE});
                },800);
            } else {
                registerView.pageId.removeClass(registerView.CLASS.REGISTER_ACTIVE);
            }
        }).fail(function (jqXHR) {
            debug.log(jqXHR);
            registerView.pageId.removeClass(registerView.CLASS.REGISTER_ACTIVE);
        });
    },

    /*
    * Method handl back login page
    *
    */
    handlerBackLoginPage: function (event) {
        event.preventDefault();
        $('input').blur();
        pageHelper.changePage(fileHelper.getUrl(pageUrl.LOGIN_PAGE), {
            transition: eventHelper.PAGE_TRANSITION.SLIDE,
            reverse: true
        });
    },
    /*
     * Method handler when tap button support
     *
     */
    handlerChangePageSupport: function (ev) {
        ev.preventDefault();
        storageManager.put(constants.USER.SUPPORT_PAGE, 'register');
        pageHelper.changePage(fileHelper.getUrl(pageUrl.SUPPORT), {transition: eventHelper.PAGE_TRANSITION.SLIDE});
    },
    /*
     * Method handler when tap button back
     *
     */
    handlerOnTapBack: function (event) {
        event.preventDefault();
        if(registerView.tabsControl.hasClass('form-registe-two')){
            registerView.tabsControl.removeClass('form-registe-two');
        }else{
            pageHelper.changePage(fileHelper.getUrl(pageUrl.LOGIN_PAGE), {
                transition: eventHelper.PAGE_TRANSITION.SLIDE,
                reverse: true
            });
        }
    },

    /*
     * Method handler when tap button next regsiter
     *
     */
    handlerNextRegsiter: function (event) {
        event.preventDefault();
        $('input').blur();
        registerView.showTextErrors(messages.user.empty);
        registerView.showStyleErrors();
        $('#iot-city, #iot-district').removeClass('error');
        var phone = registerView.phoneID.val();
        var email = registerView.emailID.val();

        var checkEmpty = registerController.handlerCheckFieldEmpty();
        if (checkEmpty) return;
        var control = registerController.handlerValidateDataRegister(email, phone, 1234566,1234566);
        if (control) return;
        registerView.tabsControl.addClass('form-registe-two');
    },
    /*
    * Method handler when PageId
    * 
    */
    handlerOnTapPageId: function () {

        $('.iot-condition-register').removeClass('active');
    },
    /*
    * Method handler when button city
    *
    */
    handlerOnTapBtnSelect: function (event) {
        event.preventDefault();
        event.stopPropagation();
        $('input').blur();
        if(event.target.getAttribute('id') === 'iot-district'){
            if($('#iot-list-district').html().trim() === ''){
                return;
            }
        }
        $('.iot-btn-select').removeClass('active');
        $(this).addClass('active');
    },
    /*
     * Method get data distric
     * @return void
     */
    getDataDistrict: function (district) {
        var url = document.location.href;
        var rootPath = url.split('/www')[0];
        var filePath = '/www/assets/data/district/'+district+'.json';
        var path = rootPath + filePath;
        httpService.importJSONFile(path, function (dataSucces) {
            registerView.renderListDistrict(dataSucces.data);
        });
    },
    /*
    * Method handler when button btnCityItem
    *
    */
    handlerOnTapBtnCityItem: function (event) {
        event.preventDefault();
        event.stopPropagation();
        console.log('City');
        $('input').blur();
        var value = $(this).text();
        var valueAlias = $(this).attr('data-value');
        registerView.btnCity.text(value);
        registerController.getDataDistrict(valueAlias);
        $('.iot-btn-select').removeClass('active');
    },
    /*
    * Method handler when button DistrictItem
    *
    */
    handlerOnTapBtnDistrictItem: function (event) {
        event.preventDefault();
        event.stopPropagation();
        console.log('district');
        $('input').blur();
        var value = $(this).text();
        $('#iot-district').text(value);
        $('.iot-btn-select').removeClass('active');
    },

    handlerChooseImage: function () {
        registerView.pageId.addClass('loading-image');
        navigator.camera.getPicture(registerController.onGetImageSuccess, registerController.onGetImageFail, {
            quality: 50,
            destinationType: Camera.DestinationType.NATIVE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            mediaType: Camera.MediaType.PICTURE,
            correctOrientation: true,
            exifInfo: false
        });
    },

    onGetImageSuccess: function (navigator) {
        console.log(navigator);
        var parent = document.querySelector('.iot-register-logo');
        var img = new Image();
        img.id = 'myAvatar';
        img.crossOrigin = 'Anonymous';
        var canvas = document.getElementById('myAvatarHide');
        var ctx = canvas.getContext('2d');
        img.onload = function() {
            var radio = 500/ img.naturalWidth;
            var width = img.naturalWidth * radio;
            var height = img.naturalHeight * radio;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            registerController.dataURLAvatar = canvas.toDataURL();
            parent.appendChild(img);
            img.style.display = 'block';
            registerView.pageId.removeClass('loading-image');
        };
        img.src = navigator;
    },
    onGetImageFail: function () {
        console.log('getFail');
        registerView.pageId.removeClass('loading-image');
    }

};