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
var sessions = ['+','-','*']
var resultSign = {success: 'j-success', fail: 'j-fail', default: 'j-default'}
$scope.session = 0 ; $scope.resultSign = resultSign.default
$scope.count = 1
$scope.secondNumMax = _.random(9, 50);
$scope.firstNum = _.random(1, 50);

var firstNum, secondNums

var buildNums = $scope.buildNums = function(){
	// firstNum = ( firstNum )? Number( firstNum ) : _.random(1, 20);
	firstNum = Number( $scope.firstNum )
	secondNums = _.range(1, Number( $scope.secondNumMax ) )
	$scope.makeEquation()
}

$scope.makeEquation = function( ){
	resetNum()
	$scope.firstNum = firstNum // || _.random(1, 20);
	$scope.secondNum = _.sample( secondNums )

	$scope.correctValue = $scope.firstNum + $scope.secondNum

	switch ( $scope.session ) {
		case 0:
			$scope.correctValue = $scope.firstNum + $scope.secondNum;
			break;
		case 1:
			$scope.correctValue = $scope.firstNum - $scope.secondNum;
			break;
		case 2:
			$scope.correctValue = $scope.firstNum * $scope.secondNum;
			break;
	}

	$scope.sumEquation = $scope.firstNum + " " + sessions[$scope.session]+ " " + $scope.secondNum + " = "
	console.log ($scope.correctValue)
}

buildNums()

function sendReport(rst) {
	$scope.resultSign = (rst)? resultSign.success : resultSign.fail;
	$timeout(function() {
		$scope.resultSign = resultSign.default;
	}, 1000);
};

$scope.checkValue = function( ){
	$scope.ok = ($scope.correctValue == $scope.myinput )? true : false
	sendReport($scope.ok)
	if($scope.ok){
		delete $scope.answer
		$scope.count++
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
