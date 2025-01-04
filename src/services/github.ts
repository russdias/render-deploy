import * as github from '@actions/github'
import { GITHUB_TOKEN } from 'src/consts'
import { octoClient } from '../clients/octoClient'
import { DeployStatus, type Deploy } from '../types'
import { getServiceUrl } from './deploy'

/**
 * 💬 Posts a deployment update comment to GitHub
 */
export const postDeployUpdate = async (deploy: Deploy): Promise<void> => {
  const octokit = octoClient(GITHUB_TOKEN)
  const context = github.context
  const { owner, repo } = context.repo
  let message = `## 🚀 Render Deployment Update
📊 Status: \`${deploy.status}\`
⏰ Triggered at: ${new Date(deploy.createdAt).toLocaleString()}`

  if (deploy.status === DeployStatus.Live) {
    const url = await getServiceUrl()
    message += `\n🔗 Service URL: ${url}`
  }

  await octokit.rest.repos.createCommitComment({
    owner,
    repo,
    commit_sha: context.sha,
    body: message
  })
}
