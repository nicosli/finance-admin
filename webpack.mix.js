let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js').extract(['vue','buefy']);
mix.sass('resources/assets/sass/app.scss', 'public/css');

mix.copy('node_modules/@fortawesome/fontawesome-free/webfonts', 'public/webfonts');

mix.browserSync({
   open: 'external',
   host: 'local.mayordomia.nicosli.com',
   proxy: 'local.mayordomia.nicosli.com',
   port: 8585
});

mix.disableNotifications();