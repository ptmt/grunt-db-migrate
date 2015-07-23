/*
 * grunt-db-migrate
 * https://github.com/unknownexception/grunt-db-migrate
 *
 * Copyright (c) 2013 @unknownecxeption, @GeekyEggo, @emschwartz
 * Licensed under the MIT license.
 */

/* global process */
module.exports = function (grunt) {
  'use strict';
  grunt.registerTask('migrate', 'Run db-migrate', function (arg1, arg2) {

    var options = this.options(),
      path = require('path'),
      done = this.async(),
      spawnOpts = {
        stdio: 'inherit'
      },
      args = [path.join(__dirname, '..', 'db-migrate-wrapper.js')]

    if (arg1)
      args.push(arg1);
    else
      args.push('up');

    if (arg2)
      args.push(arg2);

    var optionProps = Object.keys(options);
    optionProps.forEach(function (propName) {
      if (propName === 'env') return;
      args.push('--' + propName + '=' + options[propName]);
    });

    if (options.env) {
      spawnOpts.env = process.env;
      var envProps = Object.keys(options.env);
      envProps.forEach(function (envProp) {
        spawnOpts.env[envProp] = options.env[envProp];
      });
    }

    grunt.util.spawn({
        cmd: 'node',
        args: args,
        opts: spawnOpts
      },
      function (error) {
        if (error) {

          grunt.fail.fatal(error, 'fatal error');
        } else
          done();
      });
  });
};
