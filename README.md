# LIS - Full-Stack Application

A full-stack application with Pocketbase backend and React Admin frontend.

## 🚀 Features

### Backend (Pocketbase)
- **Pocketbase**: Open source backend in one file
- **Fly.io Deployment**: Deployed with persistent volumes
- **CORS Configured**: Ready for frontend integration
- **Docker**: Containerized application
- **Health Checks**: API health monitoring

### Frontend (React Admin)
- **React Admin**: Modern admin interface framework
- **Pocketbase Integration**: Custom data and auth providers
- **TypeScript**: Full type safety
- **Vite**: Fast development and build tool
- **Vercel Ready**: Optimized for Vercel deployment

## 🔗 Links

- **Backend API**: https://lis-pocketbase.fly.dev/
- **Backend Admin**: https://lis-pocketbase.fly.dev/_/
- **Frontend**: (Deploy to get URL)
- **Repository**: https://github.com/mizgyo/lis

## 📋 Local Development

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ and npm
- Make (optional, for convenience commands)

### Getting Started

#### Backend (Pocketbase)

1. Clone the repository:
   ```bash
   git clone https://github.com/mizgyo/lis.git
   cd lis/backend
   ```

2. Start the development environment:
   ```bash
   make up
   # or
   docker-compose up -d
   ```

3. Access the backend admin interface:
   - Local: http://localhost:8090/_/
   - Create your first admin account

#### Frontend (React Admin)

1. Navigate to frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Start the frontend:
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173 in your browser

### Available Commands

#### Backend
```bash
cd backend
make up      # Start Pocketbase
make down    # Stop Pocketbase
make logs    # View logs
make backup  # Create data backup
make clean   # Clean up containers
make help    # Show all commands
```

#### Frontend
```bash
cd frontend
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

## 🚀 Deployment

### Backend - Fly.io (Already Deployed ✅)

The backend is already deployed and running at https://lis-pocketbase.fly.dev/

To redeploy backend changes:
```bash
cd backend
flyctl deploy
```

### Frontend - Vercel (Recommended)

1. Push your code to GitHub (already done ✅)

2. Connect your repository to Vercel:
   - Go to https://vercel.com
   - Import your GitHub repository
   - Set root directory to `frontend`

3. Set environment variables in Vercel dashboard:
   ```
   VITE_POCKETBASE_URL=https://lis-pocketbase.fly.dev
   ```

4. Deploy automatically on push

### Alternative: Manual Frontend Deploy

```bash
cd frontend
npm run build
# Upload dist/ folder to your hosting provider
```

## 📁 Project Structure

```
lis/
├── README.md                    # This file
├── .gitignore                  # Git ignore rules
│
├── backend/                    # Pocketbase Backend
│   ├── Dockerfile              # Container definition
│   ├── docker-compose.yml      # Local development setup
│   ├── fly.toml               # Fly.io configuration
│   ├── Makefile               # Convenience commands
│   ├── pb_data/               # Database and files (ignored in git)
│   ├── pb_public/             # Public files
│   ├── pb_migrations/         # Database migrations
│   └── pb_hooks/              # Custom JavaScript hooks
│
└── frontend/                   # React Admin Frontend
    ├── README.md               # Frontend documentation
    ├── package.json            # Dependencies
    ├── vercel.json             # Vercel configuration
    ├── .env.example            # Environment variables template
    ├── .env.local              # Local environment (ignored in git)
    ├── .env.production         # Production environment template
    ├── src/
    │   ├── providers/          # Pocketbase integrations
    │   │   ├── dataProvider.ts # Data provider for React Admin
    │   │   └── authProvider.ts # Auth provider for React Admin
    │   ├── components/         # Custom components
    │   ├── App.tsx            # Main application
    │   └── main.tsx           # Entry point
    └── dist/                  # Build output (ignored in git)
```

## 🛠️ Technologies

### Backend
- **[Pocketbase](https://pocketbase.io/)** - Backend as a Service
- **[Fly.io](https://fly.io/)** - Application hosting
- **[Docker](https://www.docker.com/)** - Containerization
- **[Alpine Linux](https://alpinelinux.org/)** - Base image

### Frontend
- **[React Admin](https://marmelab.com/react-admin/)** - Admin interface framework
- **[React](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vitejs.dev/)** - Build tool
- **[Vercel](https://vercel.com/)** - Frontend hosting

## 🎯 Next Steps

1. **Create Collections**: Use the Pocketbase admin panel to create your data collections
2. **Add Resources**: Update `frontend/src/App.tsx` to add resources for your collections
3. **Deploy Frontend**: Connect to Vercel for automatic deployments
4. **Customize UI**: Add custom components and styling to match your needs

## 📝 License

This project is open source and available under the [MIT License](LICENSE).