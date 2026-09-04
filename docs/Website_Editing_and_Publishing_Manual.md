# a+pgrp Website
## Editing Manual

**For a non-technical website editor**  
**Version:** 1.1  
**Prepared:** 3 September 2026  
**Website technology:** React + Vite  
**Source code:** <https://github.com/tskwilliam/a-pgrp_website>  
**Main branch:** `master`

> SCOPE OF THIS EDITION: This manual explains setup, content editing, and checking the website on your own computer. It deliberately stops at local preview. It does not explain how to build, upload, publish, or replace the live WordPress website.

[[PAGEBREAK]]

[[CONTENTS_TITLE]]

[[TOC]]

> Microsoft Word normally updates this contents page when the document opens. If the page numbers are missing or out of date, right-click the contents list and choose **Update Field**, then **Update entire table**.

[[PAGEBREAK]]

# 1. About this manual

This guide is for the person responsible for routine a+pgrp website content. No coding knowledge is assumed. Follow the examples closely, change one small item at a time, and check the result in the local preview.

This edition covers:

- Installing the normal editing tools and an optional AI coding assistant.
- Getting the website code from the company GitHub repository.
- Saving the project in a safe local folder that is not synced by OneDrive or another cloud service.
- Finding the files for each website page.
- Editing English and Chinese text and replacing images.
- Asking Codex or Claude Code to make or repair a focused change.
- Previewing and checking the edited website on the editor's computer.

This edition does not cover:

- Building the production website.
- Uploading files to Vodien or cPanel.
- Changing the domain, DNS, email, or WordPress installation.
- Publishing the changes to the public website.

## The routine in plain language

1. Open the saved website project.
2. Ask Codex or Claude Code to help, or carefully edit the correct content file yourself.
3. Copy the existing formatting and change only the content.
4. Save the file.
5. Look at the change in the local preview.
6. Check both English and Chinese, then check desktop and mobile sizes.
7. Stop after the checks. Publishing instructions will be added in a later edition.

## Important project details

| Item | Current value |
|---|---|
| GitHub repository | `https://github.com/tskwilliam/a-pgrp_website` |
| Main branch | `master` |
| Recommended local folder | `C:\Website Projects\a-pgrp_website` |
| Local preview address | `http://localhost:8443/` |
| Languages | English (`en`) and Chinese (`zh`) |
| Existing live-site system | WordPress on Vodien, managed through cPanel |

[[PAGEBREAK]]

# 2. How the website system fits together

| Name | Plain-language meaning | What the editor uses it for now |
|---|---|---|
| Domain | The public website address | Nothing during routine local editing |
| Vodien | The company that hosts the live website | Nothing in this edition |
| cPanel | The control panel for the Vodien server | Nothing in this edition |
| WordPress | The software running the current live website | It does not edit this new website code |
| GitHub | The company's online master copy of the editable code | Download the project from here |
| GitHub Desktop | A friendly application for working with GitHub | Clone the project and view changed files |
| Visual Studio Code | A text and code editor | Open files and make careful manual edits |
| Codex or Claude Code | An AI coding assistant | Find files, make requested edits, explain errors, and help check the result |
| Local preview | A private copy shown only on the editor's computer | Check changes before any future publishing work |

For this edition, the workflow is:

`Company GitHub` → `safe local project folder` → `edit with AI or Visual Studio Code` → `local preview and checks` → `stop`

The public domain will not change just because the editor changes local files. WordPress, Vodien, and cPanel remain untouched until a separate publishing process is approved and documented.

> Never change nameservers, DNS records, MX records, email accounts, WordPress files, or cPanel settings while following this manual.

[[PAGEBREAK]]

# 3. Before setup: accounts, storage, and software

## 3.1 Accounts and permission

Ask the website owner or IT administrator for:

- A GitHub account with access to `tskwilliam/a-pgrp_website`.
- A company ChatGPT/Codex or Claude account, if the company has one.
- The name of the person who approves website wording and images.
- The name of a technical contact for problems that AI cannot safely resolve.

If the company provides a ChatGPT Business, Enterprise, Claude Team, or Claude Enterprise workspace, sign in with your own authorised company account. Do not use another employee's password. Do not put confidential company or client material into a personal AI account unless company policy clearly permits it.

