const { dest, src, watch, task, parallel, series } = require("gulp"),
    browserSync = require("browser-sync"),

    { sassAsync } = require("gulp5-sass-plugin"),
    cleanCSS = require('gulp-clean-css'),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    remane = require('gulp-rename'),  
    replace = require('gulp-replace'), 
    clean = require('gulp-clean');


// Подключаем Browser Sync
task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

// Перезапустить Browser Sync для app/*.html
task('html', function () {
    return src('app/*.html')
        .pipe(browserSync.reload({stream: true}));
});


task('sass', function () {
    return src('app/sass/**/*.+(scss|sass)', { sourcemaps: true })
        .pipe(sassAsync({ outputStyle: 'expanded' }))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(dest('app/css', { sourcemaps: true }))
        .pipe(browserSync.reload({ stream: true }));
});


//----------------
task('clean-prod', function () {
    return src('dist', {read: false})
        .pipe(clean());
});

task('css-prod', function () {
    return src('app/sass/**/*.+(scss|sass)')
        .pipe(sassAsync({ outputStyle: 'expanded' }))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(cleanCSS())
        .pipe(remane({suffix: '.min'}))
        .pipe(dest('dist/css'));
});

task('html-prod', function () {
    return src('app/*.html')
        .pipe(replace('style.css', 'style.min.css'))
        .pipe(dest('dist'));
});

// Переносим на продакшн (dist): svg, img, fonts, jquery
task('copy-prod', function (done) {

    var buildImg = src('app/img/**/*')
        .pipe(dest('dist/img'));

    var buildFonts = src('app/fonts/**/*')
        .pipe(dest('dist/fonts'));

    var buildFiles = src('app/*.+(xml|txt)')
        .pipe(dest('dist'));

    done();
});


task('watch', function () {
    watch('app/sass/**/*.+(scss|sass)', parallel('sass'));
    watch('app/*.html', parallel('html'));
});

task('default', parallel('html', 'sass','browser-sync', 'watch'));  //  Запускаем задачи в режиме разработки командой gulp
task('build', series('clean-prod','css-prod','html-prod','copy-prod'));   //  Собираем проект для продакшена командой gulp build