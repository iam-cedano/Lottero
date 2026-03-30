export default class Spelling {
  public static capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  public static replaceAll(text: string, correctionMap: Record<string, string>): string {
    const pattern = new RegExp(
      Object.keys(correctionMap)
        .map(key => `\\{${key.replace(/[-\\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\}`)
        .join('|'),
      'g'
    );

    return text.replace(pattern, (matched) => correctionMap[matched.slice(1, -1)]);
  }
}
