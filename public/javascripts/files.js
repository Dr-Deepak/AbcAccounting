'use strict';
angular.module('FileModule', ['angularFileUpload'])
.controller('FileController',['$scope','$http','FileUploader', function ($scope,$http,FileUploader) {
$scope.add=function()
      var uploader = $scope.uploader = new FileUploader({ });
        var desc =$scope.Description;

    $scope.uploadFile = function(){
                          var uploadUrl = "/file";
                          var fd = new FormData();
                          for (var i=0;i<uploader.queue.length;i++){
                            fd.append('file', file);
                          }
                          $http.post(uploadUrl,fd, {
                              transformRequest: angular.identity,
                              headers: {'Content-Type': undefined}
                          }).success(function(){
                            console.log("success!!");
                          }).error(function(){
                            console.log("error!!");
                          });
                          uploader.clearQueue();
                        };

  $scope.deleteFile =function(){
    if(confirm('Are you sure want to delete this file ?')){
      $scope.Files.splice(this.$index, 1);
    }
  };
}]);
		//add a new task

/*
var myApp = angular.module('FileModule', []);

    myApp.controller('FileController', function ($scope) {

        // GET THE FILE INFORMATION.
        $scope.getFileDetails = function (e)
        {
            $scope.files = [];
            $scope.$apply(function () {

                // STORE THE FILE OBJECT IN AN ARRAY.
                for (var i = 0; i < e.files.length; i++) {
                    $scope.files.push(e.files[i])
                }
            });
        };
*
        // NOW UPLOAD THE FILES.
        $scope.uploadFiles = function () {

            //FILL FormData WITH FILE DETAILS.
            var data = new FormData();

            for (var i in $scope.files) {
                data.append("uploadedFile", $scope.files[i]);
            }
            // ADD LISTENERS.
            var objXhr = new XMLHttpRequest();
            objXhr.addEventListener("progress", updateProgress, false);
            objXhr.addEventListener("load", transferComplete, false);

            // SEND FILE DETAILS TO THE API.
            objXhr.open("POST", "/api/fileupload/");
            objXhr.send(data);
        }


        // UPDATE PROGRESS BAR.
        function updateProgress(e) {
            if (e.lengthComputable) {
                document.getElementById('pro').setAttribute('value', e.loaded);
                document.getElementById('pro').setAttribute('max', e.total);
            }
        }
        // CONFIRMATION.
        function transferComplete(e) {
            alert("Files uploaded successfully.");
        }
    });
*/
