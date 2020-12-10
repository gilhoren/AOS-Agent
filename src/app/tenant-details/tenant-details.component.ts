import { Component, OnInit } from '@angular/core';
import {TokenService} from "../tokengen-service.service";
import {TenantData} from "../tenantData";
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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
        this.showToaster();
      },
      err => console.error(err),
      () => console.log('tenantData updated successfully! Yeah!')
    );
  }

  CreateTenant() {

  }

  EnableDisableUpdate() {
    this.updateEnabled = !this.updateEnabled;
    this.enableDisableTitle =  this.updateEnabled ? "Disable Update" : "Enable Update";
  }

  showToaster(){
    this.toastr.show("Tenant " + this.tenantData.tenantId + " updated successfully!")
  }
}
