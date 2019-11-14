const util = require('../util/util');
const errorUtil = require('../util/errorUtil');
const exitService = require('../services/exit.service');

module.exports ={
  exit:(agent)=>{
    try{
      var buildResponse=util.buildResponse;
      return new Promise((resolve, reject) => {
        exitService.exit(agent,buildResponse,resolve);
      });
    }
    catch(exception){
      errorUtil.serverError(exception, agent);
    }
  }
};