import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {
  BehaviorSubject,
  catchError, combineLatest,
  delay,
  interval,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  throwError
} from "rxjs";
import {ESTATE, Model} from "./helper.interface";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, NgIf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public model$: Observable<Model<string[]>>;
  public reload$: BehaviorSubject<null> = new BehaviorSubject<null>(null);

  constructor() {
    this.model$ = combineLatest([this.reload$]).pipe(
      switchMap(() => this.initModel()),
    )
    this.initAutoReload()
  }

  private initModel(): Observable<Model<string[]>> {
    return this.getList().pipe(
      delay(1000),
      switchMap((res: any) => this.getPeople(res)),
      map((res: any) => {
        return {
          data: ['1', '2', '3', '4', '5', '6'],
          state: ESTATE.READY
        }
      }),
      catchError((err: any) => {
        console.log(err);
        return of({
          state: ESTATE.ERROR,
        })
      }),
      startWith({
        state: ESTATE.PENDING
      })
    )
  }


  private getList(): Observable<any> {
    return of(null)
  }

  private getPeople(res: any): Observable<any> {
    return throwError(() => new Error('error'))
    // return of(null)
  }

  private initAutoReload(): void {
    interval(10000).subscribe({
        next: (value) => {
          this.reload$.next(null)
          console.log(value)
        }
      }
    )
  }
}

