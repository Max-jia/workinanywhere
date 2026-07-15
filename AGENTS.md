## Article Writing Rules

Every new article must pass these checks before being committed. These rules are based on competitive research of top digital nomad blogs (Nomadic Matt, The Broke Backpacker, Nomad List) and a data study of 912 million blog posts.

---

### 1. Article Structure & Format

**Headline rules (based on 912M blog post analysis):**
- Target 14-17 words — gets 76.7% more social shares than short headlines
- Question headlines ("How to...?" "Can You...?") get 23.3% more shares
- Place the primary keyword in the first 3 words when possible
- Never use clickbait that overpromises and underdelivers

**Article length:**
- Core/guide articles: **2,500+ words** (long-form gets 77.2% more backlinks)
- News/roundup articles: 1,200-1,800 words
- Minimum for any article: 800 words
- If an article is under 800 words, it is not done. Add concrete examples, data, or a personal story.

**Structure pattern (for every article):**
1. **Hook (first 3 sentences)**: Answer what the reader came for. No fluff intro.
2. **Body**: Use ## headings for major sections, ### for sub-sections. Each section delivers on a specific promise from the title.
3. **Personal anchor**: Somewhere in the article, include a first-person observation. "I tested this." "When I was in Chiang Mai..." "Here is what surprised me." 
4. **Data or specific detail**: Every section should have at least one of: a real number, a company name, a price, a date, or a quoted rule/regulation.
5. **Source footer**: End with `*Sources: [list]. Data verified as of [month year].*`
6. **Next reads**: 2-4 internal links to related articles

**Article formats by goal (use the right format for the job):**

| Goal | Best Format | Example Title Pattern |
|------|-------------|----------------------|
| Backlinks | Original research / data report | "We Surveyed X People: Here Is..." |
| Shares | "Why" post or listicle | "Why [City] Is Overrated..." or "10 Tools..." |
| SEO traffic | Comprehensive guide | "[Topic] 2026: The Complete Guide" |
| Conversions | Comparison / "Best X" | "A vs B vs C: Which Is Best for..." |

---

### 2. Content Quality Rules

#### 2a. Humanizer (Remove AI Patterns)

Based on `.agents/skills/humanizer/SKILL.md`. Scan every article for:

**Must remove (hard blocks):**
- Em dashes `—` and en dashes `–` — replace with comma, period, or colon
- AI vocabulary: crucial, pivotal, vibrant, tapestry, delve, showcase, underscoring, intricate, fostering, compelling, elevate, seamless, unleash, game-changer
- Promotional language: boasts, nestled, breathtaking, stunning, must-visit, hidden gem
- Conversational rhetorical openers: "Here's the thing," "Honestly?", "Look," "Let's be honest," "The honest answer:"
- Persuasive authority tropes: "The real question is," "at its core," "fundamentally," "what really matters"
- Signposting: "Let's dive in," "here's what you need to know," "without further ado"
- Vague attributions: "Experts argue," "Industry reports show," "Observers have noted"
- Rule of three forcing (3 items only when genuinely 3 items)
- Generic positive conclusions: "The future looks bright," "Exciting times lie ahead"
- Filler: "In order to," "Due to the fact that," "It is important to note that"
- Sycophantic tone: "Great question!," "You're absolutely right!"
- Fragmented headers: a heading followed by a one-line paragraph that just restates it
- Manufactured punchlines: stacks of short dramatic sentences in a row

**Must have (quality requirements):**
- First person where natural — at least one "I" or concrete personal judgment per article
- Specific data (real numbers, company names, prices, dates)
- Mixed sentence lengths — short punchy lines next to longer flowing ones
- Unresolved tension or mixed feelings where appropriate (not every take needs to be clean)
- Varied openings — don't start every paragraph the same way

#### 2b. Verifiability

Every factual claim and data point must be traceable to a real, public source.

