# StorageMovingModal — integration into NoTimeStorage

**Live site:** [notimestorage.co](https://notimestorage.co/)

A first-load popup that asks visitors whether they want **Storage** (stays on NoTimeStorage) or **Moving** (redirects to NoTimeMover).

## Install

1. Copy `StorageMovingModal.tsx` into the sibling project:

   ```
   notimestoragewebsite/components/StorageMovingModal.tsx
   ```

2. Render it on the homepage. The simplest place is `notimestoragewebsite/app/page.tsx`:

   ```tsx
   import StorageMovingModal from '@/components/StorageMovingModal'

   export default function HomePage() {
     return (
       <>
         {/* ...existing homepage content... */}
         <StorageMovingModal moverUrl="https://notimemover.com" />
       </>
     )
   }
   ```

   Or render it in the root `layout.tsx` if you want it on every page.

## Configuration

| Prop | Default | Notes |
|---|---|---|
| `moverUrl` | `'https://notimemover.com'` | Replace with the production URL of NoTimeMover once deployed. |
| `storageKey` | `'ntm_intent_seen_v1'` | sessionStorage key that suppresses re-showing in the same tab session. Change the suffix (`_v2`, `_v3`...) to re-prompt all visitors after a campaign change. |

## Dependencies

The component uses these (all already present in `notimestoragewebsite/package.json`):

- `react`
- `framer-motion`
- Tailwind CSS (any v3 or v4 with default class set)

No new dependencies needed.

## Behavior

- Shows ~350ms after page load (gives the page a chance to paint).
- Suppresses for the rest of the browser session after any choice or backdrop dismissal.
- Backdrop click and the `X` button both dismiss as "Storage" (stay).
- Modal is keyboard-accessible (`aria-modal`, focusable buttons). For full Escape-key support you can add a `useEffect` that listens for `Escape`.

## Styling notes

- Uses the family coffee-brown (`#2A1405` / `#4b2e1e`) for the Moving button so it visually ties back to NoTimeMover.
- Card is white-on-dark backdrop so it works against any current NoTimeStorage hero treatment.
- Edit the inline hex values directly if NoTimeStorage palette differs.
