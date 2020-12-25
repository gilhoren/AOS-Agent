import { Component, OnInit } from '@angular/core';
import {TokenService} from "../tokengen-service.service";
import {TenantData} from "../tenantData";
import { ToastrService } from 'ngx-toastr';
import { faCoffee, faClipboard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.component.html',
  styleUrls: ['./tenant-details.component.css']
})
export class TenantDetailsComponent implements OnInit {

  title = 'Tenant Details';
  updateEnabled = false;
  enableDisableTitle = "Enable Update";
  faClipboard = faClipboard;
  selectedModule = "Master Data Management";
  swaggerKeyValue: Map<string, string> = new Map<string, string>();
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
    tenantPurpose: string;
  }

  constructor(
    public client: TokenService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.tenantData.tnsname = "";
    this.swaggerKeyValue.set("Master Data Management","mdm_2");
    this.swaggerKeyValue.set("Master Reference Data","mdm");
    this.swaggerKeyValue.set("Unified Product Catalog","upc");
    this.swaggerKeyValue.set("Inventory","uis");
    this.swaggerKeyValue.set("Rate Card","ratecard");
    this.swaggerKeyValue.set("Data Ingestor","dataingestor");
    this.swaggerKeyValue.set("Target Service","target");
    this.swaggerKeyValue.set("Export Service","export");
    this.swaggerKeyValue.set("May I Service","mayiservice");
    this.swaggerKeyValue.set("Unified Planner","unifiedplanner");
    this.swaggerKeyValue.set("ORGANIZATION","organization");
    this.swaggerKeyValue.set("Notes","notes");
    this.swaggerKeyValue.set("Unified Trafficking Service","uts");
    this.swaggerKeyValue.set("Reports","reports");
    this.swaggerKeyValue.set("DASHBOARDIM","dashboardim");
    this.swaggerKeyValue.set("Attachments","attachments");
    this.swaggerKeyValue.set("User Management","um");
    this.swaggerKeyValue.set("Ingress Service","ingress");
    this.swaggerKeyValue.set("Integration Manager Controller","imcontroller");
    this.swaggerKeyValue.set("Unison","unison");
    this.swaggerKeyValue.set("Notification Service","notifications");
    this.swaggerKeyValue.set("Connect Organization","connectorganization");
    this.swaggerKeyValue.set("Avails","avails");
    this.swaggerKeyValue.set("Template Service","templateservice");
    this.swaggerKeyValue.set("Workflow Server","workflowserver");
    this.swaggerKeyValue.set("Custom Fields","customfields");
    this.swaggerKeyValue.set("User Settings","usersettings");
    this.swaggerKeyValue.set("Products","products");
    this.swaggerKeyValue.set("Book Creation","bookcreation");
    this.swaggerKeyValue.set("Ratings","ratings");
    this.swaggerKeyValue.set("Connect Mapper","connectmapper");
    this.swaggerKeyValue.set("CRM Service","crm");
    this.swaggerKeyValue.set("SCHEDULELOG","schedulelog");
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

  OpenSwagger() {
    let url = this.tenantData.baseURI + this.swaggerKeyValue.get(this.selectedModule) + "/swagger-ui.html";
    this.BrowseUrl(url);
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

  EnableDisableUpdate() {
    this.updateEnabled = !this.updateEnabled;
    this.enableDisableTitle =  this.updateEnabled ? "Disable Update" : "Enable Update";
  }

  showToaster(){
    this.toastr.show("Tenant " + this.tenantData.tenantId + " updated successfully!")
  }

  copy2Clipboard(data) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', data);
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }



}
