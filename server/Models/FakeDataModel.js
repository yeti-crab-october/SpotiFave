const { Pool } = require('pg');

const PG_URI = 'postgres://zjhleejq:uqMQE-HyIQpLsaKbVZr_0OZDE9tbcIeZ@kashin.db.elephantsql.com/zjhleejq';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};

