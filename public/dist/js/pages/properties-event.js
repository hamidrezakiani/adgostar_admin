if(!propertyPageScript)
    {
        propertyPageScript = true;
        $(document).on('dblclick','.property-label',function(){
            if(!$(`.input-property-label[data-id=${$(this).attr('data-id')}]`).length)
            {

            var input = document.createElement('TEXTAREA');
            input.setAttribute('rows','2');
            input.setAttribute('cols','30');
            input.classList.add('input-property-label');
            input.classList.add('form-control');
            input.setAttribute('data-id',$(this).attr('data-id'));
            input.setAttribute('data-old',$(this).html());
            input.value = $(this).html();
            $(this).html('');
            this.appendChild(input);
            }
        });

        $(document).on('focusout','.input-property-label',function(){
            var formData = new FormData();
            formData.append('label',$(this).val());
            updateProperty(formData,$(this).attr('data-id'));
            $(`.property-label[data-id=${$(this).attr('data-id')}]`).html($(this).attr('data-old'));
            $(this).remove();
        });

        $(document).on('dblclick','.property-size',function(){
            if(!$(`.input-property-size[data-id=${$(this).attr('data-id')}]`).length)
            {
            var input = document.createElement('INPUT');
            input.setAttribute('type','number');
            input.classList.add('input-property-size');
            input.classList.add('form-control');
            input.setAttribute('data-id',$(this).attr('data-id'));
            input.setAttribute('data-old',$(this).html());
            input.value = $(this).html();
            $(this).html('');
            this.appendChild(input);
            }
        });

        $(document).on('focusout','.input-property-size',function(){
            var formData = new FormData();
            formData.append('size',$(this).val());
            updateProperty(formData,$(this).attr('data-id'));
            $(`.property-size[data-id=${$(this).attr('data-id')}]`).html($(this).attr('data-old'));
            $(this).remove();
        });

         $(document).on('dblclick','.property-placeholder',function(){
            if(!$(`.input-property-placeholder[data-id=${$(this).attr('data-id')}]`).length)
            {

            var input = document.createElement('TEXTAREA');
            input.setAttribute('rows','2');
            input.setAttribute('cols','30');
            input.classList.add('input-property-placeholder');
            input.classList.add('form-control');
            input.setAttribute('data-id',$(this).attr('data-id'));
            input.setAttribute('data-old',$(this).html());
            input.value = $(this).html();
            $(this).html('');
            this.appendChild(input);
            }
        });

        $(document).on('focusout','.input-property-placeholder',function(){
            var formData = new FormData();
            formData.append('placeholder',$(this).val());
            updateProperty(formData,$(this).attr('data-id'));
            $(`.property-placeholder[data-id=${$(this).attr('data-id')}]`).html($(this).attr('data-old'));
            $(this).remove();
        });

         $(document).on('dblclick','.property-tooltip',function(){
            if(!$(`.input-property-tooltip[data-id=${$(this).attr('data-id')}]`).length)
            {

            var input = document.createElement('TEXTAREA');
            input.setAttribute('rows','2');
            input.setAttribute('cols','30');
            input.classList.add('input-property-tooltip');
            input.classList.add('form-control');
            input.setAttribute('data-id',$(this).attr('data-id'));
            input.setAttribute('data-old',$(this).html());
            input.value = $(this).html();
            $(this).html('');
            this.appendChild(input);
            }
        });

        $(document).on('focusout','.input-property-tooltip',function(){
            var formData = new FormData();
            formData.append('tooltip',$(this).val());
            updateProperty(formData,$(this).attr('data-id'));
            $(`.property-tooltip[data-id=${$(this).attr('data-id')}]`).html($(this).attr('data-old'));
            $(this).remove();
        });

        $(document).on('dblclick','.property-productName',function(){
            setProductsSelectOptions(this);
        });

        $(document).on('change','#select-property-productName',function(){
                var formData = new FormData();
                formData.append('product_id',$(this).val());
                updateProperty(formData,$(this).attr('data-id'));
                $(`.property-ProductName[data-id=${$(this).attr('data-id')}]`).html($(this).find(":selected").text());
        });

        $(document).on('dblclick','.property-typeName',function(){
            setPropertyTypesSelectOptions(this);
        });

        $(document).on('change','#select-property-typeName',function(){
                var formData = new FormData();
                formData.append('property_type_id',$(this).val());
                updateProperty(formData,$(this).attr('data-id'));
                $(`.property-typeName[data-id=${$(this).attr('data-id')}]`).html($(this).find(":selected").text());
        });

        $(document).on('change','.property-required',function(){
            var formData = new FormData();
            if(this.checked)
              formData.append('required','YES');
            else
              formData.append('required','NO');
            updateProperty(formData,$(this).attr('data-id'));
        });

        var specifiedElement = document.getElementById('a');

//I'm using "click" but it works with any event
document.addEventListener('click', function(event) {
 if(specifiedElement != null)
 {
      var isClickInside = specifiedElement.contains(event.target);

  if (!isClickInside) {
    specifiedElement.remove();
  }
 }
});
    }
