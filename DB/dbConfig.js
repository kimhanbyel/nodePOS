// 오라클 DB 설정 파일
require("dotenv").config({ path: ".env"})

module.exports = {
    user			:process.env.NODE_ORACLEDB_USER,
    password		:process.env.NODE_ORACLEDB_PASSWORD,
    connectString	:process.env.NODE_ORACLEDB_CONNECTIONSTRING
};