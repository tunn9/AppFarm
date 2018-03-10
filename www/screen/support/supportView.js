/**
 * Created by tunguyen on 12/16/2017.
 */
var supportView = {
    TAG: 'supportView',


    pageId: null,
    btnBack: null,

    /*
     * Method set Dom
     * @return: Dom
     */
    initialize: function () {
        this.btnBack = $('#ioi-back-support');


    },

    /*
     * Method set Dom default
     * @return: null
     */
    destroy: function () {
        this.btnBack = null;
    }

};
