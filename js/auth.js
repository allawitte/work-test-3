app.controller('AuthController', AuthController);
function AuthController($http, $state) {
    var vm = this;
    vm.submit = function(){
        console.log('submit');
        if(!vm.login || !vm.password) return;
        var data = {
            'login': vm.login,
            'password': vm.password
        };
        $http.post('ajaxauth.php', data)
            .then(function(res){
                if(res.data == 'ok'){
                    $state.go('/chat');
                }
            });
    }

}