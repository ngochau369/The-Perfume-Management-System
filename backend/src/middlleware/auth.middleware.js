import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // token từ heade
  // console.log("auth header:", authHeader);
  const token = authHeader && authHeader.split(" ")[1]; // cắt chuỗi thành 2 phần: đầu là Bearer sau là token
  if (!token) {
    return res.status(401).json({ message: "no token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    // so sánh token gửi lên và token đã ký khi đăng nhập
    if (err) {
      return res.status(403).json({ message: "invalid token" });
    }
    // đây là payload được attach vào token khi đăng nhập
    // attach là gắn thêm thông tin vào token
    // payload có thể là id, email,role ,....
    // tùy vào mục đích của ứng dụng mà ta có thễ attach các thông tin khác nhau
    // nhưng không nên attach các thông tin nhạy cảm như password, thẻ tín dụng,...
    req.user = user; //lưu thông tin user vào request để dùng ở các middleware hoặc controller tiếp theo
    // console.log("verify user:", user);
    next();
  });
};

export const requireAdmin = (req, res, next) => {
  if (!req.user?.role) {
    return res.status(403).json({ message: "forbidden" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "admin privileges required" });
  }
  next();
};

export const requireMember = (req, res, next) => {
  if (!req.user?.role) {
    return res.status(403).json({ message: "forbidden" });
  }
  if (req.user.role !== "member") {
    return res.status(403).json({ message: "member privileges required" });
  }
  next();
};

export const requireSelf = (req, res, next) => {
  if (!req.user?.userId) {
    return res.status(403).json({ message: "forbidden" });
  }
  if (req.user.userId !== req.params.id) {
    return res.status(403).json({ message: "only owner can update" });
  }
  next();
};
