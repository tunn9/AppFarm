/**
 * MarkReportController Class
 * @author FPT Software
 */

var manualController = {
    // CONSTANTS
    //
    TAG: 'manualController',

    /**
     * (Required)
     * Parent ID of page holder
     */
    PAGE_ID: 'setupautokv',
    data: null,
    timeOut: null,

    // PROPERTIES
    //

    // METHODS
    //

    /**
     * (Required)
     * Constructor
     */
    initialize: function () {
        debug.log(this.TAG + '#initialize()');
    },

    /**
     * (Required)
     * Destructor
     */
    destroy: function () {
        debug.log(this.TAG + '#destroy()');
        manualController.data = null;
        if(manualView.onoffSwitch){
        manualView.onoffSwitch.unbind('swipeleft swiperight');
        manualView.onoffSwitchTap.unbind(eventHelper.TAP);
        }
    },

    /**
     * (Required)
     * Execute events
     */
    receivePageEvents: function (eventId) {
        debug.log(this.TAG + '#receiveEvents() eventId=' + eventId);
        switch (eventId) {
            case eventHelper.BACK_BUTTON:

                break;
            case eventHelper.PAGE_BEFORE_SHOW:
                manualController.doPageBeforeShow();
                break;
            case eventHelper.PAGE_SHOW:
                manualController.doPageShow();
                break;
            default:
                break;
        }
    },
    doPageBeforeShow: function () {
        manualController.data = storageManager.get(constants.DATA_MANUAL);
        debug.log(manualController.data);
        manualView.titleHader.find('span').text(manualController.data.name);
    },

    doPageShow: function () {

        manualController.getListDeviceServer();
        manualController.bindEventHanlder();
    },

    /*
     * Method get list device server
     *
     */
    getListDeviceServer: function () {

        var url_param = {
            areaId: manualController.data.id,
            type: 3
        };
        httpService.getDeviceList(url_param, '').done(function (response) {
            console.log(response);
            if (response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE) {
                // call method bind data html
                manualController.data.controlID = response.data[0].controlId;
                manualView.bindDataListDevice(response.data).done(function () {
                    manualController.bindEventOnOff();
                    manualView.setHeightListDevice();
                    loadingPage.hide();
                });

            } else {
                manualController.handlerFail();
            }
        }).fail(function (jqXHR) {
            manualController.handlerFail();
        });
    },

    /*
     * Method handle fail when get list device
     *
     */
    handlerFail: function () {
        loadingPage.hide();
        manualView.setHeightListDevice();
    },

    /*
     * Method bind event for page
     *
     */
    bindEventHanlder: function () {
        manualView.backButtonID.on('tap', manualController.handlerBackPage);
        manualView.pageId.on('touchstart',function (event) {
            if(event.target.getAttribute('class') !== 'iot-manual-time'){
                $(this).find('.iot-manual-time').blur();
            }
        });

    },

    /*
     * Method hanlder back to page
     *
     */
    handlerBackPage: function (event) {
        event.preventDefault();
        pageHelper.changePage(fileHelper.getUrl(pageUrl.HOME_PAGE), {
            transition: eventHelper.PAGE_TRANSITION.SLIDE,
            reverse: true
        });
    },
    setDataMenaul: function (elm) {
        var menuaID = '' + manualController.data.controlID;
        var relayNode = {
            "mode":1,
            "cmdType":1,
            "multiTask":1,
            "mControlID": menuaID,
            "manual":{
                "mOutput": Number(elm.attr('data-id')),
                "mValue": 1,
                "mTimeout": 5
            }
        };
        if(elm.closest('.iot-list-device-manual').find('.onoffswitch-checkbox').is(':checked')){
            relayNode.manual.mValue = 1;
        }else{
            relayNode.manual.mValue = 0;
        }


        var timeElm = elm.closest('.iot-list-device-manual').find('.iot-manual-time').val();
        console.log(timeElm);
        if(timeElm){
            relayNode.manual.mTimeout = parseFloat(timeElm) * 60;
        }else{
            relayNode.manual.mTimeout = 300;
        }
        return relayNode;
    },

    /*
     * method handler on/off status device
     *
     */
    bindEventOnOff: function () {


        manualView.onoffSwitch.on('swipeleft', function (ev) {
            ev.preventDefault();
            var elm = $(this);
            var time = $(this).closest('li').find('.iot-manual-time').val();

            elm.closest('.ioi-device-status').addClass('userActive');
            var checkbox = elm.find('.onoffswitch-checkbox');
            if (checkbox.is(':checked')) {
                elm.find('.onoffswitch-checkbox').prop("checked", false);

                // get data
                var relayNode = manualController.setDataMenaul(elm);
                manualController.postDeviceServer(relayNode);
            }
            var currentAction = $(this).closest('.ioi-device-status').find('.onoffswitch').attr('data-id');
            storageManager.put('currentManual', 'Output' + currentAction);
        });
        manualView.onoffSwitch.on('swiperight', function (ev) {
            ev.preventDefault();
            var elm = $(this);
            var time = $(this).closest('li').find('.iot-manual-time').val();

            elm.closest('.ioi-device-status').addClass('userActive');
            var checkbox = elm.find('.onoffswitch-checkbox');
            if (!checkbox.is(':checked')) {
                checkbox.prop("checked", true);

                // get data
                var relayNode = manualController.setDataMenaul(elm);
                manualController.postDeviceServer(relayNode);
            }
            var currentAction = $(this).closest('.ioi-device-status').find('.onoffswitch').attr('data-id');
            storageManager.put('currentManual', 'Output' + currentAction);
        });
        manualView.onoffSwitchTap.on('tap', function (e) {
            e.preventDefault();
            var checkbox = $(this).prev();
            $(this).closest('.ioi-device-status').addClass('userActive');
            if (checkbox.is(':checked')) {
                checkbox.prop("checked", false);
            } else {
                checkbox.prop("checked", true);
            }
            var currentAction = $(this).closest('.ioi-device-status').find('.onoffswitch').attr('data-id');
            // get data
            var relayNode = manualController.setDataMenaul($(this));
            storageManager.put('currentManual', 'Output' + currentAction);
            manualController.postDeviceServer(relayNode);

        });
    },

    /*
     * Method post on Device
     *
     */
    postDeviceServer: function (data) {
        var param = {
            title: '',
            msg: 'Không thể kết nối với thiết bị.'
        };
        if(!mqttApp.conntectServer) {
            $.Alert(param , function () {
                pageHelper.changePage(fileHelper.getUrl(pageUrl.HOME_PAGE), {
                    transition: eventHelper.PAGE_TRANSITION.SLIDE,
                    reverse: true
                });
            });
        }else {
            loadingPage.showPageLoading(manualView.pageId);
            clearTimeout(manualController.timeOut);
            this.sendMessage(data);
            this.handleCheckTime(data);
        }

    },
    /*
     * send message
     *
     */
    sendMessage: function (data) {
        console.log(data);
        var message = new Paho.MQTT.Message(JSON.stringify(data));
         message.destinationName = 'smartFarm/'+manualController.data.gatewayID+ '/CONTROL';
        //message.destinationName = 'smartFarm/865209031922876/CONTROL';
        message.qos = 0;
        mqttApp.client.send(message);
    },
    /*
    * handle check time with action manual
    *
    */
    handleCheckTime: function (data) {
        var param = {
            title: '',
            msg: 'Hành động của bạn không thành công'
        };
        var elm = $('.userActive');
        var flag = true;
        if(elm.find('.onoffswitch-checkbox').is(':checked')){
            flag = false;
        }
        manualController.timeOut = setTimeout(function () {
            if(elm.hasClass('userActive')){
                elm.parent().find('.onoffswitch-checkbox').prop("checked", flag);
                elm.removeClass('userActive');
                $.Alert(param);
                storageManager.put('currentManual', null);
                console.log('action fail');
            }
            clearTimeout(manualController.timeOut);
        },10000);
    }


}; //End Class