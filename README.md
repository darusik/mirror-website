# MIRROR 2027 website

Website of **MIRROR: 1st Workshop on Meta-Science in AI Security Research**, co-located with IEEE SaTML 2027 (Reykjavík, May 3, 2027).

The site is plain HTML, CSS, and JavaScript, with no build step. It's served by GitHub Pages from the `docs/` folder.

## Where things live

| What | File |
|---|---|
| Page content (sections, dates, program, organizers) | `docs/index.html` |
| "Moments of reflection" notes | `docs/js/reflections.js` |
| Styles and colours | `docs/css/style.css` |
| Behaviour (navigation, carousel, countdown, extras) | `docs/js/main.js` |
| Logo / favicon | `docs/img/logo.svg`, `docs/favicon.svg` |

Open placeholders are marked with `TODO` comments (`grep -rn TODO docs`).

## Preview locally

```bash
python3 -m http.server 8040 --directory docs
```

Then open http://localhost:8040. (The custom 404 page only shows on GitHub Pages, not with this local server.)

## Publish

Push to `main`. In the repository settings under **Pages**, set the source to branch `main` and folder `/docs`.
