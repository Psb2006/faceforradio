# A Face For Radio — website

A plain HTML/CSS/JS site for the CamFM show. No build step, no framework —
just files you can edit by hand and deploy anywhere that serves static files.

## Folder structure

```
/index.html          Home page — includes the Music News list near the bottom
/about.html           About Patrick / the show
/listen.html          Show times, listen live, catch up, "not on this week" notice
/playlists.html        Full archive of every week's playlist
/contact.html         Feedback form, socials
/assets/css/style.css All styling — colours and fonts are CSS variables at the top
/assets/js/main.js     Mobile nav menu toggle
/assets/js/news.js     Loads data/news.json onto the homepage
/assets/js/notice.js   Loads data/notice.json onto the Listen page
/assets/js/notices.js  Loads data/notices.json into the Notices section on the About page
/assets/js/nowplaying.js Loads data/nowplaying.json into the "what I've been
                        listening to" phone widget on the homepage
/assets/js/playlists.js Loads data/playlists.json onto the homepage teaser
                        and the Playlists page
/data/news.json        The music news items — edit this to add a new entry
/data/notice.json      The "not on this week" banner — edit this to switch it on/off
/data/notices.json     Face For Radio-specific updates shown in the About page's
                        Notices section — not the same file as notice.json above
/data/nowplaying.json  The song/artist/cover shown in the phone widget
/data/playlists.json   Every week's tracklist, plus Spotify/Apple Music links
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

## Editing from a different computer

The site lives in a git repository on GitHub at
`https://github.com/Psb2006/faceforradio`, so you're not tied to the machine
it was first set up on. To work on it somewhere else:

**1. Get the files onto the new machine**

*Using SourceTree:*
1. **File → Clone**
2. Source URL: `https://github.com/Psb2006/faceforradio.git`
3. Pick a destination folder, then **Clone**.

