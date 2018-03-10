/**
 * MarkReportView Class
 * @author FPT Software
 */

var editSettingsView = {

    // CONSTANTS
    //
    TAG: 'editSettingsView',

    STYLE: {
        CLASS: {
            ACTIVE: 'active-condition'
        }
    },

    pageID: null,
    contentID: null,
    headerID: null,
    footerID: null,
    backButton: null,
    settingNameID: null,
    nameAreaID: null,
    editAutoList: null,
    editAutoCondition: null,
    conditionBy: null,

    sensorInforDevice: null,
    onoffSwitch: null,
    onoffSwitchTap: null,

    // METHODS
    //
    initialize: function () {
        editSettingsView.pageID = $('#page-editAuto');
        editSettingsView.contentID = $('#ioi-content-editAuto');
        editSettingsView.headerID = $('#iot-editAuto-header');
        editSettingsView.footerID = $('#iot-editAuto-footer');
        editSettingsView.backButton = $('#ioi-back-editAuto, #iot-editAuto-cancel');
        editSettingsView.settingNameID = $('#iot-editAuto-name');
        editSettingsView.nameAreaID = $('#iot-editauto-nameArea');
        editSettingsView.editAutoList = $('#iot-editAuto-list');
        editSettingsView.editAutoCondition = $('#iot-editAuto-condition');
        editSettingsView.conditionBy = $('#iot-condition-editauto');

        editSettingsView.sensorInforDevice = $('#iot-editAutodevice-content');
    },

    /*
     * Method set Dom default
     * @return: null
     */
    destroy: function () {
        editSettingsView.pageID = null
        editSettingsView.contentID = null;
        editSettingsView.headerID = null;
        editSettingsView.footerID = null;
        editSettingsView.backButton = null;
        editSettingsView.settingNameID = null;
        editSettingsView.nameAreaID = null;
        editSettingsView.editAutoList = null;
        editSettingsView.editAutoCondition = null;
        editSettingsView.conditionBy = null;

        editSettingsView.sensorInforDevice = null;
    },

    /*
    * Hanlde doBeforePageShow
    *
    */
    handlerBeforeShow: function () {
        var data = storageManager.get(constants.AUTO_EDIT_KEY);
        editSettingsView.settingNameID.val(data.nameSeting);
        editSettingsView.nameAreaID.text(data.nameArea);
    },

    /*
     * Method bind data Area
     *
     */
    bingDataLisCondition: function (dataAll) {
        var dfd = $.Deferred();
        var i = 0;
        var html = '';

        debug.log(dataAll);

        if(dataAll){

            editSettingsView.conditionBy.text('Thông số cảm biến');

            var data = dataAll.settingThreshold.condition;
            for(i; i < data.length; i++ ){
                html += '<div class="iot-condition-list">'+

                            '<div class="iot-condition-top">'+
                                '<a class="iot-condition editAuto-condition-select" data-senson="'+data[i].type+'">'+data[i].name+'</a>'+
                                '<ul class="iot-condition-content iot-editAuto-sensor-value">'+
                                    '<li data-value="airTemp">Nhiệt độ không khí</li>'+
                                    '<li data-value="airHum">Nhiệt độ đất</li>'+
                                    '<li data-value="soilTemp">Độ ẩm không khí</li>'+
                                    '<li data-value="soilHum">Độ ẩm đất</li>'+
                                    '<li data-value="elecNeg">Độ ẩm Độ dẫn điện EC</li>'+
                                '</ul>'+

                            '</div>'+

                            '<div class="iot-condition-bottom">'+
                                '<div class="iot-condition-value">'+
                                    '<h5>Ngưỡng dưới <span class="unit"></span></h5>'+
                                    '<input data-role="none" type="number" value="'+data[i].lowThreshold+'" class="lowThreshold" placeholder="" />'+
                                '</div>'+
                                '<div class="iot-condition-value">'+
                                    '<h5>Ngưỡng trên <span class="unit"></span></h5>'+
                                    '<input data-role="none" type="number" value="'+data[i].hightThreshold+'" class="highThreshold" placeholder="" />'+
                                '</div>'+
                            '</div>'+

                            '<div class="iot-condition-action">'+
                                '<a class="iot-editAuto-condition-remove">-</a><a class="iot-editAuto-condition-addnew">+</a>'+
                            '</div>'+


                        '</div>';
            }
            editSettingsView.editAutoCondition.html(html);
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
        var data = datalist.output;
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
                    '<div class="onoffswitch" data-id="'+data[i].id+'">'+
                    '<input data-role="none" data-id="'+data[i].id+'" type="checkbox" name="onoffswitch" class="onoffswitch-checkbox onoffswitch-setup" '+mychecked+'>' +
                    '<div class="onoffswitch-action" data-id="'+data[i].id+'"></div>' +
                    '<span class="onoffswitch-switch"></span>' +
                    '</div>'+
                    '</div>' +
                    '</li>';
            }
            editSettingsView.sensorInforDevice.html(html);
            editSettingsView.sensorInforDevice.attr('data-controlid',datalist.id);

            editSettingsView.onoffSwitch = $('.onoffswitch');
            editSettingsView.onoffSwitchTap = $('.onoffswitch-action');

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
        var data = datalist.output;
        if (Array.isArray(data) && data.length > 0){
            for (i; i < data.length; i++) {
                html += '<ul class="iot-autokv-bytime-data">' +
                    '<li>' +
                    data[i].name +
                    '</li>' +
                    '<li>' +
                    '<div class="ioi-device-status">' +
                    '<div class="onoffswitch" data-id="'+data[i].id+'">'+
                    '<input data-role="none" data-id="'+data[i].id+'" type="checkbox" name="onoffswitch" class="onoffswitch-checkbox onoffswitch-setup">' +
                    '<div class="onoffswitch-action" data-id="'+data[i].id+'"></div>' +
                    '<span class="onoffswitch-switch"></span>' +
                    '</div>'+
                    '</div>' +
                    '</li>' +
                    '<li>'+
                    '<div class="time-start">6:07 AM</div>'+
                    '</li>'+
                    '<li>'+
                    '<input data-role="none" type="number" value="" class="total-time" placeholder="30" />'+
                    '</li>'+
                    '</ul>';
            }
            $('#iot-bytime-list-device').html(html);
            editSettingsView.onoffSwitch = $('.onoffswitch');
            editSettingsView.onoffSwitchTap = $('.onoffswitch-action');
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
        var heightW = window.innerHeight;
        var heightHeader = editSettingsView.headerID.innerHeight();
        var footerHeight = editSettingsView.footerID.innerHeight();
        var contentHeight = heightW - (heightHeader + footerHeight);
        document.getElementById('ioi-content-editAuto').style.height = contentHeight + 'px';
    }


}; // End Class