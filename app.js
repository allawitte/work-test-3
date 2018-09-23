var app = angular.module("chatApp", ['ui.router']);
app.controller("mainController", mainController);
function mainController() {
    var vm = this;
};
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
                if(res.data !== 'auth error'){
                    $state.go('/chat', {'login': res.data});
                }
            });
    }

}
app.controller('ChatController', ChatController);
var monthList = ['янв', 'феб', 'мар', 'апр', 'май', 'июнь', 'июль', 'авг', 'сент', 'окт', 'ноя', 'дек'];
function ChatController($http, $state, $timeout) {
    var vm = this;
    var author = $state.getCurrentPath()[1].paramValues.login;
    vm.sendRequestStatus = 0;

    function getUpdates(){
        if(!vm.sendRequestStatus){
            getChat();
        }
        $timeout(getUpdates, 3000);
    }
    getUpdates();
    vm.send = function(){
        var data = {
            author: author,
            message: vm.newMsg,
            time: new Date().getTime()
        };
        $http.post('chat.php', data)
            .then(function(res){
                console.log(res);
                vm.newMsg = '';
            });
        console.log('chat controller', vm);
    };
    vm.parseTime = function(utc){
        var date = new Date(utc-0);

        var month = monthList[date.getMonth()];
        var day = date.getDate() > 9 ? date.getDate() : '0'+date.getDate();
        var hour = date.getHours() > 9 ? date.getHours() : '0'+date.getHours();
        var minutes = date.getMinutes() > 9 ? date.getMinutes() : '0'+ date.getMinutes();
        if(isToday(utc-0)){
            return 'Сегодня  ' + hour + ':' + minutes;
        }
        return day + ' ' + month + ', ' + hour + ':' +minutes;
    }

    function isToday(utc){
        var current = new Date();
        var date = new Date(utc);
        if(current.getYear() == date.getYear() && current.getMonth() == date.getMonth() && current.getDate() == date.getDate()){
            return true;
        }
        return false;
    }

    function getChat(){
        vm.sendRequestStatus = 1;
        $http.get('chat_get.php')
            .then(function(res){
                if(res.status == 200){
                    vm.records = res.data;
                    vm.sendRequestStatus = 0;
                }
            });
    }

}
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
})

app.config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider) {

    var base = './';

    $urlRouterProvider.otherwise('');

    $stateProvider
        .state('/auth', {
            url: '',
            controller: 'AuthController',
            templateUrl: base + 'pages/auth.view.html',
            controllerAs: 'vm'
        })

        .state('/chat', {
            url: '/chat/:login',
            templateUrl: base + 'pages/chat.view.html',
            controller: 'ChatController',
            controllerAs: 'vm',
            params: {
                obj: null
            }
        });



}