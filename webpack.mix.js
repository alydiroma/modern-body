let mix = require('laravel-mix');

mix
.sass('src/assets/scss/main.scss', 'web/assets/css')
    .options({
        autoprefixer: {
            options: {
                overrideBrowserslist: [
                    'last 6 versions',
                ]
            }
        }
    })
.js('src/assets/js/main.js', 'web/assets/js/')
.js('src/assets/js/home.js', 'web/assets/js/')
.copyDirectory('src/assets/fonts', 'web/assets/fonts')
    .options({
        processCssUrls: false
    })
.copyDirectory('src/assets/icons', 'web/assets/icons')
    .options({
        processCssUrls: false
    });
