import app from "@/app";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { config } from "@/config";

describe("Health Routes", () => {
  it("SHould return 401 if server is working", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
  });

  it("Should return 401 if AUTH_TOKEN is set and not provided", async () => {
    const response = await request(app).get("/channels");
    expect(response.statusCode).toBe(401);
  });

  it("Should return 200 if valid AUTH_TOKEN is provided", async () => {
    const response = await request(app)
      .get("/channels")
      .set("Authorization", `Bearer ${config.apiSecretKey}`);

    expect(response.statusCode).toBe(200);
  });
});
