import * as core from '@actions/core'
import { triggerDeploy, waitForDeploy } from './services/deploy'
import { postDeployUpdate } from './services/github'
import { DeployStatus } from './types'
import { getStatusMessage } from './util'

/**
 * 🚀 The main function for the action.
 * @returns {Promise<void>} ✨ Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    core.info('🚀 Starting Render deployment...')
    const deploy = await triggerDeploy()
    await postDeployUpdate(deploy)

    const finalDeploy = await waitForDeploy(deploy)
    await postDeployUpdate(finalDeploy)

    if (finalDeploy.status !== DeployStatus.Live) {
      throw new Error(
        `❌ Deployment failed with status: \`${finalDeploy.status}\``
      )
    }

    core.setOutput('status', getStatusMessage(finalDeploy.status))
    core.info('✨ Deployment workflow completed successfully!')
  } catch (error) {
    // ⚠️ Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(`⚠️ ${error.message}`)
  }
}
