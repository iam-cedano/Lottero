import GroupDomain from "@/domains/group.domain";
import MessageEnum from "@/enums/message.enum";
import { MessageRequest } from "@/models/group.model";
import { describe, expect, it } from "vitest";

describe("GroupDomain.GetMessageType", () => {
  it("Should return BROADCAT when destination is only the casino", () => {
    const destination = "onewin";

    const messageType = GroupDomain.GetMessageType(destination);

    expect(messageType).toBe(MessageEnum.BROADCAST);
  });

  it("Should return GAME when destination is casino-game", () => {
    const destination = "onewin-hello";

    const messageType = GroupDomain.GetMessageType(destination);

    expect(messageType).toBe(MessageEnum.GAME);
  });

  it("Should return STRATEGY when destination is casino-game-strategy", () => {
    const destination = "onewin-hello-world";

    const messageType = GroupDomain.GetMessageType(destination);

    expect(messageType).toBe(MessageEnum.STRATEGY);
  });

  it("Should return undefined when casino is undefined", () => {
    const destination = "-hello-world";

    const result = GroupDomain.GetMessageType(destination);

    expect(result).toBeUndefined();
  });
});

describe("GroupDomain.IsMessageValid", () => {
  it("Should return true when channel is casino-game-strategy", () => {
    const request = {
      channel: "onewin-hello-world",
      data: {
        command: "hello",
      },
    };

    const isValid = GroupDomain.IsMessageValid(request);

    expect(isValid).toBe(true);
  });

  it("Should return true when channel is casino-game", () => {
    const request = {
      channel: "onewin-hello",
      data: {
        command: "hello",
      },
    };

    const isValid = GroupDomain.IsMessageValid(request);

    expect(isValid).toBe(true);
  });

  it("Should return true when channel is casino", () => {
    const request = {
      channel: "onewin",
      data: {
        command: "hello",
      },
    };

    const isValid = GroupDomain.IsMessageValid(request);

    expect(isValid).toBe(true);
  });

  it("Should return false when channel is undefined", () => {
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

  it("Should return false when data is undefined", () => {
    const request = {
      channel: "onewin",
      data: undefined,
    };

    const isValid = GroupDomain.IsMessageValid(
      request as unknown as MessageRequest,
    );

    expect(isValid).toBe(false);
  });

  it("Should return false when data is empty", () => {
    const request = {
      channel: "onewin",
      data: {},
    };

    const isValid = GroupDomain.IsMessageValid(
      request as unknown as MessageRequest,
    );

    expect(isValid).toBe(false);
  });

  it("Should return false when channel starts with a dash", () => {
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

  it("Should return false when data command is undefined", () => {
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

  it("Should return false when data command is empty", () => {
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
