/**
 * Created by anderson.santos on 21/06/2016.
 */
module.exports = function (grunt) {
    grunt.initConfig({
            options: {
                srcFiles: [
                    "src/NamespaceDeclares.js",
                    "src/InterfaceAndEvents.js",
                    "src/ActionsBarHelpers.js",
                    "src/RZActionsBarWidget.js"
                ],
                plugins:[
                    "src/plugins/ButtonActionRenderer/*.js"
                ]
            },
            concat: {
                dist: {
                    src: ['<%= options.srcFiles %>'],
                    dest: "dist/RZActionsBarWidget.js"
                }
            },
            uglify: {
                options: {
                    mangle: false
                },
                my_target: {
                    files: {
                        "dist/RZActionsBarWidget.min.js": ['dist/RZActionsBarWidget.js']
                    }
                },
                buttonactionrenderer_plugin: {
                    files: {
                        "dist/plugins/ButtonActionRenderer/ButtonActionRenderer.min.js": ['dist/plugins/ButtonActionRenderer/ButtonActionRenderer.js']
                    }
                }
            },
            copy:{
                ButtonActionRenderer_plugin:{
                    cwd: 'src/plugins/ButtonActionRenderer/',
                    src:'*.*',
                    dest:'dist/plugins/ButtonActionRenderer',
                    expand:true
                },
                manifest:{
                    src:'manifest.json',
                    dest:'dist/manifest.json'
                }
            }
        }
    );
// Plugins do Grunt
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('default', ['copy','concat', 'uglify']);


};