# 🎨 Visual Guide - Duolingo Clone

A visual overview of the app's screens, components, and design system.

---

## 📱 App Screens Preview

### 1. 🏠 Learn Screen (Main Learning Path)
```
┌─────────────────────────────────┐
│  👤    🔥7  💎500  ❤️5         │ ← Header with stats
├─────────────────────────────────┤
│                                 │
│        🇪🇸 Spanish              │
│         Section 1               │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Daily Goal   13/20 XP   │   │ ← Progress card
│  │ ████████░░░░ 65%        │   │
│  └─────────────────────────┘   │
│                                 │
│           ⭐                     │ ← Lesson node
│         Unit 1 ✓                │   (completed)
│            │                    │
│           📚                     │ ← Current lesson
│        ▶ Unit 3 ◀               │   (in progress)
│            │                    │
│           🔒                     │ ← Locked lesson
│         Unit 4                  │
│                                 │
│          🦉                      │ ← Mascot
│   "Keep going!"                 │
│                                 │
└─────────────────────────────────┘
│ 🏠  🎯  🏆  🛒  👤             │ ← Bottom tabs
└─────────────────────────────────┘
```

### 2. 🎯 Practice Screen
```
┌─────────────────────────────────┐
│     Practice Hub                │
│                                 │
│  ┌──────────┐  ┌──────────┐    │
│  │   🎯     │  │   📖     │    │
│  │ Practice │  │ Stories  │    │ ← Practice types
│  │ +20 XP   │  │ +15 XP   │    │
│  └──────────┘  └──────────┘    │
│                                 │
│  ┌──────────┐  ┌──────────┐    │
│  │   🎤     │  │   👂     │    │
│  │ Speaking │  │Listening │    │
│  │ +10 XP   │  │ +10 XP   │    │
│  └──────────┘  └──────────┘    │
│                                 │
│  Review Mistakes                │
│  ┌─────────────────────────┐   │
│  │ ❌  Hola → Hello        │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🔥  7 Day Streak!       │   │ ← Streak card
│  │ Don't break it now!     │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

### 3. 🏆 Leaderboard Screen
```
┌─────────────────────────────────┐
│      Leaderboard                │
│      Pearl League               │
│          🏆                      │
│                                 │
│ This Week│This Month│All Time   │ ← Tabs
│ ─────────                       │
│                                 │
│     🥈       🥇       🥉        │
│    👤       👤       👤         │ ← Top 3 podium
│   John     Maria      You       │
│  2756XP   2847XP    2654XP      │
│                                 │
│  #4  👤 Sophie Chen    2543 XP  │
│  #5  👤 Alex Johnson   2432 XP  │ ← Rankings
│  #6  👤 Emma Wilson    2321 XP  │
│  #7  👤 David Lee      2210 XP  │
│                                 │
└─────────────────────────────────┘
```

### 4. 🛒 Shop Screen
```
┌─────────────────────────────────┐
│      Shop                       │
│  Use your gems to buy power-ups │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 💎  Your Gems           │   │
│  │     500        [Get More]│   │ ← Gem balance
│  └─────────────────────────┘   │
│                                 │
│  Power-ups                      │
│  ┌─────────────────────────┐   │
│  │ 🧊 Streak Freeze        │   │
│  │ Protect streak for 1 day│   │
│  │ 💎 200          [Buy]   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ ❤️ Heart Refill         │   │
│  │ Refill all your hearts  │   │
│  │ 💎 350          [Buy]   │   │
│  └─────────────────────────┘   │
│                                 │
│  Earn More Gems                 │
│  ┌─────────────────────────┐   │
│  │      📺                  │   │
│  │  Watch an Ad            │   │
│  │  Earn 5 gems            │   │
│  │  [Watch Now]            │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

### 5. 👤 Profile Screen
```
┌─────────────────────────────────┐
│          👤                      │
│                                 │
│       Your Name                 │ ← Profile header
│       @username                 │
│      [Level 12]                 │
│                                 │
│  ┌────────┐  ┌────────┐        │
│  │  🔥    │  │  ⭐    │        │
│  │   7    │  │ 2654   │        │ ← Stats grid
│  │ Streak │  │ Total XP│       │
│  └────────┘  └────────┘        │
│                                 │
│  Achievements                   │
│  ┌─────┐ ┌─────┐               │
│  │🎓 ✓ │ │🎯 ✓ │               │ ← Achievements
│  │Scholar│Shooter│              │
│  └─────┘ └─────┘               │
│                                 │
│  Progress to Level 13           │
│  654/1000 XP                    │
│  ████████░░ 65%                 │ ← Level progress
│                                 │
│  Settings                       │
│  👤 Edit Profile           ›    │
│  🔔 Notifications          ›    │ ← Settings menu
│  🌙 Dark Mode              ›    │
│                                 │
│  [Sign Out]                     │
└─────────────────────────────────┘
```

