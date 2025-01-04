import * as github from '@actions/github'

export const octoClient = (token: string) => github.getOctokit(token)
