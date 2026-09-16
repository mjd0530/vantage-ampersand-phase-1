# Vantage Ampersand — Check for updates

Interactive Windows 11 prototype of the **Check for updates** toast flow, implemented from Figma (`Vantage-Ampersand-redesign`).

## Screens (Figma)

| State | Node | Interaction |
| --- | --- | --- |
| Scanning for updates (50%) | `2389:28635` | Cancel stops the scan. View details opens the details card. Completes into Found or Failed. |
| (12) Updates found | `2725:28249` | View details, Scan again, Install. |
| Installing updates (50%) | `2754:29544` | Cancel returns to Found. Completes into Success. |
| (12) Updates successfully installed | `2754:29591` | View details (secondary + primary, as designed). |
| Update scan failed + More | `2754:29351` | More expands extra copy. Scan again retries. |
| Update scan failed + Less | `2754:29410` | Less collapses extra copy. |

## Run locally

Open `index.html` in a browser, or:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## How to exercise the flow

1. Click **Check for updates** to start scanning.
2. Use **View details** on any toast to open the details card.
3. From Found, click **Install** to run the install progress toast.
4. Enable **Simulate scan failure** and scan again to reach the failed More/Less states.

Visual tokens and icon assets are taken from Figma MCP (`tokens/figma-tokens.json`, `assets/icons/`). Rookery New is specified by the design; the prototype falls back to Segoe UI when that family is not installed.
