const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {

  // 🔥 토큰 가져오기
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "토큰 없음" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 로그인한 사용자 정보 저장
    req.user = decoded;

    next();

  } catch (err) {
    return res.status(403).json({ message: "토큰 유효하지 않음" });
  }
};