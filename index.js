const {connect} = require('./database/init.js');

(async () => {
    console.log("start....");
    await connect();
})();
