const path = require('path');
const fs = require('fs');
import { ConfigI } from '../interfaces/config';
const isDev = true;

const _config = isDev ? JSON.parse(fs.readFileSync(path.join(path.dirname(__dirname), './configs/config.json'))) : JSON.parse(fs.readFileSync(path.join(path.dirname(process.execPath), './configs/config.json')));

const config: ConfigI = {
    password: _config.client_pass || 'pass',
    serverIp: _config.serverIp || 'localhost',
    port: _config.port || 3000
}

export {config};