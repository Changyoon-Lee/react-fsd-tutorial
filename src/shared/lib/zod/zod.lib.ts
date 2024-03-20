export interface Contract<Raw, Data extends Raw> {
  isData: (prepared: Raw) => prepared is Data;
  getErrorMessages: (prepared: Raw) => string[];
}
