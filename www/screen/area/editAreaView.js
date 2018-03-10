/**
 * MarkReportView Class
 * @author TuNguyen
 */

var editAreaView = {

    // CONSTANTS
    //
    TAG: 'editAreaView',

    // Class Dom
    CLASS: {
        LOCK_DOM: 'lock-dom-auto'
    },

    // PROPERTIES
    //
    pageID: null,
    buttonBack: null,
    headerID: null,
    footerID: null,
    areaWapper: null,
    listDevice: null,

    inputNameArea: null,
    inputGatewayID: null,
    inputSensorID: null,
    inputControlID: null,

    onoffSwitch: null,
    onoffSwitchTap: null,

    destroyControl: null,
    updateControl: null,

    // METHODS
    //
    initialize: function () {
        editAreaView.pageID = $('#iot-edit-area');
        editAreaView.buttonBack = $('#ioi-back-editarea');
        editAreaView.headerID = $('#iot-editarea-header');
        editAreaView.footerID = $('.iot-editarea-footer');
        editAreaView.areaWapper = $('.ioi-editarea-wapper');
        editAreaView.listDevice = $('#ioi-editarea-device');

        editAreaView.inputNameArea = $('#iot-editarea-name');
        editAreaView.inputGatewayID = $('#iot-editarea-gateway');
        editAreaView.inputSensorID = $('#iot-editarea-sensor');
        editAreaView.inputControlID = $('#iot-editarea-control');

        editAreaView.destroyControl = $('#iot-editarea-destroy');
        editAreaView.updateControl = $('#iot-editarea-action');
    },

    /*
     * Method set Dom default
     * @return: null
     */
    destroy: function () {
        editAreaView.pageID   = null;
        editAreaView.buttonBack   = null;
        editAreaView.headerID   = null;
        editAreaView.footerID   = null;
        editAreaView.areaWapper = null;
        editAreaView.listDevice = null;

        editAreaView.inputNameArea  = null;
        editAreaView.inputGatewayID = null;
        editAreaView.inputSensorID  = null;
        editAreaView.inputControlID  = null;

        editAreaView.onoffSwitch = null;
        editAreaView.onoffSwitchTap = null;

        editAreaView.destroyControl = null;
        editAreaView.updateControl = null;
    },
    /*
     * Method Bind data
     * @return: void
     */
    bindDataListView: function (data) {
        var dfd = $.Deferred();
        var i = 0;
        var html = '';
        if(data){

            // var gateWay = editAreaView.checkName(data.gateway.id,data.gateway.name);
            // var sensor = editAreaView.checkName(data.sensor.id,data.sensor.name);
            // var control = editAreaView.checkName(data.control.id,data.control.name);

            editAreaView.inputNameArea.val(data.name);
            if(data.gateway){
                editAreaView.inputGatewayID.attr('data-id',data.gateway.id).text(data.gateway.name);
            }
            if(data.sensor){
                editAreaView.inputSensorID.attr('data-id',data.sensor.id).text(data.sensor.name);
            }
            if(data.control){
                editAreaView.inputControlID.attr('data-id',data.control.id).text(data.control.name);
            }


            // update device
            if(data.control) {
                var device = data.control.outputs;
                html = editAreaView.bindDataOutput(device);
                // for( i; i < device.length; i++ ){
                //     var checkName = editAreaView.checkName(device[i].id,device[i].name);
                //     var mychecked = 'checked';
                //     if(device[i].enable === 0){
                //         mychecked = '';
                //     }
                //     html += '<li>'+
                //             '<div class="ioi-device-name">'+
                //             '<input type="text" class="ioi-device-name-value" data-role="none" data-id="'+device[i].relay+'" value="'+checkName+'" />'+
                //             '</div>'+
                //             '<div class="ioi-device-status">' +
                //             '<div class="onoffswitch" data-id="'+device[i].relay+'" data-name="'+device[i].name+'">'+
                //             '<input data-role="none" data-id="'+device[i].relay+'" type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" '+mychecked+'>' +
                //             '<div class="onoffswitch-action" data-id="'+device[i].relay+'" data-name="'+device[i].name+'"></div>' +
                //             '<span class="onoffswitch-switch"></span>' +
                //             '</div>'+
                //             '</div>' +
                //             '</li>';
                // }

                editAreaView.listDevice.html(html);
            }
            editAreaView.onoffSwitch = $('.onoffswitch');
            editAreaView.onoffSwitchTap = $('.onoffswitch-action');

            dfd.resolve('Done');
        }else{
            dfd.resolve('Done');
        }
        return dfd.promise();
    },

    appendOutoutWhenChangeControl: function (data) {
        console.log(data);
        var html = editAreaView.bindDataOutput(data);
        editAreaView.listDevice.html(html);
        editAreaView.onoffSwitch = $('.onoffswitch');
        editAreaView.onoffSwitchTap = $('.onoffswitch-action');
    },

    bindDataOutput: function (device) {
        var html = '';
        var i = 0;
        for( i; i < device.length; i++ ){
            var checkName = editAreaView.checkName(device[i].id,device[i].name);
            var mychecked = 'checked';
            if(device[i].enable === 0){
                mychecked = '';
            }
            html += '<li>'+
                '<div class="ioi-device-name">'+
                '<input type="text" class="ioi-device-name-value" data-role="none" data-id="'+device[i].relay+'" value="'+checkName+'" />'+
                '</div>'+
                '<div class="ioi-device-status">' +
                '<div class="onoffswitch" data-id="'+device[i].relay+'" data-name="'+device[i].name+'">'+
                '<input data-role="none" data-id="'+device[i].relay+'" type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" '+mychecked+'>' +
                '<div class="onoffswitch-action" data-id="'+device[i].relay+'" data-name="'+device[i].name+'"></div>' +
                '<span class="onoffswitch-switch"></span>' +
                '</div>'+
                '</div>' +
                '</li>';
        }
        return html;
    },

    bindDataSelectDevice: function (data) {
        var dfd = $.Deferred();
        var i = 0;
        var gatewayHtml = '';
        var controlHtml = '';
        var sensorHtml = '';
        if (Array.isArray(data)) {
            for (i; i < data.length; i++) {
                if(data[i].type == 0 ) {
                    gatewayHtml += '<li class="edit-device-type" data-id="'+data[i].id+'">'+data[i].name+'</li>';
                }
                if(data[i].type == 1 ) {
                    controlHtml += '<li class="edit-device-type iot-create-control" data-id="'+data[i].id+'">'+data[i].name+'</li>';
                }
                if(data[i].type == 2 ) {
                    sensorHtml += '<li class="edit-device-type" data-id="'+data[i].id+'">'+data[i].name+'</li>';
                }
            }
            if(gatewayHtml !== ''){
                $('#iot-edit-gateway-name').html(gatewayHtml);
            }
            if(controlHtml !== ''){
                $('#iot-edit-control-name').html(controlHtml);
            }
            if(sensorHtml !== ''){
                $('#iot-edit-sensor-name').html(sensorHtml);
            }
            dfd.resolve('Done');
        } else {
            dfd.resolve('Done');
        }

        return dfd.promise();
    },

    /*
    * Method check name
    * @params:
    *   id: String
    *   name: String
    * return String
    */
    checkName: function (id,name) {
        var data = id;
        if(name){
            data = name;
        }
        return data;
    },

    /*
     * Method set height for wapper
     * @return: void
     */
    setHeightWapper: function () {
        var heightContent = $(window).innerHeight();
        var headerHeaderPage = editAreaView.headerID.outerHeight();
        var heightFooter = editAreaView.footerID.outerHeight();
        var heightContentList= heightContent - (heightFooter + headerHeaderPage);
        editAreaView.areaWapper.height(heightContentList);
    },
    /*
     * Method update area name on header
     * @return: void
     */
    updateAreaNameHeader: function (name) {
        editAreaView.headerID.find('h1 span').text(name);
    }

}; // End Class