// @ts-ignore
import { Reducer } from 'umi';
import { PermissionItem } from '@/pages/Admin/Permission/data';

export interface PermissionModalState {
  PermissionList?: {
    reload?: () => void;
  };
  PermissionForm?: {
    type?: string;
    itemEdit?: PermissionItem;
  };
}

export interface PermissionModelType {
  namespace: string;
  state: PermissionModalState;
  reducers: {
    updatePermissionForm: Reducer<PermissionModalState>;
    updatePermissionList: Reducer<PermissionModalState>;
  };
}

const PermissionModel: PermissionModelType = {
  namespace: 'permission',
  state: {
    PermissionList: {
      reload: undefined,
    },
    PermissionForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updatePermissionForm(state, action) {
      const PermissionForm = state?.PermissionForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        PermissionForm[k] = fields[k];
      });
      return { ...state, PermissionForm };
    },
    updatePermissionList(state, action) {
      const PermissionList = state?.PermissionList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        PermissionList[k] = fields[k];
      });
      return { ...state, PermissionList };
    },
  },
};

export default PermissionModel;
