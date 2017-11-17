var globalLocale = moment.locale('hi');
var localLocale = moment();

myApp.controller('HomeCtrl', function ($scope,$rootScope, TemplateService, NavigationService,CsrfTokenService,Menuservice, $timeout,$http,apiService,$state,$cookies) {
        $scope.template = TemplateService.getHTML("content/home.html");
        TemplateService.title = "Home"; //This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();

        $scope.uipage = "home";
        $scope.mySlides = [
            'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
            'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
            'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
            'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
        ];
        angular.element(document).ready(function() {
            new WOW().init();
        });
        angular.element(document).ready(function () {
            apiService.get_session({}).then( function (response) {
                $cookies.put("csrftoken",response.data.csrf_token);
                $cookies.put("session_id",response.data.session_id);
                $.jStorage.set("csrftoken",response.data.csrf_token);
                //console.log(response.data);
            });
            var mydiv = "Hello How are you <blargh src='image.jpg' /> see you tomorrow";
            // var firstImage = mydiv.getElementsByTagName('img')[0]
            // var imgSrc = firstImage ? firstImage.src : "";
            // // or, if you want the unresolved src, as it appears in the original HTML:
            // var rawImgSrc = firstImage ? firstImage.getAttribute("src") : "";
            // console.log(rawImgSrc);

            // var src =$(mydiv).find("blargh:first").attr("src");
            // console.log(src);
            //$(content.replace("", "<img")).find("blargh:first").attr("src")
            var post = "Hello How are you <blargh src='image.jpg' /> see you tomorrow";
            //var firstimg = $(post).find('img:first').attr('src'); 
            //console.log(firstimg,"img");
            // var str = '<img src="/quizs-schol/headimages/4194.png?id=51a2f7aec61ac" style="height:30px; width:40px;"> Online free quiz';
            // var imgs = $("<div>" +str +"</div>").find("img"); 
            // console.log(imgs);
            // console.log(str);
        });
        $rootScope.checkDevice = function (){
            //window.mobileAndTabletcheck = function() {
                var check = false;
                (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
                return check;
            //};
        };
        $rootScope.access_role = $.jStorage.get("access_role");
        angular.element(document).ready(function () {
            
        });
       $rootScope.checkCollapsed = function()
        {
            if($rootScope.checkDevice() && $(".navbar-toggle").hasClass("collapsed"))
            {   
                //console.log("is mobile");
                $rootScope.minimizeChatwindow();
            }
        };
        
    })
    myApp.controller('DashboardCtrl', function ($scope,$rootScope, TemplateService, NavigationService,CsrfTokenService,Menuservice, $timeout,$http,apiService,$state) {
        $scope.template = TemplateService.getHTML("content/dashboard.html");
        TemplateService.title = "Dashboard"; //This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();
        $rootScope.uipage="dashboard";
    })
    .controller('LoginCtrl', function ($scope, TemplateService, NavigationService,CsrfTokenService, $timeout, toastr, $http,$state,apiService,$uibModal,$filter,Idle,$rootScope) {
        $scope.template = TemplateService.getHTML("login.html");
        TemplateService.title = "Login"; //This is the Title of the Website
        //$scope.navigation = NavigationService.getNavigation();
        
        CsrfTokenService.getCookie("csrftoken");

        $scope.loginbg = 1;
        $scope.iframeHeight = window.innerHeight;
        $scope.uipage="login";
        $scope.formSubmitted = false;
        $scope.loginerror=0;
        //$rootScope.notLoggedin = false;
        //console.log($.jStorage.get("notloggedin"));
        if($.jStorage.get("notloggedin"))
            $rootScope.notLoggedin = true;
        else 
            $state.go("home");
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
                        $rootScope.access_role = callback.data.data.accessrole;
                        $.jStorage.set("id", callback.data.data._id);
                        $.jStorage.set("fname", callback.data.data.fname);
                        $.jStorage.set("lname", callback.data.data.lname);
                        $.jStorage.set("email", callback.data.data.email);
                        $.jStorage.set("branch", callback.data.data.branch);
                        $.jStorage.set("access_role", callback.data.data.accessrole);
                        $.jStorage.set("sessionid", callback.data.data.sessionid);

                        $scope.sessiondata = {
                            id_string : callback.data.data._id,
                            //data : {},
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
                        if(callback.data.data.accessrole == 4)
                            $state.go("agentdashboard");
                        else
                        {
                            //io.socket.get('/chat/addconv');
                            
                            $state.go("dashboard");
                        }
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
    .controller('AgentdashboardCtrl', function ($scope, $rootScope,$resource,TemplateService, NavigationService,CsrfTokenService, $timeout,$http,apiService,$state,$uibModal,Menuservice,tts,$cookies,$sce,$location) {
        $scope.template = TemplateService.getHTML("content/agentdashboard.html");
        TemplateService.title = "Home"; //This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();
        $scope.uipage = "agentdashboard";
        $rootScope.access_role = $.jStorage.get("access_role");
        $scope.firstreload = false;
        if($.jStorage.get("firstreload"))
            $scope.firstreload = true;
        else
        {
            $.jStorage.set("firstreload",true);
            location.reload();
        }
        // io.sails.url = 'http://localhost:1337';
        
        // function startPrivateConversation() {

        // // Get the user list
        // var select = $('#users-list');

        // // Make sure a user is selected in the list
        // if (select.val() === null) {
        //     return alert('Please select a user to send a private message to.');
        // }

        // // Get the recipient's name from the text of the option in the <select>
        // var recipientName = $('option:selected', select).text();
        // var recipientId = select.val();

        // // Prompt for a message to send
        // var message = prompt("Enter a message to send to "+recipientName);

        // // Create the UI for the room if it doesn't exist
        // createPrivateConversationRoom({name:recipientName, id:recipientId});

        // // Add the message to the room
        // addMessageToConversation(window.me.id, recipientId, message);

        // // Send the private message
        // io.socket.post('/chat/private', {to:recipientId, msg: message});

        // }

        // // Create the HTML to hold a private conversation between two users
        // function createPrivateConversationRoom(penPal) {

        // // Get the ID of the HTML element for this private convo, if there is one
        // var roomName = 'private-room-'+penPal.id;

        // // If HTML for the room already exists, return.
        // if ($('#'+roomName).length) {
        //     return;
        // }

        // var penPalName = penPal.name == "unknown" ? ("User #"+penPal.id) : penPal.name;

        // // Create a new div to contain the room
        // var roomDiv = $('<div id="'+roomName+'"></div>');

        // // Create the HTML for the room
        // var roomHTML = '<h2>Private conversation with <span id="private-username-'+penPal.id+'">'+penPalName+'</span></h2>\n' +
        //                 '<div id="private-messages-'+penPal.id+'" style="width: 50%; height: 150px; overflow: auto; border: solid 1px #666; padding: 5px; margin: 5px"></div>'+
        //                 '<input id="private-message-'+penPal.id+'"/> <button id="private-button-'+penPal.id+'">Send message</button">';

        // roomDiv.html(roomHTML);

        // // Add the room to the private conversation area
        // $('#convos').append(roomDiv);

        // // Hook up the "send message" button
        // $('#private-button-'+penPal.id).click(onClickSendPrivateMessage);

        // }

        // // Callback for when the user clicks the "Send message" button in a private conversation
        // function onClickSendPrivateMessage(e) {

        // // Get the button that was pressed
        // var button = e.currentTarget;

        // // Get the ID of the user we want to send to
        // var recipientId = button.id.split('-')[2];

        // // Get the message to send
        // var message = $('#private-message-'+recipientId).val();
        // $('#private-message-'+recipientId).val("");

        // // Add this message to the room
        // addMessageToConversation(window.me.id, recipientId, message);

        // // Send the message
        // io.socket.post('/chat/private', {to: recipientId, msg: message});

        // }

        // // Add HTML for a new message in a private conversation
        // function addMessageToConversation(senderId, recipientId, message) {

        //     var fromMe = senderId == window.me.id;
        //     var roomName = 'private-messages-' + (fromMe ? recipientId : senderId);
        //     var senderName = fromMe ? "Me" : $('#private-username-'+senderId).html();
        //     var justify = fromMe ? 'right' : 'left';

        //     var div = $('<div style="text-align:'+justify+'"></div>');
        //     div.html('<strong>'+senderName+'</strong>: '+message);
        //     $('#'+roomName).append(div);

        // }

        // // Handle an incoming private message from the server.
        // function receivePrivateMessage(data) {

        //     var sender = data.from;

        //     // Create a room for this message if one doesn't exist
        //      createPrivateConversationRoom(sender);

        //     // Add a message to the room
        //     //addMessageToConversation(sender.id, window.me.id, data.msg);
        //     //$(".chat").append("<li class='left clearfix'><span class='chat-img pull-left'><img ng-src='img/Tenali.png' alt='BOT' class='img-circle  doneLoading' src='img/Tenali.png'></span><div class='chat-body'><p>"+data.msg+" </p></div></li>");
        //     console.log(data,"recvdmsg");
        //     mymsg = {Text:data.msg,type:"SYS_FIRST"};
        //     //$rootScope.chatlist.push({id:"id",msg:mymsg,position:"left",curTime: $rootScope.getDatetime()});
        //     $rootScope.pushSystemMsg(0,mymsg);  
        // }
        // window.me={};
        // io.socket.on('connect', function socketConnected() {

        //     // Show the main UI
        //     $('#disconnect').hide();
        //     $('#main').show();

        //     // Announce that a new user is online--in this somewhat contrived example,
        //     // this also causes the CREATION of the user, so each window/tab is a new user.
        //     userdata = {sid:$.jStorage.get("id"),name:$.jStorage.get("fname")+' '+$.jStorage.get("lname"),access_role:$.jStorage.get("access_role")};
        //     io.socket.get("/user/announce",{query:userdata}, function(data){
        //         //console.log(data);
        //         userdata.socketId = data.socketId;
        //         userdata.id = data.id;
        //         $.jStorage.set("socketId",userdata.socketId);
        //         $.jStorage.set("sid",userdata.sid);
        //         window.me = userdata;
        //         updateMyName(userdata);

        //         // Get the current list of users online.  This will also subscribe us to
        //         // update and destroy events for the individual users.
        //         io.socket.get('/user', updateUserList);

        //         // Get the current list of chat rooms. This will also subscribe us to
        //         // update and destroy events for the individual rooms.
        //         io.socket.get('/room', updateRoomList);

        //     });
            
        //     // Listen for the "room" event, which will be broadcast when something
        //     // happens to a room we're subscribed to.  See the "autosubscribe" attribute
        //     // of the Room model to see which messages will be broadcast by default
        //     // to subscribed sockets.
        //     io.socket.on('room', function messageReceived(message) {

        //         switch (message.verb) {

        //             // Handle room creation
        //             case 'created':
        //             addRoom(message.data);
        //             break;

        //             // Handle a user joining a room
        //             case 'addedTo':
        //             // Post a message in the room
        //             postStatusMessage('room-messages-'+message.id, $('#user-'+message.addedId).text()+' has joined');
        //             // Update the room user count
        //             increaseRoomCount(message.id);
        //             break;

        //             // Handle a user leaving a room
        //             case 'removedFrom':
        //             // Post a message in the room
        //             postStatusMessage('room-messages-'+message.id, $('#user-'+message.removedId).text()+' has left');
        //             // Update the room user count
        //             decreaseRoomCount(message.id);
        //             break;

        //             // Handle a room being destroyed
        //             case 'destroyed':
        //             removeRoom(message.id);
        //             break;

        //             // Handle a public message in a room.  Only sockets subscribed to the "message" context of a
        //             // Room instance will get this message--see the "join" and "leave" methods of RoomController.js
        //             // to see where a socket gets subscribed to a Room instance's "message" context.
        //             case 'messaged':
        //             receiveRoomMessage(message.data);
        //             break;

        //             default:
        //             break;

        //         }

        //     });

        //     // Listen for the "user" event, which will be broadcast when something
        //     // happens to a user we're subscribed to.  See the "autosubscribe" attribute
        //     // of the User model to see which messages will be broadcast by default
        //     // to subscribed sockets.
        //     io.socket.on('user', function messageReceived(message) {

        //         switch (message.verb) {

        //             // Handle user creation
        //             case 'created':
        //             addUser(message.data);
        //             break;

        //             // Handle a user changing their name
        //             case 'updated':

        //             // Get the user's old name by finding the <option> in the list with their ID
        //             // and getting its text.
        //             var oldName = $('#user-'+message.id).text();

        //             // Update the name in the user select list
        //             $('#user-'+message.id).text(message.data.name);

        //             // If we have a private convo with them, update the name there and post a status message in the chat.
        //             if ($('#private-username-'+message.id).length) {
        //                 $('#private-username-'+message.id).html(message.data.name);
        //                 postStatusMessage('private-messages-'+message.id,oldName+' has changed their name to '+message.data.name);
        //             }

        //             break;

        //             // Handle user destruction
        //             case 'destroyed':
        //             removeUser(message.id);
        //             break;

        //             // Handle private messages.  Only sockets subscribed to the "message" context of a
        //             // User instance will get this message--see the onConnect logic in config/sockets.js
        //             // to see where a new user gets subscribed to their own "message" context
        //             case 'messaged':
        //             receivePrivateMessage(message.data);
        //             break;

        //             default:
        //             break;
        //         }

        //     });

        //     // Add a click handler for the "Update name" button, allowing the user to update their name.
        //     // updateName() is defined in user.js.
        //     $('#update-name').click(updateName);

        //     // Add a click handler for the "Send private message" button
        //     // startPrivateConversation() is defined in private_message.js.
        //     $('#private-msg-button').click(startPrivateConversation);

        //     // Add a click handler for the "Join room" button
        //     // joinRoom() is defined in public_message.js.
        //     $('#join-room').click(joinRoom);

        //     // Add a click handler for the "New room" button
        //     // newRoom() is defined in room.js.
        //     $('#new-room').click(newRoom);

        //     console.log('Socket is now connected!');

        //     // When the socket disconnects, hide the UI until we reconnect.
        //     io.socket.on('disconnect', function() {
        //     // Hide the main UI
        //         $('#main').hide();
        //         $('#disconnect').show();
        //     });

        // });









        //io('http://localhost:8080');
        // var CONNECTION_METADATA_PARAMS = {
        //     version: '__sails_io_sdk_version',
        //     platform: '__sails_io_sdk_platform',
        //     language: '__sails_io_sdk_language'
        // };

        // var SDK_INFO = {
        //     version: '0.11.0',
        //     platform: typeof module === 'undefined' ? 'browser' : 'node',
        //     language: 'javascript'
        // };

        // SDK_INFO.versionString =
        //     CONNECTION_METADATA_PARAMS.version + '=' + SDK_INFO.version + '&' +
        //     CONNECTION_METADATA_PARAMS.platform + '=' + SDK_INFO.platform + '&' +
        //     CONNECTION_METADATA_PARAMS.language + '=' + SDK_INFO.language;

        // var socket = io.connect({
        //     query: SDK_INFO.versionString
        // });
        //io.sails.connect([io.sails.url]);
        
        // io.sails.connect('http://localhost:80');
        // var fullname = $.jStorage.get("fname")+" "+$.jStorage.get("lname");
        //addUser({id:$.jStorage.get("id"),name:fullname});
        /**
     * app.js
     *
     * Front-end code and event handling for sailsChat
     *
     */
    // io.socket.get('/chat/addconv',{}, function (resData, jwres){
    // // ...
    // });
        //$scope.feedEntries = $resource('/Feed').query();
        // apiService.Feed({}).then(function (callback){
        //     // io.socket.get('api/Feed/subscribe', function(data, jwr) {
        //     //     io.socket.on('new_entry', function(entry) {
        //     //         $timeout(function() {
        //     //             $scope.feedEntries.unshift(entry);
        //     //         });
        //     //     });
        //     // });
        //     io.socket.on("tweet", function(data){})
        // });
        
    


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


    .controller('CommonCtrl', function ($scope, TemplateService, NavigationService,CsrfTokenService, $timeout,$uibModal, toastr, $http,$state,apiService,$cookies,$rootScope) {
        $scope.logout = function() {

            CsrfTokenService.getCookie("csrftoken").then(function(token) {
                $scope.formData = {sessionid:$.jStorage.get("sessionid"),user:$.jStorage.get("id"),csrfmiddlewaretoken:token};
                apiService.logout($scope.formData).then(function (callback){
                    
                    
                    $rootScope.tabvalue.elements = [];
                    $rootScope.tabvalue.element_values = [];
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
                //console.log($scope.formData);
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
    .controller('LoginDetCtrl', function ($scope,$rootScope, TemplateService, NavigationService, $timeout, toastr, $http,$state,apiService) {
        $scope.fullname = "";
        $scope.branch = "";
        if($.jStorage.get("id") == null || $.jStorage.get("id") == "" || $.jStorage.get("id")==0)
        {
            $.jStorage.set("notloggedin",true);
            $rootScope.notLoggedin = true;
            $state.go("login");
        }    
        else
        {
            $scope.fullname = $.jStorage.get("fname")+" "+$.jStorage.get("lname");
            $scope.branch = $.jStorage.get("branch");
            $.jStorage.set("notloggedin",false);
            $rootScope.notLoggedin = false;
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
    .controller('SpeechRecognitionController', function ($scope, $rootScope) {

        var vm = this;

        vm.displayTranscript = displayTranscript;
        vm.transcript = '';
        function displayTranscript() {
            vm.transcript = $rootScope.transcript;
            //console.log("transcript",$rootScope.transcript);
            $(".chatinput").val($rootScope.transcript);
            $rootScope.pushMsg(0,$rootScope.transcript,"");
            //This is just to refresh the content in the view.
            if (!$scope.$$phase) {
                $scope.$digest();
                console.log("transcript",$rootScope.transcript);
            }
        }
        $rootScope.startspeech = function() {
            var recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            console.log("new func");
        // recognition.onresult = function(event) 
            { 
                console.log(event); 
            }
            recognition.start();
        };
        /**
         * Handle the received transcript here.
         * The result from the Web Speech Recognition will
         * be set inside a $rootScope variable. You can use it
         * as you want.
         */
        $rootScope.speechStarted = function() {
            console.log("speech Started");
        };
    

    })
    .controller('ChatCtrl', function ($scope, $rootScope,TemplateService, NavigationService,CsrfTokenService, $timeout,$http,apiService,$state,$uibModal,Menuservice,tts,$cookies,$sce) {
        $rootScope.contentobj = [];
        $rootScope.autocompletelist = [];
        $rootScope.chatOpen = false;
        $rootScope.showTimeoutmsg = false;
        $rootScope.firstMsg=false;
        $rootScope.chatmsg = "";
        $rootScope.chatmsgid = "";
        $rootScope.chatText = "";
        $rootScope.answers = "";
        $rootScope.msgSelected = false;
        $rootScope.showTdcal = false;
        $rootScope.showRdcal = false;
        $rootScope.showSTD = false;
        $rootScope.showCTD = false;
        $rootScope.agentconnected = false;
        $rootScope.lastagent ="";
        if($.jStorage.get("lastagent"))
            $rootScope.lastagent = $.jStorage.get("lastagent");
        
        
        
        
        
        
        // //Privatemsg
        // // Start a private conversation with another user
        // function startPrivateConversation() {

        // // Get the user list
        // var select = $('#users-list');

        // // Make sure a user is selected in the list
        // if (select.val() === null) {
        //     return alert('Please select a user to send a private message to.');
        // }

        // // Get the recipient's name from the text of the option in the <select>
        // var recipientName = $('option:selected', select).text();
        // var recipientId = select.val();

        // // Prompt for a message to send
        // var message = prompt("Enter a message to send to "+recipientName);

        // // Create the UI for the room if it doesn't exist
        // createPrivateConversationRoom({name:recipientName, id:recipientId});

        // // Add the message to the room
        // addMessageToConversation(window.me.id, recipientId, message);

        // // Send the private message
        // io.socket.post('/chat/private', {to:recipientId, msg: message});

        // }

        // // Create the HTML to hold a private conversation between two users
        // function createPrivateConversationRoom(penPal) {

        // // Get the ID of the HTML element for this private convo, if there is one
        // var roomName = 'private-room-'+penPal.id;

        // // If HTML for the room already exists, return.
        // if ($('#'+roomName).length) {
        //     return;
        // }

        // var penPalName = penPal.name == "unknown" ? ("User #"+penPal.id) : penPal.name;

        // // Create a new div to contain the room
        // var roomDiv = $('<div id="'+roomName+'"></div>');

        // // Create the HTML for the room
        // var roomHTML = '<h2>Private conversation with <span id="private-username-'+penPal.id+'">'+penPalName+'</span></h2>\n' +
        //                 '<div id="private-messages-'+penPal.id+'" style="width: 50%; height: 150px; overflow: auto; border: solid 1px #666; padding: 5px; margin: 5px"></div>'+
        //                 '<input id="private-message-'+penPal.id+'"/> <button id="private-button-'+penPal.id+'">Send message</button">';

        // roomDiv.html(roomHTML);

        // // Add the room to the private conversation area
        // $('#convos').append(roomDiv);

        // // Hook up the "send message" button
        // $('#private-button-'+penPal.id).click(onClickSendPrivateMessage);

        // }

        // // Callback for when the user clicks the "Send message" button in a private conversation
        // function onClickSendPrivateMessage(e) {

        // // Get the button that was pressed
        // var button = e.currentTarget;

        // // Get the ID of the user we want to send to
        // var recipientId = button.id.split('-')[2];

        // // Get the message to send
        // var message = $('#private-message-'+recipientId).val();
        // $('#private-message-'+recipientId).val("");

        // // Add this message to the room
        // addMessageToConversation(window.me.id, recipientId, message);

        // // Send the message
        // io.socket.post('/chat/private', {to: recipientId, msg: message});

        // }

        // // Add HTML for a new message in a private conversation
        // function addMessageToConversation(senderId, recipientId, message) {

        //     var fromMe = senderId == window.me.id;
        //     var roomName = 'private-messages-' + (fromMe ? recipientId : senderId);
        //     var senderName = fromMe ? "Me" : $('#private-username-'+senderId).html();
        //     var justify = fromMe ? 'right' : 'left';

        //     var div = $('<div style="text-align:'+justify+'"></div>');
        //     div.html('<strong>'+senderName+'</strong>: '+message);
        //     $('#'+roomName).append(div);

        // }

        // // Handle an incoming private message from the server.
        // function receivePrivateMessage(data) {

        //     var sender = data.from;

        //     // Create a room for this message if one doesn't exist
        //      createPrivateConversationRoom(sender);

        //     // Add a message to the room
        //     //addMessageToConversation(sender.id, window.me.id, data.msg);
        //     //$(".chat").append("<li class='left clearfix'><span class='chat-img pull-left'><img ng-src='img/Tenali.png' alt='BOT' class='img-circle  doneLoading' src='img/Tenali.png'></span><div class='chat-body'><p>"+data.msg+" </p></div></li>");
        //     console.log(data,"recvdmsg");
        //     mymsg = {Text:data.msg,type:"SYS_FIRST"};
        //     //$rootScope.chatlist.push({id:"id",msg:mymsg,position:"left",curTime: $rootScope.getDatetime()});
        //     $rootScope.pushSystemMsg(0,mymsg);  
        // }

        // window.me = {};
        // console.log($.jStorage.get("notloggedin"));
        // if(!$.jStorage.get("notloggedin"))
        // {
        //     //Chatapp
        //         /**
        //      * app.js
        //      *
        //      * Front-end code and event handling for sailsChat
        //      *
        //      */

            
        //     // Attach a listener which fires when a connection is established:
        //     io.socket.on('connect', function socketConnected() {

        //         // Show the main UI
        //         $('#disconnect').hide();
        //         $('#main').show();

        //         // Announce that a new user is online--in this somewhat contrived example,
        //         // this also causes the CREATION of the user, so each window/tab is a new user.
        //         userdata = {sid:$.jStorage.get("id"),name:$.jStorage.get("fname")+' '+$.jStorage.get("lname"),access_role:$.jStorage.get("access_role")};
        //         io.socket.get("/user/announce",{query:userdata}, function(data){
        //             //console.log(data);
        //             userdata.socketId = data.socketId;
        //             userdata.id = data.id;
        //             $.jStorage.set("socketId",userdata.socketId);
        //             $.jStorage.set("sid",userdata.sid);
        //             window.me = userdata;
        //             updateMyName(userdata);

        //             // Get the current list of users online.  This will also subscribe us to
        //             // update and destroy events for the individual users.
        //             io.socket.get('/user', updateUserList);

        //             // Get the current list of chat rooms. This will also subscribe us to
        //             // update and destroy events for the individual rooms.
        //             io.socket.get('/room', updateRoomList);

        //         });
                
        //         // Listen for the "room" event, which will be broadcast when something
        //         // happens to a room we're subscribed to.  See the "autosubscribe" attribute
        //         // of the Room model to see which messages will be broadcast by default
        //         // to subscribed sockets.
        //         io.socket.on('room', function messageReceived(message) {

        //             switch (message.verb) {

        //                 // Handle room creation
        //                 case 'created':
        //                 addRoom(message.data);
        //                 break;

        //                 // Handle a user joining a room
        //                 case 'addedTo':
        //                 // Post a message in the room
        //                 postStatusMessage('room-messages-'+message.id, $('#user-'+message.addedId).text()+' has joined');
        //                 // Update the room user count
        //                 increaseRoomCount(message.id);
        //                 break;

        //                 // Handle a user leaving a room
        //                 case 'removedFrom':
        //                 // Post a message in the room
        //                 postStatusMessage('room-messages-'+message.id, $('#user-'+message.removedId).text()+' has left');
        //                 // Update the room user count
        //                 decreaseRoomCount(message.id);
        //                 break;

        //                 // Handle a room being destroyed
        //                 case 'destroyed':
        //                 removeRoom(message.id);
        //                 break;

        //                 // Handle a public message in a room.  Only sockets subscribed to the "message" context of a
        //                 // Room instance will get this message--see the "join" and "leave" methods of RoomController.js
        //                 // to see where a socket gets subscribed to a Room instance's "message" context.
        //                 case 'messaged':
        //                 receiveRoomMessage(message.data);
        //                 break;

        //                 default:
        //                 break;

        //             }

        //         });

        //         // Listen for the "user" event, which will be broadcast when something
        //         // happens to a user we're subscribed to.  See the "autosubscribe" attribute
        //         // of the User model to see which messages will be broadcast by default
        //         // to subscribed sockets.
        //         io.socket.on('user', function messageReceived(message) {

        //             switch (message.verb) {

        //                 // Handle user creation
        //                 case 'created':
        //                 addUser(message.data);
        //                 break;

        //                 // Handle a user changing their name
        //                 case 'updated':

        //                 // Get the user's old name by finding the <option> in the list with their ID
        //                 // and getting its text.
        //                 var oldName = $('#user-'+message.id).text();

        //                 // Update the name in the user select list
        //                 $('#user-'+message.id).text(message.data.name);

        //                 // If we have a private convo with them, update the name there and post a status message in the chat.
        //                 if ($('#private-username-'+message.id).length) {
        //                     $('#private-username-'+message.id).html(message.data.name);
        //                     postStatusMessage('private-messages-'+message.id,oldName+' has changed their name to '+message.data.name);
        //                 }

        //                 break;

        //                 // Handle user destruction
        //                 case 'destroyed':
        //                 removeUser(message.id);
        //                 break;

        //                 // Handle private messages.  Only sockets subscribed to the "message" context of a
        //                 // User instance will get this message--see the onConnect logic in config/sockets.js
        //                 // to see where a new user gets subscribed to their own "message" context
        //                 case 'messaged':
        //                 receivePrivateMessage(message.data);
        //                 break;

        //                 default:
        //                 break;
        //             }

        //         });

        //         // Add a click handler for the "Update name" button, allowing the user to update their name.
        //         // updateName() is defined in user.js.
        //         $('#update-name').click(updateName);

        //         // Add a click handler for the "Send private message" button
        //         // startPrivateConversation() is defined in private_message.js.
        //         $('#private-msg-button').click(startPrivateConversation);

        //         // Add a click handler for the "Join room" button
        //         // joinRoom() is defined in public_message.js.
        //         $('#join-room').click(joinRoom);

        //         // Add a click handler for the "New room" button
        //         // newRoom() is defined in room.js.
        //         $('#new-room').click(newRoom);

        //         console.log('Socket is now connected!');

        //         // When the socket disconnects, hide the UI until we reconnect.
        //         io.socket.on('disconnect', function() {
        //         // Hide the main UI
        //             $('#main').hide();
        //             $('#disconnect').show();
        //         });

        //     });
        // }




        // var mylist = $.jStorage.get("chatlist");
        // if(!mylist || mylist == null)
        //     $rootScope.chatlist = [];
        // else
        //     $rootScope.chatlist = $.jStorage.get("chatlist");
        $rootScope.chatlist=[];
        $rootScope.autolistid="";
        $rootScope.autolistvalue="";
        $rootScope.showMsgLoader=false;
        $rootScope.rate_count= 0;
        //$("#testLoad").load("http://wohlig.com/");
        var vm = this;
        
        vm.displayTranscript = displayTranscript;
        vm.transcript = '';
        //  //$rootScope.transcript = "";
        // // $rootScope.displayTranscript = function() {
        // //     //vm.transcript = $rootScope.transcript;
        // //     $(".chatinput").val($rootScope.transcript);
        // //     console.log("Speech",$rootScope.transcript);
        // //     //This is just to refresh the content in the view.
        // //     if (!$scope.$$phase) {
        // //         $scope.$digest();
        // //     }
        // // };
        // $rootScope.speechEnd = function() {
        //     console.log("Speech Ended");
        // };
        
        // //vm.displayTranscript = $rootScope.displayTranscript();
        
        // $rootScope.speechStarted = function() {
        //     console.log("speech Started");
        // };
        // /**
        //  * Handle the received transcript here.
        //  * The result from the Web Speech Recognition will
        //  * be set inside a $rootScope variable. You can use it
        //  * as you want.
        //  */
        function displayTranscript() {
            vm.transcript = $rootScope.transcript;
            console.log("transcript",$rootScope.transcript);
            $(".chatinput").val($rootScope.transcript);
            //This is just to refresh the content in the view.
            if (!$scope.$$phase) {
                $scope.$digest();
                console.log("transcript",$rootScope.transcript);
            }
        }
        // function displayTranscript() {
        //     vm.transcript = $rootScope.transcript;
        //     $(".chatinput").val($rootScope.transcript);
        //     console.log("Speech",$rootScope.transcript);
        //     //This is just to refresh the content in the view.
        //     if (!$scope.$$phase) {
        //         $scope.$digest();
        //     }
        // }
        $rootScope.trustedHtml = function (plainText) {
            return $sce.trustAsHtml(plainText);
        };
        $rootScope.getCookie = function(c_name)
		{
			if (document.cookie.length > 0)
			{
				c_start = document.cookie.indexOf(c_name + "=");
				if (c_start != -1)
				{
					c_start = c_start + c_name.length + 1;
					c_end = document.cookie.indexOf(";", c_start);
					if (c_end == -1) c_end = document.cookie.length;
					return unescape(document.cookie.substring(c_start,c_end));
				}
			}
			return "";
		};
        $rootScope.findTopic = function(topic) {
            var prev = "";
            if(topic == "")
            {
                $("#topiclist li").parent().find('ul.tree').toggle(300);
                $("#topiclist li").parent().children("a").find('.triangle').toggleClass('glyphicon-triangle-bottom').toggleClass('glyphicon-triangle-right');
                $("#topiclist li").show();
            }
            else
                $("#topiclist li").hide();
            $("h3#topic").text(topic);
            $("#topiclist li").each(function(){
                
                var keyword = new RegExp($(this).children("a").find().attr("id"), 'i');
                //console.log($(this).text().search(new RegExp(topic, "i")));
                //if (keyword.test(topic))
                if($(this).find("a").text().search(new RegExp(topic, "i"))<0)
                { }
                else
                {
                    $(this).show();
                    $(this).children("a").find().show();
                    if($(this).parent().find('ul.tree').is(':visible')) {
                        
                    }
                    else
                    {
                        $(this).parent().find('ul.tree').toggle(300);
                        $(this).parent().children("a").find('.triangle').toggleClass('glyphicon-triangle-bottom').toggleClass('glyphicon-triangle-right');
                    }
                    
                    //console.log("found",topic);   
                }
                //$(this).find(".section_last").removeClass("active");
            });
        };
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
        
        $rootScope.getAutocomplete = function(chatText) {
            console.log($rootScope.answers);
            if( $rootScope.answers == "")
            {
                $rootScope.showTimeoutmsg = false;
                // if(!$rootScope.showTimeoutmsg && chatText=="") 
                // {
                //     $timeout(function () {
                //         //$rootScope.showTimeoutmsg = true;
                //         // msg = {Text:"Any Confusion ? How May I help You ?",type:"SYS_INACTIVE"};
                //         // $rootScope.pushSystemMsg(0,msg);
                //     },60000);
                // }
                //console.log("HI");
                $rootScope.chatText = chatText;
                if($(".chatinput").val() == "" || $(".chatinput").val() == null) {
                    $rootScope.autocompletelist = [];
                    console.log("null");
                }
                else {
                    var str2 = $rootScope.chatText;
                    str2 = str2.toLowerCase();
                    if (str2.includes("calculator") || str2.includes("td cal") || str2.includes("rd cal") || str2.includes("calc") )
                    //if($rootScope.chatText != "calc" || $rootScope.chatText != "calculator" || $rootScope.chatText != "td cal" || $rootScope.chatText != "rd cal")
                    {
                        //console.log("not calc");
                    }
                    else     
                    {  
                        var topic = $("#topic").text();
                        $rootScope.chatdata = { string:$rootScope.chatText,topic:topic};
                        apiService.getautocomplete($rootScope.chatdata).then(function (response){
                            //console.log(response.data);
                            $rootScope.autocompletelist = response.data.data;
                        });
                    }
                }
            }
        };
        $rootScope.pushSystemMsg = function(id,value) {
            $rootScope.chatmsgid = id;
            $rootScope.chatmsg = value;
            $rootScope.autocompletelist = [];
            $rootScope.chatlist.push({id:"id",msg:value,position:"left",curTime: $rootScope.getDatetime()});
            $.jStorage.set("chatlist",$rootScope.chatlist);
            $timeout(function(){
                $rootScope.scrollChatWindow();
            });
            
        };
        $rootScope.showChatwindow = function () {
            newlist = $.jStorage.get("chatlist");
            // if(!newlist || newlist == null)
            // {
            //     $rootScope.firstMsg = false;
            // }
            // else
            // { 
            //     $rootScope.firstMsg = true;
            // }
            // $.jStorage.set("showchat",true);
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
        $rootScope.pushAutoMsg = function(id,value,answer) {
            $rootScope.msgSelected = true;
            $rootScope.chatmsgid = id;
            $rootScope.chatmsg = value;
            $rootScope.answers = answer;
            $rootScope.autocompletelist = [];
            $rootScope.chatlist.push({id:id,msg:value,position:"right",curTime: $rootScope.getDatetime()});
            var automsg = { Text: answer , type : "SYS_AUTO"};
            $rootScope.pushSystemMsg(id,automsg);
            $rootScope.showMsgLoader = false;
            //$.jStorage.set("chatlist",$rootScope.chatlist);
            $rootScope.msgSelected = false;
            $rootScope.chatmsgid = "";
            $rootScope.chatmsg = "";
            $rootScope.answers = "";
            $(".chatinput").val("");
            $rootScope.autolistid = "";
            $rootScope.chatText = "";
            $rootScope.scrollChatWindow();
        };
        
        $rootScope.showSTDcal = function(){
            $rootScope.showSTD = true;
            $rootScope.showCTD = false;
            // $("#simple-form").delay(100).fadeIn(100);
            // $("#cumu-form").fadeOut(100);
        };
        $rootScope.showCTDcal = function(){
            $rootScope.showSTD = false;
            $rootScope.showCTD = true;
            // $("#cumu-form").delay(100).fadeIn(100);
            // $("#simple-form").fadeOut(100);
            
        };
        $rootScope.showTdcalc = function(){
            $rootScope.showTdcal = true;
            $rootScope.showRdcal = false;
        };
        $rootScope.showRdcalc = function(){
            $rootScope.showTdcal = false;
            $rootScope.showRdcal = true;
            $rootScope.showSTDcal();
        };
        $rootScope.tdcalc = function(mon,rate,tenure,index) {
            var mondep = parseFloat(mon);
            var rate = parseFloat(rate);
            var ten = parseFloat(tenure);
            var rdmValue = mondep * (  (Math.pow((1+rate/4),(ten/3))-1  )/(1-(Math.pow(1+rate/4),(-1/3))));
            $('.rdm'+index).val(rdmValue.toFixed(2));
        };
        $rootScope.calcSTD = function(principal,rate,tenure,index) {
            var principal = parseFloat(principal);
            var rate2 = parseFloat(rate);
            var tenure_days = parseFloat(tenure);
            var tenure_yrs = tenure_days/365;
            $('.tenure_yrs'+index).val(tenure_yrs.toFixed(2));
            var int_maturity = (principal * rate2 * tenure_yrs)/100;
            $('.int_maturity'+index).val(int_maturity.toFixed(2));
            var val_maturity = principal + int_maturity;
            $('.val_maturity'+index).val(val_maturity.toFixed(2));
        };
        $rootScope.calcCTD = function(principal,rate,tenure,index) {
            var cumu_principal = parseFloat(principal);
            var cumu_rate2 = parseFloat(rate);
            var cumu_tenure_days = parseFloat(tenure);
            var cumu_tenure_yrs = cumu_tenure_days/365;
            var cumu_val_maturity = cumu_principal * (1+(cumu_rate2/400))^(4*cumu_tenure_yrs);
            var cumu_int_maturity = cumu_val_maturity - cumu_principal;
            $('.cumu_tenure_yrs'+index).val(cumu_tenure_yrs.toFixed(2));
            $('.cumu_int_maturity'+index).val(cumu_int_maturity.toFixed(2));
            $('.cumu_val_maturity'+index).val(cumu_val_maturity.toFixed(2));
        };
        $rootScope.pushMsg = function(id,value,answer) {
            $rootScope.msgSelected = true;
            $rootScope.chatmsgid = id;
            $rootScope.chatmsg = value;
            if($rootScope.agentconnected)
            {
                $rootScope.autocompletelist = [];
                $rootScope.chatlist.push({id:"id",msg:value,position:"right",curTime: $rootScope.getDatetime()});
                $rootScope.sendMsgtoagent(value);
            }
            else {

                if(answer == "")
                {
                    if(value != "")
                    {
                        $rootScope.autocompletelist = [];
                        $rootScope.chatlist.push({id:"id",msg:value,position:"right",curTime: $rootScope.getDatetime()});
                        str2 = value;
                        str2 = str2.toLowerCase();
                        if (str2.includes("calculator") || str2.includes("td cal") || str2.includes("rd cal") || str2.includes("calc") )
                        {
                            $rootScope.showTdcal = false;
                            $rootScope.showRdcal = false;
                            $rootScope.showSTD = false;
                            $rootScope.showCTD = false;
                            var automsg = {  type : "SYS_CALC"};
                            $rootScope.chatlist.push({id:id,msg:automsg,position:"left",curTime: $rootScope.getDatetime()});
                            $rootScope.showMsgLoader=false;
                            $rootScope.msgSelected = false;
                            $timeout(function(){
                                $rootScope.autocompletelist = [];
                            },1000);
                            
                        }
                        else
                        {
                            $rootScope.getSystemMsg(id,value);
                            $rootScope.msgSelected = false;
                            $rootScope.showMsgLoader=true;
                        }
                        
                        $.jStorage.set("chatlist",$rootScope.chatlist);
                        
                        
                        $rootScope.chatText = "";
                        $rootScope.autolistvalue = "";
                        $rootScope.autolistid = "";
                        $rootScope.chatmsg = "";
                        $rootScope.chatmsgid = "";
                        $rootScope.autocompletelist = [];
                        $rootScope.scrollChatWindow();    
                    }
                }
                else {
                    $rootScope.pushAutoMsg(id,value,answer);
                }
            }
        };
        
        if($.jStorage.get("showchat"))
        {
            if($rootScope.uipage != 'dashboard')
                 $rootScope.showChatwindow();
        }
        else
            $rootScope.minimizeChatwindow();

        $rootScope.ratecardSubmit = function(coldata,rowdata) {
            console.log(coldata,rowdata);
            $scope.formData = {csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),user_id:$cookies.get("session_id"),user_input:coldata+","+rowdata,auto_id:"",auto_value:"",coldata:coldata,rowdata:rowdata,type:"rate card"};
            apiService.ratecardsubmit($scope.formData).then(function (data){
				//console.log(data);
				angular.forEach(data.data.tiledlist, function(value, key) {
                        //console.log(value);
					if(value.type=="text")
					{
						//console.log(data.data.tiledlist[0].text);
						if(data.data.tiledlist[0].Text != "-")
						{
							$rootScope.pushSystemMsg(0,data.data);
							$rootScope.showMsgLoader = false;
							$timeout(function(){
								var textspeech = data.data.tiledlist[0].Text;
								
								
								$.jStorage.set("texttospeak",textspeech);

								$('#mybtn_trigger').trigger('click');
								
							},200);
							
							return false;
						}
					}
				});
            });

        };
        $rootScope.getDthlinkRes = function(stage,dthlink,index) {
            //console.log(colno,lineno,dthlink);
            //mysession = $.jStorage.get("sessiondata");
            var mysession = {};
            
            console.log(stage+"-"+dthlink);
            mysession.DTHlink=dthlink;
            //mysession.DTHline=lineno;
            //mysession.DTHcol=colno;
            mysession.DTHstage=stage;
            // formData = {};
            // formData.DTHcol = colno;
            // formData.DTHline = lineno;
            // formData.DTHlink = dthlink;
            formData = mysession;
            formData.csrfmiddlewaretoken=$rootScope.getCookie("csrftoken");
            formData.user_id=$cookies.get("session_id");
            //console.log(formData);
            apiService.getDthlinkRes(formData).then(function (data){
                angular.forEach(data.data.tiledlist, function(value, key) {
                    if(value.type=="DTHyperlink")
                    {
                        $rootScope.DthResponse(0,data.data);
                        if(data.data.tiledlist[0].sub_topic_list || data.data.tiledlist[0].sub_topic_list != null)
                        {
                            $rootScope.openMenu(data.data.tiledlist[0].sub_topic_list);
                        }
                        if(data.data.tiledlist[0].Script || data.data.tiledlist[0].Script != null)
                        {
                            // if(data.data.tiledlist[0].Script.length== 0)
                            //     $rootScope.tabHeight = window.innerHeight-53;
                            // else
                            //     $rootScope.tabHeight = 300;
                            
                        }
                        if(data.data.session_obj_data || data.data.session_obj_data != null)
                            $.jStorage.set("sessiondata",data.data.session_obj_data);
                        if(data.data.tiledlist[0].topic)
                            $("#topic").text(data.data.tiledlist[0].topic);
                        //$.jStorage.set("sessiondata",data.data.session_obj_data);
                    }
                });
            }).catch(function(reason){
                console.log(reason);
            });
        };
        $rootScope.getDthlinkRes2 = function(stage,dthlink,index) {
            //console.log(colno,lineno,dthlink);
            //mysession = $.jStorage.get("sessiondata");
            var mysession = {};
            
            console.log(stage+"-"+dthlink);
            mysession.DTHlink=dthlink;
            //mysession.DTHline=lineno;
            //mysession.DTHcol=colno;
            mysession.DTHstage=stage;
            // formData = {};
            // formData.DTHcol = colno;
            // formData.DTHline = lineno;
            // formData.DTHlink = dthlink;
            formData = mysession;
            formData.csrfmiddlewaretoken=$rootScope.getCookie("csrftoken");
            formData.user_id=$cookies.get("session_id");
            //console.log(formData);
            apiService.getDthlinkRes(formData).then(function (data){
                angular.forEach(data.data.tiledlist, function(value, key) {
                    if(value.type=="DTHyperlink")
                    {
                        $rootScope.DthResponse2(0,data.data,dthlink);
                        if(data.data.tiledlist[0].sub_topic_list || data.data.tiledlist[0].sub_topic_list != null)
                        {
                            $rootScope.openMenu(data.data.tiledlist[0].sub_topic_list);
                        }
                        if(data.data.tiledlist[0].Script || data.data.tiledlist[0].Script != null)
                        {
                            if(data.data.tiledlist[0].Script.length== 0)
                                $rootScope.tabHeight = window.innerHeight-53;
                            else
                                $rootScope.tabHeight = 300;
                            
                        }
                        if(data.data.session_obj_data || data.data.session_obj_data != null)
                            $.jStorage.set("sessiondata",data.data.session_obj_data);
                        if(data.data.tiledlist[0].topic)
                            $("#topic").text(data.data.tiledlist[0].topic);
                        //$.jStorage.set("sessiondata",data.data.session_obj_data);
                    }
                });
            });
        };
        $rootScope.notedata = [];
        $rootScope.getnotedata=function(value,table) {
            console.log(value);
            console.log(table);
            formData = {table:table,value:value};
            apiService.getnoteval(formData).then(function (data){
                console.log(data);
                if(value.col == 'NTB_New_to_bank_customer')
                {
                    //console.log(data.data.data[0].NTB_New_to_bank_customer);
                    $rootScope.notedata = data.data.data[0].NTB_New_to_bank_customer;
                }
                else if(value.col == 'For_Existing_CRN_new_account_opening')
                {
                    console.log(value);
                    //console.log(data.data.data[0].For_Existing_CRN_new_account_opening);
                    $rootScope.notedata = data.data.data[0].For_Existing_CRN_new_account_opening;
                }
                //$rootScope.notedata = data.data.data[0].value;
                console.log($rootScope.notedata);
            });
        };
        $rootScope.viewdata = "";
        $rootScope.$viewmodalInstance1 = {};
        $rootScope.openContentModal = function(d) {
            console.log(d);
            $rootScope.viewdata = d;
            $rootScope.sendobj = {viewdata : $rootScope.viewdata,contentobj:$rootScope.contentobj};
            $rootScope.$viewmodalInstance1 = $uibModal.open({
                scope: $rootScope,
                animation: true,
                size: 'lg',
                templateUrl: 'views/modal/content.html',
                resolve: {
                    items: function () {
                    return $rootScope.sendobj;
                    }
                },
                controller: 'ViewCtrl'
            });
        };
        $rootScope.contentCancel = function(){
            $scope.$viewmodalInstance1.dismiss('cancel');
        };
        $rootScope.DthResponse = function(id,data) {
            if(data.tiledlist[0].DT.length > 0 || data.tiledlist[0].Text != "")
            {
				//if()
				{
					
					// var images = Array();
					// var process = Array();
                    // process = data.tiledlist[0].Process;
                    // var dtstage = data.tiledlist[0].Stage;
                    // var dtstage = dtstage.replace(".", "");
                    // data.tiledlist[0].bgstage = dtstage;
					// /*_.each(data.tiledlist[0].Process,function(v,k){
					// 	if (v.indexOf(".png") >= 0) 
					// });*/
					//  images = _.remove(process, function(n) {
					//   return n.indexOf(".png") >= 0;
					// });
					// //console.log(images);
					// data.tiledlist[0].Process =process;
					// data.tiledlist[0].images =images; //|| images.length > 0
					if((data.tiledlist[0].Stage == '0') && data.tiledlist[0].DT.length > 0 || ( data.tiledlist[0].Text != "" && data.tiledlist[0].Text)  )
                        $rootScope.pushSystemMsg(id,data);
                    if(data.tiledlist[0].Stage != '0')
                    {
                        if(!data.tiledlist[0].Script || data.tiledlist[0].Script.length== 0 )
                            $rootScope.tabHeight = window.innerHeight-53;
                        else
                            $rootScope.tabHeight = 300;
                    }
					// if(images.length > 0)
					// {
					// 	$timeout(function(){
					// 		$('#myCarousel2').carousel({
					// 			interval: false,
					// 			wrap: false
					// 		});
					// 		$('#myCarousel2').find('.item').first().addClass('active');
					// 	},2000);
						
					// }
				}
            }
           
            
            $rootScope.collapse_arr = new Array();
            var process = data.tiledlist[0].Process;
            // _.each(process,function(v,k){
            //     var res = v.split("!."); 
            //     if(res.length == 1)
            //     {}
            //     else
            //     {
            //         var col_obj = {heading:res[0],collapse:res[1]};
            //         $rootScope.collapse_arr.push(col_obj);
            //         process[k] = col_obj;
            //         $rootScope.tabHeight = window.innerHeight-120-53;
            //     }
            // });
            data.tiledlist[0].Process = process;
            var ele = ele = new Array("Process");
            var ele_val = new Array(data.tiledlist[0]);
            console.log(data.tiledlist[0].Process);
            $rootScope.showMsgLoader = false; 
            $rootScope.selectTabIndex = 0;
            $rootScope.contentobj = [];
            if(data.tiledlist[0].Quik_Tip)
            {
                
                
                ele = new Array("Process","Exception Scenarios");
                ele_val = new Array(data.tiledlist[0],data.tiledlist[0]);
                //if(data.tiledlist[0].Quik_Tip.length == 0)
                {
                    $rootScope.getnotedata(data.tiledlist[0].Quik_Tip[0],data.tiledlist[0].Table);
                }
                //var ele_val = new Array(data.tiledlist[0],data.tiledlist[0]);
                // if(!data.tiledlist[0].Script || data.tiledlist[0].Script.length== 0)
                //     $rootScope.tabHeight = window.innerHeight-53;
                // else
                //     $rootScope.tabHeight = 300;
            }
            if(data.tiledlist[0].Address_Change)
            {
                $rootScope.contentobj.push({data:data.tiledlist[0].Address_Change,type:"Address_Change"});
                // ele.push("Address Change");
                // ele_val.push(data.tiledlist[0]);
                $rootScope.tabHeight = window.innerHeight-120-53;
            }
            if(data.tiledlist[0].Dormant_Activation)
            {
                $rootScope.contentobj.push({data:data.tiledlist[0].Dormant_Activation,type:"Dormant_Activation"});
                $rootScope.tabHeight = window.innerHeight-120-53;
                // ele.push("Dormant Activation");
                // ele_val.push(data.tiledlist[0]);
            }
            if(data.tiledlist[0].verify_seeding_info)
            {
                $rootScope.contentobj.push({data:data.tiledlist[0].verify_seeding_info,type:"verify_seeding_info"});
                // ele.push("Address Change");
                // ele_val.push(data.tiledlist[0]);
                $rootScope.tabHeight = window.innerHeight-120-53;
            }
            if(data.tiledlist[0].name_mismatch_table)
            {
                $rootScope.contentobj.push({data:data.tiledlist[0].name_mismatch_table,type:"name_mismatch_table"});
                // ele.push("Address Change");
                // ele_val.push(data.tiledlist[0]);
                $rootScope.tabHeight = window.innerHeight-120-53;
            }
            
            $rootScope.tabvalue.elements = ele;
            $rootScope.tabvalue.element_values=ele_val;
            // if(data.node_data)
            // {
            //     //var node_data = {"node_data": {"elements": ["Guidelines", "Shifting", "Accessibility", "Charges"], "element_values": ["<br>To define general guidelines to be followed by Branches while processing Account Closure. <br><br> Branch should attempt for retention of account before closing the account as opening a new account is expensive. <br><br> Channels through which Account Closure request is received: <br> 1. Customers In Person (CIP) who walk in to the Branch <br>\n2. Representatives/Bearer of customers who walk in to the Branch <br>\n3. Mail / Drop Box <br><br> Check Documentation and Signature Protocol <br><br> Check Mode of Payment for closure Proceeds <br><br> Check for Customer Handling on receipt of request <br><br> Check Process at Branch \u2013Checks during acceptance of closure form <br><br> Check Process at Branch- Post acceptance of Closure form <br><br> ", "<br>Customer is unwilling to give us another chance  <br>\n1) In case of Issues expressed by the customer where he / she is willing to give the Bank another chance. <br><br>\n2) Branch to attempt fix the problem within 48 hours or 7 days on the outside for extreme cases and revert to the customer. This TAT for revert to be communicated to the customer upfront. <br><br>\n3) Customers to be sent a personalised letter thanking them for their time and an acknowledgement, that we value their business and have remedied whatever caused them to want to leave in the first place. A list of all reasons for closure with the action taken, to be stated.  <br><br>\n4) Once the customer has been retained, the customer letter / form duly marked \u201cNOT FOR CLOSURE \u2013 RETAINED\u201d, along with a copy of the resolution letter to be sent to CPC for filing in the customer record.  <br><br>\n5) Siebel to be updated with the same comment and closed.  <br><br>In case the BOM/SM/BM/ RBM / AM or the branch staff are able / Not able  to retain the customer, then protthe SR which has been created needs to be closed with the Closure Description in Siebel as, \u201cCustomer Retained\u201d. This needs to be done diligently and would be subject to audits.\nCustomer will pay the  necessary amount to regularize the account <br>\nCustomer is unwilling to regularize the account after all attempts then branch user to follow the protocol as detailed in chapter \u201cAccount closure requests with debit balance/TBMS lien.\u201d <br><br>\n1) Where the customer is not willing to continue, Branch to ensure that the complete details on Account closure form and all the checks to be made as detailed in the chapter  \u201cGeneral Guidelines to be followed for Account closure\u201d <br><br>\n2) In case of any incomplete request, the customer needs to be apprised of the requirements and Siebel to be updated accordingly. <br><br>\n3) If the a/c closure request is complete in all respects / once the complete request is received from the customer, the same needs to be sent to CPC, post updating the Siebel <br><br>\n4) Branch to journal of the attempts made to retain the customer. <br><br>\nIn case the BOM/SM/BM/ RBM / AM or the branch staff are able / Not able  to retain the customer, then protthe SR which has been created needs to be closed with the Closure Description in Siebel as, \u201cCustomer Retained\u201d. This needs to be done diligently and would be subject to audits.", "<br>If customer is closing his/ her account due to inconvenient accessibility, solutions like Home Banking, Beat Pick up facility, etc. should be re-iterated. <br>\nIn case customer has an account which he/ she is not eligible for an accessibility offering he/ she is interested in, an upgraded account should be offered especially if account balances justify it (ensure that new AMB/AQBs and NMCs are communicated clearly).Customer is unwilling to give us another chance  <br><br>\n1) In case of Issues expressed by the customer where he / she is willing to give the Bank another chance.  <br><br>\n2) Branch to attempt fix the problem within 48 hours or 7 days on the outside for extreme cases and revert to the customer. This TAT for revert to be communicated to the customer upfront. <br><br>\n3) Customers to be sent a personalised letter thanking them for their time and an acknowledgement, that we value their business and have remedied whatever caused them to want to leave in the first place. A list of all reasons for closure with the action taken, to be stated.  <br><br>\n4) Once the customer has been retained, the customer letter / form duly marked \u201cNOT FOR CLOSURE \u2013 RETAINED\u201d, along with a copy of the resolution letter to be sent to CPC for filing in the customer record.  <br><br>\n5) Siebel to be updated with the same comment and closed.  <br><br>\nIn case the BOM/SM/BM/ RBM / AM or the branch staff are able / Not able  to retain the customer, then protthe SR which has been created needs to be closed with the Closure Description in Siebel as, \u201cCustomer Retained\u201d.  <br><br> This needs to be done diligently and would be subject to audits.  <br><br>\nCustomer is unwilling to give another chance: < <br><br>> Customer will pay the  necessary amount to regularize the account  <br><br>\nCustomer is unwilling to regularize the account after all attempts then branch user to follow the protocol as detailed in chapter \u201cAccount closure requests with debit balance/TBMS lien.\u201d  <br><br>\n1) Where the customer is not willing to continue, Branch to ensure that the complete details on Account closure form and all the checks to be made as detailed in the chapter  \u201cGeneral Guidelines to be followed for Account closure\u201d  <br><br>\n2) In case of any incomplete request, the customer needs to be apprised of the requirements and Siebel to be updated accordingly.  <br><br>\n3) If the a/c closure request is complete in all respects / once the complete request is received from the customer, the same needs to be sent to CPC, post updating the Siebel  <br><br> \n4) Branch to journal of the attempts made to retain the customer.  <br><br>\nIn case the BOM/SM/BM/ RBM / AM or the branch staff are able / Not able  to retain the customer, then protthe SR which has been created needs to be closed with the Closure Description in Siebel as, \u201cCustomer Retained\u201d. This needs to be done diligently and would be subject to audits.C2", "<br>1) Customer expresses concerns on high charges, ascertain the nature of charges levied and recommend an upgraded account where required (e.g. if customer finds DD charges high, up-sell to an account with a higher free DD limit or an account offering At Par cheque facility if usage is on our locations). Communicate the AMB/AQB and NMC to customer clearly. <br><br>\n2) The account can be upgraded/downgrade as per customer requirement by retaining the same account Number  <br><br>\n3) Branch can also explain the benefits of Basic/Small Account and offer conversion to the said  account as it will address their inability to maintain the account.  <br><br>\nCustomer is unwilling to give us another chance  <br><br>\n1) In case of Issues expressed by the customer where he / she is willing to give the Bank another chance.  <br><br>\n2) Branch to attempt fix the problem within 48 hours or 7 days on the outside for extreme cases and revert to the customer. This TAT for revert to be communicated to the customer upfront.  <br><br>\n3) Customers to be sent a personalised letter thanking them for their time and an acknowledgement, that we value their business and have remedied whatever caused them to want to leave in the first place. A list of all reasons for closure with the action taken, to be stated.   <br><br>\n4) Once the customer has been retained, the customer letter / form duly marked \u201cNOT FOR CLOSURE \u2013 RETAINED\u201d, along with a copy of the resolution letter to be sent to CPC for filing in the customer record.  <br><br>\n5) Siebel to be updated with the same comment and closed.  <br><br>\nIn case the BOM/SM/BM/ RBM / AM or the branch staff are able / Not able  to retain the customer, then protthe SR which has been created needs to be closed with the Closure Description in Siebel as, \u201cCustomer Retained\u201d. This needs to be done diligently and would be subject to audits.  <br><br>\nCustomer will pay the  necessary amount to regularize the account   <br><br>\nCustomer is unwilling to regularize the account after all attempts then branch user to follow the protocol as detailed in chapter \u201cAccount closure requests with debit balance/TBMS lien.\u201d  <br><br>\n1) Where the customer is not willing to continue, Branch to ensure that the complete details on Account closure form and all the checks to be made as detailed in the chapter  \u201cGeneral Guidelines to be followed for Account closure\u201d  <br><br>\n2) In case of any incomplete request, the customer needs to be apprised of the requirements and Siebel to be updated accordingly.  <br><br>\n3) If the a/c closure request is complete in all respects / once the complete request is received from the customer, the same needs to be sent to CPC, post updating the Siebel  <br><br>\n4) Branch to journal of the attempts made to retain the customer.  <br><br>\nIn case the BOM/SM/BM/ RBM / AM or the branch staff are able / Not able  to retain the customer, then protthe SR which has been created needs to be closed with the Closure Description in Siebel as, \u201cCustomer Retained\u201d. This needs to be done diligently and would be subject to audits.\n"]}};
            //     // var ele = new Array("Process");
            //     // ele2 = [  
            //     //             "Guidelines",
            //     //             "Shifting",
            //     //             "Accessibility",
            //     //             "Charges"
            //     //         ];
            //     // ele=ele.concat(ele2);
            //     // var ele_val = new Array(data.tiledlist[0]);
            //     // element_values = [  
            //     //             "<br>To define general guidelines to be followed by Branches while processing Account Closure. <br><br> Branch should attempt for retention of account before closing the account as opening a new account is expensive. <br><br> Channels through which Account Closure request is received: <br> 1. Customers In Person (CIP) who walk in to the Branch <br>\n2. Representatives/Bearer of customers who walk in to the Branch <br>\n3. Mail / Drop Box <br><br> Check Documentation and Signature Protocol <br><br> Check Mode of Payment for closure Proceeds <br><br> Check for Customer Handling on receipt of request <br><br> Check Process at Branch \u2013Checks during acceptance of closure form <br><br> Check Process at Branch- Post acceptance of Closure form <br><br> ",
            //     //             "<br>Customer is unwilling to give us another chance  <br>\n1) In case of Issues expressed by the customer where he / she is willing to give the Bank another chance. <br><br>\n2) Branch to attempt fix the problem within 48 hours or 7 days on the outside for extreme cases and revert to the customer. This TAT for revert to be communicated to the customer upfront. <br><br>\n3) Customers to be sent a personalised letter thanking them for their time and an acknowledgement, that we value their business and have remedied whatever caused them to want to leave in the first place. A list of all reasons for closure with the action taken, to be stated.  <br><br>\n4) Once the customer has been retained, the customer letter / form duly marked \u201cNOT FOR CLOSURE \u2013 RETAINED\u201d, along with a copy of the resolution letter to be sent to CPC for filing in the customer record.  <br><br>\n5) Siebel to be updated with the same comment and closed.  <br><br>In case the BOM/SM/BM/ RBM / AM or the branch staff are able / Not able  to retain the customer, then protthe SR which has been created needs to be closed with the Closure Description in Siebel as, \u201cCustomer Retained\u201d. This needs to be done diligently and would be subject to audits.\nCustomer will pay the  necessary amount to regularize the account <br>\nCustomer is unwilling to regularize the account after all attempts then branch user to follow the protocol as detailed in chapter \u201cAccount closure requests with debit balance/TBMS lien.\u201d <br><br>\n1) Where the customer is not willing to continue, Branch to ensure that the complete details on Account closure form and all the checks to be made as detailed in the chapter  \u201cGeneral Guidelines to be followed for Account closure\u201d <br><br>\n2) In case of any incomplete request, the customer needs to be apprised of the requirements and Siebel to be updated accordingly. <br><br>\n3) If the a/c closure request is complete in all respects / once the complete request is received from the customer, the same needs to be sent to CPC, post updating the Siebel <br><br>\n4) Branch to journal of the attempts made to retain the customer. <br><br>\nIn case the BOM/SM/BM/ RBM / AM or the branch staff are able / Not able  to retain the customer, then protthe SR which has been created needs to be closed with the Closure Description in Siebel as, \u201cCustomer Retained\u201d. This needs to be done diligently and would be subject to audits.",
            //     //             "<br>If customer is closing his/ her account due to inconvenient accessibility, solutions like Home Banking, Beat Pick up facility, etc. should be re-iterated. <br>\nIn case customer has an account which he/ she is not eligible for an accessibility offering he/ she is interested in, an upgraded account should be offered especially if account balances justify it (ensure that new AMB/AQBs and NMCs are communicated clearly).Customer is unwilling to give us another chance  <br><br>\n1) In case of Issues expressed by the customer where he / she is willing to give the Bank another chance.  <br><br>\n2) Branch to attempt fix the problem within 48 hours or 7 days on the outside for extreme cases and revert to the customer. This TAT for revert to be communicated to the customer upfront. <br><br>\n3) Customers to be sent a personalised letter thanking them for their time and an acknowledgement, that we value their business and have remedied whatever caused them to want to leave in the first place. A list of all reasons for closure with the action taken, to be stated.  <br><br>\n4) Once the customer has been retained, the customer letter / form duly marked \u201cNOT FOR CLOSURE \u2013 RETAINED\u201d, along with a copy of the resolution letter to be sent to CPC for filing in the customer record.  <br><br>\n5) Siebel to be updated with the same comment and closed.  <br><br>\nIn case the BOM/SM/BM/ RBM / AM or the branch staff are able / Not able  to retain the customer, then protthe SR which has been created needs to be closed with the Closure Description in Siebel as, \u201cCustomer Retained\u201d.  <br><br> This needs to be done diligently and would be subject to audits.  <br><br>\nCustomer is unwilling to give another chance: < <br><br>> Customer will pay the  necessary amount to regularize the account  <br><br>\nCustomer is unwilling to regularize the account after all attempts then branch user to follow the protocol as detailed in chapter \u201cAccount closure requests with debit balance/TBMS lien.\u201d  <br><br>\n1) Where the customer is not willing to continue, Branch to ensure that the complete details on Account closure form and all the checks to be made as detailed in the chapter  \u201cGeneral Guidelines to be followed for Account closure\u201d  <br><br>\n2) In case of any incomplete request, the customer needs to be apprised of the requirements and Siebel to be updated accordingly.  <br><br>\n3) If the a/c closure request is complete in all respects / once the complete request is received from the customer, the same needs to be sent to CPC, post updating the Siebel  <br><br> \n4) Branch to journal of the attempts made to retain the customer.  <br><br>\nIn case the BOM/SM/BM/ RBM / AM or the branch staff are able / Not able  to retain the customer, then protthe SR which has been created needs to be closed with the Closure Description in Siebel as, \u201cCustomer Retained\u201d. This needs to be done diligently and would be subject to audits.C2",
            //     //             "<br>1) Customer expresses concerns on high charges, ascertain the nature of charges levied and recommend an upgraded account where required (e.g. if customer finds DD charges high, up-sell to an account with a higher free DD limit or an account offering At Par cheque facility if usage is on our locations). Communicate the AMB/AQB and NMC to customer clearly. <br><br>\n2) The account can be upgraded/downgrade as per customer requirement by retaining the same account Number  <br><br>\n3) Branch can also explain the benefits of Basic/Small Account and offer conversion to the said  account as it will address their inability to maintain the account.  <br><br>\nCustomer is unwilling to give us another chance  <br><br>\n1) In case of Issues expressed by the customer where he / she is willing to give the Bank another chance.  <br><br>\n2) Branch to attempt fix the problem within 48 hours or 7 days on the outside for extreme cases and revert to the customer. This TAT for revert to be communicated to the customer upfront.  <br><br>\n3) Customers to be sent a personalised letter thanking them for their time and an acknowledgement, that we value their business and have remedied whatever caused them to want to leave in the first place. A list of all reasons for closure with the action taken, to be stated.   <br><br>\n4) Once the customer has been retained, the customer letter / form duly marked \u201cNOT FOR CLOSURE \u2013 RETAINED\u201d, along with a copy of the resolution letter to be sent to CPC for filing in the customer record.  <br><br>\n5) Siebel to be updated with the same comment and closed.  <br><br>\nIn case the BOM/SM/BM/ RBM / AM or the branch staff are able / Not able  to retain the customer, then protthe SR which has been created needs to be closed with the Closure Description in Siebel as, \u201cCustomer Retained\u201d. This needs to be done diligently and would be subject to audits.  <br><br>\nCustomer will pay the  necessary amount to regularize the account   <br><br>\nCustomer is unwilling to regularize the account after all attempts then branch user to follow the protocol as detailed in chapter \u201cAccount closure requests with debit balance/TBMS lien.\u201d  <br><br>\n1) Where the customer is not willing to continue, Branch to ensure that the complete details on Account closure form and all the checks to be made as detailed in the chapter  \u201cGeneral Guidelines to be followed for Account closure\u201d  <br><br>\n2) In case of any incomplete request, the customer needs to be apprised of the requirements and Siebel to be updated accordingly.  <br><br>\n3) If the a/c closure request is complete in all respects / once the complete request is received from the customer, the same needs to be sent to CPC, post updating the Siebel  <br><br>\n4) Branch to journal of the attempts made to retain the customer.  <br><br>\nIn case the BOM/SM/BM/ RBM / AM or the branch staff are able / Not able  to retain the customer, then protthe SR which has been created needs to be closed with the Closure Description in Siebel as, \u201cCustomer Retained\u201d. This needs to be done diligently and would be subject to audits.\n"
            //     //         ]
            //     // ele_val = ele_val.concat(element_values);
            //     //_.insert(ele, "Process", [0]);
            //     // $rootScope.tabvalue.elements = ele;
            //     // $rootScope.tabvalue.element_values=ele_val;
            //     $rootScope.tabvalue = data.data.node_data;
                
            //     //$rootScope.$emit("setTabData", $scope.node_data);
            // }
            
        };
        $rootScope.DthResponse2 = function(id,data,dlink) {
            var dtstage = data.tiledlist[0].Stage;
            var dtstage = dtstage.replace(".", "");
            if(data.tiledlist[0].DT.length > 0 || data.tiledlist[0].Text != "")
            {
				//if()
				// {
					
				// 	var images = Array();
				// 	var process = Array();
                //     process = data.tiledlist[0].Process;
                //     var dtstage = data.tiledlist[0].Stage;
                //     var dtstage = dtstage.replace(".", "");
                //     data.tiledlist[0].bgstage = dtstage;
				// 	/*_.each(data.tiledlist[0].Process,function(v,k){
				// 		if (v.indexOf(".png") >= 0) 
				// 	});*/
				// 	 images = _.remove(process, function(n) {
				// 	  return n.indexOf(".png") >= 0;
				// 	});
				// 	//console.log(images);
				// 	data.tiledlist[0].Process =process;
				// 	data.tiledlist[0].images =images;
					
                // }
                // if((data.tiledlist[0].Stage == '0') && data.tiledlist[0].DT.length > 0 || ( data.tiledlist[0].Text != "" && data.tiledlist[0].Text) || images.length > 0 )
                //     $rootScope.pushSystemMsg(id,data);
                // if(data.tiledlist[0].Stage != '0')
                // {
                //     if(!data.tiledlist[0].Script || data.tiledlist[0].Script.length== 0 )
                //         $rootScope.tabHeight = window.innerHeight-53;
                //     else
                //         $rootScope.tabHeight = 300;
                // }
                
            }
           
			$rootScope.element_values2 = new Array();
            $rootScope.showMsgLoader = false; 
            $rootScope.selectTabIndex = 0;
            $rootScope.tabHeight = window.innerHeight-120-53;
            if(data.tiledlist[0].Quik_Tip)
            {
                if($rootScope.tabvalue.elements[1] !== 'Exception Scenarios')
                {
                    $rootScope.tabvalue.elements.push("Exception Scenarios");
                    $rootScope.tabvalue.element_values.push(data.tiledlist[0]);
                }
                else {
                    $rootScope.tabvalue.element_values[1]=data.tiledlist[0];
                    
                }
                $rootScope.tabHeight = window.innerHeight-120-53;
                // if(!data.tiledlist[0].Script || data.tiledlist[0].Script.length== 0)
                //     $rootScope.tabHeight = window.innerHeight-53;
                // else
                //     $rootScope.tabHeight = 300;
                //if(data.tiledlist[0].Quik_Tip.length == 0)
                {
                    
                    $rootScope.getnotedata(data.tiledlist[0].Quik_Tip[0],data.tiledlist[0].Table);
                }
            }
            else
            {
                var a = $rootScope.tabvalue.elements.indexOf("Exception Scenarios");
                // _.remove(array, function(n) {

                // });
                $rootScope.tabvalue.element_values.splice(a,a);
                $rootScope.tabvalue.elements.splice(a,a);
            }
            $rootScope.element_values2 = data.tiledlist[0].Process;
            $rootScope.element_values2.dtstage = dtstage;
            // else
            // {
            //     var ele = new Array("Process");
            //     var ele_val = new Array(data.tiledlist[0],data.tiledlist[0]);
            // }
            // $rootScope.tabvalue.elements.push(ele);
            // $rootScope.tabvalue.element_values.push(ele_val);
            
            
        };
        $rootScope.InstructionResponse = function(id,data) {
            $rootScope.pushSystemMsg(id,data);
			console.log(data);
            $('#myCarousel').carousel({
                interval: false,
                wrap: false
            });
            $('#myCarousel').find('.item').first().addClass('active');
            $rootScope.showMsgLoader = false; 
        };
        $rootScope.openMenu = function(submenu) {
            var prev = "";
            $("#topiclist li").hide();
            $(".list-group .nav .nav-list li").each(function(){
                //console.log("inside");
                $(this).find(".section_last").removeClass("active");
            });
            _.each(submenu, function(value, key) {
                //console.log(value);
                //console.log(_.size(submenu));
                
                if( value != "")
                {   
                    if(submenu[0] == "Locker")
                    {
                        //value=value.replace(" ","_");
                        if(key==0)
                            prev +=value;
                        else
                            prev +=" "+value; 
                    }
                    else
                        prev +=value+" "; 
                    //console.log(value);
                    $(".list-group a[id='"+prev+"']").parent().show();
                    $(".list-group a[id='"+prev+"']").parent().children(".tree").find("li").show();
                    
                    if(submenu.length != (key+1))
                    {
                        //console.log(prev);
                        if($(".list-group a[id='"+prev+"']").parent().children('ul.tree').is(':visible')) {}
                        else
                        {
                            $(".list-group a[id='"+prev+"']").parent().children('ul.tree').toggle(300);
                        }
                        $(".list-group a[id='"+prev+"']").parent().find('.triangle').toggleClass('glyphicon-triangle-bottom').toggleClass('glyphicon-triangle-right');
                    }
                    if($( ".list-group a[id='"+prev+"']" ).hasClass( "section_last" ))
                    {   
                        //console.log("hasclass");
                        $(".list-group a[id='"+prev+"']").addClass("active");
                    }
                    if(submenu.length == (key+1))
                    {
                        //console.log("last");
                        $(".list-group a[id='"+prev+"']").parent().children('ul.tree').toggle(300);
                    }
                }
                
            });
            
        };
        $rootScope.htmlToPlaintext=function(text) {
            return text ? String(text).replace(/<[^>]+>/gm, '') : '';
        };
        $rootScope.getSystemMsg = function(id,value){
            //console.log("id",id);
            //CsrfTokenService.getCookie("csrftoken").then(function(token) {
                //$rootScope.formData = {user_id:1164,user_input:value,auto_id:parseInt(id),auto_value:value,'csrfmiddlewaretoken':token};
            //var mysessiondata = $.jStorage.get("sessiondata");
            var mysessiondata = {};
                //mysessiondata = mysessiondata.toObject();
                //mysessiondata.data = {id:parseInt(id),Text:value};
                //mysessiondata.data = {id:id,Text:value};
                sess2 = {id:id,Text:value};
                $rootScope.tabvalue.elements = [];
                $rootScope.tabvalue.element_values=[];
                //console.log(mysessiondata);
                //$rootScope.formData = mysessiondata;
                //console.log($cookies.get("session_id"));
                formData1 = {csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),user_id:$cookies.get("session_id"),user_input:value,auto_id:id,auto_value:$rootScope.autolistvalue};
                var new_object = $.extend({}, mysessiondata, formData1);
                //$.extend(formData1, mysessiondata);
                $rootScope.formData = new_object;
                $timeout(function(){
                    $(".chatinput").val("");
                });
                
                
                // io.socket.on('user', function gotHelloMessage (data) {
                // console.log('User alert!', data);
                // });
                //io.socket.get('/Livechat/addconv');
                
                apiService.getSysMsg($rootScope.formData).then(function (data){
                        //console.log(data);
                    
                        if(data.data.tiledlist[0].topic)
                             $("#topic").text(data.data.tiledlist[0].topic);
                    angular.forEach(data.data.tiledlist, function(value, key) {
                        //console.log(value);
                        if(value.type=="text")
                        {
							//console.log(data.data.tiledlist[0].text);
                        	$rootScope.pushSystemMsg(0,data.data);
                            $rootScope.showMsgLoader = false;
                            $timeout(function(){
                                var textspeech = data.data.tiledlist[0].Text;
                                
                                
                                $.jStorage.set("texttospeak",textspeech);

                                $('#mybtn_trigger').trigger('click');
                                
                            },200);
                            
                            return false;
                        }
                        if(value.type=="rate card")
                        {
                            $rootScope.pushSystemMsg(0,data.data);
                            $rootScope.showMsgLoader = false;
                            
                            // $(".r_c_col").val($(".r_c_col option:first").val());
                            // $(".r_c_row").val($(".r_c_row option:first").val());

                            // var firstOption = $('.r_c_col option:first');
                            // firstOption.attr('selected', true);
                            // $('.r_c_col').attr('selectedIndex', 0);
                            $timeout(function(){
                                $('select.r_c_col:last option:nth-child(2)').attr("selected", "selected");
                                $('select.r_c_row:last option:nth-child(2)').attr("selected", "selected");
                                $("select.r_c_col:last").trigger('change');
                                $("select.r_c_row:last").trigger('change');
                            },1000);
                            
                            return false;
                        }
                        else if(value.type=="DTHyperlink")
                        {
                           $rootScope.DthResponse(0,data.data);  
                           $timeout(function(){
                                var textspeech = data.data.tiledlist[0].Text;
                                _.each(data.data.tiledlist[0].DTHyperlink,function(v,k){
                                    textspeech += v;
                                });
                                $.jStorage.set("texttospeak",textspeech);

                                $('#mybtn_trigger').trigger('click');
                                
                            },200);
                        }
                        else if(value.type=="Instruction")
                        {
							
                           $rootScope.InstructionResponse(0,data.data);  
                           
                        }
                        
                    });
                    



                    // apiService.getttsSpeech({text:data.data.data.tiledlist[0].Script[0]}).then(function (data){

                    // });
                    // $('#mybtn_trigger').bind('click', function(event, textspeech) {
                       

                    // }); 
                    // var msg = new SpeechSynthesisUtterance(data.data.data.tiledlist[0].Script[0]);
                    // window.speechSynthesis.speak(msg);
                    // var speech = new SpeechSynthesisUtterance();
                    // speech.text = data.data.data.tiledlist[0].Script[0];
                    // speech.volume = 1; // 0 to 1
                    // speech.rate = 1; // 0.1 to 9
                    // speech.pitch = 1; // 0 to 2, 1=normal
                    // speech.lang = "en-US";
                    // speechSynthesis.speak(speech);
                    // tts.speech({
                    //     src: data.data.data.tiledlist[0].Script[0],
                    //     hl: 'en-us',
                    //     r: 0, 
                    //     c: 'mp3',
                    //     f: '44khz_16bit_stereo',
                    //     ssml: false,
                       
                    // });
                    // $http({
                    //     url: "http://api.voicerss.org/?key=5a1cc1a178c24b89ba23fd6e3b1bb6c5&hl=en-us&src="+data.data.data.tiledlist[0].topic,
                    //     method: 'POST',
                    //     //data:(formData),
                    //     withCredentials: false,
                    //     //headers: {'Content-Type': 'application/json','X-CSRFToken': "Vfpx6pWJYBx7dbX35vwXm7P9xj3xNPyUJbSx9IlwgcRHReN974ZC5rEbvgpRQdY2"},
                    // }).then(function (data){
                    //    console.log(data); 
                    //     // var audioElement = document.getElementById('ttsaudio');
                    //     // audioElement.setAttribute('src', src);
                    //     // // Load src of the audio file
                    //     // audioElement.load();
                    //     // audioElement.play();
                    //     // output =  '<audio id="ttsaudio1">';
                    //     // // you can add more source tag
                    //     // output +=  '<source src='+data.data+'" type="audio/mp3" />';
                    //     // output +=  '</audio>';
                    //     //  //var newAudio = $(createAudio(src));
                    //     // $("#ttsaudio").replaceWith(output);
                    //     // $("#ttsaudio1").load();
                    //     // $("#ttsaudio1").play();
                    // });
                        
                    if(data.data.tiledlist[0].sub_topic_list || data.data.tiledlist[0].sub_topic_list != null)
                    {
                        $rootScope.openMenu(data.data.tiledlist[0].sub_topic_list);
                    }
                    if(data.data.tiledlist[0].Script || data.data.tiledlist[0].Script != null)
                    {
                        if(data.data.tiledlist[0].Script.length== 0)
                            $rootScope.tabHeight = window.innerHeight-53;
                        else
                            $rootScope.tabHeight = window.innerHeight-53;;
                        
                    }
                    if(data.data.session_obj_data || data.data.session_obj_data != null)
                        $.jStorage.set("sessiondata",data.data.session_obj_data);
                }).catch(function (reason) {
                    console.log(reason);
                    var msg = {Text:"Sorry I could not understand",type:"SYS_EMPTY_RES"};
                    $rootScope.pushSystemMsg(0,msg); 
                    $rootScope.showMsgLoader=false;
                    $rootScope.agentconnected = true;
                    if($rootScope.agentconnected)
                    {
                        $rootScope.sendMsgtoagent(sess2.Text);
                    }
                    
                });
            //});
            $rootScope.autocompletelist = [];
        };
        $rootScope.sendMsgtoagent = function(msg) {

            io.sails.url = 'http://localhost:1337';
            
            //io.sails.connect([io.sails.url]);
            //sess2.Text
            // var sockets = io.sails.sockets.clients();
            // console.log(sockets);
            
            // io.socket.get('/chat/addconv',{}, function (resData, jwres){
            // // ...
            // });
            //createPrivateConversationRoom({name:"User #10", id:10});
            //$rootScope.lastagent
            io.socket.get('/user', function (users){
                console.log(users,"users");
                users.forEach(function(user) {
                    //console.log(user);
                    //if (user.id == me.id) {return;}
                    //addUser(user);
                });
            });
            addMessageToConversation(window.me.id, "5a0a81e8179172360420c966", msg);

            // Send the message
            io.socket.post('/chat/private', {to: "5a0a81e8179172360420c966", msg: msg});
        };
        $rootScope.Speaktext = function() {
            //console.log(text);
            var _iOS9voices = [
                { "data-name": "Maged", voiceURI: "com.apple.ttsbundle.Maged-compact", "data-lang": "ar-SA", localService: true, "default": true },
                { "data-name": "Zuzana", voiceURI: "com.apple.ttsbundle.Zuzana-compact", "data-lang": "cs-CZ", localService: true, "default": true },
                { "data-name": "Sara", voiceURI: "com.apple.ttsbundle.Sara-compact", "data-lang": "da-DK", localService: true, "default": true },
                { "data-name": "Anna", voiceURI: "com.apple.ttsbundle.Anna-compact", "data-lang": "de-DE", localService: true, "default": true },
                { "data-name": "Melina", voiceURI: "com.apple.ttsbundle.Melina-compact", "data-lang": "el-GR", localService: true, "default": true },
                { "data-name": "Karen", voiceURI: "com.apple.ttsbundle.Karen-compact", "data-lang": "en-AU", localService: true, "default": true },
                { "data-name": "Daniel", voiceURI: "com.apple.ttsbundle.Daniel-compact", "data-lang": "en-GB", localService: true, "default": true },
                { "data-name": "Moira", voiceURI: "com.apple.ttsbundle.Moira-compact", "data-lang": "en-IE", localService: true, "default": true },
                { "data-name": "Samantha (Enhanced)", voiceURI: "com.apple.ttsbundle.Samantha-premium", "data-lang": "en-US", localService: true, "default": true },
                { "data-name": "Samantha", voiceURI: "com.apple.ttsbundle.Samantha-compact", "data-lang": "en-US", localService: true, "default": true },
                { "data-name": "Tessa", voiceURI: "com.apple.ttsbundle.Tessa-compact", "data-lang": "en-ZA", localService: true, "default": true },
                { "data-name": "Monica", voiceURI: "com.apple.ttsbundle.Monica-compact", "data-lang": "es-ES", localService: true, "default": true },
                { "data-name": "Paulina", voiceURI: "com.apple.ttsbundle.Paulina-compact", "data-lang": "es-MX", localService: true, "default": true },
                { "data-name": "Satu", voiceURI: "com.apple.ttsbundle.Satu-compact", "data-lang": "fi-FI", localService: true, "default": true },
                { "data-name": "Amelie", voiceURI: "com.apple.ttsbundle.Amelie-compact", "data-lang": "fr-CA", localService: true, "default": true },
                { "data-name": "Thomas", voiceURI: "com.apple.ttsbundle.Thomas-compact", "data-lang": "fr-FR", localService: true, "default": true },
                { "data-name": "Carmit", voiceURI: "com.apple.ttsbundle.Carmit-compact", "data-lang": "he-IL", localService: true, "default": true },
                { "data-name": "Lekha", voiceURI: "com.apple.ttsbundle.Lekha-compact", "data-lang": "hi-IN", localService: true, "default": true },
                { "data-name": "Mariska", voiceURI: "com.apple.ttsbundle.Mariska-compact", "data-lang": "hu-HU", localService: true, "default": true },
                { "data-name": "Damayanti", voiceURI: "com.apple.ttsbundle.Damayanti-compact", "data-lang": "id-ID", localService: true, "default": true },
                { "data-name": "Alice", voiceURI: "com.apple.ttsbundle.Alice-compact", "data-lang": "it-IT", localService: true, "default": true },
                { "data-name": "Kyoko", voiceURI: "com.apple.ttsbundle.Kyoko-compact", "data-lang": "ja-JP", localService: true, "default": true },
                { "data-name": "Yuna", voiceURI: "com.apple.ttsbundle.Yuna-compact", "data-lang": "ko-KR", localService: true, "default": true },
                { "data-name": "Ellen", voiceURI: "com.apple.ttsbundle.Ellen-compact", "data-lang": "nl-BE", localService: true, "default": true },
                { "data-name": "Xander", voiceURI: "com.apple.ttsbundle.Xander-compact", "data-lang": "nl-NL", localService: true, "default": true },
                { "data-name": "Nora", voiceURI: "com.apple.ttsbundle.Nora-compact", "data-lang": "no-NO", localService: true, "default": true },
                { "data-name": "Zosia", voiceURI: "com.apple.ttsbundle.Zosia-compact", "data-lang": "pl-PL", localService: true, "default": true },
                { "data-name": "Luciana", voiceURI: "com.apple.ttsbundle.Luciana-compact", "data-lang": "pt-BR", localService: true, "default": true },
                { "data-name": "Joana", voiceURI: "com.apple.ttsbundle.Joana-compact", "data-lang": "pt-PT", localService: true, "default": true },
                { "data-name": "Ioana", voiceURI: "com.apple.ttsbundle.Ioana-compact", "data-lang": "ro-RO", localService: true, "default": true },
                { "data-name": "Milena", voiceURI: "com.apple.ttsbundle.Milena-compact", "data-lang": "ru-RU", localService: true, "default": true },
                { "data-name": "Laura", voiceURI: "com.apple.ttsbundle.Laura-compact", "data-lang": "sk-SK", localService: true, "default": true },
                { "data-name": "Alva", voiceURI: "com.apple.ttsbundle.Alva-compact", "data-lang": "sv-SE", localService: true, "default": true },
                { "data-name": "Kanya", voiceURI: "com.apple.ttsbundle.Kanya-compact", "data-lang": "th-TH", localService: true, "default": true },
                { "data-name": "Yelda", voiceURI: "com.apple.ttsbundle.Yelda-compact", "data-lang": "tr-TR", localService: true, "default": true },
                { "data-name": "Ting-Ting", voiceURI: "com.apple.ttsbundle.Ting-Ting-compact", "data-lang": "zh-CN", localService: true, "default": true },
                { "data-name": "Sin-Ji", voiceURI: "com.apple.ttsbundle.Sin-Ji-compact", "data-lang": "zh-HK", localService: true, "default": true },
                { "data-name": "Mei-Jia", voiceURI: "com.apple.ttsbundle.Mei-Jia-compact", "data-lang": "zh-TW", localService: true, "default": true }
                ];
            var voices = window.speechSynthesis.getVoices();
            //console.log(voices);
            var textspeech = $rootScope.htmlToPlaintext($.jStorage.get("texttospeak"));
            //console.log(textspeech);
            var speech = new SpeechSynthesisUtterance(textspeech);
            //speech.text = $.jStorage.get("texttospeak");
            //speech.text = "Hello";
            speech.volume = 1; // 0 to 1
            speech.rate = 1; // 0.1 to 9
            speech.pitch = 1; // 0 to 2, 1=normal
            speech.lang = "en-US";
            //speech.lang = {lang: 'en-US', desc: 'English (United States)'};
            //speech.voice = voices[8]; 
            speech.voiceURI = 'native';
            //speechSynthesis.speak(speech);
            //speech.text = textspeech;
            //console.log(speech);
            //window.speechSynthesis.speak(speech);
            $.jStorage.set("texttospeak","");

            // tts.speech({
            //     src: textspeech,
            //     hl: 'en-us',
            //     r: 0, 
            //     c: 'mp3',
            //     f: '44khz_16bit_stereo',
            //     ssml: false,
                
            // });
        };
        

        $rootScope.tappedKeys = '';

        $rootScope.onKeyUp = function(e){
            
            //if(e.key == "ArrowDown" || e.key == "ArrowUp")
            if(e.which == 40 )
            {
                if($("ul#ui-id-1 li.active").length > 0) {
                    var storeTarget	= $('ul#ui-id-1').find("li.active").next();
                    $("ul#ui-id-1 li.active").removeClass("active");
                    storeTarget.focus().addClass("active");
                    $(".chatinput").val(storeTarget.text());
                    $rootScope.autolistid = $(storeTarget).attr("data-id");
                    $rootScope.autolistvalue = $(storeTarget).attr("data-value");
                    $rootScope.answers = $(storeTarget).attr("data-answers");
                    $timeout(function(){
                        // var o_ele = "#suggestionList .ui-widget.ui-widget-content";
                        // console.log(o_ele.scrollHeight > o_ele.clientHeight);
                        // if(o_ele.scrollHeight > o_ele.clientHeight)
                        // {
                        //     var ulHeight = $("#suggestionList .ui-widget.ui-widget-content").height();
                        //     $('#suggestionList .ui-widget.ui-widget-content').animate({scrollTop: ulHeight});
                        // }
                        
                    });
                }
                else
                {
                    $('ul#ui-id-1').find("li:first").focus().addClass("active");
                    var storeTarget	= $('ul#ui-id-1').find("li.active");
                    $(".chatinput").val($('ul#ui-id-1').find("li:first").text());
                    $rootScope.autolistid = $('ul#ui-id-1').find("li:first").attr("data-id");
                    $rootScope.autolistvalue = $('ul#ui-id-1').find("li:first").attr("data-value");
                    $rootScope.answers = $(storeTarget).attr("data-answers");
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
                    $rootScope.answers = $(storeTarget).attr("data-answers");
                }
                else
                {
                    $('ul#ui-id-1').find("li:last").focus().addClass("active");
                    var storeTarget	= $('ul#ui-id-1').find("li.active");
                    $(".chatinput").val($('ul#ui-id-1').find("li:last").text());
                    $rootScope.autolistid = $('ul#ui-id-1').find("li:last").attr("data-id");
                    $rootScope.autolistvalue = $('ul#ui-id-1').find("li:last").attr("data-value");
                    $rootScope.answers = $(storeTarget).attr("data-answers");
		    	}
                
                return;
            }
            if(e.which == 13)
            {
                if( $rootScope.answers )
                {
                    $rootScope.pushAutoMsg($rootScope.autolistid,$(".chatinput").val(),$rootScope.answers);
                    $rootScope.autocompletelist = [];
                }
                else if(($rootScope.autolistid=="" || $rootScope.autolistid == null || $rootScope.autolistid == 0) )
                {
                    
                     
                     $rootScope.pushMsg("",$(".chatinput").val(),"");
                     $(".chatinput").val("");
                }
                else {
                    
                    $rootScope.pushMsg($rootScope.autolistid,$(".chatinput").val(),"");
                }
                $rootScope.autocompletelist = [];
            }
            if(e.which == 8)
            {
                
                if($(".chatinput").val()=="")
                {
                    $rootScope.autocompletelist = [];
                    $rootScope.chatText = "";
                }
                
            }
        };
        $rootScope.result_sr = function(output) {
            $timeout(function () {
                $('#sr_details').html(output.Output.Result);
            },200);
        };
        $rootScope.result_crn = function(output) {
            $timeout(function () {
                $('#crn_details').html(output.Output.Result);
            },200);
        };
        $rootScope.crnSubmit = function(crnno) {
            $scope.userid=$.jStorage.get("id");
            var datatype = 'CRN';
            $scope.formData = {user_input:crnno, number_type:datatype,csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),user_id:$cookies.get("session_id")};
            apiService.crnsubmit($scope.formData).then(function (callback){
                $rootScope.result_crn(callback.data);
            });
        };
        
        $rootScope.srnSubmit = function(srno,crnno) { 
            //console.log(crnno+"crnno,sr"+srno);
            $rootScope.userid=$.jStorage.get("id");
            var datatype = 'SR';
            $scope.formData = {user_input:srno, number_type:datatype,csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),user_id:$cookies.get("session_id")};
            //console.log($scope.formData);
            apiService.crnsubmit($scope.formData).then(function (callback){
                console.log(callback,"crn");
                $rootScope.result_sr(callback.data);
            });
        };
        $rootScope.likeChatClick = function(){
            $timeout(function(){
                $('span.thumbsup').css("color", "#008000");
                $('.thumbsdown').css("color", "#444");
            },200);
        };
        $rootScope.selectedFeedback = "";
        $rootScope.feedbacklist = [];
        $rootScope.feedbacklist =  [
            {id:"",name:"Choose a Feedback"},
            {id:"0",name:"Incorrect Process"},
            {id:"1",name:"Incomplete Process"},
            {id:"2",name:"Unable to comprehend answer"},
            {id:"3",name:"Free text"},
            {id:"4",name:"Received no reply"},
        ];
        $rootScope.selectedFeedback = $rootScope.feedbacklist[0];
        $rootScope.selectedFeedbackval = $rootScope.selectedFeedback.id;
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
            $('span.thumbsdown').css("color", "#444");
        };
        $rootScope.dislikesuggestionsubmit = function(suggestion){
            console.log("suggestion",suggestion);
            $rootScope.dislikesuggestionSuccess = 1;
            $timeout(function(){
                $rootScope.dislikesuggestionSuccess = 0;
                $rootScope.dislikeCancel();
            },500);
            $('span.thumbsdown').css("color", "#444");
        };
        
       $timeout(function(){
            //$('#chatTabs a:last').tab('show');
       },200);
    })
    .controller('ViewCtrl', function ($scope,$rootScope, $uibModalInstance, items) {
        $scope.items = items;
        _.each(items.contentobj,function(v,k){
            if(v.type == items.viewdata)
            {
                console.log("Exist");
                $scope.displaydata = v.data;
                $scope.displaydata.type = v.type;
            }
        });
        // console.log(items);
        // console.log($scope.displaydata);
        if($rootScope.viewdata == 'Address_Change')
        {
            $scope.modaltitle = "Address Change";
        }
        if($rootScope.viewdata == 'Dormant_Activation')
        {
            $scope.modaltitle = "Dormant Activation";
        }
        if($rootScope.viewdata == 'verify_seeding_info')
        {
            $scope.modaltitle = "Verify seeding info";
        }
        if($rootScope.viewdata == 'name_mismatch_table')
        {
            $scope.modaltitle = "Name Mismatch Table";
        }
        
    })
    // Example API Controller
    .controller('DemoAPICtrl', function ($scope, TemplateService, apiService, NavigationService, $timeout) {
        apiService.getDemo($scope.formData, function (data) {
            console.log(data);
        });
    });

    