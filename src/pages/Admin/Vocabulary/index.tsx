import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import VocabularyForm from "@/pages/Admin/Vocabulary/components/VocabularyForm";
import VocabularyList from "@/pages/Admin/Vocabulary/components/VocabularyList";

const Vocabulary: React.FC = () => {
  return (
    <PageContainer>
      <VocabularyForm />
      <VocabularyList />
    </PageContainer>
  );
};

export default Vocabulary;
