/**
 * MarkReportController Class
 * @author FPT Software
 */

var historyController = {
    // CONSTANTS
    //
    TAG: 'historyController',

    /**
     * (Required)
     * Parent ID of page holder
     */
    PAGE_ID: 'page-history',

    // PROPERTIES
    //
     datas:[],
    labels: [],
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

                break;
            case eventHelper.PAGE_SHOW:
                this.doPageShow();
                break;
            default:
                break;
        }
    },
    doPageBeforeShow: function () {

    },

    doPageShow: function () {
        historyView.getCurrentDate();
        this.handlerAutoByTime();
        this.getListAreaLocal();
        this.handlerSelectArea();
        this.bindEventPage();


    },

    bindEventPage: function () {
      $('#iot-history-search').on(eventHelper.TAP, historyController.handlerSeachHistory);
      $('#iot-back-history').on(eventHelper.TAP, historyController.handlerHistoryBack);
    },
    coverDateUTC: function (date, time) {
        console.log(date +'   '+time);
        var myDate = new Date( date +" "+time); // Your timezone!
        var myEpoch = myDate.getTime();
        return myEpoch;
    },
    handlerSeachHistory: function () {
        var areaId = $('#iot-history-area-value').attr('data-id');
        var startTime = $('#iot-timeStart').text();
        var startDate = $('#iot-dateStart').text();
        var endTime = $('#iot-timeEnd').text();
        var endDate = $('#iot-dateEnd').text();

        var newStartDate = startDate[2] +'/'+ startDate[1]+'/'+ startDate[0];
        var newEndDate = endDate[2] +'/'+ endDate[1]+'/'+ endDate[0];
        var startUTC = historyController.coverDateUTC(startDate, startTime);
        var endUTC = historyController.coverDateUTC(endDate, endTime);
        var urlParam = {
            startTime: startUTC,
            endTime: endUTC,
            typeSearch: 0
        };
        console.log(urlParam);
        httpService.getHistory(urlParam, '', areaId).done(function (response) {
            console.log(response);
            historyView.bindingData(response.data).done(function () {

                var ctx = document.getElementById("myChart");
                ctx.style.display = 'block';
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: historyController.labels,
                        datasets: [{
                            label: $('#iot-history-sensor-value').text(),
                            data: historyController.datas,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0)'
                            ],
                            borderColor: [
                                'rgba(76,176,36,1)'
                            ],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true
                                }
                            }],
                            xAxes: [{
                                display: false
                            }]
                        }
                    }
                });
            });



        });
    },


    /*
     * Method get list Area from local
     *
     */
    getListAreaLocal: function () {
        var data = storageManager.get(constants.DATA_AREA);

        historyView.bingDataListArea(data).done(function () {
            historyView.setHeightContent();
            loadingPage.hide();
        })
    },

    /*
     * Method Select Area
     *
     */
    handlerSelectArea: function () {

        $('.iot-select-history').on(eventHelper.TAP,function (e) {
            e.preventDefault();
            e.stopPropagation();
            if($(this).hasClass('active')){
                $('.iot-condition').removeClass('active');
            }else{
                $('.iot-condition').removeClass('active');
                $(this).addClass('active');
            }

        });

        $('#iot-history-condition-area-name').on(eventHelper.TAP, 'li', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var elm = $(this);
            $('#iot-history-area-value').text(elm.text());
            $('#iot-history-area-value').attr('data-id',elm.attr('data-areaID'));
            $('.iot-condition').removeClass('active');
            $('.iot-condition-parent-sensor').removeClass('no-active');

        });

        $('#iot-history-sensor-select').on(eventHelper.TAP, 'li', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var elm = $(this);
            $('#iot-history-sensor-value').text(elm.text());
            $('#iot-history-sensor-value').attr('data-value',elm.attr('data-value'));
            $('.iot-condition').removeClass('active');
            $('.not-allow').removeClass('no-active');
        });


    },

    /*
     * Hanlder When user choose setting by time
     *
     */
    handlerAutoByTime: function () {
        $('#iot-timeStart, #iot-timeEnd').on(eventHelper.TAP,function (event) {
            event.preventDefault();
            var elm = $(this);
            $('#iot-datemobi').val(elm.text());
            historyController.handlerTimeMobileScroll();
            elm.addClass('active-mobi');
            $('.iot-theme-mobiscroll').addClass('eff-mobi');
        });

        $('#iot-dateStart, #iot-dateEnd').on(eventHelper.TAP,function (event) {
            event.preventDefault();
            var elm = $(this);
            $('#iot-datemobi').val(elm.text());
            historyController.handlerDateMobileScroll();
            elm.addClass('active-mobi');
            $('.iot-theme-mobiscroll').addClass('eff-mobi');
        });

        $('#iot-mobilescroll-complete').on(eventHelper.TAP,function (event) {
            event.preventDefault();
            var value = $('#iot-datemobi').val();

            $('.active-mobi').html(value);
            $('a').removeClass('active-mobi');
            $('.iot-theme-mobiscroll').addClass('eff-mobi-hide');
            setTimeout(function () {
                $('#iot-datemobi').mobiscroll('destroy');
                $('.iot-theme-mobiscroll').removeClass('eff-mobi-hide eff-mobi');
            },300);
        });
    },

    /*
     * Hanlde mobile scroll form
     *
     *
     */
    handlerTimeMobileScroll: function () {
        $('#iot-datemobi').mobiscroll().time({
            theme: 'iot-theme',     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: 'mixed',       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: 'inline', // Specify display mode like: display: 'bottom' or omit setting to use default
            timeFormat: 'HH:ii',
            timeWheels: 'HHii'
        });
    },

    /*
     * Hanlde mobile scroll form date
     *
     *
     */
    handlerDateMobileScroll: function () {
        $('#iot-datemobi').mobiscroll().date({
            theme: 'iot-theme',     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: 'mixed',       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: 'inline', // Specify display mode like: display: 'bottom' or omit setting to use defaul
            dateOrder: 'dd m yy',
            dateFormat: "dd/m/yy"
        });
    },
    handlerHistoryBack: function (event) {
        event.preventDefault();
        pageHelper.changePage(fileHelper.getUrl(pageUrl.HOME_PAGE), {transition: eventHelper.PAGE_TRANSITION.SLIDE, reverse: true});
    }
   
}; //End Class