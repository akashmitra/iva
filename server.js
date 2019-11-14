(function () {
  'use strict';

  // Config variables
  const config = require('./config/config');

  // Require packages
  const express = require('express');
  const path = require('path');
  const bodyParser = require('body-parser');
  const http = require('http');
  const { WebhookClient } = require('dialogflow-fulfillment');
  const { Carousel, Image } = require('actions-on-google');

  // Utilities
  const logger = require('./config/log');
  const util = require('./util/util');
  const dbConnectUtil = require('./util/dbConnectUtil');

  // Intents
  const welcome_intent = require('./intents/welcome.intent');
  const fallback_intent = require('./intents/fallback.intent');
  const exit_intent = require('./intents/exit.intent');

  // Services
  const messageService = require('./services/messageService');


  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  dbConnectUtil();

  app.post('/', (request, response) => {
    //console.log(request);
    const agent = new WebhookClient({ request: request, response: response });
    logger.trace('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    logger.trace('Dialogflow Request body: ' + JSON.stringify(request.body));
    console.log(agent);
    console.log(`Intent: ${agent.intent}`);
    var buildResponse = util.buildResponse;

    // Dialogflow intent Function Mapping
    let intentMap = new Map();
    intentMap.set('DefaultWelcomeIntent', welcome_intent.welcome);
    intentMap.set('DefaultFallbackIntent', fallback_intent.fallback);
    intentMap.set('Exit', exit_intent.exit);

    agent.handleRequest(intentMap);
  });


  // Creating a server at port
  http.createServer(app).listen(global.gConfig.node_port, () => {
    logger.trace(`${global.gConfig.app_name} started on port ${global.gConfig.node_port}`);
    console.info(`${global.gConfig.app_name} started on port ${global.gConfig.node_port}`);
  });


  // Test APIs
  app.get('/', (request, response) => {
    //response.send(`${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`);
    response.sendFile(path.join(__dirname + '/views/message.html'));
    console.info(`Get hit!`);
  });
  
  app.get('/message', (request, response) => {
    response.sendFile(path.join(__dirname + '/views/message.html'));
  });


  app.post('/createMessage', (request, response) => {
    if (request.body.key === undefined || request.body.content === undefined) {
      response.send('Error: Required parameters are empty!');
      return;
    }
    const callback = {
      data: {
        key: request.body.key,
        content: request.body.content,
        response
      },
      method: {
        success: () => {
          callback.data.response.send('Message saved successfully!');
        },
        error: (err) => {
          callback.data.response.send(err);
          console.error(err);
        }
      }
    };
    messageService.addMessage(callback);
  });


  app.get('/getMessage', (request, response) => {
    if (request.query.key === undefined) {
      response.send('Error: Required parameters are empty!');
      return;
    }
    const callback = {
      data: {
        key: request.query.key,
        response,
        interpolateMessage: util.interpolateMessage
      },
      method: {
        success: (content) => {
          const result = callback.data.interpolateMessage(JSON.stringify(content), { fname: 'Sas' });
          callback.data.response.send(result);
        },
        error: (err) => {
          callback.data.response.send(err);
          console.error(err);
        }
      }
    };
    messageService.getMessage(callback);
    
  });

}());
