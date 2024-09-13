import axios from 'axios';
import { getRepositories, parseProfileUrl, getLanguages } from '../src/index';
import { API_RATE_LIMIT_ERROR, INVALID_GIT_ERROR, NUMBER_OF_LANGUAGES } from '../src/constants';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getRepositories", () => {
  it("should fetch repositories for a valid username", async () => {
    const mockRepos = [{ name: 'Repo1', language: 'JavaScript' }, { name: 'Repo2', language: 'TypeScript' }];
    mockedAxios.get.mockResolvedValue({ data: mockRepos });

    const repositories = await getRepositories('validuser');

    expect(repositories).toEqual(mockRepos);
  });

  it("should throw an error if API rate limit is exceeded", async () => {
    mockedAxios.get.mockRejectedValue(new Error());

    await expect(getRepositories('validuser')).rejects.toThrow(API_RATE_LIMIT_ERROR);
  });
});

describe("parseProfileUrl", () => {
  it("should correctly parse a GitHub profile URL", () => {
    const profile = parseProfileUrl("https://github.com/username");
    expect(profile).toBe("username");
  });

  it("should throw an error for an invalid GitHub profile URL", () => {
    expect(() => {
      parseProfileUrl("https://invalidurl.com/username");
    }).toThrow(INVALID_GIT_ERROR);
  });
});

describe("getLanguages", () => {
  it("should return the most used languages", async () => {
    const mockRepos = [
      { name: 'Repo1', language: 'JavaScript' },
      { name: 'Repo2', language: 'TypeScript' },
      { name: 'Repo3', language: 'JavaScript' },
      { name: 'Repo4', language: 'Python' },
      { name: 'Repo5', language: null },
    ];
    mockedAxios.get.mockResolvedValue({ data: mockRepos });

    const languages = await getLanguages('https://github.com/username');

    expect(languages).toEqual(['JavaScript', 'TypeScript', 'Python'].slice(0, NUMBER_OF_LANGUAGES));
  });

  it("should handle empty repository list", async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });

    const languages = await getLanguages('https://github.com/username');

    expect(languages).toEqual([]);
  });
});