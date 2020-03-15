import Vue from 'vue'
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

Sentry.init({
  dsn: 'https://b65ddccb9c594cbcb1d6a114d7d9d5c4@sentry.io/152451',
  integrations: [
    new Integrations.Vue({ Vue, attachProps: true })
  ],
  release: `${process.env.name}@${process.env.version}`
});