Never paste passwords, recovery codes, API keys, private client records, or other secrets into an AI conversation or a website file.

## 3.2 Choose a safe local folder

The project must be stored on the computer's local drive in a folder that is not backed up, mirrored, or synchronised by OneDrive, Dropbox, Google Drive, iCloud, or another cloud-storage service.

Use a location such as:

```text
C:\Website Projects\a-pgrp_website
```

Do not use locations such as:

```text
C:\Users\YourName\OneDrive\Desktop\a-pgrp_website
C:\Users\YourName\OneDrive\Documents\a-pgrp_website
C:\Users\YourName\Dropbox\a-pgrp_website
```

Many company computers automatically connect Desktop and Documents to OneDrive. Check the full folder address before cloning. Cloud-sync software can lock, duplicate, or partially synchronise the thousands of small project files and can interfere with Git.

If `OneDrive`, `Dropbox`, `Google Drive`, or `iCloud` appears anywhere in the full path, choose a different folder. If the company requires all files to be cloud-backed up, ask IT to provide an approved local development folder or another backup method that does not live-sync the working project.

## 3.3 Install a web browser

Use Microsoft Edge or Google Chrome. Edge is already installed on most Windows computers. The browser is used only to view the local preview.

## 3.4 Install GitHub Desktop

Official download: <https://desktop.github.com/>

1. Download and run GitHub Desktop from the official website.
2. Choose **Sign in to GitHub.com**.
3. Sign in with the authorised company GitHub account.
4. Complete two-factor authentication if requested.

## 3.5 Install Visual Studio Code

Official download: <https://code.visualstudio.com/>

1. Download the Windows installer from the official website.
2. Run the installer using the normal recommended options.
3. If offered, select **Add to PATH** and **Open with Code**.
4. Open Visual Studio Code once, then close it.

## 3.6 Install Node.js 22

Official download: <https://nodejs.org/en/download>

Node.js supplies the tools that run the private website preview.

1. Download the standard 64-bit Windows installer for Node.js 22 unless IT advises otherwise.
2. Run the installer and keep the normal options selected.
3. Restart Visual Studio Code after the installation.

## 3.7 Install an AI coding assistant

Install either Codex or Claude Code. Codex in the ChatGPT desktop app is the simpler choice for a beginner. Claude Code is an alternative if the company already uses Claude. There is no need to install both.

### Option A: Codex in the ChatGPT desktop app

