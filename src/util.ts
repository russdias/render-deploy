import { finalStatesStatusMessages } from './consts'
import type { DeployStatus, FinalDeployStates } from './types'

export const isFinalStatus = (
  status: DeployStatus
): status is FinalDeployStates =>
  Object.keys(finalStatesStatusMessages).includes(status)

export const getStatusMessage = (status: DeployStatus): string => {
  if (isFinalStatus(status)) {
    return finalStatesStatusMessages[status]
  }
  return `Unknown status: ${status}`
}
