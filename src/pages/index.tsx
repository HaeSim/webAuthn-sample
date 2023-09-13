import MetaInfo from '@/components/atoms/MetaInfo';
import Landing from '@/components/templates/Layout/Landing';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

const Index: NextPageWithLayout = () => {
  return (
    <MetaInfo
      title="Home | Nextjs Boilerplate"
      description="This is the home page of the Nextjs Boilerplate app."
    />
  );
};

Index.getLayout = generateGetLayout(Landing);

export default Index;
