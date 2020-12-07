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
    baseURI: string;
    tenantId: string;
    tnsname: string;
    userId: string;
  };

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

  BrowseAgentUI() {
    window.open(this.tenantData.agentURI, "_blank");
  }
}
