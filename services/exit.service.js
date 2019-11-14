const { Carousel, Image, Suggestions } = require('actions-on-google');
const REQUEST = require('request');
const https = require('https');
const config = require('../config/config');
const util = require('../util/util');

module.exports ={
  exit:(agent,buildResponse,resolve)=> {
    REQUEST.get(global.gConfig.api_endpoint, function(error, response, body){
      const data=JSON.parse(body);
      let richConvList=[], convList=[];
      let fname=data.user.name.split(' ')[0];
      var exit_arr = [
        `It was great talking to you, have a good day ahead.`,
        `It was a pleasure helping you out, bye!`,
        `Thanks, have a good day ahead.`
      ];
      let msg = util.getRandomMessage(exit_arr);
      richConvList.push(msg);
      convList.push(msg);
      buildResponse(agent,richConvList,convList,true);
      resolve();
    })
    .on('error', function(err) {
      console.log(err);
    });
  }
}