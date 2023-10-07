import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Upload, calculateState, initialUploadState } from '@core/utilities';
import { Observable, scan } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected readonly apiURL: string;

  constructor(
    private http: HttpClient,
  ) {
    this.apiURL = `${environment.base_URL}/`;
  }

  readEntity<T>(apiExtension: string, query?: any): Observable<T> {
    return this.http.get<T>(this.apiURL + apiExtension, { params: new HttpParams({ fromObject: query }) });
  }

  createEntity<T>(apiExtension: string, body: T): Observable<T> {
    return this.http.post<T>(this.apiURL + apiExtension, body);
  }

  updateEntity<T>( apiExtension: string, body: T): Observable<T> {
    return this.http.put<T>(this.apiURL + apiExtension, body);
  }

  deleteEntity(apiExtension: string): Observable<any> {
    return this.http.delete(this.apiURL + apiExtension);
  }

  createEntityUpload<T>(body: Blob, apiExtension?: string, key: string = 'file'): Observable<Upload> {
    const data = new FormData().append(key, body);

    return this.http.post<T>(this.apiURL + apiExtension, data, {
      reportProgress: true,
      observe: 'events',
    }).pipe(scan(calculateState, initialUploadState));
  }

  createEntityDownload<T>(body: T, apiExtension?: string, reportProgress: boolean = false): Observable<Upload> | Observable<Blob> {
    if (reportProgress) {
      return this.http.post(this.apiURL + apiExtension, body, {
        responseType: 'blob',
        observe: 'events',
        reportProgress
      }).pipe(scan(calculateState, initialUploadState))
    }
    return this.http.post(this.apiURL + apiExtension, body, {
      responseType: 'blob',
    })
  }

  readEntityDownload(query?: any, apiExtension?: string, reportProgress: boolean = false): Observable<Upload> | Observable<Blob> {
    const params = new HttpParams({ fromObject: query });
    if (reportProgress) {
      return this.http.get(this.apiURL + apiExtension, {
        params: params,
        responseType: 'blob',
        observe: 'events',
        reportProgress
      }).pipe(scan(calculateState, initialUploadState))
    }

    return this.http.get(this.apiURL + apiExtension, {
      params: params,
      responseType: 'blob',
    })
  }
}

