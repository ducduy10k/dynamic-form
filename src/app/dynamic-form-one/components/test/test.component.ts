import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  DoCheck,
} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnChanges, DoCheck {
  @Input() title: any;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngDoCheck(): void {
    console.log('docheck: ', this.title);
  }

  ngOnChanges(change: SimpleChanges) {
    // Not emit when use this as dynamic component
    console.log('change: ', change);
  }

  handleChange(event: any) {
    console.log('event: ', event);
    this.onChange.emit(event);
  }
}
