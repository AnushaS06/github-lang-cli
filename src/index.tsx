import axios from 'axios';
import {GITHUB_API_BASE_URL, API_RATE_LIMIT_ERROR, INVALID_GIT_ERROR, NUMBER_OF_LANGUAGES, SUPPORTED_GIT_PROVIDERS} from './constants';

/*
    Function to fetch repositories from user name
*/
const getRepositories =  async(username: string) =>{
    try{
        const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}/repos`)
        return response.data;
    }
    catch(e){
        throw new Error(API_RATE_LIMIT_ERROR);
    }
}

/*
    Function to Parse profile name from url
*/
export const parseProfileUrl = (url: string): string => {
    const providersPattern = SUPPORTED_GIT_PROVIDERS.join('|');
    const regex = new RegExp(`(?:${providersPattern})\\.com\\/([^/]+)`);
    const match = url.match(regex);
  
    if (!match || match.length < 2) {
      throw new Error(INVALID_GIT_ERROR);
    }
  
    return match[1];
  };
  

const main = async () =>{
    const gitUrl = process.argv[2]
    
    if(!gitUrl){
        console.error("Please provide a GitHub profile URL.")
        return
    }
    const username = parseProfileUrl(gitUrl);
    const repositories = await getRepositories(username)
    const languageCount: Record<string, number> = {};

    repositories.forEach(repo => {
        if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
        }
    });

    const sortedLanguages = Object.entries(languageCount)
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0]);
    
    const mostUsedLanguages =  sortedLanguages.slice(0, NUMBER_OF_LANGUAGES);
    console.log('Top 5 languages used:', mostUsedLanguages);
}

main()