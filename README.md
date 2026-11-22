# Pepe Intelligence — website source

A static HTML/CSS/JavaScript website based on the approved Pepe Intelligence ($PEI) mockup. No build process, framework, server, paid service or API is needed. All runtime assets and fonts are local.

## Run

Open `index.html` directly in a current browser, or upload the entire folder to any static website host. To try a local server with Python, from this folder run:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`. GitHub Pages users can upload this directory's contents to the root of their Pages branch.

## Set the contract address and community links

Edit `site-config.js` and replace `null` with your actual values, including quotation marks. For example:

```js
window.PEI_SITE_CONFIG = {
  contractAddress: 'YOUR_ETHEREUM_CONTRACT_ADDRESS',
  xUrl: 'https://x.com/your_account',
  telegramUrl: 'https://t.me/your_group'
};
```

These are examples only; replace them before publishing. The contract address must be a 40-hex-character Ethereum address. Only HTTPS X/Twitter and Telegram domains are accepted. If a value is absent or invalid, its control is disabled. Do not use contracts from other Pepe Intelligence projects. The address in the wide layout is shortened visually if needed and can be copied in full. Copy uses the browser Clipboard API with a fallback; browser permissions vary.

## Fidelity and mobile behavior

At wide widths, the site displays the unmarked approved mockup as a complete 1024 × 1536 reference artwork, scaling it proportionally; all section boundaries and embedded typography are therefore preserved as image pixels. Clickable links, navigation and copy are actual HTML elements on top. Configuring the address places live HTML over the address placeholder. CSS adds subtle glowing points and water ripples. The image is a flat image, so the underlying characters, labels, landscapes and other details cannot be edited or moved independently. Changing this requires rebuilding or replacing the underlying artwork.

At viewport widths of 700px and below, the layout changes to a readable mobile design built with real text, HTML controls and the supplied alternate hero and story artwork. The artwork and typography differ from the desktop mockup; no approved mobile mockup was provided. Screen-reader text is supplied for the desktop reference, and motion respects `prefers-reduced-motion`.

## Files

- `index.html`: layout and accessible controls.
- `style.css`: responsive styles, positioning, and motion.
- `site-config.js`: contract and links.
- `app.js`: link validation, copy action and feedback.
- `assets/`: mockup, illustrations, logo, fonts, and icons.
- `tests/interactions.test.js`: Node.js behavior checks; optional, no build needed.

For local source checks, install Node.js, then run `node tests/interactions.test.js` from this folder.

## Delivery checks and limits

The JavaScript was syntax-checked, and automated checks exercised missing/invalid/valid configuration, URL filtering, address display and copy invocation. The desktop background was verified byte-identical to the approved mockup. The local browser preview was unavailable because another preview occupied the environment, so desktop/mobile visual appearance and actual clipboard behavior were not browser-verified here. Animations are subtle overlays: water ripples and glowing points. The lily pads, plants, character and illustrated circuit lines embedded in the approved flat image do not move independently.
