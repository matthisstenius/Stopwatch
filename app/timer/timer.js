angular.module('timerApp').component('timer', {
    templateUrl: 'app/timer/timer.html',
    controller: function TimerController($scope, $interval) {
        var interval;
        $scope.isRunning = false;
        $scope.totalTime = {hours: 0, minutes: 0, seconds: 0, miliseconds: 0};
        $scope.laps = [];
        $scope.times = {hours: 0, minutes: 0, seconds: 0, miliseconds: 0};
    
        function tick() {
            if ($scope.isRunning) {
                return;
            }
            
            interval = $interval(function() {
                $scope.times.miliseconds += 1;
                $scope.totalTime.miliseconds += 1;

                if ($scope.times.miliseconds > 100) {
                    $scope.times.seconds += 1;
                    $scope.totalTime.seconds += 1;
                    $scope.times.miliseconds = 0;
                    $scope.totalTime.miliseconds = 0;
                }

                if ($scope.times.seconds > 60) {
                    $scope.times.minutes += 1;
                    $scope.totalTime.minutes += 1;
                    $scope.times.seconds = 0;
                    $scope.totalTime.seconds = 0;
                }

                if ($scope.times.minutes > 60) {
                    $scope.times.hours += 1;
                    $scope.totalTime.hours += 1;
                    $scope.times.minutes = 0;
                    $scope.totalTime.minutes += 0;
                }
            }, 10);    
        }

        $scope.reset = function(totalReset = false) {
            $scope.stop();
            $scope.times = {hours: 0, minutes: 0, seconds: 0, miliseconds: 0};

            if (totalReset) {
                $scope.laps = [];
                $scope.totalTime = {hours: 0, minutes: 0, seconds: 0, miliseconds: 0};
            }
        }

        $scope.stop = function() {
            $interval.cancel(interval);
            $scope.isRunning = false;
        };

        $scope.start = function() {
            tick();
            $scope.isRunning = true;
        }

        $scope.lap = function() {
            if (! $scope.isRunning) {
                return;
            }

            $scope.laps.push($scope.times);
            $scope.reset();
            $scope.start();
        };

        $scope.formatTime = function(times) {
            var formattedTimes = '';
            angular.forEach(times, function(time) {
                if (time === parseInt(time, 10)) {
                    formattedTimes += time < 10 ? '0' + time + ':': time + ':';    
                }
            });

            return formattedTimes.slice(0, -1)
        };
    }
});