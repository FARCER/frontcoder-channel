import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { exhaustMap, map, Observable, Subject, take, tap, zip } from 'rxjs';
import { Product } from './interfaces/product.interface';
import { Doner } from './interfaces/doner.type';
import { Order } from './interfaces/order.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  private customerId: number = 0;

  public doner$!: Observable<any>;
  public delivery$: Observable<any>;
  public order$: Subject<Order> = new Subject<Order>();
  public bread$: Subject<string> = new Subject<string>();
  public meat$: Subject<string> = new Subject<string>();
  public souse$: Subject<string> = new Subject<string>();
  public tomato$: Subject<string> = new Subject<string>();
  public cabbage$: Subject<string> = new Subject<string>();


  constructor() {
    this.createDoner();
    this.delivery$ = this.order$.pipe(
      tap((order: Order) => console.log(`New order:`, order)),
      exhaustMap((order: Order) => this.cook(order)),
      tap((product: Product) => console.log(`Product:`, product)),
    )
  }

  public order(): void {
    const amount: number = Math.floor(Math.random() * 3) + 1;
    this.customerId++;
    this.order$.next({ amount, customerId: this.customerId })
  }

  private cook({ amount, customerId }: Order): Observable<Product> {
    return this.doner$.pipe(
      take(amount),
      map((doner: Doner) => ({ product: doner, customerId }))
    )
  }

  private createDoner(): void {
    let breadCount: number = 0;
    let meatCount: number = 0;
    let souseCount: number = 0;
    let tomatoCount: number = 0;
    let cabbageCount: number = 0;
    this.doner$ = zip(
      this.bread$.pipe(map((ing: string) => `${ing} ${++breadCount}`), tap(console.log)),
      this.meat$.pipe(map((ing: string) => `${ing} ${++meatCount}`), tap(console.log)),
      this.souse$.pipe(map((ing: string) => `${ing} ${++souseCount}`), tap(console.log)),
      this.tomato$.pipe(map((ing: string) => `${ing} ${++tomatoCount}`), tap(console.log)),
      this.cabbage$.pipe(map((ing: string) => `${ing} ${++cabbageCount}`), tap(console.log)),
    ).pipe(
      tap((doner: Doner) => console.log(doner))
    )
  }

}
