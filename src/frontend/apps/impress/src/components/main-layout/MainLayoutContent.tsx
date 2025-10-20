import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { css } from 'styled-components';

import { Box } from '@/components';
import { useCunninghamTheme } from '@/cunningham';
import { LeftPanel } from '@/features/left-panel';
import { MAIN_LAYOUT_ID } from '@/layouts/conf';
import { useResponsiveStore } from '@/stores';

import { HEADER_HEIGHT } from '../../features/header/conf';
import { ResizableLeftPanel } from '../../features/left-panel/components/ResizableLeftPanel';

export interface MainLayoutContentProps {
  backgroundColor: 'white' | 'grey';
  enableResizablePanel?: boolean;
  onResizingChange?: (isResizing: boolean) => void;
}

export function MainLayoutContent({
  children,
  backgroundColor,
  enableResizablePanel = false,
  onResizingChange,
}: PropsWithChildren<MainLayoutContentProps>) {
  const { isDesktop } = useResponsiveStore();
  const { colorsTokens } = useCunninghamTheme();
  const { t } = useTranslation();
  const currentBackgroundColor = !isDesktop ? 'white' : backgroundColor;

  const mainContent = (
    <Box
      as="main"
      role="main"
      aria-label={t('Main content')}
      id={MAIN_LAYOUT_ID}
      $align="center"
      $flex={1}
      $width="100%"
      $height={`calc(100dvh - ${HEADER_HEIGHT}px)`}
      $padding={{
        all: isDesktop ? 'base' : '0',
      }}
      $background={
        currentBackgroundColor === 'white'
          ? colorsTokens['greyscale-000']
          : colorsTokens['greyscale-050']
      }
      $css={css`
        overflow-y: auto;
        overflow-x: clip;
      `}
    >
      {children}
    </Box>
  );

  if (!isDesktop) {
    return (
      <>
        <LeftPanel />
        {mainContent}
      </>
    );
  }

  if (enableResizablePanel) {
    return (
      <ResizableLeftPanel
        leftPanel={<LeftPanel />}
        onResizingChange={onResizingChange}
      >
        {mainContent}
      </ResizableLeftPanel>
    );
  }

  return (
    <>
      <Box
        $css={css`
          width: 300px;
          min-width: 300px;
          border-right: 1px solid ${colorsTokens['greyscale-200']};
        `}
      >
        <LeftPanel />
      </Box>
      {mainContent}
    </>
  );
}
