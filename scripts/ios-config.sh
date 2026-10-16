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
set_str UIUserInterfaceStyle "Dark"
set_bool ITSAppUsesNonExemptEncryption false
echo "Info.plist updated"
