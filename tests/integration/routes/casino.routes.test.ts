import app from "@/app";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Casino Routes", () => {
  it("Should return 200 GET /casinos", async () => {
    const response = await request(app).get("/casinos");
    expect(response.status).toBe(200);
  });
});
