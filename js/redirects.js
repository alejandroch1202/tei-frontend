const login = "https://auth.tei.com.ve/login?client_id=7g3i7fpuuotl1d7jjevu29pilq&response_type=token&scope=email+https://tei.logo.actions/logo.off+https://tei.logo.actions/logo.on+openid+https://tei.logo.actions/login&redirect_uri=https://www.tei.com.ve/redirecting"

// Funtion to redirect to the LOGIN page
function redirectToLogin() {
  window.location.href = login;
}
