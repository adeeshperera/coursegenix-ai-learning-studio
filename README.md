# CourseGenix AI Learning Studio

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Shadcn/UI](https://img.shields.io/badge/Shadcn%2FUI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![AWS](https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)
[![DigitalOcean](https://img.shields.io/badge/DigitalOcean-0080FF?style=for-the-badge&logo=digitalocean&logoColor=white)](https://www.digitalocean.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://www.cloudflare.com/)

<img src="Documentation/Poster/10898872_Poster.png" alt="CourseGenix AI Learning Studio" width="900" />

</div>

<p align="center">
  <b>AI-powered course creation platform for personalized education</b><br>
  <sub>Create comprehensive learning experiences with AI-generated content, videos, and quizzes</sub>
</p>

<div align="center">
  
🌐 **[Live Demo](https://app.coursegenix.me/)** | 📚 **[Documentation](https://github.com/adeeshperera/coursegenix-ai-learning-studio)** | 🐞 **[Report Bug](https://github.com/adeeshperera/coursegenix-ai-learning-studio/issues)**

</div>

---

## ✨ Overview

CourseGenix revolutionizes education by harnessing AI to generate comprehensive learning experiences. Create personalized courses on any topic, complete with structured content, video recommendations, summaries, and interactive quizzes.

## 🚀 Features

<table>
  <tr>
    <td>
      <h3>🧠 AI Content Generation</h3>
      <ul>
        <li>Create complete courses on any topic</li>
        <li>Auto-organized learning structure</li>
        <li>Custom learning units</li>
      </ul>
    </td>
    <td>
      <h3>🎬 Rich Media Integration</h3>
      <ul>
        <li>YouTube video recommendations</li>
        <li>AI-generated summaries</li>
        <li>Interactive quizzes</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <h3>📱 User Experience</h3>
      <ul>
        <li>Responsive design</li>
        <li>Course gallery</li>
        <li>Dark/Light mode</li>
      </ul>
    </td>
    <td>
      <h3>🔒 Authentication</h3>
      <ul>
        <li>Google login</li>
        <li>GitHub login</li>
        <li>Secure user accounts</li>
      </ul>
    </td>
  </tr>
</table>

### 🎯 Intelligent Video Selection Algorithm

CourseGenix employs a sophisticated **multi-factor scoring algorithm** to automatically select the most relevant and high-quality YouTube videos for each course chapter:

**🔍 Selection Process:**

1. **Initial Search** - Searches YouTube API for medium-duration, embeddable videos in English
2. **Statistics Gathering** - Retrieves view counts, like counts, and engagement metrics
3. **Multi-Factor Scoring** - Calculates a composite score based on:
   - **View Count (40%)** - Uses logarithmic scaling to balance popularity
   - **Engagement Ratio (30%)** - Likes-to-views ratio indicating content quality
   - **Title Relevance (20%)** - Exact keyword matching in video titles
   - **Description Match (10%)** - Keyword presence in video descriptions

**🎯 Quality Assurance:**

- Automatically filters for embeddable videos
- Prioritizes educational value through engagement metrics
- Ensures topical relevance through keyword matching
- Returns the highest-scoring video for optimal learning experience

This intelligent curation ensures students receive the most valuable and relevant video content for their learning journey.

## 🧠 Technology Stack

<div align="center">

| 🔧 **Frontend** |   🔙 **Backend**   | 🗃️ **Database** |   🔌 **Integration**   |
| :-------------: | :----------------: | :-------------: | :--------------------: |
|   Next.js 15    | Next.js API Routes |   PostgreSQL    |      OpenAI/X.AI       |
|      React      |     Prisma ORM     |  Prisma Schema  |      YouTube API       |
|   TypeScript    |    NextAuth.js     | Database Models |      Unsplash API      |
|  Tailwind CSS   |     Stripe API     |   Migrations    |     Stripe Payment     |
|    Shadcn/UI    |       Docker       |    Relations    | OAuth2 (Google/GitHub) |
|  Framer Motion  | Environment Config |    Indexing     |    API Integration     |

</div>

## 📋 Prerequisites

Before you begin, ensure you have the following:

- **[Node.js](https://nodejs.org/)** (v18 or higher)
- **[PostgreSQL](https://www.postgresql.org/)** database
- **API keys** for the following services:
  - [OpenAI/X.AI](https://platform.openai.com/)
  - [YouTube API](https://developers.google.com/youtube/v3)
  - [Unsplash API](https://unsplash.com/developers)
  - [Google OAuth](https://console.cloud.google.com/)
  - [GitHub OAuth](https://github.com/settings/developers)
  - [Stripe](https://stripe.com/)

## 🛠️ Quick Start

### ⚡ Installation

```bash
# Clone the repository
git clone https://github.com/adeeshperera/coursegenix-ai-learning-studio.git

# Navigate to project directory
cd coursegenix-ai-learning-studio

# Install dependencies
npm install

# Set up environment variables (see .env.example below)

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

### 📝 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/coursegenix"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
_GITHUB_CLIENT_ID="your-github-client-id"
_GITHUB_CLIENT_SECRET="your-github-client-secret"

# APIs
OPENAI_API_KEY="your-openai-api-key"
YOUTUBE_API_KEY="your-youtube-api-key"
UNSPLASH_API_KEY="your-unsplash-api-key"

# Stripe
STRIPE_API_KEY="your-stripe-api-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
```

## 🚢 Deployment

### 🐳 Docker Deployment

```bash
# Build Docker image
docker build -t coursegenix-ai-learning-studio \
  --build-arg DATABASE_URL=your-db-url \
  --build-arg NEXTAUTH_SECRET=your-secret \
  --build-arg NEXTAUTH_URL=your-url \
  --build-arg GOOGLE_CLIENT_ID=your-google-id \
  --build-arg GOOGLE_CLIENT_SECRET=your-google-secret \
  --build-arg OPENAI_API_KEY=your-openai-key \
  --build-arg YOUTUBE_API_KEY=your-youtube-key \
  --build-arg UNSPLASH_API_KEY=your-unsplash-key \
  --build-arg STRIPE_API_KEY=your-stripe-key \
  --build-arg STRIPE_WEBHOOK_SECRET=your-webhook-secret \
  .

# Run container
docker run -p 3000:3000 coursegenix-ai-learning-studio
```

## 🧩 Project Structure

<details>
<summary><b>Expand Project Structure</b></summary>

```
coursegenix-ai-learning-studio/
├── components.json       # UI component config
├── Dockerfile            # Docker container setup
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts
├── prisma/               # Database schema
├── public/               # Static assets
└── src/
    ├── app/              # Next.js routes and pages
    │   ├── api/          # API endpoints
    │   ├── course/       # Course viewer pages
    │   ├── create/       # Course creation pages
    │   ├── gallery/      # Course gallery
    │   └── settings/     # User settings
    ├── components/       # React components
    │   ├── ui/           # UI components (shadcn)
    │   └── ...           # Feature components
    ├── lib/              # Utility functions
    └── validators/       # Input validation
```

</details>

## 💾 Database Schema

<details>
<summary><b>Expand Database Models</b></summary>

CourseGenix uses the following data models:

- **`User`** - User accounts and authentication data
- **`Course`** - Course metadata and relations to units
- **`Unit`** - Course sections/modules grouping related chapters
- **`Chapter`** - Individual lessons with video content and summaries
- **`Question`** - Quiz questions linked to chapters
- **`UserSubscription`** - Premium subscription data and Stripe integration

</details>

## 🤝 Contributing

We welcome contributions to CourseGenix! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push** to your branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

See our [contribution guidelines](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

B.A.C. Adeesh Perera - Creator and maintainer

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/adeeshperera)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/adeeshperera)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/adeeshperera)

[Report Bug](https://github.com/adeeshperera/coursegenix-ai-learning-studio/issues) · [Request Feature](https://github.com/adeeshperera/coursegenix-ai-learning-studio/issues)

</div>

---

<div align="center">
  <sub>Built with ❤️ by B.A.C. Adeesh Perera</sub>
</div>
