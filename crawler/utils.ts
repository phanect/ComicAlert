import { DOMWindow, JSDOM } from "jsdom";

export async function getDOMWindow(url: string): Promise<DOMWindow> {
  try {
    const res = await fetch(url);

    if (res.status !== 200) {
      throw new Error("Return status code " + res.status);
    }

    return new JSDOM(await res.text()).window;
  } catch (err) {
    console.error(err);
  }
}
