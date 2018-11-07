
// Create the modal
svgWorldmap.prototype.createModal = function () {

  // Create wrappers
  this.modalOverlay = $('<div class="svgWorldmap-modal-overlay"/>').appendTo(this.wrapper);
  this.modalWrapper = $('<div class="svgWorldmap-modal-wrapper"/>').appendTo(this.wrapper);
}

// Open the modal
svgWorldmap.prototype.openModal = function (contentElementID) {
  contentElementID && this.setModalContent(contentElementID);
  $('.svgWorldmap-modal-overlay').addClass('svgWorldmap-active');
  $('.svgWorldmap-modal-wrapper').addClass('svgWorldmap-active');

  if (contentElementID == 'BlockCountry') {
    this.countryModalWrapper.removeClass('svgWorldmap-active');
  }
}

// Close the modal
svgWorldmap.prototype.closeModal = function (contentElementID) {
  $('.svgWorldmap-modal-overlay').removeClass('svgWorldmap-active');
  $('.svgWorldmap-modal-wrapper').removeClass('svgWorldmap-active');
  $('.svgWorldmap-wrapper').attr('data-modal-active', '');

  if (contentElementID == 'BlockCountry') {
    this.countryModalWrapper.addClass('svgWorldmap-active');
  }
}

// Set specific modal content
svgWorldmap.prototype.setModalContent = function (contentElementID) {
  if (!$('.svgWorldmap-modal-content-' + contentElementID).length) {
    this['createModalContent' + contentElementID]();
  }
  $('.svgWorldmap-modal-content').removeClass('svgWorldmap-active');
  $('.svgWorldmap-modal-content-' + contentElementID).addClass('svgWorldmap-active');
}

// Create the content for the teaser modal
svgWorldmap.prototype.createModalContentTeaser = function () {
  if ($('.svgWorldmap-modal-content-Teaser').length) {
    return false;
  }
  var contentContainer = $('<div class="svgWorldmap-modal-content svgWorldmap-modal-content-Teaser"/>')
    .appendTo(this.modalWrapper);

  $('<h2/>').html('Das Euler Hermes Risiko Radar')
    .appendTo(contentContainer);

  $('<p/>').html('Im Auftrag der Bundesrepublik Deutschland, bietet Euler Hermes für deutsche Exporteure maßgeschneiderte Hermesdeckungen gegen Forderungsausfälle.<br>Planen Sie demnächst ein Exportgeschäft und möchten wissen wie andere Exporteure das Zielland einschätzen, bewerten und wie Hermesdeckungen Sie dabei unterstützen können?')
    .appendTo(contentContainer);

  $('<h4/>').html('Wie funktioniert das Risiko Radar?')
    .appendTo(contentContainer);

  $('<div class="svgWorldmap-modal-slider-wrapper"/>')
    .appendTo(contentContainer);

  $('<h6/>').html('Machen Sie jetzt mit! Kostenlos. Unverbindlich.')
    .appendTo(contentContainer);

  $('<div class="svgWorldmap-modal-content-Teaser-button-wrapper"/>')
    .html('<button class="svgWorldmap-button">Start</button>')
    .on('click', function () {
      this.setModalContent('Settings');
    }.bind(this))
    .appendTo(contentContainer);
}

// Create the content for the teaser modal
svgWorldmap.prototype.createModalContentSettings = function () {
  if ($('.svgWorldmap-modal-content-Settings').length) {
    return false;
  }
  var contentContainer = $('<div class="svgWorldmap-modal-content svgWorldmap-modal-content-Settings"/>')
    .appendTo(this.modalWrapper);

  $('<h2/>').html('Risiko Radar')
    .appendTo(contentContainer);

  $('<p class="svgWorldmap-modal-content-Settings-message"/>').html('Vergleichen Sie Ihre Einschätzung mit anderen Exporteuren.')
    .appendTo(contentContainer);

  var chooseCountryWrapper1 = $('<div class="svgWorldmap-modal-choose-country-wrapper svgWorldmap-modal-choose-countries-category1"/>')
    .appendTo(contentContainer);

  $('<h4/>').html('Ihre Wachstumsländer')
    .appendTo(chooseCountryWrapper1);

  this.createCountryFinder({
    placeholder: 'Ihr Wachstumsland 1'
  }).appendTo(chooseCountryWrapper1);

  this.createCountryFinder({
    placeholder: 'Ihr Wachstumsland 2 (optional)'
  }).appendTo(chooseCountryWrapper1);

  this.createCountryFinder({
    placeholder: 'Ihr Wachstumsland 3 (optional)'
  }).appendTo(chooseCountryWrapper1);

  var chooseCountryWrapper2 = $('<div class="svgWorldmap-modal-choose-country-wrapper svgWorldmap-modal-choose-countries-category2"/>')
    .appendTo(contentContainer);

  $('<h4/>').html('Ihre Risikoländer')
  .appendTo(chooseCountryWrapper2);

  this.createCountryFinder({
    placeholder: 'Ihr Risikoland 1'
  }).appendTo(chooseCountryWrapper2);

  this.createCountryFinder({
    placeholder: 'Ihr Risikoland 2 (optional)'
  }).appendTo(chooseCountryWrapper2);

  this.createCountryFinder({
    placeholder: 'Ihr Risikoland 3 (optional)'
  }).appendTo(chooseCountryWrapper2);

  $('<div class="svgWorldmap-modal-content-Settings-button-wrapper"/>')
    .html('<button class="svgWorldmap-button">Weiter</button>')
    .on('click', function () {
      if (this.setCountriesFromSettings()) {
        this.createCountryModalHeader();
        this.openCountryModal();
      }
    }.bind(this))
    .appendTo(contentContainer);
}

