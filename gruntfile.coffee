# @author john
# @version 9/20/15 6:16 AM


module.exports = (grunt) ->

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

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
          name: 'ng-right'
          main: 'js/index.d.ts'

    ts:
      options:
        emitDecoratorMetadata: true
        failOnTypeErrors: true
        fast: 'never'
      dev:
        options:
          noExternalResolve: true
          declaration: true
          target: 'es5'
          compile: true
          module: 'commonjs'
#          noEmit: true
          compiler: './node_modules/typescript/lib/tsc'
          fast: 'never'
          sourceMap: false

        files: [
          src: '<%= types.dev %>'
          dest: 'js'
        ]
#        outDir: 'js'
#        watch: 'ts'
        reference: '<%= types.ref %>'

  grunt.initConfig grunt.util._.extend tasks, paths

  grunt.registerTask 'default', ['clean', 'ts', 'dst_bundle']
