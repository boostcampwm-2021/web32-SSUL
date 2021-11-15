import dotenv from 'dotenv';
dotenv.config();

export function loginWithGithub(): void {
  const { REACT_APP_GITHUB_CALLBACK_PATH: redirectUrl, REACT_APP_GITHUB_CI: clientId } =
    process.env;
  const origin = 'https://github.com/login/oauth/authorize';
  const githubURL = `${origin}?client_id=${clientId}&redirect_url=${redirectUrl}`;
  window.location.href = githubURL;
}
