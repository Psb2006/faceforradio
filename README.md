# A Face For Radio — website

A plain HTML/CSS/JS site for the CamFM show. No build step, no framework —
just files you can edit by hand and deploy anywhere that serves static files.

## Folder structure

```
/index.html          Home page
/about.html           About Patrick / the show
/listen.html          Show times, listen live, catch up, "not on this week" notice
/news.html            Full Music News list
/contact.html         Feedback form, socials
/assets/css/style.css All styling — colours and fonts are CSS variables at the top
/assets/js/main.js     Mobile nav menu toggle
/assets/js/news.js     Loads data/news.json onto the Home and Music News pages
/assets/js/notice.js   Loads data/notice.json onto the Listen page
/data/news.json        The music news items — edit this to add a new entry
/data/notice.json      The "not on this week" banner — edit this to switch it on/off
```

## Previewing it locally

Because the site loads `data/news.json` with JavaScript, opening `index.html`
by double-clicking it won't quite work in every browser (browsers block that
kind of file loading for security reasons when there's no server involved).
Instead, run a tiny local server from this folder:

**Using Python (usually already installed on Mac/Linux, and on Windows if you've installed it):**

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

**Using Node.js**, if you have it installed:

```bash
npx serve
```

It'll print a `localhost` address to open.

Either way, stop the server afterwards with `Ctrl+C` in the terminal.

## Adding a new Music News item

Open `data/news.json`. It's a list of entries like this:

```json
{
  "date": "2026-08-18",
  "headline": "Replace me with your first headline",
  "body": "A couple of sentences, same as you'd say them on air."
}
```

To add a new item:

1. Copy one whole `{ ... }` block (including the curly braces).
2. Paste it above or below an existing one.
3. Add a comma after the closing `}` of whichever block comes first.
4. Fill in a new `date` (format: `YYYY-MM-DD`), `headline`, and `body`.

You don't need to worry about ordering them — the site always sorts by date,
most recent first. If the page shows a "couldn't load the news" error, the
most common cause is a small typo in the JSON (a missing comma or quote mark)
— any online "JSON validator" tool can point out exactly where.

## Adding a "not on this week" notice

Open `data/notice.json`:

```json
{
  "active": false,
  "message": "No show this week — back next Tuesday!"
}
```

Set `"active"` to `true` and edit the `"message"` text to show a banner at
the top of the Listen page. Set it back to `false` (or leave the message as
you like) to hide it again once the show's back to normal.

## Updating the logo

The header logo lives at `assets/img/logo-f4r.jpg`, and the CamFM logo in
the footer lives at `assets/img/logo-camfm.png`. To replace either:

1. Add the new image file to `assets/img/`.
2. In each HTML file, update the `src` on the matching `<img>` tag — the
   header logo is inside the `<a class="brand">` link near the top, and the
   CamFM logo is inside the "Station" column of the footer.
   Do this in `index.html`, `about.html`, `listen.html`, `news.html`, and
   `contact.html` — each page has its own copy of the header and footer.

## Updating social links

Social links live in the footer of every page, and again on the Contact
page. Search for `instagram.com` across the HTML files to find and edit them
all — there's no separate config file for this, since there are currently
only two links to manage.

## Deploying

This is a static site, so any of the following work. Pick whichever you're
most comfortable with — none of them need any special configuration.

**GitHub Pages**
1. Push this folder to a GitHub repository.
2. In the repo's Settings → Pages, set the source to the `main` branch, root
   folder.
3. GitHub gives you a URL a minute or two later.

**Netlify**
1. Drag and drop this whole folder onto [app.netlify.com/drop](https://app.netlify.com/drop) — or connect the GitHub repo for automatic redeploys whenever you push a change.

**Vercel**
1. Import the GitHub repository at [vercel.com/new](https://vercel.com/new), or run `npx vercel` from inside this folder.
2. No build command is needed — leave that field blank.

**Cloudflare Pages**
1. Connect the GitHub repository, or drag-and-drop the folder, at the Cloudflare Pages dashboard.
2. No build command needed here either.

## Known placeholders to fill in before launch

- **Contact email** — `contact.html` has a spot marked for a show email
  address once you have one; the feedback form works fine without it.
- **Bluesky** — left out of the site for now until the handle/URL is
  confirmed. Add a `<a class="social-link">` entry next to the Instagram
  links in each footer (and on `contact.html`) once you have it.
