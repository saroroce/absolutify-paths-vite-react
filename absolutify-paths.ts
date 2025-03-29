import { Plugin } from 'vite';
import { CustomPluginOptions } from 'rollup';
export const absolutifyPaths = (options: CustomPluginOptions = {}): Plugin => {
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

