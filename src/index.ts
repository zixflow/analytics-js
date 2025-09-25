// This package is a wrapper for @segment/analytics-next. Ensure it is installed as a peer dependency.
import { AnalyticsBrowser as SegmentAnalyticsBrowser, AnalyticsBrowserSettings } from '@segment/analytics-next';

export type { AnalyticsBrowserSettings };

export const AnalyticsBrowser = {
  load: (settings: AnalyticsBrowserSettings & { apiHost?: string }) => {
    const apiHost = settings.apiHost || 'api.zixflow.com/sdk';

    const instance = new SegmentAnalyticsBrowser();
    return instance.load({
      writeKey: settings.writeKey,
      cdnURL: `https://${apiHost}`
    },
      {
        integrations: {
          'Segment.io': {
            apiHost: `${apiHost}/v1/event`,
            protocol: 'https'
          }
        }
      });
  }
};

export default AnalyticsBrowser; 