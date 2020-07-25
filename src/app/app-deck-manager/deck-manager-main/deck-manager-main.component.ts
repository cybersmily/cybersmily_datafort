import { DeckManagerToPdf } from './../../shared/models/pdf/deck-manager-to-pdf';
import { Cp2020ProgramList } from './../../shared/models/netrun/cp2020-program-list';
import { NrDeckManagerService } from './../../shared/services/netrun';
import { SaveFileService } from './../../shared/services/save-file.service';
import { FileLoaderService } from './../../shared/services/file-loader/file-loader.service';
import { SeoService } from '../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';
import { NetRunProgram, Cp2020DeckManager, Cp2020NetrunDeck } from '../../shared/models/netrun';
import { faTrash, faFilePdf, faSave, faUndo, faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-program-main',
  templateUrl: './deck-manager-main.component.html',
  styleUrls: ['./deck-manager-main.component.css']
})
export class DeckManagerMainComponent implements OnInit {
  faTrash = faTrash;
  faFilePdf = faFilePdf;
  faSave = faSave;
  faUndo = faUndo;
  faUpload = faUpload;

  deckManagerModel: Cp2020DeckManager = new Cp2020DeckManager();

  newProgram: NetRunProgram = new NetRunProgram();

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

  updateDeck($event: Cp2020NetrunDeck) {
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
    this.saveFile.SaveAsFile('NR Deck Manager', JSON.stringify(this.deckManagerModel), 'json');
  }


  upload($event) {
    const file = $event.target.files[0];
    if ( file && file.name.indexOf('.json') > 0 ) {
      this.file.importJSON(file)
      .subscribe( (data: any) =>  {
        this.deckManagerService.upload(new Cp2020DeckManager(data));
      });
    } else {
      alert('Please choose a json file to upload');
    }
  }

}
