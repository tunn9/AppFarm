/**
 * MarkReportController Class
 * @author FPT Software
 */

var deviceController = {
    // CONSTANTS
    //
    TAG: 'deviceController',

    /**
     * (Required)
     * Parent ID of page holder
     */
    PAGE_ID: 'device-manager',
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
                deviceController.doPageBeforeShow();
                break;
            case eventHelper.PAGE_SHOW:
                deviceController.doPageShow();
                break;
            default:
                break;
        }
    },
    doPageBeforeShow: function () {

    },

    doPageShow: function () {
        deviceController.getListSettingsFromServer();
        deviceController.bindingEvent();
    },

    bindingEvent: function () {
        deviceView.backButtonID.on('tap', deviceController.handlerBackPage);
        deviceView.btnAddNew.on(eventHelper.TAP,deviceController.handlerAddNewDevice);
    },
    /*
     * Method get data server
     *
     *
     */
    getListSettingsFromServer: function () {
        var url_param = '';
        var data = '';
        httpService.getListScreenDevice(url_param, data).done(function (response) {
            debug.log(response);
            if (response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE && response.total > 0) {
                // call method bind data html
                deviceView.bindDataListSettings(response.data).done(function () {
                    loadingPage.hide();
                    deviceView.setHeightList();
                    deviceController.bindEventAferLoadData();
                });

            } else {
                loadingPage.hide();
                deviceView.setHeightList();
            }
        }).fail(function (jqXHR) {
            loadingPage.hide();
            deviceView.setHeightList();
        });
    },
    /*
     * Method bind event for icon check
     *
     */
    bindEventAferLoadData: function () {
        deviceView.btnRemoveDevice.on(eventHelper.TAP,deviceController.handlerRemoveSetting);

        $('.device-setting-edit').on(eventHelper.TAP,deviceController.editDeviceControl);
    },

    /*
    * Method edit device
    *
    */
    editDeviceControl: function (event) {
        event.preventDefault();
        var elm = $(event.target);
        var id = elm.attr('data-id');
        storageManager.put(constants.DEVICE_ID, id);
        pageHelper.changePage(fileHelper.getUrl(pageUrl.EDIT_DEVICE_MANAGER), {
            transition: eventHelper.PAGE_TRANSITION.SLIDE
        });

    },

    /*
     * Method hanlder back to page
     *
     */
    handlerBackPage: function (event) {
        event.preventDefault();
        pageHelper.changePage(fileHelper.getUrl(pageUrl.HOME_PAGE), {
            transition: eventHelper.PAGE_TRANSITION.SLIDE,
            reverse: true
        });
    },
    /*
     *  Handle delete setting auto
     *
     * */
    handlerRemoveSetting: function (event) {
        event.preventDefault();
        var paramRemove = {
            msg: 'Bạn có muốn xóa không?',
            loadingstatus: true
        };
        var paramSuccess = {
            msg: 'Bạn đã xóa thành công?'
        };
        var data_post = {
            deviceIds: []
        };
        $('.iot-check-active').each(function () {
            var deviceID = $(this).attr('data-id');
            data_post.deviceIds.push(deviceID)
        });
        var data_post = {
            id: $(this).attr('data-id')
        };
        var elm = $(this).closest('ul');

        $.Confirm(paramRemove,function (res) {
            if(res){
                var url_param = '';
                httpService.removeListScreenDevice(url_param,data_post).done(function (response) {
                    if(response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE){
                        deviceView.handlerRemoveSettings(elm);
                        $.Alert(paramSuccess) ;
                    }else{
                        $.AlertSingle('Bạn xóa không thành công');
                    }
                }).fail(function () {
                    $.AlertSingle('Bạn xóa không thành công');
                });

            }
        });

    },
    handlerAddNewDevice: function (event) {
        event.preventDefault();
        pageHelper.changePage(fileHelper.getUrl(pageUrl.CREATE_DEVICE_MANAGER), {
            transition: eventHelper.PAGE_TRANSITION.SLIDE
        });
    }

}; //End Class