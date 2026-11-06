# Customization Guide

Use this guide when adapting Vertex for a real consulting or advisory firm.

Most of the site is built from five content collections: **services**, **industries**, **work**, **insights**, and **people**. An industry names the services it uses, a case study names its industry, services and team, an insight names its authors, industries and services, and a person names the industries and services they work in. Pages and cross-links are derived from those references. Copy and data that are not long-form content live in small files in [src/config](./src/config).

## Site Settings

Edit [src/config/site.ts](./src/config/site.ts) first. It controls the firm `name` and `legalName`, the tagline, default metadata, canonical domain, language and date locale, the `email` and `phone` used across the site, the calls to action, the announcement bar, the consultation, contact, and newsletter forms, the `legal` line at the foot of every page, and social links.

Update `siteConfig.siteUrl` before building for production. Canonical URLs, social image URLs, RSS, robots, sitemap, and JSON-LD all depend on it.

`siteConfig.actions.primary` is the "Book a consultation" button in the header, the mobile menu, the hero, and the closing panels; `siteConfig.actions.secondary` is the outline button beside it in the hero.

`siteConfig.announcement` controls the bar above the header. With `enabled: true` it shows the next event that has not started yet at build time, linking to its page, with `cta` as the link text. With no upcoming event, or `enabled: false`, it is left out. Rebuild the site after an event passes so the bar moves on.

`siteConfig.legal` is the small print under the footer. The demo text says the firm is fictional; replace it with your own line, or set it to an empty string to remove it.

`siteConfig.socials` are the icon links in the footer, each with a `label` and an `href`. The label picks the icon through [src/lib/socials.ts](./src/lib/socials.ts), which knows Bluesky, Facebook, GitHub, Instagram, LinkedIn, Mastodon, RSS, Threads, X, and YouTube.

## Logo

The whole logo, mark and wordmark together, is one file: [src/assets/brand/logo.svg](./src/assets/brand/logo.svg), drawn in `currentColor` so it follows the text colour. [src/components/ui/Wordmark.astro](./src/components/ui/Wordmark.astro) inlines it in the header and footer. Replace the file with your own and keep `fill="currentColor"`; set its `viewBox` tight to the artwork so it sizes correctly.

The mark on its own is [src/assets/brand/logomark.svg](./src/assets/brand/logomark.svg). The favicon is [public/favicon.svg](./public/favicon.svg), the mark in mint on a charcoal tile.

Right-clicking the logo opens a small menu, [src/components/chrome/LogoMenu.astro](./src/components/chrome/LogoMenu.astro), to copy the logo as SVG or download it; the downloaded copy is filled with a solid colour set in that file.

## Navigation

The header reads `navigation` in [src/config/site.ts](./src/config/site.ts). An item with `menu` opens a panel instead of linking straight away:

- `services` and `industries` list their collection with icons and summaries; hovering or focusing an entry shows its photo and headline figure on the right.
- `insights` lists the insight types and shows the newest entry with a cover.
- `firm` lists `firmMenu` and shows a careers card with the number of open roles.

All menus share one panel. It takes the height of the open menu, and moving between triggers slides the menus past each other, left or right in the order of the navigation. Panels open on hover with a fine pointer, on click, or with `Arrow Down` from the trigger, and close with `Escape`.

The header is sticky and overlaps the top of the page, so the first `<section>` in `<main>` gets padding to clear it. At the top of the page the bar is clear, with light text when the opening section has `data-tone="dark"`; once the page scrolls it is white, slides away while scrolling down and returns on the way up. Pass `tone="light"` to `BaseLayout` for a page that opens on a light section, so the header starts light before the script runs. An open menu always reads as one white sheet.

Below `64rem` the links move into a full-screen menu with each panel as an expandable group. The footer columns are `footerNavigation`, and the links under the footer are `legalNavigation`.

## Services

Each service is a folder in [src/content/services](./src/content/services) with an `index.md` and its `cover.jpg`. The folder name is the id and the URL: `digital-ai/` becomes `/services/digital-ai/`. The body of `index.md` is the overview on the service page.

| Field         | Notes                                                                               |
| ------------- | ----------------------------------------------------------------------------------- |
| `title`       | Name of the practice.                                                               |
| `summary`     | One line, up to 110 characters, for cards and the menu.                             |
| `description` | Meta description and the overview lead on the service page.                         |
| `icon`        | A Lucide icon name from `src/icons/lucide`.                                         |
| `cover`       | The photo, relative to `index.md`, with `coverAlt`.                                 |
| `outcomes`    | Up to three `{ value, label }` figures. The first appears on cards and in the menu. |
| `questions`   | Up to six questions a client brings, listed on the service page.                    |
| `offerings`   | `{ title, body }` items for "How the practice can help".                            |
| `faq`         | `{ question, answer }` pairs.                                                       |
| `order`       | Lower comes first.                                                                  |

