// Pull in the global config file which has all the paths and other config bits
// this thing uses
var paths  = require( '../config' ).paths.styles;

// Styles /////////////////////////////////////////////////////////////////////
// Compile SASS styles and minimize.
module.exports = function ( gulp, plugins ) {
  return function () {
    return gulp.src( paths.sassMain )
      .pipe( plugins.plumber({errorHandler: plugins.notify.onError("Error: <%= error.message %>")}))
      .pipe( plugins.sourcemaps.init() )
      .pipe( plugins.sass() )
      .pipe( plugins.autoprefixer({
        browsers: [ 'last 4 versions' ],
        remove: false
      }))
      .pipe( plugins.sourcemaps.write() )
      .pipe( plugins.plumber.stop() )
      .pipe( gulp.dest( paths.styles ))
      .pipe( plugins.minifyCss() )
      .pipe( plugins.rename({ extname: '.min.css' }))
      .pipe( gulp.dest( paths.styles ));
  };
};
