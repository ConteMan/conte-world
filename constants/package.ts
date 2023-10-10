import pkg from './package.json'

export interface PkgVersionInfo {
  name: string
  version: string
}

interface Package {
  name: string
  version: string
  dependencies?: Record<string, string> | undefined
  devDependencies: Record<string, string> | undefined
  [key: string]: any
}

export interface PkgJson {
  name: string
  version: string
  dependencies: PkgVersionInfo[] | undefined
  devDependencies: PkgVersionInfo[] | undefined
}

const pkgWithType = pkg as Package

function transformVersionData(tuple: [string, string]): PkgVersionInfo {
  const [name, version] = tuple
  return {
    name,
    version,
  }
}

export const packageJson: PkgJson = {
  name: pkgWithType.name,
  version: pkgWithType.version,
  dependencies: pkgWithType.dependencies ? Object.entries(pkgWithType.dependencies).map(item => transformVersionData(item)) : undefined,
  devDependencies: pkgWithType.devDependencies ? Object.entries(pkgWithType.devDependencies).map(item => transformVersionData(item)) : undefined,
}
