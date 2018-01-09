  var auth = firebase.auth();
  var allEventDiv = document.getElementById('allEvent')
  var database = firebase.database().ref();
  var myUser = localStorage.getItem('myyUser')
  var myUser = JSON.parse(myUser)
  var myEvent = JSON.parse(localStorage.getItem('myEvent'))
  console.log(myEvent)
  console.log(myUser);
    database.child('All Events').on("child_added", function(snapshot){
      var obj = snapshot.val();
      obj.id = snapshot.key;
      render(obj);
  })

  function render(event){

  localStorage.setItem('newEvent',JSON.stringify(event))

  var renderEvent = '<div class="card form-group-col-3" id= \''+ event.id +'\' style="width: 25rem; margin : 0 auto;">' + 
    '<img class="card-img-top" height = 300px; src=\''+ event.myimage +'\' alt="Card image cap">' +
      ' <div class="card-body">' +
      '<h5 class="card-title card-header">' +  event.myevent +  '</h5>' +
      '<p>' +'<b>'+ 'Planned by: ' +'</b>' +  '<b class="card-subtitle mb-2 text-muted">' + event.myname + '</b>' + '</p>' +
      '<p class="card-text">'+'<b>'+ 'About Event: ' +'</b>' +   event.mydesc + '</p>' +
    '<p>' +  '<img src="13.png" width="24px" height="25px" alt="">' +  event.mytime + '</p>'+

      '<p>' + '<img src="12.png" alt="location" width="26px" height="25px">' + event.mylocation + '<p>' +
      '<p>' +   '<p>' + '<button class="btn btn-light" id="goingBtn" onclick="going(\''+ event.id +'\')">'
     + 'Going' + 
    '</button>'  +'</p>' + 
  '</div>'+
  '</div>'
  allEventDiv.insertAdjacentHTML('beforeend', renderEvent);}
  
  function going(key){
   var newEventObj = JSON.parse( localStorage.getItem('newEvent'))
   console.log( newEventObj)
   var goingText = 'I am going';
     
    var myNewEvent = {  
                mylocation : event.mylocation,
                myevent : event.myevent,
                mydate : event.mydate,
                mytime : event.mytime,
                mydesc : event.mydesc,
                myEmail : event.myEmail,
                myname : event.myname,
                myimage: event.myimage,
                goingId:goingText
            }   
              console.log(myNewEvent)
database.child('All Events').child(key) .update(myNewEvent)
database.child('Going Events').push( myNewEvent)
}

  
  




  function logout(){
    firebase.auth().signOut().then(function() {
      location = 'index.html'
  // Sign-out successful.
}, function(error) {
  // An error happened.
});
  }