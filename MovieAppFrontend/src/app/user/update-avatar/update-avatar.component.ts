import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.component.html',
  styleUrls: ['./update-avatar.component.css']
})
export class UpdateAvatarComponent implements OnInit {
  imgSrc:any;
  constructor(public dialogRef: MatDialogRef<UpdateAvatarComponent>,
    @Inject(MAT_DIALOG_DATA) public img:any,private _user:UserService) {
      this.imgSrc=img;
     }
  formData:FormData=new FormData();

  ngOnInit(): void {
  }

  onFileSelected(event:any){
    let file: any = event.target.files[0];
    console.log(file);
    if (file != null) {
      this.formData.append("image", file);
      console.log("new image added");
      console.log("FormData: " + this.formData);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgSrc = reader.result;
      }
    }
  }

  changePhoto(){
    this._user.updateAvatar(this._user.user.email,this.formData).subscribe({
      next:(res)=>{
        this.dialogRef.close();
      },
      error:(err)=>{
        console.log("error");
      }
    })
  }
}
