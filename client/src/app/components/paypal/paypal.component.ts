import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { loadScript, PayPalNamespace } from '@paypal/paypal-js';
import {render} from 'creditcardpayments/creditCardPayments'
import { EmailData } from 'src/app/models/model';
import { EmailService } from 'src/app/services/email.service';
import { UserService } from 'src/app/services/user.service';

// declare global {
//   interface Window {
//     paypal: PayPalNamespace | null | undefined;
//   }
// }
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit, AfterViewInit {
  emailData!: EmailData;
  email!:string
  constructor(private emailSvc: EmailService, private userSvc: UserService, private router: Router) { }

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
    this.email = currentUser.sub; 
    console.info("this user " + this.email)
  }
  getEmailData() {
    this.emailData = {
      to: this.email,
      subject: 'Test Email',
      body: 'Transaction Successful. Thanks for the coffee.',
    }

    console.info(this.emailData)
    return this.emailData;
  }

  ngAfterViewInit() {
    render(
      {
        id: "#myPaypalButtons",
        currency: "SGD",
        value: "5.00",
        onApprove: (details) => {
          console.log(details)
          this.emailSvc.sendEmail(this.getEmailData()).then(response => {
            console.log('Email sent successfully');
          }).catch(error => {
            console.error('Failed to send email', error);
          });
          this.router.navigate(['home'])
        }
      }
    )
  }

  // sendEmail(){
  //   this.emailSvc.sendEmail(this.getEmailData()).then(response => {
  //     console.log('Email sent successfully');
  //     alert("success")
  //   }).catch(error => {
  //     console.error('Failed to send email', error);
  //   });
  // }
}


//   async ngOnInit() {
//     await loadScript({ 
//       'client-id': 'Ad770GehxihiAS1Y9iJIeIN4KpOcvSbT0QTWdmOOMJQCMFEAsYXKXolHRLnvry7DGqf3rLGb8ohuN_Uz',
//       currency: 'SGD',
//       intent: 'capture',
//     });

//     // Render the PayPal Buttons
//     (window.paypal as any).Buttons({
//       createOrder: (data, actions) => {
//         // Call your server-side endpoint to create the order
//         return fetch('/api/create-paypal-order', {
//           method: 'POST',
//         })
//           .then((response) => response.json())
//           .then((orderData) => {
//             return orderData.id;
//           });
//       },
//       onApprove: (data, actions) => {
//         // Call your server-side endpoint to capture the order
//         return fetch(`/api/capture-paypal-order/${data.orderID}`, {
//           method: 'POST',
//         })
//           .then((response) => response.json())
//           .then((captureData) => {
//             // Handle successful payment
//           });
//       },
//     }).render('#paypal-button-container');
//   }
// }
