# Typography Review & Font-Size Recommendations

## Current State Analysis

### Font Size Scale Issues

| Priority | Issue | Current | Impact |
|----------|-------|---------|--------|
| 🔴 **CRITICAL** | Ceremony "Day" gets smaller on desktop | `text-3xl` → `md:text-2xl` | Backwards sizing |
| 🔴 **CRITICAL** | Ceremony "Address" gets smaller on desktop | `text-lg` → `md:text-base` | Backwards sizing |
| 🔴 **CRITICAL** | RSVP title fixed at 66px | `text-[66px]` | Too large on mobile |
| 🔴 **CRITICAL** | Gallery title fixed at 72px | `text-7xl` | Overwhelming on mobile |
| 🔴 **CRITICAL** | Navigation (solid) text too small | `text-[0.625em]` = 10px mobile | Unreadable |
| 🟡 **MODERATE** | Hero names extreme scaling | 56px → 140px | Jarring difference |
| 🟡 **MODERATE** | Missing responsive sizing | Many elements fixed | Poor mobile UX |
| 🟢 **MINOR** | Inconsistent em vs px vs Tailwind | Mixed units | Maintainability |

## Typography Best Practices

### Mobile-First Responsive Scale

**Recommended approach:** Start with comfortable mobile sizes, scale up for desktop

| Element Type | Mobile (< 768px) | Tablet (768-1024px) | Desktop (> 1024px) |
|--------------|------------------|---------------------|-------------------|
| **Hero Heading** | 2.5rem - 3rem (40-48px) | 4rem - 5rem (64-80px) | 5rem - 6rem (80-96px) |
| **Section Title (H1)** | 2rem - 2.5rem (32-40px) | 3rem - 3.5rem (48-56px) | 3.5rem - 4rem (56-64px) |
| **Section Title (H2)** | 1.75rem - 2rem (28-32px) | 2.5rem - 3rem (40-48px) | 3rem - 3.5rem (48-56px) |
| **Subsection (H3)** | 1.25rem - 1.5rem (20-24px) | 1.75rem - 2rem (28-32px) | 2rem - 2.25rem (32-36px) |
| **Body Text** | 1rem - 1.125rem (16-18px) | 1.125rem - 1.25rem (18-20px) | 1.125rem - 1.25rem (18-20px) |
| **Small Text** | 0.875rem (14px) | 0.875rem - 1rem (14-16px) | 0.875rem - 1rem (14-16px) |
| **Button Text** | 0.875rem - 1rem (14-16px) | 1rem (16px) | 1rem - 1.125rem (16-18px) |
| **Navigation** | 0.875rem - 1rem (14-16px) | 1rem - 1.125rem (16-18px) | 1.125rem - 1.25rem (18-20px) |

### Tailwind CSS Equivalents

```
text-xs = 0.75rem (12px)
text-sm = 0.875rem (14px)
text-base = 1rem (16px)
text-lg = 1.125rem (18px)
text-xl = 1.25rem (20px)
text-2xl = 1.5rem (24px)
text-3xl = 1.875rem (30px)
text-4xl = 2.25rem (36px)
text-5xl = 3rem (48px)
text-6xl = 3.75rem (60px)
text-7xl = 4.5rem (72px)
text-8xl = 6rem (96px)
text-9xl = 8rem (128px)
```

## Recommended Changes by Section

### 1. Cover/Hero Section

#### Current Issues:
- Couple names: 56px mobile → 140px desktop (2.5x increase is too extreme)
- Using em units makes it hard to predict actual sizes

#### Recommended:
```tsx
{/* Couple Names */}
<div className="text-4xl md:text-6xl lg:text-7xl text-white tracking-normal leading-tight font-hoangngan8">
  Hoàng & Ngân
</div>

{/* Save the Date */}
<p className="text-lg md:text-2xl lg:text-3xl text-white/90 tracking-[0.3em] uppercase font-light font-hoangngan7">
  {t('cover.saveTheDate')}
</p>

{/* Date & Venue info */}
<div className="text-sm md:text-base lg:text-lg uppercase font-thin font-inconsolata">
  ...
</div>
```

**Rationale:**
- Names: 36px → 60px → 72px (more gradual scaling)
- Save date: 18px → 24px → 30px (proportional)
- Info: 14px → 16px → 18px (readable at all sizes)

### 2. Navigation Component

#### Current Issues:
- Overlay mode: No mobile differentiation
- Solid mode: 10px on mobile is unreadable

#### Recommended:
```tsx
// Overlay mode
const buttonClasses = overlay
  ? 'text-sm md:text-base lg:text-lg font-light text-white/80 hover:text-white ...'
  : 'text-sm md:text-base lg:text-lg font-medium text-white/80 hover:text-white ...';
```

**Rationale:**
- Unified sizing across both modes
- 14px → 16px → 18px is optimal for navigation
- Maintains readability on all devices

