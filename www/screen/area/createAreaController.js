/**
 * MarkReportController Class
 * @author TuNguyen
 */

var createAreaController = {
    // CONSTANTS
    //
    TAG: 'createAreaController',

    /**
     * (Required)
     * Parent ID of page holder
     */
    PAGE_ID: 'iot-createkv',

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
        createAreaView.buttonAction.unbind(eventHelper.TAP);
        createAreaView.buttonRemove.unbind(eventHelper.TAP);
        createAreaView.backButtonID.unbind(eventHelper.TAP);
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

                createAreaController.doPageBeforeShow();
                break;
            case eventHelper.PAGE_SHOW:
                createAreaController.doPageShow();
                break;
            default:
                break;
        }
    },
    doPageBeforeShow: function () {
    },

    doPageShow: function () {
        createAreaController.getListSettingsFromServer();
        createAreaController.getListGatewayFromServer();
        createAreaController.bindEventHandlers();
        createAreaController.bindEventOnOff();


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
        httpService.getListScreenDevice('', data).done(function (response) {
            console.log(response);
            if (response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE && response.total > 0) {
                // call method bind data html
                createAreaView.bindDataListDevice(response.data).done(function () {
                    loadingPage.hide();
                    createAreaView.setHeightListDevice();
                });

            } else {
                loadingPage.hide();
                createAreaView.setHeightListDevice();
            }
        }).fail(function (jqXHR) {
            loadingPage.hide();
            createAreaView.setHeightListDevice();
        });
    },
    /*
     * Method get Gateway data server
     *
     *
     */
    getListGatewayFromServer: function () {
        var url_param = {
            type: 0
        };
        var data = '';
        httpService.getListScreenDevice(url_param, data).done(function (response) {
            console.log('-----------');
            console.log(response);
            createAreaView.bindDataListGateway(response.data)
        });
    },

    /*
    * Method bind event
    *
    */
    bindEventHandlers: function () {
        createAreaView.buttonAction.on(eventHelper.TAP,createAreaController.handlerCreateKV);
        createAreaView.buttonRemove.on(eventHelper.TAP,createAreaController.handlerBackPage);
        createAreaView.backButtonID.on(eventHelper.TAP,createAreaController.handlerBackPage);
        $('.iot-condition-select-device').on(eventHelper.TAP,createAreaController.handlerSelectDevice);
        $('.iot-list-device-name').on(eventHelper.TAP, 'li', createAreaController.handlerSelectDeviceID);
        createAreaView.pageID.on(eventHelper.TAP,createAreaController.handleDeleteClassActive);
        createAreaView.pageID.on(eventHelper.VMOUSEUP,createAreaController.handleBlurInput);
    },

    /*
    * Method handler event create KV
    *
    */
    handlerCreateKV: function () {
        createAreaView.inputNameArea.blur();
        createAreaView.inputGatewayID.blur();
        createAreaView.inputSensorID.blur();
        createAreaView.inputControlID.blur();

        var nameArea = createAreaView.inputNameArea.val();
        var getwayID = createAreaView.inputGatewayID.attr('data-id');
        var nodeID = createAreaView.inputSensorID.attr('data-id');
        var controlID = createAreaView.inputControlID.attr('data-id');
        if( nameArea === '' || getwayID === '' || nodeID === '' || controlID === '' ){
            var errors = {
                msg: 'Chưa nhập dữ liệu!'
            };
            $.Alert(errors);
            return ;
        }
        var data = {};
        data.name = nameArea;
        data.gateway = getwayID;
        data.sensor = nodeID;
        data.control = controlID;
        data.outputs = [];
        $('.onoffswitch-checkbox').each(function () {
            var elm = $(this);
            var enable = 0;
            if($(this).is(':checked')){
                enable = 1;
            }
            var controlValue = {
                relay: elm.attr('data-id'),
                enable: enable,
                name: elm.attr('data-name')
            };
            data.outputs.push(controlValue);
        });

        debug.log(data);
        loadingPage.showPageLoading(createAreaView.pageWapperKV);
        httpService.createArea('',data).done(function (response) {
            debug.log(response);
            if(response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE){
               loadingPage.hidePageLoading();
                    var param = {
                        container: createAreaView.pageID,
                        msg: 'Tạo mới khu vực thành công',
                        loadingStatus: true
                    };
                    $.Alert(param,function (res) {
                        if(res){
                            pageHelper.changePage(fileHelper.getUrl(pageUrl.HOME_PAGE), {transition: eventHelper.PAGE_TRANSITION.SLIDE, reverse: true});
                        }
                    });
            }else{
                createAreaController.handlerFail();
            }

        }).fail(function (jqXHR) {
             debug.log("fail");
            createAreaController.handlerFail();
        })
    },

    /*
    * Method handle when add area fail
    *
    */
    handlerFail: function () {
        var param = {
            container: createAreaView.pageID,
            msg: 'Tạo mới khu vực không thành công',
            loadingStatus: true
        };
        $.Alert(param);
      //  loadingPage.hidePageLoading();
    },

    /*
     * method handler on/off status device
     *
     */
    bindEventOnOff: function () {
        createAreaView.onoffSwitch.on('swipeleft', function (e) {
            var checkbox = $(this).find('.onoffswitch-checkbox');
            if (checkbox.is(':checked')) {
                $(this).find('.onoffswitch-checkbox').prop("checked", false);
            }
        });
        createAreaView.onoffSwitch.on('swiperight', function (e) {
            var checkbox = $(this).find('.onoffswitch-checkbox');
            if (!checkbox.is(':checked')) {
                checkbox.prop("checked", true);
            }
        });
        createAreaView.onoffSwitchTap.on('tap', function (e) {
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
     * Method hanlder back to page
     *
     */
    handlerBackPage: function (event) {
        event.preventDefault();
        var nameArea = createAreaView.inputNameArea.val();
        var getwayID = createAreaView.inputGatewayID.attr('data-id');
        var nodeID = createAreaView.inputSensorID.attr('data-id');
        var controlID = createAreaView.inputControlID.attr('data-id');

        if( nameArea !== '' || getwayID !== '' || nodeID !== '' || controlID !== '' ){
            var msgDestroy = {
                msg: 'Bạn có muốn hủy không?'
            };
            $.Confirm(msgDestroy,function (res) {
                if(res){
                    pageHelper.changePage(fileHelper.getUrl(pageUrl.HOME_PAGE), {
                        transition: eventHelper.PAGE_TRANSITION.SLIDE,
                        reverse: true
                    });
                }
            });
        }else{
            pageHelper.changePage(fileHelper.getUrl(pageUrl.HOME_PAGE), {
                transition: eventHelper.PAGE_TRANSITION.SLIDE,
                reverse: true
            });
        }
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
        if($(this).attr('id') === 'iot-creatkv-control'){
            
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
            createAreaController.getOutputByControlID($(this).attr('data-id'))
        }
    },

    handleDeleteClassActive: function () {
        $('.iot-condition-select-device').removeClass('active');
    },
    handleBlurInput: function (event) {

        if($(event.target).attr('id') !== 'iot-creatkv-name'){

            $('#iot-creatkv-name').blur();
        }
    },
    
    getOutputByControlID: function (controlId) {
        var url_param = {
            notUse: true
        };
        httpService.detailDevice(url_param, '', controlId).done(function (response) {
            console.log(response);
        })
    }



}; //End Class