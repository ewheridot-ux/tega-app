#!/bin/bash
# usage: scripts/ios-native.sh <healthkit yes|no> <extensions yes|no>   (run on a fresh copy of ios/)
set -euo pipefail
HK=$1; EXT=$2; A=ios/App/App; P=$A/Info.plist
cp native/ios/App/*.swift $A/
if [ "$EXT" = yes ]; then mkdir -p ios/App/TegaWidgets ios/App/TegaShare; cp native/ios/Widgets/*.swift ios/App/TegaWidgets/; cp native/ios/Share/*.swift ios/App/TegaShare/; fi
pb(){ /usr/libexec/PlistBuddy -c "$1" "$P" 2>/dev/null || true; }
pb "Delete :TegaKeychainGroup"; /usr/libexec/PlistBuddy -c "Add :TegaKeychainGroup string \$(DEVELOPMENT_TEAM).com.ewheridot.tegaexe.shared" "$P"
pb "Delete :NSFaceIDUsageDescription"; /usr/libexec/PlistBuddy -c "Add :NSFaceIDUsageDescription string Unlock Tega.exe with Face ID." "$P"
pb "Delete :NSSupportsLiveActivities"; /usr/libexec/PlistBuddy -c "Add :NSSupportsLiveActivities bool true" "$P"
pb "Delete :BGTaskSchedulerPermittedIdentifiers"; /usr/libexec/PlistBuddy -c "Add :BGTaskSchedulerPermittedIdentifiers array" -c "Add :BGTaskSchedulerPermittedIdentifiers:0 string com.ewheridot.tegaexe.refresh" "$P"
pb "Delete :UIBackgroundModes"; /usr/libexec/PlistBuddy -c "Add :UIBackgroundModes array" -c "Add :UIBackgroundModes:0 string fetch" "$P"
[ "$EXT" = yes ] && { pb "Delete :TegaHasWidgets"; /usr/libexec/PlistBuddy -c "Add :TegaHasWidgets bool true" "$P"; }
# entitlements: shared keychain always, HealthKit when asked
HKE=""; [ "$HK" = yes ] && HKE='<key>com.apple.developer.healthkit</key><true/><key>com.apple.developer.healthkit.access</key><array/>'
cat > $A/App.entitlements <<ENT
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>$HKE<key>keychain-access-groups</key><array><string>\$(DEVELOPMENT_TEAM).com.ewheridot.tegaexe.shared</string></array></dict></plist>
ENT
# the web view controller that registers Tega's plugin
sed -i '' 's/customClass="CAPBridgeViewController" customModule="Capacitor"/customClass="TegaViewController" customModule="App" customModuleProvider="target"/' $A/Base.lproj/Main.storyboard
grep -q TegaViewController $A/Base.lproj/Main.storyboard || { echo "storyboard patch missed"; exit 1; }
# background refresh must be registered while the app launches
perl -0pi -e 's/(didFinishLaunchingWithOptions[^{]*\{\n)/$1        TegaBG.register()\n/' $A/AppDelegate.swift
grep -q "TegaBG.register" $A/AppDelegate.swift || echo "note: background refresh not wired (AppDelegate changed)"
gem list -i xcodeproj >/dev/null || gem install xcodeproj --no-document >/dev/null
ruby scripts/ios_native.rb "$HK" "$EXT"
