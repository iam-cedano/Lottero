/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import CasinoService from "@/services/casino.service";
import CasinoRepository from "@/repositories/casino.repository";
import { Casino } from "@/entities/casino.entity";

describe("CasinoService", () => {
  let casinoService: CasinoService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let casinoRepositoryMock: any;

  beforeEach(() => {
    casinoRepositoryMock = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    casinoService = new CasinoService(casinoRepositoryMock as CasinoRepository);
  });

  it("should create a casino", async () => {
    const casinoData: Partial<Casino> = { name: "Test Casino" };
    const expectedCasino: Casino = { id: 1, name: "Test Casino" } as Casino;
    casinoRepositoryMock.create.mockResolvedValue(expectedCasino);

    const result = await casinoService.createCasino(casinoData);

    expect(casinoRepositoryMock.create).toHaveBeenCalledWith(casinoData);
    expect(result).toEqual(expectedCasino);
  });

  it("should get all casinos", async () => {
    const expectedCasinos: Casino[] = [{ id: 1, name: "Test Casino" } as Casino];
    casinoRepositoryMock.findAll.mockResolvedValue(expectedCasinos);

    const result = await casinoService.getCasinos();

    expect(casinoRepositoryMock.findAll).toHaveBeenCalled();
    expect(result).toEqual(expectedCasinos);
  });

  it("should get casino by id", async () => {
    const casinoId = 1;
    const expectedCasino: Casino = { id: 1, name: "Test Casino" } as Casino;
    casinoRepositoryMock.findById.mockResolvedValue(expectedCasino);

    const result = await casinoService.getCasinoById(casinoId);

    expect(casinoRepositoryMock.findById).toHaveBeenCalledWith(casinoId);
    expect(result).toEqual(expectedCasino);
  });

  it("should return null if casino by id is not found", async () => {
    const casinoId = 1;
    casinoRepositoryMock.findById.mockResolvedValue(null);

    const result = await casinoService.getCasinoById(casinoId);

    expect(casinoRepositoryMock.findById).toHaveBeenCalledWith(casinoId);
    expect(result).toBeNull();
  });

  it("should update a casino", async () => {
    const casinoId = 1;
    const updateData: Partial<Casino> = { name: "Updated Casino" };
    const expectedCasino: Casino = { id: 1, name: "Updated Casino" } as Casino;
    casinoRepositoryMock.update.mockResolvedValue(expectedCasino);

    await casinoService.updateCasino(casinoId, updateData);

    expect(casinoRepositoryMock.update).toHaveBeenCalledWith(casinoId, updateData);
  });

  it("should delete a casino", async () => {
    const casinoId = 1;
    casinoRepositoryMock.delete.mockResolvedValue(true);

    const result = await casinoService.deleteCasino(casinoId);

    expect(casinoRepositoryMock.delete).toHaveBeenCalledWith(casinoId);
    expect(result).toBe(true);
  });
});
