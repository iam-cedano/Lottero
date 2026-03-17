import GroupDomain from "@/domains/group.domain";
import { MessageRequest } from "@/models/group.model";
import { describe, expect, it } from "vitest";

describe("GroupDomain.IsMessageValid", () => {
  it("should return true when channel is casino-game-strategy", () => {
    const request = {
      channel: "onewin-hello-world",
      data: {
        command: "hello",
      },
    };

    const isValid = GroupDomain.IsMessageValid(request);

    expect(isValid).toBe(true);
  });

  it("should return true when channel is casino-game", () => {
    const request = {
      channel: "onewin-hello",
      data: {
        command: "hello",
      },
    };

    const isValid = GroupDomain.IsMessageValid(request);

    expect(isValid).toBe(true);
  });

  it("should return true when channel is casino", () => {
    const request = {
      channel: "onewin",
      data: {
        command: "hello",
      },
    };

    const isValid = GroupDomain.IsMessageValid(request);

    expect(isValid).toBe(true);
  });

  it("should return false when channel is undefined", () => {
    const request = {
      channel: undefined,
      data: {
        command: "hello",
      },
    };

    const isValid = GroupDomain.IsMessageValid(
      request as unknown as MessageRequest,
    );

    expect(isValid).toBe(false);
  });

  it("should return false when data is undefined", () => {
    const request = {
      channel: "onewin",
      data: undefined,
    };

    const isValid = GroupDomain.IsMessageValid(
      request as unknown as MessageRequest,
    );

    expect(isValid).toBe(false);
  });

  it("should return false when data is empty", () => {
    const request = {
      channel: "onewin",
      data: {},
    };

    const isValid = GroupDomain.IsMessageValid(
      request as unknown as MessageRequest,
    );

    expect(isValid).toBe(false);
  });

  it("should return false when channel starts with a dash", () => {
    const request = {
      channel: "-onewin",
      data: {
        command: "hello",
      },
    };

    const isValid = GroupDomain.IsMessageValid(
      request as unknown as MessageRequest,
    );

    expect(isValid).toBe(false);
  });

  it("should return false when data command is undefined", () => {
    const request = {
      channel: "onewin",
      data: {
        command: undefined,
      },
    };

    const isValid = GroupDomain.IsMessageValid(
      request as unknown as MessageRequest,
    );

    expect(isValid).toBe(false);
  });

  it("should return false when data command is empty", () => {
    const request = {
      channel: "onewin",
      data: {
        command: "",
      },
    };

    const isValid = GroupDomain.IsMessageValid(
      request as unknown as MessageRequest,
    );

    expect(isValid).toBe(false);
  });
});
