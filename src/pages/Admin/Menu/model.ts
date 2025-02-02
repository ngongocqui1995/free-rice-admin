// @ts-ignore
import { Reducer } from 'umi';
import { MenuItem } from '@/pages/Admin/Menu/data';

export interface MenuModalState {
  MenuList?: {
    reload?: () => void;
  };
  MenuForm?: {
    type?: string;
    itemEdit?: MenuItem;
  };
}

export interface MenuModelType {
  namespace: string;
  state: MenuModalState;
  reducers: {
    updateMenuForm: Reducer<MenuModalState>;
    updateMenuList: Reducer<MenuModalState>;
  };
}

const MenuModel: MenuModelType = {
  namespace: 'menu',
  state: {
    MenuList: {
      reload: undefined,
    },
    MenuForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateMenuForm(state, action) {
      const MenuForm = state?.MenuForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        MenuForm[k] = fields[k];
      });
      return { ...state, MenuForm };
    },
    updateMenuList(state, action) {
      const MenuList = state?.MenuList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        MenuList[k] = fields[k];
      });
      return { ...state, MenuList };
    },
  },
};

export default MenuModel;
