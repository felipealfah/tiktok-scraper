const request = require('request');
const fs = require('fs');
const path = require('path');
const folderName = 'videos';

if (!fs.existsSync(folderName)){
    fs.mkdirSync(folderName);
}

const url = 'https://developers.tiklydown.me/api/download?url=https%3A%2F%2Fwww.tiktok.com%2F%40ahconfeiteira%2Fvideo%2F7174526814059007237';

request.get(url, (error, response, body) => {
  if (error) {
    console.error(error);
  } else {
    console.log('statusCode:', response.statusCode);
    console.log('headers:', response.headers);

    try {
      // Parse JSON from body
      const data = JSON.parse(body);

      const videoId = data.id;
      const videoName = `${videoId}.mp4`;
      console.log(`Nome do vídeo: ${videoName}`);
      const filePath = path.join(folderName, videoName);

      console.log (data.video.noWatermark)

      const videoDL = data.video.noWatermark

      request.get(videoDL)
  .on('error', (err) => {
    console.error(err);
  })
  .pipe(fs.createWriteStream(filePath))
  .on('finish', () => {
    console.log(`Arquivo ${videoName} salvo na pasta ${folderName} com sucesso!`);
  });

      /* Check for noWatermark property
      if (data.noWatermark) {
        console.log('No watermark video URL:', data.noWatermark);
      } else {
        console.log('No noWatermark property found in the response');
      }*/
    } catch (e) {
      console.error('Error parsing response body:', e);
    }
  }
});
