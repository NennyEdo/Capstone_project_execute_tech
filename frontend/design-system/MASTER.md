# Execute Tech Academy — Design System (Master)

> EduTech premium · Modern · Accessible · Career-focused

## Pattern
Hero-centric landing with social proof, feature sections, testimonials, and FAQ.

## Style
Modern minimal with subtle glassmorphism, soft gradients, and generous whitespace.

## Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Navy | `#0B1F3A` | Hero backgrounds, footer |
| Brand Blue | `#003399` | Primary actions, links |
| Accent Teal | `#0EA885` | Secondary CTAs, highlights |
| Surface | `#F8FBFF` | Page backgrounds |
| Text Primary | `#0F172A` | Headings, body |
| Text Muted | `#475569` | Supporting copy |

## Typography
- **Headings**: Plus Jakarta Sans (600–800)
- **Body**: Inter (400–500)
- **Line height**: 1.5–1.75 for body
- **Min body size**: 16px on mobile

## Effects
- Shadows: `shadow-soft`, `shadow-glow`
- Transitions: 150–300ms on color/opacity/transform
- Border radius: 24–36px for cards, full for buttons
- Glass: `bg-white/80 backdrop-blur-xl` (light mode)

## Anti-patterns
- No emoji icons — use SVG (Heroicons/Lucide/react-icons)
- No layout-shifting hover scale on cards
- No gray-400 for body text in light mode
- Always `cursor-pointer` on interactive elements
- Visible focus rings on all interactive elements

## Accessibility
- 4.5:1 contrast minimum
- `prefers-reduced-motion` respected
- Form labels with `htmlFor`
- Icon-only buttons need `aria-label`