A service page also lists the case studies and insights that name it, the people who work in it, and the industries that use it.

## Industries

Industries live in [src/content/industries](./src/content/industries) with the same shape: `title`, `summary`, `description`, `icon`, `cover` and `coverAlt`, up to three `figures`, `shifts` as `{ title, body }` for "What is shifting", and `services`, a list of service folder names. An industry page shows the services it names, its case studies, the people and insights that name it, and the quote from the first of its case studies that has one.

## Case Studies

Case studies are folders in [src/content/work](./src/content/work). Clients stay anonymous, so `client` is a short description such as "A regional retail bank in the United Kingdom". Add `description`, `cover` and `coverAlt`, up to four `results` as `{ value, label }` (the first is the headline on cards and slices), an `industry`, one or more `services`, the `team` by people folder name, `duration`, `year`, and an optional `quote` with `text` and `role`. `featured: true` moves a case to the front; `order` sorts within that. The body tells the story, usually under "The challenge", "Our approach" and "The impact".

The first six cases fill the slices on the homepage, and the work index filters every case by industry and service in the browser.

## Insights

Insights are folders in [src/content/insights](./src/content/insights). Each has a `title`, `description`, `date`, optional `updated`, a `type` (`articles`, `reports` or `events`; labels in [src/config/insights.ts](./src/config/insights.ts)), `authors` by people folder name, an optional `cover` with `coverAlt` and `coverCredit`, and optional `industries` and `services`. Set `featured: true` to pin an entry to the lead slot, and `draft: true` to keep it out of production.

- **Reports** add a `report` block: `pages`, `file` (a path such as `/reports/name.pdf`, with the PDF in `public/reports`), and up to three `findings` printed above the text.
- **Events** add an `event` block: `start` and optional `end` as ISO date-times with their offset, `venue`, `city`, `format` (`In person`, `Online` or `Hybrid`) and an optional `registerUrl`. Times show in the event city's time zone when that city is one of your offices, and in UTC otherwise. An event that has started by the time the site is built says so instead of offering registration, so rebuild after each event.

Entries are paginated nine to a page, with the lead entry large on the first page of the index. Each type has its own archive at `/insights/type/<type>/`.

## People

People are folders in [src/content/people](./src/content/people) with an `index.md` and a `portrait.jpg`: `name`, `role`, `group` (one of `peopleGroups` in [src/config/people.ts](./src/config/people.ts)), `office` (an office id), a one-line `focus`, optional `email` and `linkedin`, the `industries` and `services` they work in, and `order`. The body is their bio. Each person has a profile page listing the case studies whose `team` names them and the insights they wrote.

## Offices

Offices are `offices` in [src/config/offices.ts](./src/config/offices.ts): an `id`, `city`, `country`, `address` lines, `phone`, `email`, an IANA `timeZone`, and `hq` for the headquarters. Each office's photo is `src/assets/images/offices/<id>.jpg`. Offices appear on the contact and about pages with their local time, and in the footer.

## Careers

[src/config/careers.ts](./src/config/careers.ts) holds the careers page copy, the three paths, the figures in the dark band, the hiring steps, and `roles`. Each role has a `title`, a `team`, an `office` id, a `type`, and the `applyUrl` its row links to. The careers card in the firm menu counts the roles.

## Consultation

The booking flow at `/consultation/` reads [src/config/consultation.ts](./src/config/consultation.ts): the heading, company `sizes`, `timings`, the call `slots`, how many working `days` the date picker offers, the "What happens next" steps, and a FAQ. Topics come from the services collection, and industries from the industries collection. The partner shown in the summary is the first leader or partner who works in the industry the visitor picks.

The form stays a preview until `siteConfig.consultation` has `enabled: true` and an `action`. Until then it validates each step and ends on a thank-you panel that says nothing was sent. Without JavaScript, all four steps show as one long form and the date picker becomes a text field.

## Contact

The contact page reads [src/config/contact.ts](./src/config/contact.ts) for its heading, topics and desks. The form stays disabled until `siteConfig.contact` has `enabled: true` and an `action`.

## Legal Pages

Privacy and terms are Markdown files in [src/pages/legal](./src/pages/legal), set in [src/layouts/LegalLayout.astro](./src/layouts/LegalLayout.astro). Change `updated` in the frontmatter whenever the text changes.

## Homepage

The homepage copy is in [src/config/home.ts](./src/config/home.ts): the hero eyebrow, two-line title and lead, the credentials grid, and the headings, approach steps, reasons, FAQ and closing panel. The hero has no photo; its background is the `.glass` arrangement described under Theme Tokens.

## About

