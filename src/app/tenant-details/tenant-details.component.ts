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
  updateEnabled = false;
  enableDisableTitle = "Enable Update";
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

  UpdateTenant() {
    this.client.updateTenant(this.tenantData).subscribe(
      (data: boolean) => {

      },
      err => console.error(err),
      () => console.log('tenantData updated successfully! Yeah!')
    );
  }

  EnableDisableUpdate() {
    this.updateEnabled = !this.updateEnabled;
    this.enableDisableTitle =  this.updateEnabled ? "Disable Update" : "Enable Update";
  }
}
