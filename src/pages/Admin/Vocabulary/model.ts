// @ts-ignore
import { Reducer } from 'umi';
import { VocabularyItem } from '@/pages/Admin/Vocabulary/data';

export interface VocabularyModalState {
  VocabularyList?: {
    reload?: () => void;
  };
  VocabularyForm?: {
    type?: string;
    itemEdit?: VocabularyItem;
  };
}

export interface VocabularyModelType {
  namespace: string;
  state: VocabularyModalState;
  reducers: {
    updateVocabularyForm: Reducer<VocabularyModalState>;
    updateVocabularyList: Reducer<VocabularyModalState>;
  };
}

const VocabularyModel: VocabularyModelType = {
  namespace: 'vocabulary',
  state: {
    VocabularyList: {
      reload: undefined,
    },
    VocabularyForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateVocabularyForm(state, action) {
      const VocabularyForm = state?.VocabularyForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        VocabularyForm[k] = fields[k];
      });
      return { ...state, VocabularyForm };
    },
    updateVocabularyList(state, action) {
      const VocabularyList = state?.VocabularyList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        VocabularyList[k] = fields[k];
      });
      return { ...state, VocabularyList };
    },
  },
};

export default VocabularyModel;
