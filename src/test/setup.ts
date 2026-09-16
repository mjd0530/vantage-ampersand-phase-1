import '@testing-library/jest-dom/vitest';
import 'vitest-axe/extend-expect';

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

class ResizeObserverMock {
  observe() {}

  unobserve() {}

  disconnect() {}
}

window.ResizeObserver = ResizeObserverMock;
