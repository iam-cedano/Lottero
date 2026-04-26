import spellingUtil from "@/utils/spelling.util";
import { describe, expect, it } from "vitest";

describe("SpellingUtil.CapitalizeFirstLetter", () => {
  it("should capitalize the first letter of a string", () => {
    expect(spellingUtil.capitalizeFirstLetter("hello")).toBe("Hello");
  });

  it("should return the string replaced", () => {
    const correctionMap = {
      "name": "John",
      "age": "30"
    };

    expect(spellingUtil.replaceAll("My name is {name} and I am {age} years old.", correctionMap)).toBe("My name is John and I am 30 years old.");
  })
});
