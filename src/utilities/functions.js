import * as constant from './constants';
import * as champions from './champions';
import * as summonerSpells from './summoner-spells';


export function championIdToName(id) {
    //get an array of data's "properties" (champs)
    let championProperties = Object.getOwnPropertyNames(champions.champions.data);
    for (let i = 0; i < championProperties.length; i++) {
        if (id === champions.champions.data[championProperties[i]].id) {
            return champions.champions.data[championProperties[i]].key;
        }
    }
}

export function summonerSpellIdToName(id) {
    let summonerSpellsProperties = Object.getOwnPropertyNames(summonerSpells.summonerSpells.data);
    for (let i = 0; i < summonerSpellsProperties.length; i++) {
        if (id === summonerSpells.summonerSpells.data[summonerSpellsProperties[i]].id) {
            return summonerSpells.summonerSpells.data[summonerSpellsProperties[i]].key;
        }
    }
}

//Helper function to standardize format of champions
//Allows sorting functions to recieve and output in same format
export function standardizeChampions(champions) {
    let standardizedChampions = [];
    Object.keys(champions).map((champion) => standardizedChampions.push(champions[champion]));
    return standardizedChampions;
}

export function getKDA(k, d, a) {
    if (d === 0 && (k > 0 || a > 0)) {
        return "∞";
    }
    return ((k + a) / d).toFixed(2);
}

export function getVersionUrl() {
    return "https://na1.api.riotgames.com/lol/static-data/v3/versions/?api_key=" + process.env.REACT_APP_RIOT_API_KEY;
}

export function getSummonerUrl(summonerName) {
    return "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + summonerName + "?api_key="+ process.env.REACT_APP_RIOT_API_KEY;
}

export function getProfileIconUrl(version, profileIconId) {
    return "http://ddragon.leagueoflegends.com/cdn/" + version + "/img/profileicon/" + profileIconId + ".png"
}

export function getChampionIconUrl(champion) {
    return "https://ddragon.leagueoflegends.com/cdn/" + constant.version + "/img/champion/" + champion + ".png";
}

export function getChampionSplashUrl(champion) {
    return "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + champion + "_0.jpg";
}

export function getChampionSplashBySkinUrl(champion, skin) {
    return "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + champion + "_" + skin + ".jpg";
}

export function getChampionLoadingUrl(champion) {
    return "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champion + "_0.jpg";
}

export function getChampionsUrl() {
    return "https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&dataById=false&api_key=" + process.env.REACT_APP_RIOT_API_KEY;
}

export function getMasteryUrl(summonerId) {
    return "https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/" + summonerId + "?api_key=" + process.env.REACT_APP_RIOT_API_KEY;
}

export function getMatchHistory10Url(accountId) {
    return "https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/" + accountId + "?endIndex=10&api_key=" + process.env.REACT_APP_RIOT_API_KEY;
}

export function getMatchUrl(gameId) {
    return "https://na1.api.riotgames.com/lol/match/v3/matches/" + gameId + "?api_key=" + process.env.REACT_APP_RIOT_API_KEY;
}

export function getItemUrl(item) {
    return "http://ddragon.leagueoflegends.com/cdn/" + constant.version + "/img/item/" + item + ".png"
}

export function getSummonerSpellUrl(summonerSpell) {
    return "http://ddragon.leagueoflegends.com/cdn/" + constant.version + "/img/spell/" + summonerSpell + ".png";
}

//champion, gold, items, minion, score, spells
export function getScoreboardIcons(icon) {
    return "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/" + icon + ".png";
}

export function getMonthString(month) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    if (month >= 1 && month <= 12) {
        return months[month-1];
    }
}

