app.controller('ChatController', ['$scope', 'userFactory', ($scope, userFactory) =>{

    /**
     * initialization
     */

    function init(){
        userFactory.getUser().then(user => {
            $scope.user = user;
        })
    }

    init();

    /**
     * Angular variables
     */
    $scope.chatClicked = false;
    $scope.onlineList = [];
    $scope.user = {};
    $scope.chatName = "";

    $scope.userId ="";
    $scope.aliciId ="";
    $scope.message ="";
    $scope.messages = [];

    /**
     * Socket.io event handling.
     */

    const socket = io.connect("http://localhost:3000");
    socket.on('onlineList', user => {

        $scope.onlineList = user;
        $scope.$apply();
    });

    $scope.switchUser = user =>{
        $scope.chatName = user.meta.name;
        $scope.aliciId =  user.meta._id;
        $scope.chatClicked = true;
        console.log(user);
    };

    $scope.newMessage = () =>{
        if($scope.message.trim() !== '') {

            socket.emit('newMessage', {
                aliciId: $scope.aliciId,
                userId: $scope.user._id,
                message: $scope.message,

            });


            $scope.message ="";
        }
    }

}]);