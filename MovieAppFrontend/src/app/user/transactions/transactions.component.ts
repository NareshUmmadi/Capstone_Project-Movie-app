import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  dataSource:any[]=[];
  displayedColumns: string[] = ['Date', 'Detail', 'Type', 'Amount'];
  constructor(public _user:UserService) { 
   this.dataSource= this._user.userDetail.purchaseHistory;
  }

  ngOnInit(): void {
  }

}
