var profilerView = {
    TAG: 'profilerView',


    CLASS: {
        NOT_DATA: 'not-data',
        POPUP_OPEN: 'iot-popup-open',
        ACTIVE: 'login-active'
    },

    pageId: null,
    btnBack: null,
    profilerList: null,

    /*
     * Method set Dom
     * @return: Dom
     */
    initialize: function () {
        this.pageId = $('#iot-profiler');
        this.btnBack = $('#ioi-back-profiler');
        this.profilerList = $('#iot-profiler-list');

    },
    bindDataProfiler: function (data) {
        console.log(data);
        var dfd = $.Deferred();
        var i = 0;
        var html = '';
        if (data) {
            $('#iot-profiler-list-name').text(data.name);
            $('#iot-profiler-list-phone').text(data.phoneNumber);
            $('#iot-profiler-list-email').text(data.email);
            $('#iot-profiler-list-city').text(data.city);
            $('#iot-profiler-list-district').text(data.district);
            $('#iot-profiler-list-address').text(data.ward);
            if(data.avatar){
                $('.iot-profiler-logo .logo').css({
                    'background-image': 'url('+httpService.dataServer+data.avatar+')',
                    'box-shadow': '0 0 10px 0 rgba(0,0,0,0.3)'
                });
            }
            dfd.resolve('Done');
        } else {
            dfd.resolve('Done');
        }
        return dfd.promise();
    },
    /*
     * Method set Dom default
     * @return: null
     */
    destroy: function () {
        this.btnBack = null;
    }

};
