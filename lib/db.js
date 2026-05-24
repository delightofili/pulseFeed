import sql from "better-sqlite3";

const db = sql("db/feeds.db");

const feeds = [
  {
    id: 1,
    slug: "feed-1",
    author: "Adaeze Obasi",
    content: "remote work from Lagos hits diffrent 🌴☀️",
    profileimage: "/customers/amy-burns.png",
    postimage: "/images/wfhimage.jpg",
    likes: 134,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    slug: "feed-2",
    author: "Mayowa Hassan",
    content:
      "Just shipped a new project built with Next.js 14! 💐😁. Server Components are a game changer",
    profileimage: "/customers/lee-robinson.png",
    postimage: "/images/rimage.jpg",
    likes: 98,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    slug: "feed-3",
    author: "CodeWithPhilo",
    content: "Thred ⏳: 10 Javascript tips that changed the way I code",
    profileimage: "/images/evil-rabbit.png",
    postimage: "/",
    likes: 342,
    created_at: new Date().toISOString(),
  },
];

db.prepare(
  `CREATE TABLE IF NOT EXISTS feeds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT NOT NULL,
    content TEXT NOT NULL,
    profileimage TEXT,
    postimage TEXT,
    likes INTEGER,
    slug TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
).run();

async function initData() {
  const rowCount = db.prepare("SELECT count(*) as count FROM feeds").get();
  if (rowCount.count > 0) return;

  const stmt = db.prepare(
    `INSERT INTO feeds VALUES (null,@author,@content,@profileimage,@postimage,@likes,@slug,@created_at)`,
  );
  for (const feed of feeds) {
    stmt.run(feed);
  }
}

initData();

export function getFeeds() {
  return db.prepare("SELECT * FROM feeds").all();
}

export function getFeed(slug) {
  const feed = db.prepare("SELECT * FROM feeds WHERE slug = ?").get(slug);

  return feed;
}

export function addFeed({ content, author }) {
  const slug = `feed-${Date.now()}`;
  const stmt = db.prepare(
    "INSERT INTO feeds (slug, author, content, created_at, likes) VALUES (?, ?, ?, ?, ?)",
  );

  stmt.run(slug, author, content, new Date().toISOString(), 0);

  return { slug, content, author };
}

export function deleteFeed(slug) {
  const stmt = db.prepare("DELETE FROM feeds WHERE slug = ?").run(slug);
}
