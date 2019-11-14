const NodeCache = require( "node-cache" );
const cacheManager = new NodeCache({
  stdTTL: global.gConfig.cache_stdTTL,
  checkperiod: global.gConfig.cache_checkperiod
});

/* Ref: https://www.npmjs.com/package/node-cache

stdTTL: (default: 0) the standard ttl as number in seconds for every generated cache element. 0 = unlimited

checkperiod: (default: 600) The period in seconds, as a number, used for the automatic delete check interval. 0 = no periodic check.

errorOnMissing: (default: false) en/disable throwing or passing an error to the callback if attempting to .get a missing or expired value.

useClones: (default: true) en/disable cloning of variables. If true you'll get a copy of the cached variable. If false you'll save and get just the reference. Note: true is recommended, because it'll behave like a server-based caching. You should set false if you want to save mutable objects or other complex types with mutability involved and wanted. Here's a simple code example showing the different behavior

deleteOnExpire: (default: true) whether variables will be deleted automatically when they expire. If true the variable will be deleted. If false the variable will remain. You are encouraged to handle the variable upon the event expired by yourself.
*/

module.exports = {
  /*
    @desc: Gets a saved value from the cache. (Synchronous)
    @key: The key
    @return: Returns a undefined if not found or expired. If the value was found it returns the value.
  */
  get:(key)=>{
    console.info(`Fetching ${key} from cache..`);
    return cacheManager.get(key);
  },
  
  /*
    @desc: Sets a key value pair. (Synchronous)
    @key: The key
    @value: The value
    @return: Returns true on success.
  */
  set:(key, value)=>{
    console.info(`Storing ${key} to cache..`);
    const result=cacheManager.set( key, value );
    if(result)
      console.info(`Stored ${key} to cache successfully`);
    else
      console.error(`Failed to store ${key} to cache`);
    return result;
  }
};