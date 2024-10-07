
//Oracle 사용하기
//npm install oracledb --save

var oracledb = require("oracledb");
var dbConfig = require("./dbConfig.js");

oracledb.autoCommit = false; //자동 커밋

oracledb.getConnection({
	user:dbConfig.user,
	password:dbConfig.password,
	connectString:dbConfig.connectString
	},
	function(err,conn) {
		
		if(err) {throw err;}
		
		console.log("Oracle DB 연결 성공!!");
		
		var sql;
		
		conn.execute(sql,[],function(err,result) {
			
			if(err) {throw err;}
			
			console.log(result.rows);
			
			doRelease(conn);
		});
		
	});

//DB 종료
function doRelease(conn) {
	conn.release(function(err) {
		if(err) {throw err;}
	});
}