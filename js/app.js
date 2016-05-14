angular.module('underscore', [])
.factory('_', ['$window', function($window) {
	return $window._; // assumes underscore has already been loaded on the page
}])

var app = angular.module('sumGame', ['underscore']);

app.config(['$compileProvider', function ($compileProvider) {
	$compileProvider.debugInfoEnabled(false);
}]);

app.controller('sumGameCtrl', ["$scope", "$timeout", "_", function($scope, $timeout, _) {


String.prototype.rjust = function( width, padding ) {
	padding = padding || " ";
	padding = padding.substr( 0, 1 );
	if( this.length < width )
		return padding.repeat( width - this.length ) + this;
	else
		return this;
} // http://snipplr.com/view/709/stringcenter-rjust-ljust/

var num = [1,2,3,4,5,6,7,8,9]

var setsUnder10 = []
var setsOver10 = []

for(var i=0;i<num.length;i++){
	for(var j=0;j<num.length;j++){
			var s = num[i] + num[j]
			if(s < 10){
				setsUnder10.push( [ num[i], num[j] ] )
			} else {
				setsOver10.push( [ num[i], num[j] ] )
			}
	}
}

var randSetsUnder10 = _.shuffle( setsUnder10 )
var randSetsOver10 = _.shuffle( setsOver10 )

///

var firstNum, secondNums

$scope.buildNums = function(){
	// firstNum = ( firstNum )? Number( firstNum ) : _.random(1, 20);
	firstNum = ( $scope.firstNum )? Number( $scope.firstNum ) :  _.random(1, 20);
	secondNums = ( $scope.secondNumMax )? _.range(1, Number( $scope.secondNumMax ) ) :  _.range(1, 20)
	$scope.makeEquation()
}

$scope.makeEquation = function( ){
	resetNum()
	$scope.firstNum = firstNum // || _.random(1, 20);
	$scope.secondNum = _.sample( secondNums )

	$scope.correctValue = $scope.firstNum + $scope.secondNum
	$scope.sumEquation = $scope.firstNum + " + " + $scope.secondNum + " = "
	console.log ($scope.correctValue)
}

function sendReport() {
	$scope.result = true;
	$timeout(function() {
		$scope.result = false;
	}, 1000);
};

$scope.checkValue = function( ){
	$scope.ok = ($scope.correctValue == $scope.myinput )? true : false
	sendReport()
	if($scope.ok){
		delete $scope.answer
		$scope.makeEquation()
	}
}

function resetNum(){
	delete $scope.myinput
	delete $scope.showinput
}

$scope.add = function ( value ){
	if(value==="reset"){
		resetNum() ; return
	}
	$scope.myinput = $scope.myinput || 0
	$scope.myinput = $scope.myinput + value
	console.log( $scope.myinput )
	$scope.showinput = String( $scope.myinput ).rjust(3)
}

$scope.showMyInput = function(){
	String( $scope.myinput ).rjust(3)
}

}]);
