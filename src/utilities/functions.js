import * as constant from './constants';
import * as champions from './champions';


export function championIdToName(id) {
    //get an array of data's "properties" (champs)
    let championProperties = Object.getOwnPropertyNames(champions.champions.data);
    for (let i = 0; i < championProperties.length; i++) {
        if (id === champions.champions.data[championProperties[i]].id) {
            return champions.champions.data[championProperties[i]].key;
        }
    }
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

