import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.js'),
      name: 'CvmCompV5Ui',
      formats: ['es', 'umd'],
      fileName: (format) => `cvm-comp-v5-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react/jsx-dev-runtime', 'react-dom', 'react-select', 'react-select/async', 'react-datepicker'],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'ReactJsxRuntime',
          'react/jsx-dev-runtime': 'ReactJsxDevRuntime',
          'react-dom': 'ReactDOM',
          'react-select': 'Select',
          'react-select/async': 'AsyncSelect',
          'react-datepicker': 'DatePicker',
        },
      },
    },
  },
});
