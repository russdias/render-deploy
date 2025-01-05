import * as core from '@actions/core'
import { DeployStatus, type FinalDeployStates } from './types'

export const RENDER_API_URL = 'https://api.render.com/v1'

export const RENDER_SERVICE_ID = core.getInput('RENDER_SERVICE_ID')
export const RENDER_API_KEY = core.getInput('RENDER_API_KEY')
export const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
export const WAIT_FOR_DEPLOYMENT = Boolean(core.getInput('WAIT_FOR_DEPLOYMENT'))

export const finalStates = [
  DeployStatus.Live,
  DeployStatus.Canceled,
  DeployStatus.BuildFailed,
  DeployStatus.UpdateFailed,
  DeployStatus.PreDeployFailed
] satisfies FinalDeployStates[]
export const finalStatesStatusMessages = {
  [DeployStatus.Live]: '✅ Deployment successfully completed',
  [DeployStatus.BuildFailed]: '❌ Build failed',
  [DeployStatus.UpdateFailed]: '❌ Update failed',
  [DeployStatus.Canceled]: '🚫 Deployment canceled',
  [DeployStatus.PreDeployFailed]: '❌ Pre-deploy checks failed'
} satisfies Record<FinalDeployStates, string>

export const LOG_MESSAGES = {
  SkipDeploymentWait: '🚫 Skipping deployment wait...',
  DeploymentCompleted: '✨ Deployment workflow completed successfully!',
  WorkflowStarted: '🚀 Starting Render deployment...',
  DeploymentFailed: '❌ Deployment failed with status: ',
  DeploymentTriggered: '🎯 Triggering new deployment...',
  DeploymentTriggeredSuccess: '✅ Deployment triggered successfully with ID: ',
  DeploymentStatusChanged: '📡 Status changed: ',
  DeploymentInProgress: '🔄 Deploying... Current status: ',
  DeploymentTimedOut: '⏱️ Deployment timed out after ',
  DeploymentSuccess: '✅ Deployment successfully completed with status: '
} as const
