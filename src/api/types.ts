import { IconName } from '../components/Svg';

export interface Mistake {
  iconName: IconName;
  label: string;
}

export interface BaseConfigProperty {
  enabled: boolean;
}
