# General Event Manager — Production Team

> Eastside Church | Visual Arts & Media Department

A focused event coordination tool for the production team. Built to cut through the noise of Planning Center and give the team one clear view of every event that needs AV, lighting, projection, or stage support.

## What it does

- **Dashboard** — filtered view of upcoming production events, color-coded by type
- **Event detail** — per-event checklists for AV, Lighting, Stage, and Team assignments
- **Readiness tracking** — visual progress ring per event
- **Open role alerts** — see unfilled positions at a glance
- **Add events** — quick-add modal for last-minute additions

## Event types supported

| Type | Color |
|---|---|
| Sunday Service | Blue |
| Special Service | Amber |
| Wedding / Funeral | Purple |
| ECS Chapel | Green |
| ECS Performance | Orange |

## Tech

Static HTML/CSS/JS — no framework, no build step. Drop it anywhere.

- State persisted in `localStorage` per event
- Planning Center API sync: planned for v2 via n8n webhook
- Auth: planned for v2 via Clerk

## Run locally

Just open `index.html` in a browser. No server needed.

## Roadmap

- [ ] Planning Center API sync (n8n webhook → auto-create event)
- [ ] Team login via Clerk
- [ ] Role assignment from in-app team roster
- [ ] Notification system (email → Slack)
- [ ] Event history / debrief log
- [ ] Template system per event type
