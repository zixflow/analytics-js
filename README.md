# @zixflow/analytics-next

A powerful wrapper for analytics-next with enhanced configuration and seamless browser framework support. This package provides a simplified interface for tracking user events, page views, user identification, and group analytics across your web applications.

## Features

- 🚀 **Easy Integration**: Simple setup for React, Next.js, Vue, and Vanilla JavaScript applications
- 📊 **Comprehensive Tracking**: Track events, page views, user identification, and group analytics
- ⚙️ **Enhanced Configuration**: Pre-configured settings optimized for performance and reliability
- 🌐 **Framework Agnostic**: Works seamlessly across different JavaScript frameworks
- 📦 **Lightweight**: Minimal bundle size with maximum functionality
- 🔧 **TypeScript Support**: Full TypeScript definitions included

## Installation

### NPM
```bash
npm install @zixflow/analytics-next
```

### Yarn
```bash
yarn add @zixflow/analytics-next
```

### CDN (for Vanilla JavaScript)
```html
<script type="module">
  import { AnalyticsBrowser } from 'https://cdn.jsdelivr.net/npm/@zixflow/analytics-next/+esm';
</script>
```

## Quick Start

### 1. Initialize Analytics

First, import and initialize the analytics browser with your write key:

```javascript
import { AnalyticsBrowser } from '@zixflow/analytics-next';

const analytics = AnalyticsBrowser.load({ 
  writeKey: 'your-zixflow-sdk-key' 
});
```

### 2. Start Tracking

Once initialized, you can immediately start tracking events:

```javascript
// Track custom events
analytics.track('Button Clicked', {
  buttonName: 'signup',
  page: 'homepage'
});

// Track page views
analytics.page('Homepage', {
  pageType: 'landing',
  referrer: 'google.com'
});

// Identify users
analytics.identify('user_123', {
  name: 'John Doe',
  email: 'john@example.com',
  plan: 'premium'
});
```

## Framework-Specific Guides

### React

#### Basic Setup
```jsx
import React from 'react';
import { AnalyticsBrowser } from '@zixflow/analytics-next';

const analytics = AnalyticsBrowser.load({ writeKey: 'your-zixflow-sdk-key' });

function App() {
  const handleSignup = () => {
    analytics.track('Signup Started', {
      source: 'homepage',
      plan: 'premium'
    });
  };

  const handlePurchase = () => {
    analytics.track('Purchase Completed', {
      amount: 99.99,
      currency: 'USD',
      product: 'premium_plan'
    });
  };

  return (
    <div>
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={handlePurchase}>Purchase</button>
    </div>
  );
}
```

#### React Hook Example
```jsx
import React, { useEffect } from 'react';
import { AnalyticsBrowser } from '@zixflow/analytics-next';

const analytics = AnalyticsBrowser.load({ writeKey: 'your-zixflow-sdk-key' });

function UserProfile({ user }) {
  useEffect(() => {
    // Identify user when component mounts
    analytics.identify(user.id, {
      name: user.name,
      email: user.email,
      plan: user.plan
    });
  }, [user]);

  const handleProfileUpdate = () => {
    analytics.track('Profile Updated', {
      userId: user.id,
      updatedFields: ['name', 'email']
    });
  };

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={handleProfileUpdate}>Update Profile</button>
    </div>
  );
}
```

### Next.js

#### Pages Router
```javascript
// pages/index.js
import { AnalyticsBrowser } from '@zixflow/analytics-next';

const analytics = AnalyticsBrowser.load({ writeKey: 'your-zixflow-sdk-key' });

export default function Home() {
  const handlePageView = () => {
    analytics.page('Homepage', {
      pageType: 'landing',
      referrer: document.referrer
    });
  };

  const handleEvent = () => {
    analytics.track('Custom Event', {
      category: 'engagement',
      action: 'button_click'
    });
  };

  return (
    <div>
      <h1>Welcome to Our App</h1>
      <button onClick={handlePageView}>Track Page View</button>
      <button onClick={handleEvent}>Track Event</button>
    </div>
  );
}
```

