# angular2-http-file-upload
Library to support HTTP file uploads for Angular 2

## Add file upload service to your project
```
// app.module.ts

import { NgModule }      from '@angular/core';
import { Uploader }      from 'angular2-http-file-upload';

@NgModule({
    // your module meta data here...
    providers: [ Uploader ]
})
export class AppModule { }
```

## Set up a file upload item
```
// my-upload-item.ts

import { UploadItem }    from 'angular2-http-file-upload';

export class MyUploadItem extends UploadItem {
    constructor(file: any) {
        super();
        this.url = 'https://your.domain.here/your.endpoint';
        this.headers = { HeaderName: 'Header Value', AnotherHeaderName: 'Another Header Value' };
        this.file = file;
    }
}
```

## Use the file upload service in a component
```
// example.component.ts

import { Component }     from '@angular/core';
import { Uploader }      from 'angular2-http-file-upload';
import { MyUploadItem }  from './my-upload-item';

@Component({
    // your component meta data here...
})
export class ExampleComponent {
    constructor(public uploaderService: Uploader) { }

    submit() {
        let uploadFile = (<HTMLInputElement>window.document.getElementById('myFileInputField')).files[0];

        let myUploadItem = new MyUploadItem(uploadFile);
        myUploadItem.formData = { FormDataKey: 'Form Data Value' };  // (optional) form data can be sent with file

        this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
             // success callback
        };
        this.uploaderService.onErrorUpload = (item, response, status, headers) => {
             // error callback
        };
        this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
             // complete callback, called regardless of success or failure
        };
        this.uploaderService.upload(myUploadItem);
    }
}
```

An upload progress callback is also available:
```
        this.uploaderService.onProgressUpload = (item, percentComplete) => {
             // progress callback
        };
```