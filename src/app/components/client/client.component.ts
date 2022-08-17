import { Component, OnInit, ViewChild, ViewEncapsulation, AfterContentChecked } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination, Autoplay, EffectFade, SwiperOptions, Swiper } from "swiper";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClientComponent implements OnInit, AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;
  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', type: 'bullets'},
    centeredSlides: true,
    spaceBetween: 30,
    loop: true
  };

  constructor() { }

  ngOnInit() {
    SwiperCore.use([Autoplay, Pagination, EffectFade]);
  }

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  } 

  setSwiperInstance(swiper: Swiper) {
    setInterval(() => {
      swiper.autoplay?.start();
    }, 2500);
  }
}
