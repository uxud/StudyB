var studyB = angular.module('studyB', ["ui.router","firebase"]);


studyB.run(function ($state,Auth,$rootScope) {

  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    console.log(error.code);
    console.log(error);
    if (error && !error.authenticated) {
        $state.transitionTo("firstpage");
        event.preventDefault(); 
      }
  });

});

studyB.factory('Auth', function($q){

  var bruker;

  var deafaultAuth= firebase.auth();

  var db = firebase.database();

 deafaultAuth.onAuthStateChanged(function(user) {
            if (user) {
              console.log(user);
              bruker=user;
              console.log('auth callback positive')

              
            } else {
              console.log('auth callback negative ');
              bruker=null;  
            }
        });





  return {


    IsExistingUser: function(uid){
      
      var deferred=$q.defer();
      db.ref('/users/'+uid).once('value').then(function(snapshot){
      
        var oldUser=snapshot.val!=null;
        console.log(snapshot.val);
        deferred.resolve(oldUser);
        
      });
      console.log("promise");
      return deferred.promise;
    },

    getAuth: function(){
      return deafaultAuth;
    },
    setUser: function(user){
      bruker=user;
    },
    getUser: function() { return bruker; 
    },
    isAuthenticated: function() {

      if(bruker!=null){return true;}
      else{console.log('false');return false;} 
    }
  };
});



studyB.service('popup', function(url) {

  var newwindow= window.open(url,'name','height=200,width=150');
    if(window.focus) {newwindow.focus();}
    return false;
    });


studyB.controller('homeCtrl',function($state,$window,$scope,userAuthenticated){
  //$window.open($state.href('popup', {}, {absolute: true}), 'register',"height=200,width=200");

  var data = '{"messageId":[{"name":"pablo","body":"Hei"},{"name":"me","body":"hallo"}]}'

  var result = JSON.parse(data);

  console.log(result.messageId.length);



  $scope.messages=result.messageId;
  console.log(userAuthenticated);

  $scope.name=userAuthenticated.displayName;






});




studyB.controller('indexCtrl',function(Auth,$scope,userAuthenticated){

  $scope.loggedin=userAuthenticated;


  
               




 
});

studyB.controller('firstpageCtrl',function($scope,$state,userAuthenticated,Auth){
    $scope.loggedin=userAuthenticated;
    console.log(userAuthenticated)








                  Auth.IsExistingUser(12345).then(function(IsExistingUser){
                    console.log(IsExistingUser);
                    //if(IsExistingUser){$state.go('register');}
                  });





  

          $scope.facelogin= function(){

                  var provider = new firebase.auth.FacebookAuthProvider();
                  Auth.getAuth().signInWithPopup(provider).then(function(result) {
                  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                  var token = result.credential.accessToken;
                  // The signed-in user info.
                  var user = result.user;
                  var displayName=user.displayName;
                  $state.go('home');




                  




                                  
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
            controller: 'firstpageCtrl',
            resolve: {
                userAuthenticated: ["$http", "$q", function($http, $q) {
                    var deferred = $q.defer();
                    var unsubscribe=firebase.auth().onAuthStateChanged(function(user) {
                      if (user) {
                      // User is signed in.
                      deferred.resolve (user);
                      unsubscribe();
                      } else {
                      // No user is signed in.
                      deferred.resolve (null);
                      unsubscribe();
                      //user();
                      }
                    });

                    return deferred.promise;
                }]
            }

        })

      
      
        .state('home', {
            url: "/home",
            templateUrl: "templates/home.html",
            controller: 'homeCtrl',
            resolve: {
                userAuthenticated: ["$http", "$q", '$rootScope', function($http, $q, $rootScope) {
                    var deferred = $q.defer();

                    var unsubscribe=firebase.auth().onAuthStateChanged(function(user) {
                      if (user) {
                      // User is signed in.
                      deferred.resolve (user);
                      
                      unsubscribe();

                      } else {
                      // No user is signed in.
                      deferred.reject({authenticated: false});
                      unsubscribe();
                      }
                    });
                    
                    /*if(firebase.auth().currentUser) {
                        deferred.resolve();

                    } else {
                        console.log('wtf ble rejecta');
                        deferred.reject({ authenticated: false });

                    }*/
                    return deferred.promise;
                }]
            }
            
        })

        .state('popup', {
            url: "/popup",
            templateUrl: "templates/popup.html"
            
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



