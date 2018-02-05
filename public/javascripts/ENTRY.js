var app = angular.module('dataEntry',[]);
//=====Controller for addTeams.ejs page to add projects into team=====[ {======//

//=====Controller for addPerson.ejs page to add teams into person===========//
app.controller('perInfo',['$scope','$http', function($scope, $http) {


  if($scope.fullname!=null){
  let fullname =$scope.fullname.split(' ');
  $scope.firstname= fullname[0],
  $scope.lastname =fullname[1];
}
  var Counter = 0;

  var addLine=function(){ $scope.perTm.push(
    {"firstname":null,"lastname":null,"phone":null,"email":null,"address":null,"city":null,"province":null, "country":null});
  };
   $scope.init = function()
   {
     console.log("init()");
       $scope.perTm = [];
       addLine();
       console.log(JSON.stringify($scope.perTm));
   };
    $scope.saveModal= function()
    {
      if($scope.firstname!=''&&
         $scope.lastname!=''&&
         $scope.phone!=''&&
         $scope.email!='')
         {
          $scope.perTm[Counter].firstname  = $scope.firstname;
          $scope.perTm[Counter].lastname = $scope.lastname;
          $scope.perTm[Counter].phone   = $scope.phone;
          $scope.perTm[Counter].email   = $scope.email;
          $scope.perTm[Counter].address = $scope.address;
          $scope.perTm[Counter].city = $scope.city;
          $scope.perTm[Counter].province = $scope.province;
          $scope.perTm[Counter].country = $scope.country;
          $scope.perTm[Counter].username = $scope.firstname;
          Counter++;
          console.log(JSON.stringify($scope.perTm));
          $scope.close();
        }
    };
    $scope.close = function()
    {
        $scope.firstname=null;
        $scope.lastname =null;
        $scope.phone =null;
        $scope.email =null;
        $scope.address=null;
        $scope.city =null;
        $scope.province=null;
        $scope.country=null;
        $('#addbtn').click();
    };
    $scope.post = function() {
      let data = $scope.perTm;
      $http.post('/admin/addPeople',data ,[]).then(successCallback, errorCallback);
    }
}]);//personInfo controller ends
