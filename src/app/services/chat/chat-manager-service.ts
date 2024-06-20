import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import {ChatModel } from './chat-model'
/**
 * Class {@link ChatModelService} manages the domain {@link ChatModel}. Consumers must not keep a copy of the Model as it
 * might get outdated, but always retrieve / be delivered the latest Model.
 */
@Injectable({
  providedIn: 'root',
})
export class ChatModelService {
  private model: ChatModel;
  private modelChangedSubject: BehaviorSubject<ChatModel>;
  public modelChanged$: Observable<ChatModel>;

  constructor() {
    this.model = new ChatModel();
    this.modelChangedSubject = new BehaviorSubject(this.model);
    this.model['changedSubject'].subscribe((model) => this.modelChangedSubject.next(model));
    this.modelChanged$ = this.modelChangedSubject.asObservable();
  }

  /**
   * Returns the domain {@link Model} of the application. Consumers must not keep a copy of the Model as it might
   * get outdated, but always retrieve / be delivered the latest Model.
   *
   * @returns the domain {@link Model} of the application
   */
  public getModel(): ChatModel {
    return this.model;
  }
}
