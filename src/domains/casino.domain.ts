export default class CasinoDomain {
  public static doesHaveValidName(name: string): boolean {
    return /^[a-z_]+$/.test(name);
  }
}
