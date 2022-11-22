const {Pool} = require('pg')

const pool = new Pool({
    connectionString: "postgres://yhcguuatoyftgj:991d5c2be59158c36b01ed64a9f7aa87595f78b71798904b2913801b310ea296@ec2-44-193-178-122.compute-1.amazonaws.com:5432/d1sl910qjrnfs7",
    ssl:{
        rejectUnauthorized: false
    }
})

module.exports = {
    pool 
} 