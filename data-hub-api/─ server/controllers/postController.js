let posts = []; // In‑memory store
let nextId = 1;

exports.getAllPosts = (req, res) => {
  res.json({ success: true, data: posts });
};

exports.getPostById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const post = posts.find(p => p.id === id);
  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }
  res.json({ success: true, data: post });
};

exports.createPost = (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and content required' });
  }
  const newPost = { id: nextId++, title, content };
  posts.push(newPost);
  res.status(201).json({ success: true, data: newPost });
};

exports.updatePost = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, content } = req.body;
  const post = posts.find(p => p.id === id);
  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }
  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;
  res.json({ success: true, data: post });
};

exports.deletePost = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }
  posts.splice(index, 1);
  res.json({ success: true, message: 'Post deleted' });
};
