/**
 * MarkReportController Class
 * @author TuNguyen
 */

var editAreaController = {
    // CONSTANTS
    //
    TAG: 'editAreaController',

    /**
     * (Required)
     * Parent ID of page holder
     */
    PAGE_ID: 'iot-edit-area',

    // PROPERTIES
    //
    dataObject: null,

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
        editAreaController.dataObject = null;
        if(editAreaView.onoffSwitch){
            editAreaView.onoffSwitch.unbind('swipeleft swiperight');
            editAreaView.onoffSwitchTap.unbind(eventHelper.TAP);
        }
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
                editAreaController.doPageBeforeShow();
                break;
            case eventHelper.PAGE_SHOW:
                editAreaController.doPageShow();
                break;
            default:
                break;
        }
    },
    doPageBeforeShow: function () {
        editAreaController.dataObject = storageManager.get(constants.AREA_EDIT_KEY);
        editAreaView.updateAreaNameHeader(editAreaController.dataObject.name);
    },

    doPageShow: function () {
        editAreaController.getDataAreaFromServer();
        editAreaController.getListSettingsFromServer();
        editAreaController.bindEventHandlers();
    },

    /*
     * Method bind event
     *
     */
    bindEventHandlers: function () {

        editAreaView.buttonBack.on(eventHelper.TAP,editAreaController.handlerBackPage);

        editAreaView.destroyControl.on(eventHelper.TAP,editAreaController.handlerBackPage);

        editAreaView.updateControl.on(eventHelper.TAP,editAreaController.handlerUpdateArea);

        $('.iot-condition-select-device').on(eventHelper.TAP,editAreaController.handlerSelectDevice);
        $('.iot-area-group').on(eventHelper.TAP, '.edit-device-type', editAreaController.handlerSelectDeviceID);
        editAreaView.pageID.on(eventHelper.TAP,editAreaController.handleDeleteClassActive);
        editAreaView.pageID.on(eventHelper.VMOUSEUP,editAreaController.handleBlurInput);
    },

    /*
    * Method: get data from server
    * @return Object
    */
    getDataAreaFromServer: function () {
        var url_params = '';
        httpService.detailArea(url_params, '', editAreaController.dataObject.areaID).done(function (response) {
            console.log(response);
             if(response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE){
                editAreaView.bindDataListView(response.data).done(function () {
                    editAreaView.setHeightWapper();
                    loadingPage.hide();
                    editAreaController.bindEventOnOff();

                });
             }else{
                 editAreaView.setHeightWapper();
                 loadingPage.hide();
                 var param = {
                     title: '',
                     msg: 'lấy dữ liệu không thành công'
                 };
                 $.Alert(param,function () {
                     pageHelper.changePage(fileHelper.getUrl(pageUrl.HOME_PAGE), {
                         transition: eventHelper.PAGE_TRANSITION.SLIDE,
                         reverse: true
                     });
                 });
             }
        }).fail(function () {
            loadingPage.hide();
        });
    },

    /*
     * Method get data server
     *
     *
     */
    getListSettingsFromServer: function () {
        var url_param = {
            notUse: true
        };
        var data = '';
        httpService.getListScreenDevice(url_param, data).done(function (response) {

            if (response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE) {
                // call method bind data html
                editAreaView.bindDataSelectDevice(response.data);

            }
        });
    },

    /*
     * method handler on/off status device
     *
     */
    bindEventOnOff: function () {
        editAreaView.onoffSwitch.on('swipeleft', function (e) {
            var checkbox = $(this).find('.onoffswitch-checkbox');
            if (checkbox.is(':checked')) {
                $(this).find('.onoffswitch-checkbox').prop("checked", false);
            }
        });
        editAreaView.onoffSwitch.on('swiperight', function (e) {
            var checkbox = $(this).find('.onoffswitch-checkbox');
            if (!checkbox.is(':checked')) {
                checkbox.prop("checked", true);
            }
        });
        editAreaView.onoffSwitchTap.on('tap', function (e) {
            e.preventDefault();
            debug.log(this.TAG);
            var checkbox = $(this).prev();
            if (checkbox.is(':checked')) {
                checkbox.prop("checked", false);

            } else {
                checkbox.prop("checked", true);
            }
        });
    },


    /*
    * Method handle back from page
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
    * Method handle update area
    * 
    */
    handlerUpdateArea: function (event) {
        event.preventDefault();
        var data = {};
        data.id = editAreaController.dataObject.areaID;
        data.name = editAreaView.inputNameArea.val();
        data.gateway = editAreaView.inputGatewayID.attr('data-id');
        data.sensor = editAreaView.inputSensorID.attr('data-id');
        data.control = editAreaView.inputControlID.attr('data-id');
        data.outputs = [];
        var i = 0;
        for(i; i < $('.ioi-device-name-value').length; i++){
            var elm = $("#ioi-editarea-device li:eq("+i+")");
            var nameOutput = elm.find('.ioi-device-name-value').val();
            var relay = elm.find('.onoffswitch-checkbox');
            var enable = 0;
            if (relay.is(':checked')) {
                enable = 1;
            }
            // var dataOutput = {
            //     "relay": relay.attr('data-id'),
            //     "name": nameOutput,
            //     "enable": enable,
            //     "status": 0
            // };
            var dataOutput = {
                "relay": relay.attr('data-id'),
                "enable": enable,
                "name": nameOutput
            };
            data.outputs.push(dataOutput);
        }

        console.log(data);
        loadingPage.showPageLoading(editAreaView.pageID);
        httpService.editArea('',data).done(function (response) {
            debug.log(response);
            if(response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE){

                var param = {
                    container: editAreaView.pageID,
                    msg: 'Cập nhật khu vực thành công',
                    loadingStatus: true
                };
                $.Alert(param,function (res) {
                    if(res){
                        pageHelper.changePage(fileHelper.getUrl(pageUrl.HOME_PAGE), {transition: eventHelper.PAGE_TRANSITION.SLIDE, reverse: true});
                    }
                });
            }else{
                editAreaController.handlerFail();
            }

        }).fail(function (jqXHR) {
            debug.log("fail");
            editAreaController.handlerFail();
        })
    },

    /*
     * Method handle when add area fail
     *
     */
    handlerFail: function () {
        var param = {
            container: editAreaView.pageID,
            msg: 'Cập nhật khu vực không thành công',
            loadingStatus: true
        };
        $.Alert(param);
        //  loadingPage.hidePageLoading();
    },


    handlerSelectDevice: function (event) {
        event.preventDefault();
        event.stopPropagation();
        $('.iot-condition-select-device').removeClass('active');
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
            $(this).addClass('active');
        }

    },
    handleDeleteClassActive: function () {
        $('.iot-condition-select-device').removeClass('active');
    },

    handleBlurInput: function (event) {

        if($(event.target).attr('id') !== 'iot-editarea-name'){

            $('#iot-editarea-name').blur();
        }
    },

    handlerSelectDeviceID: function (event) {
        event.preventDefault();
        event.stopPropagation();
        var id = $(this).attr('data-id');
        var name = $(this).text();
        $('.active').attr('data-id',id).text(name);
        $('.iot-condition-select-device').removeClass('active');

        if($(this).hasClass('iot-create-control')){
            editAreaController.getOutputByControlID($(this).attr('data-id'))
        }
    },

    getOutputByControlID: function (controlId) {
        var url_param = {
            notUse: true
        };
        httpService.detailDevice(url_param, '', controlId).done(function (response) {
            if(response.code === 200) {
                editAreaView.appendOutoutWhenChangeControl(response.data.outputs);
                editAreaController.bindEventOnOff();
            }
        })
    }

}; //End Class