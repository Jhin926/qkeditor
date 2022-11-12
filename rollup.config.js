import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';

const env = process.env.npm_lifecycle_event;
const output = env === 'build' ? 
    [
        { file: 'dist/qkeditor.esm.js', format: 'esm', name: 'QkEditor' },
        { file: 'dist/qkeditor.common.js', format: 'umd', name: 'QkEditor' },
    ]
    :
    [
        { file: 'docs/example.js', format: 'iife', name: 'QkEditor' }
    ];
export default {
    input: env === 'build' ? 'src/index.ts' : 'docs/App.tsx',
    output,
    plugins: [
        nodeResolve({
            extensions: ['.js', '.ts', 'tsx'],
            modulesOnly: true,
        }),
        babel({ babelHelpers: 'bundled', extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'] }),
    ],
};
