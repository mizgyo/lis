import { Admin, Resource, Layout, AppBar } from 'react-admin';
import { pocketbaseDataProvider } from './providers/dataProvider';
import { authProvider } from './providers/authProvider';

// Basic layout with custom app bar
const MyLayout = (props: any) => (
  <Layout {...props} appBar={MyAppBar} />
);

const MyAppBar = () => (
  <AppBar>
    <div style={{ flex: 1, textAlign: 'center' }}>
      <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
        LIS Admin Panel
      </span>
    </div>
  </AppBar>
);

// Placeholder components for resources
const UserList = () => <div>Users List - Connect your collections here</div>;
const Dashboard = () => (
  <div style={{ padding: 20 }}>
    <h1>Welcome to LIS Admin Panel</h1>
    <p>Your Pocketbase backend is connected and ready!</p>
    <p>To add resources, create collections in your Pocketbase admin panel and add them as Resource components below.</p>
  </div>
);

function App() {
  return (
    <Admin
      dataProvider={pocketbaseDataProvider}
      authProvider={authProvider}
      dashboard={Dashboard}
      layout={MyLayout}
      title="LIS Admin"
      requireAuth
    >
      {/* Add your resources here based on your Pocketbase collections */}
      {/* Example: <Resource name="users" list={UserList} /> */}
    </Admin>
  );
}

export default App
