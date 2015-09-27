# @author john
# @version 9/20/15 6:16 AM


module.exports = (grunt) ->
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  paths =
    types:
      ref: 'ts/refs.ts'

  tasks =

    clean:
      build: ['lib', 'dist']
      dist: 'ts/.baseDir.*'

    conventionalChangelog:
      options:
        changelogOpts:
          preset: 'angular'
        context: {}
        gitRawCommitsOpts: {}
        parserOpts: {}
        writerOpts: {}
      release:
        src: 'changelog.md'

    copy:
      build:
        src: 'typings/ng-right/ng-right.d.ts'
        dest: 'lib/ng-right.d.ts'

    bump:
      options:
        files: ['package.json']
        commit: true
        commitFiles: ['package.json']
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
        createTag: false
        push: false
        commitMessage: '%VERSION% bump'

    webpack:
      dist:
        entry: './lib/index.js'
        output:
          filename: 'dist/ng-right.js'

    ts:
      build:
        reference: '<%= types.ref %>'
        tsconfig: 'tsconfig.json'

      test:
        src: [
          'ng-right-tests.ts'
          'typings/**/*.ts'
        ]
        options:
          noImplicitAny: false
          experimentalDecorators: true
          module: 'commonjs'
          target: 'es5'
          noEmit: true
          sourceMap: false



  grunt.initConfig grunt.util._.extend tasks, paths

  grunt.registerTask 'build', ['clean:build', 'ts:build']
  grunt.registerTask 'default', ['clean:build', 'ts:build', 'clean:dist', 'webpack', 'copy:build']
