import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || 'http://localhost:8090');

// React Admin compatible data provider
export const pocketbaseDataProvider = {
  getList: async (resource: string, params: { pagination?: { page: number; perPage: number }; sort?: { field: string; order: string }; filter?: Record<string, unknown> }) => {
    const { page = 1, perPage = 10 } = params.pagination || {};
    const { field = 'id', order = 'ASC' } = params.sort || {};
    
    // Build filter query from React Admin filters
    let filter = '';
    if (params.filter) {
      const filters = Object.entries(params.filter)
        .map(([key, value]) => {
          if (typeof value === 'string') {
            return `${key} ~ "${value}"`;
          }
          return `${key} = "${value}"`;
        })
        .join(' && ');
      filter = filters;
    }

    try {
      const result = await pb.collection(resource).getList(page, perPage, {
        sort: order === 'ASC' ? `+${field}` : `-${field}`,
        filter: filter,
      });

      return {
        data: result.items.map(item => ({ ...item, id: item.id })),
        total: result.totalItems,
      };
    } catch (error) {
      console.error('Error in getList:', error);
      throw new Error(`Error fetching ${resource} list`);
    }
  },

  getOne: async (resource: string, params: { id: string | number }) => {
    try {
      const record = await pb.collection(resource).getOne(String(params.id));
      return {
        data: { ...record, id: record.id },
      };
    } catch (error) {
      console.error('Error in getOne:', error);
      throw new Error(`Error fetching ${resource} with id ${params.id}`);
    }
  },

  getMany: async (resource: string, params: { ids: (string | number)[] }) => {
    try {
      const filter = params.ids.map(id => `id="${id}"`).join(' || ');
      const result = await pb.collection(resource).getList(1, params.ids.length, {
        filter: filter,
      });

      return {
        data: result.items.map(item => ({ ...item, id: item.id })),
      };
    } catch (error) {
      console.error('Error in getMany:', error);
      throw new Error(`Error fetching multiple ${resource} records`);
    }
  },

  getManyReference: async (resource: string, params: { target: string; id: string | number; pagination?: { page: number; perPage: number }; sort?: { field: string; order: string }; filter?: Record<string, unknown> }) => {
    const { page = 1, perPage = 10 } = params.pagination || {};
    const { field = 'id', order = 'ASC' } = params.sort || {};

    try {
      let filter = `${params.target}="${String(params.id)}"`;
      
      if (params.filter) {
        const additionalFilters = Object.entries(params.filter)
          .map(([key, value]) => {
            if (typeof value === 'string') {
              return `${key} ~ "${value}"`;
            }
            return `${key} = "${value}"`;
          })
          .join(' && ');
        
        if (additionalFilters) {
          filter += ` && ${additionalFilters}`;
        }
      }

      const result = await pb.collection(resource).getList(page, perPage, {
        sort: order === 'ASC' ? `+${field}` : `-${field}`,
        filter: filter,
      });

      return {
        data: result.items.map(item => ({ ...item, id: item.id })),
        total: result.totalItems,
      };
    } catch (error) {
      console.error('Error in getManyReference:', error);
      throw new Error(`Error fetching ${resource} references`);
    }
  },

  create: async (resource: string, params: { data: Record<string, unknown> }) => {
    try {
      const record = await pb.collection(resource).create(params.data);
      return {
        data: { ...record, id: record.id },
      };
    } catch (error) {
      console.error('Error in create:', error);
      throw new Error(`Error creating ${resource}`);
    }
  },

  update: async (resource: string, params: { id: string | number; data: Record<string, unknown> }) => {
    try {
      const record = await pb.collection(resource).update(String(params.id), params.data);
      return {
        data: { ...record, id: record.id },
      };
    } catch (error) {
      console.error('Error in update:', error);
      throw new Error(`Error updating ${resource} with id ${params.id}`);
    }
  },

  updateMany: async (resource: string, params: { ids: (string | number)[]; data: Record<string, unknown> }) => {
    try {
      const promises = params.ids.map(id =>
        pb.collection(resource).update(String(id), params.data)
      );
      
      await Promise.all(promises);
      
      return {
        data: params.ids,
      };
    } catch (error) {
      console.error('Error in updateMany:', error);
      throw new Error(`Error updating multiple ${resource} records`);
    }
  },

  delete: async (resource: string, params: { id: string | number }) => {
    try {
      await pb.collection(resource).delete(String(params.id));
      return {
        data: { id: params.id },
      };
    } catch (error) {
      console.error('Error in delete:', error);
      throw new Error(`Error deleting ${resource} with id ${params.id}`);
    }
  },

  deleteMany: async (resource: string, params: { ids: (string | number)[] }) => {
    try {
      const promises = params.ids.map(id =>
        pb.collection(resource).delete(String(id))
      );
      
      await Promise.all(promises);
      
      return {
        data: params.ids,
      };
    } catch (error) {
      console.error('Error in deleteMany:', error);
      throw new Error(`Error deleting multiple ${resource} records`);
    }
  },
};

export { pb };