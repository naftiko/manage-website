---
name: get-webflow-page-content
description: >
  Retrieve the DOM nodes and content for a static Webflow page. Use this skill
  when the user wants to read the text, images, or component instances on a specific
  page, audit page copy, or extract content for editing. Trigger when the user
  mentions getting page content, reading page copy, or fetching what's on a page.
  Only works for static pages — collection template pages use CMS items instead.
user_invocable: true
---

# Get Webflow Page Content

Retrieve the DOM nodes (text, images, components) for a static Webflow page via `GET https://api.webflow.com/v2/pages/{page_id}/dom`.

## Authentication

Use a **Bearer token** in the `Authorization` header:

```
Authorization: Bearer <WEBFLOW_TOKEN>
```

Requires the `pages:read` OAuth scope.

## Important

This endpoint only works for **static pages** (where `collectionId` is null). Collection template pages (e.g. `detail_blog`, `detail_events`) get their content from CMS items — use the Collections/Items API for those.

## Request

**Endpoint:** `GET https://api.webflow.com/v2/pages/{page_id}/dom`

### Path Parameters

| Parameter | Required | Description |
|---|---|---|
| `page_id` | yes | Unique identifier for the page |

### Query Parameters

| Parameter | Required | Description |
|---|---|---|
| `localeId` | no | Filter content by a specific locale |
| `limit` | no | Max nodes to return (default/max: 100) |
| `offset` | no | Pagination offset (default: 0) |

## Example curl — Naftiko Home Page

```bash
curl -s \
  -H "Authorization: Bearer $WEBFLOW_TOKEN" \
  "https://api.webflow.com/v2/pages/690a6ad118713a7e3b856b86/dom"
```

## Response (200 OK)

Returns `pageId`, `branchId`, `nodes`, `pagination`, and `lastUpdated`.

### Node Types

| Type | Key Fields | Description |
|---|---|---|
| `text` | `text.html`, `text.text` | Text content with HTML and plain text versions |
| `image` | `image.alt`, `image.assetId` | Image with alt text and asset reference |
| `component-instance` | `componentId`, `propertyOverrides` | Reusable component with optional overrides |
| `text-input` | `placeholder` | Form text input field |
| `submit-button` | `value`, `waitingText` | Form submit button |
| `select` | `choices[]` | Dropdown select with value/text pairs |
| `search-button` | `value` | Search button |

All nodes have an `id` (UUID), `type`, and optional `attributes` object.

## Naftiko Static Pages and Their IDs

| Title | Page ID | Published Path |
|---|---|---|
| Home | `690a6ad118713a7e3b856b86` | `/` |
| Product | `6915e51cdd59b276297cbe4f` | `/product` |
| Resources | `6918fd26dc09e9e742e59c0d` | `/resources` |
| Newsletter | `6918660f328e4a2318289ddd` | `/newsletter` |
| Contact us | `6919a635728014e8c056e06b` | `/contact-us` |
| Team | `6919de2d3a47cdf8dd26c2f7` | `/team` |
| Careers | `691a3269574eb5f0ef792f0e` | `/careers` |
| Community | `691a393822ebe87b20e03e82` | `/community` |
| Glossary | `6923957b4af5fb731b964efe` | `/glossary` |

## Example Response — Home Page (abridged)

```json
{
  "pageId": "690a6ad118713a7e3b856b86",
  "branchId": null,
  "nodes": [
    {
      "id": "7e4f58f9-d003-665f-1dda-64ff54cfc982",
      "type": "text",
      "text": {
        "html": "<h1>Embrace your API legacy, integrate your AI future.</h1>",
        "text": "Embrace your API legacy, integrate your AI future."
      },
      "attributes": {}
    },
    {
      "id": "3bffd447-cfab-fade-d106-21d006137fa1",
      "type": "text",
      "text": {
        "html": "<div class=\"paragraph-22\">Naftiko turns API sprawl into a governed capability fabric that teams can depend on.</div>",
        "text": "Naftiko turns API sprawl into a governed capability fabric that teams can depend on."
      },
      "attributes": {}
    },
    {
      "id": "2d57b9ee-53ab-b413-cb15-bd8953c6e956",
      "type": "text-input",
      "placeholder": "Enter your email",
      "attributes": {}
    },
    {
      "id": "2d57b9ee-53ab-b413-cb15-bd8953c6e958",
      "type": "submit-button",
      "value": "Join the waitlist",
      "waitingText": "Please wait...",
      "attributes": {}
    },
    {
      "id": "1c54e280-37a0-32ca-d44d-81d5ee53122e",
      "type": "component-instance",
      "componentId": "1c54e280-37a0-32ca-d44d-81d5ee53122c",
      "propertyOverrides": []
    },
    {
      "id": "16284a86-d1b6-be41-a1b0-806ccf8ae811",
      "type": "image",
      "image": {
        "alt": "__wf_reserved_inherit",
        "assetId": "69331f73c8dee7df0ee52b17"
      },
      "attributes": {}
    }
  ],
  "pagination": {
    "limit": 100,
    "offset": 0,
    "total": 67
  },
  "lastUpdated": "2026-02-23T15:53:18.294Z"
}
```

## OpenAPI Source

See [get-page-content-openapi.yml](../openapi/get-page-content-openapi.yml) — operation `get-static-content`.
