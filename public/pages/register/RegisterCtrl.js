angular.module('passwordCheck', [])
.directive('passwordCheck', function(){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      if(!ngModel) return; // do nothing if no ng-model

      // watch own value and re-validate on change
      scope.$watch(attrs.ngModel, function() {
        validate();
      });

      // observe the other value and re-validate on change
      attrs.$observe('passwordCheck', function (val) {
        validate();
      });

      var validate = function() {
        // values
        var val1 = ngModel.$viewValue;
        var val2 = attrs.passwordCheck;

        // set validity
        ngModel.$setValidity('passwordCheck', ! val1 || ! val2 || val1 === val2);
      };
    }
  }
});

angular.module('RegisterCtrl', ['passwordCheck'])

.controller('RegisterController', ['$scope', '$location', 'AuthService', 'ErrorService', 'ValidationService',
  function ($scope, $location, AuthService, ErrorService, ValidationService) {

    $scope.regCtrl =  {
                  firstname: '',
                  lastname: '',
                  email: '',
                  birthFormat:  ValidationService.birthFormat,
                  gender: 'Male',
                  password: '',
                  reTypePassword: '',
                  regex:  ValidationService.regex,
                  error: {
                    errorRegister: false,
                    allErrors: false
                  },

                  register: function () {
                        
                        if(this.checkErrors()) {
                          this.error.errorRegister = true;
                          return;
                        }
                        // this.error.errorRegister = false;
                        // call register from service
                        AuthService.register({
                            firstname: this.firstname,
                            lastname: this.lastname,
                            email: this.email,
                            username: this.username,
                            birth: this.birthFormat.date,
                            gender: this.gender,
                            password: this.password,
                            reTypePassword: this.reTypePassword
                        });

                  },

                  checkErrors: function() { 
                    this.error.allErrors = ($scope.registerForm.$invalid) ? true : false
                    return this.error.allErrors;
                  }
    } 

}]);
