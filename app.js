const readline = require('readline-sync')
const fs = require('fs');
const scraper = {
    text: require('./robos/scraper.js')
}
const base = {
    escolhe: require('./robos/baserow.js')
}

async function start (){
    const hashtag = {}
    hashtag.searchTerm = askAndReturnSearchTerm()

    await scraper.text(hashtag)

    function askAndReturnSearchTerm(){
        return readline.question ('Digite a Hashtag para buscar: ')
    }

    async function baixarVideos(){
        const download = require('./robos/download.js')
        
    }
    
    await baixarVideos();

    const baseFecht = {}
    baseFecht.base = fetchBasedeDados()

    await base.escolhe(baseFecht)

    function askAndReturnBase(){
        const dadosJSON = fs.readFileSync('./credenciais/baserowapi.json');
        const dadosObj = JSON.parse(dadosJSON);
        const baseDados = dadosJSON.nameDatabase
        return readline.keyInSelect(baseDados, 'Escolha a Base utilizada:')

    }

    await askAndReturnBase();

}
start()