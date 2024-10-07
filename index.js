'use strict';

const express = require('express');
const https = require('https');
const http = require('http');
const app = express();
const oracledb = require('oracledb')
const dbConfig = require('./DB/dbConfig')

app.use(express.json());
app.use(express.static('src'));

app.get('/', function(req, res){ 
    res.sendFile(__dirname + '/src/index.html');
})

app.listen(3000, async function(){
    console.log("Hello, World!");
    connectToDB();
});

async function connectToDB() {
    let conn;
    try {
        conn = await oracledb.getConnection(dbConfig);
        console.log("Oracle DB 연결 성공!!");

        const sql = `SELECT * FROM TEST`;
        const result = await conn.execute(sql);
        console.log(result.rows);

        await conn.close();
    } catch (err) {
        console.error('DB 연결 또는 쿼리 실행 중 오류 발생:', err);
    }
}

/*
--------
참조된 개발문서

express에 대한 api 문서
https://expressjs.com/ko/4x/api.html            

express의 라우팅에 대한 문서
https://expressjs.com/ko/starter/basic-routing.html     기본 라우팅 문서
https://expressjs.com/ko/guide/routing.html             라우팅 문서

node.js의 https와 http 문서
https://nodejs.org/api/https.html               
https://nodejs.org/api/http.html

node의 변경사항 적용시켜주는 패키지 nodemon
https://github.com/remy/nodemon#nodemon

nodemon 진행하면서 발생한 마이크로소프트 파워쉘 보안문서
https://learn.microsoft.com/ko-kr/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.4

oracleDB 문서
https://oracle.github.io/node-oracledb/
--------

const express = require('express');   express 모듈을 가져온다 (expreses.js)
const https = require('https');       HTTPS는 TLS/SSL을 통한 HTTP 프로토콜로 Node.js에서 별도의 모듈로 구현된다.
const http = require('http');         HTTP는 클라이언트와 서버를 모두 포함하는 모듈이다.
const app = require();                express()는 모듈에서 내보내는 최상위 함수

app.get('/', function(req, res){    app.get(path, callback, [, callback ...]) 구조 중
                                    app.get(path, callback) 구조를 가지고 있음
                                    HTTP GET 요청을 지정된 경로로 라우팅한다. 
                                    '/' = 현재 값이 '/'으로 지정되어 뒤에 패스(path) 붙지않았을 때
                                    익명함수가 callback 함수의 역할을 함
                                    받는 익명 함수는 request값과 respose값을 가지고 있어야한다 (라우팅 문서 참고)               

    // 20241007 제거                                
    res.send("Hello, World!");                  GET 받은 클라이언트에게 "Hello, World!"의 값을 보낸다.
    res.sendFile(__dirname + '/src/index.asp'); 파일을 전송하는 함수다.   
})                                  

app.listen(3000, function(){        app.listen([post[, host[, blacklog]]][, callback]) 해당 구조 중
                                    app.listen(post, callback) 구조를 가지고 있음
                                    port는 받은 값으로 포트를 연다, callback은 서버 실행 시 사용할 코드다.
                                    함수의 내용은 node의 http.Server.listen()과 동일하다.
    console.log("Hello, World!");   서버 콘솔에 "Hello, World!" 값을 내보낸다.
});


--------
에러 Error

1.
PS C:\project\nodePOS> npm run
Lifecycle scripts included in nodepos@1.0.0:
  test
    echo "Error: no test specified" && exit 1
- npm run이 없었다. 실행하는 명령어를 기억해야한다

2.
PS C:\project\nodePOS> node index.js 
C:\project\nodePOS\index.js:1
const express = requiue('express');
                ^
ReferenceError: requiue is not defined
    at Object.<anonymous> (C:\project\nodePOS\index.js:1:17)
    at Module._compile (node:internal/modules/cjs/loader:1254:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1308:10)
    at Module.load (node:internal/modules/cjs/loader:1117:32)
    at Module._load (node:internal/modules/cjs/loader:958:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:23:47
- requiue 아니고 require였다.

3.
TypeError: Response.write is not a function
    at C:\project\nodePOS\index.js:7:14
    at Layer.handle [as handle_request] (C:\project\nodePOS\node_modules\express\lib\router\layer.js:95:5)
    at next (C:\project\nodePOS\node_modules\express\lib\router\route.js:149:13)
    at Route.dispatch (C:\project\nodePOS\node_modules\express\lib\router\route.js:119:3)
    at Layer.handle [as handle_request] (C:\project\nodePOS\node_modules\express\lib\router\layer.js:95:5)
    at C:\project\nodePOS\node_modules\express\lib\router\index.js:284:15
    at Function.process_params (C:\project\nodePOS\node_modules\express\lib\router\index.js:346:12)
    at next (C:\project\nodePOS\node_modules\express\lib\router\index.js:280:10)
    at expressInit (C:\project\nodePOS\node_modules\express\lib\middleware\init.js:40:5)
    at Layer.handle [as handle_request] (C:\project\nodePOS\node_modules\express\lib\router\layer.js:95:5)
- 없는 함수였다 대신 send()가 있다.

4.
TypeError: res.listen is not a function
    at C:\project\nodePOS\index.js:8:9
    at Layer.handle [as handle_request] (C:\project\nodePOS\node_modules\express\lib\router\layer.js:95:5)
    at next (C:\project\nodePOS\node_modules\express\lib\router\route.js:149:13)
    at Route.dispatch (C:\project\nodePOS\node_modules\express\lib\router\route.js:119:3)
    at Layer.handle [as handle_request] (C:\project\nodePOS\node_modules\express\lib\router\layer.js:95:5)
    at C:\project\nodePOS\node_modules\express\lib\router\index.js:284:15
    at Function.process_params (C:\project\nodePOS\node_modules\express\lib\router\index.js:346:12)
    at next (C:\project\nodePOS\node_modules\express\lib\router\index.js:280:10)
    at expressInit (C:\project\nodePOS\node_modules\express\lib\middleware\init.js:40:5)
    at Layer.handle [as handle_request] (C:\project\nodePOS\node_modules\express\lib\router\layer.js:95:5)
- res의 함수가 아니라 app의 함수였다.  

5.
PS C:\project\nodePOS> nodemon index.js
nodemon : 이 시스템에서 스크립트를 실행할 수 없으므로 C:\Users\user\AppData\Roaming\npm\nodemon.ps1 파일을 로드할 수 없습니다.  
위치 줄:1 문자:1
+ nodemon index.js
+ ~~~~~~~
    + CategoryInfo          : 보안 오류: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
- 보안쪽의 문제가 있었다.

6.
PS C:\project\nodePOS> nodemon -h
nodemon : 이 시스템에서 스크립트를 실행할 수 없으므로 C:\Users\user\AppData\Roaming\npm\nodemon.ps1 파일을 로드할 수 없습니다. 
자세한 내용은 about_Execution_Policies(https://go.microsoft.com/fwlink/?LinkID=135170)를 참조하십시오.
위치 줄:1 문자:1
+ nodemon -h
+ ~~~~~~~
    + CategoryInfo          : 보안 오류: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
- 노드몬의 help를 쳐보니 링크가 떴다. 보안쪽에 문제가 있었다.    
- 알고보니, powershell 자체에서 구성 파일하고 스크립트를 실행하는 조건을 제어하는 안전기능이 막고 있었다.
- Get-ExecutionPolicy을 통해 보안상태를 확인해본 결과 Restricted(개발 명령 허용, 스크립트 미허용) 상태였다.
- Set-ExecutionPolicy를 통해 Default로 변경하였다.

7.
PS C:\project\nodePOS> Set-ExecutionPolicy -ExecutionPolicy Default
Set-ExecutionPolicy : 레지스트리 키 'HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\PowerShell\1\ShellIds\Microsoft.PowerShell'에 대한   
액세스가 거부되었습니다. 기본(LocalMachine) Scope에 대한 실행 정책을 변경하려면 "관리자 권한으로 실행" 옵션으로 Windows PowerSh 
ell을 시작하십시오. 현재 사용자에 대한 실행 정책을 변경하려면 "Set-ExecutionPolicy -Scope CurrentUser"를 실행하십시오.
위치 줄:1 문자:1
+ Set-ExecutionPolicy -ExecutionPolicy Default
    + CategoryInfo          : PermissionDenied: (:) [Set-ExecutionPolicy], UnauthorizedAccessException
    + FullyQualifiedErrorId : System.UnauthorizedAccessException,Microsoft.PowerShell.Commands.SetExecutionPolicyCommand 
- 저런, 보안정책을 변경할려고 하니 보안 문제가 또 걸렸다.
- 관리자권한으로 파워쉘을 열려 변경하였다.

8.
Set-ExecutionPolicy : Windows PowerShell에서 실행 정책을 업데이트했지만 좀 더 구체적인 범위에서 정의된 정책에 의해
설정이 재정의되었습니다. 재정의로 인해 셸은 현재 유효 실행 정책인 AllSigned을(를) 유지합니다. 실행 정책 설정을 보려
면 "Get-ExecutionPolicy -List"를 입력하십시오. 자세한 내용은 "Get-Help Set-ExecutionPolicy"를 참조하십시오.
위치 줄:1 문자:1
+ Set-ExecutionPolicy -ExecutionPolicy Bypass
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : PermissionDenied: (:) [Set-ExecutionPolicy], SecurityException
    + FullyQualifiedErrorId : ExecutionPolicyOverride,Microsoft.PowerShell.Commands.SetExecutionPolicyCommand
- 위치를 정해 다시 하였다.

9.
ReferenceError: __dir is not defined
    at C:\project\nodePOS\index.js:7:18
    at Layer.handle [as handle_request] (C:\project\nodePOS\node_modules\express\lib\router\layer.js:95:5)      
    at next (C:\project\nodePOS\node_modules\express\lib\router\route.js:149:13)
    at Route.dispatch (C:\project\nodePOS\node_modules\express\lib\router\route.js:119:3)
    at Layer.handle [as handle_request] (C:\project\nodePOS\node_modules\express\lib\router\layer.js:95:5)      
    at C:\project\nodePOS\node_modules\express\lib\router\index.js:284:15
    at Function.process_params (C:\project\nodePOS\node_modules\express\lib\router\index.js:346:12)
    at next (C:\project\nodePOS\node_modules\express\lib\router\index.js:280:10)
    at expressInit (C:\project\nodePOS\node_modules\express\lib\middleware\init.js:40:5)
    at Layer.handle [as handle_request] (C:\project\nodePOS\node_modules\express\lib\router\layer.js:95:5)
- __dir가 아니라 __dirname이였다.

--------
*/