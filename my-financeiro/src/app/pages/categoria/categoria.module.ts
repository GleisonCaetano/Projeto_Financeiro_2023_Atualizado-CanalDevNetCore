import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoriaRoutingModule } from "./categoria-routing.module";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";

@NgModule({
    providers: [],
    declarations: [],
    imports: [CommonModule, CategoriaRoutingModule, NavbarModule, SidebarModule]
})

export class CategoriaModule{}