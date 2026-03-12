import app from "@/app";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Group Routes", () => {
  it("Should return 200 POST /message", async () => {
    const response = await request(app)
      .post("/message")
      .send({
        channel: "onewin-aviator-simple_strategy",
        data: { command: "message", type: "bet", last_score: 4.19 },
      })
      .type("application/json");

    expect(response.body).toEqual({
      message: "Message sent successfully",
    });
  });
});
