import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit
{

  @Output() featureSelected = new EventEmitter<string>();
  constructor(private dataService: DataStorageService) { }

  ngOnInit(): void
  {
  }
  onSave()
  {
    this.dataService.storeRecipes();
  }
  onFetchData()
  {
    this.dataService.fetchRecipes();
  }

  onSelect(link: string): void
  {
    this.featureSelected.emit(link);
  }
}
