'use strict'

// var App = angular.module('myApp', []);
// <video ng-video-frame video="model.video" frame="model.frame" autoplay controls></video>

App.directive('ngVideoFrame', function() {
  return {
    restrict: 'A',
    scope: {
      video: '@',
      frame: '=',
    },
    link: function(scope, el) {
      var video = el[0];
      
      function getFrame() {
        var canvas, ctx;
        
        canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
        
        scope.frame = canvas.toDataURL();
      }
      
      
      scope.$watch(scope.video, function(file) {
        if (angular.isUndefined(file)) {
          video.src = URL.createObjectURL(file);
        } else {
          video.src = null;
        }
        el.load();
      });
      
      
      el.on('play', function() {
        scope.$apply(function() {
          getFrame();
        });
      });
      
      
      el.on('pause', function() {
        scope.$apply(function() {
          getFrame();
        });
      });
      
      
      el.bind('seeked', function() {
        scope.$apply(function() {
          getFrame();
        });
      });
    }
  };
});