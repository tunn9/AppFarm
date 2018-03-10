/**
 * MarkReportController Class
 * @author TuNguyen
 */

var createDeviceController = {
    // CONSTANTS
    //
    TAG: 'createDeviceController',

    /**
     * (Required)
     * Parent ID of page holder
     */
    PAGE_ID: 'iot-create-device',

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

                createDeviceController.doPageBeforeShow();
                break;
            case eventHelper.PAGE_SHOW:
                createDeviceController.doPageShow();
                break;
            default:
                break;
        }
    },
    doPageBeforeShow: function () {
    },

    doPageShow: function () {
        createDeviceView.setHeightListDevice();
        createDeviceController.bindEventHandlers();
        loadingPage.hide();

    },
    /*
     * Method bind event
     *
     */
    bindEventHandlers: function () {
        createDeviceView.pageID.on(eventHelper.TAP,createDeviceController.handleRemoveClassActive);
        createDeviceView.deviceID.on(eventHelper.TAP,createDeviceController.handlerShowListCondition);
        createDeviceView.btnDeviceAddNew.on(eventHelper.TAP,createDeviceController.handlerDeviceAddNew);
        createDeviceView.btnDeviceCancel.on(eventHelper.TAP,createDeviceController.handlerDeviceCancel);
        createDeviceView.btnBack.on(eventHelper.TAP,createDeviceController.handlerDeviceCancel);
        createDeviceView.pageID.on(eventHelper.VMOUSEUP,createDeviceView.handleBlurInput);

    },
    handleRemoveClassActive: function (event) {
        $('.iot-condition-device').removeClass('active');
        var elm = $(event.target);

        if(elm.hasClass('device-name-item')){
            event.preventDefault();
            createDeviceView.deviceID.html(elm.text()).attr('data-type',elm.attr('data-type'));
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
        var name = $('#device-name').val();
        var dataType = createDeviceView.deviceID.attr('data-type');
        var deviceIP = $('#device-ip').val();
        var data = {
            "code": deviceIP,
            "name": name,
            "type": dataType
        };
        loadingPage.showPageLoading(createDeviceView.pageID);
        httpService.addNewDevice('',data).done(function (response) {
            if(response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE){
                loadingPage.hidePageLoading();
                var param = {
                    container: createDeviceView.pageID,
                    msg: 'Thêm mới thành công',
                    loadingStatus: true
                };
                $.Alert(param,function (res) {
                    if(res){
                        pageHelper.changePage(fileHelper.getUrl(pageUrl.DEVICE_MANAGER), {transition: eventHelper.PAGE_TRANSITION.SLIDE, reverse: true});
                    }
                });
            }else{
                createDeviceController.handlerFail();
            }

        }).fail(function (jqXHR) {
            debug.log("fail");
            createDeviceController.handlerFail();
        })
    },
    /*
     * Method handle when add area fail
     *
     */
    handlerFail: function () {
        var param = {
            container: createDeviceView.pageID,
            msg: 'Thêm mới Device không thành công',
            loadingStatus: true
        };
        $.Alert(param);

    },
    handlerDeviceCancel: function (event) {
        event.preventDefault();
        pageHelper.changePage(fileHelper.getUrl(pageUrl.DEVICE_MANAGER), {transition: eventHelper.PAGE_TRANSITION.SLIDE, reverse: true});
    },

    handleBlurInput: function (event) {
        if($(event.target).attr('type') !== 'text'){

            $('#iot-editarea-name').blur();
        }
    }
   


}; //End Class