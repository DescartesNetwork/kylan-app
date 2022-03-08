export enum PayState {
  Mint = 'mint',
  Payback = 'payback',
}

export const CERTIFICATE_STATUS = {
  uninitialized: { uninitialized: {} },
  active: { active: {} },
  printOnly: { printOnly: {} },
  burnOnly: { burnOnly: {} },
  paused: { paused: {} },
}

export const KUSD_DECIMAL = 6

export enum Role {
  user = 'user',
  admin = 'admin',
}
