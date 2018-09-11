interface OpenGraphData {
  title?: string,
  description?: string,
  image?: string,

  "og:site_name"?: string,
  "og:updated_time"?: string,
  "og:title"?: string,
  "og:type"?: string,
  "og:description"?: string,
  "og:image"?: string,
  "twitter:card"?: string,
  "twitter:creator"?: string,
  "twitter:title"?: string,
  "twitter:description"?: string,
  "twitter:image:src"?: string,
}

export function grabIt(url: string): Promise<OpenGraphData>;
