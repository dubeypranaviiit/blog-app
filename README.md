# CurioBlog 🧠✨

CurioBlog is a modern, full-featured blogging platform built using **Next.js (App Router)**, **Tailwind CSS**, and **Clerk** for authentication. It allows users to explore insightful blogs, subscribe for updates, and contribute to the platform. Admins have a powerful dashboard to manage blog content, messages, and subscribers.

## 🚀 Features

### 🧑‍💻 User-Facing Pages

- **Home Page (`/`)**: Showcases featured blogs, testimonials, and call-to-actions.
- **All Blogs (`/all-blog`)**: Displays all published blogs with filter functionality.
- **Single Blog (`/all-blog/{id}`)**: Detailed view of a specific blog post.
- **Contact Page (`/contact`)**: Allows users to send messages to the team.
- **About Page (`/about`)**: Shares the story and mission behind CurioBlog.

### 🔐 Authentication

- Powered by **Clerk**, supporting secure sign-up, login, and user sessions.

### ⚙️ Admin Panel (`/admin`)

Admins can:
- ✅ Create, update, and delete blog posts.
- 📩 View contact messages from users.
- 📬 Manage email subscriptions.
- 🗑️ View and delete any blog from the system.

### 📩 Notifications & Subscriptions

- **Nodemailer** is used to:
  - Notify subscribers when new blogs are published.
  - Send confirmation emails upon successful contact message submission.

### 💸 Contribution

- **Stripe** integration for accepting donations/contributions from users.

### 🎨 Styling

- Fully styled with **Tailwind CSS** for a responsive, modern UI/UX.

---

## 📦 Tech Stack

| Technology | Usage |
|------------|--------|
| Next.js (App Router) | Full-stack framework |
| JavaScript | Core language |
| Tailwind CSS | Utility-first CSS |
| Clerk | Authentication |
| Nodemailer | Email notifications |
| Stripe | Contribution handling |
| React Icons | Icons used across the UI |

---


