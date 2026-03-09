export default class UrlParser {
  public static extractDomain(url: string): string {
    const formattedUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;

    return new URL(formattedUrl).hostname.replace(/^www\./, "");
  }
}
