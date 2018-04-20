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

        settingListController.getListSettingsFromServer();
        settingListController.bindEventForPage();
        settingListController.bindEventOnOff();
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
            }
        });
        settingListView.settingsContent.on('swiperight', '.onoffswitch', function (e) {
            var checkbox = $(this).find('.onoffswitch-checkbox');
            if (!checkbox.is(':checked')) {
                checkbox.prop("checked", true);
            }
        });
        settingListView.settingsContent.on('tap', '.onoffswitch-action', function (e) {
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
    * Method bind event for icon check
    *
    */
    bindEventCheckbox: function () {
        settingListView.buttonCheckList.on(eventHelper.TAP,settingListController.handlerCheckboxList);
        settingListView.buttonCheckAll.on(eventHelper.TAP,settingListController.handlerCheckboxAll);

        settingListView.buttonRemove.on(eventHelper.TAP,settingListController.handlerDeleteSetting);

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
        var paramRemove = {
            msg: 'Bạn có muốn xóa không?',
            loadingstatus: true
        };
        var paramSuccess = {
            msg: 'Bạn đã xóa thành công?'
        };
        var bodydata = {
            "mode":2,
            "setType":1,
            "flagWrite":1,
            "type":2,
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
        $('.iot-check-active').each(function () {
            var indexData = "index"+ $(this).attr('data-index');
            bodydata[indexData] = 1;
        });
        $.Confirm(paramRemove,function (res) {
            if(res){
                console.log(bodydata);
                // var url_param = {};
                // var data_post = {};
                // httpService.deleteSettingsAuto(url_param,data_post).done(function (response) {
                //     if(response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE){
                //         settingListView.handlerRemoveSettings();
                //         settingListView.buttonCheckAll.removeClass('iot-checkall-active');
                //         $.Alert( paramSuccess ) ;
                //     }else{
                //         $.AlertSingle('Bạn xóa không thành công');
                //     }
                // }).fail(function () {
                //     $.AlertSingle('Bạn xóa không thành công');
                // });

            }
        });

    },

    /*
     * Method send data for gateway delete
     *
     */
    sendDataForGatewayDelete: function (data) {
        var getwayID = createSettingsView.areaNameID.attr('data-gateway') || '';
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
    }




}; //End Class