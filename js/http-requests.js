app.factory('RequestService', RequestService);
function RequestService($http) {
    var service = {};
    service.getChat = getChat;
    service.setChat = setChat;
    service.auth = auth;
    return service;
    function getChat() {
        return $http.get('chat_get.php')
            .then(function (res) {
                if (res.status == 200) {
                    return res.data;
                }
            });
    }

    function setChat(data) {
        return $http.post('chat.php', data)
            .then(function (res) {
                return res;
            });
    }

    function auth(data) {
        return $http.post('ajaxauth.php', data)
            .then(function(res){
                if(res.data !== 'auth error'){
                    return res.data;
                }
            });
    }
}