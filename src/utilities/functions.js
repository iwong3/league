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