import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss'

const env = process.env.npm_lifecycle_event;
const output = env === 'build' ?
    [
        { file: 'dist/qkeditor.esm.js', format: 'esm', name: 'QkEditor' },
        { file: 'dist/qkeditor.common.js', format: 'umd', name: 'QkEditor' },
    ]
    :
    [
        { file: 'dev/example.js', format: 'iife', name: 'QkEditor' }
    ];
export default {
    input: 'src/index.js',
    output,
    plugins: [
        postcss(),
        image(),
        nodeResolve({
            extensions: ['.js'],
            modulesOnly: true,
        }),
        babel({ babelHelpers: 'bundled', extensions: ['.js'] }),
    ],
};
