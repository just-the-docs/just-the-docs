# Ionic Lock Screen Component

This is a simple lock screen component with numbers for your Ionic 2+ app.

The module is based on the work of [Carson Chen and the ionic2-lock-screen](https://github.com/CarsonChen1129/ionic2-lock-screen).


## Using this module in an Ionic app

```typescript
// Import the module and component
import { LockScreenModule, LockScreenComponent } from 'ionic-simple-lockscreen';

@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    LockScreenModule // Put the module here
  ],
  entryComponents: [
    LockScreenComponent, // And add the component here
  ],
  providers: []
})
export class AppModule {}
```

Once you have imported the module, you can use it inside your pages like this:

```typescript
import { LockScreenComponent } from 'ionic-simple-lockscreen';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openLockscreen() {
    this.navCtrl.push(LockScreenComponent,{
      code:'1234',
      ACDelbuttons:false,
      passcodeLabel:'Please Enter Passcode',
      onCorrect:function(){
        console.log('Input correct!');
      },
      onWrong:function(attemptNumber){
        console.log(attemptNumber + ' wrong passcode attempt(s)');
      }
    });
  }

}

```