import { FeatureFlagsKeysEnum, getContextPath, NovuComponentEnum } from '@novu/shared';

function isBrowser() {
  return typeof window !== 'undefined';
}

function autodetectApiRoot() {
  const origin = window.location.origin;
  const matcher = new RegExp(/web|dashboard/);

  const isValidTargetForReplace = !origin.includes('localhost') && matcher.test(origin);

  return isValidTargetForReplace ? origin.replace(matcher, 'api') : '';
}

declare global {
  interface Window {
    _env_: any;
  }
}

const isPlaywright = isBrowser() && (window as any).isPlaywright;

export const API_ROOT =
  window._env_.REACT_APP_API_URL || isPlaywright
    ? window._env_.REACT_APP_API_URL || process.env.REACT_APP_API_URL || autodetectApiRoot() || 'http://localhost:1336'
    : window._env_.REACT_APP_API_URL || process.env.REACT_APP_API_URL || autodetectApiRoot() || 'http://localhost:3000';

export const WS_URL = isPlaywright
  ? window._env_.REACT_APP_WS_URL || process.env.REACT_APP_WS_URL || 'http://localhost:1340'
  : window._env_.REACT_APP_WS_URL || process.env.REACT_APP_WS_URL || 'http://localhost:3002';

export const SENTRY_DSN = window._env_.REACT_APP_SENTRY_DSN || process.env.REACT_APP_SENTRY_DSN;

export const ENV = window._env_.REACT_APP_ENVIRONMENT || process.env.REACT_APP_ENVIRONMENT;

const blueprintApiUrlByEnv =
  ENV === 'production' || ENV === 'prod' ? 'https://api.novu.co' : 'https://api.novu-staging.co';

export const BLUEPRINTS_API_URL =
  window._env_.REACT_APP_BLUEPRINTS_API_URL || isPlaywright
    ? window._env_.REACT_APP_BLUEPRINTS_API_URL || process.env.REACT_APP_BLUEPRINTS_API_URL || 'http://localhost:1336'
    : blueprintApiUrlByEnv;

export const APP_ID = window._env_.REACT_APP_NOVU_APP_ID || process.env.REACT_APP_NOVU_APP_ID;

export const WIDGET_EMBED_PATH =
  window._env_.REACT_APP_WIDGET_EMBED_PATH ||
  process.env.REACT_APP_WIDGET_EMBED_PATH ||
  'http://localhost:4701/embed.umd.min.js';

export const IS_DOCKER_HOSTED =
  window._env_.REACT_APP_DOCKER_HOSTED_ENV === 'true' || process.env.REACT_APP_DOCKER_HOSTED_ENV === 'true';

export const REACT_APP_VERSION = process.env.NOVU_VERSION;

export const INTERCOM_APP_ID = window._env_.REACT_APP_INTERCOM_APP_ID || process.env.REACT_APP_INTERCOM_APP_ID;

export const CONTEXT_PATH = getContextPath(NovuComponentEnum.WEB);

export const WEBHOOK_URL = isPlaywright
  ? window._env_.REACT_APP_WEBHOOK_URL || process.env.REACT_APP_WEBHOOK_URL || 'http://localhost:1341'
  : window._env_.REACT_APP_WEBHOOK_URL || process.env.REACT_APP_WEBHOOK_URL || 'http://localhost:3003';

export const MAIL_SERVER_DOMAIN =
  window._env_.REACT_APP_MAIL_SERVER_DOMAIN || process.env.REACT_APP_MAIL_SERVER_DOMAIN || 'dev.inbound-mail.novu.co';

export const LAUNCH_DARKLY_CLIENT_SIDE_ID =
  window._env_.REACT_APP_LAUNCH_DARKLY_CLIENT_SIDE_ID || process.env.REACT_APP_LAUNCH_DARKLY_CLIENT_SIDE_ID;

export const FEATURE_FLAGS = Object.values(FeatureFlagsKeysEnum).reduce((acc, key) => {
  const defaultValue = 'false';
  acc[key] = window._env_[key] || process.env[key] || defaultValue;

  return acc;
}, {} as Record<FeatureFlagsKeysEnum, string | undefined>);

export const HUBSPOT_PORTAL_ID = window._env_.REACT_APP_HUBSPOT_EMBED || process.env.REACT_APP_HUBSPOT_EMBED;

export const IS_EU_ENV = (ENV === 'production' || ENV === 'prod') && API_ROOT.includes('eu.api.novu.co');

export const IS_EE_AUTH_ENABLED =
  window._env_.REACT_APP_IS_EE_AUTH_ENABLED === 'true' || process.env.REACT_APP_IS_EE_AUTH_ENABLED === 'true';

export const CLERK_PUBLISHABLE_KEY =
  window._env_.REACT_APP_CLERK_PUBLISHABLE_KEY || process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (IS_EE_AUTH_ENABLED && !CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}
