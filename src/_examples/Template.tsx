import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import type { ReactNode } from 'react';

import MetaInfo from '@/components/atoms/MetaInfo';
import Landing from '@/components/templates/Layout/Landing';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

type ITemplateProps = {
  children?: ReactNode;
};

const Template: NextPageWithLayout<ITemplateProps> = (
  props: ITemplateProps
) => {
  return (
    <>
      <MetaInfo
        title="Home | Nextjs Boilerplate"
        description="This is the home page of the Nextjs Boilerplate app."
      />
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Home Page
          </Typography>
          {props.children}
          <Link href="/about" color="secondary">
            Go to the page
          </Link>
        </Box>
      </Container>
    </>
  );
};

Template.getLayout = generateGetLayout(Landing);

export { Template };
