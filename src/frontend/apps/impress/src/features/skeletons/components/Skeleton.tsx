import { PropsWithChildren } from 'react';
import { css } from 'styled-components';

import { Box } from '@/components';

import { useSkeletonStore } from '../store/useSkeletonStore';

export const Skeleton = ({ children }: PropsWithChildren) => {
  const { isLoading } = useSkeletonStore();

  if (!isLoading) {
    return null;
  }

  return (
    <Box
      $align="center"
      $width="100%"
      $height="100%"
      $background="white"
      $css={css`
        position: absolute;
        inset: 0;
        z-index: 999;
        overflow: auto;
      `}
    >
      {children}
    </Box>
  );
};
