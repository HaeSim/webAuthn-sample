import { Container } from '@mui/material';

import type { ILayoutComponent } from '@/types/common/component';

const Landing: ILayoutComponent = ({ children }) => (
  <Container
    component="main"
    maxWidth="lg"
    sx={{
      minHeight: 'calc(100vh - 255px)', // 255px = 0px (header) + 255px (footer)
    }}
  >
    {children}
  </Container>
);

export default Landing;
