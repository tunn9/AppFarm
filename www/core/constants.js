/**
 * CONSTANTS Static Class
 * Manage global members, objects need to pass cross html pages.
 * This class auto register at bootime of application
 * @author FPT Software
 */
var constants = {

    // CONSTANTS
    TAG: 'constants',

    LOGIN_HEIGHT: 0,

    BOOLEAN: {
        TRUE: true,
        FALSE: false
    },
    // PROPERTIES
    HTTP_STATUS_CODES: {
        SUCCESS_CODE: 200,
        BAD_REQUEST: "400",
        NOT_FOUND: "404",
        REQUEST_TIME_OUT: "408",
        INTERNAL_SERVER_ERROR: "500",
        INVALID_PARAMETER_ERROR: "9002",
        TOKEN_INVALID: "9003",
        NO_INTERNET: "405"
    },
    LOGIN: {
        USERNAME: 'USERNAME',
        PASSWORD: 'PASSWORD',
        LOGGED_IN_KEY: 'LOGGED_IN_KEY',
        DATA_LOGIN: "DATA_LOGIN"
    },
    USER: {
        SUPPORT_PAGE: 'SUPPORT_PAGE'
    },
    DATA_MANUAL: 'DATA_MANUAL',
    DATA_AREA: 'DATA_AREA',

    AREA_EDIT_KEY: 'AREA_EDIT_KEY',

    AUTO_EDIT_KEY: 'AUTO_EDIT_KEY',

    DEVICE_ID: 'DEVICE_ID'

}; // End Class
