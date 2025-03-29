import { Plugin } from 'vite';
import { CustomPluginOptions } from 'rollup';

interface AbsolutifyPathsOptions extends CustomPluginOptions {
    strings?: [string, string][];
    enforce?: 'pre' | 'post';
    apply?: 'serve' | 'build';
}

export const absolutifyPaths = (options: AbsolutifyPathsOptions = {}): Plugin => {
    const { strings = [], enforce = 'pre', apply = 'serve' } = options;
    return {
        name: 'absolutify-paths',
        enforce: enforce,
        apply: apply,
        transform: (code: string, id: string) => {
            let transformedCode = code;
            strings.forEach((str) => {
                if (code.includes(str[0])) {
                    transformedCode = transformedCode.split(str[0]).join(str[1]);
                }
            });
            return {
                code: transformedCode,
                map: null
            };
        },
    };
};

