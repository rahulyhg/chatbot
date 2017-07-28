// Link all the JS Docs here
var myApp = angular.module('myApp', [
    'ui.router',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
    'angular-flexslider',
    'ui.swiper',
    'angularPromiseButtons',
    'toastr',
    'ngCookies',
    'ngResource',
]);
//angular.module('manage', ['ngResource']);
// Define all the routes below
myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider,$resourceProvider) {
    var tempateURL = "views/template/template.html"; //Default Template URL
    $resourceProvider.defaults.stripTrailingSlashes = false;
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: tempateURL,
            controller: 'HomeCtrl'
        })
        .state('login', {
            url: "/login",
            templateUrl: tempateURL,
            controller: 'LoginCtrl'
        })
        .state('forgotpassword', {
            url: "/forgotpassword/:id",
            templateUrl: tempateURL,
            controller: 'ForgotPasswordCtrl'
        })
        .state('form', {
            url: "/form",
            templateUrl: tempateURL,
            controller: 'FormCtrl'
        })
        .state('grid', {
            url: "/grid",
            templateUrl: tempateURL,
            controller: 'GridCtrl'
        });
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(isproduction);
});

/*var xhRequest = new XMLHttpRequest();
xhRequest.open("GET", "http://localhost:8080", false);
xhRequest.send(null);

myApp.constant("CSRF_TOKEN", xhRequest.responseText);
myApp.run(['$http', 'CSRF_TOKEN', function($http, CSRF_TOKEN) {    
    $http.defaults.headers.common['X-Csrf-Token'] = CSRF_TOKEN;
}]);*/


myApp.run(['$http','$cookies', function run(  $http, $cookies ){
    // For CSRF token compatibility with Django
    
    $http.defaults.xsrfCookieName = 'csrftoken';
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    //$http.defaults.headers.post['X-CSRFToken'] = $cookies.get('csrftoken');
    //** django urls loves trailling slashes which angularjs removes by default.
    //$resourceProvider.defaults.stripTrailingSlashes = false;

}])
// For Language JS
myApp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});

