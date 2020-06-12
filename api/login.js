const Axios = require("axios")

module.exports =  (req, res) => {

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






