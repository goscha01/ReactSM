const { google } = require("googleapis");


const KEYFILE = './credentials/mystampmaker-0c5aa95c49ae.json'; // update path if needed
const SITE_URL = "sc-domain:mystampmaker.com";

async function getTopGSCKeywords(daysBack = 7, limit = 25) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - daysBack);

  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILE,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });

  const searchconsole = google.searchconsole({
    version: "v1",
    auth: await auth.getClient(),
  });

  try {
    const res = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
        dimensions: ["query"],
        rowLimit: limit,
      },
    });

    // Return the keyword array
    return (res.data.rows || []).map(row => row.keys[0]);
  } catch (err) {
    console.error("Error fetching queries:", err.errors || err);
    return [];
  }
}

module.exports = getTopGSCKeywords;
