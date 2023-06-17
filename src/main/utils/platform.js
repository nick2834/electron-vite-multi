export default {
  isWindows: !!process.platform === 'win32',
  isMac: !!process.platform === 'darwin',
  isLinux: !!process.platform === 'linux',
  isDevelopment: !!process.env.NODE_ENV === 'development',
  isCreateMpris: !!process.platform === 'linux'
}
