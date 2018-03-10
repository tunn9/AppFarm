/**
 * MarkReportView Class
 * @author TuNguyen
 */

var createAreaView = {

    // CONSTANTS
    //
    TAG: 'createAreaView',

    // Class Dom
    CLASS: {
      LOCK_DOM: 'lock-dom-auto'
    },

    // PROPERTIES
    //
    pageID: null,
    headerID: null,
    headerTitle: null,
    pageWapperKV: null,
    createkvWapper: null,
    pageContent: null,
    pageContentHeader: null,
    pageListDeviceName: null,
    pageContentFooter: null,
    listDeviceContent: null,
    backButtonID: null,
    buttonAction: null,
    buttonRemove: null,

    onoffSwitch: null,
    onoffSwitchTap: null,

    inputNameArea: null,
    inputGatewayID: null,
    inputSensorID: null,
    inputControlID: null,

    // METHODS
    //
    initialize: function () {
        createAreaView.pageID     = $('#iot-createkv');
        createAreaView.headerID     = $('#ioi-createkv-header');
        createAreaView.headerTitle     = $('#iot-createkv-title');
        createAreaView.pageWapperKV = $('#iot-createkv');

        createAreaView.pageContent = $('#ioi-content-createkv');
        createAreaView.pageContentHeader = $('.iot-createkv-header');
        createAreaView.pageListDeviceName = $('.iot-createkv-name');
        createAreaView.pageContentFooter = $('.iot-createkv-footer');

        createAreaView.listDeviceContent = $('.ioi-list-device-content');

        createAreaView.backButtonID = $('#ioi-back-createkv');
        createAreaView.buttonAction = $('#iot-createkv-action');
        createAreaView.buttonRemove = $('#iot-createkv-remove');

        createAreaView.onoffSwitch = $('.onoffswitch');
        createAreaView.onoffSwitchTap = $('.onoffswitch-action');
        createAreaView.createkv = $('.ioi-createkv-wapper');

        createAreaView.inputNameArea = $('#iot-creatkv-name');
        createAreaView.inputGatewayID = $('#iot-creatkv-gateway');
        createAreaView.inputSensorID = $('#iot-creatkv-sensor');
        createAreaView.inputControlID = $('#iot-creatkv-control');
    },

    /*
     * Method set Dom default
     * @return: null
     */
    destroy: function () {
        createAreaView.pageID = null;
        createAreaView.headerID     = null;
        createAreaView.headerTitle = null;
        createAreaView.pageWapperKV = null;

        createAreaView.pageContent = null;
        createAreaView.pageContentHeader = null;
        createAreaView.pageListDeviceName = null;
        createAreaView.pageContentFooter = null;

        createAreaView.listDeviceContent = null;

        createAreaView.backButtonID = null;
        createAreaView.buttonAction = null;
        createAreaView.buttonRemove = null;
        createAreaView.onoffSwitch = null;
        createAreaView.onoffSwitchTap = null;
        createAreaView.createkv = null;

        createAreaView.inputNameArea  = null;
        createAreaView.inputGatewayID = null;
        createAreaView.inputSensorID  = null;
        createAreaView.inputControlID = null;

    },
    bindDataListDevice: function (data) {
        var dfd = $.Deferred();
        var i = 0;
        var gatewayHtml = '';
        var controlHtml = '';
        var sensorHtml = '';
        if (Array.isArray(data)) {
            for (i; i < data.length; i++) {
                if(data[i].type == 0 ) {
                    gatewayHtml += '<li data-id="'+data[i].id+'">'+data[i].name+'</li>';
                }
                if(data[i].type == 1 ) {
                    controlHtml += '<li class="iot-create-control" data-id="'+data[i].id+'">'+data[i].name+'</li>';
                }
                if(data[i].type == 2 ) {
                    sensorHtml += '<li data-id="'+data[i].id+'">'+data[i].name+'</li>';
                }
            }
            if(gatewayHtml) {
                $('#iot-list-gateway-name').html(gatewayHtml);
            }
            if(controlHtml) {
                $('#iot-list-control-name').html(controlHtml);
            }
            if(sensorHtml) {
                $('#iot-list-sensor-name').html(sensorHtml);
            }
            dfd.resolve('Done');
        } else {
            dfd.resolve('Done');
        }

        return dfd.promise();
    },
    setHeightListDevice: function () {
        var heightContent = $(window).innerHeight();
        var headerHeaderPage = createAreaView.headerID.innerHeight();
        var heightFooter = createAreaView.pageContentFooter.outerHeight();

        var heightContentList= heightContent - (heightFooter + headerHeaderPage);
        createAreaView.createkv.css('height',heightContentList+'px');
    }

}; // End Class