*Using the command line* (e.g. inside VS Code's terminal):
```bash
git clone https://github.com/Psb2006/faceforradio.git
```

Either way, you'll get a full copy of the site — including the logos and
photos — since everything is already committed to the repo.

**2. Set your git identity on that machine** (one-off, so commits stay
consistent no matter where you make them)

```bash
cd faceforradio
git config user.name "Psb2006"
git config user.email "patrickb0412@icloud.com"
```

In SourceTree, you can set the same thing under its repository/user
preferences instead of the command line.

**3. Edit, commit, push**

Open the folder in VS Code (or any editor) and edit files as normal — e.g.
`data/news.json` for a new headline, or any of the `.html` pages. Then:

- **In SourceTree:** the changed files show up under "Unstaged files" — tick
  them, write a commit message, **Commit**, then **Push**.
- **On the command line:**
  ```bash
  git add -A
  git commit -m "update news"
  git push
  ```

The first time you push from a new machine, it'll prompt you to sign in to
GitHub (usually opens a browser window) — that's normal.

**4. Wait a minute**

GitHub Pages automatically rebuilds the live site after every push to
`main`. Give it 30–60 seconds, then refresh
`https://psb2006.github.io/faceforradio/` (lowercase, even though the repo
name has capitals — GitHub Pages always lowercases it in the URL).

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
most recent first. The homepage only displays the 3 most recent items, so
once you've added a new one the oldest of the previous three will quietly
drop off the page (it stays in the file, just isn't shown anywhere). If the
page shows a "couldn't load the news" error, the most common cause is a
small typo in the JSON (a missing comma or quote mark) — any online "JSON
validator" tool can point out exactly where.

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

## Adding a Notice to the About page

The About page has a "Notices" section (between "Hi, I'm Patrick" and "Off
air") for anything Face For Radio-specific — schedule changes, one-off
specials, whatever's worth flagging. Open `data/notices.json`. It's a list
of entries like this:

```json
{
  "date": "2026-09-01",
  "title": "Replace me with your first notice",
  "body": "A sentence or two about what's changed.",
  "image": ""
}
```

To add a new notice:

1. Copy one whole `{ ... }` block (including the curly braces).
2. Paste it above or below an existing one, and add a comma after the
   closing `}` of whichever block comes first.
3. Fill in a new `date` (format: `YYYY-MM-DD`), `title`, and `body`.
4. If you want a photo with it, add the image to `assets/img/notices/`
   and point `"image"` at it, e.g. `"assets/img/notices/my-photo.jpg"`.
   Leave `"image"` as `""` for a text-only notice.

You don't need to worry about ordering the entries — the site always sorts
by date, most recent first, and every notice stays visible (there's no
"most recent 3" limit like the homepage news list). If the page shows a
"couldn't load the notices" error, the most common cause is a small typo
in the JSON (a missing comma or quote mark) — any online "JSON validator"
tool can point out exactly where.

## Updating "What I've been listening to"

The homepage has a phone-shaped widget showing whatever song you're into
that week. Open `data/nowplaying.json`:

```json
{
  "song": "Replace me with a song title",
  "artist": "Replace me with the artist name",
  "albumCover": "assets/img/nowplaying/placeholder-cover.svg"
}
```

To update it:

1. Change `"song"` and `"artist"` to whatever you're listening to.
2. Add the album cover image to `assets/img/nowplaying/` (a square image
   works best — anything roughly 300×300px or larger) and point
   `"albumCover"` at it, e.g. `"assets/img/nowplaying/my-song.jpg"`.

The progress bar, timestamps, and playback controls in the widget are just
decoration (it's not a real, working music player) — only the three fields
above are meant to be edited.

## Adding a new week's playlist

Open `data/playlists.json`. It's a list of entries like this:

```json
{
  "number": 13,
  "date": "2026-06-16",
  "tracks": [
    "Another Nail in My Heart - Squeeze",
    "Leave You - Vulfmon & Jackie Evans"
  ],
  "spotifyUrl": "",
  "appleMusicUrl": ""
}
```

To add this week's playlist:

1. Copy one whole `{ ... }` block (including the curly braces).
2. Paste it above or below an existing one, and add a comma after the closing
   `}` of whichever block comes first.
3. Update `"number"` (the playlist number you'd use on Instagram) and
   `"date"` (format: `YYYY-MM-DD`, the Tuesday the show aired).
4. Replace the `"tracks"` list with each song from that week, one per line,
   in the order they were played — same as you'd type them for the
   Instagram graphic.
5. If you've made a shared playlist on Spotify and/or Apple Music, paste the
   share link into `"spotifyUrl"` and/or `"appleMusicUrl"`. Leave either (or
   both) as `""` if you haven't made one yet — the site simply won't show
   that button until a link is added.

You don't need to worry about ordering the entries in the file — the site
always sorts by date, most recent first. The homepage shows a short preview
of the latest playlist with a link through to the full archive at
`playlists.html`, which lists every playlist in full. If the page shows a
"couldn't load the playlists" error, the most common cause is a small typo
in the JSON (a missing comma or quote mark) — any online "JSON validator"
tool can point out exactly where.

**Getting a Spotify share link:** build the playlist in the Spotify app →
tap the three dots (•••) → **Share** → **Copy Link to Playlist**.

**Getting an Apple Music share link:** build the playlist in the Music app →
tap the three dots (•••) → **Share Playlist** → **Copy Link**.

## Updating the logo

The header logo lives at `assets/img/logo-f4r-transparent.png` (a
transparent-background version so it sits cleanly on any colour — the
original flat photo/JPG version is kept at `assets/img/logo-f4r.jpg` as a
backup/source), and the CamFM logo in the footer lives at
`assets/img/logo-camfm.png`. To replace either:

1. Add the new image file to `assets/img/`.
2. In each HTML file, update the `src` on the matching `<img>` tag — the
   header logo is inside the `<a class="brand">` link near the top, and the
   CamFM logo is inside the "Station" column of the footer.
   Do this in `index.html`, `about.html`, `listen.html`, and `contact.html`
   — each page has its own copy of the header and footer.

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

- **Bluesky** — left out of the site for now until the handle/URL is
  confirmed. Add a `<a class="social-link">` entry next to the Instagram
  links in each footer (and on `contact.html`) once you have it.
