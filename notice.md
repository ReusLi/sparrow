Hi, I have a config, which has two entry points, but they share the same "runtime", which is moved to a "manifest.js".
Basicly this is what worked in webpack 3:

{
    entry: {
        main: "./main.ts",
        vendor: ["babel-polyfill", "./vendor.ts"],
    },
    plugins: [
        // Move node_modules to vendor bundle.
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: (module) => {
                // This prevents stylesheet resources with the .css or .scss extension
                // from being moved from their original chunk to the vendor chunk.
                if (module.resource && /^.*\.(css|scss)$/.test(module.resource)) {
                    return false;
                }
                return module.context && module.context.indexOf("node_modules") !== -1;
            },
        }),
        // Now extract just the runtime code to the manifest file, to not screw up chaching.
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity,
        }),
    ],
}
This created 3 files (besides several dynamic imports): "main.js", "vendor.js" and "manifest.js".
If I try to achive same thing now, I'd do this:

{
    entry: {
        main: "./main.ts",
        vendor: ["babel-polyfill", "./vendor.ts"],
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: "initial",
            cacheGroups: {
                default: false,
                vendors: false,
            },
        },
    },
}
But it leaves me with "runtime-main.js", "runtime-vendor.js", "vendor.js" and "main.js".
Is it possible to somehow have only one runtime again?