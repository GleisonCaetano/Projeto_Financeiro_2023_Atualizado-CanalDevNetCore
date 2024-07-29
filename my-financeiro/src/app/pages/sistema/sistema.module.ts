import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SistemaRoutingModule } from "./sistema-routing.module";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    providers: [],
    declarations: [],
    imports: [
        CommonModule, 
        SistemaRoutingModule, 
        NavbarModule, 
        SidebarModule, 
        ReactiveFormsModule
    ]
})

export class SistemaModule{}