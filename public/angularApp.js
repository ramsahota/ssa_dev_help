//angular stuffs


var app = angular.module("ssadevhelp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/Friends", {
        templateUrl: "static/Templates/friends.html"
    }).when("/InsertQuestion", {
        templateUrl: "static/Templates/insertQuestion.html"
    }).when("/view-question/:questionId", {
        templateUrl: "static/Templates/view-question.html"
    }).when("/user/:userName", {
        templateUrl: "static/Templates/feed.html"
    }).when("/", {
        templateUrl: "static/Templates/feed.html"
    }).otherwise({
        templateUrl: 'static/Templates/feed.html'
    });
});

app.controller('SSADevHelpCtrl', function ($scope, $http) {
    $scope.getPictures = function () {
        var userObj = {
            "userName": $scope.userName,
            "password": $scope.password
        };
        $http.post("/login/", userObj, { cache: false }).then(function (response) {
            location = location.origin + "/";
        });
    };

    $scope.registerUser = function () {
        var userObj = {
            userName: $scope.userName,
            password: $scope.password,
            profileName: $scope.profileName
        };
        $http.post("/insertUser/", userObj).then(function (response) {
            window.location = "/#/";
        }, function (error) {
            console.log(error);
            alert(error.data.errmsg);
        });
    }
});

app.controller('NavController', function ($scope, $location, $http) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
    $scope.logout = function (){
        $http.post("/logout/").then(function (response){
            window.location = "/";
        }, function (error){
            console.log(error);
        });
    }
});

app.controller('getQuestionsController', function ($scope, $http, $routeParams) 
{
    var userName = $routeParams.userName;
    var url = "/getQuestions/";
    if (userName) {
        url += userName;
    }
    $http.get(url, { cache: false }).then(function (response) {
        // location = location.origin + "/";
        //console.log($scope.userName);
        $scope.questions = response.data;
        console.log(response.data);
    });     
});

app.controller('insertQuestionController', function ($scope, $http) 
{ 
    $scope.required = true;
    $scope.insertQuestion = function () {
        var question = {
            title: $scope.title,
            content: $scope.content
        };
        $http.post("/insertQuestion/", question).then(function (response) {
            window.location = "/#/";
        }, function (error) {
            console.log(error);
            alert(error.data.errmsg);
        });
    }      
});