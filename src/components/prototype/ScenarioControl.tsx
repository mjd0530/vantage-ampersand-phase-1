import styled from 'styled-components';

import {
  scenarioOptions,
  type Scenario,
} from '../../data/vantageData.js';

const Panel = styled.aside`
  position: fixed;
  z-index: 20;
  right: var(--space-500);
  bottom: var(--space-500);
  display: grid;
  gap: var(--space-100);
  padding: var(--space-300);
  border: var(--stroke-100) solid var(--color-stroke-border-container-os);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-container-blur);
  box-shadow: var(--elevation-3);
  backdrop-filter: blur(45px);

  label {
    color: var(--color-text-icon-primary);
    font-size: var(--type-size-caption);
    font-weight: var(--font-weight-bold);
  }

  select {
    min-width: 10rem;
    padding: var(--space-100) var(--space-300);
    border: var(--stroke-100) solid var(--color-stroke-border);
    border-radius: var(--radius-150);
    background: var(--color-surfaces-container);
    color: var(--color-text-icon-primary);
    font: var(--font-weight-medium) var(--type-size-body) / 1.35 var(--font-family);
  }

  select:focus-visible {
    outline: var(--stroke-200) solid var(--color-primary-primary);
    outline-offset: var(--space-025);
  }
`;

type ScenarioControlProps = {
  value: Scenario;
  onChange: (value: Scenario) => void;
};

export function ScenarioControl({ value, onChange }: ScenarioControlProps) {
  return (
    <Panel aria-label="Prototype controls">
      <label htmlFor="prototype-scenario">Dashboard state</label>
      <select
        id="prototype-scenario"
        value={value}
        onChange={(event) => onChange(event.target.value as Scenario)}
      >
        {scenarioOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Panel>
  );
}
