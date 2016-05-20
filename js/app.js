angular.module('pomodoroApp',[])
    .controller('CountDownController', function ($scope, $interval) {
        var amountTime = new Date();
        amountTime.setMinutes(25);
        amountTime.setSeconds(0);
        $scope.RemainTime = amountTime;
        $scope.IsRunning = false;
        var stop;
        $scope.StartStopClick = function () {
            if ($scope.IsRunning) {
                StopCountDown();
            } else {
                StartCountDown();
            }
        }
        
        function StartCountDown() {
            if ( angular.isDefined(stop) ) return;
            stop = $interval(ReduceRemainingTime, 1000);
            $scope.IsRunning = true;
        }
        
        function ReduceRemainingTime() {
            $scope.RemainTime.setTime($scope.RemainTime.getTime() - 1000);
        }
        
        function StopCountDown() {
            if (angular.isDefined(stop)) {
                $scope.IsRunning = false;
                $interval.cancel(stop);
                stop = undefined;
          }
        }
    })
    .filter('ConvertBooleanToStartStop', function(){
        return function (input) {
            return input ? 'stop' : 'start';
        }
    });