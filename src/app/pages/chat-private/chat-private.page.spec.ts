import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPrivatePage } from './chat-private.page';

describe('ChatRoomPage', () => {
  let component: ChatPrivatePage;
  let fixture: ComponentFixture<ChatPrivatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatPrivatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPrivatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
