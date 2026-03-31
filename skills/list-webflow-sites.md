---
name: list-webflow-sites
description: >
  Retrieve a list of all Webflow sites accessible via the current API token.
  Use this skill when the user wants to see their Webflow sites, look up a site ID,
  check domain or locale settings, or find when a site was last published. Trigger
  when the user mentions listing sites, finding a Webflow site, or getting site details.
user_invocable: true
---

# List Webflow Sites

Retrieve all Webflow sites the current access token has access to via `GET https://api.webflow.com/v2/sites`.

## Authentication

Use a **Bearer token** in the `Authorization` header:

```
Authorization: Bearer <WEBFLOW_TOKEN>
```

Requires the `sites:read` OAuth scope.

## Request

**Endpoint:** `GET https://api.webflow.com/v2/sites`

No parameters or request body required.

## Example curl

```bash
curl -s \
  -H "Authorization: Bearer $WEBFLOW_TOKEN" \
  https://api.webflow.com/v2/sites
```

## Response (200 OK)

Returns an object with a `sites` array. Each site includes:

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique site identifier |
| `workspaceId` | string | Workspace the site belongs to |
| `displayName` | string | Human-readable site name |
| `shortName` | string | Slugified site name |
| `previewUrl` | string | Screenshot URL |
| `timeZone` | string | Site timezone |
| `createdOn` | datetime | When the site was created |
| `lastUpdated` | datetime | When the site was last modified |
| `lastPublished` | datetime | When the site was last published |
| `parentFolderId` | string\|null | Parent folder ID if in a folder |
| `customDomains` | array | Registered domains (id, url, lastPublished) |
| `locales` | object | Primary and secondary locales |
| `dataCollectionEnabled` | boolean | Whether data collection is on |
| `dataCollectionType` | string | `always`, `optOut`, or `disabled` |

### Example Response

```json
{
  "sites": [
    {
      "id": "690a6acf18713a7e3b856b21",
      "workspaceId": "690a6aae4dec3a2a53936792",
      "displayName": "Naftiko Website",
      "shortName": "naftiko-website",
      "previewUrl": "https://screenshots.webflow.com/sites/690a6acf18713a7e3b856b21/20260205233327_b2edebc55003edb77b0ebe3cb75e7bc1.png",
      "timeZone": "America/New_York",
      "createdOn": "2025-11-04T21:06:23.568Z",
      "lastUpdated": "2026-03-17T23:44:55.315Z",
      "lastPublished": "2026-02-05T23:34:49.506Z",
      "parentFolderId": null,
      "customDomains": [
        {
          "id": "69278ed8fad4023ddab44fc1",
          "url": "www.naftiko.io",
          "lastPublished": "2026-02-05T23:34:49.506Z"
        },
        {
          "id": "69278ed7fad4023ddab44fa1",
          "url": "naftiko.io",
          "lastPublished": "2026-02-05T23:34:49.506Z"
        }
      ],
      "locales": {
        "primary": {
          "id": "691ced877a6ed28f42bd2fce",
          "cmsLocaleId": "691ced877a6ed28f42bd2fb9",
          "enabled": false,
          "displayName": "English",
          "displayImageId": null,
          "redirect": true,
          "subdirectory": "en",
          "tag": "en"
        },
        "secondary": []
      },
      "dataCollectionEnabled": false,
      "dataCollectionType": "always"
    }
  ]
}
```

## OpenAPI Source

See [list-sites-openapi.yml](../openapi/list-sites-openapi.yml) — operation `list-sites`.
