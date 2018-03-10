/**
 * MarkReportView Class
 * @author FPT Software
 */

var manualView = {

    // CONSTANTS
    //
    TAG: 'manualView',

    // Class Dom
    CLASS: {
      LOCK_DOM: 'lock-dom-auto'
    },

    // PROPERTIES
    //
    pageId: null,
    pageContent: null,
    pageTitle: null,
    listDevice: null,
    listDeviceContent: null,
    backButtonID: null,
    titleHader: null,

    onoffSwitch: null,
    onoffSwitchTap: null,

    // METHODS
    //
    initialize: function () {
        manualView.pageId = $('#setupautokv');
        manualView.backButtonID = $('#ioi-back-kv');
        manualView.titleHader = $('#setupautokv-title');
        manualView.pageContent = $('#ioi-content-kv');
        manualView.pageTitle = $('.ioi-setupkv-header');
        manualView.listDevice = $('.ioi-list-device');
        manualView.listDeviceContent = $('.ioi-list-device-content');
    },

    /*
     * Method set Dom default
     * @return: null
     */
    destroy: function () {
        manualView.pageId = null;
        manualView.backButtonID = null;
        manualView.titleHader = null;
        manualView.pageContent = null;
        manualView.pageTitle = null;
        manualView.listDevice = null;
        manualView.listDeviceContent = null;
        homeView.onoffSwitch = null;
        homeView.onoffSwitchTap = null;
    },
    bindDataListDevice: function (data) {
        var dfd = $.Deferred();
        var i = 0;
        var html = '';
        if (Array.isArray(data)) {

            for (i; i < data.length; i++) {
                var mychecked = 'checked';
                var index = i + 1;
                if(data[i].status === 0){
                    mychecked = '';
                }
                html += '<li class="iot-list-device-manual iot-list-device-manual'+data[i].relay+'">' +
                    '<div class="ioi-device-name">' +
                        data[i].name +
                    '</div>' +
                    '<div class="iot-device-time"><input type="number" value="5" class="iot-manual-time iot-manual-time'+data[i].relay+'" ></div>'+
                    '<div class="ioi-device-status">' +
                    '<div class="onoffswitch action-onoff" data-id="'+data[i].relay+'">'+
                    '<input data-role="none" type="checkbox" name="onoffswitch" class="onoffswitch-checkbox Output'+index+'" '+mychecked+'>' +
                    '<div class="onoffswitch-action action-onoff" data-id="'+data[i].relay+'"></div>' +
                    '<span class="onoffswitch-switch"></span>' +
                    '</div>'+
                    '</div>' +
                    '</li>';
            }

            manualView.listDeviceContent.html(html);
            manualView.onoffSwitch = $('.onoffswitch');
            manualView.onoffSwitchTap = $('.onoffswitch-action');
            dfd.resolve('Done');
        } else {
            dfd.resolve('Done');
        }
        return dfd.promise();
    },

    checkNameOutput: function (name, index) {

        if(!name){

            return 'Output ' + (index + 1);
        }else {
            return name;
        }
    },

    setHeightListDevice: function () {
        var heightContent = manualView.pageContent.outerHeight();
        var heightTitle = manualView.pageTitle.outerHeight(true);
        var heightList = heightContent - heightTitle;
        manualView.listDevice.css('height', heightList + 'px');
    }

}; // End Class