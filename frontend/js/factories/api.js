myApp.factory('apiService', function ($http, $q, $timeout,CsrfTokenService) {
    //var adminurl = "http://localhost/chatbotapi/api.php/";
    //var adminurl = "//35.161.160.7:3306/";
    adminurl = "http://wohlig.co.in/chatbotapi/index.php/json/";
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
                url: adminurl + 'getautocomplete',
                headers: {'X-CSRFToken': CsrfTokenService.getCookie("csrftoken")},
                method: 'POST',
                data: formData
            })
        },
        login:function(formData, callback) {
            
            // $http.post(adminurl + "api.php?func=getautocomplete&string=" + request).then(function (response) {
            //     console.log("Hello",response);
            //     return response;
            // });
            return $http({
                url: adminurl + 'login',
                headers: {'X-CSRFToken': CsrfTokenService.getCookie("csrftoken")},
                method: 'POST',
                data: formData
            });
        },
        changepassword:function(formData, callback) {
            
            return $http({
                url: adminurl + 'changepassword',
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
    };
    //return responsedata;
});