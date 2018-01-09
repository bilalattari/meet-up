    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    var nameInput = document.getElementById("name");
    var emailInputLog = document.getElementById("emaillog");
    var passwordInputLog = document.getElementById("passwordlog");
    var database = firebase.database();
    var auth = firebase.auth();
    
    var database = firebase.database().ref();
    var userId;


    function signup() {
        var email = emailInput.value;
        var password = passwordInput.value;
        var name = nameInput.value;
    auth.createUserWithEmailAndPassword(email, password)
            .then(function (user) {
                var currentUser = {
                    name: name,
                    email: email,
                    UID : user.uid
                }
                localStorage.setItem('myyUser' ,JSON.stringify(currentUser))
                location = 'index.html'
               
            })
            .catch(function (error) {
                console.log(error.code)
                 alert(error.message);
            })


    }

    function login() {
        var logEmail = emailInputLog.value;
        var logPassword = passwordInputLog.value;

        auth.signInWithEmailAndPassword(logEmail, logPassword)
            .then(function(user){
                location = 'home.html';
                localStorage.setItem('uid' , JSON.stringify(user.uid))
            })
            .catch(function(error){
                alert(error.message);
            })
    }
  var myUser = localStorage.getItem('myyUser')
  var myUser = JSON.parse(myUser)
  console.log(myUser);

    


var provider = new firebase.auth.FacebookAuthProvider();
var provider2 = new firebase.auth.GoogleAuthProvider();


function  GoogleSignin(){
    firebase.auth().signInWithPopup(provider2).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        console.log(user.displayName);
        console.log(user.email);
        console.log(user.photoURL);
        var obj={
            name:user.displayName,
            email:user.email,
            userpic:user.photoURL
        }
        localStorage.setItem("myyUser",JSON.stringify(obj));
        console.log(user);
        location="home.html";
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
}
function facebookSignin() {
    firebase.auth().signInWithPopup(provider)
    
    .then(function(result) {
       var token = result.credential.accessToken;
       var user = result.user;
         
       console.log(token)
       console.log(user.name);
       console.log(user.email);
       console.log(user.photoURL);
       var obj={
           name:user.name,
           email:user.email,
           userpic:user.photoURL
       }
       localStorage.setItem("myyUser",JSON.stringify(obj));
       console.log(user);
       location="home.html";
    }).catch(function(error) {
       console.log(error.code);
       console.log(error.message);
    });
 }
 
 function facebookSignout() {
    firebase.auth().signOut()
    
    .then(function() {
       console.log('Signout successful!')
    }, function(error) {
       console.log('Signout failed')
    });
 }