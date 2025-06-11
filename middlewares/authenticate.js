const jwt = require('jsonwebtoken');

const authenticate = (requiredRole = null) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized. Token missing or malformed.' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; 

     
      if (requiredRole && req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden. Insufficient role access.' });
      }

      next(); 
    } catch (error) {
      console.error('JWT error:', error);
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }
  };
};

module.exports = authenticate;
