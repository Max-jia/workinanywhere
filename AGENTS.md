## Article Writing Rules

Every new article must pass these checks before being committed.

### Content Rules (Humanizer)

Based on `.agents/skills/humanizer/SKILL.md`. Scan every article for:

**Must remove (hard blocks):**
- Em dashes `—` and en dashes `–` — replace with comma, period, or colon
- AI vocabulary: crucial, pivotal, vibrant, tapestry, delve, showcase, underscoring, intricate, fostering, compelling
- Promotional language: boasts, nestled, breathtaking, stunning, must-visit, hidden gem
- Conversational rhetorical openers: "Here's the thing," "Honestly?", "Look," "Let's be honest," "The honest answer:"
- Persuasive authority tropes: "The real question is," "at its core," "fundamentally," "what really matters"
- Signposting: "Let's dive in," "here's what you need to know," "without further ado"
- Vague attributions: "Experts argue," "Industry reports show," "Observers have noted"
- Rule of three forcing (3 items only when genuinely 3 items)
- Generic positive conclusions: "The future looks bright," "Exciting times lie ahead"
- Filler: "In order to," "Due to the fact that," "It is important to note that"
- Sycophantic tone: "Great question!," "You're absolutely right!"

**Must have (quality requirements):**
- First person where natural — at least one "I" or concrete personal judgment
- Specific data (real numbers, company names, prices)
- Mixed sentence lengths — short punchy lines next to longer flowing ones
- Unresolved tension or mixed feelings where appropriate (not every take needs to be clean)
- Varied openings — don't start every paragraph the same way

### Verifiability Rule

Every factual claim and data point in an article must be traceable to a real, public source. Nothing gets written into an article unless it can be verified.

**Allowed data sources:**
- Government websites (visa requirements, tax rules, official statistics)
- Company career pages and official announcements (salary ranges, hiring status, policy changes)
- Published industry reports (FlexJobs, MBO Partners, Nomads.com, Buffer State of Remote Work)
- Reputable news outlets (Reuters, BBC, NYT, Bloomberg, TechCrunch)
- Public databases (Numbeo cost of living, Nomad List city data, Speedtest Global Index)
- Platform marketplace data (Upwork, Glassdoor, Indeed salary insights)

**Never do:**
- Invent a statistic to make a point stronger ("78% of nomads say...")
- Attribute data to a vague source ("studies show," "research indicates," "industry reports suggest")
- Use AI-generated numbers that look plausible but cannot be verified
- Cite a source you have not actually checked exists

**At the bottom of every article, include a source line:**
```
*Source: [what you referenced]. Data verified as of [month year].*
```

If a claim cannot be traced to one of the allowed sources, either find a real source or remove the claim. Approximate ranges are OK ("$15 to $22 an hour" based on Glassdoor listings) — fabricated precise numbers are not.

### Format Rules

- Frontmatter: `title`, `description`, `pubDate`, `category`, `heroImage`
- `pubDate` must be spread out — no more than 3 articles on the same day
- `heroImage` must be unique — never reuse an image already assigned to another article
- Category must be one of: `city-guides`, `tools`, `jobs`, `lifestyle`, `finance`
- End each article with `**Next reads:**` linking to 2-4 related articles on the site

### Image Rules

- Every article needs a unique hero image
- Source from Pexels (free commercial use): search `https://www.pexels.com/search/{keyword}/`
- Download: `curl -sL "https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?w=1200&q=80" -o "src/assets/{descriptive-name}.jpg"`
- Run `grep -h "heroImage:" src/content/blog/*.md | sort | uniq -c | sort -rn | awk '$1 > 1'` to verify uniqueness before commit

### Pre-commit Checklist

```bash
# 1. Humanizer scan
grep -n "—\|–\|crucial\|pivotal\|vibrant\|tapestry\|delve\|showcase\|boasts\|nestled\|breathtaking\|stunning\|Here's the thing\|Honestly?" src/content/blog/new-article.md

# 2. Unique image
grep -h "heroImage:" src/content/blog/*.md | sort | uniq -c | sort -rn | awk '$1 > 1 {print "DUPLICATE: "$0}'

# 3. Date distribution
grep -h "pubDate:" src/content/blog/*.md | sed 's/pubDate: //' | sort | uniq -c | sort -rn | head -5

# 4. Build
npm run build
```

---

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
