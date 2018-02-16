myApp.factory('apiService', function ($http, $q, $timeout,CsrfTokenService,$httpParamSerializer) {
    //adminurl = "http://wohlig.co.in/chatbotapi/index.php/json/";
    adminurl = "http://exponentiadata.co.in:8097/";
    var adminUrl2 = "http://wohlig.io/api/";
    var adminUrl3 = "http://exponentiadata.co.in:8001/api/"
    //var adminUrl3 = "http://localhost/api/";
    //return
    return {

        // This is a demo Service for POST Method.
        getDemo: function (formData, callback) {
            $http({
                url: adminurl + 'demo/demoService',
                method: 'POST',
                data: formData
            }).success(callback);
        },
        // This is a demo Service for POST Method.
        getautocomplete: function(formData, callback) {
            
            // $http.post(adminurl + "api.php?func=getautocomplete&string=" + request).then(function (response) {
            //     console.log("Hello",response);
            //     return response;
            // });
            return $http({
                url:adminUrl3+ "Chatbotautocomplete/getautocomplete",
                //url: "http://wohlig.co.in/chatbotapi/index.php/json/" + 'getautocomplete',
                //headers: {'X-CSRFToken': "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"},
                method: 'POST',
                data: formData
            })
        },
        saveagentchat:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Agentchat/savechat",
                method: 'POST',
                data: formData,
            });
           
        },
        setdisconnectsocket:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Agentchat/setdisconnectsocket",
                method: 'POST',
                data: formData,
            });
           
        },
		getguidelinedata:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Guidelines/getdetail",
                method: 'POST',
                data: formData,
            });
           
        },
        disconnectuser:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Agentchat/disconnectuser",
                method: 'POST',
                data: formData,
            });
           
        },
        login:function(formData, callback) {
            
            // $http.post(adminurl + "api.php?func=getautocomplete&string=" + request).then(function (response) {
            //     console.log("Hello",response);
            //     return response;
            // });
            
            return $http({
                url:adminUrl3+ "Chatbotuser/loginuser",
                //headers: {'X-CSRFToken': "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"},
                method: 'POST',
                data: formData,
            });
           
        },
        logout:function(formData, callback) {
            
           
            return $http({
                //url: "http://wohlig.co.in/chatbotapi/index.php/json/" + 'login/',
                url:adminUrl3+ "Chatbotuserlogs/logoutuser",
                //headers: {'X-CSRFToken': "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"},
                method: 'POST',
                data: formData,
                //withCredentials: false,
                //dataType:"json",
            });
            
        },
        changepassword:function(formData, callback) {
            
            return $http({
                url: adminUrl3 + 'Chatbotuser/changepassword',
                method: 'POST',
                data: formData
            });
            // $.ajax({
            //     url : adminurl+"changepassword",
            //     data: formData,
            //     headers: {'X-CSRFToken': CsrfTokenService.getCookie("csrftoken")},
            //     type: "POST",
            //     dataType: "json",
                
            // });
        },
        crnsubmit:function(formData,callback){
            return    $http({
                url:adminurl+'srandcrn/',
                method: 'POST',
                data:$.param(formData),
                withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','X-CSRFToken':formData.csrfmiddlewaretoken },
            });
        },
        gettabdata:function(formData,callback){
            
            return    $http({
                url:adminurl+'get_tab_data/',
                method: 'POST',
                data:$.param(formData),
                dataType:"json",
                //xsrfHeaderName :"X-CSRFToken",
                //xsrfCookieName :"csrftoken",
                //withCredentials: false,
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','X-CSRFToken': formData.csrfmiddlewaretoken},
            });
            /*
            var data = $.param(formData);
        
            var config = {
                dataType:"json",
                'Content-Type': 'application/json',
                headers : { 'X-CSRFToken': formData.csrfmiddlewaretoken}
            }
            return $http.post(adminurl+'get_tab_data/', data,config).success(function(data,status,headers,config){
                
            });*/

        },
        getSysMsg:function(formData,callback){
            //console.log(formData);
            return    $http({
                url:adminurl+'out/'+formData.user_id+"/",
                //url: adminUrl3 + 'Chatbotautolist/getSysMsg',
                method: 'POST',
                data:$.param(formData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','X-CSRFToken':formData.csrfmiddlewaretoken },
                //withCredentials: false,
                //headers: {'Content-Type': 'application/json','X-CSRFToken': "Vfpx6pWJYBx7dbX35vwXm7P9xj3xNPyUJbSx9IlwgcRHReN974ZC5rEbvgpRQdY2"},
            });
            
            
        },
        ratecardsubmit : function(formData,callback){
            console.log(formData);
            return    $http({
                url:adminurl+'outratecard/'+formData.user_id+"/",
                //url: adminUrl3 + 'Chatbotautolist/getSysMsg',
                method: 'POST',
                data:$.param(formData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','X-CSRFToken':formData.csrfmiddlewaretoken },
                //withCredentials: false,
                //headers: {'Content-Type': 'application/json','X-CSRFToken': "Vfpx6pWJYBx7dbX35vwXm7P9xj3xNPyUJbSx9IlwgcRHReN974ZC5rEbvgpRQdY2"},
            });
            
            
        },
        get_session: function (formData, callback) {
            return $http({
                url: adminurl + 'get_session/',
                //headers: {'X-CSRFToken':formData.csrfmiddlewaretoken },
                method: 'POST',
                data: $.param(formData),
                dataType:"json"
            });
        },
        getDthlinkRes:function(formData,callback){
            //console.log(formData);
            
            return    $http({
                url:adminurl+'outDTL/'+formData.user_id+"/",
                //url: adminUrl3 + 'Chatbotautolist/getDthlink',
                method: 'POST',
                data:$httpParamSerializer(formData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','X-CSRFToken':formData.csrfmiddlewaretoken },
            });
            
            
        },
        outprocess:function(formData,callback){
            //console.log(formData);
            
            return    $http({
                url:adminurl+'outprocess/'+formData.user_id+"/",
                //url: adminUrl3 + 'Chatbotautolist/getDthlink',
                method: 'POST',
                data:$httpParamSerializer(formData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','X-CSRFToken':formData.csrfmiddlewaretoken },
            });
            
            
        },
        forgotpassword:function(formData, callback) {
            
            return $http({
                url: adminUrl3 + 'Chatbotuser/forgotpassword',
                method: 'POST',
                data: formData
            });
        },
        isvalidpasswordresetreq:function(formData, callback) {
            
            return $http({
                url: adminUrl3 + 'Chatbotuser/isvalidpasswordresetreq',
                method: 'POST',
                data: formData
            });
        },
        changepassword2:function(formData, callback) {
            
            return $http({
                url: adminUrl3 + 'Chatbotuser/resetpassword',
                method: 'POST',
                data: formData
            });
        },
        getttsSpeech:function(formData,callback){
            //console.log(formData);
            return    $http({
                //url:adminurl+'out/'+formData.user_id+"/",
                url: adminUrl3 + 'Chatbotautolist/getttsSpeech',
                method: 'POST',
                data:(formData),
                //withCredentials: false
            });
            
            
        },
        startRecording:function(formData,callback){
            //console.log(formData);
            return    $http({
                //url:adminurl+'out/'+formData.user_id+"/",
                url: adminUrl3 + 'Chatbotvoice/startRecording',
                method: 'POST',
                data:(formData),
               
            });
            
            
        },
        stopRecording:function(formData,callback){
            //console.log(formData);
            return    $http({
                //url:adminurl+'out/'+formData.user_id+"/",
                url: adminUrl3 + 'Chatbotvoice/stopRecording',
                method: 'POST',
                data:(formData),
                
            });
            
            
        },
        tts:function(formData,callback){
            //console.log(formData);
            return    $http({
                //url:adminurl+'out/'+formData.user_id+"/",
                url: adminUrl3 + 'Chatbotvoice/startRecoding1',
                method: 'POST',
                data:(formData),
            });
            
            
        },
        getnoteval:function(formData,callback){
            //console.log(formData);
            return    $http({
                //url:adminurl+'out/'+formData.user_id+"/",
                url: adminUrl3 + 'Chatbotnotes/getnotedata',
                method: 'POST',
                data:(formData),
            });
            
            
        },
        sendchat:function(formData,callback){
            //console.log(formData);
            return    $http({
                //url:adminurl+'out/'+formData.user_id+"/",
                url: adminUrl3 + 'Livechat/addConv',
                method: 'POST',
                data:(formData),
            });
            
            
        },
        Feed:function(formData,callback){
            //console.log(formData);
            return    $http({
                //url:adminurl+'out/'+formData.user_id+"/",
                url: adminUrl3 + 'Feed',
                method: 'POST',
                data:(formData),
            });
            
            
        },
        getdiagram:function(formData, callback) {
            
            return $http({
                url: adminUrl3 + 'Diagram/getdiagram',
                method: 'POST',
                data: formData
            });
        },
    };
    //return responsedata;
});