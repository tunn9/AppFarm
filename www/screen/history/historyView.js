/**
 * MarkReportView Class
 * @author FPT Software
 */

var historyView = {

    // CONSTANTS
    //
    TAG: 'historyView',

    listAreaID: null,
    headerID: null,
    pageContent: null,

    // METHODS
    //
    initialize: function () {
        this.listAreaID = $('#iot-history-condition-area-name');
        this.headerID = $('#iot-history-header');
        this.pageContent = $('#iot-content-history');
    },

    /*
     * Method set Dom default
     * @return: null
     */
    destroy: function () {

    },

    /*
    * Method get current date
    *
    */
    getCurrentDate: function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        }

        if(mm<10) {
            mm = '0'+mm
        }

        today = mm + '/' + dd + '/' + yyyy;
      $('#iot-dateStart, #iot-dateEnd').text(today);
    },

    bindingData: function (data) {
        var dfd = $.Deferred();
        historyController.datas = [];
        historyController.labels = [];
        var senserValue = $('#iot-history-sensor-value').attr('data-value');
        if(data){
            for(var i = 0; i < data.length; i++ ){
                historyController.datas.push(data[i][senserValue]);
                var utcDate = data[i].utc;
                var converDate = new Date(utcDate);
                var date = converDate.getDate() +'/'+ (converDate.getMonth() + 1) +'/'+ converDate.getFullYear();
                historyController.labels.push(date);
            }
            dfd.resolve('Done');
        }else{
            dfd.resolve('Done');
        }

        return dfd.promise();
    },
    bingDataListArea: function (data) {
        var dfd = $.Deferred();
        var i = 0;
        var html = '';

        if(data){
            for(i; i < data.length; i++ ){
                html += '<li data-getway="'+data[i].gatewayID+'" data-nodeID="'+data[i].nodeID+'" data-areaID="'+data[i].areaID+'">'+data[i].nameArea+'</li>';
            }
            historyView.listAreaID.html(html);
            dfd.resolve('Done');
        }else{
            dfd.resolve('Done');
        }

        return dfd.promise();
    },

    setHeightContent: function () {
        var heightWindow = $(window).innerHeight();
        var heightHeader = historyView.headerID.innerHeight();
        var contentHeight = heightWindow - heightHeader;
        historyView.pageContent.height(contentHeight);
    }



}; // End Class