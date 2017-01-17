/*var studyB = angular.module('studyB', ["ui.router","firebase"]);


studyB.run(function ($rootScope, $state,Page) {
  var noe=firebase.auth().currentUser;

  Page.setUser(noe);




        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              Page.setUser(user);
              $rootScope.title=user.displayName;
            } else {
              console.log('sorry ass');
              Page.setUser(null);
              $rootScope.title=null;

  
            }
        });


  console.log(Page.isAuthenticated());


  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.authenticate && !Page.isAuthenticated()){
      // User isn’t authenticated
      //$rootScope.user=getUser();
      //$scope.$apply();
      $state.transitionTo("firstpage");
      event.preventDefault(); 
    }
  });
});

studyB.factory('Page', function($rootScope){
  var title;
  return {
    setUser: function(user){
      title=user;
      if(title!=null){$rootScope.title=user.displayName}



    },
    getUser: function() { return title; },
    isAuthenticated: function() { if(title!=null){return true;}
     else{return false;} }
  };
});


/*
studyB.service('hexafy', function() {
  var person = firebase.auth().currentUser;
    this.isAuthenticated = function () {

        if(person!=null){return true;}
        else{return false;}

    }
    this.getUser = function () {
      return person;

    }


});
*/



/*
studyB.controller('indexCtrl',function($rootScope,$scope){



 
});

studyB.controller('firstpageCtrl',function($scope,$state,Page){

  

          $scope.facelogin= function(){

                  var provider = new firebase.auth.FacebookAuthProvider();
                  firebase.auth().signInWithPopup(provider).then(function(result) {
                  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                  var token = result.credential.accessToken;
                  // The signed-in user info.
                  var user = result.user;
                  var displayName=user.displayName;


                  //console.log('lol',Page.isAuthenticated());
                  //console.log('lol2',Page.getUser());

                  
                  $scope.$apply();
                  console.log('nå bør det skje noe')
                  console.log(Page.isAuthenticated());
                  //var noe= Page.getUser();
                  //console.log(noe.displayName);
                  


                  //console.log('Logged in as ',user);
                  // Redirect to registery/
                  $state.go('register');                  
                  // ...
                  }).catch(function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // The email of the user's account used.
                  var email = error.email;
                  // The firebase.auth.AuthCredential type that was used.
                  var credential = error.credential;
                  // ...
                  });

  };
  


});


    studyB.config(function($stateProvider, $urlRouterProvider){
      
      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise("firstpage")
      
      $stateProvider

        .state('firstpage', {
            url: "/firstpage",
            templateUrl: "templates/firstpage.html",
            controller: 'firstpageCtrl'

        })

      
      
        .state('register', {
            url: "/register",
            templateUrl: "templates/register.html",
            authenticate: true
            
        })

    })












/*

studyB.controller('indexCtrl',[function($scope,AuthService){

  //sett scope lik user for å rendre index.html riktig 
  $scope.user=person.getUser();
  $scope.apply();


  //login
      $scope.facelogin= function(){

                  var provider = new firebase.auth.FacebookAuthProvider();
                  firebase.auth().signInWithPopup(provider).then(function(result) {
                  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                  var token = result.credential.accessToken;
                  // The signed-in user info.
                  var user = result.user;
                  console.log('Logged in as ',user);
                  // Redirect to registery/
                  $state.go('register');                  
                  // ...
                  }).catch(function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // The email of the user's account used.
                  var email = error.email;
                  // The firebase.auth.AuthCredential type that was used.
                  var credential = error.credential;
                  // ...
                  });

  };

$scope.googlelogin= function(){
                  var provider = new firebase.auth.GoogleAuthProvider();
                  firebase.auth().signInWithPopup(provider).then(function(result) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    $scope.Auth=token;
                    // The signed-in user info.
                    var user = result.user;
                    $state.go('register');
                    console.log("Logged in as:", user);
                    // ...
                  }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    console.log(errorCode);
                    var errorMessage = error.message;
                    console.log(errorMessage);
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                  });
                };
    





}])*/



