/**
 * TarkStudio Portal - Dynamic Data Catalog
 * Schema:
 * {
 *   id: string,
 *   title: string,
 *   version: string,
 *   mode: "offline" | "online" | "hybrid",
 *   type: "apk" | "website",
 *   status: "active" | "locked",
 *   category: string,
 *   description: string,
 *   webUrl: string | null,
 *   apkUrl: string | null,
 *   badge: string,
 *   size?: string
 * }
 */

export const PROJECTS_DATA = [
  {
    id: "storeready",
    title: "StoreReady Asset Suite",
    version: "v1.0.0",
    mode: "offline",
    type: "website",
    status: "active",
    category: "Developer Utility",
    description: "Client-side Play Store & Indus Appstore asset, screenshot, and policy suite.",
    webUrl: "tools/storeready/index.html",
    apkUrl: null,
    badge: "100% Client-Side",
    size: "Static WebApp"
  },
  {
    id: "flashdrop",
    title: "FlashDrop",
    version: "v1.4.2",
    mode: "offline",
    type: "apk",
    status: "active",
    category: "Networking & P2P",
    description: "High-speed local HTTP Wi-Fi file sharing and synchronized audio broadcast utility.",
    webUrl: null,
    apkUrl: "downloads/flashdrop-release.apk",
    badge: "Air-Gapped P2P",
    size: "14.8 MB"
  },
  {
    id: "chota-hathi",
    title: "Chota Hathi 3D",
    version: "v1.1.0",
    mode: "offline",
    type: "apk",
    status: "active",
    category: "Simulation Game",
    description: "3D mini-truck physics simulator featuring custom suspension and cargo mechanics.",
    webUrl: null,
    apkUrl: "downloads/chotahathi-release.apk",
    badge: "Offline 3D",
    size: "46.2 MB"
  },
  {
    id: "mental-math-academy",
    title: "Mental Math Academy",
    version: "v2.0.1",
    mode: "offline",
    type: "apk",
    status: "active",
    category: "Cognitive Training",
    description: "Fast-paced mental calculation challenges and memory speed training engine.",
    webUrl: null,
    apkUrl: "downloads/mental-math-release.apk",
    badge: "Zero-Latency",
    size: "12.4 MB"
  },
  {
    id: "bagh-chal",
    title: "Bagh-Chal: Tigers & Goats",
    version: "v1.0.0",
    mode: "offline",
    type: "website",
    status: "active",
    category: "Strategy Board Game",
    description: "Traditional Himalayan asymmetric tactical board game with pass-and-play and solo modes.",
    webUrl: "games/bagh-chal/index.html",
    apkUrl: "downloads/baghchal-release.apk",
    badge: "Dual Platform",
    size: "21.6 MB APK / Web"
  },
  {
    id: "apex-monitor",
    title: "Apex Cloud Console",
    version: "v2.8.0",
    mode: "online",
    type: "website",
    status: "active",
    category: "Cloud Telemetry",
    description: "Real-time edge telemetry dashboard with live WebSocket stream monitoring.",
    webUrl: "https://apex.tarkstudio.dev",
    apkUrl: null,
    badge: "Live Telemetry",
    size: "Cloud Service"
  },
  {
    id: "omni-relay-client",
    title: "OmniRelay Client",
    version: "v1.3.0",
    mode: "online",
    type: "apk",
    status: "active",
    category: "Remote Access",
    description: "Secure gateway client for end-to-end encrypted relay connections and tunnel forwarding.",
    webUrl: null,
    apkUrl: "downloads/omnirelay-release.apk",
    badge: "Online Relay",
    size: "19.3 MB"
  },
  {
    id: "tark-vault-sync",
    title: "Tark Vault Pro",
    version: "v3.0.0-rc",
    mode: "online",
    type: "apk",
    status: "locked",
    category: "Security",
    description: "Encrypted multi-device sync vault with zero-knowledge cloud backups.",
    webUrl: null,
    apkUrl: "downloads/tarkvault-v3.apk",
    badge: "Private Beta",
    size: "24.0 MB"
  }
];

// Universal browser & module export
if (typeof window !== "undefined") {
  window.PROJECTS_DATA = PROJECTS_DATA;
}

export default PROJECTS_DATA;
