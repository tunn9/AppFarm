/**
 * MarkReportController Class
 * @author TuNguyen
 */

var editDeviceController = {
    // CONSTANTS
    //
    TAG: 'editDeviceController',

    /**
     * (Required)
     * Parent ID of page holder
     */
    PAGE_ID: 'iot-edit-device',

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

                editDeviceController.doPageBeforeShow();
                break;
            case eventHelper.PAGE_SHOW:
                editDeviceController.doPageShow();
                break;
            default:
                break;
        }
    },
    doPageBeforeShow: function () {
    },

    doPageShow: function () {
        editDeviceController.getDeviceFromService();
        editDeviceController.bindEventHandlers();
        loadingPage.hide();

    },
    getDeviceFromService: function () {
        var url_param = '';
        var data = '';
        var deviceID =  storageManager.get(constants.DEVICE_ID);
        httpService.detailDevice(url_param, data, deviceID).done(function (response) {

            if (response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE ) {

                editDeviceView.bindDetailDevice(response.data);
                loadingPage.hide();
                editDeviceView.setHeightListDevice();

            } else {
                loadingPage.hide();
                editDeviceView.setHeightListDevice();
            }
        }).fail(function (jqXHR) {
            loadingPage.hide();
            editDeviceView.setHeightListDevice();
        });
    },

    /*
     * Method bind event
     *
     */
    bindEventHandlers: function () {
        editDeviceView.pageID.on(eventHelper.TAP,editDeviceController.handleRemoveClassActive);
        editDeviceView.deviceID.on(eventHelper.TAP,editDeviceController.handlerShowListCondition);
        editDeviceView.btnDeviceAddNew.on(eventHelper.TAP,editDeviceController.handlerDeviceAddNew);
        editDeviceView.btnDeviceCancel.on(eventHelper.TAP,editDeviceController.handlerDeviceCancel);
        editDeviceView.btnBack.on(eventHelper.TAP,editDeviceController.handlerDeviceCancel);

    },
    handleRemoveClassActive: function (event) {
        $('.iot-condition-device').removeClass('active');
        var elm = $(event.target);

        if(elm.hasClass('device-name-item')){
            event.preventDefault();
            editDeviceView.deviceID.html(elm.text()).attr('data-type',elm.attr('data-type'));
        }
    },
    handlerShowListCondition: function (e) {
        e.preventDefault();
        e.stopPropagation();
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
            $(this).addClass('active');
        }

    },
    handlerDeviceAddNew: function () {
        var name = $('#device-detail-name').val();
        var dataType = editDeviceView.deviceID.attr('data-type');
        var deviceIP = $('#device-detail-ip').val();
        var data = {
            "id": deviceIP,
            "name": name,
            "type": dataType
        };
        loadingPage.showPageLoading(editDeviceView.pageID);
        httpService.updateDevice('',data).done(function (response) {
            console.log(response);
            if(response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE){
                loadingPage.hidePageLoading();
                var param = {
                    container: editDeviceView.pageID,
                    msg: 'Cập nhật thành công',
                    loadingStatus: true
                };
                $.Alert(param,function (res) {
                    if(res){
                        pageHelper.changePage(fileHelper.getUrl(pageUrl.DEVICE_MANAGER), {transition: eventHelper.PAGE_TRANSITION.SLIDE, reverse: true});
                    }
                });
            }else{
                editDeviceController.handlerFail();
            }

        }).fail(function (jqXHR) {
            debug.log("fail");
            editDeviceController.handlerFail();
        })
    },
    /*
     * Method handle when add area fail
     *
     */
    handlerFail: function () {
        var param = {
            container: editDeviceView.pageID,
            msg: 'Cập nhật không thành công',
            loadingStatus: true
        };
        $.Alert(param);

    },
    handlerDeviceCancel: function (event) {
        event.preventDefault();
        pageHelper.changePage(fileHelper.getUrl(pageUrl.DEVICE_MANAGER), {transition: eventHelper.PAGE_TRANSITION.SLIDE, reverse: true});
    }



}; //End Class