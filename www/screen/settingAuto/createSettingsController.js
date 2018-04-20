/**
 * MarkReportController Class
 * @author FPT Software
 */

var createSettingsController = {
    // CONSTANTS
    //
    TAG: 'createSettingsController',

    /**
     * (Required)
     * Parent ID of page holder
     */
    PAGE_ID: 'page-autokv',

    // PROPERTIES
    //
    checkActionAuto: false,
    readIndex: null,
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
        this.checkActionAuto = false;
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

                break;
            case eventHelper.PAGE_SHOW:
                this.doPageShow();
                break;
            default:
                break;
        }
    },
    doPageBeforeShow: function () {

    },

    doPageShow: function () {


            createSettingsController.getListAreaLocal();

            // handle event show list when tap item
            createSettingsController.handlerSelectArea();
            createSettingsController.handlerSelectConditionKV();
            createSettingsController.handlerSelectSensor();
            createSettingsController.bindEventHandlers();

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
    * Method get list Area from local
    *
    */
    getListAreaLocal: function () {
        var data = storageManager.get(constants.DATA_AREA);
        debug.log(data);
        createSettingsView.bingDataListArea(data).done(function () {
            createSettingsView.setHeightContent();
            loadingPage.hide();
        })
    },

    /*
    * Method Select Area
    *
    */
    handlerSelectArea: function () {

        $('#ioi-content-autokv').on(eventHelper.TAP,'.iot-select-area',function (e) {
            e.preventDefault();
            e.stopPropagation();
            if($(this).hasClass('active')){
                $('.iot-condition').removeClass('active');
            }else{
                $('.iot-condition').removeClass('active');
                $(this).addClass('active');
            }

        });
        createSettingsView.listAreaID.on(eventHelper.TAP,'li',createSettingsController.getListDeviceWhennSelectArea);

    },

    /*
    * Method select  condition
    *
    */
    handlerSelectConditionKV: function () {

        $('#ioi-content-autokv').on(eventHelper.TAP,'.iot-condition-select',function (e) {
            e.preventDefault();
            e.stopPropagation();
            if($(this).hasClass('active')){
                $('.iot-condition').removeClass('active');
            }else{
                $('.iot-condition').removeClass('active');
                $(this).addClass('active');
            }

        });

        $('#ioi-content-autokv').on(eventHelper.TAP,'#iot-condition-select-name li',function (e) {
            e.preventDefault();
            e.stopPropagation();
            var elm = $(this);
            $('.iot-condition').removeClass('active');
            elm.parent().prev().text(elm.text());
            elm.parent().prev().attr('data-type',elm.attr('data-type'));
        });
    },

    /* Method select sensor
    *
    */
    handlerSelectSensor: function () {

        // show list sensor
        $('#ioi-content-autokv').on(eventHelper.TAP,'.iot-condition-sensor',function (e) {
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
        $('#ioi-content-autokv').on(eventHelper.TAP,'.iot-autokv-sensor-value li',function (e) {
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

        createSettingsController.handlerAddOrRemove();

       // createSettingsController.handlerAddOrRemoveTime();
    },

    bindEventHandlers: function () {
        createSettingsView.backID.on(eventHelper.TOUCH_START,createSettingsController.handlerBackHome);
        createSettingsView.actionCancel.on(eventHelper.TAP,createSettingsController.handlerBackHome);
        createSettingsView.pageID.on(eventHelper.VMOUSEUP,createSettingsController.handleBlurInput);

        createSettingsView.pageID.on(eventHelper.TAP,function () {
            $('.iot-condition').removeClass('active');
        });

        createSettingsView.sensorInforID.on('tap',function () {
            createSettingsView.autoSetingTime.removeClass('bytime-show');
            if(!createSettingsView.conditionList.hasClass('active-condition')){
                createSettingsView.conditionList.addClass('active-condition');
            }
            if(!$('#iot-condition-list-device-wapper').hasClass('active-show-device')){
                $('#iot-condition-list-device-wapper').addClass('active-show-device');
            }

        });

        createSettingsView.sensorByTimeID.on('tap',function () {

            createSettingsView.conditionList.removeClass('active-condition');
            if(!createSettingsView.autoSetingTime.hasClass('bytime-show')){
                createSettingsView.autoSetingTime.addClass('bytime-show');
            }
            if(!$('#iot-condition-list-device-wapper').hasClass('active-show-device')){
                $('#iot-condition-list-device-wapper').addClass('active-show-device');
            }
        });

        // call method create auto setting
        createSettingsView.actionCreate.on(eventHelper.TAP, createSettingsController.handlerActionAutoSeting);

        // bind event for setting by time
        $('#iot-autokv-bytime').on(eventHelper.TAP, '.time-week-detail', createSettingsView.activeTimeWeek);
      //  $('#iot-autokv-bytime').on(eventHelper.TAP, '.time-repeat', createSettingsView.activeTimeRepeat);

    },

    /*
    * Method handler get list device when select area
    *
    */
    getListDeviceWhennSelectArea: function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        var elm = $(this);
        var iotAreaDom = elm.parent().prev();
        iotAreaDom.text(elm.text());
        iotAreaDom.attr('data-node',elm.attr('data-node'));
        iotAreaDom.attr('data-gateway',elm.attr('data-getway'));
        iotAreaDom.attr('data-control',elm.attr('data-control'));
        iotAreaDom.attr('data-areaid',elm.attr('data-areaid'));
        $('.iot-condition').removeClass('active');
        loadingPage.showPageLoading(createSettingsView.pageID);
        var url_param = '';
        var data = '';
        httpService.getIndexSettingsAuto(url_param, data, elm.attr('data-areaID')).done(function (res) {
            createSettingsController.readIndex = res.data;
            console.log(res.data);
        }).fail(function () {
            console.log('fail');
        });
        httpService.getDeviceListAuto(url_param, data, elm.attr('data-areaID')).done(function (response) {
            if(response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE){

                // call method bind device
                createSettingsView.bindDeviceList(response.data).done(function () {
                    createSettingsController.bindEventOnOff();
                    // call method bind device by time
                    createSettingsView.bindDeviceListByTime(response.data).done(function () {
                        createSettingsView.conditionParent.removeClass(createSettingsView.STYLE.CLASS.NO_ACTIVE);
                         // createSettingsController.bindEventOnOff();
                        createSettingsController.handlerAutoByTime();
                        loadingPage.hidePageLoading();
                    });
                });
            }else{
                loadingPage.hidePageLoading();
            }
        }).fail(function () {
            loadingPage.hidePageLoading();
        });
    },

    /*
     * method handler on/off status device
     *
     */
    bindEventOnOff: function () {

        createSettingsView.pageContent.on('swipeleft', '.onoffswitch', function (e) {
            var checkbox = $(this).find('.onoffswitch-checkbox');
            if (checkbox.is(':checked')) {
                $(this).find('.onoffswitch-checkbox').prop("checked", false);
            }
        });
        createSettingsView.pageContent.on('swiperight', '.onoffswitch', function (e) {
            var checkbox = $(this).find('.onoffswitch-checkbox');
            if (!checkbox.is(':checked')) {
                checkbox.prop("checked", true);
            }
        });
        createSettingsView.pageContent.on('tap', '.onoffswitch-action', function (e) {
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
    * Method when tap back home
    *
    */
    handlerBackHome: function (ev) {
        ev.preventDefault();
        pageHelper.changePage(fileHelper.getUrl(pageUrl.LIST_SETTINGS), {
            transition: eventHelper.PAGE_TRANSITION.SLIDE,
            reverse: true
        });
    },

    handleBlurInput: function (event) {

        if($(event.target).attr('id') !== 'input-focus'){

            $('input').blur();
        }
    },

    handlerAddOrRemove: function () {
        $('.iot-autokv-list').on('tap','.iot-autokv-condition-addnew',function (event) {
            event.preventDefault();
            var elm = $(this);
            if( $('.iot-condition-list').length === 6 ) return ;

            var DomElement = $('.iot-condition-list:eq(0)').clone();
            // DomElement.find('.iot-condition-content li[data-value='+parent+']').remove();
            DomElement.find('input').val('');
            DomElement.find('.iot-condition-sensor').text('Lựa chọn điều kiện');

            elm.closest('.iot-condition-list').after(DomElement);

        });

        $('.iot-autokv-list').on('tap','.iot-autokv-condition-remove',function (event) {
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



    //-----------------------------------

    /*
    * Hanlder When user choose setting by time
    *
    */
    handlerAutoByTime: function () {

        $('#ioi-content-autokv').on(eventHelper.TAP,'.time-start',function (event) {
            event.preventDefault();
            var elm = $(this);
            $('#iot-datemobi').val(elm.text());
            createSettingsController.handlerMobileScroll();
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
    * Method: handle create auto setting 
    * 
    */
    handlerActionAutoSeting: function (event) {
        event.preventDefault();
        var typeSetting = $('#iot-conditionkv').attr('data-type');
        $('#page-autokv').addClass('process-auto');
        if( typeSetting === 'thresold' ) {
            createSettingsController.handlerSettingAutoByThresold();
        } else {
            createSettingsController.handlerSettingAutoByTime();
        }
    },

    /*
    * method setting auto by thresold
    *
    */
    handlerSettingAutoByThresold: function () {

        var sensorID = createSettingsView.areaNameID.attr('data-node');
        var controlID = createSettingsView.areaNameID.attr('data-control');
        var timeStart = $('.settingthresold-timestart').text();
        var timeEnd = $('.settingthresold-timeend').text();

        var timeStartUTC = createSettingsController.coverDateUTC(timeStart);
        var timeEndUTC = createSettingsController.coverDateUTC(timeEnd);
        var sensorNode = {
            "mode":2,
            "setType":1,
            "sensorID": sensorID,
            "controlID": controlID,
            "name": "",
            "areaID": $('#iot-nameArea').attr('data-areaid'),
            "cmdType": 1,
            "multiTask": 1,
            "aIndex": createSettingsController.readIndex,
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
        sensorNode.name = $('#iot-autokv-name').val();
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
        createSettingsController.sendDataForGateway(sensorNode);
        createSettingsController.handleCheckTime();
    },

    /*
    * Method setting auto by time
    *
    */
    handlerSettingAutoByTime: function () {
        var sensorID = createSettingsView.areaNameID.attr('data-node');
        var controlID = createSettingsView.areaNameID.attr('data-control');
        var timeStart = $('.settingByTine-timestart').text();
        var timeEnd = $('.settingByTine-timend').text();

        var timeStartUTC = createSettingsController.coverDateUTC(timeStart);
        var timeEndUTC = createSettingsController.coverDateUTC(timeEnd);
        var sensorNodeTime = {
            "mode":2,
            "setType":2,
            "sensorID": sensorID,
            "controlID": controlID,
            "name": $('#iot-autokv-name').val(),
            "areaID": $('#iot-nameArea').attr('data-areaid'),
            "cmdType": 1,
            "multiTask": 1,
            "aIndex": createSettingsController.readIndex,
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
        console.log(sensorNodeTime);
        createSettingsController.sendDataForGateway(sensorNodeTime);
        createSettingsController.handleCheckTime();
    },


    /*
     * Method post on Device
     *
     */
    sendDataForGateway: function (data) {
        loadingPage.showPageLoading(createSettingsView.pageID);
        var getwayID = createSettingsView.areaNameID.attr('data-gateway') || '';
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
            if($('#page-autokv').hasClass('process-auto')){
                $.Alert(param);
                $('#page-autokv').removeClass('process-auto');
                console.log('action fail auto');
            }
            clearTimeout(timeOut);
        },10000);
    },

    handlerAddOrRemoveTime: function () {
        $('#iot-autokv-bytime').on('tap','.iot-btn-time-addnew',function (event) {

            event.preventDefault();
            var elm = $(this);
            var DomElement = $('.auto-setting-by-time-value:eq(0)').clone();
            DomElement.find('input').val('');
            DomElement.find('.time-week-detail').removeClass('time-week-active');
            DomElement.find('.time-repeat').removeClass('time-repeat-active');
            DomElement.find('.time-start').text('6:07');
            DomElement.find('.time-start').text('18:07');
            DomElement.find('.iot-condition-sensor').text('Chọn output');
            elm.closest('.auto-setting-by-time-value').after(DomElement);

        });

        $('#iot-autokv-bytime').on('tap','.iot-btn-time-remove',function (event) {
            event.preventDefault();
            var elm = $(this);
            var param = {
                title: '',
                msg: 'Bạn có muốn xóa điều kiện này không?'
            };
            $.Confirm(param,function (res) {
                if(res){
                    elm.closest('.auto-setting-by-time-value').remove();
                }
            });
        });
    }


}; //End Class