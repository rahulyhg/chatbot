myApp.factory('apiService', function ($http, $q, $timeout,CsrfTokenService,$httpParamSerializer) {
    //var adminurl = "http://localhost/chatbotapi/api.php/";
    //var adminurl = "//35.161.160.7:3306/";
    //adminurl = "http://wohlig.co.in/chatbotapi/index.php/json/";
    adminurl = "http://35.161.160.7:8091/";
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
                url: "http://wohlig.co.in/chatbotapi/index.php/json/" + 'getautocomplete',
                //headers: {'X-CSRFToken': "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"},
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
                url: adminurl + 'login/',
                //headers: {'X-CSRFToken': "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"},
                method: 'POST',
                data: formData,
                //dataType:"json",
            });
            
            //console.log("hi");
            //return
            /*
            $timeout(function(){
             $.ajax({
                url: adminurl + 'authenticate/',						
                // url: "/authenticate/",						
                data: {username : "pratik", password : "asdf",'csrfmiddlewaretoken': "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"},
                //headers: {'X-CSRFToken': "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"},
                type: "POST",
                dataType: "json",
                cookie:"csrftoken=6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
                "X-CSRFToken":"6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"
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
            });*/
            /*
            return    $http({
                url:adminurl+'authenticate/',
                method: 'POST',
                data:{username : "pratik", password : "asdf",'csrfmiddlewaretoken': "Vfpx6pWJYBx7dbX35vwXm7P9xj3xNPyUJbSx9IlwgcRHReN974ZC5rEbvgpRQdY2"},
                //xsrfHeaderName :"X-CSRFToken",
                //xsrfCookieName :"csrftoken",
                withCredentials: true,
                headers: {'Content-Type': 'application/json; charset=utf-8','X-CSRFToken': "Vfpx6pWJYBx7dbX35vwXm7P9xj3xNPyUJbSx9IlwgcRHReN974ZC5rEbvgpRQdY2"},
            });
             */
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
        crnsubmit:function(formData,callback){
            return    $http({
                url:adminurl+'srandcrn/',
                method: 'POST',
                data:{user_input : 2, user_id : 1,number_type:'CRN','csrfmiddlewaretoken': "Vfpx6pWJYBx7dbX35vwXm7P9xj3xNPyUJbSx9IlwgcRHReN974ZC5rEbvgpRQdY2"},
                //xsrfHeaderName :"X-CSRFToken",
                //xsrfCookieName :"csrftoken",
                withCredentials: true,
                headers: {'Content-Type': 'application/json; charset=utf-8','X-CSRFToken': "Vfpx6pWJYBx7dbX35vwXm7P9xj3xNPyUJbSx9IlwgcRHReN974ZC5rEbvgpRQdY2"},
            });
        },
        gettabdata:function(formData,callback){
            return    $http({
                url:adminurl+'get_tab_data/',
                method: 'POST',
                data:$httpParamSerializer(formData),
                //xsrfHeaderName :"X-CSRFToken",
                //xsrfCookieName :"csrftoken",
                withCredentials: true,
                headers: {'X-CSRFToken': "Vfpx6pWJYBx7dbX35vwXm7P9xj3xNPyUJbSx9IlwgcRHReN974ZC5rEbvgpRQdY2"},
            });
        },
        getSysMsg:function(formData,callback){
            //console.log(formData);
            return    $http({
                url:adminurl+'out/'+formData.user_id+"/",
                method: 'POST',
                //type:"POST",
                data:JSON.stringify(formData),
                //data:{user_id:1137,user_input:"Revised SweepIn Limit Trader Pro rent Account",auto_id:1,auto_value:"Revised SweepIn Limit Trader Pro rent Account",'csrfmiddlewaretoken':token,csrf_token:formData.token},
                //xsrfHeaderName :"X-CSRFToken",
                //xsrfCookieName :"csrftoken",
                withCredentials: true,
                headers: {'Content-Type': 'application/json','X-CSRFToken': "Vfpx6pWJYBx7dbX35vwXm7P9xj3xNPyUJbSx9IlwgcRHReN974ZC5rEbvgpRQdY2"},
            });
            
            /*
            $.ajax({
                url:adminurl+'out/'+formData.user_id+"/",
                method: 'POST',
                //type:"POST",
                data:formData,
                dataType: "json",
                //xsrfHeaderName :"X-CSRFToken",
                //xsrfCookieName :"csrftoken",
                withCredentials: true,
                headers: {'X-CSRFToken': formData.csrfmiddlewaretoken},
            });*/
        },
    };
    //return responsedata;
});