/**
 * MarkReportController Class
 * @author FPT Software
 */

var editSettingsController = {
    // CONSTANTS
    //
    TAG: 'editSettingsController',

    /**
     * (Required)
     * Parent ID of page holder
     */
    PAGE_ID: 'page-editAuto',

    // PROPERTIES
    //
    DATAS: null,

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
        this.DATAS = null;
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
                this.doPageBeforeShow();
                break;
            case eventHelper.PAGE_SHOW:
                this.doPageShow();
                break;
            default:
                break;
        }
    },
    doPageBeforeShow: function () {
        editSettingsView.handlerBeforeShow();
    },

    doPageShow: function () {

        this.getListDataByAreaID();
        this.hanbdeBingEvent();
        this.getListAreaLocal();
    },


    /*
     * Method get list Area from local
     *
     */
    getListAreaLocal: function () {
        var data = storageManager.get(constants.DATA_AREA);

     //   editSettingsView.bingDataListArea(data);
    },

    /*
    * Handle bind event
    *
    */
    hanbdeBingEvent: function () {
        debug.log('bindEvent');
        this.handlerSelectCondition();

        editSettingsView.backButton.on(eventHelper.TAP,editSettingsController.handlerBackToPage);

        $('.overlay-mobiscroll').on(eventHelper.TOUCH_START, function (e) {
            e.preventDefault();
        });

        $('#iot-editAuto-bytime').on(eventHelper.TAP, '.time-week-detail', editSettingsView.activeTimeWeekEdit);
        $('#iot-editAuto-action').on(eventHelper.TAP, editSettingsController.handlerActionAutoEditSeting);
    },

    /*
     * Method get list data server by areaID
     *
     */
    getListDataByAreaID: function () {
        var areaID = storageManager.get(constants.AUTO_EDIT_KEY);
        var url_param = '';
        httpService.editSettingsAuto(url_param,'', areaID.id).done(function (res) {
            console.log(res);
            editSettingsController.DATAS = res.data;
            editSettingsView.bindingCoditionSetting(res.data);
            editSettingsView.handleShowSettingByTime(res.data);
            editSettingsController.bindEventOnOff();
            editSettingsView.bingDataLisCondition(res.data.output).done(function () {
                loadingPage.hide();
                editSettingsView.setHeightContent();
                editSettingsController.handlerAddOrRemove();
                editSettingsController.handlerSelectSensor();
                editSettingsController.handlerAutoByTime();
            }).fail(function () {
                loadingPage.hide();
            });

            // call method bind device by time
            editSettingsView.bindDeviceList(res.data.output);
        });

    },

    /*
     * method handler on/off status device
     *
     */
    bindEventOnOff: function () {
        $('#ioi-content-editAuto').on('swipeleft', '.onoffswitch', function (e) {
            var checkbox = $(this).find('.onoffswitch-checkbox');
            if (checkbox.is(':checked')) {
                $(this).find('.onoffswitch-checkbox').prop("checked", false);
            }
        });
        $('#ioi-content-editAuto').on('swiperight', '.onoffswitch', function (e) {
            var checkbox = $(this).find('.onoffswitch-checkbox');
            if (!checkbox.is(':checked')) {
                checkbox.prop("checked", true);
            }
        });
        $('#ioi-content-editAuto').on('tap', '.onoffswitch-action', function (e) {
            e.preventDefault();
            var checkbox = $(this).prev();
            if (checkbox.is(':checked')) {
                checkbox.prop("checked", false);

            } else {
                checkbox.prop("checked", true);
            }
        });


    },

    /*
    * Handle show list select
    *
    */
    /*
     * Method select  condition
     *
     */
    handlerSelectCondition: function () {

        $('#ioi-content-editAuto').on(eventHelper.TAP,'.iot-condition-select',function (e) {
            e.preventDefault();
            e.stopPropagation();
            if($(this).hasClass('active')){
                $('.iot-condition').removeClass('active');
            }else{
                $('.iot-condition').removeClass('active');
                $(this).addClass('active');
            }

        });

        $('#ioi-content-editAuto').on(eventHelper.TAP,'#iot-condition-select-name li',function (e) {
            e.preventDefault();
            e.stopPropagation();
            var elm = $(this);
            $('.iot-condition').removeClass('active');
            elm.parent().prev().text(elm.text());
            elm.parent().prev().attr('data-type',elm.attr('data-type'));
        });

        $('#sensor-infor-editauto').on('tap',function () {
            $('#iot-editAuto-bytime').removeClass('bytime-show');
            if(!$('.iot-editAuto-list').hasClass('active-condition')){
                $('.iot-editAuto-list').addClass('active-condition');
            }
        });

        $('#autoby-time-editauto').on('tap',function () {

            $('.iot-editAuto-list').removeClass('active-condition');
            if(!$('#iot-editAuto-bytime').hasClass('bytime-show')){
                $('#iot-editAuto-bytime').addClass('bytime-show');
            }
        });


        // select value sensor
        $('#ioi-content-editAuto').on(eventHelper.TAP,'.iot-editauto-sensor-value li',function (e) {
            e.preventDefault();
            e.stopPropagation();
            var elm = $(this);
            $('.iot-condition').removeClass('active');
            var sensorValue = elm.attr('data-value');
            elm.parent().prev().text(elm.text()).attr('data-senson',sensorValue);

        });
    },

    handlerAddOrRemove: function () {
        $('.iot-editAuto-list').on('tap','.iot-editAuto-condition-addnew',function (event) {
            event.preventDefault();
            var elm = $(this);
            if( $('.iot-condition-list').length === 6 ) return ;

            var DomElement = $('.iot-condition-list:eq(0)').clone();
            // DomElement.find('.iot-condition-content li[data-value='+parent+']').remove();
            DomElement.find('input').val('');
            DomElement.find('.iot-condition-sensor').text('Lựa chọn điều kiện');

            elm.closest('.iot-condition-list').after(DomElement);

        });

        $('.iot-editAuto-list').on('tap','.iot-editauto-condition-remove',function (event) {
            event.preventDefault();
            var elm = $(this);
            if($('.iot-condition-list').length > 1){
                var param = {
                    title: '',
                    msg: 'Bạn có muốn xóa điều kiện này không?'
                };
                $.Confirm(param,function (res) {
                    if(res){
                        elm.closest('.iot-condition-list').remove();
                    }
                });

            }
        });
    },

    /* Method select sensor
     *
     */
    handlerSelectSensor: function () {

        // show list sensor
        $('#ioi-content-editAuto').on(eventHelper.TAP,'.iot-condition-sensor',function (e) {
            e.preventDefault();
            e.stopPropagation();
            if($(this).hasClass('active')){
                $('.iot-condition').removeClass('active');
            }else{
                $('.iot-condition').removeClass('active');
                $(this).addClass('active');
            }

        });

        // select value sensor
        $('#ioi-content-editAuto').on(eventHelper.TAP,'.iot-editAuto-sensor-value li',function (e) {
            e.preventDefault();
            e.stopPropagation();
            var elm = $(this);
            $('.iot-condition').removeClass('active');
            var sensorValue = elm.attr('data-value');
            elm.parent().prev().text(elm.text()).attr('data-senson',sensorValue);

            // var unit = elm.closest('.iot-condition-list').find('.unit');
            // switch (sensorValue){
            //     case 'airTemp':
            //     case 'airHum':
            //         unit.text('°C');
            //         break;
            //     case 'soilTemp':
            //     case 'soilHum':
            //         unit.text('%RH');
            //         break;
            //     case 'elecNeg':
            //         unit.text('mS /cm');
            //         break;
            // }
        });
    },

    /*
     * Hanlder When user choose setting by time
     *
     */
    handlerAutoByTime: function () {

        $('#ioi-content-editAuto').on(eventHelper.TAP,'.time-start',function (event) {
            event.preventDefault();
            var elm = $(this);
            $('#iot-datemobi').val(elm.text());
            editSettingsController.handlerMobileScroll();
            elm.addClass('active-mobi');
            $('.iot-theme-mobiscroll').addClass('eff-mobi');
        });

        $('#iot-mobilescroll-complete').on(eventHelper.TAP,function (event) {
            event.preventDefault();
            var value = $('#iot-datemobi').val();
            debug.log(value);
            $('.active-mobi').html(value);
            $('.time-start').removeClass('active-mobi');
            $('.iot-theme-mobiscroll').addClass('eff-mobi-hide');
            setTimeout(function () {
                $('#iot-datemobi').mobiscroll('destroy');
                $('.iot-theme-mobiscroll').removeClass('eff-mobi-hide eff-mobi');
            },300);
        });
    },

    /*
     * Hanlde mobile scroll form
     *
     *
     */
    handlerMobileScroll: function () {
        $('#iot-datemobi').mobiscroll().time({
            theme: 'iot-theme',     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: 'mixed',       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: 'inline', // Specify display mode like: display: 'bottom' or omit setting to use default
            timeFormat: 'HH:ii',
            timeWheels: 'HHii'
        });
    },


    /*
    * Handler event back to page
    *
    */
    handlerBackToPage: function (e) {
        e.preventDefault();
        pageHelper.changePage(fileHelper.getUrl(pageUrl.LIST_SETTINGS), {
            transition: eventHelper.PAGE_TRANSITION.SLIDE,
            reverse: true
        });
    },


    coverDateUTC: function (time) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var currentDate = mm +'/'+ dd +'/'+ yyyy;
        var timeSetting = time;
        var myDate = new Date( currentDate +" "+timeSetting); // Your timezone!
        var myEpoch = myDate.getTime()/1000.0;
        return myEpoch;
    },


    /*
     * Method: handle create auto setting
     *
     */
    handlerActionAutoEditSeting: function (event) {
        event.preventDefault();
        var typeSetting = $('#iot-editAuto-conditionkv').attr('data-type');
        $('#page-editAuto').addClass('process-auto-edit');
        if( typeSetting === 'thresold' ) {
            editSettingsController.handlerSettingAutoByThresold();
        } else {
            editSettingsController.handlerSettingAutoEditByTime();
        }
    },
    /*
    *
    *
    */
    handlerSettingAutoByThresold: function () {

        var sensorID = editSettingsController.DATAS.area.sensor.code;
        var controlID = editSettingsController.DATAS.area.control.code;
        var areaID = editSettingsController.DATAS.area.id;
        var aIndex = editSettingsController.DATAS.index;
        var timeStart = $('.settingByTine-timestart').text();
        var timeEnd = $('.settingByTine-timend').text();

        var timeStartUTC = editSettingsController.coverDateUTC(timeStart);
        var timeEndUTC = editSettingsController.coverDateUTC(timeEnd);
        var sensorNode = {
            "mode":2,
            "setType":1,
            "sensorID": sensorID,
            "controlID": controlID,
            "name": $('#iot-editAuto-name').val(),
            "areaID": areaID,
            "cmdType": 1,
            "multiTask": 1,
            "aIndex": aIndex,
            "data": {
                'timeStart': timeStartUTC,
                'timeEnd': timeEndUTC,
                airTemplow: 0,
                airTemphigh: 0,
                airHumlow: 0,
                airHumhigh: 0,
                soilTemplow: 0,
                soilTemphigh: 0,
                soilHumlow: 0,
                soilHumhigh: 0,
                elecNeglow: 0,
                elecNeghigh: 0,
                lightVolLow: 0,
                lightVolHigh: 0
            },
            "output":{}
        };

        $('.iot-condition-list').each(function () {
            var elm = $(this);
            var name = elm.find('.iot-condition-sensor').attr('data-senson');
            var lowThreshold = parseFloat(elm.find('.lowThreshold').val());
            var highThreshold = parseFloat(elm.find('.highThreshold').val());
            switch (name){
                case 'airTemp':
                    sensorNode.data.airTemplow = lowThreshold;
                    sensorNode.data.airTemphigh = highThreshold;
                    break;
                case 'airHum':
                    sensorNode.data.airHumlow = lowThreshold;
                    sensorNode.data.airHumhigh = highThreshold;
                    break;
                case 'soilTemp':
                    sensorNode.data.soilTemplow = lowThreshold;
                    sensorNode.data.soilTemphigh = highThreshold;
                    break;
                case 'soilHum':
                    sensorNode.data.soilHumlow = lowThreshold;
                    sensorNode.data.soilHumhigh = highThreshold;
                    break;
                case 'elecNeg':
                    sensorNode.data.elecNeglow = lowThreshold;
                    sensorNode.data.elecNeghigh = highThreshold;
                    break;
                case 'listIntensity':
                    sensorNode.data.lightVolLow = lowThreshold;
                    sensorNode.data.lightVolHigh = highThreshold;
                    break;
                default:
                    break;
            }

        });

        $('.onoffswitch-setup').each(function () {
            var elm = $(this);
            var enable = 0;
            if(elm.is(':checked')){
                enable = 1;
            }
            var outputId = elm.attr('data-id');
            switch (outputId) {
                case '1':
                    sensorNode.output.output1 = enable;
                    break;
                case '2':
                    sensorNode.output.output2 = enable;
                    break;
                case '3':
                    sensorNode.output.output3 = enable;
                    break;
                case '4':
                    sensorNode.output.output4 = enable;
                    break;
                case '5':
                    sensorNode.output.output5 = enable;
                    break;
                default:
                    break;
            }
        });
        console.log(sensorNode);
        editSettingsController.sendDataForGateway(sensorNode);
        editSettingsController.handleCheckTime();
    },
    /*
     * Method setting auto by time
     *
     */
    handlerSettingAutoEditByTime: function () {
        var sensorID = editSettingsController.DATAS.area.sensor.code;
        var controlID = editSettingsController.DATAS.area.control.code;
        var areaID = editSettingsController.DATAS.area.id;
        var aIndex = editSettingsController.DATAS.index;
        var timeStart = $('.settingByTine-timestart').text();
        var timeEnd = $('.settingByTine-timend').text();

        var timeStartUTC = editSettingsController.coverDateUTC(timeStart);
        var timeEndUTC = editSettingsController.coverDateUTC(timeEnd);
        var sensorNodeTime = {
            "mode":2,
            "setType":2,
            "sensorID": sensorID,
            "controlID": controlID,
            "name": $('#iot-editAuto-name').val(),
            "areaID": areaID,
            "cmdType": 1,
            "multiTask": 1,
            "aIndex": aIndex,
            "data": {
                "timeStart": timeStartUTC,
                "timeEnd": timeEndUTC,
                "loopWeek": 123456
            },
            "output":{}
        };

        $('.onoffswitch-setup').each(function () {
            var elm = $(this);
            var enable = 0;
            if(elm.is(':checked')){
                enable = 1;
            }
            var outputId = elm.attr('data-id');
            switch (outputId) {
                case '1':
                    sensorNodeTime.output.output1 = enable;
                    break;
                case '2':
                    sensorNodeTime.output.output2 = enable;
                    break;
                case '3':
                    sensorNodeTime.output.output3 = enable;
                    break;
                case '4':
                    sensorNodeTime.output.output4 = enable;
                    break;
                case '5':
                    sensorNodeTime.output.output5 = enable;
                    break;
                default:
                    break;
            }
        });
        var getWeek = '';
        $('.time-week-active').each(function () {
            var weekElm = $(this);
            getWeek += weekElm.attr('data-week');

        });
        var weekData = Number(getWeek);
        sensorNodeTime.data.loopWeek = weekData;

       editSettingsController.sendDataForGateway(sensorNodeTime);
        editSettingsController.handleCheckTime();
    },

    /*
     * Method post on Device
     *
     */
    sendDataForGateway: function (data) {
        loadingPage.showPageLoading(editSettingsView.pageID);
        var getwayID = editSettingsController.DATAS.area.gateway.code;
        var message = new Paho.MQTT.Message(JSON.stringify(data));
        message.destinationName = 'smartFarm/'+getwayID+'/CONTROL';
        debug.log(message);
        message.qos = 0;
        mqttApp.client.send(message);
    },

    /*
     * handle check time with action manual
     *
     */
    handleCheckTime: function () {
        var param = {
            title: '',
            msg: 'Hành động của bạn không thành công'
        };
        var timeOut = setTimeout(function () {
            if($('#page-editAuto').hasClass('process-auto-edit')){
                $.Alert(param);
                $('#page-autokv').removeClass('process-auto-edit');
                console.log('action fail auto');
            }
            clearTimeout(timeOut);
        },10000);
    }

}; //End Class