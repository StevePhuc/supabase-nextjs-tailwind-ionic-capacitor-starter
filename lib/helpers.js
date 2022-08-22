//@supabase/gotrue-js/dist/main/GoTrueClient.js
export function getParameterByName(name, url) {
  if (!url) url = window?.location?.href || '';
  // eslint-disable-next-line no-useless-escape
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&#]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//@supabase/gotrue-js/dist/main/GoTrueClient.js
export function getSessionFromUrl(url) {
  const provider_token = getParameterByName('provider_token', url);
  const access_token = getParameterByName('access_token', url);
  const expires_in = getParameterByName('expires_in', url);
  const refresh_token = getParameterByName('refresh_token', url);
  const token_type = getParameterByName('token_type', url);

  const timeNow = Math.round(Date.now() / 1000);
  const expires_at = timeNow + parseInt(expires_in);

  // const { data, error } = await this.getUser(access_token)
  const session = {
    provider_token,
    access_token,
    expires_in: parseInt(expires_in),
    expires_at,
    refresh_token,
    token_type,
    user: {},
  };

  return session;
}
