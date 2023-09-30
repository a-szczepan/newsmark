const axios = require('axios');
const qs = require('qs');
const jwt = require('jsonwebtoken')
const {createUserWithGoogle, getUserByGoogleId} = require('./userController');

const getGoogleOAuthTokens = async ({code}) => {
    const url = 'https://oauth2.googleapis.com/token'
    const values = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_KEY,
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
        grant_type: 'authorization_code'
    }

    try {
        const res = await axios.post(url, qs.stringify(values), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
        })
        return res.data
    } catch (error) {
        console.log(error, 'failed google auth')
    }
 }

 const getGoogleUser = async({id_token,access_token}) => {
    try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        })
        return res.data
    } catch (e) {
        console.log("Cannot get Google User: ", e)
    }
 }

 exports.googleOAuthHandler = async (req, res) => {
    const code = req.query.code // as string
    
    try {
        const { id_token, access_token } = await getGoogleOAuthTokens({code})
        //const googleUser = jwt.decode(id_token)
        const {id, email} = await getGoogleUser({id_token,access_token})
        const user = await getUserByGoogleId(id)
            
        if(!user) {
            createUserWithGoogle(email, id, res)
         } else {
                // ? utworzenie sesji, na koniec wywalić poza ifa
                console.log("Recieved user", user)
        }
        
    } catch(e) {
        console.log(e)
    }
    
    
    // return res.status(200).json({session});
 }

