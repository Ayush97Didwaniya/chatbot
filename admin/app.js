angular.module("Adminp",["ngRoute","firebase"])
.config(function($routeProvider){

$routeProvider
    .when("/login", {
        templateUrl : "views/login.html"
    })
     .when("/admin", {
        templateUrl : "views/admin.html"
    })
    .otherwise({
        redirectTo: "/login"
    })
})

.controller("LoginCtrl", LoginCtrl)
.controller("AdminCtrl", AdminCtrl)
.factory("data",data)
function data(){
    return {
    }
}

function LoginCtrl($location)
{       
    console.log("a");
    var login = this;
    login.name="ayush";
    login.pass="12345";
    login.Login1=function(a,b){
         console.log("as");
        if(login.name==a && login.pass==b)
        {  
             $location.path("/admin");
        }
        else{

        }
    
    }
}
function AdminCtrl(data,$firebaseObject,$firebaseArray)
{     
   var admin = this;
   var Ref = firebase.database().ref();
    admin.tasks =  $firebaseArray(Ref.child('users'));
    console.log(admin.tasks); //data.shopping = []
   admin.completed = 0;
   admin.editMode =0;
   var savedIndex = 0;

   admin.add = function(t){
       console.log(t);
       admin.tasks.$add({"name":t,"status":0,"created_at":new Date()});
       admin.task="";
       console.log(admin.tasks);
   }

   admin.delete = function(index){
       admin.tasks.$remove(admin.tasks[index]);
       console.log(admin.tasks);
   }

   admin.changeStatus = function(index){
       admin.tasks[index].status = admin.tasks[index].status? 0:1 ;
       admin.tasks[index].status? admin.completed++:admin.completed-- ;

       console.log(admin.tasks);
   }

   admin.edit = function(index){
      console.log(index);
      admin.task = admin.tasks[index].name;
      savedIndex = index;
      admin.editMode =1;
   }


   admin.update = function(task){
       admin.tasks[savedIndex].name = task;
       admin.task = "";
       admin.editMode =0;
    console.log(task);
   }
}
