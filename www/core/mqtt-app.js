

var mqttApp = {

    status: null,
    conntectServer: null,
    client: null,
    subbeTopic: 'smartFarm/865209031922876/STATUS',
    pubTopic: 'smartFarm/865209031922876/CONTROL',

    /*
    * Method connect
    *
    */
    connect: function (data) {
        // var dataHost = storageManager.getLocalStorage('mqtt_hostdata');
        // var hostID = '42.115.233.116';
        // var portID = '8083';
        // var userName = 'iot';
        // var passWord = '123Abc';
        // if(dataHost){
        //     hostID = dataHost.host || hostID;
        //     portID = dataHost.port || portID;
        //     userName = dataHost.username || userName;
        //     passWord = dataHost.password || passWord;
        // }
        mqttApp.client = new Paho.MQTT.Client("27.72.145.192", 31883, '/mqtt', 'clientId-' + parseInt(Math.random() * 1000, 10));
        mqttApp.client.connect({
            timeout: 10,
            userName:'iot',
            password:'ttcnttcn',
            reconnect: true,
            onSuccess: function () {
                debug.log('onSuccess');
                mqttApp.conntectServer = true;
                for(var i in data){
                    if(data.hasOwnProperty(i)){
                       mqttApp.subscribeTopic(data[i].gatewayID);
                    }
                }
                // mqttApp.subscribeTopic('12345');
            },
            onFailure: function () {
                debug.log('onFailure');
                mqttApp.conntectServer = false;
                // sidebarPanel.handlerLogout();
            }
        });

        //Gets  called if the websocket/mqtt connection gets disconnected for any reason
        mqttApp.client.onConnectionLost = function (responseObject) {
            debug.log('Connect lost');
            mqttApp.conntectServer = false;
            $('.ioi-list-device-content').removeClass('lock-dom-auto');
            debug.log(responseObject);
        };

        //Gets websocket/mqtt connection onMessageArrived
        mqttApp.client.onMessageArrived = function (message) {
            try {
                // remove Character null in string
                var validate = message.payloadString.replace(/\0/g, '');
                var data = JSON.parse(validate);
                // update Read time
                if(data.type == 2){
                    mqttApp.handlerConfirmManual(data);
                }else if(data.type == 1){
                    mqttApp.handlerRealTimeSensor(data);
                }else if(data.type == 3){
                    mqttApp.handlerConfirmAuto(data);
                }
            }catch (err){
                debug.log(err);
            }


        };
    },

    /*
    * Method subscribe topic
    * @return: Object
    *
    */
    subscribeTopic: function (gatewayID) {
        var topic = 'smartFarm/' + gatewayID + '/STATUS';
        console.log(topic);
        mqttApp.client.subscribe(topic, {qos: 0});
    },

    /*
     * Method subscribe topic
     * @return: Void
     */
    unsubscribeTopic: function (topic) {
        mqttApp.client.unsubscribe(topic);
    },

    /*
    * Method disconnect
    *
    */
    disConnect: function () {
        mqttApp.client.disconnect();
        mqttApp.client = null;
        mqttApp.conntectServer = null;
    },


    /*
    * Method: Handle response On/OFF device
    *
    */
    handlerConfirmManual: function (data) {
        console.log(data);
        var currentOutput = storageManager.get('currentManual');
        $('.ioi-device-status').removeClass('userActive');
        if(currentOutput === data.name) {
            var param = {
                title: '',
                msg: 'Tắt thiết bị thành công'
            };
            if(data.value == 1){
                param.msg = 'Bật thiết bị thành công';
            }else{
                $('.'+data.name).prop("checked", false);
            }

            $.Alert(param);
            storageManager.put('currentManual', null);
        }
    },

    /*
    * Method: Handle response setting Auto device
    *
    */
    handlerConfirmAuto: function (data) {
        debug.log('response Auto');
        var param = {
            title: '',
            msg: 'Cài đặt không thành công'
        };
        if(data.status == 1){
            param.msg = 'Cài đặt thành công';
         }
        $.Alert(param);
    },

    /*
     * Method: Handle response send sensor data
     * @Desc: handle update real time
     */
    handlerRealTimeSensor: function (sensor) {
        console.log(sensor);
        var elm = $('.'+sensor.sensorID);
        elm.find('.airTemp').text(sensor.airTemp.toFixed(1));
        elm.find('.airHum').text(sensor.airHum.toFixed(1));
        elm.find('.soilTemp').text(sensor.soilTemp.toFixed(1));
        elm.find('.soilHum').text(sensor.soilHum.toFixed(1));
        elm.find('.elecNeg').text(sensor.elecNeg.toFixed(1));
    }

};