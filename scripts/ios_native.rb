# Adds Tega's own Swift code (and optionally the widget + share extensions) to the Capacitor Xcode project.
# usage: ruby scripts/ios_native.rb <healthkit yes|no> <extensions yes|no>
require 'xcodeproj'
hk, ext = ARGV[0] == 'yes', ARGV[1] == 'yes'
team = ENV.fetch('TEAM')
proj = Xcodeproj::Project.open('ios/App/App.xcodeproj')
app = proj.targets.find { |t| t.name == 'App' }
grp = proj.main_group['App']
SHARED = %w[TegaShared.swift TegaWidgetData.swift TegaActivity.swift]
refs = {}
Dir.children('native/ios/App').sort.each do |f|
  refs[f] = grp.new_reference(f)
  app.add_file_references([refs[f]])
end
app.build_configurations.each do |c|
  s = c.build_settings
  s['IPHONEOS_DEPLOYMENT_TARGET'] = '15.0'
  s['CODE_SIGN_ENTITLEMENTS'] = 'App/App.entitlements'
  s['OTHER_LDFLAGS'] = ['$(inherited)', '-weak_framework', 'ActivityKit', '-weak_framework', 'AppIntents', '-weak_framework', 'WidgetKit']
end
def ext_target(proj, app, name, bid, dir, files, shared_refs, team, plist)
  t = proj.new_target(:app_extension, name, :ios, '16.2', nil, :swift)
  t.frameworks_build_phase.files.to_a.each { |f| f.file_ref&.remove_from_project; f.remove_from_project }  # SDK-pinned Foundation ref breaks on newer Xcode; it links itself
  g = proj.main_group.new_group(name, name)
  files.each { |f| t.add_file_references([g.new_reference(f)]) }
  t.add_file_references(shared_refs)
  File.write("ios/App/#{name}/Info.plist", plist)
  File.write("ios/App/#{name}/#{name}.entitlements", ENTS)
  t.build_configurations.each do |c|
    s = c.build_settings
    s['PRODUCT_BUNDLE_IDENTIFIER'] = bid
    s['PRODUCT_NAME'] = name
    s['INFOPLIST_FILE'] = "#{name}/Info.plist"
    s['GENERATE_INFOPLIST_FILE'] = 'YES'
    s['INFOPLIST_KEY_CFBundleDisplayName'] = 'Tega.exe'
    s['CODE_SIGN_ENTITLEMENTS'] = "#{name}/#{name}.entitlements"
    s['DEVELOPMENT_TEAM'] = team
    s['SWIFT_VERSION'] = '5.0'
    s['TARGETED_DEVICE_FAMILY'] = '1,2'
    s['IPHONEOS_DEPLOYMENT_TARGET'] = '16.2'
    s['SKIP_INSTALL'] = 'YES'
    s['APPLICATION_EXTENSION_API_ONLY'] = 'YES'
    s['LD_RUNPATH_SEARCH_PATHS'] = ['$(inherited)', '@executable_path/Frameworks', '@executable_path/../../Frameworks']
    s['MARKETING_VERSION'] = '1.0'
    s['CURRENT_PROJECT_VERSION'] = '1'
  end
  app.add_dependency(t)
  t
end
ENTS = <<~X
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0"><dict><key>keychain-access-groups</key><array><string>$(DEVELOPMENT_TEAM).com.ewheridot.tegaexe.shared</string></array></dict></plist>
X
def plist(ext_body)
  <<~X
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0"><dict>
    <key>TegaKeychainGroup</key><string>$(DEVELOPMENT_TEAM).com.ewheridot.tegaexe.shared</string>
    <key>NSExtension</key><dict>#{ext_body}</dict>
    </dict></plist>
  X
end
if ext
  shared = SHARED.map { |f| refs[f] }
  w = ext_target(proj, app, 'TegaWidgets', 'com.ewheridot.tegaexe.widgets', 'TegaWidgets', Dir.children('ios/App/TegaWidgets').grep(/\.swift$/).sort, shared, team,
                 plist('<key>NSExtensionPointIdentifier</key><string>com.apple.widgetkit-extension</string>'))
  sh = ext_target(proj, app, 'TegaShare', 'com.ewheridot.tegaexe.share', 'TegaShare', Dir.children('ios/App/TegaShare').grep(/\.swift$/).sort, [refs['TegaShared.swift']], team,
                  plist('<key>NSExtensionPointIdentifier</key><string>com.apple.share-services</string><key>NSExtensionPrincipalClass</key><string>$(PRODUCT_MODULE_NAME).ShareViewController</string><key>NSExtensionAttributes</key><dict><key>NSExtensionActivationRule</key><dict><key>NSExtensionActivationSupportsWebURLWithMaxCount</key><integer>1</integer><key>NSExtensionActivationSupportsText</key><true/></dict></dict>'))
  ph = app.new_copy_files_build_phase('Embed Foundation Extensions')
  ph.symbol_dst_subfolder_spec = :plug_ins
  [w, sh].each { |t| ph.add_file_reference(t.product_reference).settings = { 'ATTRIBUTES' => ['RemoveHeadersOnCopy'] } }
  # keep the embed step ahead of the CocoaPods scripts (avoids Xcode's build-cycle error)
  app.build_phases.delete(ph)
  i = app.build_phases.index { |p| p.is_a?(Xcodeproj::Project::Object::PBXResourcesBuildPhase) } || app.build_phases.size - 1
  app.build_phases.insert(i + 1, ph)
end
proj.save
puts "native code added (healthkit=#{hk}, extensions=#{ext})"
