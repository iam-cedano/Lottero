"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UrlParser {
    static extractDomain(url) {
        const formattedUrl = url.startsWith("http://") || url.startsWith("https://")
            ? url
            : `https://${url}`;
        return new URL(formattedUrl).hostname.replace(/^www\./, "");
    }
}
exports.default = UrlParser;
