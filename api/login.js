const Axios = require("axios")

module.exports = async (req, res) => {
    if(!req.query.code){
        res.status(500).json({
            error : "no code provided"
        }).end()
    }
    const data = {
        client_id : process.env.client_id,
        client_secret : process.env.client_secret,
        code : req.query.code 
    }
    const response = await Axios.post('https://github.com/login/oauth/access_token',data,{
        headers: {  'Accept': 'application/json'  }
    })
    if(response.data.error) res.json({error:response.data.error_description})
    res.json(response.data.access_token)
}
