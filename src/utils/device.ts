import { Dimensions, Platform } from 'react-native';
import { CustomerAudits } from '../api/clients/identity/types';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;

export const getCustomerAudits = async (): Promise<CustomerAudits> => {
  const ipAddress = '92.168.32.44';
  const osName = Platform.OS;
  const ipAddressCountryCode = 'LT';
  const model = 'iPhone7,2';

  const systemVersion = '7.1.1';
  const [major, minor, patch] = systemVersion.split('.');

  return {
    ipAddress,
    ipAddressCountryCode,
    deviceInformation: {
      model,
      osName,
      osVersion: {
        major: Number(major),
        minor: Number(minor),
        patch: Number(patch),
      },
    },
  };
};
