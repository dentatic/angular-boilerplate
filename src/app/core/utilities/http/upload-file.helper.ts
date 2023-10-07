import { HttpEvent, HttpResponse, HttpEventType, HttpProgressEvent } from "@angular/common/http";

export interface Upload {
  progress: number
  state: HttpState
  data?: any
}

export enum HttpState {
  IN_PROGRESS,
  PENDING,
  DONE
}

export const  initialUploadState: Upload = { state: HttpState.PENDING, progress: 0 };

function isHttpResponse<T>(event: HttpEvent<T>): event is HttpResponse<T> {
  return event.type === HttpEventType.Response;
}

function isHttpProgressEvent<T>(
  event: HttpEvent<T>
): event is HttpProgressEvent {
  return (
    event.type === HttpEventType.DownloadProgress ||
    event.type === HttpEventType.UploadProgress
  );
}

export const calculateState = (
  upload: Upload,
  event: HttpEvent<any>
): Upload => {
  if (isHttpProgressEvent(event)) {
    return {
      progress: event.total
        ? Math.round((100 * event.loaded) / event.total)
        : upload.progress,
      state: HttpState.IN_PROGRESS,

    };
  }
  if (isHttpResponse(event)) {
    return {
      progress: 100,
      state: HttpState.DONE,
      data: event.body,
    };
  }
  return upload;
};
