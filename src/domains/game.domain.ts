export default class GameDomain {
  public static doesHaveValidName(name: string): boolean {
    return /^[a-z_]+$/.test(name);
  }
}
