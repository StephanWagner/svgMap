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
  this.tooltip.classList.remove('svgWorldmap-active');
};

// Move the tooltip
svgWorldmap.prototype.moveTooltip = function (e) {
  var x = e.pageX;
  var y = e.pageY;
  var offsetToWindow = 6;
  var offsetToPointer = 12;
  var offsetToPointerFlipped = 32;

  var wWidth = window.innerWidth;
  var tWidth = this.tooltip.offsetWidth;
  var tHeight = this.tooltip.offsetHeight;

  // Adjust pointer when reaching window sides
  var left = x - tWidth / 2;
  if (left <= offsetToWindow) {
    x = offsetToWindow + (tWidth / 2);
    this.tooltipPointer.style.marginLeft = (left - offsetToWindow) + 'px';
  } else if (left + tWidth >= wWidth - offsetToWindow) {
    x = wWidth - offsetToWindow - (tWidth / 2);
    this.tooltipPointer.style.marginLeft = ((wWidth - offsetToWindow - e.pageX - (tWidth / 2)) * -1) + 'px';
  } else {
    this.tooltipPointer.style.marginLeft = '0px';
  }

  // Flip tooltip when reaching top window edge
  var top = y - offsetToPointer - tHeight;
  if (top <= offsetToWindow) {
    this.tooltip.classList.add('svgWorldmap-tooltip-flipped');
    y += offsetToPointerFlipped;
  } else {
    this.tooltip.classList.remove('svgWorldmap-tooltip-flipped');
    y -= offsetToPointer;
  }

  this.tooltip.style.left = x + 'px';
  this.tooltip.style.top = y + 'px';
};