#!/bin/bash
# Native settings that `cap add ios` doesn't set: name, permissions text, dark UI, encryption answer.
set -euo pipefail
P=ios/App/App/Info.plist
pb(){ /usr/libexec/PlistBuddy -c "$1" "$P" 2>/dev/null || true; }
set_str(){ pb "Delete :$1"; /usr/libexec/PlistBuddy -c "Add :$1 string $2" "$P"; }
set_bool(){ pb "Delete :$1"; /usr/libexec/PlistBuddy -c "Add :$1 bool $2" "$P"; }
set_str CFBundleDisplayName "Tega.exe"
set_str NSCameraUsageDescription "Take photos of your pieces, art and progress."
set_str NSPhotoLibraryUsageDescription "Add photos from your library to Datum, your art wall and your room."
set_str NSPhotoLibraryAddUsageDescription "Save bench photos and cards to your Photos."
set_str NSLocationWhenInUseUsageDescription "Find castings and casters near you."
set_str NSLocationAlwaysAndWhenInUseUsageDescription "Tega.exe only uses your location while you have the app open, to find castings and casters near you."
set_str NSHealthShareUsageDescription "Tega.exe reads your workouts, sleep, steps and weight so the Gym, check-in and Stats fill themselves."
set_str NSHealthUpdateUsageDescription "Tega.exe can save workouts you log in the app to Apple Health."
set_str NSCalendarsUsageDescription "Tega.exe reads your calendar so bookings and hangouts show up without logging them."
set_str NSCalendarsFullAccessUsageDescription "Tega.exe reads your calendar so bookings and hangouts show up without logging them."
set_str UIUserInterfaceStyle "Dark"
# portrait only (iPhone and iPad)
for K in UISupportedInterfaceOrientations "UISupportedInterfaceOrientations~ipad"; do pb "Delete :$K"; /usr/libexec/PlistBuddy -c "Add :$K array" -c "Add :$K:0 string UIInterfaceOrientationPortrait" "$P"; done
set_bool UIRequiresFullScreen true
# tegaexe:// links for Siri Shortcuts and quick capture
pb "Delete :CFBundleURLTypes"
/usr/libexec/PlistBuddy -c "Add :CFBundleURLTypes array" -c "Add :CFBundleURLTypes:0 dict" -c "Add :CFBundleURLTypes:0:CFBundleURLName string com.ewheridot.tegaexe" -c "Add :CFBundleURLTypes:0:CFBundleURLSchemes array" -c "Add :CFBundleURLTypes:0:CFBundleURLSchemes:0 string tegaexe" "$P"
set_bool ITSAppUsesNonExemptEncryption false
# HealthKit needs an entitlement
cat > ios/App/App/App.entitlements <<'ENT'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict><key>com.apple.developer.healthkit</key><true/><key>com.apple.developer.healthkit.access</key><array/></dict></plist>
ENT
echo "Info.plist updated"
