$('.input-datepicker').each(function () {
	var minDate, maxDate;
	minDate = moment($(this).attr('dateconfigfrom'), 'DD/MM/YYYY');
	maxDate = moment($(this).attr('dateconfigto'), 'DD/MM/YYYY');


	$(this).datetimepicker(
		{
			format: 'DD/MM/YYYY',
			minDate: minDate,
			maxDate: maxDate
		}
	);
});

var Forme = (typeof Forme === 'undefined') ? {} : Forme;
Forme.Submission = (function () {

    var isNullOrWhiteSpace = function (input) {
        if (typeof input === 'undefined' || input == null) return true;
        return input.replace(/\s/g, '').length < 1;
    }

    return {
        PublishEvent: function (message) {
            if (isNullOrWhiteSpace(Forme.Variables.OriginDomain)) {
                return;
            }
            window.parent.postMessage(message, Forme.Variables.OriginDomain);
        },

        FileUploaded: function (source, args) {
            var fileUpload = document.getElementById(source.controltovalidate);
            if (fileUpload && fileUpload.value !== '') {
                var fileSize = Forme.Variables.MaximumUploadSize;
                var uploadedFileSize = Number(fileUpload.files.item(0).size);
                if (uploadedFileSize < Number(fileSize)) {
                    args.IsValid = true;
                } else {
                    args.IsValid = false;
                }
            }
        },

        HtmlEncode: function(value) {
            // Create a in-memory div, set its inner text (which jQuery automatically encodes)
            // Then grab the encoded contents back out. The div never exists on the page.
            return $('<div/>').text(value).html();
        },

        HtmlDecode: function(value) {
            return $('<div/>').html(value).text();
        },

        EncodeTextBox: function () {
            var self = this;
            $.blockUI(
                {
                    message: 'Please Wait...',
                    centerY: 0,
                    css:
                    {
                        top: '40%',
                        border: 'none',
                        padding: '15px',
                        backgroundColor: '#BBB',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: 1,
                        color: '#fff',
                        timeout: 20000
                    }, overlayCSS:
                    {
                        backgroundColor: '#fff',
                        opacity: 1
                    },
                    fadeIn: 0,
                    fadeOut: 0
                });

            $('textarea')
                .each(function() {
                    this.value = self.HtmlEncode(this.value);
                });
            $('form input[type="text"]')
                .each(function() {
                    this.value = self.HtmlEncode(this.value);
                });
        },

        ProcessPreview: function () {
            var self = this;
            var divControls = $(document.createDocumentFragment());

            var formData = self.GetFormData();
            $.each(formData,
                function(key, value) {
                    var section = $('<div class="group"></div>');
                    if (!self.IsNullOrWhiteSpace(value['section-title'])) {
                        if (value['section-title'] === '-') {
                            section.append('<hr class="section-divider" />');
                        } else {
                            section.append('<div class="section-title">' + value['section-title'] + '</div><hr class="section-divider" />');
                        }
                    }
                    var sectionContent = $('<dl class="dl-horizontal"></dl>');
                    $.each(value['section-content'],
                        function(key2, value2) {
                            sectionContent.append('<dt>' + value2['label'] + '</dt><dd>' + value2['value'] + '</dd>');
                        });
                    section.append(sectionContent);
                    divControls.append(section);
                });

            $('.form-header .title').append(document.createTextNode(' (Submission Preview)'));
            $('#DivSubmissionPreview').empty();
            $('#DivSubmissionPreview').append(divControls);
            $('#BtnConfirmSubmit').show('fast');
            $('#LnkBack').show('fast');
            $('#LnkPrint').show('fast');
            $('#BtnSubmit').hide('fast');
            $('#DivSubmissionPreview').show('fast');
            $('#PnlFormBody').hide('fast');
            $('#DivFormBody').addClass('preview');
            self.PublishEvent('previewLoaded');
            $(window).scrollTop(0);
        },

        ShowPreview: function () {
            var self = this;
            if (typeof (Page_ClientValidate) === 'function') {
                Page_ClientValidate();
                if (Page_IsValid) {
                    self.ProcessPreview();
                }
            } else {
                self.ProcessPreview();
            }
            return false;
        },

        ShowForm: function () {
            var self = this;
            var title = $('.form-header .title').text().replace(/\s+/g, ' ').trim();;
            title = title.replace(/\(Submission Preview\)$/, '');
            $('.form-header .title').text(title);
            $('#DivSubmissionPreview').empty();
            $('#BtnConfirmSubmit').hide('fast');
            $('#LnkBack').hide('fast');
            $('#LnkPrint').hide('fast');
            $('#BtnSubmit').show('fast');
            $('#DivSubmissionPreview').hide('fast');
            $('#PnlFormBody').show('fast');
            $('#DivFormBody').removeClass('preview');
            self.PublishEvent('formLoaded');
            $(window).scrollTop(0);
            return false;
        },

        SubmitForm: function () {
            var self = this;
            self.EncodeTextBox();
            if (navigator.userAgent.indexOf("Firefox") !== -1) {
                document.getElementById(Forme.Variables.BtnSubmitHiddenClientId).click();
            } else {
                document.getElementById(Forme.Variables.LnkBtnSubmitHiddenClientId).click();
            }
        },

        OnSubmit: function () {
            var self = this;
            var isCaptchaEnabled = Forme.Variables.CaptchaEnabled;
            if (typeof (Page_ClientValidate) === 'function') {
                Page_ClientValidate();
                if (Page_IsValid) {
                    if (isCaptchaEnabled) { grecaptcha.execute(); }
                    else { self.SubmitForm(); }
                }
            } else {
                if (isCaptchaEnabled) { grecaptcha.execute(); }
                else { self.SubmitForm(); }
            }
            return false;
        },

        OnRecaptchaSuccess: function (token) {
            var self = this;
            if (typeof (Page_ClientValidate) === 'function') {
                Page_ClientValidate();
                if (Page_IsValid) {
                    self.SubmitForm();
                }
            } else {
                self.SubmitForm();
            }
        },

        ResizeReCaptcha: function() {
            var width = $('.g-recaptcha').parent().width();
            if (width < 302) {
                var scale = width / 302;
                $('.g-recaptcha').css('transform', 'scale(' + scale + ')');
                $('.g-recaptcha').css('-webkit-transform', 'scale(' + scale + ')');
                $('.g-recaptcha').css('transform-origin', '0 0');
                $('.g-recaptcha').css('-webkit-transform-origin', '0 0');
            }
        },

        GetFormData: function () {
            var self = this;
            var controls = [];
            var controlsValue = {
                "section-title": "",
                "section-content": []
            };
            $('#PnlFormBody > div.group').each(function () {
                if ($(this).hasClass('column-2')) {
                    $(this).children('.sub-group').each(function () {
                        $(this).children('label').each(function() {
                            var formType = $(this).next('.input-form').data('formType')
                            if (formType === Forme.Variables.Constants_ELEMENT_IMAGE_FIELD
                                || formType === Forme.Variables.Constants_ELEMENT_DESCRIPTION_FIELD) {
                                return true;
                            }
                            if (formType === Forme.Variables.Constants_ELEMENT_TITLE_FIELD) {
                                if (self.IsNullOrWhiteSpace(controlsValue["section-title"])) {
                                    if (controlsValue["section-content"].length > 0) {
                                        controls.push(controlsValue);
                                        controlsValue = {
                                            "section-title": self.GetControlValue($(this)),
                                            "section-content": []
                                        };
                                    }
                                    controlsValue["section-title"] = self.GetControlValue($(this));
                                } else {
                                    controls.push(controlsValue);
                                    controlsValue = {
                                        "section-title": self.GetControlValue($(this)),
                                        "section-content": []
                                    };
                                }
                                return true;
                            }
                            controlsValue["section-content"].push({
                                "label": $(this).text(),
                                "value": self.GetControlValue($(this))
                            });
                        });
                    });
                    return true;
                }
                var label = $(this).children('label:first');
                var formType = label.next('.input-form').data('formType');
                if (formType === Forme.Variables.Constants_ELEMENT_IMAGE_FIELD
                    || formType === Forme.Variables.Constants_ELEMENT_DESCRIPTION_FIELD) {
                    return true;
                }
                if (formType === Forme.Variables.Constants_ELEMENT_TITLE_FIELD) {
                    if (self.IsNullOrWhiteSpace(controlsValue["section-title"])) {
                        if (controlsValue["section-content"].length > 0) {
                            controls.push(controlsValue);
                            controlsValue = {
                                "section-title": self.GetControlValue(label),
                                "section-content": []
                            };
                        }
                        controlsValue["section-title"] = self.GetControlValue(label);
                    } else {
                        controls.push(controlsValue);
                        controlsValue = {
                            "section-title": self.GetControlValue(label),
                            "section-content": []
                        };
                    }
                    return true;
                }
                controlsValue["section-content"].push({
                    "label": label.text(),
                    "value": self.GetControlValue(label)
                });
                if (formType === Forme.Variables.Constants_ELEMENT_CATEGORY_FIELD) {
                    var subLabel = $(this).children('label:last');
                    
                    controlsValue["section-content"].push({
                        "label": subLabel.text(),
                        "value": self.GetControlValue(subLabel)
                    });
                }
            });
            controls.push(controlsValue);
            return controls;
        },

        GetControlValue: function (labelSelector) {
            var self = this;
            var divInput = $(labelSelector).next('.input-form');
            var formType = divInput.data('formType');
            var result = '';
            switch(formType) {
            case Forme.Variables.Constants_ELEMENT_TEXT_FIELD:
                result = divInput.children('input[type="text"]:first').val();
                break;
            case Forme.Variables.Constants_ELEMENT_CHECKBOX_FIELD:
                var checkArr = []
                divInput.find('input[type="checkbox"]:checked').each(function() {
                    if ($(this).val() === 'Others') {
                        checkArr.push(divInput.find('input[type="text"]:first').val());
                        return true;
                    }
                    checkArr.push($(this).val());
                });
                result = checkArr.join(', ');
                break;
            case Forme.Variables.Constants_ELEMENT_RADIO_FIELD:
                var radioSelected = divInput.find('input[type="radio"]:checked').val();
                if (radioSelected === 'Others') {
                    result = divInput.find('input[type="text"]:first').val();
                    break;
                }
                result = radioSelected;
                break;
            case Forme.Variables.Constants_ELEMENT_DATE_PICKER:
                result = divInput.find('input[type="text"]:first').val();
                break;
            case Forme.Variables.Constants_ELEMENT_TEXTAREA_FIELD:
                result = divInput.children('textarea:first').val();
                break;
            case Forme.Variables.Constants_ELEMENT_SELECT_FIELD:
                result = divInput.find('select option:selected').val();
                break;
            case Forme.Variables.Constants_ELEMENT_FILE_FIELD:
                var fileObject = divInput.children('input[type="file"]:first')[0].files[0];
                if (fileObject) {
                    result = fileObject.name;
                }
                break;
            case Forme.Variables.Constants_ELEMENT_TITLE_FIELD:
                result = divInput.find('div.section-title').text();
                break;
            case Forme.Variables.Constants_ELEMENT_LINEAR_SCALE_FIELD:
                result = divInput.find('input[type="radio"]:checked').val();
                break;
            case Forme.Variables.Constants_ELEMENT_CATEGORY_FIELD:
                result = divInput.find('select option:selected').val();
                break;
            }
            if (self.IsNullOrWhiteSpace(result)) {
                result = '-';
            }
            return result;
        },

        IsNullOrWhiteSpace: isNullOrWhiteSpace
    }
})();

// if (self === top) 
// {
	// var b = document.getElementById("activate_js");
	// b.className += "hidden";
// } else {
	// top.location = self.location;
// };
// if(self !== top){
	// if (!(window.top.location.host.endsWith("cwp.sg") || 
			// window.top.location.host.endsWith("cwp-dev.sg"))) {
	   // document.body.innerHTML = "Access Denied";
	// }
	// console.log(window.top.location.host);
// }