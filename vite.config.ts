import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

const normalizeModuleId = (id: string) => id.replaceAll('\\', '/');

const isPackage = (id: string, packageName: string) => (
  id.includes(`/node_modules/${packageName}/`) ||
  id.endsWith(`/node_modules/${packageName}`)
);

const isAnyPackage = (id: string, packageNames: string[]) => packageNames.some(packageName => isPackage(id, packageName));

const pdfRuntimePackages = [
  '@noble/ciphers',
  'bidi-js',
  'brotli',
  'clone',
  'color-name',
  'color-string',
  'dfa',
  'emoji-regex-xs',
  'events',
  'fflate',
  'fontkit',
  'hsl-to-hex',
  'hsl-to-rgb-for-reals',
  'hyphen',
  'inherits',
  'jay-peg',
  'js-md5',
  'linebreak',
  'media-engine',
  'pako',
  'png-js',
  'postcss-value-parser',
  'queue',
  'restructure',
  'tiny-inflate',
  'unicode-properties',
  'unicode-trie',
  'yoga-layout',
];

const bufferPackages = [
  'base64-js',
  'buffer',
  'ieee754',
];

const lightweightSupportPackages = [
  '@swc/helpers',
  'fast-deep-equal',
  'invariant',
  'object-assign',
  'shallowequal',
  'tslib',
];

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GOOGLE_MAPS_PLATFORM_KEY': JSON.stringify(env.VITE_GOOGLE_MAPS_PLATFORM_KEY || env.GOOGLE_MAPS_PLATFORM_KEY || '')
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      // HMR is disabled in AI Studio to keep local audit sessions stable.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: false,
    },
    esbuild: {
      legalComments: 'none',
      pure: ['console.log', 'console.info', 'console.debug', 'console.trace'],
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
    },
    build: {
      target: 'es2022',
      sourcemap: true,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            const normalizedId = normalizeModuleId(id);

            if (normalizedId.includes('commonjsHelpers')) {
              return 'vendor-commonjs';
            }

            if (normalizedId.includes('__vite-browser-external')) {
              return 'vendor-pdf-runtime';
            }

            if (normalizedId.includes('node_modules')) {
              if (normalizedId.includes('firebase')) {
                return 'vendor-firebase';
              }
              if (isPackage(normalizedId, 'idb')) {
                return 'vendor-idb';
              }
              if (isAnyPackage(normalizedId, bufferPackages)) {
                return 'vendor-buffer';
              }
              if (isPackage(normalizedId, '@react-pdf')) {
                return 'vendor-react-pdf';
              }
              if (isAnyPackage(normalizedId, pdfRuntimePackages)) {
                return 'vendor-pdf-runtime';
              }
              if (isAnyPackage(normalizedId, lightweightSupportPackages)) {
                return 'vendor-support';
              }
              if (normalizedId.includes('qrcode.react')) {
                return 'vendor-qrcode';
              }
              if (normalizedId.includes('react-firebase-hooks')) {
                return 'vendor-react-firebase-hooks';
              }
              if (normalizedId.includes('@vis.gl') || normalizedId.includes('google-maps')) {
                return 'vendor-maps';
              }
              if (normalizedId.includes('lucide-react')) {
                return 'vendor-lucide';
              }
              if (normalizedId.includes('motion')) {
                return 'vendor-motion';
              }
              if (normalizedId.includes('react-router-dom') || normalizedId.includes('react-router') || normalizedId.includes('react-helmet-async')) {
                return 'vendor-router-helmet';
              }
              if (normalizedId.includes('react') || normalizedId.includes('react-dom') || normalizedId.includes('scheduler')) {
                return 'vendor-react-core';
              }
            }
          }
        }
      }
    }
  };
});
