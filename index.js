const express = require('express')
const app = express()
const axios = require('axios')

// The client ID and client secret that received during the registration
const clientID = 'Iv1.3fc57417c2ccb3ee'
const clientSecret = 'a29e9f705e6a6b25c730b184a0de3d2143ab0ed1'


// Defining the redirect route
app.get('/home', (req, res) => {

  const Token = req.query.code
  
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${Token}`,
    
    headers: {
         accept: 'application/json'
    }
    
  }).then((response) => {
    
    const accessToken = response.data.access_token
    console.log(response.data)
    
    // redirect the user to the home page, along with the access token
    res.redirect(`/home.html?access_token=${accessToken}`)
  })
})

app.use(express.static(__dirname + '/public'))
app.listen(4000,()=>{
    console.log("listening on port : 4000")
})