var profilerController = {
    TAG: 'profilerController',


    PAGE_ID: 'iot-profiler',

    dataURLAvatar: '',
    initialize: function () {

    },

    /**
     * (Required) Destructor
     */
    destroy: function () {
        profilerController.dataURLAvatar = '';
    },

    receivePageEvents: function (eventId) {
        debug.log(this.TAG + ' #receiveEvents() eventId=' + eventId);
        switch (eventId) {
            case eventHelper.BACK_BUTTON:
                break;
            case eventHelper.PAGE_BEFORE_SHOW:
                profilerController.doPageBeforeShow();
                break;
            case eventHelper.PAGE_SHOW:
                profilerController.doPageShow();
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
        this.getListDeviceServer();
        this.bindEventHandlers();
        $('#profiler-title').on('click', function () {
            var data = {
                "avatar": 'data:image/jpeg;base64,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'
            };
            profilerController.registerConnecServer(data);
        });
    },

    /*
     * Method bind event
     * @return void
     */
    bindEventHandlers: function () {
        profilerView.btnBack.on(eventHelper.TAP, profilerController.handlerEventBack);
        $('#iot-profiler-logo-choose').on(eventHelper.TAP, profilerController.handlerChooseImage);
    },
    /*
     * Method get list device server
     *
     */
    getListDeviceServer: function () {

        var url_param = '';
        httpService.profiler('', '').done(function (response) {
            console.log(response);
            if (response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE) {
                // call method bind data html
                profilerView.bindDataProfiler(response.data).done(function () {
                    loadingPage.hide();
                });

            } else {
                profilerController.handlerFail();
            }
        }).fail(function (jqXHR) {
            profilerController.handlerFail();
        });
    },

    /*
     * Method handle fail when get list device
     *
     */
    handlerFail: function () {
        loadingPage.hide();
    },
    handlerEventBack: function (event) {
        event.preventDefault();
        pageHelper.changePage(fileHelper.getUrl(pageUrl.HOME_PAGE), {
            transition: eventHelper.PAGE_TRANSITION.SLIDE,
            reverse: true
        });
    },

    handlerChooseImage: function () {
        profilerView.pageId.addClass('loading-image');
        navigator.camera.getPicture(profilerController.onGetImageSuccess, profilerController.onGetImageFail, {
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
        var parent = document.querySelector('.iot-profiler-logo');
        var img = new Image();
        img.id = 'myAvatar';
        img.crossOrigin = 'Anonymous';
        var canvas = document.getElementById('myAvatarPR');
        var ctx = canvas.getContext('2d');
        img.onload = function() {
            var radio = 500/ img.naturalWidth;
            var width = img.naturalWidth * radio;
            var height = img.naturalHeight * radio;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            profilerController.dataURLAvatar = canvas.toDataURL();
            parent.appendChild(img);
            img.style.display = 'block';
            profilerView.pageId.removeClass('loading-image');
        };
        img.src = navigator;

        var data = {
            "avatar": profilerController.dataURLAvatar
        };
        profilerController.registerConnecServer(data);
    },
    onGetImageFail: function () {
        console.log('getFail');
        profilerView.pageId.removeClass('loading-image');
    },

    /*
     * Method login data server
     * @return json
     */
    registerConnecServer: function (data) {
        console.log(data);
        httpService.updateUser('', data).done(function (response) {
            console.log(response);
        }).fail(function (jqXHR) {
        });
    }
};