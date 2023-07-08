$(document).ready(function(){
    //Модальные окна
    $('[data-modal=record]').on('click', function() {
        $('.overlay, #record').fadeIn('slow');
    });

    $('.modal__link').each(function(i) {
        $(this).on('click', function() {
            $('.overlay, #gift').fadeIn('slow');
        })
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #record, #gift').fadeOut('slow');
    });


    // Валидация форм
    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите более {0} символа!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    };
    validateForms('#record form');
    validateForms('#gift form');
    // Маска телефона
    $('input[name=phone]').mask("+7 (999) 999-99-99");
    // Используем технологию Аджэкс для обработки запросов без перезагрузки браузера
    $('form').submit(function(e) {
        e.preventDefault();
        if(!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#record').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });
});

