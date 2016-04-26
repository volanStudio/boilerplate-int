module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    connect: {
      server: {
        options: {
          port: 8080,
          livereload: true
        }
      }
    },

    // Sass to CSS
    sass: {
      app: {
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['*.scss'],
          dest: 'css',
          ext: '.css'
        }]
      },
      options: {
        sourceMap: false,
        outputStyle: 'uncompressed',
        imagePath: "../",
        includePaths: [
          require('path').dirname(require.resolve('normalize.css'))
        ]
      }
    },

    watch: {
      sass: {
        files: ['scss/{,*/}*.{scss,sass}', '*.html'],
        tasks: ['sass', 'postcss']
      },
      options: {
        port: 8080,
        livereload: true,
        spawn: true
      }
    },

    postcss: {
      options: {
        diff: true,
        map: false,
        processors: [
          require('autoprefixer')({browsers: ['last 10 versions']})
        ]
      },
      dist: {
        src: 'css/*.css',
        dest: 'css/prefixed.css'
      }
    },

    cssnano: {
  		options: {
  			sourcemap: false
  		},
  		dist: {
  			files: {
  				'css/main.css': 'css/main.css'
  			}
  		}
  	},

    open : {
      dev : {
        path: 'http://localhost:8080/',
        app: 'Google Chrome'
      }
    }

  });

  // Loads Grunt Tasks
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-cssnano');
  grunt.loadNpmTasks('grunt-open');

  // Default task(s).
  grunt.registerTask('default', ['connect', 'sass', 'postcss', 'open', 'watch']);

};
