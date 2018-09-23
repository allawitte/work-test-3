app.controller('ChatController', ChatController);
function ChatController($http, $state) {
    var vm = this;
    console.log('$state', $state.getCurrentPath()[1].paramValues.login);
    vm.send = function(){
        console.log('chat controller', vm);
    }

}