app.controller('AuthController', AuthController);
function AuthController($http, $state, RequestService) {
    var vm = this;
    vm.submit = function(){
        console.log('submit');
        if(!vm.login || !vm.password) return;
        var data = {
            'login': vm.login,
            'password': vm.password
        };
        RequestService.auth(data)
            .then(function(res){
                $state.go('/chat', {'login': res});
            });

    }

}