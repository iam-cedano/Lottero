import app from "@/app";
import { config } from "@/config";
import request from "supertest";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/services/group.service", async () => {
  const actual = await vi.importActual<any>("@/services/group.service");
  return {
    default: class extends actual.default {
      async sendMessage() {
        return [{
          id: 1,
          group_id: 1,
          data: { casino: "onewin", game: "aviator", strategy: "simple_strategy" },
          created: "10-01-2026",
        }];
      }
    }
  };
});

describe("Group Routes", () => {
  it("should return 201 POST /message", async () => {
    const response = await request(app)
      .post("/message")
      .set("Authorization", `Bearer ${config.apiSecretKey}`)
      .send({
        channel: "onewin-aviator-simple_strategy",
        data: { command: "message", type: "bet", last_score: 4.19 },
      })
      .type("application/json");

    if (response.status !== 201) {
      console.log(response.body);
    }

    expect(response.status).toBe(201);
    expect(response.body).toEqual([{
      created: expect.any(String),
      data: expect.any(Object),
      group_id: expect.any(Number),
      id: expect.any(Number),
    }]);
  });
});
