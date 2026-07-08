export interface ChecklistItem {
  task: string
  detail?: string
}

export interface ChecklistPhase {
  phase: string
  items: ChecklistItem[]
}

export const checklistTitle = 'The Homeowner\'s Moving Checklist'
export const checklistSubtitle =
  'Everything to handle before, during, and after your move — built for homeowners, not just renters. Free, no email required to read it here.'

export const checklistPhases: ChecklistPhase[] = [
  {
    phase: '8 Weeks Before',
    items: [
      { task: 'Set a real moving budget and get it locked in', detail: 'Decide what you can spend before you start calling movers — it changes every conversation that follows.' },
      { task: 'Sort belongings room by room', detail: 'Decide what to sell, donate, or toss before you pack it, not after you have already carried it once.' },
      { task: 'Start a moving binder', detail: 'One folder for closing documents, moving contracts, receipts, and utility confirmations.' },
      { task: 'Research schools and commute times in the new area', detail: 'If you have kids or a return-to-office schedule, this takes longer than people expect.' },
    ],
  },
  {
    phase: '6 Weeks Before',
    items: [
      { task: 'Notify your homeowner\'s insurance provider', detail: 'Confirm your move date and make sure coverage starts at the new address with no gap.' },
      { task: 'Get moving quotes with a budget in hand', detail: 'Ask for a number that covers what you actually need, not an hourly rate that can climb on move day.' },
      { task: 'Order packing supplies', detail: 'Boxes, tape, bubble wrap, and furniture blankets — buy more than you think you need.' },
      { task: 'Start using up food in the freezer and pantry', detail: 'Less to pack, less to toss, less that can spoil in transit.' },
    ],
  },
  {
    phase: '4 Weeks Before',
    items: [
      { task: 'File a change of address with USPS', detail: 'Takes five minutes online and starts forwarding mail before you forget who needs your new address.' },
      { task: 'Schedule utility transfers or cutoffs', detail: 'Electric, gas, water, and internet — at both the old home and the new one, timed so neither has a gap.' },
      { task: 'Update your address with banks, cards, and subscriptions', detail: 'Also notify your employer and any professional licensing boards.' },
      { task: 'Register with new schools', detail: 'If applicable — many districts need enrollment paperwork weeks ahead.' },
      { task: 'Confirm any home-sale or closing dates', detail: 'Line up your moving date with your actual closing date, not an estimate.' },
    ],
  },
  {
    phase: '2 Weeks Before',
    items: [
      { task: 'Confirm your movers\' date, time, and details', detail: 'Reconfirm the budget you agreed to — it should not change on you now.' },
      { task: 'Start packing non-essential rooms', detail: 'Guest rooms, storage, garage — anything you will not touch before move day.' },
      { task: 'Label every box by room, not just contents', detail: 'Saves real time on the other end, especially with a multi-floor home.' },
      { task: 'Arrange a moving truck parking permit if required', detail: 'Boston and other cities require this — apply at least 10–14 business days ahead.' },
      { task: 'Confirm a certificate of insurance if your building or HOA needs one', detail: 'Ask your movers for this early — it can take a few days to issue.' },
    ],
  },
  {
    phase: '1 Week Before',
    items: [
      { task: 'Pack a first-night box', detail: 'Toiletries, chargers, medications, a change of clothes — anything you need before boxes get unpacked.' },
      { task: 'Confirm your final walkthrough or closing date', detail: 'If you are buying or selling, get this locked in writing.' },
      { task: 'Empty, defrost, and clean the refrigerator', detail: 'Do this a day or two ahead so it has time to dry out before moving.' },
      { task: 'Reconfirm headcount and logistics with your moving crew', detail: 'Any building rules — elevator windows, loading docks — should be settled by now.' },
    ],
  },
  {
    phase: 'Moving Day',
    items: [
      { task: 'Do a final walkthrough of every room, closet, and drawer', detail: 'Check behind doors and above cabinets — the easiest things to forget.' },
      { task: 'Take meter readings for the old home', detail: 'Electric and gas readings protect you from a final bill dispute.' },
      { task: 'Hand over keys and garage openers only after the final walkthrough', detail: 'Not before — once they are gone, you cannot go back in.' },
      { task: 'Keep essential documents with you, not on the truck', detail: 'Deed, lease, ID, and your moving contract should travel in your own bag.' },
    ],
  },
  {
    phase: 'After the Move',
    items: [
      { task: 'Update your driver\'s license and vehicle registration', detail: 'Most states give you 30 days — do not let it slide.' },
      { task: 'Register to vote at your new address', detail: 'Takes a few minutes and is easy to forget once you are settled.' },
      { task: 'Locate the water shutoff and breaker panel', detail: 'Know where they are before you need them in an emergency.' },
      { task: 'Change the locks if you just bought the home', detail: 'You do not know who else has a key from before.' },
      { task: 'Leave your movers a review if they earned it', detail: 'It genuinely helps a small crew more than people realize.' },
    ],
  },
]

export const checklistTotalItems = checklistPhases.reduce((sum, p) => sum + p.items.length, 0)
