# Buddyscript

A full-stack social media application built with Next.js 16, MongoDB, and TypeScript.

**Live URL:** [https://buddyscript-beige.vercel.app/]  
**Video Walkthrough:** [https://youtu.be/7EvQtIK8ZYE]

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 App Router, React 19, TypeScript |
| Backend | Next.js Route Handlers |
| Database | MongoDB 7 + Mongoose |
| Auth | JWT in httpOnly cookies |
| Image Upload | Cloudinary |
| Data Fetching | SWR |
| Validation | Zod |
| Styling | Bootstrap + provided CSS |

---

## Features

- JWT authentication with httpOnly cookies
- Register and login
- Protected feed route via Next.js middleware
- Create posts with text and image upload
- Public and private post visibility
- Like / unlike posts, comments, and replies
- See who liked any post, comment, or reply
- Add comments and replies
- Delete your own posts and comments
- Dark mode toggle

---

## Architecture
Route Handler  →  Service  →  Repository  →  MongoDB
(app/api/)        (lib/services/)  (lib/repositories/)  (lib/models/)

Three MongoDB collections:

- **posts** — post content and metadata
- **comments** — comments and replies (`parentId: null` = comment, `parentId: id` = reply)
- **reactions** — all likes for posts, comments, and replies

Replies are comments with a `parentId` — no separate collection needed.
Reactions use a unique compound index `(targetId, targetType, userId)` to enforce one like per user at the database level.

---

## Running Locally with Docker

**Requirements:** Docker and Docker Compose installed.

**1. Clone the repo**
```bash
git clone https://github.com/msaaaad/buddyscript.git
cd buddyscript
```

**2. Create your environment file**
```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your values:
```env
MONGODB_URI=mongodb://mongo:27017/buddyscript
JWT_SECRET=generate_a_long_random_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> `MONGODB_URI` is pre-filled — it connects to the Docker MongoDB service.  
> For Cloudinary, create a free account at [cloudinary.com](https://cloudinary.com).  
> Generate a JWT secret with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

**3. Start the application**
```bash
docker-compose up --build
```

| Service | URL |
|---|---|
| App | http://localhost:3000 |
| MongoDB GUI | http://localhost:8081 |

---

## Running Locally without Docker

**Requirements:** Node.js 20+, MongoDB running locally or Atlas URI.
```bash
npm install
cp .env.example .env.local
# fill in .env.local
npm run dev
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWTs |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

---

## Project Structure
app/
├── api/
│   ├── auth/
│   │   ├── register/
│   │   ├── login/
│   │   ├── logout/
│   │   └── me/
│   ├── posts/
│   │   └── [postId]/
│   │       └── comments/
│   │           └── [commentId]/
│   ├── reactions/
│   └── upload/
├── (auth)/
│   ├── login/
│   └── register/
└── (protected)/
└── feed/
lib/
├── db/
├── models/
├── repositories/
├── services/
├── validations/
├── auth-utils.ts
├── cloudinary.ts
└── http-client.ts
components/
└── feed/
├── Navbar.tsx
├── DarkModeToggle.tsx
├── LeftSidebar.tsx
├── RightSidebar.tsx
├── StorySection.tsx
├── PostForm.tsx
├── PostCard.tsx
├── CommentSection.tsx
├── CommentItem.tsx
├── ReplyItem.tsx
└── ReactorsPopup.tsx
contexts/
└── AuthContext.tsx
hooks/
├── useAuth.ts
├── usePosts.ts
└── useReactions.ts

---

## Key Decisions

**Separate collections over embedded documents**  
Comments and reactions live in their own collections rather than embedded inside post documents. This avoids MongoDB's 16MB document limit, enables clean population of user names, and supports efficient pagination at scale.

**Replies as comments with parentId**  
A reply is a comment with `parentId` pointing to its parent comment. No separate collection needed. Cascading deletes are handled by querying `{ $or: [{ _id }, { parentId }] }`.

**JWT in httpOnly cookies**  
Prevents XSS token theft. The browser sends the cookie automatically — no Authorization header management needed on the client.

**Batch queries with Promise.all**  
The feed loads posts, reaction counts, user reaction state, comments, and replies in parallel — roughly 7 queries total regardless of feed size. Avoids N+1 query problems.

**Reactions fetched on demand**  
Who liked a post is not loaded with the feed. It is fetched only when the user clicks the like count. Keeps the initial payload small.

---

## Deployment

Deployed on **Vercel** with **MongoDB Atlas** free tier.

To deploy your own:

1. Create a MongoDB Atlas cluster (free tier)
2. Import the repo to [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy