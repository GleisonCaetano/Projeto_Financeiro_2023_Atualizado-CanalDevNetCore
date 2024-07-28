import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SistemaRoutingModule } from "./sistema-routing.module";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";

@NgModule({
    providers: [],
    declarations: [],
    imports: [CommonModule, SistemaRoutingModule, NavbarModule, SidebarModule]
})

export class SistemaModule{}