const alexaSDK = require('alexa-sdk');
const awsSDK = require('aws-sdk');
const promisify = require('es6-promisify');

const appId = '*YOUR APP ID HERE*'; // substitute your own AppId
const docClient = new awsSDK.DynamoDB.DocumentClient();

// convert callback style functions to promises
const dbScan = promisify(docClient.scan, docClient);
const dbGet = promisify(docClient.get, docClient);
const dbPut = promisify(docClient.put, docClient);
const dbDelete = promisify(docClient.delete, docClient);

const instructions = `Welcome to Elder Care<break strength="medium" /> 
                      You can ask Elder Care to give you the latest information about your vitals. Try saying get pulse.`

const request = require('request');
var https = require('https');

const handlers = {

    // Triggered when the user says "Alexa, open Elder Care."
    'LaunchRequest'() {
        this.emit(':ask', instructions);
    },

    'GetHealthInfoIntent'() {
        const { slots } = this.event.request.intent;
        const { userId } = this.event.session.user;
        
        // prompt for slot data if needed
        if (!slots.Vital.value) {
            const slotToElicit = 'Vital';
            const speechOutput = 'What vital would you like to hear about?';
            const repromptSpeech = 'Please tell me the name of the vital.';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        
        const vitalName = slots.Vital.value;
        const dynamoParams = {
            TableName: 'vitalsTable',
            Key: {
                Name: vitalName
            }
        };

        console.log('Attempting to read data');

        // query DynamoDB
        dbGet(dynamoParams)
            .then(data => {
                // console.log('Get item succeeded', data);

                const vital = data.Item;

                if (vital) {
                    var response = `${vital.VitalInformation}`;
                    this.emit(':tell', response);
                }
                else {
                    this.emit(':tell', `${vitalName} not found!`);
                }
            })
            .catch(err => console.error(err));
    },

    'Unhandled'() {
        console.error('problem', this.event);
        this.emit(':ask', 'An unhandled problem occurred!');
    },

    'AMAZON.HelpIntent'() {
        const speechOutput = instructions;
        const reprompt = instructions;
        this.emit(':ask', speechOutput, reprompt);
    },

    'AMAZON.CancelIntent'() {
        this.emit(':tell', 'Goodbye!');
    },

    'AMAZON.StopIntent'() {
        this.emit(':tell', 'Goodbye!');
    }
};

exports.handler = function handler(event, context) {
    const alexa = alexaSDK.handler(event, context);
    alexa.APP_ID = appId;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
