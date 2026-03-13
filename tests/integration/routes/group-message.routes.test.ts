import app from "@/app";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Group Message Routes", () => {
  it("Should return 200 GET /groupMessages", async () => {
    const response = await request(app).get("/groupMessages");
    expect(response.status).toBe(200);
  });
});
