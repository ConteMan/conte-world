declare namespace Profile {
  type ATarget = '_self' | '_blank' | '_parent' | '_top'
  interface navItem {
    name: string
    link: string
    target: ATarget
  }
  interface socialItem {
    name: string
    link: string
    target: ATarget
    icon: string
  }
  interface RecordInfo {
    num?: string
    policeText?: string
    policeNum?: string
  }
  export interface Data {
    logo: string
    siteName: string
    userName: string
    tag: string
    slogan: string
    nav?: navItem[]
    social?: socialItem[]
    createdAt: string
    recordInfo?: RecordInfo
  }
}