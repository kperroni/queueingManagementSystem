import { Component, OnInit } from '@angular/core';
import { QueueService } from '../../../queue/queue.service';

@Component({
  selector: 'app-start-shift',
  templateUrl: './start-shift.component.html',
  styleUrls: ['./start-shift.component.scss']
})
export class StartShiftComponent implements OnInit {

queues: any = [];
queueDropdownLegend: String = "Select a Queue";
  
  constructor(private QueueService: QueueService) { }

  ngOnInit() {
    this.QueueService.getQueues()
    .subscribe(
      (data: any[]) => this.queues = data
    );
  }

  onQueueSelected(queue){
    this.queueDropdownLegend = queue.name;
  }
}
