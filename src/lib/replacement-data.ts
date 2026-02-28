// Programmatic SEO: LED replacement guide pages
// Targets high-volume "X watt [fixture type] LED replacement" searches

export interface ReplacementGuide {
  slug: string
  oldFixture: string
  oldWattage: string
  oldType: string // HID, HPS, MH, Fluorescent, Halogen
  ledReplacement: string
  ledWattage: string
  ledProduct: string // product page slug
  ledProductName: string
  savings: string // percentage
  annualSavings: string // dollar amount per fixture
  lumens: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  content: string
}

export const replacementGuides: ReplacementGuide[] = [
  // === HIGH BAY REPLACEMENTS ===
  {
    slug: '400w-metal-halide-led-replacement',
    oldFixture: '400W Metal Halide High Bay',
    oldWattage: '400W',
    oldType: 'Metal Halide',
    ledReplacement: '150W LED UFO High Bay',
    ledWattage: '150W',
    ledProduct: 'ufo-high-bay-light-hba-series',
    ledProductName: 'UFO High Bay HBA Series',
    savings: '63%',
    annualSavings: '$95',
    lumens: '22,500',
    metaTitle: '400W Metal Halide LED Replacement | 150W UFO High Bay | Auvolar',
    metaDescription: 'Replace 400W metal halide with 150W LED UFO high bay. 63% energy savings, instant on, 100,000hr life. DLC certified for utility rebates. Ships same day.',
    keywords: ['400W metal halide LED replacement', '400W MH LED equivalent', '400W HID to LED', 'replace 400 watt metal halide'],
    content: `The 400W metal halide high bay is the most common industrial fixture in American warehouses — and the most cost-effective to replace with LED.

## Why Replace 400W Metal Halide?

| Factor | 400W Metal Halide | 150W LED (Auvolar HBA) |
|---|---|---|
| **Power consumption** | 458W (incl. ballast) | 150W |
| **Light output** | 32,000 lm (initial) → 20,000 lm (after 2yr) | 22,500 lm (constant) |
| **Warm-up time** | 5-15 minutes | Instant on |
| **Re-strike delay** | 10-15 minutes | None |
| **Color rendering (CRI)** | 65-70 | 80+ |
| **Lifespan** | 15,000-20,000 hrs | 100,000 hrs |
| **Maintenance** | Re-lamp every 2-3 years ($30 bulb + $80 labor) | Zero for 15+ years |
| **Annual energy cost*** | $240 | $79 |
| **DLC certified** | N/A | ✅ ($30-$75 rebate) |

*Based on 12hr/day, 260 days/year, $0.12/kWh

## Recommended LED Replacement

**[Auvolar UFO High Bay 150W (HBA Series)](/p/ufo-high-bay-light-hba-series)** — The #1 replacement for 400W metal halide:
- 22,500 lumens (more usable light than degraded MH)
- 5000K daylight white (CCT selectable models available)
- IP65 rated, suitable for dusty/damp environments
- 0-10V dimming standard
- Hook mount, chain mount included — fits existing mounting points
- 5-year warranty

## Installation: 3 Steps

1. **Turn off power** and remove old metal halide fixture + ballast
2. **Mount LED high bay** using existing hook/chain point (same mounting pattern)
3. **Wire directly** to line voltage (no ballast needed) — connect L/N/G

**Time per fixture**: 15-20 minutes for a licensed electrician.

## ROI Calculation

**100-fixture warehouse (400W MH → 150W LED):**
- Annual energy savings: 100 × $161 = **$16,100/year**
- Fixture cost: 100 × $85 = $8,500
- Utility rebate: 100 × $40 = -$4,000
- Net cost: **$4,500**
- **Payback: 3.4 months**

## FAQ

**Q: Will 150W LED be bright enough to replace 400W MH?**
A: Yes. Metal halide loses 30-50% of its lumens within 2 years. A new 150W LED at 22,500 lumens actually delivers MORE usable light than a 2-year-old 400W MH.

**Q: Can I use the same wiring?**
A: Yes. The LED driver accepts the same 120-277V input. You simply bypass (remove) the old ballast and wire directly.

**Q: What about the mounting?**
A: Our UFO high bay includes a hook mount that fits standard ceiling hooks, J-boxes, and chain/pendant mounts used by metal halide fixtures.`,
  },
  {
    slug: '1000w-metal-halide-led-replacement',
    oldFixture: '1000W Metal Halide High Bay/Flood',
    oldWattage: '1000W',
    oldType: 'Metal Halide',
    ledReplacement: '300-400W LED',
    ledWattage: '300-400W',
    ledProduct: '300w-420w-aera-lighting-shoebox-ot-series-l',
    ledProductName: 'OT Series Area Light 300-420W',
    savings: '60-70%',
    annualSavings: '$250',
    lumens: '45,000-63,000',
    metaTitle: '1000W Metal Halide LED Replacement | 300-400W LED | Auvolar',
    metaDescription: 'Replace 1000W metal halide with 300-400W LED. 60-70% energy savings, instant on, zero maintenance. DLC certified. Free shipping over $2,000.',
    keywords: ['1000W metal halide LED replacement', '1000W MH LED equivalent', '1000W HID to LED', 'replace 1000 watt metal halide'],
    content: `The 1000W metal halide is used in large warehouses, sports facilities, and parking lots. Replacing with LED cuts energy by 60-70%.

## Comparison

| Factor | 1000W Metal Halide | 400W LED (Auvolar OT-L) |
|---|---|---|
| **Power** | 1,080W (incl. ballast) | 420W |
| **Lumens** | 110,000 lm (initial) | 63,000 lm |
| **Effective lumens** | ~60,000 lm (after lumen depreciation + poor optics) | 63,000 lm (directional) |
| **Warm-up** | 15-20 minutes | Instant |
| **Lifespan** | 10,000-15,000 hrs | 100,000 hrs |
| **Annual energy cost*** | $567 | $220 |

*Based on 12hr/day, 260 days/year, $0.12/kWh

## Why Less LED Wattage = Same or Better Light

Metal halide fixtures waste light in all directions — much of it goes upward into the ceiling, requiring reflectors that absorb 30-40% of output. LED fixtures direct 100% of light downward. So 63,000 LED lumens on target = 110,000 MH lumens scattered.

## Recommended Replacements

- **Warehouse/Industrial**: [UFO High Bay 240W](/p/ufo-high-bay-light-hba-series) — for 30-40ft ceilings
- **Parking lot/Area**: [OT Series 420W](/p/300w-420w-aera-lighting-shoebox-ot-series-l) — replaces pole-mounted MH
- **Sports flood**: [ISF Series 400W](/p/isf-series-led-stadium-light) — precision optics for fields

## ROI: $347/fixture/year in energy savings alone

**[Get a quote →](mailto:sales@auvolar.com)** | **[Call (626) 342-8856](tel:6263428856)**`,
  },
  {
    slug: '250w-metal-halide-led-replacement',
    oldFixture: '250W Metal Halide',
    oldWattage: '250W',
    oldType: 'Metal Halide',
    ledReplacement: '100W LED UFO High Bay',
    ledWattage: '100W',
    ledProduct: 'ufo-high-bay-light-hba-series',
    ledProductName: 'UFO High Bay HBA Series 100W',
    savings: '60%',
    annualSavings: '$62',
    lumens: '15,000',
    metaTitle: '250W Metal Halide LED Replacement | 100W LED High Bay | Auvolar',
    metaDescription: 'Replace 250W metal halide with 100W LED high bay. 60% energy savings, instant on, DLC certified for utility rebates.',
    keywords: ['250W metal halide LED replacement', '250W MH LED equivalent', '250W HID replacement'],
    content: `The 250W metal halide is common in smaller warehouses, retail back-rooms, and workshops.

## Quick Comparison

| | 250W MH | 100W LED |
|---|---|---|
| Power | 288W (w/ballast) | 100W |
| Lumens | 20,500 initial | 15,000 constant |
| Lifespan | 15,000 hrs | 100,000 hrs |
| Annual cost* | $151 | $52 |
| Warm-up | 5-10 min | Instant |

*12hr/day, 260 days, $0.12/kWh

## Best LED Replacement

**[UFO High Bay 100W](/p/ufo-high-bay-light-hba-series)** — perfect for 15-20ft ceilings:
- 15,000 lumens (more usable light than degraded 250W MH)
- Only 8 lbs — lighter than most MH fixtures
- Plug-and-play with included 5ft cord
- DLC Premium certified → $30-$50 rebate

## ROI: Payback in 4 months after rebate

**[Shop now →](/p/ufo-high-bay-light-hba-series)** | **[Get bulk pricing →](mailto:sales@auvolar.com)**`,
  },
  {
    slug: '400w-hps-led-replacement',
    oldFixture: '400W High Pressure Sodium (HPS)',
    oldWattage: '400W',
    oldType: 'HPS',
    ledReplacement: '150W LED Area Light',
    ledWattage: '150W',
    ledProduct: '75w-145w-aera-lighting-shoebox-ot-series-s',
    ledProductName: 'OT Series Area Light 75-145W',
    savings: '63%',
    annualSavings: '$110',
    lumens: '22,500',
    metaTitle: '400W HPS LED Replacement | 150W LED Area Light | Auvolar',
    metaDescription: 'Replace 400W HPS with 150W LED area light. 63% savings, white light (not orange), instant on. Perfect for parking lots and streets.',
    keywords: ['400W HPS LED replacement', '400W high pressure sodium LED', '400W HPS LED equivalent', 'replace 400W HPS'],
    content: `400W HPS (High Pressure Sodium) is the most common parking lot and street light in America. The orange glow is being replaced nationwide with white LED.

## Why Replace 400W HPS?

Beyond energy savings, the #1 reason is **light quality**:
- HPS produces orange/yellow light (CRI ~22) — you can barely distinguish colors
- LED produces white light (CRI 80+) — security cameras can capture faces, license plates
- Police departments nationwide advocate for LED conversion for public safety

## Comparison

| | 400W HPS | 150W LED (OT Series) |
|---|---|---|
| Power | 458W (w/ballast) | 150W |
| Color | Orange (2100K, CRI 22) | White (3000-5000K, CRI 80+) |
| Lumens | 50,000 (initial) | 22,500 (directional, all on target) |
| Warm-up | 5-10 min | Instant |
| Re-strike | 1-2 min | None |
| Lifespan | 24,000 hrs | 100,000 hrs |
| Annual cost* | $240 | $79 |

*12hr/day, 365 days, $0.12/kWh (outdoor lights run year-round)

## Best LED Replacement

**[OT Series Area Light 150W](/p/75w-145w-aera-lighting-shoebox-ot-series-s)**:
- 3-in-1 CCT selectable (3000K/4000K/5000K)
- Type III, IV, or V distribution
- Slip fitter mounts on existing HPS pole tenon
- Integral photocell receptacle for dusk-to-dawn
- 10kV surge protection
- DLC Premium → $40-$100 rebate

## Mounting: Direct Replacement

The OT Series slip fitter adapter fits standard 2-3/8" round tenons used by virtually all HPS area lights. No pole modification needed.

**[Shop OT Series →](/p/75w-145w-aera-lighting-shoebox-ot-series-s)** | **[Free parking lot design →](/tools/photometric-simulation)**`,
  },
  {
    slug: '1000w-hps-led-replacement',
    oldFixture: '1000W High Pressure Sodium (HPS)',
    oldWattage: '1000W',
    oldType: 'HPS',
    ledReplacement: '300-420W LED Area Light',
    ledWattage: '300-420W',
    ledProduct: '300w-420w-aera-lighting-shoebox-ot-series-l',
    ledProductName: 'OT Series Area Light 300-420W',
    savings: '60-70%',
    annualSavings: '$290',
    lumens: '45,000-63,000',
    metaTitle: '1000W HPS LED Replacement | 300-420W LED Area Light | Auvolar',
    metaDescription: 'Replace 1000W HPS with 300-420W LED area light. 60-70% savings, white light, DLC certified. Ships from California.',
    keywords: ['1000W HPS LED replacement', '1000W high pressure sodium LED', '1000W HPS LED equivalent'],
    content: `1000W HPS fixtures are used on highways, large parking lots, and commercial properties. LED replacement saves $290+/year per fixture.

## Comparison

| | 1000W HPS | 420W LED (OT Series L) |
|---|---|---|
| Power | 1,100W (w/ballast) | 420W |
| Annual cost* | $577 | $220 |
| Color | Orange (CRI 22) | White (CRI 80+) |
| Lifespan | 24,000 hrs | 100,000 hrs |

*12hr/day, 365 days, $0.12/kWh

## Recommended: [OT Series 420W](/p/300w-420w-aera-lighting-shoebox-ot-series-l)

- 63,000 lumens — matches effective HPS output with directional optics
- Type V for center-of-lot, Type III for perimeter
- 277-480V high voltage option available
- Slip fitter fits existing poles

**Annual savings per fixture: $357** (energy) + $110 (maintenance) = **$467/year**

**[Get a quote →](mailto:sales@auvolar.com)**`,
  },
  {
    slug: 't8-fluorescent-led-replacement',
    oldFixture: '4ft T8 Fluorescent Tube (32W)',
    oldWattage: '32W',
    oldType: 'Fluorescent',
    ledReplacement: '18W LED T8 Tube',
    ledWattage: '18W',
    ledProduct: 'led-t8-tube-4ft',
    ledProductName: 'LED T8 Tube 4ft 18W',
    savings: '44%',
    annualSavings: '$6',
    lumens: '2,200',
    metaTitle: 'T8 Fluorescent to LED Replacement Guide | Type A, B, A+B | Auvolar',
    metaDescription: 'Replace 32W T8 fluorescent tubes with 18W LED tubes. Type A (plug & play), Type B (direct wire), Type A+B hybrid. DLC certified.',
    keywords: ['T8 fluorescent LED replacement', 'T8 LED tube', '4ft LED tube replacement', 'replace fluorescent with LED'],
    content: `Fluorescent T8 tubes are the most common light source in offices, schools, and retail — and the easiest to replace with LED.

## Three Types of LED T8 Tubes

| Type | Installation | Pros | Cons |
|---|---|---|---|
| **Type A (Plug & Play)** | Remove old tube, insert LED | 5-min swap, no electrician | Depends on old ballast |
| **Type B (Direct Wire)** | Remove ballast, wire direct | Most efficient, no ballast risk | Requires electrician, 15 min |
| **Type A+B (Hybrid)** | Works both ways | Future-proof, best of both | Slightly higher cost |

**We recommend Type A+B** — start as plug-and-play now, direct wire later when the old ballast eventually dies.

## Comparison

| | 32W T8 Fluorescent | 18W LED T8 |
|---|---|---|
| Power | 32W + 4-8W ballast = ~38W | 18W |
| Lumens | 2,800 (initial) → 2,000 (degraded) | 2,200 (constant) |
| CRI | 75-82 | 80-90 |
| Lifespan | 20,000-30,000 hrs | 50,000+ hrs |
| Mercury | Yes (hazardous disposal) | Zero |
| Flicker | Common (causes headaches) | Flicker-free |

## Savings at Scale

**Office with 500 tubes** (32W fluorescent → 18W LED):
- Energy savings: 500 × $6/year = **$3,000/year**
- Tube cost: 500 × $6 = $3,000
- Rebate: 500 × $3 = -$1,500
- Net cost: **$1,500**
- **Payback: 6 months**

Plus: no more bulk fluorescent tube purchases, no mercury disposal fees, no flickering complaints.

**[Shop LED T8 Tubes →](/products/indoor/led-tubes)** | **[Bulk pricing →](mailto:sales@auvolar.com)**`,
  },
  {
    slug: '175w-metal-halide-led-replacement',
    oldFixture: '175W Metal Halide Wall Pack',
    oldWattage: '175W',
    oldType: 'Metal Halide',
    ledReplacement: '50W LED Wall Pack',
    ledWattage: '50W',
    ledProduct: 'small-wall-pack-scone-an-wsn-series',
    ledProductName: 'Wall Pack AN-WSN Series',
    savings: '71%',
    annualSavings: '$55',
    lumens: '6,500',
    metaTitle: '175W Metal Halide Wall Pack LED Replacement | 50W LED | Auvolar',
    metaDescription: 'Replace 175W metal halide wall pack with 50W LED. 71% energy savings, built-in photocell, DLC certified.',
    keywords: ['175W metal halide wall pack LED replacement', '175W MH wall pack LED', 'LED wall pack replacement'],
    content: `175W metal halide wall packs are everywhere — on the sides of commercial buildings, loading docks, and parking areas. LED replacement is simple and saves 71%.

## Comparison

| | 175W MH Wall Pack | 50W LED Wall Pack |
|---|---|---|
| Power | 208W (w/ballast) | 50W |
| Lumens | 14,000 (initial) → 8,000 (aged) | 6,500 (directional) |
| Annual cost* | $109 | $26 |
| Photocell | External add-on | Built-in (most models) |
| Dark sky | Unshielded (light trespass) | Full cutoff (compliant) |

*12hr/day, 365 days, $0.12/kWh

## [Wall Pack 50W (AN-WSN Series)](/p/small-wall-pack-scone-an-wsn-series)
- Full cutoff design (dark sky compliant)
- Built-in dusk-to-dawn photocell
- Bronze or white finish
- IP65 rated
- DLC Premium → $20-$40 rebate

**[Shop Wall Packs →](/p/small-wall-pack-scone-an-wsn-series)**`,
  },
  {
    slug: '1500w-metal-halide-stadium-led-replacement',
    oldFixture: '1500W Metal Halide Stadium Light',
    oldWattage: '1500W',
    oldType: 'Metal Halide',
    ledReplacement: '600W LED Stadium Light',
    ledWattage: '600W',
    ledProduct: 'isf-series-led-stadium-light',
    ledProductName: 'ISF Series Stadium Light',
    savings: '60%',
    annualSavings: '$480',
    lumens: '90,000',
    metaTitle: '1500W Metal Halide Stadium Light LED Replacement | 600W LED | Auvolar',
    metaDescription: 'Replace 1500W metal halide stadium lights with 600W LED. Instant on/off, no re-strike, precision optics. For sports fields and arenas.',
    keywords: ['1500W metal halide stadium LED replacement', 'stadium light LED conversion', 'sports field LED replacement'],
    content: `1500W metal halide stadium lights are the standard for sports fields — and the most dramatic LED upgrade available.

## Why Stadium LED Conversion is a Game-Changer

1. **Instant on/off**: No 20-minute warm-up before games. Rain delay? Lights off. Play resumes? Instant full brightness.
2. **No re-strike**: Metal halide needs 10-15 minutes to cool before restarting. LED has zero re-strike delay.
3. **Precision optics**: LED stadium lights direct light exactly where needed — less spill to neighbors, less glare for players.
4. **60% energy savings**: A typical 6-pole football field saves $15,000-$25,000/year.

## Comparison

| | 1500W Metal Halide | 600W LED (ISF Series) |
|---|---|---|
| Power | 1,650W (w/ballast) | 600W |
| Warm-up | 15-20 min | Instant |
| Re-strike | 10-15 min | None |
| Beam control | Poor (spill everywhere) | Precision (5° adjustable) |
| Glare | Severe | Anti-glare visor standard |
| Lifespan | 6,000-10,000 hrs | 80,000+ hrs |
| Annual cost* | $866 | $315 |

*1,000 hrs/year, $0.12/kWh (typical sports field usage)

## [ISF Series Stadium Light 600W](/p/isf-series-led-stadium-light)

- 5 beam angles: 15°, 25°, 40°, 60°, asymmetric
- Anti-glare visor standard
- CRI >80 (optional >90 for TV broadcast)
- Yoke, slip fitter, or bracket mount
- 110 IES files for photometric design

**[Free stadium lighting design →](mailto:sales@auvolar.com?subject=Stadium%20LED%20Conversion)**`,
  },
]

export function getReplacementGuide(slug: string): ReplacementGuide | undefined {
  return replacementGuides.find(g => g.slug === slug)
}

export function getAllReplacementSlugs(): string[] {
  return replacementGuides.map(g => g.slug)
}

export function getAllReplacementGuides(): ReplacementGuide[] {
  return replacementGuides
}
