// @ts-ignore
import { Reducer } from 'umi';
import { ValidAddressItem } from '@/pages/System/ValidAddress/data';

export interface ValidAddressModalState {
  ValidAddressList?: {
    reload?: () => void;
  };
  ValidAddressForm?: {
    type?: string;
    itemEdit?: ValidAddressItem;
  };
}

export interface ValidAddressModelType {
  namespace: string;
  state: ValidAddressModalState;
  reducers: {
    updateValidAddressForm: Reducer<ValidAddressModalState>;
    updateValidAddressList: Reducer<ValidAddressModalState>;
  };
}

const ValidAddressModel: ValidAddressModelType = {
  namespace: 'validAddress',
  state: {
    ValidAddressList: {
      reload: undefined,
    },
    ValidAddressForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateValidAddressForm(state, action) {
      const ValidAddressForm = state?.ValidAddressForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        ValidAddressForm[k] = fields[k];
      });
      return { ...state, ValidAddressForm };
    },
    updateValidAddressList(state, action) {
      const ValidAddressList = state?.ValidAddressList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        ValidAddressList[k] = fields[k];
      });
      return { ...state, ValidAddressList };
    },
  },
};

export default ValidAddressModel;
