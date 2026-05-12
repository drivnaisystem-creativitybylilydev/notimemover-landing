// Distance calculation between two locations.
// Phase 1: stubbed at 25 miles. Phase 2: wire Google Distance Matrix API.
//
// To upgrade:
//   1. Enable Distance Matrix API in Google Cloud Console and add a billing account
//   2. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local (server-side proxy recommended)
//   3. Create app/api/distance/route.ts that calls:
//        https://maps.googleapis.com/maps/api/distancematrix/json
//          ?origins=<from>&destinations=<to>&units=imperial&key=<key>
//   4. Replace the body of getMiles() with: const res = await fetch('/api/distance?...')
//      and parse rows[0].elements[0].distance.value / 1609.34

const STUB_MILES = 25

export async function getMiles(from: string, to: string): Promise<number> {
  if (!from || !to) return 0
  return STUB_MILES
}
