var globalLocale = moment.locale('hi');
var localLocale = moment();
myApp.controller('HomeCtrl', function ($scope,$rootScope, TemplateService, NavigationService,CsrfTokenService,Menuservice, $timeout,$http,apiService,$state) {
        $scope.template = TemplateService.getHTML("content/home.html");
        TemplateService.title = "Home"; //This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();

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
            $rotated = false;

            $('.c-hamburger').click(function(){
                console.log($rotated);
                if($rotated == false) 
                {
                    $('.c-hamburger span').css("transform", "rotate(90deg)");				
                    $('.c-hamburger span').css("transition", "transform 1.2s ease");
                    $(this).animate({'background-color': '#ed1c24'}, 'fast');
                    //$('.list-group').show("slide", { direction: "left" }, 1000);
                    $('.list-group').toggle('slide');
                    $rotated = true;
                }
                else
                {	
                    //alert("matched");
                    $('.c-hamburger span').css("transform", "rotate(0deg)");				
                    $('.c-hamburger span').css("transition", "transform 1.2s ease");
                    $(this).animate({'background-color': '#003874'}, 'fast');
                    //$('.list-group').hide("slide", { direction: "left" }, 1000);
                    $('.list-group').toggle('slide');
                    $rotated = false;
                }
                
            });
            // $('.mini-submenu').on('click',function(){		
            //     console.log("clicked");
            //     $('.list-group').toggle('slide');
            //     //$('.mini-submenu').hide();
            // });
        });
        
    })
    
    .controller('LoginCtrl', function ($scope, TemplateService, NavigationService,CsrfTokenService, $timeout, toastr, $http,$state,apiService,$uibModal,$filter,Idle) {
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
                        //console.log(callback);
                        $.jStorage.flush();
                        $.jStorage.set("id", callback.data.data._id);
                        $.jStorage.set("fname", callback.data.data.fname);
                        $.jStorage.set("lname", callback.data.data.lname);
                        $.jStorage.set("email", callback.data.data.email);
                        $.jStorage.set("branch", callback.data.data.branch);
                        $.jStorage.set("access_role", callback.data.data.accessrole);
                        $.jStorage.set("sessionid", callback.data.data.sessionid);

                        $scope.sessiondata = {
                            id_string : callback.data.data._id,
                            data : {},
                            DTHyperlink : '',
                            LineNo : '',
                            options : '',
                            opts : '',
                            row_by_framework_level : '',
                            framework_level : 1,
                            response:{},
                            response_type :'',
                            form_input_type : '',
                            form_input_dict : {} , 
                            form_input_list : []  ,  
                            form_category : '',
                            Context:'',
                            Context_1:'',
                            Context_2:'',
                            Context_3:'',
                            Context_4:'',
                            Context_5:'',
                            gb_dt_start_row:-1,
                            gb_dt_end_row:-1,
                            gb_dt_current_cursor_row:-1,
                            gb_dt_current_cursor_col:-1,
                            gb_dt_file_name:'',
                            gb_sub_topic_list : [],
                            gb_step_list : [],
                            gb_current_step : '',
                            tooltip : [],
                            gb_topic_tuple_array:[],
                            gb_max_ratio_index_in_tuple:[],
                            gb_topic:'',
                            gb_matched_row_values:[],
                            gb_matched_col_values:[],
                        };
                        $.jStorage.set("sessiondata",$scope.sessiondata);
                        $scope.$on('IdleStart', function() {
                            // the user appears to have gone idle
                        });
                        $state.go("home");
                    }
                    else if(callback.data.error.message == -1)
                        $scope.loginerror = -1;
                });
            });
           
        }; 
        $scope.openForgotpassword = function() {
            $scope.$modalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                size: 'sm',
                templateUrl: 'views/modal/forgotpassword.html',
                //controller: 'CommonCtrl'
            });
        };
        $scope.changePwdcancel = function() {
            //console.log("dismissing");
            $scope.$modalInstance.dismiss('cancel');
            //$scope.$modalInstance.close();
        };
        $scope.forgotpasswordreq = function(email) {
            str = $filter('date')(new Date(), 'hh:mm:ss a')+email;
            $scope.formData = {email:email,resettoken:sha256_digest(str) };
            apiService.forgotpassword($scope.formData).then(function (callback){
                if(callback.data.value)
                {    
                    $scope.forgotpasswordSuccess=1;
                    $timeout(function () {
                        $scope.$modalInstance.dismiss('cancel');
                        $scope.forgotpasswordSuccess=0;
                    },1000);
                }
                else if (callback.data.error.message==-1)
                    $scope.forgotpassworderror =-1;
            })
        };
    })
    .controller('ForgotPasswordCtrl', function ($scope, TemplateService, NavigationService,CsrfTokenService, $timeout, toastr, $http,$state,apiService,$stateParams,$interval) {
        $scope.template = TemplateService.getHTML("forgotpassword.html");
        TemplateService.title = "Forgot Password"; //This is the Title of the Website
        //$scope.navigation = NavigationService.getNavigation();
        
        //CsrfTokenService.getCookie("csrftoken");
        $scope.uipage="forgotpassword";
        $scope.userid=$stateParams.id;
        $scope.loginbg = 1;
        //console.log($stateParams);
        $scope.expired = false;
        
        $scope.iframeHeight = window.innerHeight;
        
        $scope.loginerror=0;
        $scope.countdown = {};
        $scope.isvalidpasswordresetreq = function()
        {
            $scope.formData = { resettoken:$stateParams.id };
            apiService.isvalidpasswordresetreq($scope.formData).then(function (callback){
                if(!callback.data.value)
                {
                    $scope.loginerror = -1;
                    $timeout(function(){
                        $state.go("login");
                    },1000);
                }
                else
                {
                    $scope.refreshTimer(callback.data.data.expirydate);
                }
            });   
        };
        

        $scope.isvalidpasswordresetreq();
        $scope.refreshTimer = function(expiryTime) 
        {
            
            expiryTime = new Date(expiryTime);
            t = expiryTime.getTime();
            var tempTime = moment.duration(t);
            var y = tempTime.hours() +":"+ tempTime.minutes();
            
            expiryDate = moment(expiryTime).format("YYYY-MM-DD");
            expiryTime = new Date(expiryDate+" "+y);
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
        $scope.changepassword = function(password)
        {
            
            $scope.formData = {resettoken:$scope.userid,password:sha256_digest(password)};
            
            
            apiService.changepassword2($scope.formData).then(function (callback){
                if(!callback.data.value)
                    $scope.loginsuccesserror = -1;
                else
                {
                    $scope.changepasswordSuccess = 1;
                    $timeout(function(){
                        $.jStorage.flush();
                        $state.go("login");
                    },1000);
                }
            });
            
        }; 
        
    })


    .controller('CommonCtrl', function ($scope, TemplateService, NavigationService,CsrfTokenService, $timeout,$uibModal, toastr, $http,$state,apiService,$cookies) {
        $scope.logout = function() {

            CsrfTokenService.getCookie("csrftoken").then(function(token) {
                $scope.formData = {sessionid:$.jStorage.get("sessionid"),user:$.jStorage.get("id"),csrfmiddlewaretoken:token};
                apiService.logout($scope.formData).then(function (callback){
                    $.jStorage.flush();
                    $state.go("login");
                });
            
            });
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
        
        // $timeout(function () {
        
        //     $('span.thumbsup').click(function (event) {
        //         $(this).css("color", "#ed232b");
        //         $('.thumbsdown').css("color", "#444");
        //     });
        //     $('span.thumbsdown').click(function (event) {
        //         $(this).css("color", "#ed232b");
        //         $('.thumbsup').css("color", "#444");
        //     });
        // },200); 
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
    .controller('ChatCtrl', function ($scope, $rootScope,TemplateService, NavigationService,CsrfTokenService, $timeout,$http,apiService,$state,$uibModal) {
        
        $rootScope.autocompletelist = [];
        $rootScope.chatOpen = false;
        $rootScope.showTimeoutmsg = false;
        $rootScope.firstMsg=false;
        $rootScope.chatmsg = "";
        $rootScope.chatmsgid = "";
        $rootScope.msgSelected = false;
        var mylist = $.jStorage.get("chatlist");
        if(!mylist || mylist == null)
            $rootScope.chatlist = [];
        else
            $rootScope.chatlist = $.jStorage.get("chatlist");
        $rootScope.autolistid="";
        $rootScope.autolistvalue="";
        $rootScope.showMsgLoader=false;
        $rootScope.rate_count= 0;
        $rootScope.scrollChatWindow = function() {
            $timeout(function(){
                var chatHeight = $("ul.chat").height();
                $('.panel-body').animate({scrollTop: chatHeight});
            });
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
                    msg = {Text:"Any Confusion ? How May I help You ?",type:"SYS_INACTIVE"};
                    $rootScope.pushSystemMsg(0,msg);
                },60000);
            }
            $rootScope.chatText = chatText;
            if(chatText == "" || chatText == " " || chatText == null)
                $rootScope.autocompletelist = [];
            else {
                $rootScope.chatdata = { string:$rootScope.chatText};
                apiService.getautocomplete($rootScope.chatdata).then(function (response){
                       // console.log(response.data);
                    $rootScope.autocompletelist = response.data.data;
                });
            }
        };
        $rootScope.pushSystemMsg = function(id,value) {
            $rootScope.chatmsgid = id;
            $rootScope.chatmsg = value;
            $rootScope.chatlist.push({id:"id",msg:value,position:"left",curTime: $rootScope.getDatetime()});
            $.jStorage.set("chatlist",$rootScope.chatlist);
            $timeout(function(){
                $rootScope.scrollChatWindow();
            });
            
        };
        $rootScope.showChatwindow = function () {
            newlist = $.jStorage.get("chatlist");
            if(!newlist || newlist == null)
            {
                $rootScope.firstMsg = false;
            }
            else
            { 
                $rootScope.firstMsg = true;
            }
            $.jStorage.set("showchat",true);
            if(!$rootScope.firstMsg)
            {
                $rootScope.firstMsg = true;
                msg = {Text:"Hi, How may I help you ?",type:"SYS_FIRST"};
                $rootScope.pushSystemMsg(0,msg);  
            }
            $('#chat_panel').slideDown("slow");
            //$('#chat_panel').find('.panel-body').slideDown("fast");
            //$('#chat_panel').find('.panel-footer').slideDown("slow");
            $('.panel-heading span.icon_minim').removeClass('panel-collapsed');
            $('.panel-heading span.icon_minim').removeClass('glyphicon-plus').addClass('glyphicon-minus');
            $(".clickImage").hide();
            $rootScope.chatOpen = true;
            $rootScope.scrollChatWindow();
        };
        $rootScope.minimizeChatwindow = function() {
            $.jStorage.set("showchat",false);
            $rootScope.showTimeoutmsg = false;
            $rootScope.autocompletelist = [];
            $('#chat_panel').slideUp();
            //$('#chat_panel').find('.panel-body').slideUp("fast");
            //$('#chat_panel').find('.panel-footer').slideUp("fast");
            $('.panel-heading span.icon_minim').addClass('panel-collapsed');
            $('.panel-heading span.icon_minim').addClass('glyphicon-plus').removeClass('glyphicon-minus');
            $(".clickImage").show( "fadeIn");
        };
        $rootScope.pushMsg = function(id,value) {
            $rootScope.msgSelected = true;
            $rootScope.chatmsgid = id;
            $rootScope.chatmsg = value;
            $rootScope.autocompletelist = [];
            $rootScope.chatlist.push({id:"id",msg:value,position:"right",curTime: $rootScope.getDatetime()});
            //console.log("msgid="+id+"chatmsg="+$rootScope.msgSelected);
            $rootScope.getSystemMsg(id,value);
            $.jStorage.set("chatlist",$rootScope.chatlist);
            $rootScope.msgSelected = false;
            $rootScope.showMsgLoader=true;
            $rootScope.scrollChatWindow();
        };
        if($.jStorage.get("showchat"))
            $rootScope.showChatwindow();
        else
            $rootScope.minimizeChatwindow();

        $rootScope.ratecardSubmit = function(coldata,rowdata) {
            console.log(coldata,rowdata);
        };
        $rootScope.getDthlinkRes = function(colno,lineno,dthlink) {
            console.log(colno,lineno,dthlink);
            mysession = $.jStorage.get("sessiondata");
            console.log(mysession);
            mysession.DTHlink=dthlink;
            mysession.DTHline=lineno;
            mysession.DTHcol=colno;
            formData = mysession;
            console.log(formData);
            apiService.getDthlinkRes(formData).then(function (data){
                angular.forEach(data.data.data.tiledlist, function(value, key) {
                    if(value.type=="DTHyperlink")
                        $rootScope.DthResponse(0,data.data.data);
                });
            });
        };
        $rootScope.DthResponse = function(id,data) {
            $rootScope.pushSystemMsg(id,data);
            $rootScope.showMsgLoader = false; 
        };
        $rootScope.getSystemMsg = function(id,value){
            //console.log("id",id);
            //CsrfTokenService.getCookie("csrftoken").then(function(token) {
                //$rootScope.formData = {user_id:1164,user_input:value,auto_id:parseInt(id),auto_value:value,'csrfmiddlewaretoken':token};
                var mysessiondata = $.jStorage.get("sessiondata");
                //mysessiondata = mysessiondata.toObject();
                mysessiondata.data = {auto_id:parseInt(id),Text:value};
                $rootScope.formData = mysessiondata;
                $timeout(function(){
                    $(".chatinput").val("");
                });
                apiService.getSysMsg($rootScope.formData).then(function (data){
                    
                    angular.forEach(data.data.data.tiledlist, function(value, key) {
                        //console.log(value);
                        if(value.type=="text")
                        {
                        	var res = data.data.data.tiledlist[0].Text.split("\n");
                            var chatT = "";
                            for(var i=0;i<res.length;i++){
                                breakTag= "";
                                if(res[i] == res.length || res[i] == "")
                                    breakTag = "";
                                else
                                    breakTag = "<br>";
                                if(res[i] != "")
                                    chatT += "<p class='lastMsg'&nbsp;&nbsp;>"+ res[i]+breakTag +"</p>";
                            }
                            $rootScope.pushSystemMsg(0,data.data.data);
                            $rootScope.showMsgLoader = false;
                            
                            
                            return false;
                        }
                        if(value.type=="rate card")
                        {
                            //console.log(data.data.data.tiledlist);
                        	//var res = data.data.tiledlist[0].Text.split("\n");
                                //alert(res.length);
                            // var chatT = "";
                            // for(var i=0;i<res.length;i++){
                            //     //alert(res[i])
                            //     breakTag= "";
                            //     if(res[i] == res.length || res[i] == "")
                            //         breakTag = "";
                            //     else
                            //         breakTag = "<br>";
                            //     if(res[i] != "")
                            //         chatT += "<p class='lastMsg'&nbsp;&nbsp;>"+ res[i]+breakTag +"</p>";
                            // }
                            
                            // $rootScope.rate_count++;
                            // var chatdata ="";
                            // var data_col = Array();
                            // var data_row = Array();
                            // var label_col = '';
                            // var label_row = '';
                            // var dynamic_row_id = '';
                            // var dynamic_col_id = '';

                            // for (var i = 0; i < data.data.data.tiledlist.length; i++) {
                            //     // if(typeof(data.tiledlist[i].topic) != "undefined")
                            //     //     $('#topic').text(data.tiledlist[i].topic);
                            //     // else
                            //     //     $('#topic').text("");

                            //     data_col = data.data.data.tiledlist[i].data_col;
                            //     data_row = data.data.data.tiledlist[i].data_row;
                            //     label_col = data.data.data.tiledlist[i].col_name;
                            //     label_row = data.data.data.tiledlist[i].row_name;
                            // }
                            // // dynamic_row_id = 'col_val_'+rate_count;
                            // // dynamic_col_id =
                            // $.each(data_col, function(val, text) {
                            //     $('#col_val_'+rate_count.toString()).append(
                            //         $('<option></option>').val(text).html(text)
                            //     );
                            // });
                            // $.each(data_row, function(val, text) {
                            //     $('#row_val_'+rate_count.toString()).append(
                            //         $('<option></option>').val(text).html(text)
                            //     );

                            // });
                            // // chatdata +=" <li class=' left lastChat  clearfix'>";
                            // // chatdata += "<span class='chat-img pull-left'><img src='{% static 'images/logo5.jpg' %}' alt='YOU' class='img-circle' /></span>";
                            // // chatdata += "<div class='chat-body clearfix'>";
                            // var temp1 = '';
                            // var temp2 = '';
                            // $.each(data_col, function(val, text) {
                            //     temp1 += "<option value='"+text+"''>"+text+"</option>";
                            // });
                            // $.each(data_row, function(val, text) {
                            //     temp2 += "<option value='"+text+"''>"+text+"</option>";
                            // });

                            // chatdata += "<label for='col_val_"+rate_count.toString()+"'>"+label_col+" : </label>";
                            // chatdata += "<select class='form-control' id='col_val_"+rate_count.toString()+"'>"+temp1+"</select><br>";
                            // chatdata += "<label for='row_val_"+rate_count.toString()+"'>"+label_row+" : </label>";
                            // chatdata += "<select class='form-control' id='row_val_"+rate_count.toString()+"'>"+temp2+"</select><br>";
                            // chatdata += "<input class='rate_btn btn btn-default pull-right' id='rate_btn' type='button' value='Get Limit' /><br>";
                            
                            // // $('.rate_btn').click(function() {
                            // //     //alert("Hello 1");
                            // //     var temp = '';
                            // //     temp += $("#col_val_"+rate_count.toString()+" option:selected").text() + "," + $("#row_val_"+rate_count.toString()+" option:selected").text();


                            // // });
                            // console.log(chatdata);
                            //$rootScope.pushSystemMsg(0,chatdata);
                            $rootScope.pushSystemMsg(0,data.data.data);
                            $rootScope.showMsgLoader = false;
                            
                            
                            return false;
                        }
                        else if(value.type=="DTHyperlink")
                        {
                           $rootScope.DthResponse(0,data.data.data);  
                        }
                        
                    });
                    $("#topic").text(data.data.data.tiledlist[0].topic);
                    $.jStorage.set("sessiondata",data.data.data.session_obj_data);
                });
            //});
            
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
                if($rootScope.autolistid=="" || $rootScope.autolistid == null || $rootScope.autolistid == 0)
                {
                    $(".chatinput").val("");
                    $rootScope.pushMsg("",$rootScope.chatText);
                }
                else
                    $rootScope.pushMsg($rootScope.autolistid,$rootScope.autolistvalue);
            }
        };
        $rootScope.crnSubmit = function(crnno) {
            //console.log(crnno,"crnno");
            $rootScope.userid=$.jStorage.get("id");
            var datatype = 'CRN';
            CsrfTokenService.getCookie("csrftoken").then(function(token) {
                apiService.crnsubmit($rootScope.formData).then(function (callback){
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
        $rootScope.srnSubmit = function(srno,crnno) { 
            //console.log(crnno+"crnno,sr"+srno);
            $rootScope.userid=$.jStorage.get("id");
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
        $rootScope.result_sr = function(output) {
            $timeout(function () {
                $('#sr_details').html(output);
            },200);
        };
        $rootScope.result_crn = function(output) {
            $timeout(function () {
                $('#crn_details').html(output);
            },200);
        };
        $rootScope.likeChatClick = function(){
            $timeout(function(){
                $('span.thumbsup').css("color", "#ed232b");
                $('.thumbsdown').css("color", "#444");
            },200);
        };
        $rootScope.$dislikemodalInstance = {};
        $rootScope.dislikesuggestionerror = 0;
        $rootScope.dislikeChatClick = function(){
            $rootScope.$dislikemodalInstance = $uibModal.open({
                scope: $rootScope,
                animation: true,
                size: 'sm',
                templateUrl: 'views/modal/dislikechat.html',
                //controller: 'CommonCtrl'
            });
            $timeout(function(){ 
                $('span.thumbsdown').css("color", "#ed232b");
                $('.thumbsup').css("color", "#444");
            },200);
        };
        $rootScope.dislikeCancel = function() {
            //console.log("dismissing");
            $scope.$dislikemodalInstance.dismiss('cancel');
        };
        $rootScope.dislikesuggestionsubmit = function(suggestion){
            console.log("suggestion",suggestion);
            $rootScope.dislikesuggestionSuccess = 1;
            $timeout(function(){
                $rootScope.dislikesuggestionSuccess = 0;
                $rootScope.dislikeCancel();
            },500);
        };
        
       $timeout(function(){
            //$('#chatTabs a:last').tab('show');
       },200);
    })
    // Example API Controller
    .controller('DemoAPICtrl', function ($scope, TemplateService, apiService, NavigationService, $timeout) {
        apiService.getDemo($scope.formData, function (data) {
            console.log(data);
        });
    });

    