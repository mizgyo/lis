# LIS Frontend - React Admin

React Admin frontend for the LIS Pocketbase backend.

## 🚀 Features

- **React Admin**: Modern admin interface framework
- **Pocketbase Integration**: Custom data and auth providers
- **TypeScript**: Full type safety
- **Vite**: Fast development and build tool
- **Vercel Ready**: Optimized for Vercel deployment

## 📋 Development Setup

### Prerequisites

- Node.js 18+ and npm
- Running Pocketbase backend (see `../backend/`)

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment file:
   ```bash
   cp .env.example .env.local
   ```

3. Update `.env.local` with your Pocketbase URL:
   ```env
   VITE_POCKETBASE_URL=http://localhost:8090
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173 in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Adding Resources

To add new resources based on your Pocketbase collections:

1. Create collections in your Pocketbase admin panel
2. Add Resource components to `src/App.tsx`
3. Create list, create, edit components as needed

Example:
```tsx
import { List, Datagrid, TextField, EmailField } from 'react-admin';

const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
    </Datagrid>
  </List>
);

// In App.tsx
<Resource name="users" list={UserList} />
```

### Authentication

The app uses Pocketbase authentication. Users must be created in the Pocketbase admin panel first.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   ```
   VITE_POCKETBASE_URL=https://lis-pocketbase.fly.dev
   ```
4. Deploy automatically on push

### Manual Deploy

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 📁 Project Structure

```
src/
├── providers/
│   ├── dataProvider.ts    # Pocketbase data provider
│   └── authProvider.ts    # Pocketbase auth provider
├── components/           # Custom components
├── App.tsx              # Main application
└── main.tsx            # Entry point
```

## 🔗 Related

- [Pocketbase Documentation](https://pocketbase.io/docs/)
- [React Admin Documentation](https://marmelab.com/react-admin/)
- [Backend README](../backend/README.md)
