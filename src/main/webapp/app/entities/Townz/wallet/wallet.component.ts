import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWallet } from 'app/shared/model/Townz/wallet.model';
import { WalletService } from './wallet.service';
import { WalletDeleteDialogComponent } from './wallet-delete-dialog.component';

@Component({
  selector: 'jhi-wallet',
  templateUrl: './wallet.component.html',
})
export class WalletComponent implements OnInit, OnDestroy {
  wallets?: IWallet[];
  eventSubscriber?: Subscription;

  constructor(protected walletService: WalletService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.walletService.query().subscribe((res: HttpResponse<IWallet[]>) => (this.wallets = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInWallets();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IWallet): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInWallets(): void {
    this.eventSubscriber = this.eventManager.subscribe('walletListModification', () => this.loadAll());
  }

  delete(wallet: IWallet): void {
    const modalRef = this.modalService.open(WalletDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.wallet = wallet;
  }
}
