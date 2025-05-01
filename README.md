# Personal Website - Blog & Portfolio

A modern, feature-rich personal website built with Next.js 15.2, showcasing blog posts, social media presence, and personal information. The project includes a secure admin panel for content management, built with TypeScript and styled using Tailwind CSS.

## Features

- **Modern Blog System**: Write and manage blog posts with markdown support
- **Dynamic Social Links**: Manage and display social media profiles
- **Personal Portfolio**: Showcase personal information and projects
- **Secure Admin Panel**: Password-protected admin interface for content management
- **Responsive Design**: Mobile-first design approach using Tailwind CSS
- **Dark/Light Mode**: Theme support using next-themes
- **SEO Optimized**: Built with SEO best practices

## Technology Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript 5.x
- **Styling**:
  - Tailwind CSS with PostCSS
  - Radix UI Components (Multiple Components)
  - Class Variance Authority 0.7.1
- **Authentication**: Firebase 11.6.0
- **Database**: MongoDB with Mongoose 8.13.2
- **UI Components**:
  - Radix UI (Accordion, Dialog, Label, Select, etc.)
  - Framer Motion 12.6.5
  - Lucide React 0.485.0
- **Content Management**:
  - React Markdown 10.1.0
  - React SimpleMDE Editor 5.2.0
- **Development Tools**:
  - ESLint
  - TypeScript
  - Prettier

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- MongoDB installation or MongoDB Atlas account
- Firebase project setup
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/zulfifazhar/zulfifazhar-my-id.git
   cd zulfifazhar-my-id
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Environment Configuration:
   Create a `.env` file based on `.env.example` and fill in the required values:

   ```env
   MONGODB_URI="your_mongodb_connection_string"
   NEXT_PUBLIC_URL="your_website_url"
   NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
   # Add other Firebase configuration values
   ```

4. Database Setup:

   - Ensure MongoDB is running locally or use MongoDB Atlas
   - The application will automatically create required collections

5. Firebase Setup:

   - Create a Firebase project
   - Enable Authentication with Google provider
   - Copy Firebase configuration to .env file
   - Set allowed email addresses in NEXT_PUBLIC_FIREBASE_EMAIL_ALLOWED

6. Start the development server:

   ```bash
   npm run dev
   ```

7. (Optional) Seed initial data:

   ```bash
   npm run seed
   ```

8. For production build:
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
├── app/                  # Next.js 13+ app directory
│   ├── admin/           # Admin panel pages
│   ├── api/             # API routes
│   ├── blog/            # Blog related pages
│   └── social/          # Social links pages
├── components/          # Reusable React components
│   ├── admin/          # Admin-specific components
│   ├── blog/           # Blog-related components
│   ├── ui/             # UI components
│   └── shared/         # Shared components
├── contexts/           # React context providers
├── lib/                # Utility functions & configurations
│   ├── db.ts          # Database configuration
│   ├── firebase.ts    # Firebase configuration
│   └── utils.ts       # Helper functions
├── models/             # MongoDB models
│   ├── Blog.ts        # Blog post model
│   ├── Home.ts        # Homepage content model
│   └── Social.ts      # Social links model
└── public/            # Static assets
```

## Environment Variables

Required environment variables for the project:

```env
# MongoDB Configuration
MONGODB_URI="mongodb://127.0.0.1:27017/<database>"

# Website URL
NEXT_PUBLIC_URL=""

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=""

# Admin Access
NEXT_PUBLIC_FIREBASE_EMAIL_ALLOWED=""
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
