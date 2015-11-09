'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt, {scope: ['devDependencies']});

  grunt.initConfig({
    pkg: require('./package.json'),
    eslint: {
      options: {
        configFile: './.eslintrc'
      },
      Gruntfile: ['./Gruntfile.js'],
      egress: ['./index.js']
    },
    watch: {
      egress: {
        files: ['./index.js'],
        tasks: ['eslint:egress'],
        options: {
          spawn: true
        }
      }
    }
  });

  grunt.registerTask('default', ['eslint', 'watch']);
  grunt.registerTask('ci', ['eslint']);
};
