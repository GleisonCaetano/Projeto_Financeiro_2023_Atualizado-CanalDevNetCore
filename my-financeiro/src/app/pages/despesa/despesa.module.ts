import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DespesaRoutingModule } from "./despesa-routing.module";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";

@NgModule({
    providers: [],
    declarations: [],
    imports: [CommonModule, DespesaRoutingModule, NavbarModule, SidebarModule]
})

export class DespesaModule{}