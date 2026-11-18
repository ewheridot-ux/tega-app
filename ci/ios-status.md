# iPhone build #169 — failure

Wed Nov 18 21:25:50 UTC 2026

```

www built with Supabase config
✔ Adding native Xcode project in ios in 27.09ms
✔ add in 27.37ms
✔ Copying web assets from www to ios/App/App/public in 45.76ms
✔ Creating capacitor.config.json in ios/App/App in 745.79μs
✔ copy ios in 111.55ms
✔ Updating iOS plugins in 1.83ms
✔ Updating iOS native dependencies with pod install in 16.43s
[info] Found 10 Capacitor plugins for ios:
       @capacitor/app@7.1.2
       @capacitor/filesystem@7.1.9
       @capacitor/geolocation@7.1.8
       @capacitor/haptics@7.0.5
       @capacitor/local-notifications@7.0.7
       @capacitor/share@7.0.4
       @capacitor/splash-screen@7.0.5
       @capacitor/status-bar@7.0.6
       @capgo/capacitor-health@7.2.15
       @ebarooni/capacitor-calendar@7.5.0
✔ update ios in 16.49s
[success] ios platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
✔ Copying web assets from www to ios/App/App/public in 121.84ms
✔ Creating capacitor.config.json in ios/App/App in 2.11ms
✔ copy ios in 162.92ms
✔ Updating iOS plugins in 1.62ms
✔ Updating iOS native dependencies with pod install in 7.77s
[info] Found 10 Capacitor plugins for ios:
       @capacitor/app@7.1.2
       @capacitor/filesystem@7.1.9
       @capacitor/geolocation@7.1.8
       @capacitor/haptics@7.0.5
       @capacitor/local-notifications@7.0.7
       @capacitor/share@7.0.4
       @capacitor/splash-screen@7.0.5
       @capacitor/status-bar@7.0.6
       @capgo/capacitor-health@7.2.15
       @ebarooni/capacitor-calendar@7.5.0
✔ update ios in 7.84s
[info] Sync finished in 8.295s
app capabilities: ['IN_APP_PURCHASE', 'HEALTHKIT', 'IN_APP_PURCHASE', 'IN_APP_PURCHASE']
com.ewheridot.tegaexe.widgets ok
com.ewheridot.tegaexe.share ok
== try: full (health=yes widgets+share=yes)
native code added (healthkit=true, extensions=true)
** ARCHIVE SUCCEEDED **
entitlements: healthkit keychain-access-groups 
TIER=full
Running altool at path '/Applications/Xcode_26.3.app/Contents/SharedFrameworks/ContentDelivery.framework/Resources/altool'...

2026-11-18 21:25:49.757 ERROR: [ContentDelivery.Uploader.60000303C040] GET BUILD UPLOAD STATE: received status code 502; bad gateway. (M73VJTGE62LYH4I2HN6ANDXNA4) (502) 
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        body {
            font-family: "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;
            font-size: 15px;
            font-weight: 200;
            line-height: 20px;
            color: #4c4c4c;
            text-align: center;
        }

        .section {
            margin-top: 50px;
        }
    </style>
</head>
<body>
<div class="section">
    <h1>&#63743;</h1>

    <h3>Bad Gateway</h3>
    <p>Correlation Key: M73VJTGE62LYH4I2HN6ANDXNA4</p>
</div>
</body>
</html>

2026-11-18 21:25:49.786 ERROR: [ContentDelivery.Uploader.60000302E340] logKPIName: The server response returned an unknown MIME/TYPE: text/html.
2026-11-18 21:25:49.787 ERROR: [ContentDelivery.Uploader.60000302E340] logKpiName: Expecting status 2xx, but received status 502.
Response: <NSHTTPURLResponse: 0x60000253f520> { URL: https://contentdelivery.itunes.apple.com/MZContentDeliveryService/iris/v1/metricsAndLogging } { Status Code: 502, Headers {
    "Cache-Control" =     (
        "no-store"
    );
    "Content-Length" =     (
        555
    );
    "Content-Type" =     (
        "text/html"
    );
    Date =     (
        "Wed, 18 Nov 2026 21:25:50 GMT"
    );
    Server =     (
        "daiquiri/5"
    );
    "x-apple-jingle-correlation-key" =     (
        QCO5SCK4ETVFPBEGQ3DCWWKZTE
    );
    "x-daiquiri-debug-worker-pid" =     (
        46128
    );
    "x-daiquiri-instance" =     (
        "daiquiri:18493001:mr85p00it-hyhk03154801:7987:26RELEASE188:daiquiri-amp-all-shared-ext-001-mr"
    );
} }
2026-11-18 21:25:49.859  INFO: [ContentDelivery.Uploader.60000303C040] 
==========================================
UPLOAD SUCCEEDED with no errors, 1 warning
Delivery UUID: eddc5a42-7104-4fd9-b926-831e92079547
Transferred 8092295 bytes in 0.340 seconds (23.8MB/s, 190.279Mbps)
==========================================
2026-11-18 21:25:49.861  WARN: [altool.60000303C040] SDK version issue. This app was built with the iOS 26.2 SDK. Starting April 2027, iOS and iPadOS apps must be built with the iOS 27 SDK or later, included in Xcode 27 or later, in order to be uploaded to App Store Connect or submitted for distribution. (90725)
   server_warning : 
      code : 90725
      description : SDK version issue. This app was built with the iOS 26.2 SDK. Starting April 2027, iOS and iPadOS apps must be built with the iOS 27 SDK or later, included in Xcode 27 or later, in order to be uploaded to App Store Connect or submitted for distribution.
No errors, 1 warnings, uploading archive at '/Users/runner/work/_temp/out/App.ipa'.
```
