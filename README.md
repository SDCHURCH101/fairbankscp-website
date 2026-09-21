# fairbankscp.com

Static site for Fairbanks Commercial Properties, served from GitHub Pages at
**https://www.fairbankscp.com**.

## Structure

Directory-style URLs, matching the URLs the previous Tilda site had indexed
(`/about/`, `/portfolio/`, `/insights/`, `/tpost/<slug>/`), so existing search
results and inbound links keep working. Assets are referenced root-relative
from `/assets/`.

```
index.html              /
about/ portfolio/ portfolio_fairbanks/ leasing/
investors/ insights/ contact/ privacy/ terms/
tpost/<slug>/           Insights posts
listings/<slug>/        Rental and space listings
assets/                 css, js, fonts, images
assets/fcp/             language + currency bar, post popup
thanks.html             form confirmation (noindex)
404.html                not-found page
CNAME robots.txt sitemap.xml
```

## Forms

All 20 forms post to **FormSubmit** and forward to `maiia@fairbankscp.com`.

> **One-time activation required.** The first submission triggers a confirmation
> email from FormSubmit to that address. Until someone clicks the link in it,
> submissions are NOT delivered. Send one test enquiry after go-live and click
> the link.

Success redirects to `/thanks.html`. A hidden `_honey` field catches bots.
To change the destination address, edit the `action` on each form.

## What is self-contained

The Tilda CMS, catalog and product scripts were removed. Nothing calls Tilda at
runtime. Insights cards, the portfolio listings and the "See also" blocks are
static, built from data captured from the previous site.

## Language and currency

`assets/fcp/intl.js` provides 100 languages (Google Translate, loaded only when a
non-English language is chosen) and 62 currencies.

Exchange rates are **indicative and hardcoded** - edit `RATES_AS_OF` and the
`CURR` table at the top of that file, or wire it to a live FX API.

## Editing content

This is hand-edited HTML. There is no CMS. To change copy, edit the relevant
`index.html`. Keep `sitemap.xml` in step when adding or removing pages.
