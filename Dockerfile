FROM php:7.4-fpm

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim unzip git curl libzip-dev \
    && docker-php-ext-install pdo_mysql zip exif pcntl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
