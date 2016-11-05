(function() {
    'use strict';
    angular.module('kylinno.angular', [])
        .directive('pageLoading',pageLoading)
        .directive('spinnerLoading', spinnerLoading)
        .directive('imgLoading', imgLoading)
        .run( [ '$templateCache' , function( $templateCache ) {
            var template = '<div  ng-show="showMe" style = "padding-top: 50%;background-repeat: no-repeat;background-position:center center;">'+
                '</div>' ;
            $templateCache.put( 'preload-page.htm' , template );

        }])
    ;

    pageLoading.$inject = ['$templateCache'];
    function pageLoading($templateCache) {

        return {
            restrict: 'E',
            scope:{
                isLoading:'@',
                preloadBgImage :'@'
            },
            templateUrl: 'preload-page.htm',
            link: function (scope, elem, attrs) {
                scope.$watch('isLoading', function watchIsLoading(newVal,oldVal) {
                    scope.showMe = JSON.parse(newVal);
                });

                scope.click = function(){
                    scope.showMe = false;
                }
                //var bgImage = attrs.preloadBgImage;
                if(scope.preloadBgImage != undefined){
                    var child = elem.find('div');
                    child.css({
                        'background-image': 'url("' + scope.preloadBgImage + '")'
                    });
                }

            }
        }
    }

    spinnerLoading.$inject = [];
    function spinnerLoading() {
        return {
            restrict: 'A',
            link: function spinnerLoadLink(scope, elem, attrs) {
                scope.$watch('ngSrc', function watchNgSrc() {
                    elem.hide();
                    elem.after('<i class="fa fa-spinner fa-lg fa-spin"></i>');  // add spinner
                });
                elem.on('load', function onLoad() {
                    elem.show();
                    elem.next('i.fa-spinner').remove(); // remove spinner
                });
            }
        }
    }


    imgLoading.$inject = [];
    function imgLoading() {
        return {
            restrict: 'E',
            template: '<div/>',
            transclude: false,
            replace: true,
            scope: {
                imgSrc: '@',
                spinnerSrc: '@'
            },
            link: function (scope, element, attrs) {

                setHeight();

                var img = angular.element(new Image());

                var unbind1 = img.on('load', function (evt) {
                    stopLoadingCSS();
                });

                var unbind2 = img.on('error', function (evt) {
                    element.removeClass(attrs.spinnerClass);
                });


                img.attr('src', attrs.imgSrc);

                startLoadingCSS();
                element.append(img);
                element.addClass(attrs.imgLoadingClass);

                scope.$on('destroy', function () {
                    unbind1();
                    unbind2();

                });


                function startLoadingCSS() {
                    img.css({ visibility: 'hidden' });
                    element.addClass(attrs.spinnerClass);
                }

                function stopLoadingCSS() {
                    img.css({visibility: 'visible'});
                    element.removeClass(attrs.spinnerClass);
                }

                function setHeight() {
                    var w = element.prop('offsetWidth');
                    var h = attrs.heightMultiplier * w;
                    if (w && h) {
                        element.css('height', h + 'px');
                    }
                }
            }
        };
    }
})()