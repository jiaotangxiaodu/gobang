app.controller("borderController",function ($scope) {
    const width = 15;
    const height = 15;
    $scope.s = []//二维数组中0表示无子,1表示黑子,2表示白子
    $scope.step = [];
    $scope.init = function () {
        for (var i = 0 ; i < width ; i ++){
            $scope.s[i] = [];
            for(var j = 0 ; j < height ; j ++){
                $scope.s[i][j] = 0;
            }
        }
        for (var i = 0 ; i < width ; i ++){
            $scope.step[i] = [];
            for(var j = 0 ; j < height ; j ++){
                $scope.step[i][j] = "";
            }
        }
    }

    var performer = 1;//1表示黑方,2表示白方
    var lock = false;
    var count = 1;

    $scope.put = function (row,col,$event) {

        if($scope.s[row][col] != 0 || lock){
            return;
        }
        $scope.step[row][col] = count;
        count++;
        $scope.s[row][col] = performer;
        var victory = checkVictory(row,col);
        if(victory){
            var performerStr = performer == 1 ? "黑方":"白方";
            alert(performerStr+"胜");
            lock = true;
            return;
        }
        performer = 3-performer;
        putOpr(row,col);

    }

    var checkVictory = function (row,col) {
        var r1 = checkHorizatal(row,col);
        var r2 = checkVertical(row,col);
        var r3 = checkLoxotical1(row,col);//左上到右下
        var r4 = checkLoxotical2(row,col);//右上到左下
        return r1 || r2 || r3|| r4;
    }

    var checkHorizatal = function (row , col) {
        var victory = false;
        for(var i = -4;i<=0;i++){
            if(fiveInLine(row+i,col,row+i+4,col,performer)){
                victory = true;
                break;
            }
        }
        return victory;
    }
    var checkVertical = function (row , col) {
        var victory = false;
        for(var i = -4;i<=0;i++){
            if(fiveInLine(row,col+i,row,col+i+4,performer)){
                victory = true;
                break;
            }
        }
        return victory;
    }
    var checkLoxotical1 = function (row , col) {
        var victory = false;
        for(var i = -4;i<=0;i++){
            if(fiveInLine(row+i,col+i,row+i+4,col+i+4,performer)){
                victory = true;
                break;
            }
        }
        return victory;
    }
    var checkLoxotical2 = function (row , col) {
        var victory = false;
        for(var i = -4;i<=0;i++){
            if(fiveInLine(row+i,col-i,row+i+4,col-i-4,performer)){
                victory = true;
                break;
            }
        }
        return victory;
    }

    var fiveInLine = function (x1,y1,x2,y2,target) {
        var checkInBoard = checkXInBoard(x1) && checkXInBoard(x2) && checkYInBoard(y1) && checkYInBoard(y2);
        if(!checkInBoard){
            return false;
        }
        var dX = (x2-x1)/4;
        var dY = (y2-y1)/4;
        for(var i = 0 ; i < 5 ; i ++){
            var x = x1 + dX*i;
            var y = y1 + dY*i;
            if($scope.s[x][y] != target){
                return false;
            }
        }
        return true;
    }
    var checkXInBoard = function (x) {
        return x >=0 && x < width;
    }
    var checkYInBoard = function (y) {
        return y >= 0 && y < height;
    }


    //记录操作记录
    var opr = null;
    var putOpr = function (x,y) {
        var newOpr = {"x":x,"y":y,"pre":opr}
        opr = newOpr;
    }
    $scope.undo = function () {
        if(opr == null || lock){
            return;
        }
        count = count -1;
        performer = 3-performer;
        $scope.s[opr.x][opr.y] = 0;
        $scope.step[opr.x][opr.y] = "";
        opr = opr.pre;
    }

})