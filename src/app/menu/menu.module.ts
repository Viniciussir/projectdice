import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuInicialComponent } from './menu-inicial/menu-inicial.component';
import { MenuManterComponent } from './menu-manter/menu-manter.component';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {AccordionModule} from 'primeng/accordion';             
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {SplitterModule} from 'primeng/splitter';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from "primeng/inputmask";
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipsModule } from 'primeng/chips';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {PasswordModule} from 'primeng/password';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {RippleModule} from 'primeng/ripple';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import {SliderModule} from 'primeng/slider';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ProgressBarModule} from 'primeng/progressbar';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {PanelModule} from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import {ImageModule} from 'primeng/image';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import {GalleriaModule} from 'primeng/galleria';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {SelectButtonModule} from 'primeng/selectbutton';


@NgModule({
  declarations: [
    MenuInicialComponent,
    MenuManterComponent,
    MenuAdminComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    FormsModule,

    CarouselModule,
    BrowserAnimationsModule,
    CarouselModule,
    ButtonModule,
    ToastModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule,
    CardModule,
    DividerModule,
    SplitterModule,
    ChipsModule,
    AutoCompleteModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    CalendarModule,
    PasswordModule,
    MessagesModule,
    MessageModule,
    RippleModule,
    TableModule,
    SliderModule,
    ContextMenuModule,
    DialogModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    ConfirmDialogModule,
    RouterModule,
    PanelModule,
    MenuModule,
    ImageModule,
    GalleriaModule,
    ToggleButtonModule,
    SelectButtonModule
  ],
  exports: [
    MenuInicialComponent
  ],
  providers: [MessageService, ConfirmationService],
})
export class MenuAcessoModule { }
