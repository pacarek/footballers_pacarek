import { Component, OnInit } from '@angular/core';
import { PlayerModel } from './player.model';
import { ApiService } from '../shared/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-footballers',
  templateUrl: './footballers.component.html',
  styleUrls: ['./footballers.component.css']
})
export class FootballersComponent implements OnInit {

  formValue !: FormGroup;
  playerData !: any;
  playerObj : PlayerModel = new PlayerModel();

  player:any;

  ModalTitle:string='';
  showAdd !: boolean;
  showUpdate !: boolean;

  PlayerNameFilter: string = "";
  PlayerSurnameFilter: string = "";
  playerDataWithoutFilter: any;
  
  p:number=1;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {  }

 

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name : [''],
      surname : [''],
      goals  : [''],
      assists : [''],
      yellowCards : [''],
      redCards : [''],
      dateOfBirth : [''],
      price : ['']
    })
    this.getPlayerDetails();
  }

  addClick(){
    this.formValue.reset();
    this.ModalTitle="Add Player";
    this.showAdd = true;
    this.showUpdate = false;
  }

  postPlayerDetails(){
    this.playerObj.name = this.formValue.value.name;
    this.playerObj.surname = this.formValue.value.surname;
    this.playerObj.goals = this.formValue.value.goals;
    this.playerObj.assists = this.formValue.value.assists;
    this.playerObj.yellowCards = this.formValue.value.yellowCards;
    this.playerObj.redCards = this.formValue.value.redCards;
    this.playerObj.dateOfBirth = this.formValue.value.dateOfBirth;
    this.playerObj.price = this.formValue.value.price;

    this.api.postPlayer(this.playerObj)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('close');
      ref?.click();
      this.formValue.reset();
      this.getPlayerDetails();
      })
  }

  getPlayerDetails() {
    this.api.getPlayer()
    .subscribe(res=>{
      console.log(res);
      this.playerData = res;
      this.playerDataWithoutFilter = res;
    })
  }

  editPlayerDetail(){
    this.playerObj.name = this.formValue.value.name;
    this.playerObj.surname = this.formValue.value.surname;
    this.playerObj.goals = this.formValue.value.goals;
    this.playerObj.assists = this.formValue.value.assists;
    this.playerObj.yellowCards = this.formValue.value.yellowCards;
    this.playerObj.redCards = this.formValue.value.redCards;
    this.playerObj.dateOfBirth = this.formValue.value.dateOfBirth;
    this.playerObj.price = this.formValue.value.price;

   this.api.updatePlayer(this.playerObj, this.playerObj.id)
   .subscribe(res=>{
     alert("Updated Successfully")
     let ref = document.getElementById('close');
     ref?.click();
     this.getPlayerDetails();
   })
 }

  editClick(dataItem: any){
    console.log(dataItem);
    this.player=dataItem;

    this.playerObj.id = dataItem.id;
    this.formValue.controls['name'].setValue(dataItem.name);
    this.formValue.controls['surname'].setValue(dataItem.surname);
    this.formValue.controls['goals'].setValue(dataItem.goals);
    this.formValue.controls['assists'].setValue(dataItem.assists);
    this.formValue.controls['yellowCards'].setValue(dataItem.yellowCards);
    this.formValue.controls['redCards'].setValue(dataItem.redCards);
    this.formValue.controls['dateOfBirth'].setValue(dataItem.dateOfBirth);
    this.formValue.controls['price'].setValue(dataItem.price);

    this.showUpdate = true;
    this.showAdd = false;
  }

  deletePlayer(dataItem : any){
    let clickedYes = confirm("Are you sure want to delete");
    if(clickedYes){
     this.api.deletePlayer(dataItem.id)
     .subscribe(res => {
      console.log(res);
       alert("Deleted Successfully");
       this.getPlayerDetails();
     })
    }
   }

  FilterFn(){
    var PlayerNameFilter = this.PlayerNameFilter;
    var PlayerSurnameFilter = this.PlayerSurnameFilter;

    this.playerData = this.playerDataWithoutFilter.filter(function (el: { name: { toString: () => string; }; surname: { toString: () => string; }; }){
        return el.name.toString().toLowerCase().includes(
          PlayerNameFilter.toString().trim().toLowerCase()
        )&&
        el.surname.toString().toLowerCase().includes(
          PlayerSurnameFilter.toString().trim().toLowerCase()
        )
    });
  }

  sortResult(prop: string | number,asc: any){
    this.playerData = this.playerDataWithoutFilter.sort(function(a: { [x: string]: number; },b: { [x: string]: number; }){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }
}
