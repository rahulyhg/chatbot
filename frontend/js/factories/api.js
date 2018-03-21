myApp.factory('apiService', function ($http, $q, $timeout,CsrfTokenService,$httpParamSerializer) {
    //adminurl = "http://wohlig.co.in/chatbotapi/index.php/json/";
    adminurl = "http://exponentiadata.co.in:8097/";
    var adminUrl2 = "http://wohlig.io/api/";
    var adminUrl3 = "http://exponentiadata.co.in:8001/api/"
    var adminUrl3 = "http://localhost/api/";
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
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
        getticker:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Ticker/getticker",
                method: 'POST',
                data: formData,
            });
           
        },
        getnotification:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Notifications/getnotification",
                method: 'POST',
                data: formData,
            });
           
        },
        getpostit:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Postit/getpostit",
                method: 'POST',
                data: formData,
            });
           
        },
        getimages:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Imagemulti/getimages",
                method: 'POST',
                data: formData,
            });
           
        },
        getdashboarddata:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Chathistory/getdashboarddata",
                method: 'POST',
                data: formData,
            });
           
        },
        savehistory:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Chathistory/savehistory",
                method: 'POST',
                data: formData,
            });
           
        },
        dislike:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Chathistory/dislike",
                method: 'POST',
                data: formData,
            });
           
        },
        like:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Chathistory/like",
                method: 'POST',
                data: formData,
            });
           
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
        searchapi:function(formData, callback) {
            
            return $http({
                url: adminUrl3 + 'Chatbotuser/searchapi',
                method: 'POST',
                data: formData
            });
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
            // var fd = $.param(formData);
            // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(fd), 'k_123');
            
            
            
            
            
            // var fd = JSON.stringify((formData));
            // //var encodedString = Base64.encode(fd);
            // //console.log(fd);
            // var ciphertext = CryptoJS.AES.encrypt((fd),'k_123').toString();
            // var a = ciphertext.toString().replace(" ", "+");
            // var b=a.replace(" ", "+");
            // var bytes = CryptoJS.AES.decrypt((b),'k_123');
            // // console.log(ciphertext);
            // // console.log(bytes);
            // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            // //console.log(decryptedData);
            // var data = {data:ciphertext};
            // //console.log(data);
            // // var data = {data:encodedString};
            // // console.log(data);
            // // var decodedString = Base64.decode(encodedString);
            // // console.log(JSON.parse(decodedString));
            // return    $http({
            //     url: adminUrl3 + 'Api/out',
            //     method: 'POST',
            //     data: data
            //     //withCredentials: false,
            //     //headers: {'Content-Type': 'application/json','X-CSRFToken': "Vfpx6pWJYBx7dbX35vwXm7P9xj3xNPyUJbSx9IlwgcRHReN974ZC5rEbvgpRQdY2"},
            // });
            
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
    };
    //return responsedata;
});