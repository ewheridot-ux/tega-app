# TestFlight setup

```
App: Tega.exe 6823876020
Build 51 VALID  enc=False internal=IN_BETA_TESTING 2026-10-17T14:00:48-07:00
Build 50 VALID  enc=False internal=IN_BETA_TESTING 2026-10-17T13:56:18-07:00
Build 49 VALID  enc=False internal=IN_BETA_TESTING 2026-10-17T13:21:45-07:00
Build 48 VALID  enc=False internal=IN_BETA_TESTING 2026-10-17T12:53:25-07:00
Build 47 VALID  enc=False internal=IN_BETA_TESTING 2026-10-17T12:38:54-07:00
Build 46 VALID  enc=False internal=IN_BETA_TESTING 2026-10-17T12:27:24-07:00
Build 44 VALID  enc=False internal=IN_BETA_TESTING 2026-10-17T11:56:45-07:00
Build 43 VALID  enc=False internal=IN_BETA_TESTING 2026-10-17T11:07:19-07:00
Build 41 VALID  enc=False internal=IN_BETA_TESTING 2026-10-17T04:08:09-07:00
Build 40 VALID  enc=False internal=IN_BETA_TESTING 2026-10-17T03:55:56-07:00
Build 39 VALID  enc=False internal=IN_BETA_TESTING 2026-10-17T03:47:41-07:00
Build 38 VALID  enc=False internal=IN_BETA_TESTING 2026-10-17T03:16:22-07:00
Internal group exists: Me
Adding tester: tewherido@icloud.com
POST /v1/betaTesters -> 409 {
  "errors" : [ {
    "id" : "bf7385dd-f54a-4acb-bab4-f21312bd43ae",
    "status" : "409",
    "code" : "STATE_ERROR",
    "title" : "The request cannot be fulfilled because of the state of another resource.",
    "detail" : "Tester(s) cannot be assigned",
    "meta" : {
      "associatedErrors" : { }
    }
  } ]
}
POST /v1/betaGroups/07d3cc28-c671-4ca1-942c-26a70ca8b0ab/relationships/betaTesters -> 409 {
  "errors" : [ {
    "id" : "c43ff1b5-c352-462d-819d-845723a5e2af",
    "status" : "409",
    "code" : "STATE_ERROR",
    "title" : "The request cannot be fulfilled because of the state of another resource.",
    "detail" : "Tester(s) cannot be assigned",
    "meta" : {
      "associatedErrors" : { }
    }
  } ]
}
Existing tester linked to the group
```
