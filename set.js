const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'ANDBAD-BOT;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUVCOW11M3pueXc2TENEMUFVcjlMQ01NN0krdmhQTWhSaCtac3ZxTkNsVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK2JGejRlOU0vTWxsZ0p5UHJqSmJOZk5nRHAxOEU4M0dBcHl0NFh2QUFnWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHRGxublhodmkyQmRoWDd0VUlURWN0MW9GTkVIWkhHRnU4eWIxL2xSbzJnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzQmtmVm01Rm4xSUFab1pONEFRK2IzWTd3aENTVWVnbTU2NEl0V2NTNjBZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBQW85ZURDNm1lT2cyZkxJK3VPRHNOZGlPT0p1WE5HMGlHMnVtbDJ3bXM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFZK0xYaE1SWnRWWTcxRWU5d1dWZEZYSDllQU0wZlA0cE42Q09qMUR6Q009In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0VVQ1pqWW1DTmdOQWg0eFFrL0JVakNUOEliNE9MOStodXFPVy9GWmUxaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM1RrSXozcjY4Z3hVbTBNRkdRWHQxRkd5cTM1MUtZeFR4NzFjUGlFU2hWWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFweUhkUG5CTDA2WHUzUHZJeFhmbURnMXhsRlQzc2d6c0tBVzRnUCtJQ2U2ZW5EakhFUk41Tkt4MDBFSnZPOXlyTzliRWRRV2dKYVhwWVpjY1pQSUFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk0LCJhZHZTZWNyZXRLZXkiOiJJT3g4RlhXVjhaRkhYRFEzNFFUcFhtZFRhbThtalNLTHQwT3RKdGkzOXM0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJmTlU0YnNMOFFaYXQ0cDFxb19UcGxnIiwicGhvbmVJZCI6Ijg2ZTczMjJhLWI0YmQtNDhiNS04Y2RiLTIwN2FhY2YzN2ZiYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0OFNSZXB5Z2VpRnMxZGkwUmtCY1Y4aWU4Z3c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOXd1dDVlWDhzUGZocUE4UVdSTWpYTnc5YUFVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik01N1BRQVhQIiwibWUiOnsiaWQiOiIyNjA5NzM3NjI5NTM6MzdAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0licXI2d0ZFT1djOUxnR0dCa2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlFnRzFyUytyVUxkN29JYkp2cUFqSnozL3ZDdVJNNURBTnRna0djb01zZzQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImNyV3FoSGFtV2E3Q3hqM3h1TnhLaS91YlZNL0lMY0pnRU9ZVXNzZm15QW5JMS9mL3Q3VWg5ZGx0ZG5nNWl6RmFEOURMbVVKTVR3RVpvcklSYTZvREJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJuWHYwTDFmTi9RcGF5cmFGYWJ3aTUxaGovd1N6bEZjOWZKYy80T0R1b0MzNkNyZ1IzZnRhVkxhUndGY2JKMmJKeklsSmE3OURoc0pRMjI4ZHRvSDJCUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MDk3Mzc2Mjk1MzozN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVSUJ0YTB2cTFDM2U2Q0d5YjZnSXljOS83d3JrVE9Rd0RiWUpCbktETElPIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI5OTU3NDg5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUhadSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𝛭𝛯𝐿𝐿𝛩",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "260973762953",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://i.imgur.com/ggIBWn4.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'avalaible',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
