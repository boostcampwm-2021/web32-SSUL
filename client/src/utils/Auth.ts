import dotenv from 'dotenv';
dotenv.config();

export function loginWithGithub(): void {
  const { REACT_APP_GITHUB_CALLBACK_PATH: path, REACT_APP_GITHUB_CI: clientId } = process.env;
  const origin = 'https://github.com/login/oauth/authorize';
  const redirectOrigin = 'http://localhost:3000';
  const githubURL = `${origin}?client_id=${clientId}&redirect_url=${redirectOrigin}${path}`;
  window.location.href = githubURL;
}
