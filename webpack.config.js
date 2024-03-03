const path = require('path');

module.exports = {
    entry: {
        classic: './Classic game/snake.ts',
        two_player: './2P_game/snake2P.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};