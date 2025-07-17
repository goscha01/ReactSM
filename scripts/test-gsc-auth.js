const { google } = require('googleapis');

async function testAuth() {
  const auth = new google.auth.GoogleAuth({
    keyFile: './credentials/mystampmaker-0c5aa95c49ae.json',
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth });
  const sites = await searchconsole.sites.list({});
  console.log(sites.data.siteEntry);
}

testAuth();
