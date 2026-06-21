# John's Shuttle — Booking Site

A single-page bilingual (English / Chinese) booking site for John's shuttle service.
No backend, no database — booking details are sent straight to John's phone via SMS, and customers pay by PayID.

## What's in this repo

- `index.html` — the entire site (HTML, CSS, and JS in one file)

## Deploying with GitHub + Render (free, static site)

### 1. Push this to GitHub

If you don't already have a repo:

1. Go to [github.com/new](https://github.com/new) and create a new repository (e.g. `johns-shuttle`)
2. Don't add a README or .gitignore when creating it (you already have files)
3. On your own computer, in the folder containing `index.html`, run:

   ```bash
   git init
   git add index.html README.md
   git commit -m "Initial shuttle booking site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/johns-shuttle.git
   git push -u origin main
   ```

   (Replace `YOUR_USERNAME` and the repo name with your actual GitHub username/repo.)

   No git installed, or want to skip the command line? You can also just drag `index.html` and `README.md` into the GitHub repo page in your browser using "Add file → Upload files," then commit.

### 2. Connect Render

1. Go to [render.com](https://render.com) and sign up / log in (you can sign in with your GitHub account directly)
2. Click **New +** → **Static Site**
3. Connect your GitHub account if prompted, then select the `johns-shuttle` repo
4. Fill in the settings:
   - **Build Command**: leave blank (nothing to build — it's plain HTML)
   - **Publish Directory**: `.` (just a single dot — means "the root of the repo")
5. Click **Create Static Site**

Render will deploy it and give you a live URL like `https://johns-shuttle.onrender.com` within a minute or two.

### 3. Updating the site later

Any time you want to change something (e.g. update the PayID details, change wording, add the car description):

1. Edit `index.html` (in GitHub's web editor, or on your computer)
2. Commit / push the change
3. Render automatically redeploys within a minute or two — no extra steps needed

### 4. Optional: custom domain

If you buy a domain (e.g. `johnsshuttle.com.au`), Render lets you connect it for free under
**Settings → Custom Domains** on your static site dashboard. You'll just update a couple of DNS records with your domain registrar.

## Before going live — checklist

- [ ] Replace the placeholder PayID name (`John [Last Name]`) and bank name with John's real registered PayID details
- [ ] Confirm `0433159888` is correct everywhere (header, footer, SMS link, tap-to-call link)
- [ ] Test the "Send booking by text" button on a real iPhone and a real Android phone
- [ ] Double check the Chinese translations read naturally to a native speaker before publishing
