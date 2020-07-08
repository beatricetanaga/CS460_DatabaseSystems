var Pool = require('pg').Pool;
var pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cs460',
    password: 'cs460',
    port: 5432
})

pool.connect((err, client, done) => {
    if (err) throw err
    console.log('connected')
  })

var runQuery = (request,response) => {
    console.log(request.body)
    pool.query(request.body.query,(err,results)=> {
        if (err) throw err
        console.log(results);
        response.jsonp(results);
    })
}

module.exports={
    runQuery
}