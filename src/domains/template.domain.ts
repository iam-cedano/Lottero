export default class TemplateDomain {
  /**
   * Check if the command is global based on the list.
   * @param command the command to check.
   * @returns true if the command is a global one.
   */
  public static isGlobalCommand(command: string) {
    return (
      command == "edit" ||
      command == "delete" ||
      command == "send" ||
      command == "message" ||
      command == "list" ||
      command == "new" ||
      command == "block"
    );
  }
}
