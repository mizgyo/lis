import { Admin } from 'react-admin';
import type { DataProvider, AuthProvider } from 'react-admin';
import { pocketbaseDataProvider } from './providers/dataProvider';
import { authProvider } from './providers/authProvider';

// Dashboard component
const Dashboard = () => (
  <div style={{ padding: 20 }}>
    <h1>Welcome to LIS Admin Panel</h1>
    <p>Your Pocketbase backend is connected and ready!</p>
    <p>To add resources, create collections in your Pocketbase admin panel and add them as Resource components below.</p>
    <div style={{ marginTop: 20 }}>
      <h3>Getting Started:</h3>
      <ol>
        <li>Go to <a href="http://localhost:8090/_/" target="_blank" rel="noopener noreferrer">Pocketbase Admin</a></li>
        <li>Create collections for your data</li>
        <li>Add Resource components to this app</li>
        <li>Start managing your data!</li>
      </ol>
    </div>
  </div>
);

function App() {
  return (
    <Admin
      dataProvider={pocketbaseDataProvider as DataProvider}
      authProvider={authProvider as AuthProvider}
      dashboard={Dashboard}
      title="LIS Admin"
    >
      {/* Add your resources here based on your Pocketbase collections */}
      {/* Example: <Resource name="users" list={UserList} /> */}
    </Admin>
  );
}

export default App
