const util = require('../util/util');
const errorUtil = require('../util/errorUtil');
const welcomeService = require('../services/welcome.service');

module.exports ={
  welcome:(agent)=>{
    try{
      var buildResponse=util.buildResponse;
      return new Promise((resolve, reject) => {
        welcomeService.welcome(agent,buildResponse,resolve);
      });
    }
    catch(exception){
      errorUtil.serverError(exception, agent);
    }
  }
};