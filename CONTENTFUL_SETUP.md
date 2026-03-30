# Contentful CMS Setup Guide

This guide will walk you through integrating Contentful CMS into InvoiceFlow for managing marketing content and help articles.

## 📋 Table of Contents

1. [Why Contentful?](#why-contentful)
2. [Create Contentful Account](#create-contentful-account)
3. [Get API Keys](#get-api-keys)
4. [Install SDK](#install-sdk)
5. [Configure Environment Variables](#configure-environment-variables)
6. [Create Content Models](#create-content-models)
7. [Add Sample Content](#add-sample-content)
8. [Implementation](#implementation)
9. [Testing](#testing)

---

## 🎯 Why Contentful?

Contentful allows you to:
- **Manage marketing content** without code deployments
- **Create help documentation** with rich text formatting
- **Enable non-technical users** to update website content
- **Improve SEO** with dynamic, crawlable content
- **Multi-channel delivery** to web, mobile, and other platforms

---

## 1. Create Contentful Account

1. Go to [https://www.contentful.com](https://www.contentful.com)
2. Click **"Start building for free"**
3. Sign up with email or GitHub
4. Choose **"Create a new space"**
5. Select **"Empty space"** template
6. Name your space: **"InvoiceFlow"**
7. Click **"Create space"**

**✅ You now have a Contentful space!**

---

## 2. Get API Keys

### Step 1: Navigate to API Keys
1. In Contentful dashboard, go to **Settings** (⚙️ icon in top right)
2. Click **API keys** in the left sidebar
3. Click **"Add API key"** button

### Step 2: Create API Key
Enter the following details:

**Name:**
```
InvoiceFlow Production
```

**Description:**
```
Content delivery for InvoiceFlow landing page, features section, and help articles
```

### Step 3: Copy Your Keys
After creating, you'll see three important values:

1. **Space ID** - Your unique space identifier
2. **Content Delivery API - access token** - For published content
3. **Content Preview API - access token** - For draft/unpublished content

**⚠️ Copy all three values - you'll need them next!**

---

## 3. Install SDK

Run this command in your project directory:

```bash
npm install contentful @contentful/rich-text-types
```

**Packages installed:**
- `contentful` - Official Contentful SDK for fetching content
- `@contentful/rich-text-types` - TypeScript types for rich text fields

---

## 4. Configure Environment Variables

### Step 1: Update `.env`
Add these three lines to your `.env` file:

```env
# Contentful CMS
CONTENTFUL_SPACE_ID="your_space_id_here"
CONTENTFUL_ACCESS_TOKEN="your_delivery_token_here"
CONTENTFUL_PREVIEW_TOKEN="your_preview_token_here"
```

Replace `your_space_id_here`, `your_delivery_token_here`, and `your_preview_token_here` with the values you copied in Step 2.

### Step 2: Update `.env.example`
Add the same variables to `.env.example` (for team reference):

```env
# Contentful CMS
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_TOKEN=
```

**✅ Environment configuration complete!**

---

## 5. Create Content Models

Content Models define the structure of your content. You'll create three models:

### Model 1: Landing Page Hero

**Purpose:** Hero section on the landing page

**Steps:**
1. Go to **Content model** in Contentful
2. Click **"Add content type"**
3. Fill in:
   - **Name:** `Landing Page Hero`
   - **API identifier:** `landingPageHero`
4. Click **"Create"**

**Add these fields:**

| Field Name | Field ID | Type | Settings | Appearance |
|------------|----------|------|----------|------------|
| Title | title | Short text | Required, Max 100 chars | Single line |
| Subtitle | subtitle | Long text | Required, Max 200 chars | Multiple line |
| CTA Text | ctaText | Short text | Required, Example: "Get Started" | Single line |
| CTA URL | ctaUrl | Short text | Required, Example: "/sign-up" | Single line |
| Background Gradient | backgroundGradient | Short text | Optional, Example: "from-blue-600 to-purple-600" | Single line |

**Click "Save" after adding all fields.**

---

### Model 2: Feature

**Purpose:** Feature cards on the landing page

**Steps:**
1. Click **"Add content type"**
2. Fill in:
   - **Name:** `Feature`
   - **API identifier:** `feature`
3. Click **"Create"**

**Add these fields:**

| Field Name | Field ID | Type | Settings | Appearance |
|------------|----------|------|----------|------------|
| Title | title | Short text | Required, Max 50 chars | Single line |
| Description | description | Long text | Required, Max 200 chars | Multiple line |
| Icon | icon | Short text | Required, Predefined values (see list below) | Dropdown |
| Order | order | Integer | Required, Unique | Number editor |

> 💡 **Tip:** For the **Icon** field, in the Validation tab add **"Predefined values"** and enter these options:
> `FileText`, `Users`, `DollarSign`, `Shield`, `BarChart`, `Clock`, `Bell`, `Settings`, `Star`, `Zap`, `Globe`, `Lock`

**Click "Save" after adding all fields.**

---

### Model 3: Help Article

**Purpose:** Knowledge base / help documentation

**Steps:**
1. Click **"Add content type"**
2. Fill in:
   - **Name:** `Help Article`
   - **API identifier:** `helpArticle`
3. Click **"Create"**

**Add these fields:**

| Field Name | Field ID | Type | Settings | Appearance |
|------------|----------|------|----------|------------|
| Title | title | Short text | Required, Max 100 chars | Single line |
| Slug | slug | Short text | Required, Unique, Example: "getting-started" | Slug (auto-generated from title) |
| Category | category | Short text | Required, Example: "Getting Started" | Dropdown |
| Excerpt | excerpt | Long text | Required, Max 200 chars | Multiple line |
| Content | content | Rich text | Required | Rich text editor |
| Published Date | publishedDate | Date & time | Required | Date picker |
| Featured | featured | Boolean | Default: false | Boolean |

> 💡 **Tip:** For the **Slug** field, in the Appearance tab select **"Slug"** and set it to generate from the **Title** field automatically.

> 💡 **Tip:** For the **Category** field, in the Validation tab add **"Predefined values"** and enter categories like: `Getting Started`, `Invoices`, `Clients`, `Payments`, `Account & Settings`.

**Click "Save" after adding all fields.**

**✅ All content models created!**

---

## 6. Add Sample Content

### Create Landing Page Hero

1. Go to **Content** tab
2. Click **"Add entry"** → Select **"Landing Page Hero"**
3. Fill in:
   - **Title:** `Streamline Your Invoicing Today`
   - **Subtitle:** `Professional invoice management for small businesses. Create, track, and manage invoices in minutes.`
   - **CTA Text:** `Get Started Free`
   - **CTA URL:** `/sign-up`
   - **Background Gradient:** `from-blue-600 to-purple-600`
4. Click **"Publish"** (top right)

---

### Create Features (Add 4 entries)

**Feature 1:**
- Title: `Quick Invoice Creation`
- Description: `Create professional invoices in seconds with our intuitive interface`
- Icon: `FileText`
- Order: `1`

**Feature 2:**
- Title: `Client Management`
- Description: `Keep all your client information organized in one place`
- Icon: `Users`
- Order: `2`

**Feature 3:**
- Title: `Payment Tracking`
- Description: `Track payments and see what's overdue at a glance`
- Icon: `DollarSign`
- Order: `3`

**Feature 4:**
- Title: `Multi-Tenant Secure`
- Description: `Your data is completely isolated and secure`
- Icon: `Shield`
- Order: `4`

**Click "Publish" on each entry.**

---

### Create Help Article (Sample)

1. Click **"Add entry"** → Select **"Help Article"**
2. Fill in:
   - **Title:** `Getting Started with InvoiceFlow`
   - **Slug:** `getting-started` *(auto-generated)*
   - **Category:** `Getting Started`
   - **Excerpt:** `Learn the basics of creating your first invoice and managing clients`
   - **Published Date:** `March 26, 2026`
   - **Featured:** `true`
3. For the **Content** field, enter the following rich text:

---

#### Content to Enter (copy structure into the rich text editor)

> Use the rich text toolbar in Contentful to apply headings, bold, and lists as shown below.

---

**Heading 2:** `Welcome to InvoiceFlow`

**Paragraph:**
InvoiceFlow is a professional invoice management platform built for small businesses and freelancers. This guide will walk you through everything you need to get up and running in minutes.

---

**Heading 2:** `Step 1: Create Your Account`

**Paragraph:**
To get started, sign up for a free account at InvoiceFlow. During the onboarding process, you'll be asked to set up your company profile.

**Heading 3:** `Company Setup`

**Bulleted list:**
- Enter your **Company Name** — this will appear on all invoices
- Add your **Email Address** for billing and notifications
- Set your **country and timezone**
- Click **"Create Company"** to complete onboarding

---

**Heading 2:** `Step 2: Add Your First Client`

**Paragraph:**
Before creating an invoice, you need to add a client. Navigate to **Clients** in the left sidebar.

**Numbered list:**
1. Click **"New Client"**
2. Enter the client's **Name**, **Email**, and optionally their **Phone** and **Address**
3. Click **"Create Client"**

Your client will now appear in the client list and can be assigned to invoices.

---

**Heading 2:** `Step 3: Create Your First Invoice`

**Paragraph:**
Now you're ready to create an invoice. Go to **Invoices** → **New Invoice**.

**Numbered list:**
1. Select a **Client** from the dropdown
2. Set the **Issue Date** and **Due Date**
3. Add **line items** — enter a description, quantity, and unit price
4. InvoiceFlow automatically calculates the **subtotal**, **10% tax**, and **total**
5. Optionally add **Notes** for the client
6. Click **"Create Invoice"**

---

**Heading 2:** `Step 4: Manage Invoice Status`

**Paragraph:**
Invoices move through the following statuses:

**Bulleted list:**
- **Draft** — Invoice is saved but not yet sent
- **Sent** — Invoice has been sent to the client
- **Paid** — Payment has been received
- **Overdue** — Due date has passed without payment
- **Cancelled** — Invoice has been voided

**Paragraph:**
You can update the status at any time from the invoice detail page.

---

**Heading 2:** `Need More Help?`

**Paragraph:**
Browse the rest of our help articles for detailed guides on clients, payments, settings, and more. If you have a question not covered here, contact our support team.

---

4. Click **"Publish"** (top right)

**✅ Sample content added!**

---

## 7. Implementation

The following files will be created/updated:

### Files to Create:

1. **`src/lib/contentful.ts`** - Contentful client setup
2. **`src/components/RichText.tsx`** - Rich text renderer for help articles
3. **`src/app/help/page.tsx`** - Help articles listing page
4. **`src/app/help/[slug]/page.tsx`** - Individual help article page

### Files to Update:

1. **`src/app/page.tsx`** - Landing page to fetch hero & features from Contentful

---

## 8. Testing

### Test Locally

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Visit pages:**
   - Landing page: `http://localhost:3000`
   - Help articles: `http://localhost:3000/help`
   - Single article: `http://localhost:3000/help/getting-started`

3. **Verify:**
   - ✅ Hero section displays content from Contentful
   - ✅ Features load dynamically
   - ✅ Help articles render correctly
   - ✅ Rich text formatting works

### Test Content Updates

1. Go to Contentful dashboard
2. Edit the hero title
3. Click **"Publish"**
4. Refresh your local site
5. Verify changes appear (may take 1-2 minutes for cache)

---

## 9. Production Deployment

### Add to Vercel

When deploying to Vercel:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add all three Contentful variables:
   ```
   CONTENTFUL_SPACE_ID
   CONTENTFUL_ACCESS_TOKEN
   CONTENTFUL_PREVIEW_TOKEN
   ```
4. Redeploy your application

### Consider Using Webhooks (Optional)

Set up Contentful webhooks to trigger Vercel rebuilds on content changes:

1. In Contentful: **Settings** → **Webhooks**
2. Click **"Add webhook"**
3. Enter:
   - **Name:** `Vercel Deploy`
   - **URL:** Your Vercel deploy hook URL
   - **Triggers:** Select "Publish" and "Unpublish"
4. Save

**Now content updates automatically trigger rebuilds!**

---

## 🎉 Success!

You've successfully integrated Contentful CMS into InvoiceFlow!

### What You Can Now Do:

✅ **Update marketing content** without code changes
✅ **Create help articles** for your users
✅ **Enable non-technical team members** to manage content
✅ **Improve SEO** with rich, dynamic content

### Next Steps:

- Add more help articles for common questions
- Create blog content models for announcements
- Set up localization for multi-language support
- Add assets/images to your content

---

## 📚 Resources

- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Content Delivery API Reference](https://contentful.github.io/contentful.js/)
- [Rich Text Rendering](https://www.contentful.com/developers/docs/javascript/tutorials/rendering-contentful-rich-text-with-javascript/)
- [Next.js Integration Guide](https://www.contentful.com/developers/docs/javascript/tutorials/integrate-contentful-with-nextjs/)

---

## 🐛 Troubleshooting

### Content Not Showing?
- Verify environment variables are set correctly
- Check that content is **Published** (not just saved)
- Clear browser cache
- Check browser console for API errors

### TypeScript Errors?
- Run `npm install` to ensure all packages are installed
- Restart your dev server

### API Rate Limits?
- Free tier: 1,000 requests/hour
- Consider caching or upgrading plan

Need help? Check the [Contentful Community](https://www.contentful.com/community/) or open an issue in your project repo.
