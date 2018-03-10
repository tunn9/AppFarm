/**
 * MarkReportView Class
 * @author TuNguyen
 */

var editDeviceView = {

    // CONSTANTS
    //
    TAG: 'editDeviceView',

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
        editDeviceView.pageID = $('#iot-edit-device');
        editDeviceView.deviceID = $('#iot-condition-device-detail-id');
        editDeviceView.btnBack = $('#ioi-back-edit-device');
        editDeviceView.btnDeviceAddNew = $('#iot-edit-device-action');
        editDeviceView.btnDeviceCancel = $('#iot-edit-device-cancel');
    },

    /*
     * Method set Dom default
     * @return: null
     */
    destroy: function () {
        editDeviceView.pageID = null;
        editDeviceView.deviceID = null;
        editDeviceView.btnDeviceAddNew = null;
        editDeviceView.btnDeviceCancel = null;
        editDeviceView.btnBack = null;

    },

    bindDetailDevice: function (data) {
        console.log(data);
        var name;
        switch (data.type) {
            case 0:
                name = 'Getway';
                break;
            case 1:
                name = 'Control';
                break;
            case 2:
                name = 'sensor';
                break;
            case 3:
                name = 'output';
                break;
            default:
                name = 'Getway';
                break;
        }
        $('#device-detail-name').val(data.name);
        $('#device-detail-ip').val(data.code);
        editDeviceView.deviceID.attr('data-type',data.type).text(name);
    },

    setHeightListDevice: function () {
        var heightWd = $(window).innerHeight();
        var headerHeight = $('#ioi-edit-device-header').outerHeight();
        var heightFooter = $('.iot-edit-device-footer').outerHeight();

        var heightContent = heightWd - ( headerHeight + heightFooter );
        $('.ioi-edit-device-wapper').css('height', heightContent + 'px');
    }

}; // End Class