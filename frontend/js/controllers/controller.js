var globalLocale = moment.locale('hi');
var localLocale = moment();
myApp.controller('HomeCtrl', function ($scope,$rootScope, TemplateService, NavigationService,CsrfTokenService,Menuservice, $timeout,$http,apiService,$state) {
        $scope.template = TemplateService.getHTML("content/home.html");
        TemplateService.title = "Home"; //This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();

        $scope.crnSubmit = function(crnno) {
            //console.log(crnno,"crnno");
            $scope.userid=$.jStorage.get("id");
            var datatype = 'CRN';
            CsrfTokenService.getCookie("csrftoken").then(function(token) {
                apiService.crnsubmit($scope.formData).then(function (callback){
                    console.log(callback,"crn");
                });
                    
            // $.ajax({
            
            //     url : "",
            //     data: {user_input: crnno, user_id:$scope.userid, number_type:datatype,'csrfmiddlewaretoken': token,
            //     headers: {'X-CSRFToken': token},
            //     type: "POST",
            //     dataType: "json",
            //     success: function(data){
            //         var output = data.Output.Result;
            //         $scope.result_crn(output);
            //     }
            // });
            });
        };
        $scope.srnSubmit = function(srno,crnno) { 
            //console.log(crnno+"crnno,sr"+srno);
            $scope.userid=$.jStorage.get("id");
            var datatype = 'SR';
            CsrfTokenService.getCookie("csrftoken").then(function(token) {
            // $.ajax({
            //     // url: "/srandcrn/",
            //     data: {user_input: srno, user_id:$scope.userid, number_type:datatype,'csrfmiddlewaretoken': token},
            //     headers: {'X-CSRFToken': token},
            //     type: "POST",
            //     dataType: "json",
            //     success: function(data){
            //         var output = data.Output.Result;
            //         $scope.result_sr(output);
            //     }
            // });
            });
        };
        $scope.result_sr = function(output) {
            $timeout(function () {
                $('#sr_details').html(output);
            },200);
        };
        $scope.result_crn = function(output) {
            $timeout(function () {
                $('#crn_details').html(output);
            },200);
        };
        
        
        $rootScope.tabheading = [];
        $rootScope.tabvalue = [];
        $timeout(function () {
            $('.toggler').click(function () {
                $(this).parent().children('ul.tree').toggle(300);
                $(this).parent().find('.triangle').toggleClass('glyphicon-triangle-bottom').toggleClass('glyphicon-triangle-right');
                //return false;
            });
            $('#myTabs a').click(function (e) {
                e.preventDefault()
                $(this).tab('show')
            });
            $(".section_last").click(function(){
                $scope.nodevalue=$(this).attr("data-value");
                Menuservice.create_tabs($scope.nodevalue);
                
            });
        });
        
    })
    
    .controller('LoginCtrl', function ($scope, TemplateService, NavigationService,CsrfTokenService, $timeout, toastr, $http,$state,apiService) {
        $scope.template = TemplateService.getHTML("login.html");
        TemplateService.title = "Login"; //This is the Title of the Website
        //$scope.navigation = NavigationService.getNavigation();
        
        CsrfTokenService.getCookie("csrftoken");

        $scope.loginbg = 1;
        $scope.iframeHeight = window.innerHeight;
        $scope.uipage="login";
        $scope.formSubmitted = false;
        $scope.loginerror=0;
        $scope.notLoggedin = false;
        if($.jStorage.get("notloggedin"))
            $scope.notLoggedin = true;
        $scope.login = function(username,password)
        {
            CsrfTokenService.getCookie("csrftoken").then(function(token) {
                $scope.formData = {username:username,password:sha256_digest(password),csrfmiddlewaretoken:token};
            /*
            apiService.login($scope.formData).then(function (callback){
                //console.log(callback);
            });*/
            
                apiService.login($scope.formData).then(function (callback){
                    $scope.csrftoken=CsrfTokenService.getCookie("csrftoken");
                    
                    
                    //if(angular.isUndefined(callback.data.error.message))
                    if(callback.data.value)
                    {
                        console.log(callback);
                        $.jStorage.flush();
                        $.jStorage.set("id", callback.data.data._id);
                        $.jStorage.set("fname", callback.data.data.fname);
                        $.jStorage.set("lname", callback.data.data.lname);
                        $.jStorage.set("email", callback.data.data.email);
                        $.jStorage.set("branch", callback.data.data.branch);
                        $.jStorage.set("access_role", callback.data.data.accessrole);
                        $state.go("home");
                    }
                    else if(callback.data.error.message == -1)
                        $scope.loginerror = -1;
                });
            });
           
        }; 
         /*
            if(username=="pratik" && password == "asdf")
            {
                var pwd =sha256_digest(password);
                $state.go("home");
            }
            else {
                $scope.loginerror = -1;
            }*/
            /*
            $.ajax({
                    url: "{% url 'authenticate' %}", 						
                    // url: "/authenticate/",						
                    data: {username : username, password : password,'csrfmiddlewaretoken': getCookie("csrftoken")},
                    headers: {'X-CSRFToken': getCookie("csrftoken")},
                    type: "POST",
                    dataType: "json",
                    success: function(data){
                        if(data.Message == 'Successful'){
                            window.location.href = "{% url 'post_list' %}"
                        }
                        else{
                            alert(data.Message);
                        }
                },
                error: function(jqXHR, exception){
                                    alert("ERROR");
                }
            });
            return false;*/ 
        
    })
    .controller('ForgotPasswordCtrl', function ($scope, TemplateService, NavigationService,CsrfTokenService, $timeout, toastr, $http,$state,apiService,$stateParams,$interval) {
        $scope.template = TemplateService.getHTML("forgotpassword.html");
        TemplateService.title = "Forgot Password"; //This is the Title of the Website
        //$scope.navigation = NavigationService.getNavigation();
        
        //CsrfTokenService.getCookie("csrftoken");
        $scope.uipage="forgotpassword";
        $scope.userid=$stateParams.id;
        $scope.expired = false;
        $scope.loginbg = 1;
        $scope.iframeHeight = window.innerHeight;
        
        $scope.loginerror=0;
        $scope.countdown = {};
        $scope.refreshTimer = function(expiryTime) 
        {
               
            expiryTime = new Date(expiryTime);
            $scope.rightNow = new Date();
            $scope.diffTime = expiryTime - $scope.rightNow;
            var duration = moment.duration($scope.diffTime, 'milliseconds');
            
            $interval(function() {

                duration = moment.duration(duration - 1000, 'milliseconds');
                
                if (duration._milliseconds > 0) {

                    $scope.expired = false;
                } else {

                    $scope.expired = true;
                }
                $scope.countdown.months = duration.months();
                $scope.countdown.days = duration.days();
                $scope.countdown.hours = duration.hours();
                $scope.countdown.minutes = duration.minutes();
                $scope.countdown.seconds = duration.seconds();

            }, 1000);
        };

        $scope.refreshTimer("2017-07-27 13:17:00");

        

        $scope.changepassword = function(password)
        {
            /*
            $scope.formData = {username:username,password:sha256_digest(password)};
            
            
            apiService.changepassword2($scope.formData).then(function (callback){
                if(callback.data == -1)
                    $scope.loginerror = -1;
                else
                {
                    $.jStorage.flush();
                    $state.go("login");
                }
            });
            */
        }; 
        
    })


    .controller('CommonCtrl', function ($scope, TemplateService, NavigationService,CsrfTokenService, $timeout,$uibModal, toastr, $http,$state,apiService,$cookies) {
        $scope.logout = function() {
            $.jStorage.flush();
            $state.go("login");
        };
        $scope.$modalInstance = {};
        $scope.openChangePwd = function() {
            $scope.$modalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                //size: 'sm',
                templateUrl: 'views/modal/changepassword.html',
                //controller: 'CommonCtrl'
            });
        };
        $scope.changePwdcancel = function() {
            //console.log("dismissing");
            $scope.$modalInstance.dismiss('cancel');
            //$scope.$modalInstance.close();
        };
        $scope.passworderror=0
        $scope.changepasswordSuccess=0;
          
        $scope.changepassword = function(currentpassword,newpassword,newpassword2) {
             //console.log(newpassword);
            userid = $.jStorage.get("id");
            $scope.token="";
            CsrfTokenService.getCookie("csrftoken").then(function(done) {
                $scope.token=done;
                $scope.formData = {userid:userid,oldpassword:sha256_digest(currentpassword),newpassword:sha256_digest(newpassword),csrfmiddlewaretoken:$scope.token };
                console.log($scope.formData);
                apiService.changepassword($scope.formData).then(function (callback){
                    if(callback.data.value)
                    {    
                        $scope.changepasswordSuccess=1;
                        $timeout(function () {
                            $scope.$modalInstance.dismiss('cancel');
                            $scope.changepasswordSuccess=0;
                        },500);
                    }
                    else if (callback.data.error.message==-1)
                        $scope.passworderror =-1;
                })    
            });

                
                
                
           
            
        };
        $timeout(function () {
        
            $('span.thumbsup').click(function (event) {
                $(this).css("color", "#ed232b");
                $('.thumbsdown').css("color", "#444");
            });
            $('span.thumbsdown').click(function (event) {
                $(this).css("color", "#ed232b");
                $('.thumbsup').css("color", "#444");
            });
        },200); 
    })
    .controller('LoginDetCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http,$state,apiService) {
        $scope.fullname = "";
        $scope.branch = "";
        if($.jStorage.get("id") == null || $.jStorage.get("id") == "" || $.jStorage.get("id")==0)
        {
            $.jStorage.set("notloggedin",true);
            $state.go("login");
        }    
        else
        {
            $scope.fullname = $.jStorage.get("fname")+" "+$.jStorage.get("lname");
            $scope.branch = $.jStorage.get("branch");
        }
        
    })
    .controller('ChangePasswordCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http,$state,apiService) {
        
        
    })
    
    .controller('FormCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http) {
        $scope.template = TemplateService.getHTML("content/form.html");
        TemplateService.title = "Form"; //This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();
        $scope.formSubmitted = false;
        // $scope.data = {
        //     name: "Chintan",
        //     "age": 20,
        //     "email": "chinyan@wohlig.com",
        //     "query": "query"
        // };
        $scope.submitForm = function (data) {
            console.log("This is it");
            return new Promise(function (callback) {
                $timeout(function () {
                    callback();
                }, 5000);
            });
        };
    })

    .filter('highlight', function($sce) {
        return function(text, phrase) {
            if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
            '<span class="highlighted">$1</span>')

            return $sce.trustAsHtml(text)
        }
    })
    .controller('ChatCtrl', function ($scope, $rootScope,TemplateService, NavigationService,CsrfTokenService, $timeout,$http,apiService,$state) {
        
        $rootScope.autocompletelist = [];
        $rootScope.chatOpen = false;
        $rootScope.showTimeoutmsg = false;
        $rootScope.firstMsg=false;
        $rootScope.showChatwindow = function () {
            if(!$rootScope.firstMsg)
            {
                $rootScope.firstMsg = true;
                $rootScope.pushSystemMsg(0,"Hi, How may I help you ?");  
            }
            $('#chat_panel').slideDown();
            $('#chat_panel').find('.panel-body').slideDown("slow");
            $('#chat_panel').find('.panel-footer').slideDown("slow");
            $('.panel-heading span.icon_minim').removeClass('panel-collapsed');
            $('.panel-heading span.icon_minim').removeClass('glyphicon-plus').addClass('glyphicon-minus');
            $(".clickImage").hide();
            $rootScope.chatOpen = true;
        };
        $rootScope.minimizeChatwindow = function() {
            $rootScope.showTimeoutmsg = false;
            $rootScope.autocompletelist = [];
            $('#chat_panel').slideUp();
            $('#chat_panel').find('.panel-body').slideUp("fast");
            $('#chat_panel').find('.panel-footer').slideUp("fast");
            $('.panel-heading span.icon_minim').addClass('panel-collapsed');
            $('.panel-heading span.icon_minim').addClass('glyphicon-plus').removeClass('glyphicon-minus');
            $(".clickImage").show( "fadeIn");
        };

        $rootScope.iframeHeight = window.innerHeight-53;
        
        $rootScope.getDatetime = function() {
            //return (new Date).toLocaleFormat("%A, %B %e, %Y");
            return currentTime = new Date();
        };
        $rootScope.chatText = "";
        $rootScope.getAutocomplete = function(chatText) {
            $rootScope.showTimeoutmsg = false;
            if($rootScope.showTimeoutmsg == false && chatText=="") 
            {
                $timeout(function () {
                    $rootScope.showTimeoutmsg = true;
                    $rootScope.pushSystemMsg(0,"Any Confusion ? How May I help You ?");
                },60000);
            }
            $rootScope.chatText = chatText;
            if(chatText == "")
                $rootScope.autocompletelist = [];
            
            $rootScope.chatdata = { string:$rootScope.chatText};
            apiService.getautocomplete($rootScope.chatdata).then(function (response){
                    console.log(response.data);
                $rootScope.autocompletelist = response.data.data;
            });
            
        };
        $rootScope.chatmsg = "";
        $rootScope.chatmsgid = "";
        $rootScope.msgSelected = false;
        $rootScope.chatlist = [];
        $rootScope.autolistid="";
        $rootScope.autolistvalue="";
        $rootScope.showMsgLoader=false;
        $rootScope.pushMsg = function(id,value) {
            $rootScope.msgSelected = true;
            $rootScope.chatmsgid = id;
            $rootScope.chatmsg = value;
            $rootScope.autocompletelist = [];
            $rootScope.chatlist.push({id:"id",msg:value,position:"right",curTime: $rootScope.getDatetime()});
            //console.log("msgid="+id+"chatmsg="+$rootScope.msgSelected);
            $rootScope.getSystemMsg(id,value);
            $rootScope.msgSelected = false;
            $rootScope.showMsgLoader=true;
        };
        $rootScope.getSystemMsg = function(id,value){
            //console.log("id",id);
            CsrfTokenService.getCookie("csrftoken").then(function(token) {
                $rootScope.formData = {user_id:1164,user_input:value,auto_id:parseInt(id),auto_value:value,'csrfmiddlewaretoken':token};
                //console.log($rootScope.formData);
                apiService.getSysMsg($rootScope.formData).then(function (data){
                    angular.forEach(data.data.tiledlist, function(value, key) {
                        if(value.type=="text")
                        {
                        //	alert("Successfultext");
                            $rootScope.ajaxTiledList2(data.data);
                            $rootScope.showMsgLoader = false;
                            return false;
                        }
                        else if(value.type == "Instruction")
                        {
                            console.log("inside instruction");
                            $.each(data.tiledlist.tiledlist, function(index,tiledlist){
                                if(tiledlist.type=="Image")
                                {
                                    console.log(tiledlist);
                                    $rootScope.ajaxTiledList1(data.data);
                                    $rootScope.showMsgLoader = false;
                                }
                                return false;
                            });
                        }
                    });
                });
            });
        };
        $rootScope.pushSystemMsg = function(id,value) {
            $rootScope.chatmsgid = id;
            $rootScope.chatmsg = value;
            $rootScope.chatlist.push({id:"id",msg:value,position:"left",curTime: $rootScope.getDatetime()});
        };

        

        $rootScope.tappedKeys = '';

        $rootScope.onKeyUp = (e)=>{
            //if(e.key == "ArrowDown" || e.key == "ArrowUp")
            if(e.which == 40 )
            {
                if($("ul#ui-id-1 li.active").length!=0) {
                    var storeTarget	= $('ul#ui-id-1').find("li.active").next();
                    $("ul#ui-id-1 li.active").removeClass("active");
                    storeTarget.focus().addClass("active");
                    $(".chatinput").val(storeTarget.text());
                    $rootScope.autolistid = $(storeTarget).attr("data-id");
                    $rootScope.autolistvalue = $(storeTarget).attr("data-value");
                }
                else
                {
                    $('ul#ui-id-1').find("li:first").focus().addClass("active");
                    $(".chatinput").val($('ul#ui-id-1').find("li:first").text());
                    $rootScope.autolistid = $('ul#ui-id-1').find("li:first").attr("data-id");
                    $rootScope.autolistvalue = $('ul#ui-id-1').find("li:first").attr("data-value");
		    	}

                return;
            }
            if(e.which == 38 )
            {
                if($("ul#ui-id-1 li.active").length!=0) {
                    var storeTarget	= $('ul#ui-id-1').find("li.active").prev();
                    $("ul#ui-id-1 li.active").removeClass("active");
                    storeTarget.focus().addClass("active");
                    $(".chatinput").val(storeTarget.text());
                    $rootScope.autolistid = $(storeTarget).attr("data-id");
                    $rootScope.autolistvalue = $(storeTarget).attr("data-value");
                }
                else
                {
                    $('ul#ui-id-1').find("li:last").focus().addClass("active");
                    $(".chatinput").val($('ul#ui-id-1').find("li:last").text());
                    $rootScope.autolistid = $('ul#ui-id-1').find("li:last").attr("data-id");
                    $rootScope.autolistvalue = $('ul#ui-id-1').find("li:last").attr("data-value");
		    	}

                return;
            }
            if(e.which == 13)
            {
                if($rootScope.autolistid=="")
                    $rootScope.pushMsg("",$rootScope.chatText);
                else
                    $rootScope.pushMsg($rootScope.autolistid,$rootScope.autolistvalue);
            }
        };
       
    })
    // Example API Controller
    .controller('DemoAPICtrl', function ($scope, TemplateService, apiService, NavigationService, $timeout) {
        apiService.getDemo($scope.formData, function (data) {
            console.log(data);
        });
    });

    