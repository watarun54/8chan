var jwt = require('jsonwebtoken');
var config = require('../config');
function verifyToken(req, res, next) {
  // header か　url parameters か post parametersからトークンを取得する
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    // jwtの認証をする
    jwt.verify(token, config.secret, function(error, decoded) {
      if (error) {
        return res.json({ success: false, message: 'トークンの認証に失敗しました。' });
      } else {
        // 認証に成功したらdecodeされた情報をrequestに保存する
        req.decoded = decoded;
        next();
      }
    });

  } else {
    // トークンがなければエラーを返す
    return res.status(403).send({
        success: false,
        message: 'トークンがありません。',
    });

  }
}
module.exports = verifyToken;