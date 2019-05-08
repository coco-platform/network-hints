export interface NetworkHintsOptions {
  prefetch?: string[];
  preload?: string[];
}

export class NetworkHintsPlugin {
  constructor(options: NetworkHintsOptions) {}
}
