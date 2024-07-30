import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DespesaRoutingModule } from "./despesa-routing.module";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
    providers: [],
    declarations: [],
    imports: [
        CommonModule, 
        DespesaRoutingModule, 
        NavbarModule, 
        SidebarModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule
    ]
})

export class DespesaModule{}