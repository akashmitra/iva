const logger = require('../config/log');

module.exports ={
  serverError:(exception, agent)=>{
    console.log(exception);
    logger.trace(exception);
    agent.add('Oops! There is a glitch in server. Could you please try again later?');
  }
};