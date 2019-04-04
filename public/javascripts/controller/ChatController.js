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

    /**
     * Socket.io event handling.
     */
    const socket = io.connect("http://localhost:3000");
    socket.on('onlineList', users => {
        $scope.onlineList = users;
        $scope.$apply();
    });

}]);