// Create a country finder element
svgWorldmap.prototype.createCountryFinder = function (options) {
  !options && (options = {});
  var me = this;

  var wrapper = $('<div class="svgWorldmap-country-finder-wrapper"/>');
  var input = $('<input type="text" class="svgWorldmap-textfield svgWorldmap-country-finder-input" placeholder="' + (options.placeholder || '') + '"/>')
    .on('focus', function () {
      me.selectedCountryInput = $(this);
      me.blockSettingCountryFinderResult = false;
      me.openCountryFinderResults(wrapper, $(this).val());
    })
    .on('blur', function () {
      setTimeout(function () {
        if (!$('.svgWorldmap-country-finder-input:focus').length) {
          !me.blockSettingCountryFinderResult && me.setCountryFinderResult($(this));
          me.closeCountryFinderResults();
        }
      }.bind(this), 40);
    })
    .on('input', function () {
      me.updateCountryFinderResults($(this).val());
    })
    .on('keydown', function (ev) {
      if (ev.key === 'Enter' || ev.key === 'Tab') {
        me.setCountryFinderResult($(this));
        ev.key === 'Enter' && $(this).blur();
      }
    })
    .appendTo(wrapper);

  return wrapper;
};

svgWorldmap.prototype.setCountryFinderResult = function (targetElement, country) {
  country = country || this.selectFirstCountryFromResults();
  // Set results for country modal
  if ($('.svgWorldmap-country-modal-wrapper').hasClass('svgWorldmap-search-enabled')) {
    var val = targetElement.val('');
    if (!country || !country.id) {
      return;
    }
    this.showCountry(country.id);
    return;
  }
  targetElement.val(country ? country.name : '');
  targetElement.attr('data-id', country ? country.id : '');
  targetElement.attr('data-name', country ? country.name : '');
};

svgWorldmap.prototype.openCountryFinderResults = function (targetElement, value) {
  if (!$('.svgWorldmap-country-finder-results').length) {
    $('<div class="svgWorldmap-country-finder-results"/>').appendTo(this.wrapper);
  }
  this.updateCountryFinderResults(value);
  $('.svgWorldmap-country-finder-results').addClass('svgWorldmap-active').appendTo(targetElement);
};

svgWorldmap.prototype.closeCountryFinderResults = function () {
  $('.svgWorldmap-country-finder-results').removeClass('svgWorldmap-active');
};

svgWorldmap.prototype.updateCountryFinderResults = function (value) {
  if (!$('.svgWorldmap-country-finder-results').length) {
    return false;
  }
  var wrapper = $('.svgWorldmap-country-finder-results').html('');
  var orgValue = value;
  var value = $.trim(value).toLowerCase();

  if (!value || value.length < 2) {
    wrapper.html('<div class="svgWorldmap-country-finder-no-result">Bitte geben Sie mindestens 2 Buchstaben ein...</div>')
    return;
  }
  var results = [];
  $.each(this.data, function (countryID, country) {
    if (
      countryID.toLowerCase().indexOf(value) !== -1 ||
      country.nameDE.toLowerCase().indexOf(value) !== -1 ||
      country.nameEN.toLowerCase().indexOf(value) !== -1
    ) {
      if (results.length < 3) {
        results.push({
          id: countryID,
          name: country['name' + this.options.language]
        });
      } else {
        return false;
      }
    }
  }.bind(this));

  if (!results.length) {
    wrapper.html('<div class="svgWorldmap-country-finder-no-result">Es wurden keine Ergebnisse mit "' + orgValue + '" gefunden...</div>')
    return;
  }

  var me = this;
  $.each(results, function (index, country) {
    wrapper.append(
      $('<div class="svgWorldmap-country-finder-result"/>')
        .html(country.name)
        .attr('data-id', country.id)
        .attr('data-name', country.name)
        .on('mousedown touchstart', function () {
          me.blockSettingCountryFinderResult = true;
          me.setCountryFinderResult(me.selectedCountryInput, {
            id: $(this).attr('data-id'),
            name: $(this).attr('data-name')
          });
        })
    );
  });
};

