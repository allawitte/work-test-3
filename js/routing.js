
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