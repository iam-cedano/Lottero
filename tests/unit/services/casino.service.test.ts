import { Casino } from "@/entities/casino.entity";
import CasinoRepository from "@/repositories/casino.repository";
import CasinoService from "@/services/casino.service";
import { describe, expect, it, vi, beforeEach } from "vitest";

describe("CasinoService", () => {
  const casinoRepositoryMock = {} as unknown as CasinoRepository;
  let casinoService: CasinoService;

  beforeEach(() => {
    casinoRepositoryMock.findAll = vi.fn();
    casinoRepositoryMock.findByName = vi.fn();
    casinoRepositoryMock.findById = vi.fn();
    casinoRepositoryMock.create = vi.fn();
    casinoRepositoryMock.update = vi.fn();
    casinoRepositoryMock.delete = vi.fn();

    casinoService = new CasinoService(casinoRepositoryMock);
  });

  describe("getCasinos", () => {
    it("Should get all casinos", async () => {
      const expected: Casino[] = [
        {
          id: 1,
          name: "Onewin",
          alias: "onewin",
          url: "https://onewin.com",
          status: true,
        },
        {
          id: 2,
          name: "Deuces",
          alias: "deuces",
          url: "https://deuces.com",
          status: true,
        },
      ];

      vi.spyOn(casinoRepositoryMock, "findAll").mockResolvedValue(expected);

      const casinos = await casinoService.getCasinos();

      expect(casinoRepositoryMock.findAll).toHaveBeenCalled();
      expect(casinos).toEqual(expected);
    });
  });

  describe("getCasinoById", () => {
    it("Should get a casino by id", async () => {
      const expected: Casino = {
        id: 1,
        name: "fake",
        alias: "Faker",
        url: "https://faker.com",
        status: true,
      };

      vi.spyOn(casinoRepositoryMock, "findById").mockResolvedValue(expected);

      const casino = await casinoService.getCasinoById(1);

      expect(casinoRepositoryMock.findById).toHaveBeenCalled();
      expect(casino).toEqual(expected);
    });
  });

  describe("createCasino", () => {
    it("Should create a casino", async () => {
      const casino: Casino = {
        id: 1,
        name: "fake",
        alias: "Faker",
        url: "https://faker.com",
        status: true,
      };

      vi.spyOn(casinoRepositoryMock, "create").mockResolvedValue(casino);

      const createdCasino = await casinoService.createCasino(casino);

      expect(casinoRepositoryMock.create).toHaveBeenCalled();
      expect(createdCasino).toEqual(casino);
    });

    it("Should throw an error when the name is already registered", async () => {
      const name = "fake";

      const firstCasino: Casino = {
        id: 1,
        name: name,
        alias: "Faker",
        url: "https://faker.com",
        status: true,
      };

      const secondCasino: Casino = {
        id: 2,
        name: name,
        alias: "Faker 2",
        url: "https://faker2.com",
        status: true,
      };

      vi.spyOn(casinoRepositoryMock, "findByName").mockResolvedValue(
        firstCasino,
      );

      await expect(casinoService.createCasino(secondCasino)).rejects.toThrow(
        "Casino name already registered",
      );

      expect(casinoRepositoryMock.findByName).toHaveBeenCalled();
    });

    it("Should throw an error when the name is invalid", async () => {
      const casino: Casino = {
        id: 1,
        name: "FAKE",
        alias: "fake",
        url: "https://faker.com",
        status: true,
      };

      await expect(casinoService.createCasino(casino)).rejects.toThrow(
        "Name cannot contain numbers, capitalized and special characters (except for underscores)",
      );
    });
  });

  describe("updateCasino", () => {
    it("Should update a casino", async () => {
      const casino: Casino = {
        id: 1,
        name: "faker",
        alias: "Faker",
        url: "https://faker.com",
        status: true,
      };

      vi.spyOn(casinoRepositoryMock, "findById").mockResolvedValue(casino);
      vi.spyOn(casinoRepositoryMock, "update").mockResolvedValue(casino);

      const updatedCasino = await casinoService.updateCasino(1, casino);

      expect(casinoRepositoryMock.update).toHaveBeenCalled();
      expect(updatedCasino).toEqual(casino);
    });

    it("Should throw an error if the casino is not found", async () => {
      const casino: Casino = {
        id: 1,
        name: "fake",
        alias: "Faker",
        url: "https://faker.com",
        status: true,
      };

      vi.spyOn(casinoRepositoryMock, "findById").mockResolvedValue(null);

      await expect(casinoService.updateCasino(1, casino)).rejects.toThrow(
        "Casino not found",
      );
    });

    it("Should throw an error if the name is invalid", async () => {
      const casino: Casino = {
        id: 1,
        name: "FAKE",
        alias: "Faker",
        url: "https://faker.com",
        status: true,
      };

      vi.spyOn(casinoRepositoryMock, "findById").mockResolvedValue(casino);

      await expect(casinoService.updateCasino(1, casino)).rejects.toThrow(
        "Name cannot contain numbers, capitalized and special characters (except for underscores)",
      );
    });
  });

  describe("deleteCasino", () => {
    it("Should delete a casino", async () => {
      const casino: Casino = {
        id: 1,
        name: "fake",
        alias: "Faker",
        url: "https://faker.com",
        status: true,
      };

      vi.spyOn(casinoRepositoryMock, "findById").mockResolvedValue(casino);
      vi.spyOn(casinoRepositoryMock, "delete").mockResolvedValue(true);

      const deletedCasino = await casinoService.deleteCasino(1);

      expect(casinoRepositoryMock.delete).toHaveBeenCalled();
      expect(deletedCasino).toEqual(true);
    });

    it("Should throw an error if the casino is not found", async () => {
      vi.spyOn(casinoRepositoryMock, "findById").mockResolvedValue(null);

      await expect(casinoService.deleteCasino(1)).rejects.toThrow(
        "Casino not found",
      );
    });
  });
});
