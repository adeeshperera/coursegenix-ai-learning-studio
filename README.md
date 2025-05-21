# CourseGenix AI Learning Studio

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

<img src="coursegenix-ai-learning-studio/public/Screenshot - CourseGenix AI Learning Studio.png" alt="CourseGenix AI Learning Studio" width="900" />

</div>

<p align="center">
  <b>AI-powered course creation platform for personalized education</b><br>
  <sub>Create comprehensive learning experiences with AI-generated content, videos, and quizzes</sub>
</p>

<div align="center">
  
🌐 **[Live Demo](https://app.coursegenix.me/)** | 📚 **[Documentation](#documentation)** | 📹 **[Demo Video](#demo-video)** | 🐞 **[Report Bug](https://github.com/adeeshperera/coursegenix-ai-learning-studio/issues)**

</div>

---

## ✨ Overview

CourseGenix revolutionizes education by harnessing AI to generate comprehensive learning experiences. Create personalized courses on any topic, complete with structured content, video recommendations, summaries, and interactive quizzes.

<p align="center">
  <kbd>
    <img src="coursegenix-ai-learning-studio/public/file.svg" alt="Course Creation" height="40" />
  </kbd>
  &nbsp;&nbsp;&nbsp;
  <kbd>
    <img src="coursegenix-ai-learning-studio/public/globe.svg" alt="Global Access" height="40" />
  </kbd>
  &nbsp;&nbsp;&nbsp;
  <kbd>
    <img src="coursegenix-ai-learning-studio/public/window.svg" alt="Interactive Learning" height="40" />
  </kbd>
</p>

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

## 📹 Demo Video

<div align="center">
  <a href="https://github.com/adeeshperera/coursegenix-ai-learning-studio/raw/main/System%20Demonstration/lv_0_20250521194758.mp4">
    <img src="coursegenix-ai-learning-studio/public/Screenshot - CourseGenix AI Learning Studio.png" alt="Watch Demo Video" width="600" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);" />
    <br>
    <b>▶️ Click to watch the full demonstration video</b>
  </a>
</div>

## 🧠 Technology Stack

<div align="center">

| 🔧 **Frontend**  | 🔙 **Backend** | 🗃️ **Database** | 🔌 **Integration** |
|:---------------:|:-------------:|:---------------:|:------------------:|
| Next.js 15      | Next.js API Routes | PostgreSQL   | OpenAI/X.AI        |
| React           | Prisma ORM     | Prisma Schema   | YouTube API        |
| TypeScript      | NextAuth.js    | Database Models | Unsplash API       |
| Tailwind CSS    | Stripe API     | Migrations      | Stripe Payment     |
| Shadcn/UI       | Docker         | Relations       | OAuth2 (Google/GitHub) |
| Framer Motion   | Environment Config | Indexing    | API Integration    |

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

<details open>
<summary><b>⚡ Installation</b></summary>
<br>

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
</details>

<details>
<summary><b>📝 Environment Variables</b></summary>
<br>

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
</details>

## 🚢 Deployment

<details>
<summary><b>🐳 Docker Deployment</b></summary>
<br>

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
</details>

## 📚 Documentation

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="Documentation/Project_Proposal/PUSL3190 Project Proposal - 10898872.pdf">
          <img src="coursegenix-ai-learning-studio/public/file.svg" height="48" /><br />
          <b>Project Proposal</b>
        </a>
      </td>
      <td align="center">
        <a href="Documentation/PID/10898872_PID.pdf">
          <img src="coursegenix-ai-learning-studio/public/file.svg" height="48" /><br />
          <b>Project Initiation Document</b>
        </a>
      </td>
      <td align="center">
        <a href="Documentation/Interim/10898872_Interim_Report.pdf">
          <img src="coursegenix-ai-learning-studio/public/file.svg" height="48" /><br />
          <b>Interim Report</b>
        </a>
      </td>
      <td align="center">
        <a href="Documentation/Poster/10898872_Poster.pdf">
          <img src="coursegenix-ai-learning-studio/public/file.svg" height="48" /><br />
          <b>Project Poster</b>
        </a>
      </td>
    </tr>
  </table>
</div>

## 🧩 Project Structure

<details>
<summary><b>Expand Project Structure</b></summary>
<br>

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
<br>

CourseGenix uses the following data models:

- **`User`** - User accounts and authentication data
- **`Course`** - Course metadata and relations to units
- **`Unit`** - Course sections/modules grouping related chapters
- **`Chapter`** - Individual lessons with video content and summaries
- **`Question`** - Quiz questions linked to chapters
- **`UserSubscription`** - Premium subscription data and Stripe integration

</details>

## 🌟 Key Features Walkthrough

<details>
<summary><b>🧠 AI Course Generation</b></summary>
<br>

1. **Enter any topic** - From quantum physics to watercolor painting
2. **Specify learning units** - Customize your learning path
3. **Generate content** - AI creates comprehensive lessons
4. **Review and refine** - Make adjustments as needed

</details>

<details>
<summary><b>📊 Learning Analytics</b></summary>
<br>

- **Progress tracking** - Monitor your learning journey
- **Quiz performance** - See your strengths and areas for improvement
- **Learning insights** - Get personalized recommendations

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

<div align="center">
  
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

</div>

## 📧 Contact

<div align="center">
  
B.A.C. Adeesh Perera - Creator and maintainer

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/adeeshperera)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/adeeshperera)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/adeeshperera)

[Report Bug](https://github.com/adeeshperera/coursegenix-ai-learning-studio/issues) · [Request Feature](https://github.com/adeeshperera/coursegenix-ai-learning-studio/issues)

</div>

---

<div align="center">
  <sub>Built with ❤️ by B.A.C. Adeesh Perera | © 2025 CourseGenix</sub>
</div>

