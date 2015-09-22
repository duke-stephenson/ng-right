# @author john
# @version 9/20/15 6:16 AM


module.exports = (grunt) ->

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)
  grunt.loadNpmTasks 'dts-generator'

  paths =
    types:
      dev: ['ts/**/*.ts', '!ts/.baseDir.ts']
      ref: 'ts/refs.ts'

  tasks =

    clean: 'js'

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

    dts_bundle:
      build:
        options:
          externals: true
          name: 'ng-right'
          main: 'js/index.d.ts'
          out: '../ng-right/ng-right.d.ts'

    ts:
      dev:
        options:
          tsconfig: 'tsconfig.json'
#        watch: 'ts'
        reference: '<%= types.ref %>'

  grunt.initConfig grunt.util._.extend tasks, paths

  grunt.registerTask 'default', ['clean', 'ts', 'dts_bundle']
