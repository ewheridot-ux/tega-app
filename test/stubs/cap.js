const noop = async () => ({});
const log = (n) => (...a) => { (window.__native_calls ||= []).push([n, JSON.stringify(a).slice(0,300)]); return Promise.resolve({ notifications: [], display: 'granted', uri: 'file:///tmp/x' }); };
export const LocalNotifications = { checkPermissions: log('checkPermissions'), requestPermissions: log('requestPermissions'), schedule: log('schedule'), cancel: log('cancel'), getPending: log('getPending') };
export const Haptics = { impact: log('impact') }; export const ImpactStyle = { Light: 'LIGHT', Medium: 'MEDIUM' };
export const Share = { share: log('share') };
export const Filesystem = { writeFile: log('writeFile') }; export const Directory = { Cache: 'CACHE' };
export const App = { addListener: () => ({}) };
export const StatusBar = { setStyle: noop }; export const Style = { Dark: 'DARK' };
export const SplashScreen = { hide: noop };
