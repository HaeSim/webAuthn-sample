// FIXME: Update this configuration file based on your project information

type AppConfigType = {
  site_name: string;
  title: string;
  description: string;
  locale: string;
  base_url: string;
};

export const AppConfig: AppConfigType = {
  site_name: 'webAuthn-sample',
  title: 'webAuthn-sample',
  description: 'webAuthn-sample',
  locale: 'ko',
  base_url: process.env.NODE_ENV === 'production' ? '/api/v1' : '/api/mock',
};
