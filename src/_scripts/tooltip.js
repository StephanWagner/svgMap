
// Create the tooltip
svgWorldmap.prototype.createTooltip = function (error) {
  if (this.tooltip) {
    return false;
  }
  this.tooltip = $('<div class="svgWorldmap-tooltip" />');
  this.tooltipContent = $('<div class="svgWorldmap-tooltip-content" />').appendTo(this.tooltip);
  this.tooltipPointer = $('<div class="svgWorldmap-tooltip-pointer" />').appendTo(this.tooltip);
  this.tooltip.appendTo($('body'));
};

// Set the tooltips content
svgWorldmap.prototype.setTooltipContent = function (content) {
  if (!this.tooltip) {
    return;
  }
  this.tooltipContent.html(content);
};

// Show the tooltip
svgWorldmap.prototype.showTooltip = function (e) {
  this.tooltip.addClass('svgWorldmap-active');
  this.moveTooltip(e);
};

svgWorldmap.prototype.hideTooltip = function () {
  this.tooltip.removeClass('svgWorldmap-active');
};

// Move the tooltip
svgWorldmap.prototype.moveTooltip = function (e) {
  var x = e.pageX;
  var y = e.pageY;

  var wWidth = window.innerWidth;
  var tWidth = this.tooltip.outerWidth();

  var left = x - tWidth / 2;

  if (left <= 10) {
    x = 10 + (tWidth / 2);
    this.tooltipPointer.css({marginLeft: (left - 10)});
  } else if (left + tWidth >= wWidth - 10) {
    x = wWidth - 10 - (tWidth / 2);
    this.tooltipPointer.css({marginLeft: ((wWidth - 10 - e.pageX - (tWidth / 2)) * -1)});
  } else {
    this.tooltipPointer.css({marginLeft: 0});
  }

  this.tooltip.css({left: x});
  this.tooltip.css({top: y});
};