Official instructions: [OpenAI Codex quickstart](https://learn.chatgpt.com/docs/codex/quickstart)

1. Go to <https://chatgpt.com/download>.
2. Download and install the ChatGPT desktop app for Windows.
3. Sign in with the authorised company ChatGPT account if one exists. Otherwise use an approved personal account.
4. Open the **Codex** area in the app.
5. When asked to choose a project, select `C:\Website Projects\a-pgrp_website`.
6. Allow Codex to read and edit only this project folder.

Codex is currently included with ChatGPT Free, but the Free plan is intended for smaller or occasional coding tasks. Usage limits vary with the size and difficulty of the work and may run out during a longer session. Limits and plan features can change. Check [OpenAI's current Codex pricing and limits](https://learn.chatgpt.com/docs/codex/pricing) rather than relying on an old quota.

### Option B: Codex in the terminal

Use this option only if the desktop app is unavailable or the technical contact recommends it.

1. Open Visual Studio Code.
2. Select **Terminal → New Terminal**.
3. Enter the following command and press Enter:

```powershell
npm install -g @openai/codex
```

4. After installation, enter:

```powershell
codex
```

5. Choose **Sign in with ChatGPT** and use the authorised company account where available.

### Option C: Claude Code

Official instructions: [Anthropic Claude Code setup](https://docs.anthropic.com/en/docs/claude-code/getting-started)

Claude Code on Windows requires Git for Windows. Download it from <https://git-scm.com/download/win>, run the installer, and keep the normal recommended options. Ask IT for help if Claude later reports that Git Bash is missing.

1. Open Visual Studio Code.
2. Select **Terminal → New Terminal**.
3. Enter:

```powershell
npm install -g @anthropic-ai/claude-code
```

4. When installation finishes, enter:

```powershell
claude
```

5. Follow the browser sign-in instructions.
6. Select the authorised company Claude Team or Enterprise account if one is provided.

Claude's free chat can answer questions and generate code, but Anthropic currently lists the full Claude Code agent as included with paid Pro, Max, Team, and Enterprise plans or paid Console access. Paid subscriptions also have usage limits, and Console access may charge by usage. Check [Anthropic's current plan information](https://claude.com/pricing) before starting. Decline any option to switch to paid API credits unless the company has approved the cost.

## 3.8 Confirm the basic tools

1. Open Visual Studio Code.
2. Select **Terminal → New Terminal**.
3. Enter each command separately:

```powershell
node --version
npm --version
corepack --version
```

Each command should show a version number. The Node.js number should begin with `v22`.

If Windows says a command is not recognised, close Visual Studio Code, restart the computer, and try again. If it still fails, ask the technical contact. Do not install a random “missing command” program from an unofficial website.

[[PAGEBREAK]]

# 4. One-time website setup

Complete this section once on the editor's computer.

## 4.1 Create the non-cloud parent folder

1. Open File Explorer.
2. Open **Local Disk (C:)**.
3. Create a folder named `Website Projects`.
4. Confirm its address is exactly `C:\Website Projects`.
5. Confirm the address does not contain OneDrive or another cloud-service name.

## 4.2 Get the code from GitHub

1. Open GitHub Desktop.
2. Select **File → Clone repository**.
3. Select the **URL** tab.
4. In **Repository URL**, enter:

```text
https://github.com/tskwilliam/a-pgrp_website.git
```

5. For **Local path**, choose `C:\Website Projects\a-pgrp_website`.
6. Click **Clone**.
7. Confirm **Current branch** at the top of GitHub Desktop says `master`.

If GitHub says the repository cannot be found, the signed-in account probably does not have permission. Ask the repository administrator to add the account. Do not create a replacement repository.

## 4.3 Open the correct project

1. In GitHub Desktop, select **Repository → Open in Visual Studio Code**.
2. Wait for Visual Studio Code to open.
3. In the left file panel, confirm you can see `package.json`, `src`, and `README.md`.
4. If those items are missing, close the window and reopen the correct repository from GitHub Desktop.

To use Codex desktop instead, open Codex and choose the same `C:\Website Projects\a-pgrp_website` folder.

## 4.4 Install the project packages

1. In Visual Studio Code, select **Terminal → New Terminal**.
2. Enter:

```powershell
corepack pnpm install --frozen-lockfile
```

3. Wait until the command finishes and the normal prompt returns.
4. Do not edit the new `node_modules` folder.

If the command reports a lockfile problem, ask Codex or the technical contact to explain the error. Do not delete `pnpm-lock.yaml`.

## 4.5 Start the private preview

1. In the Visual Studio Code terminal, enter:

```powershell
corepack pnpm dev
```

2. Leave that terminal running.
3. Open Edge or Chrome.
4. Visit:

```text
http://localhost:8443/
```

5. Confirm the a+pgrp Home page appears.

The preview exists only on this computer. It does not update the public website.

To stop it later, click the terminal and press **Ctrl+C**. If asked to terminate the batch job, type `Y` and press Enter.

## 4.6 Give the AI assistant its first instruction

Open the project in Codex or start `codex` or `claude` from the project terminal. Then send:

```text
This is the a+pgrp website. I am a non-technical content editor.
Before changing anything, inspect the project instructions and the relevant content files.
For routine edits, preserve the existing design, formatting, file structure, and bilingual English/Chinese pattern.
Change only what I clearly request. Do not build, publish, upload, or change hosting settings.
After each edit, tell me exactly which file changed and what I should check in the local preview.
```

[[PAGEBREAK]]

# 5. Rules for safe routine editing

## Copy formatting; change content only

The safest method is to find a similar existing item, copy its pattern exactly, and replace only the words, dates, numbers, links, or image reference that must change.

- Keep the same brackets, commas, quotation marks, field names, and order.
- Keep the existing capitalisation style unless an approved wording change requires otherwise.
- Do not redesign a page, change spacing, change colours, or move sections during a content edit.
- Do not rename folders or files unless an AI agent or technical contact handles all connected references.
- Make one small subject change at a time.
- Save with **Ctrl+S**, then look at the preview.

For example, change only the words inside the quotation marks:

```ts
title: { en: 'old project name', zh: '旧项目名称' },
```

becomes:

```ts
title: { en: 'new project name', zh: '新项目名称' },
```

Do not remove the commas, braces, colon, or quotation marks.

## Files a routine editor may change

Most content lives under `src/content`. Some page wording lives in `src/i18n/index.ts` or a named page file under `src/pages`.

Do not manually edit:

- `node_modules`
- `package.json`
- `pnpm-lock.yaml`
- `vite.config.ts`
- `tsconfig.json`
- `src/App.tsx`
- layout, animation, or styling code unless a developer is responsible

## Use an AI agent when anything looks wrong

If the preview becomes blank, red error text appears, a page disappears, the wrong image is shown, or you are unsure which punctuation to keep, stop editing and ask Codex or Claude Code to investigate.

Use a prompt such as:

```text
I tried to update [describe the content]. The local preview now shows [describe the problem].
Please inspect my uncommitted changes, explain the cause in plain language, and repair only this problem.
Preserve the current design and all unrelated content. Do not publish anything.
After the repair, tell me what to check in the browser.
```

Do not repeatedly delete punctuation or random files to see whether an error disappears. If the AI proposes a large redesign or changes many unrelated files, ask it to stop and make a smaller, focused repair.

## Use AI for English-to-Chinese translation

If you are not fluent in Chinese, ask the approved company AI account to draft the translation. Give the AI the English text, the page name, and a nearby English/Chinese example so it can match the website's tone.

```text
Translate the following a+pgrp website text from English to Simplified Chinese.
Keep a professional architectural tone, preserve names and technical measurements, and do not add new claims.
Return the English and Chinese side by side. Flag any project name, award name, or technical term that needs human confirmation.

[paste only the approved public text here]
```

AI translation is a draft, not final approval. A fluent Chinese reviewer should check company names, personal names, project names, addresses, awards, measurements, and legal or contractual wording. Never ask AI to invent a missing Chinese name.

## Apostrophes and quotation marks

If an English sentence contains an apostrophe, keep the surrounding double quotation marks:

```ts
description: { en: "the client's new building", zh: '客户的新建筑' },
```

An unescaped apostrophe inside single quotation marks can break the website preview. Ask the AI agent to correct the quotation style if unsure.

[[PAGEBREAK]]

# 6. Home page

## What appears on this page

The Home page contains the hero slideshow, introduction text, statistics, four selected projects, one featured media article, and the contact image and message.

| Content | Where to find it |
|---|---|
| Hero slideshow images | `src/content/home/images/` and `src/content/home/index.ts` |
| Contact image | `src/content/home/images/contact-cta.jpg` |
| Main reusable Home wording | `src/i18n/index.ts`, under `home` |
| Introduction, statistics, and some visible wording | `src/pages/Home.tsx` |
| Four recent projects | First four entries in `src/content/projects/index.ts` |
| Featured media article | First entry in `src/content/media/index.ts` |

## Change a Home image

1. Open `src/content/home/images`.
2. Identify the existing image to replace.
3. Prepare a replacement with a similar shape and sufficient resolution.
4. Give the replacement the exact same filename and file extension.
5. Replace the old file.
6. Check the Home page at desktop and mobile widths.

If a new filename is required, ask Codex to add the file and update `src/content/home/index.ts` without changing the slideshow design.

## Change Home wording or statistics

Ask Codex to locate the exact sentence or statistic before editing. Update both English and Chinese values where present. For statistics, search `src/pages/Home.tsx` for `const stats`.

## Change the selected projects or featured article

The first four items in the ordered `projects` array appear on Home. The first item in the ordered `articles` array is featured on Home. Reordering these lists also changes their main listing pages, so check both places.

[[PAGEBREAK]]

# 7. Our Story page

| Content | Where to find it |
|---|---|
| Story and approach wording | `src/i18n/index.ts`, under `ourStory` |
| Story images | `src/content/our-story/images/` and `src/content/our-story/index.ts` |
| Timeline, awards, and some longer paragraphs | `src/pages/OurStory.tsx` |
| Office map labels and pin locations | `src/content/offices/index.ts` |

## Edit story text

1. Search for a distinctive part of the existing sentence.
2. Confirm the result is in the `ourStory` part of `src/i18n/index.ts` or in `src/pages/OurStory.tsx`.
3. Change the English and Chinese text only.
4. Preserve the existing field names and punctuation.
5. Check every Our Story section in both languages.

## Edit the timeline or awards

In `src/pages/OurStory.tsx`, search for `const timeline` or `const awards`. Copy the formatting of the nearest item and replace its year and wording. Keep the English and Chinese entries aligned and in the intended order.

## Edit the office map

Office names, contact details, and map pins come from `src/content/offices/index.ts`. A normal content editor may correct the office text. Ask Codex or a technical contact to change `lon`, `lat`, `anchor`, `dx`, or `dy`, because these values control the map position and label placement.

[[PAGEBREAK]]

# 8. Projects page and project detail pages

Each project has its own folder inside `src/content/projects`. The folder contains an `index.ts` content file and the project's images. The order of all projects is controlled by `src/content/projects/index.ts`.

## Edit an existing project

1. Open `src/content/projects`.
2. Open the folder whose name matches the project.
3. Open that folder's `index.ts`.
4. Change only the necessary content values.
5. Keep the English and Chinese fields together.
6. Save and check the Projects listing, project detail page, filters, and both languages.

| Field | Meaning | Editing note |
|---|---|---|
| `slug` | Unique internal page name | Do not change after launch without technical help |
| `title.en`, `title.zh` | Project name | Update both languages |
| `location.en`, `location.zh` | Location | Update both languages |
| `year` | Project year | Use text such as `'2026'` or keep `''` if hidden |
| `type` | Project category or categories | Copy an existing allowed category exactly |
| `status` | Project stage | Copy an existing allowed status exactly |
| `gfa` | Gross floor area | Keep the unit |
| `estimatedCost` | Cost | Keep the currency |
| `description.en`, `description.zh` | Main description | Update both languages |
| `awards` | Bilingual awards | Keep the existing item pattern |
| `images` | Gallery images and order | Do not alter imports manually unless confident |
| `related` | Slugs of related projects | Slugs must exactly match existing projects |

## Add a project

Adding an item affects several connected files. For a non-technical editor, use Codex or Claude Code and copy an existing project with a similar amount of information.

1. Prepare the approved English and Chinese text and all images.
2. Tell the AI which existing project should be used as the formatting example.
3. Ask it to create one new project folder, preserve the existing structure, and add the new import and array entry in `src/content/projects/index.ts`.
4. Tell it not to change the page design or unrelated projects.
5. Check the Projects listing, filters, new detail page, Home page, and both languages.

Suggested prompt:

```text
Add one new project using [existing project name] only as the formatting pattern.
Use the approved text and images I provide. Preserve the current project type, bilingual field structure, page design, and all unrelated content.
Add the required import and place the new project [state its desired position] in the projects array.
Do not publish. Tell me every file changed and what to check in the local preview.
```

[[PAGEBREAK]]

# 9. People page and profile pages

Each person has a folder under `src/content/people` containing `index.ts` and a portrait. The list order is controlled by `src/content/people/index.ts`.

## Edit an existing profile

1. Open `src/content/people`.
2. Open the person's folder.
3. Open `index.ts`.
4. Edit only the approved fields.
5. Keep English and Chinese lists in the same order.
6. Check the People listing and full profile in both languages.

Important fields include `name`, `zhName`, `position`, `zhPosition`, `bio`, `zhBio`, `qualifications`, `zhQualifications`, `experience`, `zhExperience`, `awards`, and `zhAwards`.

`isPartner: true` places the person in the partners group. `isPartner: false` places the person in the other team group. Do not change this value without approval.

## Replace a portrait

Use a portrait with a similar crop and proportions. The simplest safe method is to replace the existing image with a new image that has exactly the same filename and extension. Check the listing card and full profile on desktop and mobile.

## Add a person

Ask an AI agent to copy the nearest existing profile format, create a new folder, import the new profile in `src/content/people/index.ts`, and place it in the approved order. Supply confirmed English and Chinese names rather than asking AI to invent a Chinese name.

[[PAGEBREAK]]

# 10. Services page

Service content and order are stored in `src/content/services/index.ts`. Service images are under `src/content/services/images`.

Each service contains:

- `number`
- `name` and `zhName`
- `description` and `zhDescription`
- `imageUrl`
- `relatedCategory`

## Edit a service

1. Open `src/content/services/index.ts`.
2. Find the service by its English name.
3. Change only its approved English and Chinese text or image reference.
4. Copy the formatting of another service if adding a field.
5. Save and check every service slide in both languages.

The order of entries in the `services` array controls display order. Reorder only with approval and then check the complete slideshow.

[[PAGEBREAK]]

# 11. Media page and article pages

Each article has a folder under `src/content/media` containing an `index.ts` file and a feature image. Article order is controlled by `src/content/media/index.ts`. The first article is also featured on Home.

## Edit an existing article

1. Open `src/content/media`.
2. Open the article's folder.
3. Open `index.ts`.
4. Edit the title, category, date, summary, or body while copying the existing structure.
5. Save and check the Media listing, category filter, search result, article page, and Home page if it is the first article.

The title, summary, and category have English and Chinese versions. The main article body is currently English only. Do not add a new Chinese body structure unless a developer first changes the page to support it.

## Add an article

Ask an AI agent to copy an existing article folder, replace the text and image, import it into `src/content/media/index.ts`, and insert it in the approved order. State clearly whether it should become the first featured article.

[[PAGEBREAK]]

# 12. Jobs page

| Content | Where to find it |
|---|---|
| Jobs hero images | `src/content/jobs/images/` and `src/content/jobs/index.ts` |
| Vacancy list | `src/content/jobs/index.ts`, under `jobListings` |
| Frequently asked questions | `src/pages/Jobs.tsx`, under `const faqs` |
| Introductory wording and application form labels | `src/pages/Jobs.tsx` |

## Edit a vacancy

1. Open `src/content/jobs/index.ts`.
2. Find the vacancy by title.
3. Edit its English and Chinese title, department, type, description, and requirements.
4. Copy the list formatting exactly when adding or removing a requirement.
5. Save and check the vacancy card, expanded details, and application form position list in both languages.

To show no vacancies, ask Codex to empty the `jobListings` array without deleting its type or surrounding code.

## Edit a frequently asked question

Search `src/pages/Jobs.tsx` for `const faqs`. Keep the English and Chinese question lists aligned and copy the format of a nearby question.

> CURRENT CHECKING WARNING: The Jobs application form validates entries and shows a success message, but it is not yet connected to a real submission service. A successful local test does not mean an application was emailed or stored.

[[PAGEBREAK]]

# 13. Contact page

| Content | Where to find it |
|---|---|
| Main office and other office details | `src/content/offices/index.ts` |
| Map links and embedded maps | `src/content/offices/index.ts` |
| Contact wording, enquiry choices, and form labels | `src/pages/Contact.tsx` |
| Repeated footer address and email | `src/components/Footer.tsx` |

## Edit office details

1. Open `src/content/offices/index.ts`.
2. Find the office by name.
3. Update the approved `name`, `address`, `phone`, `email`, `directionsUrl`, or `mapEmbedUrl` value.
4. Keep English and Chinese address lines in the same order.
5. If the Singapore headquarters address or email changed, update the matching repeated details in `src/components/Footer.tsx`.
6. Check the Contact page, footer, mail links, directions links, maps, and Our Story office map.

The first office with `isHeadquarters: true` is shown as the main Contact office. Do not change that setting without approval.

> CURRENT CHECKING WARNING: The Contact form validates entries and shows a success message, but it is not yet connected to a real email or database service. A successful local test does not mean the message was sent.

[[PAGEBREAK]]

# 14. Shared navigation, footer, and site-wide wording

## Navigation and reusable translations

Open `src/i18n/index.ts` for navigation labels, shared headings, buttons, and other reusable English and Chinese wording.

Change only the text values inside `en` and `zh`. Do not rename keys such as `projects`, `heading`, or `readMore`; page code uses those names to find the text.

## Footer details and social links

Open `src/components/Footer.tsx` for the repeated Singapore address, email, legal links, and social links. Search for `const SOCIAL` to update Instagram, Facebook, or LinkedIn addresses.

Change only the web address after `href:` and preserve the rest of the item.

```ts
{ label: 'instagram', href: 'https://approved-address.example' },
```

Check every changed link in the browser. A correct label can still point to the wrong address.

## Logo, colours, and page design

The logo is `src/assets/apgrp_logo.svg`. Global colours and fonts are controlled by `src/index.css`. Layout and behaviour live in `src/pages`, `src/components`, and `src/App.tsx`.

These are design or developer areas. A routine editor should not change them. If a design update is approved, ask an AI agent or developer to make a focused change and to preserve unrelated page behaviour.

[[PAGEBREAK]]

# 15. Replacing images safely

## Simple replacement using the same filename

1. Find the existing image in the relevant `src/content/.../images` folder.
2. Write down the exact filename, capital letters, and extension.
3. Prepare the approved replacement with a similar shape and crop.
4. Rename the replacement to the exact existing filename.
5. Replace the old file.
6. Save, then check every page where that image appears.

Use website-friendly `.jpg`, `.png`, or `.webp` files. Avoid very large original camera files. Keep important faces and buildings away from the extreme edges because mobile screens may crop them.

## Adding an image with a new filename

New filenames usually require an import and a reference in an `index.ts` file. Ask Codex or Claude Code to copy the nearest existing image-import pattern. Tell it the page, new image filename, desired position, and existing image it should imitate.

Do not paste an image into a code file or into `node_modules`.

[[PAGEBREAK]]

# 16. Preview and check changes

This is the final section of this edition. Complete these checks, record any unresolved problems, and stop. Do not build, upload, or publish using this manual.

## Start or return to the preview

If the preview is not already running:

1. Open the project in Visual Studio Code.
2. Select **Terminal → New Terminal**.
3. Enter:

```powershell
corepack pnpm dev
```

4. Open <http://localhost:8443/> in Edge or Chrome.

Most saved changes appear automatically. If not, press **Ctrl+R** in the browser once.

## Check the page you changed

- [ ] The changed English wording is correct.
- [ ] The Chinese version is present and approved.
- [ ] Names, dates, units, awards, email addresses, phone numbers, and links are accurate.
- [ ] Images load and are not stretched or badly cropped.
- [ ] Buttons and links still work.
- [ ] No red error panel or blank page appears.
- [ ] Unrelated content on the same page has not changed.

## Check the rest of the website

- [ ] Home opens and the hero slideshow works.
- [ ] Our Story opens and its office map appears.
- [ ] Projects opens; filters and the edited detail page work.
- [ ] People opens; the edited profile works.
- [ ] Services opens and the slides can be viewed.
- [ ] Media opens; search, filters, and the edited article work.
- [ ] Jobs opens and vacancy details display.
- [ ] Contact opens; office links and maps display.
- [ ] The English/Chinese language switch works on relevant pages.
- [ ] Header navigation and footer links still work.

## Check a mobile-sized view

1. Make the browser window narrow, approximately the width of a phone.
2. Recheck the page you changed.
3. Confirm text is not cut off.
4. Confirm images crop acceptably.
5. Confirm menu, buttons, cards, and links can still be used.

## If a check fails

1. Do not continue making unrelated edits.
2. Copy the visible error message or describe exactly what looks wrong.
3. Tell Codex or Claude Code what you changed immediately before the problem.
4. Ask it to inspect only the current local changes and repair the smallest possible cause.
5. Repeat the English, Chinese, desktop, and mobile checks.
6. If the problem remains, stop and send the technical contact the error text, a screenshot, and the names of the changed files.

Suggested prompt:

```text
Please check my current local website changes. Do not publish or redesign anything.
The problem is: [describe it].
I last changed: [describe the edit or name the file].
Find the smallest cause, repair only that issue, and explain in plain language what you changed.
Then give me a short browser checklist for the affected page in English, Chinese, desktop, and mobile views.
```

> STOPPING POINT: When all local preview checks pass, close the browser or leave the preview for later review. Publishing and cPanel instructions are intentionally not part of this edition.
