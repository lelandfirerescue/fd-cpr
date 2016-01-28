/*!
 * FD-CPR Gruntfile
 * christopher.watford@gmail.com
 */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  var fs = require('fs');
  var path = require('path');

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    less: {
      compile: {
        options: {
          strictMath: true,
          sourceMap: false,
          outputSourceFiles: true
        },
        src: ['components/bootstrap-3.3.0/less/bootstrap.less', 'css/fdcpr.less', 'css/fdcpr-grid.less'],
        dest: 'css/fdcpr.css'
      }
    },

    concat: {
      options: {
        stripBanners: false
      },
      iejs: {
        src: [
          'components/thirdparty-js/html5shiv-3.7.2.js',
          'components/thirdparty-js/respond-1.4.2.js'
        ],
        dest: 'js/ie-dist.js'
      },
      js: {
        src: [
          'components/thirdparty-js/jquery-2.1.1.js',
          'components/bootstrap-3.3.0/dist/js/bootstrap.min.js',
          'components/thirdparty-js/lazy-youtube.min.js'
        ],
        dest: 'js/dist.js'
      }/*,
      css: {
        src: [
          'components/bootstrap-3.3.0/dist/css/bootstrap.css',
          'css/fdcpr.css'
        ],
        dest: 'css/dist.css'
      }*/
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*',
        noAdvanced: true
      },
      minify: {
        src: 'css/dist.css',
        dest: 'css/dist.min.css'
      }
    },

    uglify: {
      dist: {
        src: 'components/thirdparty-js/lazy-youtube.js',
        dest: 'components/thirdparty-js/lazy-youtube.min.js'
      }
    },

  uncss: {
    dist: {
      options: {
        stylesheets: ['css/fdcpr.css'],
        ignore: [
          /press-play/,
          /press-pause/,
          /youtube/,
          /embed-responsive/,
          '.play',
          // bootstrap
          ".fade",
          ".fade.in",
          ".navbar-collapse.in",
          ".collapse",
          ".collapse.in",
          ".navbar-collapse",
          ".navbar-collapse.in",
          ".collapsing",
          /(#|\.)navbar(\-[a-zA-Z]+)?/,
          /(#|\.)dropdown(\-[a-zA-Z]+)?/,
          ".open > .dropdown-menu",
          ".open > a",
          // needed for the `<noscript>` warning; remove them when fixed in uncss
          ".alert-danger",
          ".visible-xs",
          ".noscript-warning",
          // currently only in a IE conditional so uncss doesn't see it
          ".close",
          ".alert-dismissible"
        ],
        ignoreSheets : [/fonts.googleapis/],
        report: 'min' // optional: include to report savings
      },
      files: {
        'css/dist.css': ['index.html', 'steps.html', 'faq.html', 'contact.html']
      }
    }
  }

  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['less:compile', 'uncss:dist', 'cssmin:minify']);

  // JS distribution task
  grunt.registerTask('js-min', ['uglify:dist']);
  grunt.registerTask('dist-js', ['concat:iejs', 'concat:js']);

  // Default task.
  grunt.registerTask('default', ['dist-css', 'dist-js']);
};

