import type { AppConfig } from './lib/types';

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'Nate',
  pageTitle: 'Nate Voice Agent',
  pageDescription: 'An advanced AI voice assistant',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/ark_reactor.png',
  accent: '#002cf2',
  logoDark: '/ark_reactor.png',
  accentDark: '#1fd5f9',
  startButtonText: 'Talk to Nate',

  agentName: 'nate-2q8xr9',
};
