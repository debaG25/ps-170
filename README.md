# NEXORA PS170 — Burn-In Reliability Intelligence

Interactive React + Vite prototype.

## Run
Open this folder in VS Code, then in the terminal:

```bash
npm install
npm run dev
```

Open the localhost URL Vite prints.

## CSV format
`component_id,lot_id,0h,24h,96h,168h`

The app includes interactive navigation, lot DNA, hidden-defect detection, drift forecasting, component profiles, priority/action workflow, what-if simulation, model trust, AI Copilot, reports, settings, and CSV upload/export.


## Updated in this build
- Model A (Absolute Limit Guard) and Model B (Drift Forecast) are visually and logically separated.
- Repeated full component tables were reduced to a canonical Data/Inspection view; other pages use compact case cards.
- Drift Forecast now uses a real early-stage linear fit (0h/24h/96h) to project 168h and estimate time-to-limit, with measured vs forecast lines clearly separated.
- Fixed the Drift Forecast page crash caused by the previous `useState` misuse.
