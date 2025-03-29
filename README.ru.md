# Absolutify Paths Vite Plugin

🇬🇧 [English](README.md) | 🇷🇺 [Русский](README.ru.md)

Плагин для Vite, который помогает решить проблему с Hot Module Replacement (HMR) при разработке WordPress тем с использованием Vite. Плагин автоматически преобразует относительные пути в абсолютные, что необходимо для корректной работы HMR в WordPress.

## Проблема

При разработке WordPress тем с использованием Vite, HMR может работать некорректно из-за того, что WordPress использует абсолютные пути для загрузки ресурсов, в то время как Vite по умолчанию использует относительные пути. Это приводит к тому, что обновления не применяются корректно.

## Решение

Этот плагин автоматически преобразует относительные пути в абсолютные во время разработки, что позволяет HMR работать корректно в WordPress.

## Особенности

- Поддержка React компонентов
- Автоматическое преобразование путей в JSX/TSX файлах
- Корректная работа с динамическими импортами
- Поддержка CSS модулей и других ассетов

## Установка

```bash
npm install absolutify-paths-vite --save-dev
```

## Использование

1. Импортируйте плагин в ваш `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import { absolutifyPaths } from 'absolutify-paths-vite';

export default defineConfig({
  plugins: [
    absolutifyPaths({
      strings: [
        // Пример: преобразование относительного пути в абсолютный
        ['/wp-content/themes/your-theme/assets/', 'http://localhost:8080/']
      ],
      enforce: 'pre', // Плагин будет выполняться до других плагинов
      apply: 'serve'  // Плагин будет работать только в режиме разработки
    })
  ]
});
```

2. Настройте параметры плагина:
   - `strings`: массив пар строк для замены [исходная_строка, целевая_строка]
   - `enforce`: порядок выполнения плагина ('pre' | 'post' | undefined)
   - `apply`: когда применять плагин ('serve' | 'build' | undefined)

## Пример конфигурации для WordPress темы с React

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
        // Замените на ваши пути
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

## Пример использования с React компонентами

```tsx
// components/MyComponent.tsx
import { useState } from 'react';
import styles from './MyComponent.module.css';

export const MyComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.container}>
      <h1>Счетчик: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Увеличить
      </button>
    </div>
  );
};
```

## Лицензия

MIT 