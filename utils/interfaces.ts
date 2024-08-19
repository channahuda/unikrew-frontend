export interface ApiHelperProps {
  url: string;
  method: string;
  data?: object;
  contentType?: string;
}

export interface UploadEmployeeFileProps {
  file: File;
}
