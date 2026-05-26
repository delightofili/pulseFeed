import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.join(process.cwd(), "db", "pulsefeed.db"));

// enable foreign keys — SQLite doesn't enforce them by default
db.pragma("foreign_keys = ON");

// create all tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    avatar TEXT,
    bio TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS likes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    UNIQUE(user_id, post_id)
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS follows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    follower_id INTEGER NOT NULL,
    following_id INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(follower_id, following_id)
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    actor_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    post_id INTEGER,
    read INTEGER DEFAULT 0,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (actor_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS bookmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    UNIQUE(user_id, post_id)
  );
`);

// USERS

export function getUsers() {
  return db.prepare("SELECT * FROM users").all();
}

export function createUser({ name, username, email, password }) {
  const stmt = db.prepare(
    "INSERT INTO users (name, username, email, password, created_at) VALUES (?, ?, ?, ?, ?)",
  );
  stmt.run(name, username, email, password, new Date().toISOString());
}

export function getUserByEmail(email) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
}

export function getUserById(id) {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
}

export function getUserByUsername(username) {
  return db.prepare("SELECT * FROM users WHERE username = ?").get(username);
}

// POSTS
export function getPosts() {
  return db
    .prepare(
      `
    SELECT 
      posts.*,
      users.name,
      users.username,
      users.avatar,
      COUNT(likes.id) as like_count
    FROM posts
    LEFT JOIN users ON posts.user_id = users.id
    LEFT JOIN likes ON posts.id = likes.post_id
    GROUP BY posts.id
    ORDER BY posts.created_at DESC
    LIMIT 20
  `,
    )
    .all();
}

export function getPostById(id) {
  return db
    .prepare(
      `
    SELECT 
      posts.*,
      users.name,
      users.username,
      users.avatar,
      COUNT(likes.id) as like_count
    FROM posts
    LEFT JOIN users ON posts.user_id = users.id
    LEFT JOIN likes ON posts.id = likes.post_id
    WHERE posts.id = ?
    GROUP BY posts.id
  `,
    )
    .get(id);
}

export function getFollowingPosts(userId) {
  return db
    .prepare(
      `
    SELECT 
      posts.*,
      users.name,
      users.username,
      users.avatar,
      COUNT(likes.id) as like_count
    FROM posts
    JOIN users ON posts.user_id = users.id
    JOIN follows ON posts.user_id = follows.following_id
    LEFT JOIN likes ON posts.id = likes.post_id
    WHERE follows.follower_id = ?
    GROUP BY posts.id
    ORDER BY posts.created_at DESC
    LIMIT 20
  `,
    )
    .all(userId);
}

export function createPost({ userId, content, image }) {
  const stmt = db.prepare(
    "INSERT INTO posts (user_id, content, image, created_at) VALUES (?, ?, ?, ?)",
  );
  stmt.run(userId, content, image || null, new Date().toISOString());
}

export function deletePostDb(id) {
  db.prepare("DELETE FROM posts WHERE id = ?").run(id);
}

// LIKES
export function likePostDb(userId, postId) {
  try {
    db.prepare(
      "INSERT INTO likes (user_id, post_id, created_at) VALUES (?, ?, ?)",
    ).run(userId, postId, new Date().toISOString());
    return { liked: true };
  } catch {
    db.prepare("DELETE FROM likes WHERE user_id = ? AND post_id = ?").run(
      userId,
      postId,
    );
    return { liked: false };
  }
}

export function isLiked(userId, postId) {
  const result = db
    .prepare("SELECT id FROM likes WHERE user_id = ? AND post_id = ?")
    .get(userId, postId);
  return !!result;
}

// COMMENTS
export function getComments(postId) {
  return db
    .prepare(
      `
    SELECT comments.*, users.name, users.username, users.avatar
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE comments.post_id = ?
    ORDER BY comments.created_at ASC
  `,
    )
    .all(postId);
}

export function createComment({ userId, postId, content }) {
  db.prepare(
    "INSERT INTO comments (user_id, post_id, content, created_at) VALUES (?, ?, ?, ?)",
  ).run(userId, postId, content, new Date().toISOString());
}

// FOLLOWS
export function followUser(followerId, followingId) {
  try {
    db.prepare(
      "INSERT INTO follows (follower_id, following_id, created_at) VALUES (?, ?, ?)",
    ).run(followerId, followingId, new Date().toISOString());
    return { following: true };
  } catch {
    db.prepare(
      "DELETE FROM follows WHERE follower_id = ? AND following_id = ?",
    ).run(followerId, followingId);
    return { following: false };
  }
}

export function isFollowing(followerId, followingId) {
  const result = db
    .prepare(
      "SELECT id FROM follows WHERE follower_id = ? AND following_id = ?",
    )
    .get(followerId, followingId);
  return !!result;
}

// NOTIFICATIONS
export function getNotifications(userId) {
  return db
    .prepare(
      `
    SELECT notifications.*, users.name, users.username, users.avatar
    FROM notifications
    JOIN users ON notifications.actor_id = users.id
    WHERE notifications.user_id = ?
    ORDER BY notifications.created_at DESC
    LIMIT 50
  `,
    )
    .all(userId);
}

export function createNotification({ userId, actorId, type, postId }) {
  db.prepare(
    "INSERT INTO notifications (user_id, actor_id, type, post_id, created_at) VALUES (?, ?, ?, ?, ?)",
  ).run(userId, actorId, type, postId || null, new Date().toISOString());
}

export function markNotificationsRead(userId) {
  db.prepare("UPDATE notifications SET read = 1 WHERE user_id = ?").run(userId);
}

export function getUnreadCount(userId) {
  const result = db
    .prepare(
      "SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND read = 0",
    )
    .get(userId);
  return result.count;
}

// BOOKMARKS
export function bookmarkPost(userId, postId) {
  try {
    db.prepare(
      "INSERT INTO bookmarks (user_id, post_id, created_at) VALUES (?, ?, ?)",
    ).run(userId, postId, new Date().toISOString());
    return { bookmarked: true };
  } catch {
    db.prepare("DELETE FROM bookmarks WHERE user_id = ? AND post_id = ?").run(
      userId,
      postId,
    );
    return { bookmarked: false };
  }
}
