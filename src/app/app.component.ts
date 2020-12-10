import {Component, OnInit} from '@angular/core';
import {TokenService} from "./tokengen-service.service";
import {TokenMetaData} from "./tokenMetaData";
import { faCoffee, faClipboard } from '@fortawesome/free-solid-svg-icons';
import {TenantData} from "./tenantData";
import {ViewChild} from '@angular/core';
import {TenantDetailsComponent} from "./tenant-details/tenant-details.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  showResults = false;
  showDetails = false;
  title = 'AOS Token Generator';
  key = "";
  token = "";
  tenantId = "";
  faClipboard = faClipboard;
  hideSuccessMessageToken = true;
  hideSuccessMessageAPI = true;
  tenants: Array<any>;
  @ViewChild(TenantDetailsComponent) details: TenantDetailsComponent;

  constructor(
    public client: TokenService,
  ) {}

  ngOnInit(): void {
    this.client.getAllTenants().subscribe(data => {
        this.tenants = data;
        this.tenantId = this.tenants[0];
      },
      err => console.error(err),
      () => console.log('all tenants retrieved successfully!')
    );
  }

  getTenantData() {
    this.showResults = false;
    this.client.getTenantToken(this.tenantId).subscribe(
      (data: TokenMetaData) => {
        this.key = data.apiKey,
        this.token = "Bearer " + data.token
      },
      err => console.error(err),
      () => console.log('token retrieved successfully!')
      );
    this.showResults = true;
  }

  getTenantDetails() {
    this.details.title = this.tenantId;
    this.showDetails = true;

    this.details.getTenantDetails(this.tenantId);
  }

  createNewTenant() {
    alert("new tenant")
  }

  copy2ClipboardApiKey() {
    this.copy2Clipboard(false)
  }

  copy2ClipboardToken() {
    this.copy2Clipboard(true)
  }

  copy2Clipboard(isToken) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', isToken ? (this.token) : (this.key));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.fadeOutSuccessMsg(isToken);
  }
  fadeOutSuccessMsg(isToken) {
    isToken ? this.hideSuccessMessageToken = false : this.hideSuccessMessageAPI = false;
    setTimeout( () => {
      isToken ? this.hideSuccessMessageToken = true : this.hideSuccessMessageAPI = true;
    }, 1500);
  }

  selectionChanged(e) {
    this.tenantId = e.target.value;
  }

}
