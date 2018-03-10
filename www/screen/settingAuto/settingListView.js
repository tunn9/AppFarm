/**
 * MarkReportView Class
 * @author FPT Software
 */

var settingListView = {

    // CONSTANTS
    //
    TAG: 'settingListView',

    pageID: null,
    buttonBack: null,
    buttonCheckAll: null,
    buttonCheck: null,
    buttonRemove: null,
    buttonAddNew: null,

    headerID: null,
    headerSetting: null,
    settingsContent: null,
    footerID: null,

    // METHODS
    //
    initialize: function () {
        this.pageID = $('#iot-listsettings');

        this.buttonBack = $('#iot-back-listst');
        this.buttonCheckAll = $('#iot-check-all');
        this.buttonRemove = $('#remove-settings');
        this.buttonAddNew = $('#addnew-setting');

        this.headerID = $('#iot-header-listsetting');
        this.headerSetting = $('#listsetting-header');
        this.settingsContent = $('#ioi-list-settings-content');
        this.footerID = $('#listsetting-footer');

    },

    /*
     * Method set Dom default
     * @return: null
     */
    destroy: function () {


    },

    bindDataListSettings: function (data) {
        var dfd = $.Deferred();
        var i = 0;
        var html = '';
        if (Array.isArray(data)) {

            for (i; i < data.length; i++) {
                var mychecked = 'checked';
                if(data[i].enable === 0){
                    mychecked = '';
                }
                html += '<li data-id="'+data[i].id+'" data-area="'+data[i].nameArea+'" data-setting="'+data[i].nameSetting+'">'+
                            '<div class="setting-name setting-name-control">'+data[i].nameSetting+'</div>'+
                            '<div class="setting-area setting-name-control">'+data[i].nameArea+'</div>'+
                            '<div class="setting-status text-right">'+
                                '<span class="iot-check iot-check-list" data-id="'+data[i].id+'"></span>'+
                                '<div class="ioi-device-status">'+
                                    '<div class="onoffswitch">'+
                                        '<input data-role="none" type="checkbox" name="onoffswitch" data-id="3" data-name="output 3" class="onoffswitch-checkbox" '+mychecked+'>'+
                                        '<div class="onoffswitch-action"></div>'+
                                        '<span class="onoffswitch-switch"></span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</li>';
            }

            settingListView.settingsContent.html(html);

            // set DOm
            this.buttonCheck = $('.iot-check');
            this.buttonCheckList = $('.iot-check-list');

            dfd.resolve('Done');
        } else {
            dfd.resolve('Done');
        }

        return dfd.promise();
    },
    updateCheckbox: function (flag, elm) {
        if(flag){
            elm.removeClass('iot-check-active');
        }else{
            elm.addClass('iot-check-active');
        }
    },
    updateCheckboxAll: function (flag) {
        if(flag){
            settingListView.buttonCheckList.removeClass('iot-check-active');
        }else{
            settingListView.buttonCheckList.addClass('iot-check-active');
        }
    },
    /*
    * Remove element active
    *
    */
    handlerRemoveSettings: function () {
        $('.iot-check-active').each(function () {
            $(this).closest('li').remove();
        });

    },
    setHeightList: function () {
        var heightWd = $(window).innerHeight();
        var headerHeight =  settingListView.headerID.innerHeight();
        var heightSettings = settingListView.headerSetting.innerHeight();
        var heightFooter = settingListView.footerID.innerHeight();

        var heightContent = heightWd - ( headerHeight + heightSettings + heightFooter );
        this.settingsContent.height(heightContent);
    }

}; // End Class