### 3. OurStory Section

#### Current Issues:
- No mobile optimization on greeting
- Body text doesn't scale
- Names signature doesn't scale

#### Recommended:
```tsx
{/* Greeting */}
<div className="text-3xl md:text-4xl lg:text-5xl font-hoangngan8 text-[#412d1d]">
  {t('ourStory.greeting')}
</div>

{/* Story content */}
<div className="text-base md:text-lg leading-relaxed font-hoangngan4 whitespace-pre-line">
  {t('ourStory.story')}
  <div className="text-base md:text-lg font-hoangngan4 whitespace-pre-line">
    <p>{t('ourStory.withLove')}</p>
    <p className="font-hoangngan8 text-2xl md:text-3xl lg:text-4xl">
      {t('ourStory.names')}
    </p>
  </div>
</div>
```

**Rationale:**
- Greeting: 30px → 36px → 48px (comfortable reading)
- Body: 16px → 18px (optimal for long-form content)
- Names: 24px → 30px → 36px (emphasis without overwhelming)

### 4. CeremonyDetails Section ⚠️ **PRIORITY FIX**

#### Current Issues:
- "Day" gets smaller on desktop (3xl → 2xl) ❌
- "Address" gets smaller on desktop (lg → base) ❌
- Inconsistent scaling

#### Recommended:
```tsx
{/* Day - FIX BACKWARDS SIZING */}
<h2 className="text-2xl md:text-3xl lg:text-4xl tracking-[0.2em] uppercase"
  style={{ fontFamily: 'Inconsolata, monospace' }}
>
  {t('ceremony.day')}
</h2>

{/* Time */}
<div className="text-3xl md:text-4xl lg:text-5xl tracking-wide"
  style={{ fontFamily: 'Inconsolata, monospace' }}
>
  {t('ceremony.time')}
</div>

{/* Room */}
<p className="text-xl md:text-2xl lg:text-3xl tracking-[0.15em] uppercase"
  style={{ fontFamily: 'Inconsolata, monospace', letterSpacing: '0.1em' }}
>
  {t('ceremony.room')}
</p>

{/* Venue */}
<p className="text-xl md:text-2xl lg:text-3xl tracking-widest uppercase"
  style={{ fontFamily: 'Inconsolata, monospace' }}
>
  {t('ceremony.venue')}
</p>

{/* Address - FIX BACKWARDS SIZING */}
<p className="text-base md:text-lg lg:text-xl tracking-wide pt-2"
  style={{ fontFamily: 'Inconsolata, monospace' }}
>
  {t('ceremony.address')}
</p>
```

**Rationale:**
- Day: 24px → 30px → 36px (progressive, not regressive!)
- Address: 16px → 18px → 20px (grows, not shrinks!)
- Maintains visual hierarchy while scaling properly

### 5. Timeline Section

#### Current Issues:
- Title too large on mobile (56px)
- Event details don't scale responsively
- Missing mobile optimization

#### Recommended:
```tsx
{/* Title */}
<h2 className="text-3xl md:text-4xl lg:text-5xl font-custom-serif text-[#e8dcc8] text-center mb-8 md:mb-12 lg:mb-16">
  {t('timeline.title')}
</h2>

{/* Header event */}
<div className="text-center space-y-2">
  <p className="text-[#e8dcc8] text-lg md:text-xl lg:text-2xl font-montserrat">
    {timelineItems[0].time}
  </p>
  <p className="text-[#e8dcc8] text-base md:text-lg lg:text-xl font-montserrat uppercase tracking-wide">
    {timelineItems[0].title}
  </p>
  <p className="text-[#e8dcc8]/90 text-sm md:text-base font-montserrat italic">
    {timelineItems[0].subtitle}
  </p>
  <p className="text-[#e8dcc8]/80 text-xs md:text-sm font-montserrat italic">
    {timelineItems[0].description}
  </p>
</div>

{/* Grid items */}
<div key={index} className="flex flex-col items-center text-center space-y-3">
  {/* Time */}
  <p className="text-[#e8dcc8] text-lg md:text-xl lg:text-2xl font-montserrat font-medium">
    {item.time}
  </p>
  
  {/* Title */}
  <p className="text-[#e8dcc8] text-base md:text-lg lg:text-xl font-montserrat">
    {item.title}
  </p>
  
  {/* Subtitle */}
  <p className="text-[#e8dcc8]/90 text-xs md:text-sm font-montserrat italic">
    {item.subtitle}
  </p>
  
  {/* Description */}
  <p className="text-[#e8dcc8]/80 text-[10px] md:text-xs font-montserrat italic">
    {item.description}
  </p>
</div>
```

**Rationale:**
- Title: 30px → 36px → 48px (more mobile-friendly)
- Event text scales for readability at each breakpoint
- Maintains information density without overwhelming mobile users

### 6. RSVP Section ⚠️ **PRIORITY FIX**

