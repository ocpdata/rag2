import fs from 'fs';

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/peopletest.digitalvs.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/peopletest.digitalvs.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/peopletest.digitalvs.com/chain.pem', 'utf8');

export const credenciales = {
    key: privateKey,
    cert: certificate,
    ca: ca
};