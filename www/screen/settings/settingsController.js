var settingsController = {
    TAG: 'settingsController',


    PAGE_ID: 'iot-settings',


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
                settingsController.doPageBeforeShow();
                break;
            case eventHelper.PAGE_SHOW:
                settingsController.doPageShow();
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
        var datalocal =   storageManager.getLocalStorage('mqtt_hostdata');
        if(datalocal){
            $('#iot-host').val(datalocal.host);
            $('#iot-port').val(datalocal.port);
            $('#iot-userName').val(datalocal.username);
            $('#iot-passwordsetting').val(datalocal.password);
        }
    },
    doPageShow: function () {

        settingsController.bindEventHandlers();


    },

    /*
     * Method bind event
     * @return void
     */
    bindEventHandlers: function () {
        $('#iot-setting-control').on('tap',function (event) {
            event.preventDefault();
            var host = $('#iot-host').val();
            var port = $('#iot-port').val();
            var userName = $('#iot-userName').val();
            var password = $('#iot-passwordsetting').val();
            var data = {
              'host': host,
              'port': port,
              'username': userName,
              'password': password
            };
            console.log(data);

            storageManager.putLocalStorage('mqtt_hostdata',data);
            var setdata = setTimeout(function () {
                pageHelper.changePage(fileHelper.getUrl(pageUrl.LOGIN_PAGE), {
                    transition: eventHelper.PAGE_TRANSITION.SLIDE,
                    reverse: true
                });
                clearTimeout(setdata);
            },300);
        });
    }

};