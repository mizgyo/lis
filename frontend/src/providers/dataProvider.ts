import { DataProvider } from 'react-admin';
import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || 'http://localhost:8090');

// Type definitions for React Admin data provider parameters
interface GetListParams {
  pagination: { page: number; perPage: number };
  sort: { field: string; order: string };
  filter: any;
}

interface GetOneParams {
  id: string;
}

interface GetManyParams {
  ids: string[];
}

interface GetManyReferenceParams {
  target: string;
  id: string;
  pagination: { page: number; perPage: number };
  sort: { field: string; order: string };
  filter: any;
}

interface CreateParams {
  data: any;
}

interface UpdateParams {
  id: string;
  data: any;
  previousData?: any;
}

interface UpdateManyParams {
  ids: string[];
  data: any;
}

interface DeleteParams {
  id: string;
  previousData?: any;
}

interface DeleteManyParams {
  ids: string[];
}

export const pocketbaseDataProvider: DataProvider = {
  getList: async (resource: string, params: GetListParams) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    
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

  getOne: async (resource: string, params: GetOneParams) => {
    try {
      const record = await pb.collection(resource).getOne(params.id);
      return {
        data: { ...record, id: record.id },
      };
    } catch (error) {
      console.error('Error in getOne:', error);
      throw new Error(`Error fetching ${resource} with id ${params.id}`);
    }
  },

  getMany: async (resource: string, params: GetManyParams) => {
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

  getManyReference: async (resource: string, params: GetManyReferenceParams) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    try {
      let filter = `${params.target}="${params.id}"`;
      
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

  create: async (resource: string, params: CreateParams) => {
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

  update: async (resource: string, params: UpdateParams) => {
    try {
      const record = await pb.collection(resource).update(params.id, params.data);
      return {
        data: { ...record, id: record.id },
      };
    } catch (error) {
      console.error('Error in update:', error);
      throw new Error(`Error updating ${resource} with id ${params.id}`);
    }
  },

  updateMany: async (resource: string, params: UpdateManyParams) => {
    try {
      const promises = params.ids.map(id =>
        pb.collection(resource).update(id, params.data)
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

  delete: async (resource: string, params: DeleteParams) => {
    try {
      await pb.collection(resource).delete(params.id);
      return {
        data: { id: params.id },
      };
    } catch (error) {
      console.error('Error in delete:', error);
      throw new Error(`Error deleting ${resource} with id ${params.id}`);
    }
  },

  deleteMany: async (resource: string, params: DeleteManyParams) => {
    try {
      const promises = params.ids.map(id =>
        pb.collection(resource).delete(id)
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