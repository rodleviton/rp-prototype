export interface IPixelsMetadataModel {
  description: string;
  originalLanguage: string;
  topics: string[];
  files: {
    css: string;
    html: string;
    script: string;
  };
}
