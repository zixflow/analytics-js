<template>
  <div>
    <button @click="track">Track</button>
    <button @click="page">Page</button>
    <button @click="identify">Identify</button>
    <button @click="alias">Alias</button>
    <button @click="group">Group</button>
  </div>
</template>

<script setup>
import { AnalyticsBrowser } from '@zixflow/analytics-next';
const analytics = AnalyticsBrowser.load({ writeKey: 'your-zixflow-sdk-key' });
function track() {
  analytics.track('Test Event', { foo: 'bar' });
}
function page() {
  analytics.page('Test Page', { pageType: 'example' });
}
function identify() {
  analytics.identify('user_123', { name: 'John Doe', email: 'john@example.com' });
}
function alias() {
  analytics.alias('user_123', 'user_456');
}
function group() {
  analytics.group('group_789', { groupName: 'Test Group' });
}
</script> 