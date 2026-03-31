---
name: list-webflow-pages
description: >
  Retrieve a list of all pages for a Webflow site. Use this skill when the user
  wants to see what pages exist on the Naftiko website, look up a page ID or slug,
  check SEO metadata, find draft pages, or see published paths. Trigger when the
  user mentions listing pages, finding a page, checking page metadata, or navigating
  site structure.
user_invocable: true
---

# List Webflow Pages

Retrieve all pages for a Webflow site via `GET https://api.webflow.com/v2/sites/{site_id}/pages`.

## Authentication

Use a **Bearer token** in the `Authorization` header:

```
Authorization: Bearer <WEBFLOW_TOKEN>
```

Requires the `pages:read` OAuth scope.

## Request

**Endpoint:** `GET https://api.webflow.com/v2/sites/{site_id}/pages`

### Path Parameters

| Parameter | Required | Description |
|---|---|---|
| `site_id` | yes | Unique identifier for the site |

### Query Parameters

| Parameter | Required | Description |
|---|---|---|
| `localeId` | no | Filter pages by a specific locale |
| `limit` | no | Max records to return (default/max: 100) |
| `offset` | no | Pagination offset (default: 0) |

## Example curl — Naftiko Website

```bash
curl -s \
  -H "Authorization: Bearer $WEBFLOW_TOKEN" \
  "https://api.webflow.com/v2/sites/690a6acf18713a7e3b856b21/pages"
```

## Response (200 OK)

Returns a `pages` array and a `pagination` object.

### Page Fields

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique page identifier |
| `siteId` | string | Site the page belongs to |
| `title` | string | Page title |
| `slug` | string\|null | URL slug, null for the Home page |
| `parentId` | string\|null | Parent folder ID if nested |
| `collectionId` | string\|null | Linked CMS collection ID, null for static pages |
| `createdOn` | datetime | When the page was created |
| `lastUpdated` | datetime | When the page was last modified |
| `archived` | boolean | Whether the page is archived |
| `draft` | boolean | Whether the page is a draft |
| `canBranch` | boolean | Whether the page supports branching |
| `isBranch` | boolean | Whether the page is a branch of another page |
| `branchId` | string\|null | Branch ID if this is a branched page |
| `seo.title` | string | SEO title |
| `seo.description` | string | SEO description |
| `openGraph.title` | string\|null | Open Graph title (null if copied from SEO) |
| `openGraph.titleCopied` | boolean | Whether OG title is copied from SEO title |
| `openGraph.description` | string\|null | Open Graph description |
| `openGraph.descriptionCopied` | boolean | Whether OG description is copied from SEO |
| `publishedPath` | string | Relative URL path of the published page |
| `localeId` | string\|null | Locale ID if localized |

### Pagination Fields

| Field | Type | Description |
|---|---|---|
| `limit` | integer | Limit used |
| `offset` | integer | Offset used |
| `total` | integer | Total number of pages |

## Naftiko Website Pages

The Naftiko site (`690a6acf18713a7e3b856b21`) has 28 pages total. Key static pages:

| Title | Published Path |
|---|---|
| Home | `/` |
| Product | `/product` |
| Resources | `/resources` |
| Newsletter | `/newsletter` |
| Contact us | `/contact-us` |
| Team | `/team` |
| Careers | `/careers` |
| Community | `/community` |
| Glossary | `/glossary` |

Collection template pages use slugs prefixed with `detail_` (e.g. `detail_blog`, `detail_events`).

### Example Response

```json
{
  "pages": [
    {
      "id": "690a6ad118713a7e3b856b86",
      "siteId": "690a6acf18713a7e3b856b21",
      "title": "Home",
      "slug": null,
      "parentId": null,
      "collectionId": null,
      "createdOn": "2025-11-04T21:06:25.279Z",
      "lastUpdated": "2026-02-23T15:53:18.252Z",
      "archived": false,
      "draft": false,
      "canBranch": true,
      "isBranch": false,
      "branchId": null,
      "seo": {
        "title": "Naftiko",
        "description": "Embrace your API legacy, integrate your AI future. Naftiko turns API sprawl into a governed capability fabric that teams can depend on."
      },
      "openGraph": {
        "title": null,
        "titleCopied": true,
        "description": null,
        "descriptionCopied": true
      },
      "publishedPath": "/",
      "localeId": null
    }
  ],
  "pagination": {
    "limit": 100,
    "offset": 0,
    "total": 28
  }
}
```

## OpenAPI Source

See [list-pages-openapi.yml](../openapi/list-pages-openapi.yml) — operation `list-pages`.
