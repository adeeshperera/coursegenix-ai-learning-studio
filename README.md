# CourseGenix AI Learning Studio

![CourseGenix AI Learning Studio](https://github.com/adeeshperera/coursegenix-ai-learning-studio/blob/main/coursegenix-ai-learning-studio/public/coursegenix-preview.png)

CourseGenix is an AI-powered learning platform that revolutionizes course creation and education. Create personalized courses, generate comprehensive content with video recommendations, summaries, and quizzes—all powered by AI.

🌐 **Production Site:** [https://app.coursegenix.me/](https://app.coursegenix.me/)

## 🚀 Features

- **AI-Generated Courses**: Create complete courses on any topic in minutes
- **Smart Learning Structure**: Automatically organizes content into focused learning units
- **Custom Units**: Tailor content to your specific learning goals
- **Video Integration**: YouTube video recommendations for each chapter
- **Interactive Quizzes**: Auto-generated questions to test understanding
- **Course Gallery**: Browse and access all generated courses
- **Responsive Design**: Optimized for all devices
- **Dark/Light Mode**: Choose your preferred visual theme

## 🧠 Technology Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/UI, Lucide icons, Framer Motion
- **Authentication**: NextAuth.js with Google & GitHub authentication
- **Database**: PostgreSQL with Prisma ORM
- **AI Integration**: OpenAI/X.AI APIs
- **Content APIs**: YouTube API, Unsplash API
- **Payment Processing**: Stripe
- **Containerization**: Docker

## 📋 Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- API keys for:
  - OpenAI/X.AI
  - YouTube
  - Unsplash
  - Google OAuth (for authentication)
  - GitHub OAuth (for authentication)
  - Stripe (for payment processing)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/adeeshperera/coursegenix-ai-learning-studio.git
   cd coursegenix-ai-learning-studio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
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

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚢 Deployment

CourseGenix can be deployed using Docker. The included Dockerfile handles all necessary build steps.

### Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t coursegenix-ai-learning-studio --build-arg DATABASE_URL=your-db-url --build-arg NEXTAUTH_SECRET=your-secret [...other args] .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 coursegenix-ai-learning-studio
   ```

### Environment Variables for Production

All necessary environment variables are configured in the Dockerfile as build arguments:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `_GITHUB_CLIENT_ID`
- `_GITHUB_CLIENT_SECRET`
- `OPENAI_API_KEY`
- `YOUTUBE_API_KEY`
- `UNSPLASH_API_KEY`
- `STRIPE_API_KEY`
- `STRIPE_WEBHOOK_SECRET`

## 🧩 Project Structure

- `/src/app` - Next.js application routes
- `/src/components` - React components
- `/src/lib` - Utility functions and API integrations
- `/src/generated` - Generated Prisma client
- `/prisma` - Database schema definition
- `/public` - Static assets

## 💾 Database Schema

CourseGenix uses the following data models:
- `User` - User accounts and credentials
- `Course` - Generated courses
- `Unit` - Course sections/modules
- `Chapter` - Individual lessons with video content
- `Question` - Quiz questions for chapters
- `UserSubscription` - Premium subscription data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

B.A.C. Adeesh Perera - Creator and maintainer

Project Link: [https://github.com/adeeshperera/coursegenix-ai-learning-studio](https://github.com/adeeshperera/coursegenix-ai-learning-studio)

