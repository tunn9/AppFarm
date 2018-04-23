var homeView = {
    TAG: 'homeView',

    CLASS: {
        NOT_DATA: 'not-data',
        POPUP_OPEN: 'iot-popup-open',
        NODE_ACITVE: 'noActive'
    },

    dataArea: [],

    pageId: null,
    brandID: null,
    headerID: null,
    pageContent: null,
    areaWapper: null,
    itemArea: null,
    titleArea: null,
    buttonAreaControl: null,
    owlClass: null,
    addnewArea: null,

    iconMoreID: null,
    popupMore: null,

    iconEditID: null,
    iconRemoveID: null,

    loadingPage: null,

    /*
     * Method set Dom
     * @return: Dom
     */
    initialize: function () {
        homeView.pageId = $('#home');
        homeView.brandID = $('#ioi-brand-home');
        homeView.headerID = $('#ioi-header-home');
        homeView.owlClass = $('.owl-carousel');
        homeView.addnewArea = $('#addnew-area');
        homeView.areaWapper = $('#ioi-area-wapper');
        homeView.pageContent = $('#ioi-content-home');

        homeView.iconMoreID = $('#iot-more');
        homeView.popupMore = $('.iot-more-control');

        homeView.iconRemoveID = $('#iot-area-remove');
        homeView.iconEditID = $('#iot-area-edit');
        homeView.titleArea = $('#iot-home-title');

        homeView.loadingPage = $('#loading-page-home');

    },

    /*
     * Method set Dom default
     * @return: null
     */
    destroy: function () {

        homeView.pageId = null;
        homeView.brandID = null;
        homeView.headerID = null;
        homeView.buttonAreaControl = null;
        homeView.titleArea = null;
        homeView.itemArea = null;
        homeView.owlClass = null;
        homeView.addnewArea = null;
        homeView.areaWapper = null;
        homeView.pageContent = null;
        homeView.iconMoreID = null;
        homeView.popupMore = null;
        homeView.iconRemoveID = null;
        homeView.iconEditID = null;
        homeView.loadingPage = null;

    },

    /*
     * Method Bind Data server
     * @return html
     */
    bindDataArea: function (datalist) {
        var dfd = $.Deferred();
        var i = 0;
        var html = '';
        var data_areas = [];
        if (Array.isArray(datalist) && datalist.length > 0) {
            var data =  datalist.reverse();
            for (i; i < data.length; i++) {
                var gateId = '', sensorId = '';
                if(data[i].gateway){
                    gateId = data[i].gateway.code;
                }
                if(data[i].sensor){
                    sensorId = data[i].sensor.code;
                }

                if(i === 0){
                    homeView.titleArea.text(data[i].name);
                }
                var data_local =  {
                    gatewayID: gateId,
                    nameArea: data[i].name,
                    areaID: data[i].id,
                    nodeID: '',
                    controlId: ''
                };
                console.log(data);
                if(data[i].sensor){
                    data_local.nodeID = data[i].sensor.code;
                }
                if(data[i].control){
                    data_local.controlID = data[i].control.code;
                }
                data_areas.push(data_local);
                html += '<div class="item-area">' +
                    '<div class="background-cameras"></div>' +
                    '<div class="content-area" data-namekv="'+data[i].name+'">' +
                    '<ul class="'+sensorId+'">'+
                        '<li class="item-airTemprature">'+
                            '<div class="icon-area airHumidity"></div>' +
                            '<div class="name-area pull-left">Nhiệt độ không khí</div>' +
                            '<div class="status-area airTemp pull-left">' + data[i].sensorValue.airTemp.toFixed(1) + '</div>' +
                            '<div class="unit-area pull-left">°C</div>' +
                        '</li>'+
                        '<li class="item-landTemprature">'+
                        '<div class="icon-area landTemprature"></div>' +
                        '<div class="name-area pull-left">Nhiệt độ đất</div>' +
                        '<div class="status-area soilTemp pull-left">' + data[i].sensorValue.landTemp.toFixed(1) + '</div>' +
                        '<div class="unit-area pull-left">°C</div>' +
                        '</li>'+
                        '<li class="item-airHumidity">'+
                            '<div class="icon-area airTemprature"></div>' +
                            '<div class="name-area pull-left">Độ ẩm không khí</div>' +
                            '<div class="status-area airHum pull-left">' + data[i].sensorValue.airHum.toFixed(1) + '</div>' +
                            '<div class="unit-area pull-left">%RH</div>' +
                        '</li>'+
                        '<li class="item-lanHumidity">'+
                            '<div class="icon-area lanHumidity"></div>' +
                            '<div class="name-area pull-left">Độ ẩm đất</div>' +
                            '<div class="status-area soilHum pull-left">' + data[i].sensorValue.landHum.toFixed(1) + '</div>' +
                            '<div class="unit-area pull-left">%RH</div>' +
                        '</li>'+
                        '<li class="item-conductivityEC">'+
                        '<div class="icon-area conductivityEC"></div>' +
                        '<div class="name-area pull-left">Độ dẫn điện EC</div>' +
                        '<div class="status-area elecNeg pull-left">' + data[i].sensorValue.elecNeg.toFixed(1) + '</div>' +
                        '<div class="unit-area pull-left">mS /cm</div>' +
                        '</li>'+
                        '<li class="item-conductivityEC">'+
                        '<div class="icon-area conductivityEC"></div>' +
                        '<div class="name-area pull-left">Cường độ ánh sáng</div>' +
                        '<div class="status-area light pull-left">' + data[i].sensorValue.light.toFixed(1) + '</div>' +
                        '<div class="unit-area pull-left">lux</div>' +
                        '</li>'+

                        '<div class="footer-area">' +
                            '<a href="#" class="control-area" data-gatewayID="'+gateId+'" data-id="'+data[i].id+'" data-name="'+data[i].name+'"><span> Tưới bằng tay </span></a>' +
                        '</div>' +
                    '</ul>' +
                    '</div>' +
                    '</div>';
            }
            homeView.dataArea = data_areas;
            homeView.owlClass.html(html);
            homeView.apiSliderOWL();

            // set DOm
            homeView.buttonAreaControl = $('.control-area');
            homeView.itemArea = $('.item-area');
            dfd.resolve('Done');
        } else {
            homeView.areaWapper.addClass(homeView.CLASS.NOT_DATA);
            dfd.resolve('Done');
        }

        return dfd.promise();

    },

    /*
     * Method call API slider owl
     * retrun object
     */
    apiSliderOWL: function () {
        // check position area when back form screen createKV
        var dataScreen = storageManager.get(constants.AREA_EDIT_KEY);
        var start = 0;
        if(dataScreen){
            start = dataScreen.index;
            storageManager.delete(constants.AREA_EDIT_KEY);
        }
        homeView.owlClass.owlCarousel({
            loop: false,
            items: 1,
            nav: false,
            dots: true,
            startPosition: start,
            onRefreshed: function () {
                if($('.active').length === 0){
                    homeView.titleArea.text('Home');
                }else{
                    homeView.titleArea.text($('.active').find('.content-area').attr('data-namekv'));
                }

            },
            onDragged: function () {
                homeView.titleArea.text($('.active').find('.content-area').attr('data-namekv'));
            }
        });
    },

    /*
     * Method set height for item
     * @return height
     */
    setHeightItem: function () {
        var heightContent = homeView.pageContent.innerHeight() - 90;
        var areaHeight = homeView.itemArea.innerHeight();
        if( areaHeight >= heightContent ){
            var heightItem = 195 - ( areaHeight - heightContent );
            homeView.itemArea.find('.background-cameras').height(heightItem);
        }
    },

    /*
     * Method show popup more
     * @return html
     */
    handlerPopupMore: function (ev) {
        ev.preventDefault();
        if(homeView.popupMore.hasClass(homeView.CLASS.POPUP_OPEN)){
            homeView.popupMore.removeClass(homeView.CLASS.POPUP_OPEN);
        }else{
            homeView.popupMore.addClass(homeView.CLASS.POPUP_OPEN);
        }

    },

    /*
     * Method handler button remove
     * @return ''
     */
    handlerRemoveArea: function () {
        var indexArea = $('.owl-item.active').index();
        homeView.owlClass.trigger('remove.owl.carousel', indexArea).trigger('refresh.owl.carousel');
    }

};
