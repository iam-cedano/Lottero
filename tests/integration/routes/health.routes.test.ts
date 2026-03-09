import app from "@/app";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Health Routes", () => {
  it("Should return 200", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
  });
});
