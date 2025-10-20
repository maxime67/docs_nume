import { PropsWithChildren, useState } from 'react';
import { css } from 'styled-components';

import { Box } from '@/components';
import { MainLayoutContent } from '@/components/main-layout/MainLayoutContent';
import { Header } from '@/features/header';
import { HEADER_HEIGHT } from '@/features/header/conf';

type MainLayoutProps = {
  backgroundColor?: 'white' | 'grey';
  enableResizablePanel?: boolean;
};

export function MainLayout({
  children,
  backgroundColor = 'white',
  enableResizablePanel = false,
}: PropsWithChildren<MainLayoutProps>) {
  const [isResizing, setIsResizing] = useState(false);

  return (
    <Box
      className={`--docs--main-layout ${isResizing ? 'resizing' : ''}`}
      $css={css`
        &.resizing * {
          transition: none !important;
        }
      `}
    >
      <Header />
      <Box
        $direction="row"
        $margin={{ top: `${HEADER_HEIGHT}px` }}
        $width="100%"
        $height={`calc(100dvh - ${HEADER_HEIGHT}px)`}
      >
        <MainLayoutContent
          backgroundColor={backgroundColor}
          enableResizablePanel={enableResizablePanel}
          onResizingChange={setIsResizing}
        >
          {children}
        </MainLayoutContent>
      </Box>
    </Box>
  );
}
