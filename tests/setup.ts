import "reflect-metadata";
import { vi } from "vitest";

vi.mock("@/database", () => ({
  pool: {
    query: vi.fn(() => Promise.resolve({ rows: [], rowCount: 0 })),
    connect: vi.fn(() =>
      Promise.resolve({
        query: vi.fn(() => Promise.resolve({ rows: [], rowCount: 0 })),
        release: vi.fn(),
      }),
    ),
    on: vi.fn(),
    end: vi.fn(),
  },
  query: vi.fn(() => Promise.resolve({ rows: [], rowCount: 0 })),
}));
