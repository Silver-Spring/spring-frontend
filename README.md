This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
pnpm install

# Set up MCP server for AI assistance (recommended)
pnpm setup:mcp

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 🤖 AI-Powered Development with MCP

This project includes Model Context Protocol (MCP) support for enhanced AI coding assistance with GitHub Copilot and other compatible AI agents.

**Setup MCP (one-time):**

```bash
pnpm setup:mcp
```

**Verify MCP configuration:**

```bash
pnpm verify:mcp
```

**What you get with MCP:**

- ✅ Real-time error detection and fixes
- ✅ Context-aware code suggestions
- ✅ Next.js documentation queries
- ✅ Automated upgrade assistance
- ✅ Live debugging with runtime info

**Try these prompts in GitHub Copilot Chat:**

- "Next Devtools, what errors are in my app?"
- "Next Devtools, help me upgrade to Next.js 16"
- "Next Devtools, show me the current routes"

---

## 📦 Features

### Next.js 16 Enhancements

- ✅ **React Compiler** - Automatic performance optimization
- ✅ **Turbopack FileSystem Caching** - Faster dev restarts
- ✅ **Cache Components** - Optional runtime-first caching

**Try the demo:** [http://localhost:3000/demo](http://localhost:3000/demo)

---

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# GraphQL
pnpm codegen          # Generate GraphQL types
pnpm codegen:watch    # Watch mode for GraphQL codegen

# MCP Support
pnpm setup:mcp        # Setup MCP server
pnpm verify:mcp       # Verify MCP configuration
```

### Project Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/          # API routes
│   │   ├── auth/         # Authentication pages
│   │   ├── dashboard/    # User dashboard
│   │   ├── admin/        # Admin panel
│   │   └── demo/         # Next.js 16 features demo
│   ├── components/       # Reusable components
│   ├── modules/          # Feature modules
│   ├── lib/             # Utilities and helpers
│   └── stores/          # Zustand state stores
├── scripts/             # Setup and utility scripts
├── .mcp.json           # MCP server configuration
└── next.config.ts      # Next.js configuration
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_api_url
# Add other environment variables
```

### TypeScript

This project uses TypeScript 5+ with strict mode enabled. Configuration is in `tsconfig.json`.

### Styling

- **Framework**: TailwindCSS 4
- **Components**: Radix UI + Shadcn
- **Dark Mode**: Supported via next-themes

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
