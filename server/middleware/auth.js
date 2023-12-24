import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      return res.status(401).send("Token not provided");
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Log the decoded user information for debugging
    console.log('Decoded User:', verified);
    console.log(token);

    req.user = verified;
    next();
  } catch (err) {
    console.error('Token Verification Error:', err.message);
    res.status(401).json({ error: 'Unauthorized' });
  }
};
