import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[AnimateOnScroll]',
  standalone: true
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  /**
   * @description
   * Animation class name
   *
   * @example
   *  <div [AnimateOnScroll]="fade-in"></div>
   */
  @Input({ required: true }) AnimateOnScroll: string = '';

  /**
     * @description
     * Use for animate child when you have multi child and you want animate theme
     *
     * @example
     *  <div [AnimateOnScroll]="fade-in" [animateChild]="true">
     *   <div *ngFor="..."></div>
     * </div>
     */
  @Input() animateChild: boolean = false;

  observe!: IntersectionObserver;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    //Hide Element before animation
    (this.el.nativeElement as HTMLElement).style.opacity = '0';

    this.observe = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (this.animateChild)
          for (let i = 0; i < entry.target.childElementCount; i++) {
            const element =
              entry.target.children.item(i);
            element?.classList.toggle(this.AnimateOnScroll, entry.isIntersecting)
          }
        else {
          entry.target.classList.toggle(this.AnimateOnScroll, entry.isIntersecting)
        }

        if (entry.isIntersecting) {
          this.observe.unobserve(entry.target);
          //Show Element after animation
          (this.el.nativeElement as HTMLElement).style.opacity = '1';
        }
      })
    })
    this.observe.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observe?.unobserve(this.el.nativeElement)
  }

}