**Allowed data sources:**
- Government websites (visa requirements, tax rules, official statistics)
- Company career pages and official announcements (salary ranges, hiring status, policy changes)
- Published industry reports (FlexJobs, MBO Partners, Nomads.com, Buffer State of Remote Work)
- Reputable news outlets (Reuters, BBC, NYT, Bloomberg, TechCrunch)
- Public databases (Numbeo, Nomad List, Speedtest Global Index)
- Platform marketplace data (Upwork, Glassdoor, Indeed salary insights)

**Never do:**
- Invent a statistic ("78% of nomads say...")
- Attribute data to a vague source ("studies show," "research indicates")
- Use AI-generated numbers that look plausible but cannot be verified
- Cite a source you have not actually checked exists

**Source footer format (required for every article):**
```
*Sources: [specific institutions, reports, databases used]. Data verified as of [month year].*
```

---

### 3. Authority & Trust Building

Top digital nomad blogs all have one thing we currently lack: **a clear human author behind the content.** Every article going forward should:

- **Claim authorship**: Add a byline or first-paragraph identity hook. "I have been a digital nomad since [year]..." or "After [X] years of remote work..."
- **Use proof of experience**: Mention specific cities lived in, specific tools tested, specific experiences had. Not "many nomads struggle with visas" but "when I applied for the D8 visa in Lisbon, the consulate asked for..."
- **Be transparent about limitations**: If you have not been to a city, say so. "I have not been to Buenos Aires, so I asked three nomads who have been there for the past year."

---

### 4. Monetization Readiness

Every article is a potential revenue source. When writing, identify:

- **1 affiliate opportunity**: Is there a tool, service, or product mentioned that has an affiliate program? (SafetyWing, Airalo, Wise, NordVPN, Booking.com, FlexJobs)
- **1 internal conversion**: What should the reader do next? (Subscribe, read another article, sign up for a newsletter)
- Articles in the `tools` and `finance` categories have the highest affiliate potential and should prioritize product recommendations with clear comparison tables.

---

### 5. Format Rules

- Frontmatter: `title`, `description`, `pubDate`, `category`, `heroImage`
- `pubDate` must be spread out — no more than 3 articles on the same day
- `heroImage` must be unique — never reuse an image already assigned to another article
- Category must be one of: `city-guides`, `tools`, `jobs`, `lifestyle`, `finance`
- End each article with `**Next reads:**` linking to 2-4 related articles on the site

### 6. Image Rules

- Every article needs a unique hero image
- Source from Pexels (free commercial use): search `https://www.pexels.com/search/{keyword}/`
- Download: `curl -sL "https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?w=1200&q=80" -o "src/assets/{descriptive-name}.jpg"`
- Run `grep -h "heroImage:" src/content/blog/*.md | sort | uniq -c | sort -rn | awk '$1 > 1'` to verify uniqueness before commit

---

### 7. Pre-publish Checklist

```bash
# 1. Humanizer scan
grep -n "—\|–\|crucial\|pivotal\|vibrant\|tapestry\|delve\|showcase\|boasts\|nestled\|breathtaking\|stunning\|Here's the thing\|Honestly?" src/content/blog/new-article.md

# 2. Unique image
grep -h "heroImage:" src/content/blog/*.md | sort | uniq -c | sort -rn | awk '$1 > 1 {print "DUPLICATE: "$0}'

# 3. Date distribution
grep -h "pubDate:" src/content/blog/*.md | sed 's/pubDate: //' | sort | uniq -c | sort -rn | head -5

# 4. Article length (minimum 800 words)
wc -w src/content/blog/new-article.md

# 5. Has source footer?
grep -c "Sources:" src/content/blog/new-article.md

# 6. Has first-person anchor?
grep -c "\bI\b\|\bmy\b\|\bwe\b" src/content/blog/new-article.md

# 7. Build
npm run build
```

### 8. Post-publish Actions

- Submit sitemap to Google Search Console if new pages added
- Share on Reddit r/digitalnomad (provide value first, link in 3rd comment if appropriate)
- Add internal links from 3-5 existing articles to the new article
- After 90 days: revisit the article, update outdated data, add new information

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
