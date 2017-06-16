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
                    "src/plugins/ActionRenderers/*.js",
                    "src/RZActionsBarWidget.js"
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
                }
            }
        }
    );
// Plugins do Grunt
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');


    grunt.registerTask('default', ['concat', 'uglify']);


};