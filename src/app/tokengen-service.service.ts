import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {TokenMetaData} from "./tokenMetaData";
import {TenantData} from "./tenantData";

@Injectable()
export class TokenService {

  getTokenUrl: string;
  getTenantsUrl: string;
  getTenantDataUrl: string;
  updateTenantDataUrl: string;

  constructor(private http: HttpClient) {
    // this.getTokenUrl = 'http://172.32.3.125:8082/api/v1/gettoken';
    // this.getTenantsUrl = 'http://172.32.3.125:8082/api/v1/getalltenants';
    // this.getTenantDataUrl = 'http://172.32.3.125:8082/api/v1/getTenantDataByName';
    // this.updateTenantDataUrl = 'http://172.32.3.125:8082//api/v1/updatetenant';

    this.getTokenUrl = 'http://localhost:8080/api/v1/gettoken';
    this.getTenantsUrl = 'http://localhost:8080/api/v1/getalltenants';
    this.getTenantDataUrl = 'http://localhost:8080/api/v1/getTenantDataByName';
    this.updateTenantDataUrl = 'http://localhost:8080//api/v1/updatetenant';
  }

  public getTenantToken(tenantId) {
    let param = new HttpParams().set("tenantId",tenantId);
    let response = this.http.get<TokenMetaData>(this.getTokenUrl, {params: param});
    response.subscribe(val => console.log(val));
    return response;
  }

  public getAllTenants() {
    let response = this.http.get<String[]>(this.getTenantsUrl);
    response.subscribe(val => console.log(val));
    return response;
  }

  public getTenantDataByName(tenantId) {
    let param = new HttpParams().set("tenantId",tenantId);
    let response = this.http.get<TenantData>(this.getTenantDataUrl, {params: param});
    response.subscribe(val => console.log(val));
    return response;
  }

  public updateTenant(tenantData) {
    let response = this.http.post(this.updateTenantDataUrl, tenantData);
    response.subscribe(val => console.log(val));
    return response;
  }
}
