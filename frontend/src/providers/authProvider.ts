import { pb } from './dataProvider';

export const authProvider = {
  // Called when the user attempts to log in
  login: async ({ username, password }: { username: string; password: string }) => {
    try {
      // Try to authenticate with email
      const authData = await pb.collection('users').authWithPassword(username, password);

      if (authData.token) {
        // Store user info in localStorage for persistence
        localStorage.setItem('pocketbase_auth', JSON.stringify({
          token: authData.token,
          user: authData.record,
        }));
        return Promise.resolve();
      }
      return Promise.reject();
    } catch (error) {
      console.error('Login error:', error);
      return Promise.reject(new Error('Invalid email or password'));
    }
  },

  // Called when the user clicks on the logout button
  logout: async (): Promise<void> => {
    try {
      pb.authStore.clear();
      localStorage.removeItem('pocketbase_auth');
      return Promise.resolve();
    } catch (error) {
      console.error('Logout error:', error);
      return Promise.reject();
    }
  },

  // Called when the API returns an error
  checkError: async ({ status }: { status: number }): Promise<void> => {
    if (status === 401 || status === 403) {
      pb.authStore.clear();
      localStorage.removeItem('pocketbase_auth');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // Called when the user navigates to a new location to check authentication
  checkAuth: async (): Promise<void> => {
    try {
      // Check if there's a valid token in PocketBase auth store
      if (pb.authStore.isValid) {
        return Promise.resolve();
      }

      // Try to restore from localStorage
      const authData = localStorage.getItem('pocketbase_auth');
      if (authData) {
        const { token, user } = JSON.parse(authData);
        pb.authStore.save(token, user);
        
        // Verify the token is still valid
        if (pb.authStore.isValid) {
          return Promise.resolve();
        }
      }

      // Clear invalid auth data
      pb.authStore.clear();
      localStorage.removeItem('pocketbase_auth');
      return Promise.reject();
    } catch (error) {
      console.error('Auth check error:', error);
      pb.authStore.clear();
      localStorage.removeItem('pocketbase_auth');
      return Promise.reject();
    }
  },

  // Called when the user navigates to a new location to get permissions
  getPermissions: async (): Promise<string> => {
    try {
      if (pb.authStore.isValid && pb.authStore.record) {
        // You can implement role-based permissions here
        // For now, we'll return the user's role if it exists
        return Promise.resolve(pb.authStore.record.role || 'user');
      }
      return Promise.reject();
    } catch (error) {
      console.error('Get permissions error:', error);
      return Promise.reject();
    }
  },

  // Called when the user profile is displayed to get user identity
  getIdentity: async (): Promise<{ id: string; fullName: string; avatar?: string }> => {
    try {
      if (pb.authStore.isValid && pb.authStore.record) {
        const user = pb.authStore.record;
        return Promise.resolve({
          id: user.id,
          fullName: user.name || user.username || user.email,
          avatar: user.avatar ? pb.files.getURL(user, user.avatar) : undefined,
        });
      }
      return Promise.reject();
    } catch (error) {
      console.error('Get identity error:', error);
      return Promise.reject();
    }
  },
};

// Helper function to get current user
export const getCurrentUser = () => {
  return pb.authStore.record;
};

// Helper function to get auth token
export const getAuthToken = () => {
  return pb.authStore.token;
};