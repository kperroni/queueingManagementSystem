import { Component, OnInit } from '@angular/core';
import { QueueService } from '../../../queue/queue.service';
import { CounterService } from '../../../counter/counter.service';
import { ServiceProviderService } from '../../service-provider.service';
import { MessageService } from '../../../../shared/services/messages/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class StartShiftComponent implements OnInit {

  queues: any = [];
  queueDropdownLegend: String = "Select a Queue";
  selectedQueue: String = "";

  showCounters = false;
  counters: any = [];
  counterDropdownLegend: String = "Select a Counter";
  selectedCounter: String = "";

  disableStartShiftButton: boolean = true;

  shiftStarted: boolean = false;

  constructor(
    private QueueService: QueueService,
    private CounterService: CounterService,
    private ServiceProviderService: ServiceProviderService,
    private MessageService: MessageService,
    private Router: Router
  ) { }

  ngOnInit() {
    this.onCheckShift();

    this.QueueService.getQueues()
      .subscribe(
        (data: any[]) => this.queues = data
      );
  }

  onQueueSelected(queue) {
    this.queueDropdownLegend = queue.name;
    this.CounterService.getQueueCounters(queue._id)
      .subscribe(
        (data: any[]) => this.counters = data
      );
    this.showCounters = true;
    this.selectedQueue = queue._id;
  }

  onCounterSelected(counter) {
    this.counterDropdownLegend = counter.counterName;
    this.disableStartShiftButton = false;
    this.selectedCounter = counter._id;
  }

  onStartShift() {
    this.ServiceProviderService.createShift({ queueId: this.selectedQueue, counterId: this.selectedCounter })
      .subscribe(
        (data: any) => {
          console.log(data.message);
          this.MessageService.setMessage('success', 'Qme', data.message);
          this.Router.navigate(['/getCurrentTicket']);
        }
      );
  }

  onCheckShift(){
    this.ServiceProviderService.checkShift()
    .subscribe(
      (data: any[]) => {
        if(data.length > 0){
         this.shiftStarted = true;
         console.log(data)
        }
      }
    );
  }

  onFinishShift(){
    
  }
}