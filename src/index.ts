// This package is a wrapper for @segment/analytics-next. Ensure it is installed as a peer dependency.
import { AnalyticsBrowser as SegmentAnalyticsBrowser, AnalyticsBrowserSettings } from '@segment/analytics-next';

export type { AnalyticsBrowserSettings };

export const AnalyticsBrowser = {
  load: (settings: AnalyticsBrowserSettings & { apiHost?: string }) => {
    // Only inject cdnSettings if not already provided
    const mergedSettings = {
      ...settings,
      cdnSettings: settings.cdnSettings || {
        integrations: {
          'Segment.io': {
            apiKey: settings.writeKey,
            unbundledIntegrations: [],
            addBundledMetadata: true,
            maybeBundledConfigIds: {},
            versionSettings: {
              version: '4.4.7',
              componentTypes: ['browser']
            },
            apiHost: settings.apiHost || 'events.zixflow.com/sdk/v1'
          }
        },
        plan: {
          track: { __default: { enabled: true, integrations: {} } },
          identify: { __default: { enabled: true } },
          group: { __default: { enabled: true } }
        },
        edgeFunction: {},
        analyticsNextEnabled: true,
        middlewareSettings: { routingRules: [] },
        enabledMiddleware: {},
        metrics: { sampleRate: 0.1, host: 'events.zixflow.com/sdk/v1' },
        legacyVideoPluginsEnabled: false,
        remotePlugins: [],
        autoInstrumentationSettings: { disableTraffic: false, sampleRate: 0 }
      }
    };
    const instance = new SegmentAnalyticsBrowser();
    return instance.load(mergedSettings);
  }
};

export default AnalyticsBrowser; 