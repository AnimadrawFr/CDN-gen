const path = require('path');

//Base Config for all projects
const baseConfig = {
    mode: 'development',
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
    },
};

/**
 * Get webpack config for a project
 * @param {string} projectFolder
 * @param {string} entryFile
 * @param {boolean} babel
 * @returns {object} configuration webpack
 */
function getConfig(projectFolder, entryFile, babel = false) {
    let res = { ...baseConfig };
    res.output = {
        path: path.resolve(__dirname, 'dist'),
        filename: `./${projectFolder}-final/${entryFile}.bundle.js`,
    };
    res.entry = `./projects/${projectFolder}/func/${entryFile}.js`;

    res.devServer = {
        contentBase: path.join(__dirname, 'projects/' + projectFolder),
        hot: true,
        publicPath: '/',
        inline: true,
        watchContentBase: true,
        open: true,
    };

    if (babel) {
        res.target = 'es5';
        res.module = {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
            ],
        };
    }

    return res;
}

//To setup a new config add here
const allprojects = {
    //parcours senior project config
    annuaire: getConfig('portfolio', 'app', false),
};

//module.exports = allprojects.annuaire;
//Build ALL
module.exports = Object.values(allprojects)
