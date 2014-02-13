/*
 * grunt-db-migrate
 * https://github.com/unknownexception/grunt-db-migrate
 *
 * Copyright (c) 2013 Dmitri Loktev
 * Licensed under the MIT license.
 */

/* global process */
module.exports = function (grunt) {
  'use strict';
  grunt.registerTask('migrate', 'Run db-migrate', function (arg1, arg2) {

    var options = this.options();
    var path = require('path');

    console.log(arg1, arg2);
    //var driver = options.driver;
    var done = this.async();

    var args = [path.resolve(process.cwd() + '/node_modules/db-migrate/bin/db-migrate')];

    if (arg1)
      args.push(arg1);
    else
      args.push('up');

    if (arg2)
      args.push(arg2);

    if (options.verbose)
      args.push('--verbose');

    if (options.dir)
      args.push('--migrations-dir=' + options.dir);

    var spawnOpts = {
      stdio: 'inherit'
    };

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