# @author john
# @version 9/20/15 6:16 AM


module.exports = (grunt) ->

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  paths =
    types:
      dev: 'src/**/*.ts'
      ref: 'src/refs.d.ts'

  tasks =
    ts:
      dev:
        options:
          fast: 'never'
        tsconfig: 'tsconfig.json'
        watch: '.'
        reference: '<%= types.ref %>'

  grunt.initConfig grunt.util._.extend tasks, paths
