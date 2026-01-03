import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import fs from 'fs';
import path from 'path';
import { minify } from 'csso';

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
      minimize: false,
      sourceMap: false,
      use: [['sass', { includePaths: ['src'] }]]
    }),
    {
      name: 'minify-css',
      writeBundle() {
        const dist = 'dist';
        const input = path.join(dist, 'svg-map.css');
        const output = path.join(dist, 'svg-map.min.css');
        const css = fs.readFileSync(input, 'utf8');
        const result = minify(css);
        fs.writeFileSync(output, result.css);
      }
    },

    // Legacy CSS pre 2.18.0
    {
      name: 'legacy-css-alias',
      writeBundle() {
        const dist = 'dist';
        fs.copyFileSync(`${dist}/svg-map.min.css`, `${dist}/svgMap.min.css`);
        fs.copyFileSync(`${dist}/svg-map.css`, `${dist}/svgMap.css`);
      }
    }
  ]
};
