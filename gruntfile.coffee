# @author john
# @version 9/20/15 6:16 AM


module.exports = (grunt) ->

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  paths =
    types:
      dev: 'ts/**/*.ts'
      ref: 'ts/refs.ts'

  tasks =
    ts:
      options:
        emitDecoratorMetadata: true
        failOnTypeErrors: true
      dev:
        options:
          declaration: true
          target: 'es5'
          compile: true
          noEmit: true
          compiler: './node_modules/typescript/lib/tsc'
          fast: 'never'

        watch: 'ts'
        src: '<%= types.dev %>'
        reference: '<%= types.ref %>'

  grunt.initConfig grunt.util._.extend tasks, paths
