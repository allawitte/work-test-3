app.controller('ChatController', ChatController);
function ChatController($http, $state) {
    var vm = this;
    var author = $state.getCurrentPath()[1].paramValues.login;
    vm.send = function(){
        var data = {
            author: author,
            message: vm.newMsg,
            time: new Date().getTime()
        };
        $http.post('chat.php', data)
            .then(function(res){
                console.log(res);
            });
        console.log('chat controller', vm);
    }

}