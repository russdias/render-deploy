export interface Commit {
  id: string
  message: string
  createdAt: string
}

export interface Image {
  ref: string
  sha: string
  registryCredential: string
}

export enum DeployStatus {
  Created = 'created',
  BuildInProgress = 'build_in_progress',
  UpdateInProgress = 'update_in_progress',
  Live = 'live',
  Deactivated = 'deactivated',
  BuildFailed = 'build_failed',
  UpdateFailed = 'update_failed',
  Canceled = 'canceled',
  PreDeployInProgress = 'pre_deploy_in_progress',
  PreDeployFailed = 'pre_deploy_failed'
}

export type FinalDeployStates = Extract<
  DeployStatus,
  | DeployStatus.Live
  | DeployStatus.Canceled
  | DeployStatus.BuildFailed
  | DeployStatus.UpdateFailed
  | DeployStatus.PreDeployFailed
>

export interface Deploy {
  id: string
  commit: Commit
  image: Image
  status: DeployStatus
  trigger: string
  finishedAt: string
  createdAt: string
  updatedAt: string
}

export interface ServiceDetails {
  url: string
}

export interface Service {
  id: string
  serviceDetails: ServiceDetails
}
