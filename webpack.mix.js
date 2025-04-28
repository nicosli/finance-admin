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

mix.js('resources/assets/js/app.js', 'public/js')
   .vue({ version: 2 })
   .sass('resources/assets/sass/app.scss', 'public/css')
   .copy('node_modules/@fortawesome/fontawesome-free/webfonts', 'public/webfonts')
   .browserSync({
      proxy: 'laravel-nginx',
      host: 'localhost',
      port: 8080,
      open: false,
      files: [
         'resources/views/**/*.php',
         'resources/assets/js/**/*.js',
         'resources/assets/sass/**/*.scss',
         'public/js/**/*.js',
         'public/css/**/*.css'
      ]
   })
   .options({
      polling: true,
      usePolling: true,
      interval: 500
   })
   .version();

mix.disableNotifications();
