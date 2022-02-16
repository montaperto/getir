# Introduction

This is a technical test made by Andrea Montaperto for Gedit

## Endpoint

```http
POST /
```
## Body Request

```json
{
    "startDate": "2016-01-21",
    "endDate": "2018-02-02",
    "minCount": 2700,
    "maxCount": 3000
}
```

## Response


```json
{
    "code": 0,
    "msg": "success",
    "records": [
        {
            "key": "ibfRLaFT",
            "createdAt": "2016-12-25T16:43:27.909Z",
            "totalCount": 2892
        },
        {
            "key": "pxClAvll",
            "createdAt": "2016-12-19T10:00:40.050Z",
            "totalCount": 2772
        }
    ]
}
```

The `code` attribute contains a custom status code.
| Code | Description |
| :--- | :--- |
| `0` | Success |
| `1` | Bad Request |
| `2` | Internal Server Error |

The `msg` attribute is related to the code.

The `record` attribute will include all the filtered items according to the request. This array
includes items of “key”, “createdAt” and “totalCount” which is the sum of the “counts” array in the document.

## Status Codes

Gophish returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 400 | `BAD REQUEST` |
| 500 | `INTERNAL SERVER ERROR` |