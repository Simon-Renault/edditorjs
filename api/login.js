const Axios = require("axios")

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another option
    // res.setHeader('Access-Control-Allow-Origin', req.header.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
}

const handler = (req, res) => {

    if(!req.query.code){
        res.status(500).json({
            error : "no code provided"
        }).end()
    }

    const data = {
        client_id : process.env,
        client_secret : process.env,
        code : req.query.code 
    }

    res.json(data)

    try{
        const response = await Axios.post('https://github.com/login/oauth/access_token',data,{
            headers: {  'Accept': 'application/json'  }
        })
    
        if(response.data.error) res.json({error:response.data.error_description})
        res.json(response.data.access_token)
    }catch(e){
        res.json(e)
    }
}


module.exports = allowCors(handler)




