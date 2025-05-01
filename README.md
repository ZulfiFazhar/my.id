# Zulfi Fazhar Personal Website

This project is a personal website built with Next.js, showcasing my blog, social links, and information about myself.

## Features

- **Blog:** A collection of articles and posts.
- **Social Links:** Links to my social media profiles.
- **About Me:** Information about my background and experience.
- **Admin Panel:** A password-protected admin panel for managing content.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building web applications
- [TypeScript](https://www.typescriptlang.org/) - Superset of JavaScript that adds static typing
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework for styling
- [Firebase](https://firebase.google.com/) - Backend services for authentication and data storage
- [Radix UI](https://www.radix-ui.com/) - UI component library

## Setup Instructions

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Create a `.env.local` file with the necessary environment variables. Refer to `.env.example` for the required variables.
4.  Run the development server:

    ```bash
    npm run dev
    ```

## File Structure

```
.
├── app/          # Next.js application directory
├── components/   # React components
├── contexts/     # React contexts
├── lib/          # Utility functions and libraries
├── models/       # Data models
├── public/       # Static assets
├── .env.example  # Example environment variables
├── .gitignore    # Specifies intentionally untracked files that Git should ignore
├── next.config.js # Next.js configuration file
├── package-lock.json # Records the exact versions of dependencies
├── package.json    # Contains project metadata and dependencies
├── postcss.config.js # PostCSS configuration file
└── tsconfig.json   # TypeScript configuration file
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

[MIT](https://opensource.org/licenses/MIT)
