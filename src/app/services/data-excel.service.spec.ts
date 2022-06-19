import { TestBed } from '@angular/core/testing';

import { DataExcelService } from './data-excel.service';

describe('DataExcelService', () => {
  let service: DataExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
