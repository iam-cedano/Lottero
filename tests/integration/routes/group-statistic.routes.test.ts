import app from "@/app";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Group Statistic Routes", () => {
  it("Should return 200 GET /group-statistics", async () => {
    const response = await request(app).get("/group-statistics");
    expect(response.status).toBe(200);
  });
});
