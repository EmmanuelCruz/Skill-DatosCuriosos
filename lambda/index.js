/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const datosCuriosos = require('./facts')

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = `Bienvenido, puedes decir, dame un dato curioso. <audio src="soundbank://soundlibrary/animals/amzn_sfx_cat_angry_screech_1x_01" />`;
        
        console.log("Se ejecutó la linea de bienvenida correctamente");

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// const HelloWorldIntentHandler = {
//     canHandle(handlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
//             && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
//     },
//     handle(handlerInput) {
//         const speakOutput = 'Hello World!';

//         return handlerInput.responseBuilder
//             .speak(speakOutput)
//             //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
//             .getResponse();
//     }
// };

const DatoCuriosoAudioIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DatoCuriosoAudioIntent';
    },
    handle(handlerInput) {
        const indiceAleatorio = Math.floor(Math.random() * datosCuriosos.length)
        
        const speakOutput = datosCuriosos[indiceAleatorio].dato;

        return handlerInput.responseBuilder
            .speak()
            .addDirective({
              "type": "Alexa.Presentation.APLA.RenderDocument",
              "token": "developer-provided-string",
              "document": {
                "version": "0.91",
                "type": "APLA",
                "mainTemplate": {
                    "parameters": [
                        "payload"
                    ],
                    "item": {
                        "type": "Mixer",
                        "description": "This sample mixes text-to-speech (TTS) with a background audio clip. Filters are used to fade in the audio and lower the volume.",
                        "items": [
                            {
                                "type": "Speech",
                                "contentType": "SSML",
                                "content": "<speak><amazon:effect name=\"whispered\">"+speakOutput+"</amazon:effect> <audio src=\"soundbank://soundlibrary/animals/amzn_sfx_cat_angry_screech_1x_01\" /></speak> "
                            },
                            // {
                            //     "type": "Speech",
                            //     "content": speakOutput
                            // },
                            {
                                "type": "Audio",
                                "source": "https://alexasource.s3.us-east-2.amazonaws.com/cinematic.mp3",
                                "filters": [
                                    {
                                        "type": "Volume",
                                        "amount": "20%"
                                    },
                                    {
                                        "type": "FadeIn",
                                        "duration": 1000
                                    }
                                ]
                            }
                        ]
                    }
                }
              },
              "datasources": {
                "user": {
                  "name": "John"
                }
              }
  
            })
            .reprompt(speakOutput)
            .getResponse();
    }
};

const DatoCuriosoAleatorioIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DatoCuriosoAleatorioIntent';
    },
    handle(handlerInput) {
        const indiceAleatorio = Math.floor(Math.random() * datosCuriosos.length)
        
        const speakOutput = datosCuriosos[indiceAleatorio].dato;
        
        console.log("Se dio un dato curioso aleatorio correctamente");

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
    }
};

const DatoCuriosoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DatoCuriosoIntent';
    },
    handle(handlerInput) {
        const tipo = handlerInput.requestEnvelope.request.intent.slots.tipo.value;
        let speakOutput = `Has elegido la categoría ${tipo}. `;
        
        const seccion = [];
        
        datosCuriosos.forEach(hecho => {
            if(hecho.tipo.toLowerCase() === tipo.toLowerCase()){
                seccion.push(hecho);
            }
        });
        
        console.log("Se dio un dato curioso de una categoría correctamente");
        
        const indiceAleatorio = Math.floor(Math.random() * seccion.length);
        speakOutput += seccion[indiceAleatorio].dato;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
    }
};

const DatoSusurradoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DatoSusurradoIntent';
    },
    handle(handlerInput) {
        const indiceAleatorio = Math.floor(Math.random() * datosCuriosos.length)
        
        const speakOutput = `<amazon:effect name="whispered">${datosCuriosos[indiceAleatorio].dato}</amazon:effect>`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Puedes solicitar un dato curioso diciendo, dame un dato curioso';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Hasta luego, espero vuelvas pronto.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'No entendí tu solicitud, intenta de nuevo diciendo, dame un dato curioso.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Ocurrió un error. Intenta nuevamente.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        DatoCuriosoAleatorioIntentHandler,
        DatoCuriosoIntentHandler,
        DatoSusurradoIntentHandler,
        DatoCuriosoAudioIntentHandler,
        // HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();