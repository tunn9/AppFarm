var homeController = {
    TAG: 'homeController',


    PAGE_ID: 'home',

    initialize: function () {

    },

    /**
     * (Required) Destructor
     */
    destroy: function () {
        debug.log(this.TAG + '#destroy()');

        homeView.iconMoreID.unbind(eventHelper.TAP);
        homeView.pageId.unbind(eventHelper.TAP);
        homeView.iconRemoveID.unbind(eventHelper.TAP);
        homeView.brandID.unbind(eventHelper.TAP);
        homeView.loadingPage.unbind(eventHelper.TOUCH_MOVE);
        homeView.addnewArea.unbind(eventHelper.TAP);
        homeView.iconEditID.unbind(eventHelper.TAP)

    },

    receivePageEvents: function (eventId) {
        debug.log(this.TAG + ' #receiveEvents() eventId=' + eventId);
        switch (eventId) {
            case eventHelper.BACK_BUTTON:
                break;
            case eventHelper.PAGE_BEFORE_SHOW:
                homeController.doPageBeforeShow();
                break;
            case eventHelper.PAGE_SHOW:
                homeController.doPageShow();
                break;
            case eventHelper.PAGE_BEFORE_HIDE:

                break;
            case eventHelper.PAGE_HIDE:
                break;
            case eventHelper.DEVICE_READY:
                break;
            default:
                break;
        }
    },

    doPageBeforeShow: function () {
        homeView.loadingPage.on(eventHelper.TOUCH_MOVE,function (e) {
            e.preventDefault();
        });
    },

    doPageShow: function () {

        // call method get data server
        homeController.getListAreaDataServer();
        // bind event
        homeController.bindEventHandlers();

    },

    getListAreaDataServer: function () {
        var url_param = '';
        var data = '';
        httpService.getListArea(url_param, data).done(function (response) {
            debug.log(response);
            if (response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE && response.total > 0) {
                // call method bind data html
                homeView.bindDataArea(response.data).done(function () {
                    storageManager.put(constants.DATA_AREA,homeView.dataArea);
                    if(!mqttApp.conntectServer){
                       mqttApp.connect(homeView.dataArea);
                    }
                    homeView.setHeightItem();
                    homeController.handlerControlButton();
                    loadingPage.hide();
                    homeView.pageId.removeClass('lock-home-page');
                });

            } else {
                loadingPage.hide();
                homeView.iconMoreID.addClass(homeView.CLASS.NODE_ACITVE);
                homeView.pageId.removeClass('lock-home-page');
            }
        }).fail(function (jqXHR) {
            debug.log(jqXHR);
            if(jqXHR === 403){
                sidebarPanel.handlerLogout();
            }
            homeView.pageId.removeClass('lock-home-page');
            loadingPage.hide();
        });
    },

    /**
     * Method bind event for page
     *
     */
    bindEventHandlers: function () {
        homeView.brandID.on(eventHelper.TAP,homeController.openSidebarHome);
        homeView.iconMoreID.on(eventHelper.TAP, homeView.handlerPopupMore);
        homeView.pageId.on(eventHelper.TAP, homeController.handlerClosePopupMore);
        homeView.iconRemoveID.on(eventHelper.TAP, homeController.handlerRemoveAreaControl);

        homeView.addnewArea.on(eventHelper.TAP,homeController.handlerCreateKVNAME);
        homeView.iconEditID.on(eventHelper.TAP, homeController.handlerEditArea)
    },

    /*
    * Method Open sidebar
    *
    */
    openSidebarHome: function (event) {
        event.preventDefault();
        sidebarPanel.open();
    },

    /*
    * Method handler Event remove Area
    *
    */
    handlerRemoveAreaControl: function () {
        var paramRemove = {
            msg: 'Bạn có muốn xóa không?',
            loadingstatus: true
        };
        var paramSuccess = {
            msg: 'Bạn đã xóa thành công?'
        };
        var url_param = {};
        var data_post = {};
        data_post.id = $('.owl-item.active').find('.control-area').attr('data-id');
        var gateWayID = $('.owl-item.active').find('.control-area').attr('data-subname');
        var topicArea    = "smartFarm/"+gateWayID+"/STATUS";
        $.Confirm(paramRemove,function (res) {
            if(res){
                httpService.deleteArea(url_param,data_post).done(function (response) {
                    if(response.code === constants.HTTP_STATUS_CODES.SUCCESS_CODE){
                        $.Alert( paramSuccess ) ;
                        if(mqttApp.conntectServer){
                            mqttApp.unsubscribeTopic(topicArea)
                        }
                        homeView.handlerRemoveArea();
                    }else{
                        $.AlertSingle('Bạn xóa không thành công');
                    }
                }).fail(function () {
                        $.AlertSingle('Bạn xóa không thành công');
                });

            }
        });
    },

    /*
     * Method handler create kv
     *
     */
    handlerCreateKVNAME: function (event) {
        event.preventDefault();
        pageHelper.changePage(fileHelper.getUrl(pageUrl.CREATE_KV), {transition: eventHelper.PAGE_TRANSITION.SLIDE});
    },

    /*
    * Method handler edit area
    */
    handlerEditArea: function (event) {
      event.preventDefault();
        var areaID = $('.active .control-area').attr('data-id');
        var name   = $('.active .control-area').attr('data-name');
        var index  = $('.active').index();
        var data = {
            areaID: areaID,
            name: name,
            index: index
        };
        storageManager.put(constants.AREA_EDIT_KEY,data);
        pageHelper.changePage(fileHelper.getUrl(pageUrl.EDIT_AREA), {
            transition: eventHelper.PAGE_TRANSITION.SLIDE
        });
    },

    /*
     * Method handler event control
     *
     */
    handlerControlButton: function () {
        homeView.buttonAreaControl.on(eventHelper.TAP, function (event) {
            event.preventDefault();
            var data = {
                gatewayID: $(this).attr('data-gatewayID'),
                id: $(this).attr('data-id'),
                name: $(this).attr('data-name')
            };
            storageManager.put(constants.DATA_MANUAL, data);
            pageHelper.changePage(fileHelper.getUrl(pageUrl.MANUAL), {transition: eventHelper.PAGE_TRANSITION.SLIDE});
        });
    },

    /*
    * Method handler close popup
    *
    */
    handlerClosePopupMore: function (ev) {
        var dom = $(ev.target);
        if (!dom.hasClass('ic-more')) {
            homeView.popupMore.removeClass(homeView.CLASS.POPUP_OPEN);
        }
    }

};