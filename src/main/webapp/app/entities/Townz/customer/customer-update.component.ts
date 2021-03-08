import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICustomer, Customer } from 'app/shared/model/Townz/customer.model';
import { CustomerService } from './customer.service';
import { ICustomerReferCode } from 'app/shared/model/Townz/customer-refer-code.model';
import { CustomerReferCodeService } from 'app/entities/Townz/customer-refer-code/customer-refer-code.service';
import { IWallet } from 'app/shared/model/Townz/wallet.model';
import { WalletService } from 'app/entities/Townz/wallet/wallet.service';

type SelectableEntity = ICustomerReferCode | IWallet;

@Component({
  selector: 'jhi-customer-update',
  templateUrl: './customer-update.component.html',
})
export class CustomerUpdateComponent implements OnInit {
  isSaving = false;
  referfromcustomerids: ICustomerReferCode[] = [];
  wallets: IWallet[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    token: [],
    phone: [],
    sphone: [],
    email: [],
    profileimage: [],
    active: [],
    isFirstBooking: [],
    timecreated: [],
    referFromCustomerId: [],
    wallet: [],
  });

  constructor(
    protected customerService: CustomerService,
    protected customerReferCodeService: CustomerReferCodeService,
    protected walletService: WalletService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customer }) => {
      if (!customer.id) {
        const today = moment().startOf('day');
        customer.timecreated = today;
      }

      this.updateForm(customer);

      this.customerReferCodeService
        .query({ filter: 'customer-is-null' })
        .pipe(
          map((res: HttpResponse<ICustomerReferCode[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICustomerReferCode[]) => {
          if (!customer.referFromCustomerId || !customer.referFromCustomerId.id) {
            this.referfromcustomerids = resBody;
          } else {
            this.customerReferCodeService
              .find(customer.referFromCustomerId.id)
              .pipe(
                map((subRes: HttpResponse<ICustomerReferCode>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICustomerReferCode[]) => (this.referfromcustomerids = concatRes));
          }
        });

      this.walletService
        .query({ filter: 'customer-is-null' })
        .pipe(
          map((res: HttpResponse<IWallet[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IWallet[]) => {
          if (!customer.wallet || !customer.wallet.id) {
            this.wallets = resBody;
          } else {
            this.walletService
              .find(customer.wallet.id)
              .pipe(
                map((subRes: HttpResponse<IWallet>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IWallet[]) => (this.wallets = concatRes));
          }
        });
    });
  }

  updateForm(customer: ICustomer): void {
    this.editForm.patchValue({
      id: customer.id,
      name: customer.name,
      token: customer.token,
      phone: customer.phone,
      sphone: customer.sphone,
      email: customer.email,
      profileimage: customer.profileimage,
      active: customer.active,
      isFirstBooking: customer.isFirstBooking,
      timecreated: customer.timecreated ? customer.timecreated.format(DATE_TIME_FORMAT) : null,
      referFromCustomerId: customer.referFromCustomerId,
      wallet: customer.wallet,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customer = this.createFromForm();
    if (customer.id !== undefined) {
      this.subscribeToSaveResponse(this.customerService.update(customer));
    } else {
      this.subscribeToSaveResponse(this.customerService.create(customer));
    }
  }

  private createFromForm(): ICustomer {
    return {
      ...new Customer(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      token: this.editForm.get(['token'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      sphone: this.editForm.get(['sphone'])!.value,
      email: this.editForm.get(['email'])!.value,
      profileimage: this.editForm.get(['profileimage'])!.value,
      active: this.editForm.get(['active'])!.value,
      isFirstBooking: this.editForm.get(['isFirstBooking'])!.value,
      timecreated: this.editForm.get(['timecreated'])!.value
        ? moment(this.editForm.get(['timecreated'])!.value, DATE_TIME_FORMAT)
        : undefined,
      referFromCustomerId: this.editForm.get(['referFromCustomerId'])!.value,
      wallet: this.editForm.get(['wallet'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomer>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