#### App Router (Next.js 13+)
```javascript
// app/layout.js
'use client';

import { useEffect } from 'react';
import { AnalyticsBrowser } from '@zixflow/analytics-next';

const analytics = AnalyticsBrowser.load({ writeKey: 'your-zixflow-sdk-key' });

export default function RootLayout({ children }) {
  useEffect(() => {
    // Track initial page view
    analytics.page('App Loaded', {
      pageType: 'application',
      timestamp: new Date().toISOString()
    });
  }, []);

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

### Vue 3

#### Composition API
```vue
<template>
  <div>
    <h1>Vue Analytics Demo</h1>
    <button @click="trackEvent">Track Event</button>
    <button @click="identifyUser">Identify User</button>
    <button @click="trackPage">Track Page</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { AnalyticsBrowser } from '@zixflow/analytics-next';

const analytics = AnalyticsBrowser.load({ writeKey: 'your-zixflow-sdk-key' });

const trackEvent = () => {
  analytics.track('Vue Button Clicked', {
    framework: 'vue',
    version: '3.x'
  });
};

const identifyUser = () => {
  analytics.identify('vue_user_123', {
    name: 'Vue User',
    email: 'vue@example.com',
    framework: 'vue'
  });
};

const trackPage = () => {
  analytics.page('Vue Demo Page', {
    pageType: 'demo',
    framework: 'vue'
  });
};

onMounted(() => {
  // Track page view when component mounts
  analytics.page('Vue App Loaded', {
    pageType: 'application',
    framework: 'vue'
  });
});
</script>
```

#### Options API
```vue
<template>
  <div>
    <button @click="handleClick">Click Me</button>
  </div>
</template>

<script>
import { AnalyticsBrowser } from '@zixflow/analytics-next';

export default {
  name: 'AnalyticsDemo',
  data() {
    return {
      analytics: null
    };
  },
  mounted() {
    this.analytics = AnalyticsBrowser.load({ writeKey: 'your-zixflow-sdk-key' });
    
    // Track page view
    this.analytics.page('Vue Options API Page', {
      pageType: 'demo'
    });
  },
  methods: {
    handleClick() {
      this.analytics.track('Button Clicked', {
        component: 'AnalyticsDemo',
        timestamp: new Date().toISOString()
      });
    }
  }
};
</script>
```

### Vanilla JavaScript

#### HTML Setup
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analytics Demo</title>
</head>
<body>
    <h1>Analytics Demo</h1>
    <button id="trackBtn">Track Event</button>
    <button id="identifyBtn">Identify User</button>
    <button id="pageBtn">Track Page</button>

    <script type="module">
        import { AnalyticsBrowser } from 'https://cdn.jsdelivr.net/npm/@zixflow/analytics-next/+esm';
        
        const analytics = AnalyticsBrowser.load({ writeKey: 'your-zixflow-sdk-key' });
        
        // Track initial page view
        analytics.page('Vanilla JS Demo', {
            pageType: 'demo',
            framework: 'vanilla'
        });
        
        // Event handlers
        document.getElementById('trackBtn').addEventListener('click', () => {
            analytics.track('Button Clicked', {
                buttonId: 'trackBtn',
                page: 'demo'
            });
        });
        
        document.getElementById('identifyBtn').addEventListener('click', () => {
            analytics.identify('vanilla_user_123', {
                name: 'Vanilla User',
                email: 'vanilla@example.com'
            });
        });
        
        document.getElementById('pageBtn').addEventListener('click', () => {
            analytics.page('Custom Page View', {
                pageType: 'custom',
                timestamp: new Date().toISOString()
            });
        });
    </script>
</body>
</html>
```

#### ES6 Module Setup
```javascript
// main.js
import { AnalyticsBrowser } from '@zixflow/analytics-next';

const analytics = AnalyticsBrowser.load({ writeKey: 'your-zixflow-sdk-key' });

// Track application load
analytics.page('Application Loaded', {
  pageType: 'application',
  timestamp: new Date().toISOString()
});

// Export for use in other modules
export { analytics };

// Usage in other files
import { analytics } from './main.js';

export function handleUserAction() {
  analytics.track('User Action', {
    action: 'custom_action',
    timestamp: new Date().toISOString()
  });
}
```

