/**
 * MarkReportView Class
 * @author FPT Software
 */

var deviceView = {

    // CONSTANTS
    //
    TAG: 'deviceView',

    // Class Dom
    CLASS: {
        LOCK_DOM: 'lock-dom-auto'
    },

    // PROPERTIES
    //
    pageId: null,
    pageContent: null,
    backButtonID: null,
    deviceList: null,
    btnRemoveDevice: null,
    btnRemove: null,
    btnAddNew: null,

    // METHODS
    //
    initialize: function () {
        deviceView.pageId = $('#setupautokv');
        deviceView.backButtonID = $('#ioi-back-device');
        deviceView.deviceList = $('#iot-list-device-manager');
        deviceView.btnAddNew = $('#iot-addnew-device');
    },

    /*
     * Method set Dom default
     * @return: null
     */
    destroy: function () {
        deviceView.pageId = null;
        deviceView.backButtonID = null;
        deviceView.btnAddNew = null;
    },
    bindDataListSettings: function (data) {
        var dfd = $.Deferred();
        var i = 0;
        var html = '';
        if (Array.isArray(data)) {
            for (i; i < data.length; i++) {
                if( data[i].type === 3 ) continue;
                html += '<ul>' +
                        '<li class="device-setting-edit" data-id="'+data[i].id+'">'+data[i].name+'</li>'+
                        '<li class="device-setting-edit" data-id="'+data[i].id+'">'+data[i].code+'</li>'+
                        '<li><span class="device-wifi status'+data[i].status+'"></span></li>'+
                        '<li><span class="btn-remove-device" data-id="'+data[i].id+'"></span></li>'+
                        '</ul>';
            }

            deviceView.deviceList.html(html);
            this.btnRemoveDevice = $('.btn-remove-device');
            dfd.resolve('Done');
        } else {
            dfd.resolve('Done');
        }

        return dfd.promise();
    },


    checkNameOutput: function (name, index, type) {
        if(type !== 3) return name;
        if(!name){

            return 'Output ' + (index + 1);
        }else {
            return name;
        }
    },

    setHeightList: function () {
        var heightWd = $(window).innerHeight();
        var headerHeight = $('#iot-device-header-main').outerHeight();
        var heightSettings = $('#iot-device-header').outerHeight();
        var heightFooter = $('#device-footer').outerHeight();

        var heightContent = heightWd - ( headerHeight + heightSettings + heightFooter );
        deviceView.deviceList.css('height', heightContent + 'px');
    },

    /*
     * Remove element active
     *
     */
    handlerRemoveSettings: function (elm) {
        elm.remove();

    }

}; // End Class