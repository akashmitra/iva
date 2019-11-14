const Message = require('../models/message');
const CacheUtil = require('../util/cacheUtil');
const Util = require('../util/util');

const keyPrefix='MSG_';

module.exports ={
  
  addMessage:(callback)=>{
    console.info('Adding new message to DB..');
    const message = new Message({
      key:callback.data.key,
      content:callback.data.content
    });
    message.save(function(err) {
      if (err){
        callback.method.error(err);
      }
      else{
        callback.method.success();
      }
    });
  },
  
  getMessage:(callback)=>{
    const cacheKey=`${keyPrefix}${callback.data.key}`;
    // Fetch message from cache
    const message=CacheUtil.get(cacheKey);
    if(!Util.isEmpty(message)){
      callback.method.success(message);
      return;
    }
    
    console.info('Fetching message from DB..');
    Message.findOne({ key: callback.data.key }, function(err, message) {
      if (err){
        callback.method.error(err);
      }
      else{
        // Store message to cache
        CacheUtil.set(cacheKey, message.content);
        
        callback.method.success(message.content);
      }
    });
  }
};