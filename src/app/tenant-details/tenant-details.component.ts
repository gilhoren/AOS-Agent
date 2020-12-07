import { Component, OnInit } from '@angular/core';
import {TokenService} from "../tokengen-service.service";
import {TenantData} from "../tenantData";

@Component({
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.component.html',
  styleUrls: ['./tenant-details.component.css']
})
export class TenantDetailsComponent implements OnInit {

  title = 'Tenant Details';
  tenantData: TenantData = new class implements TenantData {
    agentURI: string;
    agentspringboot: string;
    aosURI: string;
    aospassword: string;
    baseURI: string;
    fulltns: string;
    grafana: string;
    kibana: string;
    tenantId: string;
    tnsname: string;
    userId: string;
  }

  constructor(
    public client: TokenService,

  ) {}

  ngOnInit(): void {
    this.tenantData.tnsname = "";
  }

  getTenantDetails(tenantId) {
    this.client.getTenantDataByName(tenantId).subscribe(
      (data: TenantData) => {
        this.tenantData = data;
      },
      err => console.error(err),
      () => console.log('tenantData retrieved successfully! Yeah!')
    );
  }

  BrowseUrl(urlToBrowse: string) {
    window.open(urlToBrowse, "_blank");
  }
}
