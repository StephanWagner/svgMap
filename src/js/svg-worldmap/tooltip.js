// Create the tooltip
svgWorldmap.prototype.createTooltip = function () {
  if (this.tooltip) {
    return false;
  }
  this.tooltip = this.createElement('div', 'svgWorldmap-tooltip', document.getElementsByTagName('body')[0]);
  this.tooltipContent = this.createElement('div', 'svgWorldmap-tooltip-content-wrapper', this.tooltip);
  this.tooltipPointer = this.createElement('div', 'svgWorldmap-tooltip-pointer', this.tooltip);
};

// Set the tooltips content
svgWorldmap.prototype.setTooltipContent = function (content) {
  if (!this.tooltip) {
    return;
  }
  this.tooltipContent.innerHTML = '';
  this.tooltipContent.append(content);
};

// Show the tooltip
svgWorldmap.prototype.showTooltip = function (e) {
  this.tooltip.classList.add('svgWorldmap-active');
  this.moveTooltip(e);
};

// Hide the tooltip
svgWorldmap.prototype.hideTooltip = function () {
  //this.tooltip.classList.remove('svgWorldmap-active');
};

// Move the tooltip
svgWorldmap.prototype.moveTooltip = function (e) {
  var x = e.pageX;
  var y = e.pageY;

  var wWidth = window.innerWidth;
  var tWidth = this.tooltip.offsetWidth;

  var left = x - tWidth / 2;
  if (left <= 10) {
    x = 10 + (tWidth / 2);
    this.tooltipPointer.style.marginLeft = left - 10;
  } else if (left + tWidth >= wWidth - 10) {
    x = wWidth - 10 - (tWidth / 2);
    this.tooltipPointer.style.marginLeft = (wWidth - 10 - e.pageX - (tWidth / 2)) * -1;
  } else {
    this.tooltipPointer.style.marginLeft = 0;
  }

  this.tooltip.style.left = x + 'px';
  this.tooltip.style.top = y + 'px';
};