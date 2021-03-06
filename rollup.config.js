import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';

import pkg from './package.json';

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    postcss({
      modules: true
    }),
    url(),
    svgr(),
    babel(),
    resolve({
      preferBuiltins: true,
    }),
    commonjs({
      include: 'node_modules/**',
    })
  ],
  external: (id) => (
    external.includes(id)
    || id.match(/date-fns\//)
  ),
};
