var App = angular.module('myApp', []);

// <canvas image="model.picture"></canvas>

App.directive('ngCanvas', function(){
  return {
    restrict: 'A',
    require: 'image',
    scope: {
      image: '@'
    },
    link: function(scope, el){
      var canvas = el[0];
      var ctx = canvas.getContext('2d');
      
      scope.$watch(scope.image, function(image){
        if(angular.isUndefined(image)) {
          return;
        }
        
        var img = new Image;
        
        img.onload = function() {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
        };
        
        img.src = image;
      });
    }
  };
});