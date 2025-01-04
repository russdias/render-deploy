import * as core from '@actions/core'
import * as github from '@actions/github'
import { GH_TOKEN } from 'src/consts'
import { octoClient } from '../clients/octoClient'
import { DeployStatus, type Deploy } from '../types'
import { getServiceUrl } from './deploy'

/**
 * 💬 Posts a deployment update comment to GitHub
 */
export const postDeployUpdate = async (deploy: Deploy): Promise<void> => {
  if (!GH_TOKEN) {
    core.info('No GH_TOKEN provided, skipping comments')
    return
  }

  const octokit = octoClient(GH_TOKEN)
  const context = github.context

  let message = `## 🚀 Render Deployment Update
📊 Status: \`${deploy.status}\`
⏰ Triggered at: ${new Date(deploy.createdAt).toLocaleString()}`

  if (deploy.status === DeployStatus.Live) {
    const url = await getServiceUrl()
    message += `\n🔗 Service URL: ${url}`
  }

  await octokit.rest.repos.createCommitComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    commit_sha: context.sha,
    body: message
  })
}
