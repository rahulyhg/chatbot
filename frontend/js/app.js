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
    'ngIdle',
    'app.directives',
    'voiceRss',
    'jlareau.bowser',
    // 'angular-intro'
]);
//angular.module('manage', ['ngResource']);
// Define all the routes below
myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider,$resourceProvider,IdleProvider,ttsProvider,$qProvider) {
    var tempateURL = "views/template/template.html"; //Default Template URL
    $resourceProvider.defaults.stripTrailingSlashes = false;
    // $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    // $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    // $httpProvider.defaults.withCredentials = true
    // for http request with session
    //$httpProvider.defaults.withCredentials = false;
    ttsProvider.setSettings({ key: '5a1cc1a178c24b89ba23fd6e3b1bb6c5' });
    $qProvider.errorOnUnhandledRejections(false);
    IdleProvider.idle(10*60); // 10 minutes idle
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: tempateURL,
            controller: 'HomeCtrl'
        })
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: tempateURL,
            controller: 'DashboardCtrl'
        })
        .state('dashboard2', {
            url: "/dashboard2",
            templateUrl: tempateURL,
            controller: 'Dashboard2Ctrl'
        })
        .state('dashboard3', {
            url: "/dashboard3",
            templateUrl: tempateURL,
            controller: 'Dashboard3Ctrl'
        })
        .state('agentdashboard', {
            url: "/agentdashboard",
            templateUrl: tempateURL,
            controller: 'AgentdashboardCtrl'
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


myApp.run(['$http','$cookies','beforeUnload','$document','$rootScope','Idle','bowser','Menuservice','$timeout', function run(  $http, $cookies,beforeUnload,$document,$rootScope,Idle,bowser,Menuservice,$timeout ){
    // For CSRF token compatibility with Django
    
    //$http.defaults.xsrfCookieName = 'csrftoken';
    //$http.defaults.xsrfHeaderName = 'X-CSRFToken';
    //$http.defaults.headers.post['X-CSRFToken'] = $cookies.get('csrftoken');



     //return function(scope, elm, attrs) {
    if ( bowser.msie )
        $rootScope.browser = "msie";
    if ( bowser.firefox )
        $rootScope.browser = "firefox";
    if ( bowser.chrome )
        $rootScope.browser = "chrome";
    if ( bowser.safari )
        $rootScope.browser = "safari";
    if ( bowser.opera )
        $rootScope.browser = "opera";
    if ( bowser.android )
        $rootScope.browser = "android"; //native
    if ( bowser.ios )
        $rootScope.browser = "ios"; //native
    if ( bowser.samsungBrowser )
        $rootScope.browser = "samsungBrowser"; //native
    if ( bowser.msedge )
        $rootScope.browser = "msedge";
    
    $rootScope.transcript="";
    $rootScope.tabvalue={};
    $rootScope.rotated = false;

    $(document).on('click', '.chat-body .changedthbg', function(){ 
        var stage = $(this).attr("data-bgstage");
        $(".stage"+stage).css('background-color','#eee');
        $(".stage"+stage).css('color','#1e90ff');
        $(".stage"+stage+' .lefticon').hide();
        $(this).css('background-color', '#003366');
        $(this).css('color', '#fff');
        $(this).find(".lefticon").show();
    });     
    $(document).on('click', '.toggler', function(){ 
        $(this).parent().children('ul.tree').toggle(300);
        $(this).children().find('.triangle').toggleClass('glyphicon-triangle-bottom').toggleClass('glyphicon-triangle-right');
        //return false;
    });
    $(document).on('click', '#myTabs a', function(){ 
        e.preventDefault();
        $(this).tab('show');
    });
    $(document).on('click', '.section_last', function(){ 
    //$(".section_last").click(function(){
        var nodevalue=$(this).attr("data-value");
        Menuservice.create_tabs(nodevalue);
        
    });
    // $(function(){

    //     $('#slide-submenu').on('click',function() {			        
    //         $(this).closest('.list-group').fadeOut('slide',function(){
    //             $('.mini-submenu').fadeIn();	
    //         });
            
    //     });

    //     $('.mini-submenu').on('click',function(){		
    //         $(this).next('.list-group').toggle('slide');
    //         //$('.mini-submenu').hide();
    //     })
    // });
    
    // $('.mini-submenu').on('click',function(){		
    //     console.log("clicked");
    //     $('.list-group').toggle('slide');
    //     //$('.mini-submenu').hide();
    // });
    angular.element(document).ready(function () {
        // $timeout(function(){
        //     // $('.c-hamburger span').css("transform", "rotate(90deg)");				
        //     // $('.c-hamburger span').css("transition", "transform 1.2s ease");
        //     // $(".c-hamburger").animate({'background-color': '#FF0000'}, 'fast');
        //     $('.list-group').toggle('slide');
        //     $rootScope.rotated = true;
        //     $('.expandable').removeClass('col-lg-9').addClass('col-lg-12');
        //     $('.expandable2').removeClass('col-lg-5').addClass('col-lg-8');
            
        // },1000);
        

        $(document).on('click', '#address_change', function(){ 
            $rootScope.openContentModal('Address_Change');
        });
        $(document).on('click', '#dormant_activation', function(){ 
            $rootScope.openContentModal('Dormant_Activation');
        });
        $(document).on('click', '#verify_seeding_info', function(){ 
            $rootScope.openContentModal('verify_seeding_info');
        });
        $(document).on('click', '.name_mismatch_table', function(){ 
            $rootScope.openContentModal('name_mismatch_table');
        });
        

        
        
    });   
    $(document).on('click', '.faqques a', function(){ 
        $(this).parent().parent().parent().find('.faqans').slideToggle();
    });
    $rootScope.seeallTopic = function() {
        $("#topic").text("");
        $("#topiclist li").each(function(){
            
            
            $(this).show();
            $(this).children("a").find().show();
            if($(this).find('ul.tree').is(':visible')) {
                $(this).find('ul.tree').slideToggle(300);
                $(this).children("a").find('.triangle').toggleClass('glyphicon-triangle-bottom').toggleClass('glyphicon-triangle-right');
            }
            // else
            // {
            //     $(this).parent().find('ul.tree').toggle(300);
            //     $(this).parent().children("a").find('.triangle').toggleClass('glyphicon-triangle-bottom').toggleClass('glyphicon-triangle-right');
            // }
            
        });
        // $("#topiclist li").parent().find('ul.tree').toggle(300);
        // $("#topiclist li").parent().children("a").find('.triangle').toggleClass('glyphicon-triangle-bottom').toggleClass('glyphicon-triangle-right');
        // $("#topiclist li").show();
        $(".searchTerm").val("");
    };
    $(document).on('click', '.c-hamburger', function(){ 
    //$('.c-hamburger').click(function(){
        //console.log("menu click");
        // if($rootScope.rotated == false) 
        // {
        //     $('.c-hamburger span').css("transform", "rotate(90deg)");				
        //     $('.c-hamburger span').css("transition", "transform 1.2s ease");
        //     $(this).animate({'background-color': '#FF0000'}, 'fast');
        //     //$('.list-group').show("slide", { direction: "left" }, 1000);
        //     $('.list-group').toggle('slide');
        //     $rootScope.rotated = true;
        //     $('.expandable').removeClass('col-lg-9').addClass('col-lg-12');
        //     $('.expandable2').removeClass('col-lg-5').addClass('col-lg-8');
        // }
        // else
        {	
            $rootScope.rotateoutmenu();
        }
        
    });
    $rootScope.rotateoutmenu = function() {
        // if($rootScope.rotated)
        // {
        //     $timeout(function(){
        //         $('.expandable').removeClass('col-lg-12').addClass('col-lg-9');
        //         $('.expandable2').removeClass('col-lg-8').addClass('col-lg-5');
        //         $('.c-hamburger span').css("transform", "rotate(0deg)");				
        //         $('.c-hamburger span').css("transition", "transform 1.2s ease");
        //         $(".c-hamburger").animate({'background-color': '#003366'}, 'fast');
        //         //$('.list-group').hide("slide", { direction: "left" }, 1000);
        //         $('.list-group').toggle('slide');
        //         $rootScope.rotated = false;
        //     });
        // }
        // $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
            $("#nav-icon1").toggleClass('open');
        // });
        if($(".template.content").find('.expandable2').length == 1)
        {
           
            if($(".expandable2").hasClass('col-lg-8'))
            {
                $timeout(function(){
                    $('.expandable').removeClass('col-lg-12').addClass('col-lg-9');
                    $('.expandable2').removeClass('col-lg-8').addClass('col-lg-5');
                    // $('.c-hamburger span').css("transform", "rotate(0deg)");				
                    // $('.c-hamburger span').css("transition", "transform 1.2s ease");
                    //$(".c-hamburger").animate({'background-color': '#003366'}, 'fast');
                    $('.list-group').toggle('slide');
                    
                    $rootScope.rotated = true;
                });
            }
            else {
                $timeout(function(){
                    $('.expandable').removeClass('col-lg-9').addClass('col-lg-12');
                    $('.expandable2').removeClass('col-lg-5').addClass('col-lg-8');

                    // $('.c-hamburger span').css("transform", "rotate(90deg)");				
                    // $('.c-hamburger span').css("transition", "transform 1.2s ease");
                    //$(".c-hamburger").animate({'background-color': '#FF0000'}, 'fast');

                    $('.list-group').toggle('slide');
                    $rootScope.rotated = false;    
                });
                
                
            }
        }
        else if($(".template.content").find('.expandable').length == 1)
        {
            if($(".expandable").hasClass('col-lg-12'))
            {
                $timeout(function(){
                    $('.expandable').removeClass('col-lg-12').addClass('col-lg-9');
                    // $('.c-hamburger span').css("transform", "rotate(0deg)");				
                    // $('.c-hamburger span').css("transition", "transform 1.2s ease");
                    // $(".c-hamburger").animate({'background-color': '#003366'}, 'fast');
                    $('.list-group').toggle('slide');
                    $rootScope.rotated = false;
                });
            }
            else {
                $timeout(function(){
                    $('.expandable').removeClass('col-lg-9').addClass('col-lg-12');
                    
                    // $('.c-hamburger span').css("transform", "rotate(90deg)");				
                    // $('.c-hamburger span').css("transition", "transform 1.2s ease");
                    // $(".c-hamburger").animate({'background-color': '#FF0000'}, 'fast');

                    $('.list-group').toggle('slide');
                    $rootScope.rotated = false;    
                });
                
                
            }
        }
    };
         Idle.watch();
        $document.on("keydown", function(e) {
            if(e.ctrlKey && (e.key == "p" || e.charCode == 16 || e.charCode == 112 || e.keyCode == 80) ){
                //alert("Please use the Print PDF button below for a better rendering on the document");
                //e.cancelBubble = true;
                e.preventDefault();
                window.stop(); // Works in all browsers but IE    
                document.execCommand("Stop"); // Works in IE
                return false; // Don't even know why it's here. Does nothing.  
            }  
            else if(e.ctrlKey && (e.which == 16 || e.keyCode == 73))
            {
                e.preventDefault();
                window.stop(); // Works in all browsers but IE    
                document.execCommand("Stop"); // Works in IE
                return false; // Don't even know why it's here. Does nothing.  
            }
            else if(e.ctrlKey && (e.which == 67 ))
            {
                e.preventDefault();
                window.stop(); // Works in all browsers but IE    
                document.execCommand("Stop"); // Works in IE
                return false; // Don't even know why it's here. Does nothing.  
            }
            else if(e.ctrlKey && (e.which == 85 ))
            {
                e.preventDefault();
                window.stop(); // Works in all browsers but IE    
                document.execCommand("Stop"); // Works in IE
                return false; // Don't even know why it's here. Does nothing.  
            }
            else if((e.which == 44 ))
            {
                e.preventDefault();
                window.stop(); // Works in all browsers but IE    
                document.execCommand("Stop"); // Works in IE
                return false; // Don't even know why it's here. Does nothing.  
            }
            if(e.which === 123){
                e.preventDefault();
                window.stop(); // Works in all browsers but IE    
                document.execCommand("Stop"); // Works in IE
                return false; // Don't even know why it's here. Does nothing.  
            }
        });
        $document.on("keyup", function(e) {
            if((e.keyCode == 44 ))
            {
                e.preventDefault();
                window.stop(); // Works in all browsers but IE    
                document.execCommand("Stop"); // Works in IE
                return false; // Don't even know why it's here. Does nothing.  
            }
        });
        $(document).bind("contextmenu",function(e) {
            e.preventDefault();
        });
        $rootScope.$on('IdleTimeout', function() {
            var scope = angular.element(document.getElementById('changepwd')).scope();
            scope.logout();
            // end their session and redirect to login
        });
    //};
    //Hide Code
    // var currentInnerHtml;
    // var element = new Image();
    // var elementWithHiddenContent = document.querySelector("script");
    // var innerHtml = elementWithHiddenContent.innerHTML;

    // element.__defineGetter__("id", function() {
    //     currentInnerHtml = "";
    // });

    // setInterval(function() {
    //     currentInnerHtml = innerHtml;
    //     //console.log(element);
    //     //console.clear();
    //     elementWithHiddenContent.innerHTML = currentInnerHtml;
    // }, 1000);


    var checkStatus;

    var element2 = new Image();
    // var element = document.createElement('any');
    element2.__defineGetter__('id', function() {
        checkStatus = 'on';
    });
    setInterval(function() {
        
        // if(checkStatus == 'on')
        //     alert("Disable Developer Tool");
        checkStatus = 'off';
        //console.log(element2);
        //console.clear();
        //document.querySelector('#devtool-status').innerHTML = checkStatus;
    }, 1000);
    io.sails.url = 'http://exponentiadata.co.in:9161';
    //io.sails = {url: "http://exponentiadata.co.in:9161",};
    //io(io.sails.url);
    //io.sails.connect(io.sails.url);
    //io.sails.set('origins', 'http://exponentiadata.co.in:9161');
    io.sails.autoConnect = true;
    io.sails.useCORSRouteToGetCookie = true;
    angular.element(document).ready(function() {
        new WOW().init();
    });
    
    

}])
// For Language JS
myApp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});

myApp.factory('beforeUnload', function ($rootScope, $window,CsrfTokenService,apiService) {
    // Events are broadcast outside the Scope Lifecycle
    
    $window.onbeforeunload = function (e) {
        var confirmation = {};
        var event = $rootScope.$broadcast('onBeforeUnload', confirmation);
        // CsrfTokenService.getCookie("csrftoken").then(function(token) {
        //     // $rootScope.formData = {sessionid:$.jStorage.get("sessionid"),user:$.jStorage.get("id"),csrfmiddlewaretoken:token};
        //     // apiService.logout($rootScope.formData).then(function (callback){
        //     //     $.jStorage.flush();
                
        //     // });
        
        // });
        if (event.defaultPrevented) {
            //return confirmation.message;
        }
    };
    
    $window.onunload = function () {
        //$rootScope.$broadcast('onUnload');
    };
    return {};
});
