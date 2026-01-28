import { createAppAuth } from '@octokit/auth-app'
import { Octokit } from '@octokit/rest'

export const botOctokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: process.env.GITHUB_APP_ID,
    privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
    installationId: process.env.GITHUB_APP_INSTALLATION_ID,
  },
})
