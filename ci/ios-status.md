# iPhone build #164 — failure

Sun Nov 15 01:40:12 UTC 2026

```
"errors" : [ {
"id" : "EDCMFY323W67NKPEL7HRXNHIHE",
"status" : "403",
"code" : "FORBIDDEN.REQUIRED_AGREEMENTS_MISSING_OR_EXPIRED",
"title" : "A required agreement is missing or has expired.",
"detail" : "This request requires an in-effect agreement that has not been signed or has expired.",
"links" : {
"see" : "/business"
}
} ]
}

registered com.ewheridot.tegaexe.widgets False
com.ewheridot.tegaexe.widgets MISSING
GET /v1/bundleIds?filter[identifier]=com.ewheridot.tegaexe.share&include=bundleIdCapabilities -> 403 {
"errors" : [ {
"id" : "NFGTZ6OXMK4WPOAYVS74DBJKNE",
"status" : "403",
"code" : "FORBIDDEN.REQUIRED_AGREEMENTS_MISSING_OR_EXPIRED",
"title" : "A required agreement is missing or has expired.",
"detail" : "This request requires an in-effect agreement that has not been signed or has expired.",
"links" : {
"see" : "/business"
}
} ]
}

POST /v1/bundleIds -> 403 {
"errors" : [ {
"id" : "U4BZ55SS6UGVYQ2WYKNA6KWICM",
"status" : "403",
"code" : "FORBIDDEN.REQUIRED_AGREEMENTS_MISSING_OR_EXPIRED",
"title" : "A required agreement is missing or has expired.",
"detail" : "This request requires an in-effect agreement that has not been signed or has expired.",
"links" : {
"see" : "/business"
}
} ]
}

registered com.ewheridot.tegaexe.share False
com.ewheridot.tegaexe.share MISSING
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No profiles for 'com.ewheridot.tegaexe' were found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
== try: noHealth (health=no widgets+share=yes)
native code added (healthkit=false, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: keychain-access-groups 
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No profiles for 'com.ewheridot.tegaexe.share' were found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No profiles for 'com.ewheridot.tegaexe.widgets' were found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
== try: noWidgets (health=yes widgets+share=no)
native code added (healthkit=true, extensions=false)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No profiles for 'com.ewheridot.tegaexe' were found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
== try: basic (health=no widgets+share=no)
native code added (healthkit=false, extensions=false)
** ARCHIVE SUCCEEDED **
entitlements: keychain-access-groups 
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
== try: plain (no native code)
** ARCHIVE SUCCEEDED **
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
error: exportArchive Unable to process request - PLA Update available
error: exportArchive No signing certificate "iOS Distribution" found
```
