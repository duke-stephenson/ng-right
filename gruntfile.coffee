# @author john
# @version 9/20/15 6:16 AM


module.exports = (grunt) ->

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  paths =
    types:
      dev: ['ts/**/*.ts', '!ts/.baseDir.ts']
      ref: 'ts/refs.ts'

  tasks =

    clean:
      build: 'lib'
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

    bump:
      options:
        files: ['package.json']
        commit: true
        commitFiles: ['package.json']
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
        createTag: false
        push: false
        commitMessage: '%VERSION% bump'

    ts:
      dev:
        reference: '<%= types.ref %>'
        tsconfig: 'tsconfig.json'
        options:
          watch: 'ts'
      build:
        reference: '<%= types.ref %>'
        tsconfig: 'tsconfig.json'
      dist:
        tsconfig: 'tsconfig.json'
        out: 'dist/ng-right'


  grunt.initConfig grunt.util._.extend tasks, paths

  grunt.registerTask 'default', ['clean:build', 'ts:build', 'clean:dist', 'ts:dist']
