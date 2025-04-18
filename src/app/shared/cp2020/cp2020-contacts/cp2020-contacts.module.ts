import { Cp2020ContactSectionPdfService } from './services/cp2020-contact-section-pdf/cp2020-contact-section-pdf.service';
import { PipesModule } from './../../pipes/pipes.module';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { FixerCalcHotStuffComponent } from './components/fixer-calc-hot-stuff/fixer-calc-hot-stuff.component';
import { FixerCalcHotStuffAreaComponent } from './components/fixer-calc-hot-stuff-area/fixer-calc-hot-stuff-area.component';
import { FixerCalcBigLeagueContactNewComponent } from './components/fixer-calc-big-league-contact-new/fixer-calc-big-league-contact-new.component';
import { FixerCalcBigLeagueContactComponent } from './components/fixer-calc-big-league-contact/fixer-calc-big-league-contact.component';
import { FixerCalcBigLeagueComponent } from './components/fixer-calc-big-league/fixer-calc-big-league.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020ContactsSectionComponent } from './components/cp2020-contacts-section/cp2020-contacts-section.component';
import { Cp2020BigLeagueContactsComponent } from './components/cp2020-big-league-contacts/cp2020-big-league-contacts.component';
import { Cp2020BigLeagueContactComponent } from './components/cp2020-big-league-contact/cp2020-big-league-contact.component';
import { Cp2020HotStuffContactComponent } from './components/cp2020-hot-stuff-contact/cp2020-hot-stuff-contact.component';
import { Cp2020HotStuffContactsComponent } from './components/cp2020-hot-stuff-contacts/cp2020-hot-stuff-contacts.component';
import { Cp2020OtherContactsComponent } from './components/cp2020-other-contacts/cp2020-other-contacts.component';
import { Cp2020OtherContactComponent } from './components/cp2020-other-contact/cp2020-other-contact.component';
import { Cp2020BigLeagueContactNewComponent } from './components/cp2020-big-league-contact-new/cp2020-big-league-contact-new.component';
import { Cp2020HotStuffContactNewComponent } from './components/cp2020-hot-stuff-contact-new/cp2020-hot-stuff-contact-new.component';
import { Cp2020OtherContactNewComponent } from './components/cp2020-other-contact-new/cp2020-other-contact-new.component';

@NgModule({
  declarations: [
    FixerCalcBigLeagueComponent,
    FixerCalcBigLeagueContactComponent,
    FixerCalcBigLeagueContactNewComponent,
    FixerCalcHotStuffAreaComponent,
    FixerCalcHotStuffComponent,
    Cp2020ContactsSectionComponent,
    Cp2020BigLeagueContactsComponent,
    Cp2020BigLeagueContactComponent,
    Cp2020HotStuffContactComponent,
    Cp2020HotStuffContactsComponent,
    Cp2020OtherContactsComponent,
    Cp2020OtherContactComponent,
    Cp2020BigLeagueContactNewComponent,
    Cp2020HotStuffContactNewComponent,
    Cp2020OtherContactNewComponent,
  ],
  providers: [Cp2020ContactSectionPdfService],
  imports: [CommonModule, CommonUiModule, PipesModule],
  exports: [
    FixerCalcBigLeagueComponent,
    FixerCalcBigLeagueContactComponent,
    FixerCalcBigLeagueContactNewComponent,
    FixerCalcHotStuffAreaComponent,
    FixerCalcHotStuffComponent,
    Cp2020ContactsSectionComponent,
    Cp2020BigLeagueContactsComponent,
    Cp2020BigLeagueContactComponent,
    Cp2020HotStuffContactComponent,
    Cp2020HotStuffContactsComponent,
    Cp2020OtherContactsComponent,
    Cp2020OtherContactComponent,
  ],
})
export class Cp2020ContactsModule {}
