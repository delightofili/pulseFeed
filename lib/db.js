import sql from "better-sqlite3";
import { resolve } from "styled-jsx/css";

const db = sql("db/feeds.db");

const feeds = [
  {
    id: 1,
    author: "Adaeze Obasi",
    content:
      "Just shipped a new project built with Next.js 14! 💐😁. Server Components are a game changer",
    profileimage: "/customers/amy-burns.png",
    postimage: "/images/wfhimage.jpg",
    likes: 134,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    author: "Mayowa Hassan",
    content: "emote work from Lagos hits diffrent 🌴☀️",
    profileimage: "/customers/lee-robinson.png",
    postimage: "/images/rimage.jpg",
    likes: 98,
    created_at: new Date().toISOString(),
  },
  {
    id: 1,
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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
).run();

async function initData() {
  const rowCount = db.prepare("SELECT count(*) as count FROM feeds").get();
  if (rowCount.count > 0) return;

  const stmt = db.prepare(
    `INSERT INTO feeds VALUES (null,@author,@content,@profileimage,@postimage,@likes,@created_at)`,
  );
  for (const feed of feeds) {
    stmt.run(feed);
  }
}

initData();

export async function getFeeds() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return db.prepare("SELECT * FROM feeds").all();
}
