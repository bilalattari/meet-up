
var createReq = document.getElementById('createReq')
var myUser = localStorage.getItem('myyUser')
var myUid = localStorage.getItem('uid')
var myUid = JSON.parse(myUid)
console.log(myUid)
var myUser = JSON.parse(myUser)
console.log(myUser);
var database = firebase.database().ref();
var auth = firebase.auth()
var eventDiv = document.getElementById('myEvent')
function add(){
    var location = document.getElementById("location");
    var event = document.getElementById("eventname");
    var date = document.getElementById("date");
    var time = document.getElementById("time");
    var desc = document.getElementById("Description");
    var file = document.getElementById('file')

    var myEvent = {
            mylocation : location.value,
            myevent : event.value,
            mydate : date.value,
            mytime : time.value,
            mydesc : desc.value,
            myEmail : myUser.email,
            myname : myUser.name,
            myimage: downloadURL,
            goingId:'none'
        }   
        if(myEvent.mylocation ==='' & myEvent.myevent ==='' & myEvent.mydate ==='' & myEvent.mytime ==='' & myEvent.mydesc ===''){
            alert('Please fill out all the fields')
        }else{
              console.log(myEvent)
        database.child('All Events').push(myEvent);
        localStorage.setItem('myEvent',JSON.stringify(myEvent))

        location.value = '';
        event.value = '';
        date.value = '';
        time.value = '';
        desc.value = '';
        file.value = '';

        }
      
    } 

function upload(){


// Create a root reference
        var selectedfile=document.getElementById("file").files[0];
        var filename=selectedfile.name;
        var storageRef = firebase.storage().ref("/imgs/"+filename);
        var uploadTask=storageRef.put(selectedfile);
            
        
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        }, function(error) {
            // Handle unsuccessful uploads
        }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
             downloadURL = uploadTask.snapshot.downloadURL;
            //console.log(downloadURL)           
             add()
        });
}




   database.child('All Events').on("child_added", function(snapshot){
    var obj = snapshot.val();
    obj.id = snapshot.key;
    render(obj);
    console.log(obj)

})

function render(event){
    
      if (event.myEmail ===  myUser.email){
 
 var renderEvent = '<div class="card form-group-col-3" id= \''+ event.id +'\' style="width: 25rem; margin : 0 auto;">' + 
  '<img class="card-img-top" height=300px; src=\''+ event.myimage +'\' alt="Card image cap">' +
     ' <div class="card-body">' +
    '<h5 class="card-title  card-header">' +  event.myevent +  '</h5>' +
    '<p>' +  'Hosted by ' +  '<b class="card-subtitle mb-2 text-muted">' + event.myname + '</b>' + '</p>' +
    '<p class="card-text">' + '<b>'+ 'About Event: ' +'</b>' +  event.mydesc + '</p>' +
   '<p>' +  '<img src="13.png" width="25px" height="25px" alt="">' +  event.mytime + '</p>'+

    '<p>' + '<img src="12.png" alt="location" width="26px" height="25px">' + event.mylocation + '<p>' +
    '<p>' + 
'    <button type="button" class="btn btn-danger btn-sm" id ="remove" onclick= remove(\''+ event.id +'\')>Remove</button>' + '</p>' + 
'</div>'+
'</div>'
 
eventDiv.insertAdjacentHTML('beforeend', renderEvent);}

// else {
//    var createEvent =   '<div class="col-md-4 text-center">' +'<button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#exampleModal">' + 'Create Event' +
// '</button>'+  '</div>'
// eventDiv.insertAdjacentHTML('beforeend', createEvent);
// }


}







function remove(key){
database.child("All Events/" + key).remove();
}
database.child("All Events").on("child_removed", function(data){
    var deletedDiv = document.getElementById(data.key);
    deletedDiv.remove();
})


function logout(){
    firebase.auth().signOut().then(function() {
      location = 'index.html'
  // Sign-out successful.
}, function(error) {
  // An error happened.
});
  }