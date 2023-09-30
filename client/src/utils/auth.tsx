export const getGoogleOAuthURL = () => {
   const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
   const options = {
    redirect_uri: 'http://localhost:5000/api/sessions/oauth/google' as string, //TO ENV
    client_id: '864694712401-kc0gt2jefs65rmvjn001v1rfma9cfbke.apps.googleusercontent.com' as string, //TO ENV
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ].join(" ")
   }

   const qs = new URLSearchParams(options)

   console.log({qs})
   return `${rootUrl}?${qs.toString()}`
}

