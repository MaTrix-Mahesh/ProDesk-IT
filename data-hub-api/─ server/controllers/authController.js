exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing username or password' });
  }
  const token = 'mock-jwt-token';
  res.json({ success: true, token, user: { username } });
};
