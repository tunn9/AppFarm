/**
 * MarkReportView Class
 * @author TuNguyen
 */

var createDeviceView = {

    // CONSTANTS
    //
    TAG: 'createDeviceView',

    // Class Dom
    CLASS: {
        LOCK_DOM: 'lock-dom-auto'
    },

    // PROPERTIES
    //
    pageID: null,
    headerID: null,
    btnBack: null,
    deviceID: null,
    btnDeviceAddNew: null,
    btnDeviceCancel: null,

    // METHODS
    //
    initialize: function () {
        createDeviceView.pageID = $('#iot-create-device');
        createDeviceView.deviceID = $('#iot-condition-device-id');
        createDeviceView.btnBack = $('#ioi-back-create-device');
        createDeviceView.btnDeviceAddNew = $('#iot-create-device-action');
        createDeviceView.btnDeviceCancel = $('#iot-create-device-cancel');
    },

    /*
     * Method set Dom default
     * @return: null
     */
    destroy: function () {
        createDeviceView.pageID = null;
        createDeviceView.deviceID = null;
        createDeviceView.btnDeviceAddNew = null;
        createDeviceView.btnDeviceCancel = null;
        createDeviceView.btnBack = null;

    },
    setHeightListDevice: function () {
        var heightWd = $(window).innerHeight();
        var headerHeight = $('#ioi-create-device-header').outerHeight();
        var heightFooter = $('.iot-create-device-footer').outerHeight();

        var heightContent = heightWd - ( headerHeight + heightFooter );
        $('.ioi-create-device-wapper').css('height', heightContent + 'px');
    }

}; // End Class