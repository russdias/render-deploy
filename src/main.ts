import * as core from '@actions/core'
import { LOG_MESSAGES, WAIT_FOR_DEPLOYMENT } from './consts'
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
    core.info(LOG_MESSAGES.WorkflowStarted)
    const deploy = await triggerDeploy()
    await postDeployUpdate(deploy)

    if (!WAIT_FOR_DEPLOYMENT) {
      core.info(LOG_MESSAGES.SkipDeploymentWait)
      core.info(LOG_MESSAGES.DeploymentCompleted)
      return core.setOutput('status', deploy.status)
    }

    const finalDeploy = await waitForDeploy(deploy)
    await postDeployUpdate(finalDeploy)

    if (finalDeploy.status !== DeployStatus.Live) {
      throw new Error(
        `${LOG_MESSAGES.DeploymentFailed} \`${finalDeploy.status}\``
      )
    }

    core.info(LOG_MESSAGES.DeploymentCompleted)
    core.setOutput('status', getStatusMessage(finalDeploy.status))
  } catch (error) {
    // ⚠️ Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(`⚠️ ${error.message}`)
  }
}
