import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitaEstabelecimentoQuestionarioComponent } from './visita-estabelecimento-questionario.component';

describe('VisitaEstabelecimentoQuestionarioComponent', () => {
  let component: VisitaEstabelecimentoQuestionarioComponent;
  let fixture: ComponentFixture<VisitaEstabelecimentoQuestionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitaEstabelecimentoQuestionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitaEstabelecimentoQuestionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
