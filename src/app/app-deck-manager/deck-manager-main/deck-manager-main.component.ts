import { DeckManagerToPdf } from './../../shared/models/pdf/deck-manager-to-pdf';
import { Cp2020ProgramList } from '../../shared/cp2020/cp2020-netrun-gear/models';
import { NrDeckManagerService } from './../../shared/services/netrun';
import { FileLoaderService, SaveFileService } from './../../shared/services/file-services';
import { SeoService } from '../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';
import { Cp2020Program, Cp2020CyberdeckManager, Cp2020Cyberdeck } from '../../shared/cp2020/cp2020-netrun-gear/models';
import { faTrash, faFilePdf, faSave, faUndo, faUpload, faAngleDoubleDown,
  faAngleDoubleRight, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'cs-program-main',
    templateUrl: './deck-manager-main.component.html',
    styleUrls: ['./deck-manager-main.component.css'],
    standalone: false
})
export class DeckManagerMainComponent implements OnInit {
  faTrash = faTrash;
  faFilePdf = faFilePdf;
  faSave = faSave;
  faUndo = faUndo;
  faUpload = faUpload;
  faAngleDoubleDown = faAngleDoubleDown;
  faAngleDoubleRight = faAngleDoubleRight;
  faPlus = faPlus;


  showInstructions = false;

  deckManagerModel: Cp2020CyberdeckManager = new Cp2020CyberdeckManager();

  newProgram: Cp2020Program = new Cp2020Program();

  constructor(private seo: SeoService,
    private deckManagerService: NrDeckManagerService,
    private file: FileLoaderService,
    private saveFile: SaveFileService) { }

  ngOnInit(): void {
    this.seo.updateMeta('Cybersmily\'s Datafort Program Generator',
    'Cybersmily\'s Datafort Program Generator help created Netrunner programs for Cyberpunk 2020. ');
    this.deckManagerService.deckManager.subscribe( data => {
      this.deckManagerModel = data;
    });
  }

  updateDeck($event: Cp2020Cyberdeck) {
    this.deckManagerService.updateDeck($event);
  }

  uploadList(list: Cp2020ProgramList) {
    this.deckManagerService.updateList(list);
  }

  reset() {
    this.deckManagerService.clear();
  }

  pdf() {
    DeckManagerToPdf.generatePdf(this.deckManagerModel);
  }

  save() {
    const fileName = this.deckManagerModel.deck.name.replace(/\s/g, '').replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g,'_');
    this.saveFile.SaveAsFile(`NRDeck_${fileName}`, JSON.stringify(this.deckManagerModel), 'json');
  }


  upload($event) {
    const file = $event.target.files[0];
    if ( file && file.name.indexOf('.json') > 0 ) {
      this.file.importJSON(file)
      .subscribe( (data: any) =>  {
        this.deckManagerService.upload(new Cp2020CyberdeckManager(data));
      });
    } else {
      alert('Please choose a json file to upload');
    }
  }

}
