import { AnalyticsBrowser } from '@zixflow/analytics-next';

const analytics = AnalyticsBrowser.load({ writeKey: 'your-zixflow-sdk-key' });

export default function Home() {
  return (
    <div>
      <button onClick={() => analytics.track('Test Event', { foo: 'bar' })}>Track</button>
      <button onClick={() => analytics.page('Test Page', { pageType: 'example' })}>Page</button>
      <button onClick={() => analytics.identify('user_123', { name: 'John Doe', email: 'john@example.com' })}>Identify</button>
      <button onClick={() => analytics.alias('user_123', 'user_456')}>Alias</button>
      <button onClick={() => analytics.group('group_789', { groupName: 'Test Group' })}>Group</button>
    </div>
  );
} 