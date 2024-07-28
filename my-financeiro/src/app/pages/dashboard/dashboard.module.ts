import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";

@NgModule({
    providers: [],
    declarations: [],
    imports: [CommonModule, DashboardRoutingModule, NavbarModule, SidebarModule]
})

export class DashboardModule{}