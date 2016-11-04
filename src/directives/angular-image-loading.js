(function() {
    'use strict';
    angular.module('kylinno.angular', [])
        .directive('imgLoading', function () {
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
        });
})()