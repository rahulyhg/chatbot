myApp.directive('img', function ($compile, $parse) {
        return {
            restrict: 'E',
            replace: false,
            link: function ($scope, element, attrs) {
                var $element = $(element);
                if (!attrs.noloading) {
                    $element.after("<img src='img/loading.gif' class='loading' />");
                    var $loading = $element.next(".loading");
                    $element.load(function () {
                        $loading.remove();
                        $(this).addClass("doneLoading");
                    });
                } else {
                    $($element).addClass("doneLoading");
                }
            }
        };
    })

    .directive('hideOnScroll', function ($document) {
        return {
            restrict: 'EA',
            replace: false,
            link: function (scope, element, attr) {
                var $element = $(element);
                var lastScrollTop = 0;
                $(window).scroll(function (event) {
                    var st = $(this).scrollTop();
                    if (st > lastScrollTop) {
                        $(element).addClass('nav-up');
                    } else {
                        $(element).removeClass('nav-up');
                    }
                    lastScrollTop = st;
                });
            }
        };
    })


    .directive('fancybox', function ($document) {
        return {
            restrict: 'EA',
            replace: false,
            link: function (scope, element, attr) {
                var $element = $(element);
                var target;
                if (attr.rel) {
                    target = $("[rel='" + attr.rel + "']");
                } else {
                    target = element;
                }

                target.fancybox({
                    openEffect: 'fade',
                    closeEffect: 'fade',
                    closeBtn: true,
                    padding: 0,
                    helpers: {
                        media: {},
                        title: {
                            type: 'inside',
                            position: 'bottom'
                        },
                        //buttons   : {}
                    }
                });
            }
        };
    })

    .directive('autoHeight', function ($compile, $parse) {
        return {
            restrict: 'EA',
            replace: false,
            link: function ($scope, element, attrs) {
                var $element = $(element);
                var windowHeight = $(window).height();
                $element.css("min-height", windowHeight);
            }
        };
    })
    .directive('chatbotHeight', function ($compile, $parse) {
        return {
            restrict: 'EA',
            replace: false,
            link: function ($scope, element, attrs) {
                var $element = $(element);
                var windowHeight = $(window).height();
                var chatbotH = windowHeight - 53;
                //$element.css("min-height", chatbotH);
                $element.height(chatbotH);
                // var w = angular.element($window);
                // w.bind('chatbotHeight', function () {
                //     scope.$apply();
                // });
            }
        };
    })


    .directive('replace', function () {
        return {
            require: 'ngModel',
            scope: {
                regex: '@replace',
                with: '@with'
            },
            link: function (scope, element, attrs, model) {
                model.$parsers.push(function (val) {
                    if (!val) {
                        return;
                    }
                    var regex = new RegExp(scope.regex);
                    var replaced = val.replace(regex, scope.with);
                    if (replaced !== val) {
                        model.$setViewValue(replaced);
                        model.$render();
                    }
                    return replaced;
                });
            }
        };
    })
    
    .directive('validPasswordC', function() {
        return {
            require: 'ngModel',
            scope: {

              reference: '=validPasswordC'

            },
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue, $scope) {

                    var noMatch = viewValue != scope.reference
                    ctrl.$setValidity('noMatch', !noMatch);
                    return (noMatch)?noMatch:!noMatch;
                });

                scope.$watch("reference", function(value) {;
                    ctrl.$setValidity('noMatch', value === ctrl.$viewValue);

                });
            }
        }
    })
    .directive('parseUrl', function () {
        //var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;
        var urlPattern ="/^[a-zA-Z0-9]*$/";
        return {
            restrict: 'A',
            require: 'ngModel',
            replace: true,
            scope: {
                props: '=parseUrl',
                ngModel: '=ngModel'
            },
            link: function compile(scope, element, attrs, controller) {
                scope.$watch('ngModel', function (value) {
                    var html = value.replace(urlPattern, '<a target="' + scope.props.target + '" href="$&">$&</a>') + " | " + scope.props.otherProp;
                    element.html(html);
                });
            }
        };
    })
    .directive('noSpecialChar', function() {
        return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(inputValue) {
            if (inputValue == null)
                return ''
            cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
            if (cleanInputValue != inputValue) {
                modelCtrl.$setViewValue(cleanInputValue);
                modelCtrl.$render();
            }
            return cleanInputValue;
            });
        }
        }
    })
    .directive('processtree', function ($compile) {
        return {
            restrict: 'E',
            terminal: true,
            scope: { val: '=', parentData:'=' },
            link: function (scope, element, attrs) {
                var template = '<span>{{val.text}}</span>';
                template += '<button ng-click="deleteMe()" ng-show="val.text">delete</button>';

                if (angular.isArray(scope.val.items)) {
                    template += '<ul class="indent"><li ng-repeat="item in val.items"><tree val="item" parent-data="val.items"></tree></li></ul>';
                }
                // scope.deleteMe = function(index) {
                //     if(scope.parentData) {
                //         var itemIndex = scope.parentData.indexOf(scope.val);
                //         scope.parentData.splice(itemIndex,1);
                //     }
                //     scope.val = {};
                // };
                var newElement = angular.element(template);
                $compile(newElement)(scope);
                element.replaceWith(newElement);
            }
        }
    })
    myApp.directive('collection', function () {
        return {
            restrict: "E",
            replace: true,
            scope: {
                collection: '='
            },
            //template: "<ul><member ng-repeat='member in collection' member='member'></member></ul>"
            template: "<div class='processaccord' ng-repeat='processtext in collection'><p ng-if='processtext.key ===\"\" && processtext.value'></p></member></div>"
        }
    })
    myApp.directive('member', function ($compile) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                member: '='
            },
            template: "<li></li>",
            link: function (scope, element, attrs) {
                console.log(scope.member);
                if (angular.isArray(scope.member)) {
                    element.append("<collection collection='member'></collection>");
                    $compile(element.contents())(scope)
                }
                //else if(scope.member.)
            }
        }
    })
    myApp.directive('ngRightClick', function($parse) {
        return function(scope, element, attrs) {
            var fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function(event) {
                scope.$apply(function() {
                    event.preventDefault();
                    fn(scope, {
                        $event: event
                    });
                });
            });
        };
    })
    
;