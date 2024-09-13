import axios from 'axios';
import {GITHUB_API_BASE_URL, API_RATE_LIMIT_ERROR, INVALID_GIT_ERROR} from './constants';


const getLanguages =  async(username: string) =>{
    const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}/repos`)
    if (response.status === 403) {
        throw new Error(API_RATE_LIMIT_ERROR);
    }
    console.log(response)
    
    return response.data;
}

export const parseProfileUrl = (url: string): string => {
    const regex = /github\.com\/([^/]+)/;
    const match = url.match(regex);
  
    if (!match || match.length < 2) {
      throw new Error(INVALID_GIT_ERROR);
    }
  
    return match[1];
  };
  

const main = async () =>{
    const gitUrl = process.argv[2]
    console.log(gitUrl)

    if(!gitUrl){
        console.error("Please provide a GitHub profile URL.")
        return
    }
    const username = parseProfileUrl(gitUrl);
    const topLanguages = await getLanguages(username)
}

main()