const express = require('express');
const TikTokScraper = require('tiktok-scraper-ts');
const { writeFile, unlink, readFile } = require('fs').promises;

const app = express();
const port = 8080;

app.get('/hashtag/:name', async (req, res) => {
  const hashtagName = req.params.name;

  try {
    // Verifica se o arquivo existe
    await unlink('videos.json');
    console.log('Arquivo existente foi excluído');
  } catch (error) {
    console.log('Arquivo não existente ou erro ao excluir o arquivo');
  }

  const fetchVideoHash = await TikTokScraper.hashtag(hashtagName);
  await writeFile('videos.json', JSON.stringify(fetchVideoHash, null, 2));

  console.log('Arquivo criado com sucesso');

  const jsonData = await readFile('videos.json', 'utf-8');
  res.json(JSON.parse(jsonData));
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
