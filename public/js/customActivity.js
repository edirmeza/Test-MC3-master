define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext', save);
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');

    }

    function initialize(data) {
        console.log(data);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log(inArguments);

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                
              
            });
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function save() {
        var postcardURLValue = $('#postcard-url').val();
        var postcardTextValue = $('#postcard-text').val();

        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "eventCode": "sendJourneyBuilderIntent",
                "eventSourceId": "MarketingCloud",
                "countryId": "{{Contact.Attribute.\"KAVAK_Demo\".\"CountryId\"}}",
                "eventData": {
                  "type": "confirmAppointment",
                  "chatPlatform": "whatsapp",
                  "customerPhoneNumber": "{{Contact.Attribute.\"KAVAK_Demo\".\"PhoneNumber\"}}",
                  "intent": "confirm_citageneral",
                  "params": {
                    "opp_venta": "{{Contact.Attribute.\"KAVAK_Demo\".\"OppVenta\"}}",
                    "primerNombre": "{{Contact.Attribute.\"KAVAK_Demo\".\"PrimerNombre\"}}",
                    "diaCita": "{{Contact.Attribute.\"KAVAK_Demo\".\"DiaCita\"}}",
                    "HoraPMAM": "{{Contact.Attribute.\"KAVAK_Demo\".\"HoraCita\"}}",
                    "CentroHUB": "{{Contact.Attribute.\"KAVAK_Demo\".\"CentroHUB\"}}",
                    "referenciaDireccion": "{{Contact.Attribute.\"KAVAK_Demo\".\"ReferenciaDir\"}}",
                    "direccion": "{{Contact.Attribute.\"KAVAK_Demo\".\"Dir\"}}",
                    "Auto": "{{Contact.Attribute.\"KAVAK_Demo\".\"Auto\"}}"
                  }
                }
        }];
        payload['arguments'].execute.url = "https://kavak-ca-confirmappointment.herokuapp.com/execute";
        payload['schema'].arguments.execute.inArguments = [
            {
                "eventCode": {
                    "dataType": "Text",
                    "isNullable": false,
                    "direction": "in"
                },
                "eventSourceId": {
                    "dataType": "Text",
                    "isNullable": false,
                    "direction": "in"
                },
                "countryId": {
                    "dataType": "Integer",
                    "isNullable": false,
                    "direction": "in"
                },
                "eventData": {
                    "type": {
                        "dataType": "Text",
                        "isNullable": false,
                        "direction": "in"
                    },
                    "chatPlatform": {
                        "dataType": "Text",
                        "isNullable": false,
                        "direction": "in"
                    },
                    "customerPhoneNumber": {
                        "dataType": "Text",
                        "isNullable": false,
                        "direction": "in"
                    },
                    "intent": {
                        "dataType": "Text",
                        "isNullable": false,
                        "direction": "in"
                    },
                    "params": {
                        "opp_venta": {
                            "dataType": "Text",
                            "isNullable": false,
                            "direction": "in"
                        },
                        "primerNombre": {
                            "dataType": "Text",
                            "isNullable": false,
                            "direction": "in"
                        },
                        "diaCita": {
                            "dataType": "Date",
                            "isNullable": false,
                            "direction": "in"
                        },
                        "HoraPMAM": {
                            "dataType": "Text",
                            "isNullable": false,
                            "direction": "in"
                        },
                        "CentroHUB": {
                            "dataType": "Text",
                            "isNullable": false,
                            "direction": "in"
                        },
                        "referenciaDireccion": {
                            "dataType": "Text",
                            "isNullable": false,
                            "direction": "in"
                        },
                        "direccion": {
                            "dataType": "Text",
                            "isNullable": false,
                            "direction": "in"
                        },
                        "Auto": {
                            "dataType": "Text",
                            "isNullable": false,
                            "direction": "in"
                        }
                    }
                }
            }
        ];
        payload['schema'].arguments.execute.outArguments = [];
        payload['configurationArguments'].publish.url = "https://kavak-ca-confirmappointment.herokuapp.com/publish";
        payload['configurationArguments'].save.url = "https://kavak-ca-confirmappointment.herokuapp.com/save";
        payload['configurationArguments'].stop.url = "https://kavak-ca-confirmappointment.herokuapp.com/stop";
        payload['configurationArguments'].validate.url = "https://kavak-ca-confirmappointment.herokuapp.com/validate";
        payload['metaData'].isConfigured = true;

        console.log(payload);
        console.log("Saving config to heroku");
        connection.trigger('updateActivity', payload);
    }


});
