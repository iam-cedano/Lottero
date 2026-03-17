import { PartiesIndex } from "@/entities/party.entity";
import { container } from "tsyringe";
import GroupService from "@/services/group.service";

export default class Party {
  private constructor(private readonly index: PartiesIndex) {}

  public static async build(): Promise<Party> {
    const groupService = container.resolve(GroupService);
    const index = await groupService.getParties();
    return new Party(index);
  }

  public all(): PartiesIndex {
    return this.index;
  }
}
