/**
 * Origin and Referer validation utility to prevent unauthorized cross-origin
 * requests from third-party sites abusing internal API endpoints.
 */

export function isValidOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");

  // In standard browser API calls, origin is populated on POST requests
  if (!origin) {
    // Check referer as fallback
    const referer = req.headers.get("referer");
    if (!referer) {
      // In same-origin server actions or curl, might be omitted; permit only in local dev
      return process.env.NODE_ENV === "development";
    }
    try {
      const refererUrl = new URL(referer);
      return !host || refererUrl.host === host;
    } catch {
      return false;
    }
  }

  try {
    const originUrl = new URL(origin);
    // Allow localhost during development
    if (
      originUrl.hostname === "localhost" ||
      originUrl.hostname === "127.0.0.1" ||
      originUrl.hostname.endsWith(".localhost")
    ) {
      return true;
    }

    // Match against request host
    if (host && originUrl.host === host) {
      return true;
    }

    // Allow production NADSCA domains
    const allowedDomains = ["nadsca.dev", "www.nadsca.dev", "nadsca.com", "www.nadsca.com"];
    return allowedDomains.includes(originUrl.hostname);
  } catch {
    return false;
  }
}
