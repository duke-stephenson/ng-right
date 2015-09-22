# @author john
# @version 9/20/15 6:16 AM


module.exports = (grunt) ->
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  paths =
    types:
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
      build:
        reference: '<%= types.ref %>'
        tsconfig: 'tsconfig.json'


  grunt.initConfig grunt.util._.extend tasks, paths

  grunt.registerTask 'build', ['clean:build', 'ts:build']
  grunt.registerTask 'default', ['clean:build', 'ts:build', 'clean:dist']
