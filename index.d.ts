export declare function formatBase64(base64: string): string;
export declare function base64ToArrayBuffer(base64: string): ArrayBuffer;
export declare function base64ToBuffer(base64: string): Buffer;
export declare function blobFromBase64(base64: string, type: string): Blob;
export declare function formDataFromBase64(base64: string, type: string, fieldName?: string, fields?: any): FormData;
export declare function uploadMime(url: string, requestHeader?: any, formData: FormData): Promise<any>;