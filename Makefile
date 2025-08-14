.PHONY: up down restart logs backup restore clean help

# Start Pocketbase
up:
	docker-compose up -d

# Stop Pocketbase
down:
	docker-compose down

# Restart Pocketbase
restart:
	docker-compose restart

# Show logs
logs:
	docker-compose logs -f pocketbase

# Show container status
status:
	docker-compose ps

# Backup database
backup:
	@echo "Creating backup of Pocketbase data..."
	@mkdir -p backups
	@tar -czf backups/pb_backup_$(shell date +%Y%m%d_%H%M%S).tar.gz pb_data/

# Restore from latest backup
restore:
	@echo "Restoring from latest backup..."
	@tar -xzf $(shell ls -t backups/pb_backup_*.tar.gz | head -1) && echo "Restored successfully"

# Clean up containers and volumes
clean:
	docker-compose down -v
	docker system prune -f

# Shell into container
shell:
	docker-compose exec pocketbase sh

# Update Pocketbase image
update:
	docker-compose pull
	docker-compose up -d

# Help
help:
	@echo "Available commands:"
	@echo "  up      - Start Pocketbase"
	@echo "  down    - Stop Pocketbase"
	@echo "  restart - Restart Pocketbase"
	@echo "  logs    - Show logs"
	@echo "  status  - Show container status"
	@echo "  backup  - Create backup of data"
	@echo "  restore - Restore from latest backup"
	@echo "  clean   - Remove containers and volumes"
	@echo "  shell   - Shell into container"
	@echo "  update  - Update Pocketbase image"
	@echo "  help    - Show this help"