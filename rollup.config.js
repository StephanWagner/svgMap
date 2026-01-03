import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import fs from 'fs';
import path from 'path';

const name = 'svgMap';

export default {
  input: 'src/js/index.js',
  output: [
    // ESM
    {
      file: 'dist/index.js',
      format: 'es',
      sourcemap: true
    },
    // CommonJS
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
      exports: 'default'
    },
    // UMD (browser global)
    {
      file: 'dist/svg-map.umd.js',
      format: 'umd',
      name,
      sourcemap: true
    },
    {
      file: 'dist/svg-map.umd.min.js',
      format: 'umd',
      name,
      plugins: [
        terser({
          compress: true,
          mangle: true,
          format: {
            comments: false
          }
        })
      ]
    },
    // UMD legacy pre 2.18.0
    {
      file: 'dist/svgMap.js',
      format: 'umd',
      name,
      sourcemap: true
    },
    {
      file: 'dist/svgMap.min.js',
      format: 'umd',
      name,
      plugins: [
        terser({
          compress: true,
          mangle: true,
          format: {
            comments: false
          }
        })
      ]
    }
  ],
  plugins: [
    resolve(),
    postcss({
      extract: 'svg-map.css',
      minimize: true,
      sourceMap: true,
      use: [['sass', { includePaths: ['src'] }]]
    }),

    // Legacy CSS pre 2.18.0
    {
      name: 'legacy-css-alias',
      writeBundle() {
        const dist = 'dist';
        const src = path.join(dist, 'svg-map.css');

        const targets = ['svgMap.css', 'svgMap.min.css'];

        for (const file of targets) {
          fs.copyFileSync(src, path.join(dist, file));
        }
      }
    }
  ]
};
