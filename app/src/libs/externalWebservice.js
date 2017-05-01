/**
 * Created by NB on 5/1/2017.
 */

import config from '../config';

export async function invokeGithubApi(
  {
    path,
    queries,
    method = 'GET',
    body
  }, userToken) {

  const domain = "https://api.github.com/";

  var esc = encodeURIComponent;
  var finalQueries = Object.keys(queries)
    .map(k => esc(k) + '=' + esc(queries[k]))
    .join('&');

  const url = domain + path + '?' + finalQueries;

  const headers = {
    Authorization: 'token ' + config.github.token,
    Accept: 'application/vnd.github.v3+json',
  };

  body = (body) ? JSON.stringify(body) : body;

  const results = await fetch(url, {method, body, headers})
    .then(function(res) {return res.json();})
    .then(function(data) {return data.items});

  return results;
}