#### Current Issues:
- Title fixed at 66px - way too large on mobile
- No responsive sizing anywhere

#### Recommended:
```tsx
{/* Title */}
<div className="text-4xl md:text-5xl lg:text-6xl font-custom-serif text-[#412d1d] mb-4">
  {t('rsvp.title')}
</div>

{/* Description */}
<p className="text-base md:text-lg leading-relaxed font-montserrat text-gray-700">
  {t('rsvp.description')}
</p>

{/* Labels */}
<label className="block text-gray-700 text-base md:text-lg font-montserrat">
  {t('rsvp.nameLabel')}
</label>
```

**Rationale:**
- Title: 36px → 48px → 60px (much better mobile experience)
- Body: 16px → 18px (standard for forms)
- Labels: 16px → 18px (clear and readable)

### 7. Gallery Section ⚠️ **PRIORITY FIX**

#### Current Issues:
- Title fixed at 72px - overwhelming on mobile
- No responsive sizing

#### Recommended:
```tsx
{/* Section title */}
<div className="text-4xl md:text-5xl lg:text-6xl font-custom-serif text-[#412d1d]">
  {t('gallery.title')}
</div>

{/* Subtitle */}
<p className="text-[#412d1d] text-base md:text-lg mt-4 font-hoangngan4">
  {t('gallery.subtitle')}
</p>

{/* Concept card titles */}
<h3 className="text-lg md:text-xl lg:text-2xl font-serif text-white text-center mb-2 ...">
  {t(`gallery.concepts.${concept.translationKey}.title`)}
</h3>

{/* Concept descriptions */}
<p className="text-xs md:text-sm text-white/80 text-center">
  {t(`gallery.concepts.${concept.translationKey}.description`)}
</p>
```

**Rationale:**
- Title: 36px → 48px → 60px (comfortable on mobile)
- Subtitle: 16px → 18px (readable)
- Concept titles: 18px → 20px → 24px (scales with card size)
- Descriptions: 12px → 14px (small but legible)

### 8. ContactUs Section

#### Current Status:
✅ Already has good responsive sizing!

```tsx
text-[0.8em] md:text-[1em] lg:text-[1.125em]
```

Keep as-is.

## Implementation Priority

### 🔴 High Priority (Fix Immediately)
1. ✅ **CeremonyDetails "Day"** - Fix backwards sizing
2. ✅ **CeremonyDetails "Address"** - Fix backwards sizing  
3. ✅ **RSVP Title** - Make responsive (currently 66px fixed)
4. ✅ **Gallery Title** - Make responsive (currently 72px fixed)
5. ✅ **Navigation solid mode** - Increase from 10px minimum

### 🟡 Medium Priority
6. ✅ **Hero couple names** - Reduce extreme scaling
7. ✅ **OurStory section** - Add responsive sizing
8. ✅ **Timeline section** - Optimize for mobile

### 🟢 Low Priority (Nice to Have)
9. Standardize unit usage (em vs px vs Tailwind)
10. Add line-height optimization for different sizes
11. Consider adding text-balance for titles (Tailwind v4 feature)

## Typography System Recommendations

### Use Tailwind's Default Scale

**Benefits:**
- ✅ Predictable sizing
- ✅ Easy to maintain
- ✅ Works well with responsive design
- ✅ Standard across the industry

**When to use custom sizes:**
- 🎨 Brand-specific hero elements
- 🎨 Unique design requirements
- 🎨 Matching exact design specs

### Responsive Pattern

Follow this pattern consistently:

```tsx
// Mobile first, scale up
text-base md:text-lg lg:text-xl
text-2xl md:text-3xl lg:text-4xl
text-4xl md:text-5xl lg:text-6xl
```

**Avoid:**
- ❌ Getting smaller on larger screens
- ❌ Extreme jumps (2x or more)
- ❌ Fixed pixel sizes without responsive variants

## Testing Checklist

After implementing changes:

- [ ] All text readable on 320px mobile
- [ ] No text too large on mobile (< 48px for body sections)
- [ ] Smooth progression from mobile → tablet → desktop
- [ ] No backwards sizing (smaller on desktop than mobile)
- [ ] Button/navigation text at least 14px on mobile
- [ ] Form labels readable (16px+ on mobile)
- [ ] Long-form content 16-18px on all devices
- [ ] Hero text dramatic but not overwhelming (< 60px mobile)
- [ ] Visual hierarchy maintained at all breakpoints

## Recommended Approach

**I recommend fixing in this order:**

1. **Phase 1** - Fix critical backwards sizing (Ceremony Day & Address)
2. **Phase 2** - Fix oversized mobile text (RSVP & Gallery titles)
3. **Phase 3** - Add responsive sizing to fixed elements (OurStory, Timeline)
4. **Phase 4** - Optimize hero scaling for smoother progression

This approach fixes breaking issues first, then improves UX progressively.

Would you like me to implement these changes?
