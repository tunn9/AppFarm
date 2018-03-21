/**
 * MarkReportView Class
 * @author FPT Software
 */

var createSettingsView = {

    // CONSTANTS
    //
    TAG: 'createSettingsView',

    STYLE: {
        CLASS: {
            NO_ACTIVE: 'no-active'
        }
    },

    pageID: null,
    headerID: null,
    pageContent: null,
    footerID: null,
    backID: null,
    actionCancel: null,
    listAreaID: null,
    conditionParent: null,
    sensorInforDevice: null,
    areaNameID: null,

    sensorInforID: null,
    conditionList: null,

    onoffSwitch: null,
    onoffSwitchTap: null,

    actionCreate: null,

    sensorByTimeID: null,
    autoSetingTime: null,

    // METHODS
    //
    initialize: function () {
        createSettingsView.pageID = $('#page-autokv');
        createSettingsView.headerID = $('#iot-autokv-header');
        createSettingsView.pageContent = $('#ioi-content-autokv');
        createSettingsView.footerID = $('#iot-autokv-footer');
        createSettingsView.backID = $('#iot-back-autokv');
        createSettingsView.actionCancel = $('#iot-autokv-cancel');

        createSettingsView.listAreaID = $('#iot-condition-area-name');
        createSettingsView.conditionParent = $('.iot-condition-parent');
        createSettingsView.sensorInforDevice    =   $('.iot-autokvdevice-content');

        createSettingsView.areaNameID    =   $('#iot-nameArea');

        createSettingsView.sensorInforID  =  $('#sensor-infor');
        createSettingsView.conditionList  =  $('.iot-autokv-list');

        createSettingsView.actionCreate  =  $('#iot-autokv-action');

        createSettingsView.sensorByTimeID  =  $('#autoby-time');
        createSettingsView.autoSetingTime  =  $('#iot-autokv-bytime');
    },

    /*
     * Method set Dom default
     * @return: null
     */
    destroy: function () {
        createSettingsView.pageID = null;
        createSettingsView.headerID = null;
        createSettingsView.pageContent = null;
        createSettingsView.footerID = null;
        createSettingsView.backID = null;
        createSettingsView.actionCancel = null;
        createSettingsView.listAreaID = null;
        createSettingsView.conditionParent = null;
        createSettingsView.sensorInforDevice = null;
        createSettingsView.areaNameID = null;

        createSettingsView.sensorInforID = null;
        createSettingsView.conditionList = null;

        createSettingsView.onoffSwitch = null;
        createSettingsView.onoffSwitchTap = null;

        createSettingsView.actionCreate = null;

        createSettingsView.sensorByTimeID  =   null;
        createSettingsView.autoSetingTime  =   null;
    },

    /*
    * Method bind data Area
    *
    */
    bingDataListArea: function (data) {
        var dfd = $.Deferred();
        var i = 0;
        var html = '';

        if(data){
            for(i; i < data.length; i++ ){
                html += '<li data-getway="'+data[i].gatewayID+'" data-nodeID="'+data[i].nodeID+'" data-areaID="'+data[i].areaID+'">'+data[i].nameArea+'</li>';
            }
            createSettingsView.listAreaID.html(html);
            dfd.resolve('Done');
        }else{
            dfd.resolve('Done');
        }

        return dfd.promise();
    },

    /*
    * Method bind device for setting by senser
    * @return HTML
    */
    bindDeviceList: function (datalist) {
        var dfd = $.Deferred();
        var i = 0;
        var html = '';
        var data = datalist;
        if (Array.isArray(data) && data.length > 0){
            for (i; i < data.length; i++) {
                var mychecked = 'checked';
                if(data[i].status === 0){
                    mychecked = '';
                }
                html += '<li>' +
                    '<div class="ioi-device-name">' +
                    data[i].name +
                    '</div>' +
                    '<div class="ioi-device-status">' +
                    '<div class="onoffswitch" data-id="'+data[i].relay+'">'+
                    '<input data-role="none" data-id="'+data[i].relay+'" type="checkbox" name="onoffswitch" class="onoffswitch-checkbox onoffswitch-setup" '+mychecked+'>' +
                    '<div class="onoffswitch-action" data-id="'+data[i].relay+'"></div>' +
                    '<span class="onoffswitch-switch"></span>' +
                    '</div>'+
                    '</div>' +
                    '</li>';
            }


            createSettingsView.sensorInforDevice.html(html);
            createSettingsView.sensorInforDevice.attr('data-controlid',datalist.id);

            dfd.resolve('Done');
        }else{
            dfd.resolve('Done');
        }

        return dfd.promise();
    },

    bindDeviceListByTime: function (datalist) {

        var dfd = $.Deferred();
        var i = 0;
        var html = '';
        var data = datalist;
        if (Array.isArray(data) && data.length > 0){
            for (i; i < data.length; i++) {
                html += '<li>Output '+i+'</li>';
            }
            $('.iot-autokv-sensor-value-time').html(html);
            dfd.resolve('Done');
        }else{
            dfd.resolve('Done');
        }

        return dfd.promise();
    },

    /*
    * Method set height for wapper
    * @return Object
    */
    setHeightContent: function () {
        var heightWindow = $(window).innerHeight();
        var heightHeader = createSettingsView.headerID.innerHeight();
        var heightFooter = createSettingsView.footerID.innerHeight();
        var contentHeight = heightWindow - ( heightFooter + heightHeader );
        createSettingsView.pageContent.height(contentHeight);
    },

    /*
    * Method active time week
    *
    */
    activeTimeWeek: function (event) {
        event.preventDefault();
        var elm  =  $(this);
        if ( elm.hasClass('time-week-active') ) {
            elm.removeClass('time-week-active');
        }else {
            elm.addClass('time-week-active');
        }
    },

    /*
    * Method active time repeat
    *
    */
    activeTimeRepeat: function (event) {
        event.preventDefault();
        var elm  =  $(this);
        if ( elm.hasClass('time-repeat-active') ) {
            elm.removeClass('time-repeat-active');
        }else {
            elm.addClass('time-repeat-active');
        }
    }


}; // End Class