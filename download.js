const request = require('request');
const axios = require("axios");
const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');
const folderName = 'videos';

const dadosJSON = fs.readFileSync('videos.json');
const dadosObj = JSON.parse(dadosJSON);
//const VideoID = '7174526814059007237'

if (!fs.existsSync(folderName)){
    fs.mkdirSync(folderName);
}

let i = 0;
  while (i < dadosObj.length) {
  //while (i < 3) {
      // Obter o ID do objeto atual
      const id = dadosObj[i].id;
      const videoName = id+`.mp4`;

      const options = {
        method: 'GET',
        url: 'https://tiktok-scraper2.p.rapidapi.com/video/no_watermark',
        params: {video_url: 'https://www.tiktok.com/@tiktok/video/'+id},
        headers: {
          'X-RapidAPI-Key': '90ee95314emsh3104ff6c0458689p1be3c0jsne01ffb7477bb',
          'X-RapidAPI-Host': 'tiktok-scraper2.p.rapidapi.com'
        }
      };

    axios.request(options).then(function (response) {
      const videoDL = response.data.no_watermark;
      const filePath = path.join(folderName, videoName);

          request.get(videoDL)
        .on('error', (err) => {
          console.error(err);
        })
        .pipe(fs.createWriteStream(filePath))
        .on('finish', () => {
          console.log(`Arquivo ${videoName} salvo na pasta ${folderName} com sucesso!`);
        });
    }).catch(function (error) {
      console.error(error);
    });
i++}
  