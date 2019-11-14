const mongoose = require('mongoose');

module.exports =function(){
    const db_url=global.gConfig.db_url;
    console.info('Connecting DB...');
    mongoose.connect(db_url);
    console.info('DB connected...');

    mongoose.connection.on('connected', function(){
        console.log(`Mongoose default connection is open to ${db_url}`);
    });

    mongoose.connection.on('error', function(err){
        console.error("Mongoose default connection has occured error", err);
    });

    mongoose.connection.on('disconnected', function(){
        console.log("Mongoose default connection is disconnected");
    });

    // Process End Event
    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log("Mongoose default connection is disconnected due to application termination");
            process.exit(0);
        });
    });
}