The about page reads [src/config/about.ts](./src/config/about.ts): the heading, the story, figures, values, the timeline and recognition. Its photo is `src/assets/images/about.jpg`, which also appears beside the reasons on the homepage.

## Images

Photographs use Astro's image pipeline and are served as responsive WebP at build time. Service, industry, case study and insight covers sit beside their `index.md`; portraits sit beside each person's bio. Insight covers credit their photographer under the image, and the others are credited in the README.

## Sharing, Search and Feeds

Every insight has a Share button. On phones it opens the device's own share sheet; elsewhere, and where the browser can't share natively, it opens [src/components/chrome/ShareSheet.astro](./src/components/chrome/ShareSheet.astro). Add or remove networks in the `targets` and `extraTargets` lists at the top of that file. Search covers insights: the Search button on the insights pages, `Ctrl + K` or `Command + K`, or `/` opens the palette in [src/components/chrome/SearchDialog.astro](./src/components/chrome/SearchDialog.astro), and `/insights/search/` lists results without the palette. Both rank with [src/lib/search.ts](./src/lib/search.ts).

`/rss.xml` carries the twenty newest insights. Pages with a photo share it cropped to 1200x630; every other page uses `public/og-image.png`. Structured data is built in [src/lib/schema.ts](./src/lib/schema.ts).

## Newsletter

The signup in the footer is provider-neutral. Configure `siteConfig.newsletter` with `enabled: true` and an `action`; until then the field is disabled and a note says so.

## Adding Pages

Wrap a new page in `BaseLayout` and open it with `PageHeader` (a dark band with a breadcrumb, an eyebrow, a two-tone title and a lead; extra content goes in its slot). Inside, use `.shell` for the page width, `.section` for vertical spacing, `SectionHead` for headings (`align="center"` or `"split"`), `on-night glass` with `data-tone="dark"` for a dark section with the ribbed-glass background (add `glass-2` to `glass-5` for a different arrangement of light), `card` for a grey panel, `result` for a figure on a pale mint ground, and `btn btn-primary`, `btn btn-light` or `btn btn-outline` for buttons. Primary buttons take an `<Arrow />` as their last child, which sits in its own square; outline buttons go without.

Titles passed as two strings, such as `["Thinking from", "our partners"]`, print in two tones: the first quiet, the second strong.

## Icons

Interface icons come from [Lucide](https://lucide.dev/) in [src/icons/lucide](./src/icons/lucide), and social marks from Bootstrap Icons in [src/icons/bootstrap](./src/icons/bootstrap). Use `<Icon name="compass" />` or `<Icon name="social-linkedin" />`. To add an icon, drop its SVG from Lucide into the folder.

## Theme Tokens

Colours, the radii and the page width are custom properties at the top of [src/styles/global.css](./src/styles/global.css), exposed to Tailwind as utilities (`bg-page`, `text-muted`, `bg-night`, `text-accent`, and so on).

- `--page` is the white ground, `--surface` the white of cards and forms, and `--wash` and `--sunken` the light greys of panels.
- `--ink` is the near-black text, with `--ink-soft`, `--muted` and `--faint` for quieter text.
- `--night` is the charcoal of dark sections and the footer, with `--night-raised`, `--night-line`, `--night-ink` and `--night-muted`.
- `--accent` is mint for button squares and highlights on dark grounds, `--accent-ink` the deeper green for text on light grounds, and `--accent-soft` the pale mint behind results.
- `--iris` is the periwinkle of the announcement bar.
- `--radius-sm` rounds buttons and fields, `--radius` cards and photos, and `--radius-lg` large panels.
- `--measure` is the content width and `--gutter` the side padding, used by `.shell`.

The type scale is the `--text-display-*`, `--text-title`, `--text-lead` and `--text-stat` tokens in the `@theme` block.

The dark backgrounds are pure CSS, in the `.glass` rules of `global.css`: radial gradients of mint, periwinkle, sand and teal seen through vertical ribbed glass, with film grain over them. `.glass` is the arrangement on the homepage hero and `.glass-2` to `.glass-5` move the light around; each sets its gradients in `--glass`. `PageHeader` takes a `glass` prop from 1 to 5, and `--rib` sets the width of the ribs.

## Fonts

Vertex self-hosts **Mona Sans**, a variable sans with weight and width axes, for everything, in [public/fonts](./public/fonts) with its license. To swap typefaces, replace the `@font-face` rules and the `--font-sans` token in `global.css`, and update the font preload in [src/layouts/BaseLayout.astro](./src/layouts/BaseLayout.astro).

## Motion

- Headers rise in on load, and sections below the fold reveal as they scroll into view.
- Menus slide past each other in the shared header panel.
- The case study slices open out one after another and pause while hovered or focused.
- A reading-progress line runs along the top of each insight.
- Everything settles into a still frame under `prefers-reduced-motion: reduce`.
