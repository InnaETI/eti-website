# Our Work tile images

Each homepage “Our Work” card uses a file from this folder (see `OUR_WORK_TILES` in `app/page.tsx`).

## Filenames

| File | Tile |
|------|------|
| `clinical-workflow.png` | Clinical Workflow and Decision Support |
| `patient-outreach.png` | Patient Outreach and Supplemental Coverage |
| `surgical-cost.png` | Surgical Cost Management |
| `reimbursement-compliance.png` | Reimbursement and Compliance |
| `revenue-cycle-collections.png` | Revenue Cycle / Collections |
| `ai-policy.png` | AI Driven Medical Policy |

## Size & format

- **Aspect ratio:** **4:3** (matches the card layout).
- **Recommended:** **1200×900** or **1600×1200** for sharp displays; export as **WebP** (rename to `.webp` and update paths in `app/page.tsx`) or **JPEG/PNG**.
- Keep important content **center-weighted**; edges may crop on small screens.

## Placeholder

`placeholder.png` is the shared default. The named files are symlinks to it until you replace them with real art (swap the symlink for a real file, or delete the symlink and add a new file with the same name).
