const fs=  require("fs");
const path = require('path');
const webpack= require("webpack");

// we will make a webpack entry out of every tw/tw*.js file
const tws= fs.readdirSync("./tw").filter(function(file){return path.parse(file).ext===".js" && path.parse(file).name.startsWith("tw");});

function makeEntryCB(acc, file){   // reducer for making a large object. entry  below needs to be an object
    return { ... acc, [path.parse(file).name]: './tw/'+file};     // we ... spread the current object, then add one more property
}

// make a HTML path for each TW entry. For example tw1.2.js will result in http://localhost:8080/tw1.2.html
// all such entries are based on a single HTML template /src/index.html
function makeHtmlCB(file){
    return new HtmlWebpackPlugin({
        filename: path.parse(file).name+".html",
        template: './src/index.html',
        chunks: [path.parse(file).name],
    });
}

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: tws.reduce(makeEntryCB, {test:"./test/index.js"}),   // all tw entries, plus the tests
    output: {
        path: __dirname +"/dist",
        publicPath: '/',
    },
    optimization: {
        splitChunks: {             // split the code coming from others (vendor) from our own code
            chunks: "all",
        },
    },
    plugins: [
        ...tws.map(makeHtmlCB),    // a HTML for each TW entry, map() produces an array, which we spread ...
        
        new HtmlWebpackPlugin({    // the test.html for tests, see the test entry above
            filename: "test.html",
            template: './test/index.html',
            chunks: ["test"],
        }),
        new webpack.SourceMapDevToolPlugin(    // the source map plugin, specifying "Debug here!" in the browser Devtools (chrome)
            {
                moduleFilenameTemplate: "[resource]",
                exclude:[/node_modules/, /webpack/],
                sourceRoot:"Debug here!"
            }),
        new webpack.DefinePlugin({           // globals neeeded by Vue
            __VUE_OPTIONS_API__:true,
            __VUE_PROD_DEVTOOLS__:true,
            TEST_PREFIX: fs.existsSync("./src/solved-utilities.js")?"\'solved-\'":"\'\'"
//            TEST_PREFIX: "\'\'"
        })      
    ],
    module: {
        rules: [
            {
                test: /\.?js$/,                   // for each .js file
                exclude: /node_modules/,          // except in node_modules 
                use: {
                    loader: "babel-loader",       // we use babel
                    options: {
                        presets: [['@babel/preset-env',{
                            "targets":  {
                                chrome:94        /* we set babel to generate code for an advanced browser
                                                    so that the code will change as little as possible.
                                                    This is not suitable for production because older browsers may not understand the code.
                                                    But the focus here is the lab.
                                                    */
                            }
                            }]],
                        "plugins": [
                            [
                                "@babel/transform-runtime", {  // babel can reuse some code to reduce generated code size
                                    "regenerator": true
                                }
                            ],
                            ["@babel/plugin-transform-react-jsx"]  // this transforms JSX into JS
                        ]
                    }
                }
            },
        ]
    },
    devtool: false,  // needed for the SourceMapDevToolPlugin
    mode:'development',
};