svgWorldmap.prototype.selectFirstCountryFromResults = function () {
  if (!$('.svgWorldmap-country-finder-result:first-child').length) {
    return null;
  }
  var country = $('.svgWorldmap-country-finder-result:first-child');
  return {
    id: country.attr('data-id'),
    name: country.attr('data-name')
  }
};

svgWorldmap.prototype.setCountriesFromSettings = function () {
  $.each([1, 2], function (index, item) {
    this['countriesCategory' + item] = [];

    $.each($('.svgWorldmap-modal-choose-countries-category' + item + ' input'), function (index2, item2) {
      var countryID = $(item2).attr('data-id');
      if (countryID && this.data[countryID]) {
        this['countriesCategory' + item].push(countryID);
      }
    }.bind(this));
  }.bind(this));

  if (this.countriesCategory1.length && this.countriesCategory2.length) {
    return true;
  } else {
    $('.svgWorldmap-modal-content-Settings-message').addClass('svgWorldmap-error').html('Bitte wählen Sie mindestens ein Land pro Kategorie.');
    this.shakeElement($('.svgWorldmap-modal-content-Settings-button-wrapper .svgWorldmap-button'));
    return false;
  }
};

svgWorldmap.prototype.shakeElement = function (el) {
  if (!el) {
    return;
  }
  el.addClass('svgWorldmap-shake');
  setTimeout(function () {
    el.removeClass('svgWorldmap-shake');
  }, 400);
};

