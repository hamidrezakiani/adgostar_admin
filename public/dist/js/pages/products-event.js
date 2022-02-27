if(!productPageScript)
    {
        productPageScript = true;
        $(document).on('dblclick','.product-name',function(){
            if(!$(`.input-name[data-id=${$(this).attr('data-id')}]`).length)
            {

            var input = document.createElement('TEXTAREA');
            input.setAttribute('rows','2');
            input.setAttribute('cols','30');
            input.classList.add('input-product-name');
            input.classList.add('form-control');
            input.setAttribute('data-id',$(this).attr('data-id'));
            input.setAttribute('data-old',$(this).html());
            input.value = $(this).html();
            $(this).html('');
            this.appendChild(input);
            }
        });

        $(document).on('focusout','.input-product-name',function(){
            var formData = new FormData();
            formData.append('name',$(this).val());
            updateProduct(formData,$(this).attr('data-id'));
            $(`.product-name[data-id=${$(this).attr('data-id')}]`).html($(this).attr('data-old'));
            $(this).remove();
        });

        $(document).on('dblclick','.product-categoryName',function(){
            setCategoriesSelectOptions(this);
        });

        $(document).on('change','.select-categoryName',function(){
                alert(3);
                var formData = new FormData();
                formData.append('category_id',$(this).val());
                updateProduct(formData,$(this).attr('data-id'));
                $(`.product-categoryName[data-id=${$(this).attr('data-id')}]`).html($(this).find(":selected").text());
        });

        $(document).on('dblclick','.product-periodType',function(){
            let select = document.createElement('SELECT');
            select.classList.add('form-control');
            let option = document.createElement('OPTION');
            option.innerHTML = 'انتخاب کنید';
            select.appendChild(option);
            option = document.createElement('OPTION');
            option.value = 'SINGLE';
            option.innerHTML = 'تکی';
            select.appendChild(option);
            option = document.createElement('OPTION');
            option.value = 'MULTIPLE';
            option.innerHTML = 'بازه ای';
            select.appendChild(option);
            select.setAttribute('data-id',this.getAttribute('data-id'));
            $(`.select-periodType`).remove();
            select.classList.add('select-periodType');
            this.appendChild(select);
        });

        $(document).on('change','.select-periodType',function(){
            var formData = new FormData();
            formData.append('periodType',$(this).val());
            updateProduct(formData,$(this).attr('data-id'));
            $(`.product-periodType[data-id=${$(this).attr('data-id')}]`).html($(this).find(":selected").text());
        });

        $(document).on('change','.product-viewable',function(){
            var formData = new FormData();
            if(this.checked)
              formData.append('viewable','YES');
            else
              formData.append('viewable','NO');
            updateProduct(formData,$(this).attr('data-id'));
        });
    }
