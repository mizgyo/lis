# LIS - Pocketbase Backend

A Pocketbase backend application deployed on Fly.io with persistent storage.

## 🚀 Features

- **Pocketbase**: Open source backend in one file
- **Fly.io Deployment**: Deployed with persistent volumes
- **Docker**: Containerized application
- **Health Checks**: API health monitoring

## 🔗 Links

- **Production URL**: https://lis-pocketbase.fly.dev/
- **Admin Panel**: https://lis-pocketbase.fly.dev/_/

## 📋 Local Development

### Prerequisites

- Docker & Docker Compose
- Make (optional, for convenience commands)

### Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd lis
   ```

2. Start the development environment:
   ```bash
   make up
   # or
   docker-compose up -d
   ```

3. Access the admin interface:
   - Local: http://localhost:8090/_/
   - Create your first admin account

### Available Commands

```bash
make up      # Start Pocketbase
make down    # Stop Pocketbase
make logs    # View logs
make backup  # Create data backup
make clean   # Clean up containers
make help    # Show all commands
```

## 🚀 Deployment

### Fly.io Deployment

1. Install Fly CLI:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. Login to Fly.io:
   ```bash
   flyctl auth login
   ```

3. Deploy:
   ```bash
   flyctl deploy
   ```

### Environment Variables

Create a `.env` file (see `.env.example`):
```env
PB_ENCRYPTION_KEY=your-32-character-encryption-key-here
```

## 📁 Project Structure

```
.
├── Dockerfile          # Container definition
├── docker-compose.yml  # Local development setup
├── fly.toml           # Fly.io configuration
├── Makefile           # Convenience commands
├── pb_data/           # Database and files (ignored in git)
├── pb_public/         # Public files
├── pb_migrations/     # Database migrations
├── pb_hooks/          # Custom JavaScript hooks
└── README.md          # This file
```

## 🛠️ Technologies

- **[Pocketbase](https://pocketbase.io/)** - Backend as a Service
- **[Fly.io](https://fly.io/)** - Application hosting
- **[Docker](https://www.docker.com/)** - Containerization
- **[Alpine Linux](https://alpinelinux.org/)** - Base image

## 📝 License

This project is open source and available under the [MIT License](LICENSE).