import mongoose from 'mongoose';


const clientOptions = {
    useNewUrlParser     : true,
    useUnifiedTopology  : true,
    useFindAndModify    : false,
    dbName              : 'name-db'
};

exports.initClientDbConnection = async () => {
    mongoose.set('useCreateIndex', true);
    try {
        var client = await mongoose.connect("db-string-mongo", clientOptions)
        mongoose.Promise = global.Promise;
        mongoose.connection;
        console.log('Connected to Mongodb Database');
        console.log('NAME-DB:\t----- %s', client.connections[0].name);
        console.log('URL-DB:\t----- %s', client.connections[0].host);
        console.log('USER-DB:\t----- %s',client.connections[0].user);
    } catch (error) {
        console.log(error);
        throw error;
    }
}