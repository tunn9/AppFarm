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
        editSettingsView.backButton = $('#iot-back-editAuto, #iot-editAuto-cancel');
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
    * Method handle title
    *
    */
    bindingCoditionSetting: function (data) {
        // bind type
        if(data.type === 2 ) {
            $('#iot-editAuto-conditionkv').text('Thời gian').attr('data-type','time');
        } else {
            $('#iot-editAuto-conditionkv').text('Thông số cảm biến').attr('data-type','thresold');
        }
    },

    handleShowSettingByTime: function (data) {
        if( data.type === 2 ) {
            $('#iot-editAuto-bytime').addClass('bytime-show');
            var dateSetting = new Date(data.data.timeStart*1000.0);
            var getHours = dateSetting.getHours();
            var getMinutes = dateSetting.getMinutes();
            if( getMinutes < 10 ) {
                getMinutes = '0' + getMinutes;
            }
            $('.settingByTine-timestart').text(getHours +':'+ getMinutes);

            var dateSettingEnd = new Date(data.data.timeEnd*1000.0);

            var getHoursEnd = dateSettingEnd.getHours();
            var getMinutesEnd = dateSettingEnd.getMinutes();
            if( getMinutesEnd < 10 ) {
                getMinutesEnd = '0' + getMinutesEnd;
            }

            $('.settingByTine-timend').text(getHoursEnd +':'+ getMinutesEnd);

            var loopWeek = data.data.loopWeek + '';
            var coverLoopWeek = loopWeek.split('');
            for( var i = 0; i < coverLoopWeek.length; i++ ) {
                var loop = Number(coverLoopWeek[i]) - 1;
                console.log(loop);
                $('.time-week-detail:eq('+loop+')').addClass('time-week-active');
            }
        }else {
            $('.iot-editAuto-list').addClass('active-condition');
            editSettingsView.handleEditSettingAuto(data);
        }

    },

    handleEditSettingAuto: function (data) {
        var dataSetting = data.data;

        var airHum = editSettingsView.renderSettingListCondition(dataSetting.airHumhigh, dataSetting.airHumlow, 'airHum', 'Nhiệt độ đất');
        var airTemp = editSettingsView.renderSettingListCondition(dataSetting.airTemphigh, dataSetting.airTemplow, 'airTemp', 'Nhiệt độ không khí');
        var elecNeg = editSettingsView.renderSettingListCondition(dataSetting.elecNeghigh, dataSetting.elecNeglow, 'elecNeg', 'Độ ẩm Độ dẫn điện EC');
        var listIntensity = editSettingsView.renderSettingListCondition(dataSetting.lightVolHigh, dataSetting.lightVolLow, 'listIntensity', 'Cường độ sáng');
        var soilHum = editSettingsView.renderSettingListCondition(dataSetting.soilHumhigh, dataSetting.soilTemplow, 'soilHum', 'Độ ẩm đất');
        var soilTemp = editSettingsView.renderSettingListCondition(dataSetting.soilTemphigh, dataSetting.soilTemplow, 'soilTemp', 'Độ ẩm không khí');
        var html = airHum + airTemp + elecNeg + listIntensity + soilHum + soilTemp;
        $('#iot-edit-condition-listsetting').html(html);
    },

    renderSettingListCondition: function (conditionhight, conditionLow, value, name) {
        if( conditionhight == 0 && conditionLow == 0) {
            return '';
        }
        var html = '<div class="iot-condition-list">'+
            '<div class="iot-condition-top">'+
            '<div class="iot-condition-top-left">' +
            '<a class="iot-condition iot-condition-sensor" data-senson="'+value+'">'+name+'</a>'+
            '<ul class="iot-condition-content iot-editauto-sensor-value">'+
            '<li data-value="airTemp">Nhiệt độ không khí</li>'+
            '<li data-value="airHum">Nhiệt độ đất</li>'+
            '<li data-value="soilTemp">Độ ẩm không khí</li>'+
            '<li data-value="soilHum">Độ ẩm đất</li>'+
            '<li data-value="elecNeg">Độ ẩm Độ dẫn điện EC</li>'+
            '<li data-value="listIntensity">Cường độ sáng</li>'+
            '</ul>'+
            '</div>'+
            '<a class="iot-editauto-condition-remove btn-auto-remove"></a>'+
            '</div>'+
            '<div class="iot-condition-bottom">'+
            '<div class="iot-condition-value">'+
            '<h5>Từ <span class="unit"></span></h5>'+
            '<input data-role="none" type="number" value="'+conditionhight+'" class="lowThreshold input-focus" placeholder="" />'+
            '</div>'+
            '<div class="iot-condition-value">'+
            '<h5>Đến <span class="unit"></span></h5>'+
            '<input data-role="none" type="number" value="'+conditionLow+'" class="highThreshold input-focus" placeholder="" />'+
            '</div>'+
            '</div>'+
            '<div class="iot-condition-action">'+
            '<a class="iot-autokv-condition-addnew iot-editAuto-condition-addnew">Thêm điều kiện</a>'+
            '</div>'+
            '</div>';
        return html;
    },

    /*
     * Method bind data Area
     *
     */
    bingDataLisCondition: function (datalist) {
        var dfd = $.Deferred();
        var i = 0;
        var html = '';
        var data = datalist;
        var converData = Object.keys(datalist).map( function (i) {
            return datalist[i];
        } );
        console.log(converData);
        if (Array.isArray(converData) && converData.length > 0){
            for (i; i < converData.length; i++) {
                var mychecked = 'checked';
                if(converData[i] === 0){
                    mychecked = '';
                }
                var outputIndex = i +1 ;
                html += '<li>' +
                    '<div class="ioi-device-name">Output '+outputIndex+'</div>' +
                    '<div class="ioi-device-status">' +
                    '<div class="onoffswitch" data-id="'+outputIndex+'">'+
                    '<input data-role="none" data-id="'+outputIndex+'" type="checkbox" name="onoffswitch" class="onoffswitch-checkbox onoffswitch-setup" '+mychecked+'>' +
                    '<div class="onoffswitch-action" data-id="'+outputIndex+'"></div>' +
                    '<span class="onoffswitch-switch"></span>' +
                    '</div>'+
                    '</div>' +
                    '</li>';
            }


            $('.iot-editAutodevice-content').html(html).addClass('active-show-device');
            $('#iot-condition-list-device-wapper').addClass('active-show-device');

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
                    'Output' + 
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


            $('.iot-editAutodevice-content').html(html);


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
     * Method bind data Area
     *
     */
    bingDataListArea: function (data) {

        var i = 0;
        var html = '';

        if(data){
            for(i; i < data.length; i++ ){
                html += '<li data-getway="'+data[i].gatewayID+'" data-node="'+data[i].nodeID+'" data-control="'+data[i].controlID+'" data-areaID="'+data[i].areaID+'">'+data[i].nameArea+'</li>';
            }
            $('#iot-condition-editAuto-area-name').html(html);

        }
    },

    activeTimeWeekEdit: function (event) {
        event.preventDefault();
        var elm  =  $(this);
        if ( elm.hasClass('time-week-active') ) {
            elm.removeClass('time-week-active');
        }else {
            elm.addClass('time-week-active');
        }
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