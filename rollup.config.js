import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'

import pkg from './package.json'

export default {
  input: 'src/react-good-calendar/index.js',
  output: [
    {
      file: 'lib/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'lib/index.esm.js',
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    postcss({
      modules: true,
    }),
    url(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    resolve({
      preferBuiltins: true,
    }),
    commonjs({
      namedExports: {
        'node_modules/react/index.js': [
          'cloneElement',
          'Component',
          'createContext',
          'createElement',
          'useContext',
          'useMemo',
          'useReducer',
        ],
        'node_modules/react-is/index.js': [
          'ForwardRef',
          'isElement',
          'isValidElementType',
        ],
      },
    }),
  ],
}