export function getChampionRegion(champion) {
    if (champion.name === "Corki" ||
        champion.name === "Lulu" ||
        champion.name === "Rumble" ||
        champion.name === "Teemo" ||
        champion.name === "Tristana" ||
        champion.name === "Veigar") {
            return "Bandle City";
    }

    if (champion.name === "Gangplank" ||
        champion.name === "Graves" ||
        champion.name === "Illaoi" ||
        champion.name === "Miss Fortune" ||
        champion.name === "Nautilus" ||
        champion.name === "Twisted Fate") {
            return "Bilgewater";
    }

    if (champion.name === "Fiora" ||
        champion.name === "Galio" ||
        champion.name === "Garen" ||
        champion.name === "Jarvan IV" ||
        champion.name === "Lucian" ||
        champion.name === "Lux" ||
        champion.name === "Poppy" ||
        champion.name === "Quinn" ||
        champion.name === "Shyvana" ||
        champion.name === "Sona" ||
        champion.name === "Vayne" ||
        champion.name === "Xin Zhao") {
            return "Demacia";
    }

    if (champion.name === "Anivia" ||
        champion.name === "Ashe" ||
        champion.name === "Braum" ||
        champion.name === "Lissandra" ||
        champion.name === "Nunu" ||
        champion.name === "Olaf" ||
        champion.name === "Ornn" ||
        champion.name === "Sejuani" ||
        champion.name === "Trundle" ||
        champion.name === "Tryndamere" ||
        champion.name === "Udyr" ||
        champion.name === "Volibear") {
            return "Freljord";
    }

    if (champion.name === "Ahri" ||
        champion.name === "Akali" ||
        champion.name === "Irelia" ||
        champion.name === "Jhin" ||
        champion.name === "Karma" ||
        champion.name === "Kayn" ||
        champion.name === "Kennen" ||
        champion.name === "Lee Sin" ||
        champion.name === "Master Yi" ||
        champion.name === "Rakan" ||
        champion.name === "Shen" ||
        champion.name === "Soraka" ||
        champion.name === "Syndra" ||
        champion.name === "Varus" ||
        champion.name === "Wukong" || 
        champion.name === "Xayah" ||
        champion.name === "Yasuo" ||
        champion.name === "Zed") {
            return "Ionia";
    }

    if (champion.name === "Diana" ||
        champion.name === "Leona" ||
        champion.name === "Pantheon" ||
        champion.name === "Taric" ||
        champion.name === "Zoe") {
            return "Mount Targon";
    }

    if (champion.name === "Cassiopeia" ||
        champion.name === "Darius" ||
        champion.name === "Draven" ||
        champion.name === "Katarina" ||
        champion.name === "Kled" ||
        champion.name === "LeBlanc" ||
        champion.name === "Riven" ||
        champion.name === "Sion" ||
        champion.name === "Swain" ||
        champion.name === "Talon" ||
        champion.name === "Vladimir") {
            return "Noxus";
    }

    if (champion.name === "Caitlyn" ||
        champion.name === "Camille" ||
        champion.name === "Ezreal" ||
        champion.name === "Heimerdinger" ||
        champion.name === "Jayce" ||
        champion.name === "Orianna" ||
        champion.name === "Vi") {
            return "Piltover";
    }

    if (champion.name === "Amumu" ||
        champion.name === "Azir" ||
        champion.name === "Nasus" ||
        champion.name === "Rammus" ||
        champion.name === "Renekton" ||
        champion.name === "Sivir" ||
        champion.name === "Skarner" ||
        champion.name === "Taliyah" ||
        champion.name === "Xerath") {
            return "Shurima";
    }

    if (champion.name === "Elise" ||
        champion.name === "Hecarim" ||
        champion.name === "Kalista" ||
        champion.name === "Karthus" ||
        champion.name === "Maokai" ||
        champion.name === "Mordekaiser" ||
        champion.name === "Thresh" ||
        champion.name === "Yorick") {
            return "Shadow Isles";
    }

    if (champion.name === "Aatrox" ||
        champion.name === "Alistar" ||
        champion.name === "Annie" ||
        champion.name === "Aurelion Sol" ||
        champion.name === "Bard" ||
        champion.name === "Brand" ||
        champion.name === "Evelynn" ||
        champion.name === "Fiddlesticks" ||
        champion.name === "Fizz" |
        champion.name === "Gnar" ||
        champion.name === "Gragas" ||
        champion.name === "Ivern" ||
        champion.name === "Jax" ||
        champion.name === "Kayle" ||
        champion.name === "Kindred" ||
        champion.name === "Malphite" ||
        champion.name === "Morgana" ||
        champion.name === "Nami" ||
        champion.name === "Nidalee" ||
        champion.name === "Nocturne" ||
        champion.name === "Rengar" ||
        champion.name === "Ryze" ||
        champion.name === "Shaco" ||
        champion.name === "Tahm Kench" ||
        champion.name === "Zilean" ||
        champion.name === "Zyra") {
            return "Runeterra";
    }

    if (champion.name === "Cho'Gath" ||
        champion.name === "Kai'Sa" ||
        champion.name === "Kassadin" ||
        champion.name === "Kha'Zix" ||
        champion.name === "Kog'Maw" ||
        champion.name === "Malzahar" ||
        champion.name === "Rek'Sai" ||
        champion.name === "Vel'Koz") {
            return "Void";
    }

    if (champion.name === "Blitzcrank" ||
        champion.name === "Dr. Mundo" ||
        champion.name === "Ekko" ||
        champion.name === "Janna" ||
        champion.name === "Jinx" ||
        champion.name === "Singed" ||
        champion.name === "Twitch" ||
        champion.name === "Urgot" ||
        champion.name === "Viktor" ||
        champion.name === "Warwick" ||
        champion.name === "Zac" ||
        champion.name === "Ziggs") {
            return "Zaun";
    }
}