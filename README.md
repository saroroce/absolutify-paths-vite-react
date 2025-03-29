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
npm install absolutify-paths-vite --save-dev
```

## Usage

1. Import the plugin in your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import { absolutifyPaths } from 'absolutify-paths-vite';

export default defineConfig({
  plugins: [
    absolutifyPaths({
      strings: [
        // Example: converting relative path to absolute
        ['/wp-content/themes/your-theme/assets/', 'http://localhost:8080/']
      ],
      enforce: 'pre', // Plugin will run before other plugins
      apply: 'serve'  // Plugin will only work in development mode
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
import { absolutifyPaths } from 'absolutify-paths-vite';
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

## License

MIT 