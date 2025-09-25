import React from 'react';
import { AnalyticsBrowser } from '@zixflow/analytics-js';

const analytics = AnalyticsBrowser.load({ writeKey: 'LS899c0oTdHjXnLaEosKOeFkKdUQXBNo', apiHost: 'localhost:8080/api/sdk' });

export default function App() {
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