// Create the content for the teaser modal
svgWorldmap.prototype.createModalContentBlockCountry = function () {
  if ($('.svgWorldmap-modal-content-BlockCountry').length) {
    return false;
  }
  var contentContainer = $('<div class="svgWorldmap-modal-content svgWorldmap-modal-content-BlockCountry"/>')
    .appendTo(this.modalWrapper);

  var headline = $('<h2/>').html('Risiko Radar')
    .appendTo(contentContainer);

  $('<div class="svgWorldmap-close-modal-button"/>').html('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M409.6 358.4l-102.4-102.4 102.4-102.4c4.267-4.267 4.267-10.666 0-14.934l-36.267-36.267c-4.267-4.266-10.666-4.266-14.933 0l-102.4 102.4-102.4-102.4c-4.267-4.266-10.667-4.266-14.934 0l-36.267 36.267c-4.266 4.267-4.266 10.667 0 14.934l102.4 102.4-102.4 102.4c-4.266 4.267-4.266 10.666 0 14.933l36.267 36.267c4.267 4.267 10.666 4.267 14.934 0l102.4-102.4 102.4 102.4c4.267 4.267 10.666 4.267 14.933 0l36.267-36.267c4.267-4.267 4.267-10.666 0-14.933z"></path></svg>')
    .on('click', function () {
      this.closeModal('BlockCountry')
    }.bind(this))
    .appendTo(contentContainer);

  $('<p class="svgWorldmap-block-country-message"/>').html('Hier kommt die Content-Schranke und ein Text, der den Nutzer überzeugen soll uns seine Kontaktdaten zu übermitteln um weitermachen zu können.')
    .appendTo(contentContainer);

  $('<p class="svgWorldmap-block-country-message-success"/>')
    .appendTo(contentContainer);

  var blockCountryInputs = $('<div class="svgWorldmap-block-country-inputs"/>')
    .appendTo(contentContainer);

  $('<input type="text" class="svgWorldmap-textfield svgWorldmap-block-country-input-firstname" placeholder="Vorname"/>')
    .appendTo(blockCountryInputs);

  $('<input type="text" class="svgWorldmap-textfield svgWorldmap-block-country-input-lastname" placeholder="Nachname"/>')
    .appendTo(blockCountryInputs);

  $('<input type="text" class="svgWorldmap-textfield svgWorldmap-block-country-input-company" placeholder="Firma"/>')
    .appendTo(blockCountryInputs);

  $('<input type="text" class="svgWorldmap-textfield svgWorldmap-block-country-input-email" placeholder="E-Mail Adresse"/>')
    .appendTo(blockCountryInputs);

  $('<div class="svgWorldmap-modal-content-BlockCountry-button-wrapper"/>')
    .append(
      $('<button class="svgWorldmap-button">')
      .html('Weiter')
      .on('click', function () {
        // Close the modal if the user already sent his data
        if (this.customerDataSent) {
          this.closeModal('BlockCountry');
          return true;
        }

        // Check for valid email
        if (!/\S+@\S+\.\S+/.test($('.svgWorldmap-block-country-input-email').val())) {
          $('.svgWorldmap-block-country-message').removeClass('svgWorldmap-success').addClass('svgWorldmap-error').html('Bitte geben Sie eine gültige E-Mail Adresse ein.');
          this.shakeElement($('.svgWorldmap-modal-content-BlockCountry-button-wrapper .svgWorldmap-button'));
          return false;
        }

        // Make sure email and company fields are filled in
        if (!$('.svgWorldmap-block-country-input-company').val() || $.trim($('.svgWorldmap-block-country-input-company').val()).length < 3 || !$('.svgWorldmap-block-country-input-email').val()) {
          $('.svgWorldmap-block-country-message').removeClass('svgWorldmap-success').addClass('svgWorldmap-error').html('Bitte geben Sie Ihre Firma und E-Mail Adresse ein.');
          this.shakeElement($('.svgWorldmap-modal-content-BlockCountry-button-wrapper .svgWorldmap-button'));
          return false;
        }

        // Send request for comfirmation email
        $.ajax({
          url: 'https://ajaxresponse.com/1',
          data: {
            firstname: $('.svgWorldmap-block-country-input-firstname').val(),
            lastname: $('.svgWorldmap-block-country-input-lastname').val(),
            email: $('.svgWorldmap-block-country-input-email').val(),
            company: $('.svgWorldmap-block-country-input-company').val()
          },
          beforeSend: function () {
            $('.svgWorldmap-modal-content-BlockCountry-button-wrapper button').attr('disabled', true);
          }.bind(this),
          complete: function () {
            $('.svgWorldmap-modal-content-BlockCountry-button-wrapper button').attr('disabled', false);
          }.bind(this),
          success: function (response) {
            if (response && true) { // TODO (response && response.success)
              this.customerDataSent = true;
              $('.svgWorldmap-block-country-message').removeClass('svgWorldmap-error').addClass('svgWorldmap-success').html('Vielen Dank! Ihre Eingaben wurden übermittelt.');

              window.location.hash = this.getCountryHash();
              var link = window.location.href;

              var successHTML = '<p>Wir haben Ihnen einen Link geschickt, mit welchem Sie Ihre E-Mail Adresse bestätigen können. Sobald Ihre E-Mail Adresse bestätigt wurde erhalten Sie Zugang zu allen Ländern.</p>';
              successHTML += '<p>Sie können Ihre jetzige Auswahl weiterhin mit folgendem Link aufrufen:</p>';
              successHTML += '<p class="svgWorldmap-block-country-message-link">' + link + '</p>';

              $('.svgWorldmap-block-country-message-success')
                .addClass('svgWorldmap-active')
                .html(successHTML);

              $('.svgWorldmap-block-country-inputs').css({display: 'none'});
            } else {
              $('.svgWorldmap-block-country-message').removeClass('svgWorldmap-success').addClass('svgWorldmap-error').html('Fehler: Ihre Daten konnten nicht übermittelt werden.');
            }
          }.bind(this),
          error: function () {
            $('.svgWorldmap-block-country-message').removeClass('svgWorldmap-success').addClass('svgWorldmap-error').html('Fehler: Ihre Daten konnten nicht übermittelt werden.');
          }.bind(this)
        });
      }.bind(this))
    )
    .appendTo(contentContainer);
}

// Get the hash for selected Countries
svgWorldmap.prototype.getCountryHash = function () {
  var hash = '';
  $.each(this.countriesCategory1, function (index, item) {
    if (index > 0) {
      hash += ',';
    }
    hash += item;
  });
  hash += '|';
  $.each(this.countriesCategory2, function (index, item) {
    if (index > 0) {
      hash += ',';
    }
    hash += item;
  });
  return hash;
};
