# Home Page Animation Guide

## Animation Timeline

When a user visits the home page, they will see the following animation sequence:

### Hero Section (0-1.5 seconds)

```
0.0s - Page loads with purple gradient background
     - Floating shapes start their continuous animation

0.0s - Title "Welcome to Hallelujah Church" fades in from top
     ↓ (fadeInDown animation)

0.2s - Subtitle "A place where faith comes alive..." fades in from bottom
     ↑ (fadeInUp animation)

0.4s - Login and Sign Up buttons fade in from bottom
     ↑ (fadeInUp animation)

0.6s - Stats row container fades in from bottom
     ↑ (fadeInUp animation)

0.8s - "Join Us" stat scales in
     ⚡ (scaleIn animation)

1.0s - "Location" stat scales in
     ⚡ (scaleIn animation)

1.2s - "Community" stat scales in
     ⚡ (scaleIn animation)
```

### Quick Links Section (Visible on scroll)

```
When section becomes visible:

0.1s - Events card fades in from bottom
     ↑

0.2s - Sermons card fades in from bottom
     ↑

0.3s - Ministries card fades in from bottom
     ↑

0.4s - Prayer Requests card fades in from bottom
     ↑
```

### Continuous Animations

**Background Shapes:**
- Float up and down continuously (6-second cycle)
- Each shape has different timing for natural movement
- Subtle rotation effect

**On Hover:**
- Cards lift up with shadow enhancement
- Icons bounce when you hover over quick link cards
- Buttons lift up and enhance shadow
- Stats scale up slightly

---

## Animation Details

### fadeInDown
```css
Duration: 1 second
Effect: Element starts invisible and 30px above final position
        Fades in while moving down to final position
```

### fadeInUp
```css
Duration: 0.6-1 second (varies by element)
Effect: Element starts invisible and 30px below final position
        Fades in while moving up to final position
```

### scaleIn
```css
Duration: 0.6 seconds
Effect: Element starts invisible and at 80% size
        Fades in while growing to 100% size
```

### float
```css
Duration: 6 seconds (infinite loop)
Effect: Element moves up 20px and rotates 5 degrees
        Then returns to original position
        Repeats continuously
```

### iconBounce (on hover)
```css
Duration: 0.6 seconds
Effect: Icon jumps up 10px and returns
        Triggered when hovering over card
```

---

## Color Scheme

### Hero Section
- **Background:** Purple gradient (#6366f1 → #8b5cf6)
- **All Text:** Pure white (#ffffff)
- **Text Shadows:** Dark shadows for depth
- **Floating Shapes:** Semi-transparent white (10% opacity)

### Buttons
- **Login Button:**
  - Background: White (#ffffff)
  - Text: Purple (#6366f1)
  - Shadow: Dark shadow for depth
  
- **Sign Up Button:**
  - Background: Transparent
  - Border: 2px solid white
  - Text: White (#ffffff)
  - Hover: Semi-transparent white background

### Quick Links
- **Card Background:** White
- **Icons:** Purple (#6366f1)
- **Hover:** Lift effect with enhanced shadow

---

## Performance Notes

✅ **GPU Accelerated:**
- All animations use CSS transforms
- Smooth 60fps performance
- No JavaScript animations

✅ **Optimized:**
- Animations only run once on page load
- Hover effects are instant
- No layout thrashing

✅ **Accessible:**
- Respects `prefers-reduced-motion` (can be added if needed)
- All content readable without animations
- Animations enhance, not required for functionality

---

## Customization

To adjust animation timing, edit `/frontend/src/pages/Home.css`:

```css
/* Make animations faster */
animation: fadeInDown 0.5s ease-out;  /* Change from 1s to 0.5s */

/* Add delay */
animation: fadeInUp 1s ease-out 0.5s both;  /* 0.5s delay */

/* Change easing */
animation: scaleIn 0.6s ease-in-out;  /* Different easing function */
```

To disable animations temporarily:
```css
/* Add to Home.css */
* {
  animation: none !important;
}
```

---

**Created:** October 12, 2025
**Purpose:** Visual guide for home page animations
