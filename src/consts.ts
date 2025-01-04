import * as core from '@actions/core'
import { DeployStatus, type FinalDeployStates } from './types'

export const RENDER_API_URL = 'https://api.render.com/v1'
export const RENDER_SERVICE_ID = core.getInput('RENDER_SERVICE_ID')
export const RENDER_API_KEY = core.getInput('RENDER_API_KEY')
export const GH_TOKEN = core.getInput('GH_TOKEN')
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
