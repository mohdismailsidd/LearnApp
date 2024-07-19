import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface IBaseService<T> {
  baseUrl: string
  get<T>(url: string): Promise<T[]>
  getById<T>(url: string, id: number): Promise<T>
  post<T>(url: string, entity: T): Promise<T>
  patch<T>(url: string, entity: T): Promise<T>
  delete<T>(url: string, id: number): Promise<T>
}

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> implements IBaseService<T> {
  baseUrl: string = environment.courseApiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  public get<T>(url: string) : Promise<T[]>{
    return this.sendRequestForAll(url, "GET");
  }

  public getById<T>(url: string, id: number): Promise<T> {
    url = url + "/" + id;
    return this.sendRequest(url, "GET");//this.httpClient.get<T>(url, { headers: this.AddHeaders() });
  }

  public post<T>(url: string, body: T): Promise<T> {
    return this.sendRequest(url, "POST",  body);//return this.httpClient.post<T>(url, body, { headers: this.AddHeaders() });
  }

  public patch<T>(url: string, body: T): Promise<T> {
    return this.sendRequest(url, "PATCH", body);//return this.httpClient.patch<T>(url, body, { headers: this.AddHeaders() });
  }

  public delete<T>(url: string, id: number): Promise<T> {
    url = url + "/" + id;
    return this.sendRequest(url, "DELETE");//return this.httpClient.delete<T>(url, { headers: this.AddHeaders() } );
  }

  private sendRequest<T>(url: string, methodType:string, body?: T) :  Promise<T>
  {
    let  request: Request;
    debugger;
    if(typeof body  !== 'undefined')
    {
      request = new Request(url, {
        method: methodType,
        body: JSON.stringify(body),
        headers: this.AddHeaders()
      });
    }
    else{ 
      request = new Request(url, {
        method: methodType,
        headers: this.AddHeaders()
      });
    }

    console.log(request);
    console.log(request.headers);
    console.log(request.body);
   
   return fetch(request)
     .then(response => {
      debugger;
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
      .then(data => {
        debugger;
        // Process the retrieved user data
        console.log('Data:', data);
        return data;
      })
      .catch(error => {
        console.error('Error:', error);
        return error;
      });
  }

  private sendRequestForAll<T>(url: string, methodType:string, id?: number, body?: T) :  Promise<T[]>
  {
    let  request: Request;

     if(typeof body  !== 'undefined')
     {
      request = new Request(url, {
        method: methodType,
        body: JSON.stringify(body),
        headers: this.AddHeaders()
      });
     }
     else{ 
      request = new Request(url, {
        method: methodType,
        headers: this.AddHeaders()
      });
    }

    console.log(request);
    console.log(request.headers);
   
   return fetch(request)
     .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
      .then(data => {
        debugger;
        // Process the retrieved user data
        console.log('Data:', data);
        return data;
      })
      .catch(error => {
        console.error('Error:', error);
        return error;
      });
  }

  AddHeaders() {
    let httpHeaders = new Headers();
    httpHeaders.append("Access-Control-Allow-Headers", "Content-Type");
    httpHeaders.append("Access-Control-Allow-Methods", "*");
    httpHeaders.append("Access-Control-Allow-Origin", "*");
    httpHeaders.append("Content-Type", "application/json");
    return httpHeaders;
  }
}
