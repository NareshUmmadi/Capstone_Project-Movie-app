import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  signUpForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    userName: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', [Validators.required,this.validateConfirmPassword.bind(this)]],
    image: [null]
  })
  condition: any;


  constructor(private _snackbar:MatSnackBar ,private fb: FormBuilder, private userService: UserService, private http: HttpClient, private _snackBar: MatSnackBar,private router:Router) {

  }

  ngOnInit() {
    this.defaultImg();
  }

  formData: FormData = new FormData();
  profileUrl: any;
  imgSrc: string = "data:image/png;base64,";

  onFileSelected(event: any) {
    let file: any = event.target.files[0];
    console.log(file);
    if (file != null && file.type == "image/png" || file.type == "image/jpeg") {
      this.formData.delete("image");
      console.log("image deleted");
      this.formData.append("image", file);
      console.log("new image added");
      console.log("FormData: " + this.formData);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.profileUrl = reader.result;
      }
    }
    else {
      this._snackBar.open("Only .png & .jpeg file supported", "ok")
    }
  }


  defaultImg() {
    let img: any = this.http.get("https://archive.org/download/HeaderIconUser/Header-Icon-User.png", { responseType: "arraybuffer" })
      .pipe(map(response => {
        return new File([response], "myLogo.png");
      }));

    img.subscribe((res: any) => {
      this.formData.append("image", res);
      console.log("this is response " + res);
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onload = (_event) => {
        this.profileUrl = reader.result;
        console.log(this.profileUrl);
      }
    });
    console.log(this.formData);
  }

  signUp() {
    console.log(this.signUpForm.value.image);
    this.formData.append("user", JSON.stringify(this.signUpForm.value));
    console.log("Before post the data is: " + JSON.stringify(this.formData))
    this.userService.registerUser(this.formData).subscribe({
      next:(res)=>{
        this._snackBar.open("Successfully Registered.","Okay",{
          duration:1000,
          panelClass:['text-primary']
        });
        this.router.navigate(['login']);
        setTimeout(()=>{
          this._snackBar.open("An activation link has been sent to your email, click on the link to verify","Okay",{
            duration:2000,
            panelClass:['text-primary']
          })
        },1500);
      },
      error:(err)=>{
        console.log(err);
        if(err.status==409){
          this._snackbar.open(err.error.message,"Okay",{
            duration:2000,
            panelClass:['text-primary']
          })
        }
        if(err.status==503){
          this.router.navigate(['service']);
        }
      }
    })
  }


  validateConfirmPassword(control:AbstractControl):any{
    if(control.value && control.value!=this.signUpForm.value.password)
    return {'confirmPasswordError':true};

    return null;
  }
}