### 6. 📚 Lesson Screen (Modal)
```
┌─────────────────────────────────┐
│ ✕  ████████░░░░ 60%    ❤️ 5    │ ← Progress bar
├─────────────────────────────────┤
│                                 │
│         📝                       │
│                                 │
│  Select the correct             │
│  translation:                   │ ← Question
│                                 │
│       "Hello"                   │
│                                 │
│  ┌─────────────────────────┐   │
│  │        Hola             │   │ ← Answer options
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │        Adiós            │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │       Gracias           │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │     Por favor           │   │
│  └─────────────────────────┘   │
│                                 │
├─────────────────────────────────┤
│      [CHECK]                    │ ← Check button
└─────────────────────────────────┘

After answering:
┌─────────────────────────────────┐
│ ✓ Excellent!                    │ ← Feedback (green)
│ [CONTINUE]                      │
└─────────────────────────────────┘
```

---

## 🎨 Color Palette

### Primary Colors
```
🟢 Primary Green    #58CC02  ████  Main brand color
🔵 Secondary Blue   #1CB0F6  ████  Secondary actions
🟠 Streak Orange    #FF9600  ████  Streaks & fire
🟡 XP Yellow        #FFC800  ████  Experience points
🔴 Error Red        #FF4B4B  ████  Errors & hearts
```

### Neutral Colors
```
⚪ White            #FFFFFF  ████  Background
⬜ Light Gray       #F7F7F7  ████  Card background
◽ Border Gray      #E5E5E5  ████  Borders
⬛ Text Primary     #3C3C3C  ████  Main text
◾ Text Secondary   #777777  ████  Secondary text
```

### State Colors
```
✅ Success          #58CC02  ████  Correct answers
⚠️ Warning          #FFC800  ████  Caution
❌ Error            #FF4B4B  ████  Wrong answers
```

---

## 📦 Component Library

### Button Variants
```
┌─────────────┐
│   Primary   │  ← Green background
└─────────────┘

┌─────────────┐
│  Secondary  │  ← Blue background
└─────────────┘

┌─────────────┐
│   Outline   │  ← Transparent with border
└─────────────┘

   Ghost        ← No background
```

### Card Styles
```
┌─────────────────────┐
│                     │
│   Elevated Card     │  ← With shadow
│                     │
└─────────────────────┘

┌─────────────────────┐
│                     │
│    Flat Card        │  ← No shadow
│                     │
└─────────────────────┘
```

### Progress Bars
```
Full:     ████████████████ 100%
High:     ████████████░░░░ 75%
Medium:   ████████░░░░░░░░ 50%
Low:      ████░░░░░░░░░░░░ 25%
Empty:    ░░░░░░░░░░░░░░░░ 0%
```

### Lesson Node States
```
⭐ Completed   (Gold with checkmark)
📚 Current     (Green, larger)
🔒 Locked      (Gray)
```

---

## 🎯 Icon System

All using emojis for simplicity:

### Stats Icons
```
🔥  Streak
⭐  XP
💎  Gems
❤️  Hearts
🏆  League/Trophy
📚  Lessons
```

### Practice Types
```
🎯  Practice
📖  Stories
🎤  Speaking
👂  Listening
```

### Rankings
```
🥇  First Place
🥈  Second Place
🥉  Third Place
```

### Shop Items
```
🧊  Streak Freeze
❤️  Heart Refill
⚡  Bonus XP
👑  Legendary
```

### Profile/Settings
```
👤  Profile/Avatar
🔔  Notifications
🌙  Dark Mode
🌐  Language
ℹ️  About/Info
```

---

## 📐 Layout Grid

### Spacing Scale
```
xs:    ▫️           4px
sm:    ▫️▫️          8px
md:    ▫️▫️▫️         12px
base:  ▫️▫️▫️▫️        16px
lg:    ▫️▫️▫️▫️▫️       20px
xl:    ▫️▫️▫️▫️▫️▫️      24px
xxl:   ▫️▫️▫️▫️▫️▫️▫️▫️    32px
xxxl:  ▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️  40px
```

