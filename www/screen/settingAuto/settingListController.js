/**
 * MarkReportController Class
 * @author FPT Software
 */

var settingListController = {
    // CONSTANTS
    //
    TAG: 'settingListController',

    /**
     * (Required)
     * Parent ID of page holder
     */
    PAGE_ID: 'iot-listsettings',
    timeOut: null,
    timeOutRemove: null,

    GATEWAY: null,

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
        this.GATEWAY = null;
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
                settingListController.doPageBeforeShow();
                break;
            case eventHelper.PAGE_SHOW:
                settingListController.doPageShow();
                break;
            default:
                break;
        }
    },
    doPageBeforeShow: function () {

    },

    doPageShow: function () {
        settingListController.getGateWayID();
        settingListController.getListSettingsFromServer();
        settingListController.bindEventForPage();
        settingListController.bindEventOnOff();


    },

    getGateWayID: function () {
        var data = storageManager.get(constants.DATA_AREA);
        console.log('----');
        console.log(data);
        if( Array.isArray(data) ) {
            for( var i = 0; i < data.length; i++ ) {
                if(data[i].gatewayID){
                settingListController.GATEWAY = data[i].gatewayID;
                }
            }
        }
    },

    bindEventForPage: function () {
        settingListView.buttonBack.on(eventHelper.TAP,settingListController.handlerBackPage);
        settingListView.buttonAddNew.on(eventHelper.TAP,settingListController.handlerChangePageAddNew);
    },

    /*
    * Method get data server
    *
    *
    */
    getListSettingsFromServer: function () {
        var url_param = '';
        var data = '';
        httpService.getListSettingsAuto(url_param, data).done(function (response) {
            console.log(response);
            if (response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE) {

                // call method bind data html
                settingListView.bindDataListSettings(response.data).done(function () {
                    loadingPage.hide();
                    settingListView.setHeightList();
                    settingListController.bindEventCheckbox();
                });

            } else {
                loadingPage.hide();
                settingListView.setHeightList();
            }
        }).fail(function (jqXHR) {
            debug.log(jqXHR);
            if(jqXHR === 403){
                sidebarPanel.handlerLogout();
            }
            loadingPage.hide();
            settingListView.setHeightList();
        });
    },

    /*
     * method handler on/off status device
     *
     */
    bindEventOnOff: function () {

        settingListView.settingsContent.on('swipeleft', '.onoffswitch', function (e) {

            var checkbox = $(this).find('.onoffswitch-checkbox');
            if (checkbox.is(':checked')) {
                $(this).find('.onoffswitch-checkbox').prop("checked", false);
                $(this).find('.onoffswitch-checkbox').addClass('active-on-off');
            }
            settingListController.handleEnableSettingAuto($(this), 1, 'on');
        });
        settingListView.settingsContent.on('swiperight', '.onoffswitch', function (e) {
            var checkbox = $(this).find('.onoffswitch-checkbox');
            if (!checkbox.is(':checked')) {
                checkbox.prop("checked", true);
                checkbox.addClass('active-on-off')
            }
            settingListController.handleEnableSettingAuto($(this), 1, 'off');
        });
        settingListView.settingsContent.on('tap', '.onoffswitch-action', function (e) {
            e.preventDefault();
            var checkbox = $(this).prev();
            var status = 'on';
            if (checkbox.is(':checked')) {
                checkbox.prop("checked", false);
                status = 'off';
            } else {
                checkbox.prop("checked", true);
                status = 'on';
            }
            checkbox.addClass('active-on-off');
            settingListController.handleEnableSettingAuto($(this), 1, status);
        });
    },

    /*
    * Method handle enable setting auto
    *
    */
    handleEnableSettingAuto: function (elm, flag, type) {
        elm.closest('.settingauto-list').addClass('processing-enableAuto');
        var indexSetting = elm.closest('.settingauto-list').attr('data-index');
        var setType = elm.closest('.settingauto-list').attr('data-type');
        var typeBySetType = 2;

        if( setType == 1 && type === 'off' ){
            typeBySetType = 3;
        }

        if( setType == 2 && type === 'on') {
            typeBySetType = 5;
        }

        if( setType == 2 && type === 'off') {
            typeBySetType = 6;
        }


        var bodydata = {
            "mode":2,
            "setType":setType,
            "flagWrite":1,
            "type":typeBySetType,
            "index0":0,
            "index1":0,
            "index2":0,
            "index3":0,
            "index4":0,
            "index5":0,
            "index6":0,
            "index7":0,
            "index8":0,
            "index9":0,
            "index10":0,
            "index11":0
        };




        var indexData = "index"+ indexSetting;
        bodydata[indexData] = flag;


        settingListController.sendDataForGateway(bodydata);
        settingListController.handleCheckTime();
    },

    /*
     * Method post on Device
     *
     */
    sendDataForGateway: function (data) {
        loadingPage.showPageLoading(settingListView.pageID);
        var getwayID = settingListController.GATEWAY;
        var message = new Paho.MQTT.Message(JSON.stringify(data));
        message.destinationName = 'smartFarm/'+getwayID+'/CONTROL';
        debug.log(message);
        message.qos = 0;
        mqttApp.client.send(message);
    },


    /*
    * Method bind event for icon check
    *
    */
    bindEventCheckbox: function () {
        // settingListView.buttonCheckList.on(eventHelper.TAP,settingListController.handlerCheckboxList);
        // settingListView.buttonCheckAll.on(eventHelper.TAP,settingListController.handlerCheckboxAll);

        $('#ioi-list-settings-content').on(eventHelper.TAP,'.iot-remove-settingauto', settingListController.handlerDeleteSetting);

        settingListView.settingsContent.on(eventHelper.TAP,'.setting-name-control', settingListController.handlerEditSetting);
    },

    /*
    * Method handler check list
    *
    */
    handlerCheckboxList: function (event) {
        event.preventDefault();
        var elm = $(this);
        if(elm.hasClass('iot-check-active')){
            settingListView.updateCheckbox(true,elm);
        }else{
            settingListView.updateCheckbox(false,elm);
        }
        var lengthCheckList = settingListView.buttonCheckList.length;
        var lengthCheckActive = $('.iot-check-active').length;

        if(lengthCheckList === lengthCheckActive){
            settingListView.buttonCheckAll.addClass('iot-checkall-active');
        }else{
            settingListView.buttonCheckAll.removeClass('iot-checkall-active');
        }
        debug.log(lengthCheckList +' '+lengthCheckActive);
    },

    /*
    * Method handler check all
    *
    */
    handlerCheckboxAll: function (event) {
        event.preventDefault();
        var elm = $(this);
        if(elm.hasClass('iot-checkall-active')){
            elm.removeClass('iot-checkall-active');
            settingListView.updateCheckboxAll(true,elm);
        }else{
            elm.addClass('iot-checkall-active');
            settingListView.updateCheckboxAll(false,elm);
        }
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
    /*
     * Method hanlder back to page
     *
     */
    handlerChangePageAddNew: function (event) {
        event.preventDefault();
        pageHelper.changePage(fileHelper.getUrl(pageUrl.ADD_SETTINGS), {
            transition: eventHelper.PAGE_TRANSITION.SLIDE
        });
    },

    /*
    *  Handle delete setting auto
    *
    * */
    handlerDeleteSetting: function (event) {
        event.preventDefault();
        $(this).addClass('wating-remove-auto');
        var aIndex = $(this).attr('data-index');
        var setType = $(this).attr('data-type');
        var paramRemove = {
            msg: 'Bạn có muốn xóa không?',
            loadingstatus: true
        };
        var paramSuccess = {
            msg: 'Bạn đã xóa thành công?'
        };
        var typeBySetType = 1;
        if( setType == 2 ) {
            typeBySetType = 4;
        }
        var bodydata = {
            "mode":2,
            "setType":setType,
            "flagWrite":1,
            "type":typeBySetType,
            "index0":0,
            "index1":0,
            "index2":0,
            "index3":0,
            "index4":0,
            "index5":0,
            "index6":0,
            "index7":0,
            "index8":0,
            "index9":0,
            "index10":0,
            "index11":0
        };
        var indexData = "index"+ aIndex;
        bodydata[indexData] = 1;
        $.Confirm(paramRemove,function (res) {
            if(res){
                settingListController.sendDataForGatewayDelete(bodydata);
                settingListController.handleCheckTimeRemove();
            }
        });

    },

    /*
     * Method send data for gateway delete
     *
     */
    sendDataForGatewayDelete: function (data) {
        var getwayID = settingListController.GATEWAY;
        var message = new Paho.MQTT.Message(JSON.stringify(data));
        message.destinationName = 'smartFarm/'+getwayID+'/CONTROL';
        debug.log(message);
        message.qos = 0;
        mqttApp.client.send(message);
    },

    /*
    * Handle edit Setting auto
    *
    */
    handlerEditSetting: function (event) {
        event.preventDefault();
        var idArea = $(this).parent().attr('data-id');
        var nameArea = $(this).parent().attr('data-area');
        var nameSeting = $(this).parent().attr('data-setting');
        var data = {
            id: idArea,
            nameArea: nameArea,
            nameSeting: nameSeting
        };
        storageManager.put(constants.AUTO_EDIT_KEY,data);
        pageHelper.changePage(fileHelper.getUrl(pageUrl.EDIT_SETTINGS), {
            transition: eventHelper.PAGE_TRANSITION.SLIDE
        });
    },

    /*
     * handle check time with action manual
     *
     */
    handleCheckTime: function () {
        var param = {
            title: '',
            msg: 'Hành động không thành công'
        };
        var elm = $('.processing-enableAuto');
        var flag = true;
        if(elm.find('.active-on-off').is(':checked')){
            flag = false;
        }
        settingListController.timeOut = setTimeout(function () {
            if(elm.hasClass('processing-enableAuto')){
                elm.parent().find('.active-on-off').prop("checked", flag);
                elm.removeClass('processing-enableAuto');
                $('input').removeClass('active-on-off');
                $.Alert(param);
                console.log('action fail');
            }
            clearTimeout(settingListController.timeOut);
        },20000);
    },

    /*
     * handle check time with action manual
     *
     */
    handleCheckTimeRemove: function () {
        var param = {
            title: '',
            msg: 'Xóa chế độ tự động không thành công'
        };
        var elm = $('.processing-enableAuto');
        settingListController.timeOutRemove = setTimeout(function () {
            if($('.wating-remove-auto').length > 0){
                $('.iot-remove-settingauto').removeClass('wating-remove-auto');
                $.Alert(param);
                console.log('action fail');
            }
            clearTimeout(settingListController.timeOutRemove);
        },20000);
    }



}; //End Class