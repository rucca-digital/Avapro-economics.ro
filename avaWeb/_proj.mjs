import puppeteer from "puppeteer-core";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = "C:/Users/Vlad Nistor/Documents/Business folder Feast/Avapro-economics.ro/avaWeb";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const d = await browser.newPage();
await d.setViewport({ width: 1440, height: 900 });
await d.goto("http://localhost:5173/", { waitUntil: "networkidle0", timeout: 30000 });
await d.evaluate(() => document.getElementById("projects")?.scrollIntoView({ block: "start" }));
await sleep(1600);
await d.screenshot({ path: `${OUT}/_p_carousel.png` });
// list project names + link hrefs/targets in the carousel
const info = await d.evaluate(() => {
  const sec = document.getElementById("projects");
  const cards = [...sec.querySelectorAll("article")];
  return cards.map((c) => {
    const h = c.querySelector("h3")?.textContent;
    const a = c.querySelector("a");
    return { name: h, href: a?.getAttribute("href"), target: a?.getAttribute("target"), label: a?.textContent?.trim() };
  });
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
console.log("done");
