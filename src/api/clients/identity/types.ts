import { LogActions } from './constants';
import { BaseConfigProperty } from '../../types';

export interface SetupStep {
  type: string;
  order: number;
  setupId: string;
}

export interface GetSetupResponse {
  steps: SetupStep[];
  sessionScreenRecording: BaseConfigProperty;
}

export interface OsVersion {
  major: number;
  minor: number;
  patch: number;
}

export interface DeviceInformation {
  model: string;
  osName: string;
  osVersion: OsVersion;
}

export interface CustomerAudits {
  ipAddress: string;
  ipAddressCountryCode: string;
  deviceInformation: DeviceInformation;
}

export interface ConsentRequest {
  isConsented: boolean;
}

export interface LoggingRequest {
  action: LogActions;
}
