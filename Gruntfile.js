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
          'components/bootstrap-3.3.0/dist/js/bootstrap.min.js'
        ],
        dest: 'js/dist.js'
      },
      css: {
        src: [
          'components/bootstrap-3.3.0/dist/css/bootstrap.css',
          'css/index.css'
        ],
        dest: 'css/dist.css'
      }
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
    }
    
  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['concat:css', 'cssmin:minify']);

  // JS distribution task  
  grunt.registerTask('dist-js', ['concat:iejs', 'concat:js']);

  // Default task.
  grunt.registerTask('default', ['dist-css', 'dist-js']);
};

