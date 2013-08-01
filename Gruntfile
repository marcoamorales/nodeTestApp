module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                force: true
            },
            node: {
                options: {
                    node: true
                },
                src: ['*.js', 'lib/**/*.js']
            },
            browser: {
                options: {
                    browser: true
                },
                src: ['app/scripts/**/*.js']
            }
        },
        csslint: {
            browser: {
                options: {
                    import: false
                },
                src: ['app/styles/**/*.css']
            }
        },
        requirejs: {
            scripts: {
                options: {
                    name: '../components/almond/almond',
                    include: 'main',
                    mainConfigFile: 'app/scripts/main.js',
                    out: 'public/<%= pkg.name %>-<%= pkg.version %>.min.js'
                }
            },
            styles: {
                options: {
                    cssIn: 'app/styles/main.css',
                    out: 'public/<%= pkg.name %>.css'
                }
            }
        },
        copy: {
            images: {
                cwd: 'app/images/',
                expand: true,
                src: ['**'],
                dest: 'public/images/'
            }
        },
        cssmin: {
            compress: {
                src: ['public/<%= pkg.name %>.css'],
                dest: 'public/<%= pkg.name %>-<%= pkg.version %>.min.css'
            }
        },
        clean: ['public'],
        regarde: {
            browserScripts: {
                files: ['app/scripts/**/*.js'],
                tasks: ['livereload', 'jshint:browser']
            },
            browserStyles: {
                files: ['app/styles/**/*.css'],
                tasks: ['livereload', 'csslint']
            },
            node: {
                files: ['lib/**/*.js', '*.js'],
                tasks: ['shell:restart', 'jshint:node']
            }
        },
        shell: {
            restart: {
                command: 'sudo restart nodeTestApp'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['livereload-start', 'regarde']);
    grunt.registerTask('lint', ['jshint', 'csslint']);
    grunt.registerTask('optimize', ['clean', 'requirejs', 'copy', 'cssmin']);
};