export default class OrganismsController {
  constructor(ctx, panoramaWidth, panoramaHeight) {
    this.ctx = ctx;
    this.panoramaWidth = panoramaWidth;
    this.panoramaHeight = panoramaHeight;
    this.organisms = [];
  }

  draw(dx) {
    this.organisms.forEach( organism => {
      organism.draw(dx);
    });
  }
}
