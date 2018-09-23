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