import {
  Bell,
  CheckSquare2,
  Download,
  Search,
  ShoppingCart,
} from 'lucide-react';
import { Avatar, Button, IconButton } from '@cake-admin/cakeand';
import styled from 'styled-components';

const Header = styled.header`
  display: grid;
  gap: var(--space-300);
`;

const Commands = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 480px) auto;
  align-items: center;
  justify-content: end;
  gap: var(--space-1000);
  min-height: var(--space-700);
`;

const SearchField = styled.label`
  display: flex;
  height: var(--space-600);
  align-items: center;
  gap: var(--space-100);
  padding-inline: var(--space-200);
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-1000);
  background: var(--color-surfaces-container);
  color: var(--color-text-icon-placeholder);

  &:focus-within {
    outline: var(--stroke-200) solid var(--color-primary-primary);
    outline-offset: var(--space-025);
  }

  svg {
    width: var(--space-300);
    height: var(--space-300);
  }

  input {
    width: 100%;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--color-text-icon-primary);
    font: var(--font-weight-regular) var(--type-size-caption) / 1.35 var(--font-family);
  }

  input::placeholder {
    color: var(--color-text-icon-placeholder);
  }
`;

const Utilities = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-100);
`;

const NotificationAction = styled.span`
  position: relative;
  display: inline-flex;

  &::after {
    position: absolute;
    top: var(--space-075);
    right: var(--space-075);
    width: var(--space-075);
    height: var(--space-075);
    border-radius: var(--radius-1000);
    background: var(--color-error-error);
    content: '';
    pointer-events: none;
  }
`;

const PageRow = styled.div`
  display: flex;
  min-height: var(--space-700);
  align-items: center;
  justify-content: space-between;
`;

const PageTitle = styled.h1`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-page);
  font-weight: var(--font-weight-bold);
  line-height: 1.35;
`;

type CommandBarProps = {
  title: string;
  query: string;
  onQueryChange: (value: string) => void;
  onAction: (message: string) => void;
  onCheckUpdates: () => void;
  updating: boolean;
};

export function CommandBar({
  title,
  query,
  onQueryChange,
  onAction,
  onCheckUpdates,
  updating,
}: CommandBarProps) {
  return (
    <Header data-node-id="2076:14798">
      <Commands>
        <SearchField>
          <Search aria-hidden="true" />
          <input
            type="search"
            value={query}
            placeholder="Search..."
            aria-label="Search Vantage"
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </SearchField>
        <Utilities>
          <IconButton
            label="Search"
            icon={<Search />}
            size="sm"
            intent="secondary"
            variant="ghost"
            onClick={() => onAction('Search is ready')}
          />
          <NotificationAction>
            <IconButton
              label="Offers"
              icon={<CheckSquare2 />}
              size="sm"
              intent="secondary"
              variant="ghost"
              onClick={() => onAction('You have one new offer')}
            />
          </NotificationAction>
          <IconButton
            label="Cart"
            icon={<ShoppingCart />}
            size="sm"
            intent="secondary"
            variant="ghost"
            onClick={() => onAction('Your cart is empty')}
          />
          <NotificationAction>
            <IconButton
              label="Notifications"
              icon={<Bell />}
              size="sm"
              intent="secondary"
              variant="ghost"
              onClick={() => onAction('You have two notifications')}
            />
          </NotificationAction>
          <Avatar
            size="sm"
            initials="M"
            alt="Mike DeMar"
            aria-label="Open account menu"
            onClick={() => onAction('Account menu opened')}
          />
        </Utilities>
      </Commands>
      <PageRow>
        <PageTitle>{title}</PageTitle>
        {title === 'Home' ? (
          <Button
            size="sm"
            startIcon={<Download />}
            disabled={updating}
            onClick={onCheckUpdates}
          >
            {updating ? 'Checking...' : 'Check for updates'}
          </Button>
        ) : null}
      </PageRow>
    </Header>
  );
}
