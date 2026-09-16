import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { IconButton } from '@cake-admin/cakeand';
import { Toast as RadixToast } from 'radix-ui';
import styled, { css } from 'styled-components';

/**
 * The update flow toast surface.
 *
 * Cake&'s `Toast` with `layout="complex"` is the same Figma component these
 * frames use (`&toast.complex`), but its complex layout renders exactly two
 * rows — the icon/text/dismiss row and the indented footer — with no slot
 * between them. Four of the six update frames put a full-width row there: the
 * progress track (nodes 2389:28647, 2754:29556) and the More/Less disclosure
 * (nodes 2754:29409, 2754:29511).
 *
 * Cake& exports no toast with that slot, so per the design-system-gap clause in
 * `.cursor/rules/architecture.mdc` this composes the surface locally. It is a
 * deliberate copy of Cake&'s own complex toast — same Radix primitive, same
 * token for every value, same 480px complex width — plus the `media` slot.
 * Buttons, the dismiss control, and the progress track all remain Cake&
 * components.
 */

const Surface = styled(RadixToast.Root)`
  box-sizing: border-box;
  display: block;
  width: 100%;
  /* Cake& sets 480px for the complex layout; Figma's frame variable is 480. */
  max-width: 480px;
  border-radius: var(--radius-400);
  overflow: hidden;
  list-style: none;

  /* Figma "win.htc.border": a real border in a transparent token, so Windows
     High Contrast (which repaints borders and strips shadows) still gives the
     translucent surface an edge. No visible ring in normal themes. */
  border: var(--stroke-100) solid var(--color-stroke-border-container);

  background: var(--color-surfaces-container-blur);
  box-shadow: var(--elevation-3);

  /* Figma's "surfaces/container blur" effect has a 90-radius blur; 45px is the
     equivalent CSS visual radius. Intrinsic geometry, not a token. */
  backdrop-filter: blur(45px);
  -webkit-backdrop-filter: blur(45px);

  &[data-swipe='move'] {
    transform: translateX(var(--radix-toast-swipe-move-x, 0));
  }

  &[data-swipe='cancel'] {
    transform: translateX(0);
    transition: transform 200ms ease-out;
  }

  @media (prefers-reduced-motion: no-preference) {
    &[data-state='open'] {
      animation: update-toast-in 200ms ease-out;
    }
  }

  @keyframes update-toast-in {
    from {
      opacity: 0;
      transform: translateY(var(--space-100));
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Layout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-300);
  padding: var(--space-300);
`;

const HeaderRow = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-end;
  gap: var(--space-600);
`;

const IconAndContent = styled.div`
  display: flex;
  flex: 1 1 0%;
  min-width: 0;
  align-items: flex-start;
  gap: var(--space-300);
`;

const statusColor = {
  info: css`
    color: var(--color-info-info);
  `,
  success: css`
    color: var(--color-success-success);
  `,
  error: css`
    color: var(--color-error-error);
  `,
};

const StatusIcon = styled.div<{ $status: UpdateToastStatus }>`
  display: flex;
  flex: none;
  align-items: center;
  ${(props) => statusColor[props.$status]}

  svg {
    width: var(--space-500);
    height: var(--space-500);
  }
`;

const Copy = styled.div`
  display: flex;
  flex: 1 1 0%;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-075);
`;

const Title = styled(RadixToast.Title)`
  width: 100%;
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-subject);
  font-weight: var(--font-weight-medium);
  line-height: 1.35;
`;

const Description = styled(RadixToast.Description)`
  width: 100%;
  margin: 0;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  font-weight: var(--font-weight-regular);
  letter-spacing: 0.2px;
  line-height: 1.35;
`;

const Media = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-100);
`;

const Footer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: var(--space-300);
  /* Indent past the 24px icon + 16px gap so the actions align under the text
     column, matching Cake&'s complex footer and the Figma frames. */
  padding-left: var(--space-700);
`;

const Actions = styled.div`
  display: flex;
  flex: none;
  align-items: center;
  gap: var(--space-100);
`;

export type UpdateToastStatus = 'info' | 'success' | 'error';

type UpdateToastProps = {
  status: UpdateToastStatus;
  icon: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Full-width row between the header and the footer. */
  media?: ReactNode;
  actions: ReactNode;
  onDismiss: () => void;
  dismissLabel?: string;
  'data-node-id'?: string;
};

export function UpdateToast({
  status,
  icon,
  title,
  description,
  media,
  actions,
  onDismiss,
  dismissLabel = 'Dismiss notification',
  ...rest
}: UpdateToastProps) {
  return (
    <Surface
      open
      duration={Infinity}
      type={status === 'error' ? 'foreground' : 'background'}
      {...rest}
    >
      <Layout>
        <HeaderRow>
          <IconAndContent>
            <StatusIcon $status={status}>{icon}</StatusIcon>
            <Copy>
              <Title>{title}</Title>
              {description ? <Description>{description}</Description> : null}
            </Copy>
          </IconAndContent>
          <IconButton
            label={dismissLabel}
            icon={<X />}
            size="sm"
            intent="secondary"
            variant="ghost"
            onClick={onDismiss}
          />
        </HeaderRow>
        {media ? <Media>{media}</Media> : null}
        <Footer>
          <span aria-hidden="true" style={{ flex: 1 }} />
          <Actions>{actions}</Actions>
        </Footer>
      </Layout>
    </Surface>
  );
}
