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
        this.handlerSelectArea();
    },


    /*
     * Method get list Area from local
     *
     */
    getListAreaLocal: function () {
        var data = storageManager.get(constants.DATA_AREA);

        editSettingsView.bingDataListArea(data);
    },

    /*
    * Handle bind event
    *
    */
    hanbdeBingEvent: function () {
        debug.log('bindEvent');
        this.handlerSelectConditionEditAuto();

        editSettingsView.backButton.on(eventHelper.TAP,editSettingsController.handlerBackToPage);
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
            editSettingsView.bindingCoditionSetting(res.data);
            editSettingsView.handleShowSettingByTime(res.data);
            editSettingsView.bingDataLisCondition(res.data.output).done(function () {
                loadingPage.hide();
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
        editSettingsView.onoffSwitch.on('swipeleft', function (e) {
            var checkbox = $(this).find('.onoffswitch-checkbox');
            if (checkbox.is(':checked')) {
                $(this).find('.onoffswitch-checkbox').prop("checked", false);
            }
        });
        editSettingsView.onoffSwitch.on('swiperight', function (e) {
            var checkbox = $(this).find('.onoffswitch-checkbox');
            if (!checkbox.is(':checked')) {
                checkbox.prop("checked", true);
            }
        });
        editSettingsView.onoffSwitchTap.on('tap', function (e) {
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
     * Method Select Area
     *
     */
    handlerSelectArea: function () {

        $('#ioi-content-editAuto').on(eventHelper.TAP,'.iot-select-area',function (e) {
            e.preventDefault();
            e.stopPropagation();
            if($(this).hasClass('active')){
                $('.iot-condition').removeClass('active');
            }else{
                $('.iot-condition').removeClass('active');
                $(this).addClass('active');
            }

        });

    },


    /*
    * Handle show list select
    *
    */
    handlerSelectConditionEditAuto: function () {
        editSettingsView.pageID.on(eventHelper.TAP,function () {
            $('.iot-condition').removeClass('active');
        });
        $('#ioi-content-editAuto').on(eventHelper.TAP,'.editAuto-condition-select',function (e) {
        alert(1);
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
        });

        // show list sensor
        $('#ioi-content-editAuto').on(eventHelper.TAP,'.iot-editAuto-sensor-value li',function (e) {
            e.preventDefault();
            e.stopPropagation();
            var elm = $(this);
            $('.iot-condition').removeClass('active');
            var sensorValue = elm.attr('data-value');
            elm.parent().prev().text(elm.text()).attr('data-senson',sensorValue);

            var unit = elm.closest('.iot-condition-list').find('.unit');
            switch (sensorValue){
                case 'airTemp':
                case 'airHum':
                    unit.text('°C');
                    break;
                case 'soilTemp':
                case 'soilHum':
                    unit.text('%RH');
                    break;
                case 'elecNeg':
                    unit.text('mS /cm');
                    break;
            }
        });

        this.handlerAddOrRemove();

    },

    handlerAddOrRemove: function () {
        $('.iot-editAuto-list').on('tap','.iot-editAuto-condition-addnew',function (event) {
            event.preventDefault();
            var elm = $(this);
            var DomElement = $('.iot-condition-list:first-child').clone();
            DomElement.find('input').val('');
            DomElement.find('.iot-condition-sensor').text('Lựa chọn điều kiện');

            elm.closest('.iot-condition-list').after(DomElement);

        });

        $('.iot-editAuto-list').on('tap','.iot-editAuto-condition-remove',function (event) {
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
    }


}; //End Class