### Typography Scale
```
xxxl: 32px  PAGE TITLE
xxl:  24px  Section Header
xl:   20px  Card Title
lg:   18px  Large Text
base: 16px  Body Text
sm:   14px  Secondary Text
xs:   12px  Label Text
xxs:  10px  Tiny Text
```

### Border Radius
```
sm:   ▢  8px   Small elements
md:   ▢  12px  Medium elements
lg:   ▢  16px  Large cards
xl:   ▢  20px  XL elements
full: ●  999px Circular
```

---

## 🎭 Component Anatomy

### Card Component
```
┌─────────────────────────┐ ← 2px border (#E5E5E5)
│  ← 16px padding         │
│                         │
│    Card Content         │
│                         │
│         16px padding → │
└─────────────────────────┘
     ↓ Shadow (if elevated)
```

### Button Component
```
┌─────────────────┐
│  ← Padding      │
│                 │
│  Button Text    │  ← Font: Bold, 16px
│                 │
│      Padding → │
└─────────────────┘
Border Radius: 16px
Min Width: Based on text
```

### Lesson Node
```
        ●  ← Badge (if completed)
    ╱━━━━━╲
   ╱   📚   ╲  ← Icon (32px)
  ╱         ╲
 ╱━━━━━━━━━━━╲
     Unit 1     ← Label (12px)
     
Circle: 70px diameter
Border: 4px (#E5E5E5 or #58CC02)
```

---

## 🎬 Interaction States

### Button States
```
Normal:   ┌─────────┐
          │ Button  │
          └─────────┘

Hover:    ┌─────────┐  (Slightly darker)
          │ Button  │
          └─────────┘

Pressed:  ┌─────────┐  (70% opacity)
          │ Button  │
          └─────────┘

Disabled: ┌─────────┐  (50% opacity)
          │ Button  │
          └─────────┘
```

### Card States
```
Normal:   ┌─────────┐
          │  Card   │
          └─────────┘

Selected: ┌─────────┐  (Blue border)
          │  Card   │  (Light blue bg)
          └─────────┘

Correct:  ┌─────────┐  (Green border)
          │  Card   │  (Light green bg)
          └─────────┘

Wrong:    ┌─────────┐  (Red border)
          │  Card   │  (Light red bg)
          └─────────┘
```

---

## 📱 Responsive Behavior

### Small Phones (iPhone SE)
- 2 columns in grids
- Smaller touch targets (56px)
- Compact spacing

### Standard Phones (iPhone 14)
- 2 columns in grids
- Standard touch targets (64px)
- Normal spacing

### Large Phones (iPhone 14 Pro Max)
- 2-3 columns in grids
- Large touch targets (72px)
- Generous spacing

### Tablets (iPad)
- 3-4 columns in grids
- Extra padding
- Larger typography

---

## 🎨 Design Patterns

### 1. Card-Based Layout
All content in elevated cards with consistent padding

### 2. Bottom Tab Navigation
5 tabs, always visible, active state highlighted

### 3. Header Stats Bar
Persistent stats (streak, gems, hearts) at top

### 4. Progressive Disclosure
Show only relevant information, hide complexity

### 5. Immediate Feedback
Every action gets instant visual response

### 6. Gamification First
Everything rewards and motivates the user

---

## 🎯 Touch Targets

Minimum touch target sizes:

```
Button:        64x44 px
Tab Bar Item:  72x56 px
Card:          Full width, 80px+ height
Lesson Node:   70x70 px
Icon Button:   44x44 px
```

---

## ✨ Visual Hierarchy

```
Level 1: Page Title (xxxl, bold)
    ↓
Level 2: Section Header (xxl, bold)
    ↓
Level 3: Card Title (xl, semibold)
    ↓
Level 4: Body Text (base, regular)
    ↓
Level 5: Secondary Text (sm, regular)
    ↓
Level 6: Labels (xs, regular)
```

---

## 🎨 Animation Guidelines

### Timing
- Fast: 150ms - Button presses
- Normal: 300ms - Screen transitions
- Slow: 500ms - Complex animations

### Easing
- Ease-out: Entering elements
- Ease-in: Exiting elements
- Ease-in-out: Position changes

### Types
- Fade: Opacity transitions
- Slide: Position transitions
- Scale: Size transitions
- Spring: Bouncy animations

---

This visual guide helps understand the design system at a glance! 🎨

