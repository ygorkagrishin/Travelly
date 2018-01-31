var gulp = require( 'gulp' ),
    styl = require( 'gulp-stylus' ),
    maps = require( 'gulp-sourcemaps' ),
    plum = require( 'gulp-plumber' ),
    pref = require( 'gulp-autoprefixer' ),
    pug = require( 'gulp-pug' ),
    uglify = require( 'gulp-uglify' ),
    concat = require( 'gulp-concat' ),
    path = {
        src : {
            pug : 'src/pug/*.pug',
            styl : 'src/static/stylus/*.styl',
            fonts : 'src/static/fonts/**/*',
            images : 'src/static/image/**/*',
            scripts : 'src/static/scripts/*.js'
        },
        build : {
            pug : 'build/',
            styl : 'build/',
            fonts : 'build/fonts/',
            images : 'build/image/',
            scripts : 'build/'
        },
        watch : {
            pug : 'src/pug/**/*.pug',
            styl : 'src/static/stylus/**/**/**/*.styl',
            fonts : 'src/static/fonts/**/*',
            images : 'src/static/image/**/*',
            scripts : 'src/static/scripts/*.js'
        }
    }

gulp.task( 'pug:build', function () {
   return gulp.src( path.src.pug )
              .pipe( pug() ) 
              .pipe( gulp.dest( path.build.pug ) );
});

gulp.task( 'styl:build', function () {
    return gulp.src( path.src.styl )
               .pipe( maps.init() )
               .pipe( styl( { compress : true, 'include css' : true } ) )
               .pipe( plum() )
               .pipe( pref() )
               .pipe( maps.write() )
               .pipe( gulp.dest( path.build.styl ) )  
})

gulp.task( 'font:build', function () {
    return gulp.src( path.src.fonts )
               .pipe( gulp.dest( path.build.fonts ) )
})

gulp.task( 'image:build', function () {
    return gulp.src( path.src.images )
               .pipe( gulp.dest( path.build.images ) )
})

gulp.task( 'script:build', function () {
    return gulp.src( path.src.scripts )
               .pipe( uglify() )
               .pipe( concat( 'main.js' ) )
               .pipe( gulp.dest( path.build.scripts ) )
})

gulp.task( 'watch', function () {
    gulp.watch( path.watch.pug, gulp.parallel( 'pug:build' ) )
    gulp.watch( path.watch.styl, gulp.parallel( 'styl:build' ) )
    gulp.watch( path.watch.fonts, gulp.parallel( 'font:build' ) )
    gulp.watch( path.watch.images, gulp.parallel( 'image:build' ) )
    gulp.watch( path.watch.scripts, gulp.parallel( 'script:build' ) )
})

gulp.task( 'default', gulp.series( 'font:build', 'image:build', 'pug:build', 'styl:build', 'script:build', 'watch' ) )