# Absolutify Paths Vite Plugin

🇬🇧 [English](README.md) | 🇷🇺 [Русский](README.ru.md)

A Vite plugin that helps solve Hot Module Replacement (HMR) issues when developing WordPress themes with Vite. The plugin automatically converts relative paths to absolute paths, which is necessary for HMR to work correctly in WordPress.

## The Problem

When developing WordPress themes with Vite, HMR may not work correctly because WordPress uses absolute paths to load resources, while Vite uses relative paths by default. This causes updates not to be applied properly.

## The Solution

This plugin automatically converts relative paths to absolute paths during development, allowing HMR to work correctly in WordPress.

## Features

- React components support
- Automatic path transformation in JSX/TSX files
- Correct handling of dynamic imports
- Support for CSS modules and other assets

## Installation

```bash
npm install absolutify-paths-vite-react
```

## Usage

1. Import the plugin in your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import { absolutifyPaths } from 'absolutify-paths-vite-react';

export default defineConfig({
  plugins: [
    absolutifyPaths({
      strings: [
        // Example: converting relative path to absolute
        ['/wp-content/themes/your-theme/assets/', 'http://localhost:8080/']
      ],
      enforce: 'pre', // Plugin will run before others
      apply: 'serve'  // Plugin will only run in development mode
    })
  ]
});
```

2. Configure plugin parameters:
   - `strings`: array of string pairs for replacement [source_string, target_string]
   - `enforce`: plugin execution order ('pre' | 'post' | undefined)
   - `apply`: when to apply the plugin ('serve' | 'build' | undefined)

## Example Configuration for WordPress Theme with React

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { absolutifyPaths } from 'absolutify-paths-vite-react';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    absolutifyPaths({
      strings: [
        // Replace with your paths
        ['/wp-content/themes/your-theme/', 'http://localhost:5173/'],
        ['/wp-content/themes/your-theme/assets/', 'http://localhost:5173/assets/']
      ],
      enforce: 'pre',
      apply: 'serve'
    })
  ],
  server: {
    port: 5173,
    hmr: {
      host: 'localhost'
    }
  }
});
```

## Example Usage with React Components

```tsx
// components/MyComponent.tsx
import { useState } from 'react';
import styles from './MyComponent.module.css';

export const MyComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.container}>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};
```

## WordPress Theme Configuration

To enable HMR in your WordPress theme, you need to add the following script to your theme's `header.php` file:

```php
<!-- React HMR -->
<script type="module">
    import RefreshRuntime from "http://localhost:3000/@react-refresh"
    RefreshRuntime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => (type) => type
    window.__vite_plugin_react_preamble_installed__ = true
</script>
<!-- /React HMR -->
```

This script is essential for React HMR to work properly in WordPress. It:
- Imports the React Refresh runtime from your Vite dev server
- Injects the necessary HMR hooks into the global window object
- Sets up the required React Refresh functions for component updates

Make sure to:
1. Place this script in the `<head>` section of your `header.php`
2. Update the `localhost:3000` URL to match your Vite dev server port
3. Keep the `wp_head()` function call before this script

## License

MIT 