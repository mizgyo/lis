.PHONY: dev start stop build clean install logs backup deploy help

# Default target
all: help

# Development - Start both backend and frontend
dev: install
	@echo "🚀 Starting LIS development environment..."
	@echo "Backend will be available at: http://localhost:8090"
	@echo "Frontend will be available at: http://localhost:5173"
	@echo "Press Ctrl+C to stop both services"
	npm run dev

# Alias for dev
start: dev

# Stop all services
stop:
	@echo "🛑 Stopping all services..."
	cd backend && make down
	@echo "✅ All services stopped"

# Build frontend for production
build:
	@echo "🔨 Building frontend for production..."
	npm run build:frontend
	@echo "✅ Build completed"

# Install all dependencies
install:
	@echo "📦 Installing dependencies..."
	@npm install
	@cd frontend && npm install
	@echo "✅ Dependencies installed"

# View backend logs
logs:
	@echo "📋 Showing backend logs..."
	cd backend && make logs

# Create backup
backup:
	@echo "💾 Creating backup..."
	cd backend && make backup

# Clean everything
clean:
	@echo "🧹 Cleaning up..."
	cd backend && make clean
	cd frontend && rm -rf node_modules dist || true
	rm -rf node_modules || true
	@echo "✅ Cleanup completed"

# Deploy backend
deploy-backend:
	@echo "🚀 Deploying backend to Fly.io..."
	cd backend && flyctl deploy

# Deploy frontend (build only, manual Vercel deploy)
deploy-frontend:
	@echo "🔨 Building frontend for deployment..."
	npm run build:frontend
	@echo "✅ Frontend built. Deploy the 'frontend/dist' folder to Vercel"

# Health check
health:
	@echo "🏥 Checking backend health..."
	@curl -f http://localhost:8090/api/health > /dev/null 2>&1 && echo "✅ Backend is healthy" || echo "❌ Backend is not responding"

# Show status
status:
	@echo "📊 Service Status:"
	@echo "Backend (Docker):"
	@cd backend && docker-compose ps 2>/dev/null || echo "  Not running"
	@echo "Frontend: Check http://localhost:5173"

# Help
help:
	@echo "🎯 LIS Development Commands"
	@echo ""
	@echo "Quick Start:"
	@echo "  make install     Install all dependencies"
	@echo "  make dev         Start both backend and frontend"
	@echo "  make stop        Stop all services"
	@echo ""
	@echo "Development:"
	@echo "  make start       Alias for 'make dev'"
	@echo "  make logs        Show backend logs"
	@echo "  make health      Check backend health"
	@echo "  make status      Show service status"
	@echo ""
	@echo "Building & Deployment:"
	@echo "  make build       Build frontend for production"
	@echo "  make deploy-backend   Deploy backend to Fly.io"
	@echo "  make deploy-frontend  Build frontend for Vercel"
	@echo ""
	@echo "Maintenance:"
	@echo "  make backup      Create data backup"
	@echo "  make clean       Clean all dependencies and builds"
	@echo "  make help        Show this help"
	@echo ""
	@echo "URLs:"
	@echo "  Backend:  http://localhost:8090"
	@echo "  Frontend: http://localhost:5173"
	@echo "  Admin:    http://localhost:8090/_/"