## API Reference

### AnalyticsBrowser.load(settings)

Initialize the analytics browser with configuration settings.

#### Parameters
- `settings` (object): Configuration object
  - `writeKey` (string, required): Your analytics write key
  - `apiHost` (string, optional): Custom API host (defaults to 'events.zixflow.com/events/v1')

#### Returns
- Analytics instance with tracking methods

### Tracking Methods

#### analytics.track(eventName, properties)
Track a custom event.

```javascript
analytics.track('Purchase Completed', {
  amount: 99.99,
  currency: 'USD',
  product: 'premium_plan',
  userId: 'user_123'
});
```

#### analytics.page(pageName, properties)
Track a page view.

```javascript
analytics.page('Product Page', {
  pageType: 'product',
  productId: 'prod_123',
  category: 'electronics'
});
```

#### analytics.identify(userId, traits)
Identify a user with traits.

```javascript
analytics.identify('user_123', {
  name: 'John Doe',
  email: 'john@example.com',
  plan: 'premium',
  signupDate: '2024-01-01'
});
```

#### analytics.alias(previousId, userId)
Alias a user ID to a new ID.

```javascript
analytics.alias('anonymous_123', 'user_456');
```

#### analytics.group(groupId, traits)
Track group analytics.

```javascript
analytics.group('company_789', {
  name: 'Acme Corp',
  industry: 'technology',
  size: '100-500'
});
```

## Best Practices

### 1. Event Naming
Use consistent, descriptive event names:
```javascript
// Good
analytics.track('User Signed Up', { plan: 'premium' });
analytics.track('Product Viewed', { productId: 'prod_123' });

// Avoid
analytics.track('click', {});
analytics.track('event', {});
```

### 2. Property Structure
Include relevant context in event properties:
```javascript
analytics.track('Purchase Completed', {
  amount: 99.99,
  currency: 'USD',
  productId: 'prod_123',
  productName: 'Premium Plan',
  userId: 'user_123',
  source: 'homepage'
});
```

### 3. User Identification
Identify users as early as possible in their journey:
```javascript
// Identify user after login
analytics.identify(user.id, {
  name: user.name,
  email: user.email,
  plan: user.plan,
  signupDate: user.createdAt
});
```

### 4. Page Tracking
Track page views for navigation analytics:
```javascript
// Track page views on route changes
analytics.page('Product Details', {
  productId: 'prod_123',
  category: 'electronics',
  referrer: document.referrer
});
```

## Error Handling

The analytics wrapper includes built-in error handling, but you can add additional error handling:

```javascript
try {
  analytics.track('Important Event', { data: 'value' });
} catch (error) {
  console.error('Analytics tracking failed:', error);
  // Fallback tracking or error reporting
}
```

## Configuration Options

### Custom API Host
```javascript
const analytics = AnalyticsBrowser.load({
  writeKey: 'your-zixflow-sdk-key',
  apiHost: 'custom.events.domain.com/events/v1'
});
```

### Advanced Configuration
The package uses optimized default settings, but you can extend them if needed:

```javascript
const analytics = AnalyticsBrowser.load({
  writeKey: 'your-zixflow-sdk-key',
  // Additional settings will be merged with defaults
  cdnSettings: {
    // Custom CDN settings
  }
});
```

## Browser Support

This package supports all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## TypeScript Support

Full TypeScript definitions are included. The package exports types for better development experience:

```typescript
import { AnalyticsBrowser, AnalyticsBrowserSettings } from '@zixflow/analytics-next';

const settings: AnalyticsBrowserSettings = {
  writeKey: 'your-zixflow-sdk-key'
};

const analytics = AnalyticsBrowser.load(settings);
```

## Contributing

We welcome contributions! Please see our contributing guidelines for more information.

## License

MIT License - see LICENSE file for details.

## Support

For support and questions, please refer to our documentation or contact our support team. 