/* Import @libsql/client early. Otherwise, it delays initial requests to our API.
   I suspect it's making a network request for some reason on first import. */
import("@libsql/client");

const nextConfig = {};

export default nextConfig;
