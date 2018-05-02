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
        })
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
    }


}; //End Class