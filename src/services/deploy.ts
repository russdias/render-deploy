import * as core from '@actions/core'
import { axiosClient } from '../clients/axiosClient'
import { LOG_MESSAGES, RENDER_SERVICE_ID } from '../consts'
import { DeployStatus, type Deploy, type Service } from '../types'
import { isFinalStatus } from '../util'

/**
 * 🎯 Triggers a new deployment on Render
 */
export const triggerDeploy = async (): Promise<Deploy> => {
  core.info(LOG_MESSAGES.DeploymentTriggered)
  return axiosClient
    .post<Deploy>(`/services/${RENDER_SERVICE_ID}/deploys`)
    .then(d => {
      core.info(`${LOG_MESSAGES.DeploymentTriggeredSuccess} ${d.data.id}`)
      return d.data
    })
}

/**
 * ⏳ Waits for a deployment to complete
 */
export const waitForDeploy = async (deploy: Deploy): Promise<Deploy> => {
  let status = deploy.status
  let currentDeploy = deploy
  let attempts = 0
  const maxAttempts = 180 // ⏱️ 3 minutes with 1s intervals

  while (!isFinalStatus(status) && attempts < maxAttempts) {
    if (attempts % 10 === 0) {
      core.info(
        `${LOG_MESSAGES.DeploymentInProgress} ${status} (${attempts} checks)`
      )
    }
    await new Promise(resolve => setTimeout(resolve, 1000))
    currentDeploy = await axiosClient
      .get<Deploy>(`/services/${RENDER_SERVICE_ID}/deploys/${deploy.id}`)
      .then(d => d.data)

    if (status !== currentDeploy.status) {
      core.info(
        `${LOG_MESSAGES.DeploymentStatusChanged} ${status} → ${currentDeploy.status}`
      )
      status = currentDeploy.status
    } else {
      status = currentDeploy.status
    }
    attempts++
  }

  if (attempts >= maxAttempts) {
    throw new Error(
      `${LOG_MESSAGES.DeploymentTimedOut} ${maxAttempts} attempts. Current status: \`${status}\``
    )
  }

  if (currentDeploy.status === DeployStatus.Live) {
    core.info(`${LOG_MESSAGES.DeploymentSuccess} ${currentDeploy.status}`)
  }

  return currentDeploy
}

/**
 * 🔗 Gets the service URL for a live deployment
 */
export const getServiceUrl = async (): Promise<string> => {
  const service = await axiosClient
    .get<Service>(`/services/${RENDER_SERVICE_ID}`)
    .then(s => s.data)
  return service.serviceDetails.url
}
