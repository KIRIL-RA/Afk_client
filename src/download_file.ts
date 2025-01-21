import * as fs from 'fs';
import * as path from 'path';
import { config } from './configs/config_loader'
import axios from 'axios';

async function downloadFile(fileName: string): Promise<void> {
    const url = `http://${config.serverIp}:${config.port}/get_file/${fileName}?token=${config.password}`;
    const filePath = path.join('./', fileName);

    try {
        const response = await axios.get(url, { responseType: 'stream' });
        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        }).catch((error) => {console.log(error)});
    } catch (error) {
        console.error(`Error downloading file: ${error}`);
    }
}

export default downloadFile;